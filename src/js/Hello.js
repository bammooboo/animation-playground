export default class {
  
  constructor(rootElement) {
    this.rootElement = rootElement;
  }
  
  init() {
    console.log('hello');
    let html = `hello`;

    rootElement.innerHTML = html;
  }
};