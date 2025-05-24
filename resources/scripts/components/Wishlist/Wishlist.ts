/* eslint-disable no-empty */
/* eslint-disable class-methods-use-this */
import WishlistButton from './WishlistButton';

export default class Wishlist extends HTMLElement {
  url = this.dataset.url;

  constructor() {
    super();

    this.addEventListeners = this.addEventListeners.bind(this);
    this.handleShareWishlist = this.handleShareWishlist.bind(this);
    this.setCounter = this.setCounter.bind(this);

    this.renderWishlistItems = this.renderWishlistItems.bind(this);
    this.generateWishlistItems = this.generateWishlistItems.bind(this);
    this.createSkeletonLoader = this.createSkeletonLoader.bind(this);
    this.checkForSharedWishlist = this.checkForSharedWishlist.bind(this);
  }

  async connectedCallback(): Promise<void> {
    customElements.define('wishlist-button', WishlistButton);

    this.addEventListeners();

    await this.renderWishlistItems();

    const currentWishlist = localStorage.getItem('wishlist');
    const parsedWishlist = currentWishlist ? JSON.parse(currentWishlist) : [];
    this.setCounter(parsedWishlist.length);
  }

  addEventListeners(): void {
    const shareButton = document.getElementById('share-wishlist') as HTMLElement;
    if (shareButton) {
      shareButton.addEventListener('click', (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        this.handleShareWishlist();
      });
    }

    this.checkForSharedWishlist();

    document.addEventListener('wishlistUpdated', async (event: CustomEvent) => {
      this.setCounter(event.detail.wishlistCount);
      await this.renderWishlistItems();
    });
  }

  async renderWishlistItems(): Promise<void> {
    const currentWishlist = localStorage.getItem('wishlist');
    const parsedWishlist = currentWishlist ? JSON.parse(currentWishlist) : [];

    // clear the content of the wishlist-items element
    this.innerHTML = '';

    if (parsedWishlist.length === 0) {
      this.innerHTML = '<p>Your wishlist is empty</p>';
      return;
    }

    this.innerHTML = `
      ${parsedWishlist.map(() => this.createSkeletonLoader()).join('')}
  `;

    const wishlistItemsHtml = await this.generateWishlistItems(parsedWishlist);

    this.innerHTML = wishlistItemsHtml;
  }

  async generateWishlistItems(parsedWishlist: string[]): Promise<string> {
    try {
      const batchSize = 20;
      const batches = [];

      const idsArray = parsedWishlist.map((id) => `id:${id}`);

      for (let i = 0; i < idsArray.length; i += batchSize) {
        batches.push(idsArray.slice(i, i + batchSize).join(' OR '));
      }

      const responses = await Promise.all(
        batches.map((batchQuery) =>
          fetch(`${this.url}&q=${batchQuery}`).then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.text();
          }),
        ),
      );

      const template = document.createElement('template');
      const wishlitItemsHtml = responses
        .map((response) => {
          template.innerHTML = response;
          const wishlistItemsWrapper = template.content.querySelector('wishlist-component');
          return wishlistItemsWrapper
            ? Array.from(wishlistItemsWrapper.children)
                .map((child) => child.outerHTML)
                .join('')
            : '';
        })
        .join('');

      return wishlitItemsHtml;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return '';
  }

  createSkeletonLoader(): string {
    return `
      <div class="tw:animate-pulse tw:rounded-lg tw:border tw:bg-gray-200 tw:shadow-md tw:overflow-hidden">
        <div class="tw:w-full tw:h-[165px] tw:md:h-[250px] tw:bg-gray-300 tw:block!"></div>
        <div class="tw:p-6 tw:flex tw:flex-col tw:gap-4">
          <div class="tw:w-3/4 tw:h-6 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/2 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/3 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/4 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/2 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/3 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/4 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/2 tw:h-4 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-full tw:h-10 tw:bg-gray-300 tw:rounded tw:block!"></div>
          <div class="tw:w-1/2 tw:h-4 tw:mx-auto tw:bg-gray-300 tw:rounded tw:block!"></div>
        </div>
      </div>
    `;
  }

  checkForSharedWishlist(): void {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const wishlist = params.get('wishlist');

    if (wishlist) {
    }
  }

  async handleShareWishlist(): Promise<void> {
    const currentWishlist = localStorage.getItem('wishlist');
    const parsedWishlist = currentWishlist ? JSON.parse(currentWishlist) : [];

    if (parsedWishlist.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Your wishlist is empty');
      return;
    }

    const queryString = parsedWishlist.join(',');

    const shareUrl = `${window.location.href}?wishlist=${queryString}`;

    // copy to clipboard
    await navigator.clipboard.writeText(shareUrl);
  }

  setCounter(count: number): void {
    const counter = document.getElementById('counter-indicator') as HTMLElement;
    if (!counter) return;

    counter.textContent = count.toString();
    counter.classList.toggle('tw:hidden', count === 0);
    counter.classList.toggle('tw:flex', count > 0);
  }
}
