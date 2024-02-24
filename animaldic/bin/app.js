/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2024-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";
import helmet from "helmet";
// session 도구 import  <<<<<<<<
import session from "express-session";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// import router modules
import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";
import freeRouter from "../routes/free.js";
import noticeRouter from "../routes/notice.js";

// create express framework
const app = express();

// helmet security module
app.use(helmet());

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

app.use(
  session({
    key: "callor", // 식별자, 브라우저에 저장될 cookie 이름
    secret: "callor@callor.com", // SessionID 암호화용 키 아무말
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1분, 1시간 //유효시간        지나면자동삭제
    },
  })
);

app.use((req, res, next) => {
  //공통라우터
  res.locals = req.session; // 응답의 로케이션에 세션정보를 저장한다
  next();
});

// router link enable, link connection
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/freeboard", freeRouter);
app.use("/notice", noticeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
