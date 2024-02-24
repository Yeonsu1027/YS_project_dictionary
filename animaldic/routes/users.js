import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

//----------------------- 경우씨
// router.get("/join", async (req, res) => {
//   res.render("join");
// });
router.get("/find", async (req, res) => {
  res.render("menu/find");
});
router.get("/find_id", async (req, res) => {
  res.render("menu/find_id");
});
router.get("/find_pw", async (req, res) => {
  res.render("menu/find_pw");
});
//----------------------------------- 희원씨

import DB from "../models/index.js";

const USER = DB.models.tbl_members;

let crypto;
try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error(`Crypt 모듈을 사용할 수 없음 ${error}`);
}

router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/join", (req, res) => {
  res.render("menu/join");
});

router.post("/join", async (req, res) => {
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }

  const password = req.body.m_password;

  const hashAlgorithm = await crypto.createHash("sha512");
  const hashing = await hashAlgorithm.update(password);
  const hashPassword = await hashing.digest("base64");
  req.body.m_password = hashPassword;

  const result = await USER.create(req.body);

  // return res.redirect("menu/login");
  return res.redirect("/login");
});

router.get("/:m_username/check", async (req, res) => {
  const m_username = req.params.m_username;
  const row = await USER.findByPk(m_username);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

//--------------- 마이페이지

router.get("/mypage", async (req,res)=>{
  const user = req.session.user ? req.session.user.m_username : undefined;
  if(!user){
    return res.redirect("/")
  } else {
    return res.render("menu/mypage/mypage")

  }

})
export default router;
