document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const elapsedTime = Number(params.get("elapsedTime")).toFixed(0);

  const scoreAd = params.get("scoreAd");
  const scoreClose = params.get("scoreClose");
  const scoreSub = params.get("scoreSub");

  const timeDisplay = document.getElementById("time-display");
  if (timeDisplay) {
    timeDisplay.textContent = ` ${elapsedTime} 秒`;
  }
  const scoreAdDisplay = document.getElementById("score-ad-display");
  if (scoreAdDisplay) {
    scoreAdDisplay.textContent = `${scoreAd}次`;
  }
  const scoreXDisplay = document.getElementById("score-x-display");
  if (scoreXDisplay) {
    scoreXDisplay.textContent = ` ${scoreClose}則`;
  }
  const scoreSubDisplay = document.getElementById("score-sub-display");
  if (scoreSubDisplay) {
    scoreSubDisplay.textContent = `${scoreSub}次`;
  }
  const scoreSubScoreDisplay = document.getElementById(
    "score-subscore-display"
  );
  if (scoreSubScoreDisplay) {
    scoreSubScoreDisplay.textContent = ` ${scoreSub * 100} 元整`;
  }
});
