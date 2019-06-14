export const getCategories = obj => Object.keys(obj).slice(0, -1);

class Search {
  constructor() {
    this.expression = /[A-Za-z]+/g;
  }

  getFoundItems = (text, obj) => {
    this.filterText(text);
    this.searchItemsByFilteredText(obj);
    return this.foundItems || '';
  };

  filterText = text => {
    this.filteredText =
      text.match(this.expression) && text.match(this.expression)[0];
    return this.filteredText;
  };

  searchItemsByFilteredText = obj => {
    this.foundItems = Object.values(obj)
      .slice(0, -1)
      .flat()
      .filter(({ name }) => name.search(this.filteredText) > -1);
  };
}

export default new Search();
