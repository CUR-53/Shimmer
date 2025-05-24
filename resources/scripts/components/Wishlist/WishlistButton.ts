export default class WishlistButton extends HTMLElement {
  id = this.dataset.id as string;

  constructor() {
    super();
    this.addEventListeners = this.addEventListeners.bind(this);
    this.toggleProductInWishlist = this.toggleProductInWishlist.bind(this);
    this.checkIfProductIsInWishlist = this.checkIfProductIsInWishlist.bind(this);
  }

  connectedCallback(): void {
    this.checkIfProductIsInWishlist();
    this.addEventListeners();
  }

  addEventListeners(): void {
    this.addEventListener('click', (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      this.toggleProductInWishlist();
      this.animateWishlistButton(event);
    });
  }

  toggleProductInWishlist(): void {
    const wishlist = localStorage.getItem('wishlist');
    const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];

    // Wishlist is an array of handles
    const productIndex = parsedWishlist.findIndex((item) => item === this.id);

    if (productIndex !== -1) {
      parsedWishlist.splice(productIndex, 1); // Remove product
    } else {
      parsedWishlist.push(this.id); // Add product
    }

    localStorage.setItem('wishlist', JSON.stringify(parsedWishlist));
    this.classList.toggle('added-to-wishlist');

    // Dispatch event to update wishlist count
    const wishlistUpdatedEvent = new CustomEvent('wishlistUpdated', {
      detail: { wishlistCount: parsedWishlist.length, rerender: true },
    });

    document.dispatchEvent(wishlistUpdatedEvent);
  }

  checkIfProductIsInWishlist(): void {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
      const parsedWishlist = JSON.parse(wishlist);
      if (parsedWishlist.includes(this.id)) {
        this.classList.add('added-to-wishlist');
      }
    }
  }

  animateWishlistButton(event: MouseEvent | TouchEvent): void {
    const particleWrapper = this.querySelector('.particles-wrapper');
    if (!particleWrapper) return;

    // Get the correct coordinates based on the event type
    let clientX: number;
    let clientY: number;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      return;
    }

    // Calculate position relative to particleWrapper
    const rect = particleWrapper.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    for (let i = 0; i < 15; i += 1) {
      const particle = document.createElement('div');
      particle.classList.add('particles');

      // Randomize movement direction
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 20 + 10; // Spread particles outwards
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Position relative to click/touch
      particle.style.left = `${offsetX}px`;
      particle.style.top = `${offsetY}px`;
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);

      particleWrapper.appendChild(particle);

      // Remove particle after animation (matching duration in CSS)
      setTimeout(() => particle.remove(), 2000);
    }
  }
}
