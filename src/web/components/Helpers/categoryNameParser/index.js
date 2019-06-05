export const parseToKey = categoryName =>
  categoryName.includes('&')
    ? categoryName.replace(' & ', '_')
    : categoryName.replace(' ', '-')

export const parseToValue = categoryName =>
  categoryName.includes('_')
    ? categoryName.replace('_', ' & ')
    : categoryName.replace('-', ' ')
