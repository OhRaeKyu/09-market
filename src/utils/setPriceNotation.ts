export const setPriceNotation = (num: number) => {
  let numStr: string = num.toString();
  return numStr.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
