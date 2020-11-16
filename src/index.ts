class Index extends HTMLElement {
  connectedCallback() {
    this.createTOC();
  }

  get target() {
    return this.getAttribute('target') || 'body';
  }

  set target(newValue) {
    this.setAttribute('target', newValue);
  }

  get primary() {
    return this.getAttribute('primary') || 'h1';
  }

  set primary(newValue) {
    this.setAttribute('primary', newValue);
  }

  get secondary() {
    return this.getAttribute('secondary') || 'h2';
  }

  set secondary(newValue) {
    this.setAttribute('secondary', newValue);
  }

  get tertiary() {
    return this.getAttribute('tertiary') || 'h3,h4,h5,h6';
  }

  set tertiary(newValue) {
    this.setAttribute('tertiary', newValue);
  }

  get targetElement() {
    return document.querySelector(this.target);
  }

  get primaryElements() {
    return document.querySelectorAll(this.primary);
  }

  get secondaryElements() {
    return document.querySelectorAll(this.secondary);
  }

  get tertiaryElements() {
    return document.querySelectorAll(this.tertiary);
  }

  get titleElements() {
    return <HTMLElement[]><any>this.targetElement.querySelectorAll(
        [this.primary, this.secondary, this.tertiary].join(',')
    );
  }

  createTOC() {
    this.titleElements.forEach(title => {
      if (!title.id) {
        title.id = this.slugify(title.innerText);
      }
      if (title.matches(this.primary)) {
        this.innerHTML += `<div class="toc-primary"><a href="#${title.id}">${title.innerText}</a></div>`
      }
      if (title.matches(this.secondary)) {
        this.innerHTML += `<div class="toc-secondary"><a href="#${title.id}">${title.innerText}</a></div>`
      }
      if (title.matches(this.tertiary)) {
        this.innerHTML += `<div class="toc-tertiary"><a href="#${title.id}">${title.innerText}</a></div>`
      }
    });
  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return str;
  }
}

customElements.define('toc-toc', Index);
