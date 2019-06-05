export default text => {
  // If text includes '&' i.e 'Lights&Lightning', put white spaces before and after '&'.
  // Else, put white spaces between uppercase words.
  if (text.includes('&')) {
    return text.split('&').join(' & ')
  }
  return text.split(/(?=[A-Z])/).join(' ')
}
