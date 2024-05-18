import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
import { Op } from "sequelize";
import moment from "moment";
import * as crypto from "crypto";

const BBD = DB.models.tbl_bbd;
const USER = DB.models.tbl_members;

const router = express.Router();

let dbConn = null;
console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  const con = req.query.option;
  const search = req.query.search || "";
  const sort = req.query.sort || "num";
  const order = req.query.order || "ASC";

  if (con === "title") {
    const rows = await BBD.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { num: { [Op.like]: `%${search}%` } }],
      },
      order: [[sort, order]],
    });
    return res.render("menu/freeboard/list", { BBD: rows, search });
  } else {
    const rows = await BBD.findAll({
      where: {
        [Op.or]: [{ author: { [Op.like]: `%${search}%` } }, { num: { [Op.like]: `%${search}%` } }],
      },
      order: [[sort, order]],
    });
    return res.render("menu/freeboard/list", { BBD: rows, search });
  }
});

router.get("/", async (req, res) => {
  try {
    const rows = await BBD.findAll({ limit: 10 });
    return res.render("menu/freeboard/list", { BBD: rows });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", (req, res) => {
  const user = req.session.user ? req.session.user : undefined;
  if (user) {
    return res.render("menu/freeboard/insert");
  } else {
    res.redirect("/login"); // 로그인안했으면 로그인화면으로 보내기
  }

});

router.post("/insert", upLoad.single("image"), async (req, res) => {
  const user = req.session.user ? req.session.user.m_username : undefined;

let num;
const count = await BBD.count(); // 테이블에 있는 데이터 수 조회

if (count === 0) {
  // 테이블에 데이터가 없는 경우
  num = 1; // num을 1로 설정
} else {
  // 테이블에 데이터가 있는 경우
  const maxNumData = await BBD.max('num'); // num 값 중 가장 큰 값 조회
  num = maxNumData + 1; // 가장 큰 num 값에 1을 더한 값으로 설정
}

req.body.num = num;
  if (!user) {
    // 로그인되지 않은 상태일 때
    const username = req.body.author
    const password = req.body.password

    try {
      const result = await USER.findByPk(username);

      if (!result) {
        // 사용자를 찾지 못한 경우
        return res.send("사용자를 찾을 수 없습니다.");
      }

      const hashAlgorithm = crypto.createHash("sha512");
      const hashing = hashAlgorithm.update(password);
      const hashPassword = hashing.digest("base64");

      if (result.m_password === hashPassword) {
        req.session.user = { m_username: username }; // 세션에 사용자 정보 저장
        req.body.date = moment().format("YYYY-MM-DD");
        req.body.author = username;
        await BBD.create(req.body);
        return res.redirect("/freeboard");
      } else {
        // 비밀번호가 일치하지 않는 경우
        return res.send("비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error(error);
      return res.send("회원 확인 중 오류가 발생했습니다.");
    }
  }

  // 로그인된 상태일 때
  req.body.date = moment().format("YYYY-MM-DD");
  req.body.author = user;

  try {
    await BBD.create(req.body);
    return res.redirect("/freeboard");
  } catch (error) {
    return res.json(error);
  }
});

// const file = req.file;
// if (file) {
//   req.body.image_name = file.fieldname;
//   req.body.image_origin_name = file.originalname;
// }
// const bd_data = req.body;

// try {
//   await BBD.create(bd_data);
//   return res.redirect("/freeboard");
// } catch (error) {
//   return res.json(error);
// }

router.get("/:num/detail", async (req, res) => {
  
  const num = req.params.num;
  try {
    const row = await BBD.findByPk(num);
    return res.render("menu/freeboard/detail", { bd: row });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:num/update", async (req, res) => {
  const num = req.params.num;
  try {
    const row = await BBD.findByPk(num);
    return res.render("menu/freeboard/update", { bd: row });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:num/update", upLoad.single("image"), async (req, res) => {
  const user = req.session.user ? req.session.user.m_username : undefined;
  const num = req.params.num;
  

  if (!user) {
    // 로그인되지 않은 상태일 때
    const username = req.body.author;
    const password = req.body.password;

    try {
      const result = await USER.findByPk(username);

      if (!result) {
        // 사용자를 찾지 못한 경우
        return res.send("사용자를 찾을 수 없습니다.");
      }

      const hashAlgorithm = crypto.createHash("sha512");
      const hashing = hashAlgorithm.update(password);
      const hashPassword = hashing.digest("base64");

      if (result.m_password === hashPassword) {
        // 비밀번호가 일치하는 경우
        req.session.user = { m_username: username }; // 세션에 사용자 정보 저장
        req.body.date = moment().format("YYYY-MM-DD");
        req.body.author = username;

        const file = req.file;
        if (file) {
          req.body.image_name = req.file.filename;
          req.body.image_origin_name = req.file.originalname;
        }

        const bd_data = req.body;
        try {
          // 게시글을 업데이트합니다.
          await BBD.update(bd_data, { where: { num } });
          return res.redirect(`/freeboard/${num}/detail`);
        } catch (error) {
          // 업데이트 과정에서 오류가 발생한 경우
          console.error(error);
          return res.send("게시글을 업데이트하는 중 오류가 발생했습니다.");
        }
      } else {
        return res.status(401).send("사용자 인증에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      return res.send("회원 확인 중 오류가 발생했습니다.");
    }
  }

  // 로그인된 상태일 때
  const file = req.file;
  if (file) {
    req.body.image_name = req.file.filename;
    req.body.image_origin_name = req.file.originalname;
  }
  req.body.author = user;
  const bd_data = req.body;

  try {
    // 게시글을 업데이트합니다.
    await BBD.update(bd_data, { where: { num } });
    return res.redirect(`/freeboard/${num}/detail`);
  } catch (error) {
    // 업데이트 과정에서 오류가 발생한 경우
    console.error(error);
    return res.send("게시글을 업데이트하는 중 오류가 발생했습니다.");
  }
});

// 삭제

router.get("/:num/delete", async (req,res)=>{
  const num = req.params.num;
  await BBD.destroy({ where: { num } });
  return res.redirect("/freeboard");
});



export default router;
