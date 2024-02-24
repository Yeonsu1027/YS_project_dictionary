import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
const USER = DB.models.tbl_members;
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

//----------------------- 로그인
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
//----------------------------------- 회원가입



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
    const row = await USER.findByPk(user);
    return res.render("menu/mypage/mypage", {row})

  }

});
// 정보수정
router.get("/mypage_update", async (req,res)=>{
  const user = req.session.user ? req.session.user.m_username : undefined;
  if(!user){
    return res.redirect("/")
  } else {
    const row = await USER.findByPk(user);
    return res.render("menu/mypage/update", {row})
  
  }

});

router.post("/mypage_update",upLoad.single("m_image"), async (req,res)=>{
  const user = req.session.user ? req.session.user.m_username : undefined;

  const updateData = {
    m_realname: req.body.m_realname,
    m_tel: req.body.m_tel
  };

  if (req.file) {
    updateData.m_image_name = req.file.filename;
    updateData.m_image_origin_name = req.file.originalname;
    // 세션엔 로그인할때 맨처음의.. 원래정보 들어가니까 여기도 수정
    // 바뀐사진 나오게
    req.session.user.m_image_name = req.file.filename;
  }

  USER.update(updateData, {
    where: { m_username: user },
  })
  .then(() => {
    res.redirect("/users/mypage");
  });
});




export default router;
