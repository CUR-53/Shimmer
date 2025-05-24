export default class AnchorTargetBlank {
  targetAttribute: string = '_blank';

  constructor() {
    this.init();
  }

  init() {
    setTimeout(() => {
      const allLinks = Array.from(document.querySelectorAll('a')) as HTMLAnchorElement[];
      allLinks.forEach((link) => {
        if (link.host !== window.location.host) {
          link.setAttribute('target', this.targetAttribute);
        }
      });
    }, 1000);
  }
}
