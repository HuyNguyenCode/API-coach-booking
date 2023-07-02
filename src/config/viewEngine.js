import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public")); // Cấu hình static (chỉ lấy các tài nguyên static qua đường link public này)
  app.set("view engine", "ejs"); // cấu hình view engine dùng thư viện "ejs" giúp dùng được if else,for,... trong HTML
  app.set("views", "./src/views") // path lấy view engine: sử dụng các ejs trong folder views 
};

module.exports = configViewEngine;
