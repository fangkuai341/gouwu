const express = require('express')
const jwt = require('jwt-simple')
let router = express.Router();
// 需要tonke
// router拦截

const upload = require('../middlewares/upload')
router.get("/getCart", require("../controller/wenzi").getCartByUser);
router.get("/getwenzahngconcetByUser", require("../controller/wenzi").getwenzahngconcetByUser);
router.post("/deleteCart", require("../controller/wenzi").deleteCart);
router.post("/modifyCart", require("../controller/wenzi").modifyCart);
router.post("/addWenzhang", require("../controller/wenzi").addWenzhang);
router.post("/addWenzhangconcet", require("../controller/wenzi").addWenzhangconcet);
module.exports = router;