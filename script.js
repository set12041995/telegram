let block = document.querySelector('.block');
let bodyWidth = document.body.clientWidth - 100;
let bodyHeight = document.body.clientHeight - 100;

setInterval(() => {
  let left = Math.floor(Math.random() * bodyWidth);
  let top = Math.floor(Math.random() * bodyHeight);
  block.style.left = left + "px";
  block.style.top = top + "px";
  block.style.background = "#" + Math.floor(Math.random() * 999999);
}, 1000);
