const express = require('express')
const jwt = require('jwt-simple')
let router = express.Router();

const upload = require('../middlewares/upload')
router.get("/getMsg", require("../controller/msg").getMsg);
module.exports = router;