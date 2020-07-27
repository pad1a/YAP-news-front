export default class Overflow {
  constructor(element, size) {
    this.Element = element;
    this.Size = size;
  }

  overflow() {
    const size = this.Size;
    const newsText = this.Element.text();
    if (newsText.length > size) {
      this.Element.text(`${newsText.slice(0, size)} ...`);
    }
  }
}
