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
    let primaryList, secondaryList, tertiaryList;

    this.titleElements.forEach(title => {
      if (!title.id) {
        title.id = this.slugify(title.innerText);
      }
      if (title.matches(this.primary)) {
        if (!primaryList) primaryList = this.createList(this);
        secondaryList = null;
        tertiaryList = null;
        this.createItem(primaryList, title, 'primary');
      }
      if (title.matches(this.secondary)) {
        if (!primaryList) secondaryList = this.createList(this);
        this.createItem(secondaryList, null, 'primary');
        if (!secondaryList) secondaryList = this.createList(primaryList.lastChild);
        tertiaryList = null;
        this.createItem(secondaryList, title, 'secondary');
      }
      if (title.matches(this.tertiary)) {
        if (!primaryList) secondaryList = this.createList(this);
        this.createItem(secondaryList, null, 'primary');
        if (!secondaryList) secondaryList = this.createList(primaryList.lastChild);
        this.createItem(secondaryList, null, 'secondary');
        if (!tertiaryList) tertiaryList = this.createList(secondaryList.lastChild);
        this.createItem(tertiaryList, title, 'tertiary');
      }
    });
  }

  createList(parent: HTMLElement): HTMLElement {
    return parent.appendChild(document.createElement('ul'));
  }

  createItem(parent: HTMLElement, title: HTMLElement, level: string): HTMLElement {
    const li = document.createElement('li');
    li.classList.add(`toc-${level}`);

    if (title) {
      const link = document.createElement('a');
      link.href = `#${title.id}`;
      link.innerHTML = title.innerText;
      li.appendChild(link);
    } else {
      li.style.listStyle = 'none';
    }

    return parent.appendChild(li);
  }

  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to   = "aaaaeeeeiiiioooouuuunc------";

    for (let i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return str;
  }
}

customElements.define('toc-toc', Index);
