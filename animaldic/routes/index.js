import express from "express";
import DB from "../models/index.js";

import { upLoad } from "../modules/file_upload.js";

const ANIMAL = DB.models.tbl_animal;
const CHECK = DB.models.tbl_check;
const USER = DB.models.tbl_members;
const MYANIMAL = DB.models.tbl_myanimal;

const router = express.Router();

router.get("/", async (req, res) => {
  // 오류 안나게 : 로그인했으면 id 담고, 없으면 언디파인드
  const user = req.session.user ? req.session.user.m_username : undefined;

  //로그인했을때만
  if (user) {
    // 나의 동물정보가져오고
    const myanimal = await MYANIMAL.findByPk(user);
    // 아이디에 해당하는 모든 체크리스트 가져오게
    try {
      const rows = await CHECK.findAll({
        where: {
          u_user: user,
        },
      });
      res.render("menu/home/home", { check: rows, myanimal }); //체크리스트 정보랑 동물정보 pug에보내고
    } catch (error) {
      return res.json("에러.");
    }
    // 로그인 안했으면 로그인정보 없는 화면 보여지게.. pug에서 처리할거
  } else {
    // return res.json("로그인안했음");
    res.render("menu/home/home");
  }
}); //기본 홈

// router.post("/", async (req, res) => {
//   // 체크리스트 마지막 번호 가져오기
//   const strchecknum = await CHECK.findAll({ order: [["u_num", "DESC"]], limit: 1 });
//   const num = strchecknum[0].u_num; // json으로 확인해보니 배열1개로 들어있음
//   const intchecknum = Number(num) + 1;

//   // test
//   // return res.json({ intchecknum }); // 번호생성체크용
//   // return res.json({ strchecknum }); // 정상적으로 가져와짐

//   // 안보이는 인풋칸 일련번호, 아이디 넣기 자동생성
//   req.body.u_num = intchecknum; // 입력데이터 일련번호 자동생성
//   req.body.u_user = req.session.user.m_username; //= 로그인한 아이디 자동입력

//   await CHECK.create(req.body);
//   return res.redirect("/");
// });
router.post("/", async (req, res) => {
  // 체크리스트 마지막 번호 가져오기
  const strchecknum = await CHECK.findAll({ order: [["u_num", "DESC"]], limit: 1 });
  let intchecknum;

  if (strchecknum.length > 0) {
    const num = strchecknum[0].u_num;
    intchecknum = Number(num) + 1;
  } else {
    // 테이블에 정보 하나도 없으면
    intchecknum = 0;
  }

  // test
  // return res.json({ intchecknum }); // 번호생성체크용
  // return res.json({ strchecknum }); // 정상적으로 가져와짐

  // 안보이는 인풋칸 일련번호, 아이디 넣기 자동생성
  req.body.u_num = intchecknum; // 입력데이터 일련번호 자동생성
  req.body.u_user = req.session.user.m_username; //= 로그인한 아이디 자동입력

  await CHECK.create(req.body);
  return res.redirect("/");
});

//----------- 홈 리스트 삭제
router.get("/:u_num/delete", async (req, res) => {
  CHECK.destroy({ where: { u_num: req.params.u_num } }).then(() => {
    res.redirect("/");
  });
});
//--------------- 홈 리스트 체크표시추가

router.get("/:u_num/check", async (req, res) => {
  const u_num = req.params.u_num;
  const row = await CHECK.findByPk(u_num);

  if (row.u_checkmark === null) {
    row.u_checkmark = 1;
  } else if (row.u_checkmark === 1) {
    row.u_checkmark = null;
  }

  await row.save();

  return res.redirect("/");
});

//---------------------------- 홈 반려동물추가
router.get("/insert", (req, res) => {
  const user = req.session.user ? req.session.user : undefined;
  if (user) {
    const user = req.session.user ? req.session.user.m_username : undefined;
    const row = MYANIMAL.findAll({ where: { ma_user: user } }); // 나의 동물정보 사진을 등록해두었으면 보여지게
    res.render("menu/home/myanimal", { myanimal: row }); // 로그인했으면 동물정보 추가 이동가능
  } else {
    res.redirect("/"); // 로그인안했으면 못들어가게
  }
});

router.post("/insert", upLoad.single("ma_image"), async (req, res) => {
  // const user = req.session.user.m_username;
  const user = req.session.user ? req.session.user.m_username : undefined;
  req.body.ma_user = user;

  const file = req.file;

  if (file) {
    req.body.ma_image_name = file.filename;
    req.body.ma_image_origin_name = file.originalname;
  }
  try {
    await MYANIMAL.create(req.body);
    return res.redirect("/");
  } catch (error) {
    // return res.json(error);
    console.log(error);
  }
});

//----------------- 반려동물 정보 수정
router.get("/update", async (req, res) => {
  const userinfrom = req.session.user ? req.session.user : undefined;
  if (userinfrom) {
    const user = req.session.user ? req.session.user.m_username : undefined;

    const myanimal = await MYANIMAL.findByPk(user);
    res.render("menu/home/myanimal", { myanimal });
  } else {
    res.redirect("/"); // 로그인안했으면 못들어가게
  }
});

