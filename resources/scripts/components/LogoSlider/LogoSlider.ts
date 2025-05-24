export default class LogoSlider extends HTMLElement {
  numberOfCopies: number = 3;

  logosContainer: HTMLElement | null = null;

  originalSlide: HTMLElement | null = null;

  scrollTimeout: number | undefined;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.logosContainer = this.querySelector('.logos');
    this.originalSlide = this.querySelector('.logos-slide');

    if (!this.logosContainer || !this.originalSlide) {
      console.error('logosContainer or originalSlide not found.');
      return;
    }

    this.cloneSlides(this.numberOfCopies);

    this.logosContainer.addEventListener('scroll', () => this.debounce(this.handleScroll.bind(this), 100));
  }

  cloneSlides(count: number, prepend: boolean = false): void {
    if (!this.logosContainer || !this.originalSlide) return;

    const fragment = document.createDocumentFragment();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      const copy = this.originalSlide.cloneNode(true) as HTMLElement;
      fragment.appendChild(copy);
    }

    if (prepend) {
      this.logosContainer.insertBefore(fragment, this.logosContainer.firstChild);
    } else {
      this.logosContainer.appendChild(fragment);
    }
  }

  handleScroll(): void {
    if (!this.logosContainer || !this.originalSlide) return;

    const scrollPosition = this.logosContainer.scrollLeft;
    const slideWidth = this.originalSlide.clientWidth;

    if (scrollPosition >= (this.numberOfCopies - 1) * slideWidth) {
      this.cloneSlides(1);
      // eslint-disable-next-line no-plusplus
      this.numberOfCopies++;
    }

    if (scrollPosition <= slideWidth) {
      this.cloneSlides(1, true);
      this.logosContainer.scrollLeft += slideWidth;
      // eslint-disable-next-line no-plusplus
      this.numberOfCopies++;
    }
  }

  debounce(func: () => void, wait: number): void {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(func, wait);
  }
}
