let scoreSub = localStorage.getItem("scoreSub");
let scoreAd = localStorage.getItem("scoreAd");
let scoreClose = localStorage.getItem("scoreClose");

document.addEventListener("DOMContentLoaded", function () {
  let startBtn = document.getElementById("start");
  let endBtn = document.getElementById("end");
  // let adBtn = document.getElementById('ad');
  let adBtn = document.querySelectorAll(".ad");
  let closeBtn = document.querySelectorAll(".close");
  let subBtn = document.querySelectorAll(".subscribe");

  let startTime = localStorage.getItem("startTime");
  let endTime = localStorage.getItem("endTime");

  let floatAd = document.querySelectorAll(".floatad");

  window.onload = showFloat();
  // 生成一个随机时间
  function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function showFloat() {
    console.log(floatAd);
    let randomTime = getRandomTime(1000, 5000); // 1秒到5秒之间的随机时间
    timeoutId = setTimeout(function () {
      floatAd[0].classList.remove("hidden");
      floatAd[1].classList.remove("hidden");
    }, randomTime);
  }

  // startButton 點擊事件監聽
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      startTime = new Date().getTime().toString();
      localStorage.setItem("startTime", startTime);

      scoreAd = 0;
      localStorage.setItem("scoreAd", scoreAd);
      scoreClose = 0;
      localStorage.setItem("scoreClose", scoreClose);
      scoreSub = 1;
      localStorage.setItem("scoreSub", scoreSub);

      // 跳轉到 game.html
      window.location.href = "game.html";
    });
  }

  // endButton 點擊事件監聽
  if (endBtn) {
    endBtn.addEventListener("click", function () {
      endTime = new Date().getTime().toString();
      localStorage.setItem("endTime", endTime);
      let elapsedTime = endTime - startTime;
      // console.log(endTime);
      // console.log(startTime);
      // console.log(elapsedTime);
      localStorage.setItem("endTime", endTime);
      // 跳轉到 end.html
      // window.location.href = 'end.html';
      window.location.href = `end.html?elapsedTime=${
        elapsedTime / 1000
      }&scoreAd=${scoreAd}&scoreClose=${scoreClose}&scoreSub=${scoreSub}`;
    });
  }

  // 點到廣告
  if (adBtn) {
    adBtn.forEach((ad) => {
      ad.addEventListener("click", function () {
        scoreAd++;
        localStorage.setItem("scoreAd", scoreAd);
        // console.log("點擊廣告");
      });
    });
  }

  // 點到關閉
  if (closeBtn) {
    closeBtn.forEach((closeBtn) => {
      closeBtn.addEventListener("click", function () {
        scoreClose++;
        localStorage.setItem("scoreClose", scoreClose);
        closeBtn.parentNode.parentNode.classList.add("hidden");
        clearTimeout(timeoutId);
        setTimeout(showFloat, 3000);
      });
    });
  }

  // 點到訂閱
  if (subBtn) {
    subBtn.forEach((sub) => {
      sub.addEventListener("click", function () {
        // scoreSub++;
        // localStorage.setItem("scoreSub", scoreSub);
        // console.log("點擊訂閱");
        subAd();
      });
    });
  }
});

let overlayCanvas;

let img_full = [];
let img_subscribe_buttons = [];
let full_index = Math.floor(Math.random() * 10);

let full_x;
let full_y;

let buttonX;
let buttonX_random = Math.random() * 561;
let buttonY_random = Math.random() * 386;
let color_random = Math.random() * 80 + 100;
let buttonY;
let buttonWidth;
let buttonHeight;
let isTimingStarted = false;
let isClicked = false;
let canvasShow = false;
function preload() {
  for (let i = 0; i < 10; i++) {
    img_full[i] = loadImage(`../image/full-${i + 1}.png`);
    img_subscribe_buttons[i] = loadImage(
      `../image/subscribe_button-${i + 1}.png`
    );
  }
}

function setup() {
  overlayCanvas = createCanvas(windowWidth, windowHeight);

  // 設定畫布樣式
  overlayCanvas.style("position", "fixed");
  overlayCanvas.style("top", "0");
  overlayCanvas.style("left", "0");
  overlayCanvas.style("width", "100%");
  overlayCanvas.style("height", "100%");
  overlayCanvas.style("z-index", "20");
  // 初始時先隱藏畫布
  overlayCanvas.style("display", "none");

  isTimingStarted = true;
  showCanvasWithRandomInterval();
  //   // 監聽遊戲開始事件
  //   document.addEventListener("gameStart", function () {
  //     // 啟動計時器
  //     isTimingStarted = true;

  //   });

  // 隨機時間間隔顯示畫布
}

function draw() {
  full_x = width / 2 - 300;
  full_y = 100;

  // 繪製載入的圖片
  image(img_full[full_index], full_x, full_y, 600, 400);

  //如果點到圖片就顯示已訂閱
  if (isClicked) {
    if (full_index === 1) {
      image(
        img_subscribe_buttons[full_index],
        full_x + 320,
        full_y + 120,
        150,
        200
      );
    } else {
      image(
        img_subscribe_buttons[full_index],
        full_x + 150,
        full_y + 320,
        300,
        50
      );
    }
  }

  // 繪製模擬的按鈕圖形
  //  noFill(); // 按鈕顏色
  //  rect(buttonX, buttonY, buttonWidth, buttonHeight);

  // 在按鈕上繪製文字
  fill(color_random);
  textSize(12);
  textAlign(CENTER, CENTER);
  buttonWidth = 40;
  buttonHeight = 14;
  buttonX = full_x + buttonX_random;
  buttonY = full_y + buttonY_random;
  text("x close", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

function mousePressed() {
  // 隱藏畫布
  if (
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonWidth &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonHeight
  ) {
    // 在這裡處理按鈕被點擊的邏輯
    overlayCanvas.style("display", "none");

    full_index = Math.floor(Math.random() * 5);
    buttonX_random = Math.random() * 561;
    isClicked = false;
    canvasShow = false;
    scoreClose++;
    // 再次設定隨機時間間隔顯示畫布
    showCanvasWithRandomInterval();
  }

  // 檢查是否點擊在 img_full 上
  if (
    mouseX >= full_x &&
    mouseX <= full_x + 600 &&
    mouseY >= full_y &&
    mouseY <= full_y + 400 &&
    canvasShow == true
  ) {
    // 添加 subscribe_buttons
    isClicked = true;

    subAd();
  } else if (canvasShow == true) {
    closeAlert();
  }
}

function showCanvasWithRandomInterval() {
  // 收到遊戲開始事件後 隨機時間間隔（3秒到5秒之間）呈現畫布
  if (isTimingStarted) {
    let randomInterval = Math.floor(Math.random() * (7000 - 3000) + 6000);
    setTimeout(() => {
      overlayCanvas.style("display", "block");
      isClicked = false;
      canvasShow = true;
    }, randomInterval);
  }
}

// 在視窗大小改變時調用的函數
function windowResized() {
  // 更新畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
