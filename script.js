let block = document.querySelector(".block");
let bodyWidth = document.body.clientWidth / 2 + "px";
let bodyHeight = document.body.clientHeight / 2 + "px";
block.style.top = bodyHeight;
block.style.left = bodyWidth;
let blockWidth = "100px";
let blockHeight = "100px";
block.style.width = blockWidth;
block.style.height = blockHeight;

function createBoom() {
  let boom = document.createElement("div");
  boom.innerText = "БЕМС";
  boom.classList.add("boom");
  block.appendChild(boom);
  boom.style.position = "absolute";
  boom.style.top = "50%";
  boom.style.left = "50%";
  boom.style.transform = "translate(-50%, -50%)";
  boom.style.color = "blue";
  boom.style.fontSize = "30px";
  setTimeout(() => {
    block.removeChild(boom);
  }, 2000);
}

function movement(event) {
  if (event.code === "ArrowUp") {
    // w
    block.style.top = parseInt(block.style.top) - 10 + "px";
    if (parseInt(block.style.top) < 0) {
      block.style.top = parseInt(block.style.top) + 20 + "px";
      createBoom();
    }
  }

  if (event.code === "ArrowLeft") {
    // a
    block.style.left = parseInt(block.style.left) - 10 + "px";
    if (parseInt(block.style.left) < 0) {
      block.style.left = parseInt(block.style.left) + 20 + "px";
      createBoom();
    }
  }

  if (event.code === "ArrowDown") {
    // s
    block.style.top = parseInt(block.style.top) + 10 + "px";
    if (parseInt(block.style.top) > document.body.clientHeight - 100) {
      block.style.top = parseInt(block.style.top) - 20 + "px";
      createBoom();
    }
  }

  if (event.code === "ArrowRight") {
    // d
    block.style.left = parseInt(block.style.left) + 10 + "px";
    if (parseInt(block.style.left) > document.body.clientWidth - 100) {
      block.style.left = parseInt(block.style.left) - 20 + "px";
      createBoom();
    }
  }

  if (event.keyCode === 32) {
    // пробел
    block.style.top = parseInt(block.style.top) - 10 + "px";
    setTimeout(() => {
      block.style.top = bodyHeight;
      block.style.left = bodyWidth;
    }, 500);
  }

  if (event.ctrlKey) {
    block.style.height = parseInt(block.style.height) * 0.6 + "px";
    block.style.width = parseInt(block.style.width) * 1.25 + "px";
    block.style.transition = "all 0.5s ease";
  } else {
    block.style.width = blockWidth;
    block.style.height = blockHeight;
    block.style.transition = "all 0.5s ease";
  }
}

document.addEventListener("keydown", movement);
document.addEventListener("keyup", movement);
