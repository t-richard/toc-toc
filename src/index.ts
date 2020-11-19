class Index extends HTMLElement {
  connectedCallback() {
    this.createTOC();
    const button = document.querySelector("#menu-button").addEventListener("click",() => this.showList());

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

  get titleElements() {
    return <HTMLElement[]><any>this.targetElement.querySelectorAll(
        [this.primary, this.secondary, this.tertiary].join(',')
    );
  }

  createTOC() {
    let primaryList, secondaryList, tertiaryList;

    this.importCSS();

    this.titleElements.forEach(title => {
      if (!title.id) {
        title.id = this.slugify(title.innerText);
      }

      const levelInt =
        title.matches(this.primary) ? 1 :
        title.matches(this.secondary) ? 2 :
        title.matches(this.tertiary) ? 3 : -1;

      if (levelInt === 1 || (levelInt >= 1 && !primaryList)) {
        primaryList = this.generatePrimaryList(primaryList, levelInt === 1 ? title : null);
        secondaryList = null;
        tertiaryList = null;
      }
      if (levelInt === 2|| (levelInt >= 2 && !secondaryList)) {
        secondaryList = this.generateSecondaryList(primaryList, secondaryList, levelInt === 2 ? title : null);
        tertiaryList = null;
      }
      if (levelInt === 3 || (levelInt >= 3 && !tertiaryList)) {
        tertiaryList = this.generateTertiaryList(secondaryList, tertiaryList, levelInt === 3 ? title : null);
      }
    });
  }

  private generateTertiaryList(secondaryList, tertiaryList, title: HTMLElement) {
    return this.generateList(secondaryList.lastChild, tertiaryList, title, 'tertiary');
  }

  private generateSecondaryList(primaryList, secondaryList, title: HTMLElement) {
    return this.generateList(primaryList.lastChild, secondaryList, title, 'secondary');
  }

  private generatePrimaryList(primaryList, title: HTMLElement) {
    return this.generateList(this, primaryList, title, 'primary');
  }

  private generateList(parent, current, title: HTMLElement, level: string) {
    if (!current) current = this.createList(parent);
    this.createItem(current, title, level);
    return current;
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

  showList(){
    if (this.classList.contains("hidden")){
      this.classList.remove("hidden")
    } else {
      this.classList.add("hidden");
    }
  }

  importCSS(){
    this.innerHTML +=
        `<style type="text/css">
            toc-toc.tiles a{
                color: black;
                text-decoration: none;
            }
            
            toc-toc a.selected{
                font-weight: bold;
            }
            
            toc-toc.hidden {
                display: none;
                transition-duration: 1000ms;
            }
            
            .stick-left{
                position: fixed;
                overflow: auto;
                left: 0;
                top: 0;
                background-color: white;
                max-width: 300px;
                height: 100vh;
                box-shadow: 5px 0px 5px gray;
            }
            
            .tiles a{
                border-bottom: 1px solid lightgrey;
                padding: 5px;
                display: block;
            }
            
            .tiles a:hover{
                background-color: #e0e0e0;
                transition-duration: 300ms;

            }
            
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }
            .toc-primary a{
                font-size: 1.6rem;
            }
            .toc-secondary a{
                font-size: 1.4rem;
                padding-left: 20px;
            }
            .toc-tertiary a{
                font-size: 1.2rem;
                padding-left: 20px;
            }
        </style>`;
  }
}

customElements.define('toc-toc', Index);
