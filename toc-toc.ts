class TocToc extends HTMLElement {
  connectedCallback() {
    this.createTOC();
  }

  get target() {
    return this.getAttribute('target');
  }

  set target(newValue) {
    this.setAttribute('target', newValue);
  }

  get targetElement() {
    return document.querySelector(this.target);
  }

  get titles() {
    const target = this.targetElement;
    const titres = target.querySelectorAll("h1, h2, h3, h4, h5, h6");
    console.log(titres);
    return titres;
  }

  createTOC() {
    const titles = this.titles;
    titles.forEach(title => {
      this.innerHTML += `<h2>${title.innerHTML}</h2>`
    });
  }

}

customElements.define('toc-toc', TocToc);
