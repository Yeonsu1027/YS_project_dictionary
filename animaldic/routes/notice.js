import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { upLoad } from "../modules/file_upload.js";


const NOTICE = DB.models.tbl_notice;
const router = express.Router();

router.get("/", async (req, res) => {

  const row = await NOTICE.findAll();

  res.render("menu/notice/notice",{row});
});
// ----------------------------- 작성
router.get("/insert", async (req,res)=>{
const manager = req.session.user ? req.session.user.m_role : undefined;
  if (manager === "ADMIN") {

    res.render("menu/notice/insert")
  }
  else {
    res.redirect("/"); // 관리자 로그인시에만 접근가능
  }
})

router.post("/insert", upLoad.single("n_image"), async (req,res)=>{
  const manager = req.session.user ? req.session.user.m_username : undefined;
  req.body.n_date= moment().format("YYYY-MM-DD");
  req.body.n_author = manager;

  const file = req.file;

  if (file) {
    req.body.n_image_name = file.filename;
    req.body.n_image_origin_name = file.originalname;
  }
  try {
    await NOTICE.create(req.body);
    res.redirect("/notice")
  } catch (error) {
    // return res.json(error);
    console.log(error);
  }

})


export default router;
