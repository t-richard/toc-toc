class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello ${this.name}.</h1>`
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(newValue) {
    this.setAttribute('name', newValue);
  }
}

customElements.define('hello-world', HelloWorld);
