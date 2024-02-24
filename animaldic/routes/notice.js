import express from "express";
import DB from "../models/index.js";
const NOTICE = DB.models.tbl_notice;
const router = express.Router();

router.get("/", (req, res) => {
  res.render("menu/notice");
});

router.get("/nwrite", (req, res) => {
  res.render("menu/nwrite");
});

export default router;
