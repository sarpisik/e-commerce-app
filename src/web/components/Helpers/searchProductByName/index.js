export default (text, obj) => {
  const items = Object.values(obj)
    .slice(0, -1)
    .flat();
  const products = items.filter(({ name }) => name.search(text) > -1);
  return products || '';
};

export const getCategories = obj => Object.keys(obj).slice(0, -1);
