export const shortValue = (value) => {
  if (value) {
    let span = document.createElement("span");
    let lengthSupply = Math.ceil(value).toString().length;
    switch (true) {
      case (lengthSupply < 4):
        span.innerText = Math.ceil(value).toString();
        break;
      case (lengthSupply < 7):
        span.innerText = (value / 1000).toFixed(2) + 'h';
        break;
      case (lengthSupply < 10):
        span.innerText = (value / 1000000).toFixed(2) + 'm';
        break;
      default:
        span.innerText = Math.ceil(value / 1000000000) + 'b';
        break;
    }
    return span;
  }
  return 0;
};