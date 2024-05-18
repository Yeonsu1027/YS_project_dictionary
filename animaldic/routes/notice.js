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

// 디테일
router.get("/:n_num/detail", async (req,res)=>{
const n_num = req.params.n_num;

const notice = await NOTICE.findByPk(n_num);

res.render("menu/notice/detail",{notice,n_num});

})

// 공지사항 디테일 - 수정
router.get("/:n_num/detail/update", async (req,res)=>{
  const n_num = req.params.n_num;
  
  const notice = await NOTICE.findByPk(n_num);
  
  res.render("menu/notice/insert",{notice, n_num});
  
  })

  router.post("/:n_num/detail/update", upLoad.single("n_image"), async (req,res)=>{
    const n_num = req.params.n_num;

    const updateData = {
      n_title: req.body.n_title,
      n_content: req.body.n_content,
    };

    if (req.file) {
      updateData.n_image_name = req.file.filename;
      updateData.n_image_origin_name = req.file.originalname;
    }

    NOTICE.update(updateData, {
      where: { n_num: n_num },
    }).then(() => {
      res.redirect(`/notice/${n_num}/detail`);
    });
  });
    
  // ${n_num}/delete 공지사항 삭제주소
  router.get("/:n_num/delete", async (req,res)=>{
    const n_num = req.params.n_num;
    NOTICE.destroy({ where: { n_num: n_num} }).then(() => {
      res.redirect(`/notice`);
    });
  })
    

    
    

  


export default router;
