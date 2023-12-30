// import "./scss/stylesheets/style.scss";
// import "bootstrap/dist/js/bootstrap.min.js";
// const bootstrap = require("bootstrap");
const express = require("express");
const app = express();
// const Joi = require("@hapi/joi");

const path = require("path");
const sassMiddleware = require("node-sass-middleware");

// 設定視圖引擎為 HTML（而非 Pug）
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(
  sassMiddleware({
    src: path.join(__dirname, "scss"), // SCSS 檔案所在的目錄
    dest: path.join(__dirname, "public"), // 編譯後的 CSS 檔案輸出目錄
    debug: true,
    outputStyle: "compressed", // 選擇編譯後的 CSS 格式（壓縮）
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Server started on Port ${port}`));