router.post("/update", upLoad.single("ma_image"), async (req, res) => {
  const user = req.session.user ? req.session.user.m_username : undefined;

  const updateData = {
    ma_animalname: req.body.ma_animalname,
    ma_age: req.body.ma_age,
    ma_memo: req.body.ma_memo,
  };

  if (req.file) {
    updateData.ma_image_name = req.file.filename;
    updateData.ma_image_origin_name = req.file.originalname;
  }

  MYANIMAL.update(updateData, {
    where: { ma_user: user },
  }).then(() => {
    res.redirect("/");
  });
});
// ---------- END HOME -------------------------

// 메뉴들 ------------------------------

// router.get("/freeboard", async (req, res) => {
//   res.render("menu/freeboard/freeboard");
// });

// router.get("/notice", async (req, res) => {
//   res.render("menu/notice");
// });
router.get("/login", async (req, res) => {
  res.render("menu/login");
});
// 임시적용
// const LOGIN_MESSAGE = {
//   USER_NOT: "사용자 ID 없음",
//   PASS_WRONG: "비밀번호 오류",
//   NEED_LOGIN: "로그인 필요",
// };

// router.get("/login", (req, res) => {
//   const message = req.query.fail;
//   return res.render("menu/login", { NEED: message });
// });
// router.post("/login", async (req, res) => {
//   const username = req.body.m_username;
//   const password = req.body.m_password;

//   const result = await USER.findByPk(username);
//   if (!result) {
//     return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
//   } else if (result.m_username === username) {
//     if (result.m_password === password) {
//       req.session.user = result;
//       return res.redirect("/");
//     } else {
//       return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
//     }
//   }
//   {
//     req.session.user = result;
//     return res.redirect("/");
//   }
// });

//-------
let crypto; //오류 날 수있어서 이런형태 권장
try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error(`Crypt 모듈을 사용할 수 없음 ${error}`);
}

// // -------------------

// 경우씨 코드 -- 회원가입 미완성으로 작동 확인불가능
router.get("/login", async (req, res) => {
  const message = req.query.fail;
  res.render("menu/login", { NEED: message });
});
router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;

  const result = await USER.findByPk(username);
  if (!result) {
    return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_username === username) {
    // const hashAlgorithm = await crypto.createHash("");
    // const hashing = hashAlgorithm.update(password);
    // const hashPassword = hashing.digest("");

    // 수정
    const hashAlgorithm = crypto.createHash("sha512");
    const hashing = hashAlgorithm.update(password);
    const hashPassword = hashing.digest("base64");

    if (result.m_password === hashPassword) {
      req.session.user = result;
      return res.redirect("/");
    } else {
      return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WORNG}`);
    }
  }
});
const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID없음",
  PASS_WORNG: "비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}); // 로그아웃

// --------------------
// router.get("/join", async (req, res) => {
//   res.render("menu/join");
// });
// 동물들 ---------------------------------------

// pk용
const 동물이름 = {
  기니피그: "기니피그",
  친칠라: "친칠라",
  햄스터: "햄스터",
  금붕어: "금붕어",
  구피: "구피",
  네온테트라: "네온테트라",
  앵무새: "앵무새",
  카나리아: "카나리아",
  십자매: "십자매",
  뱀: "뱀",
  거북이: "거북이",
  도마뱀: "도마뱀",
  강아지: "강아지",
  고양이: "고양이",
  라쿤: "라쿤",
};

router.get("/mouse1", async (req, res) => {
  const animalname = 동물이름.기니피그;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse1", { adata: animaldata });
});
router.get("/mouse2", async (req, res) => {
  const animalname = 동물이름.친칠라;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse2", { adata: animaldata });
});
router.get("/mouse3", async (req, res) => {
  const animalname = 동물이름.햄스터;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse3", { adata: animaldata });
});
// - 물고기
router.get("/fish1", async (req, res) => {
  const animalname = 동물이름.금붕어;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish1", { adata: animaldata });
});
router.get("/fish2", async (req, res) => {
  const animalname = 동물이름.구피;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish2", { adata: animaldata });
});
router.get("/fish3", async (req, res) => {
  const animalname = 동물이름.네온테트라;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish3", { adata: animaldata });
});
//- 새
router.get("/bird1", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/bird/bird1", { adata: animaldata });
});
router.get("/bird2", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/bird/bird2", { adata: animaldata });
});
router.get("/bird3", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/bird/bird3", { adata: animaldata });
});
//- 파충류
router.get("/snake1", async (req, res) => {
  const animalname = 동물이름.뱀;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/snake/snake1", { adata: animaldata });
});
router.get("/snake2", async (req, res) => {
  const animalname = 동물이름.거북이;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/snake/snake2", { adata: animaldata });
});
router.get("/snake3", async (req, res) => {
  const animalname = 동물이름.도마뱀;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/snake/snake3", { adata: animaldata });
});
//- 포유류
router.get("/cat1", async (req, res) => {
  const animalname = 동물이름.강아지;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/cat/cat1", { adata: animaldata });
});
router.get("/cat2", async (req, res) => {
  const animalname = 동물이름.고양이;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/cat/cat2", { adata: animaldata });
});
router.get("/cat3", async (req, res) => {
  const animalname = 동물이름.라쿤;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/cat/cat3", { adata: animaldata });
});

export default router;
