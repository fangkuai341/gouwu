const db = require("../core/mysql");
const moment = require("moment");
class CartsController {

    //购物车 添加购物车
    async addCart(request, resposne, next) {
        try {
            // 拿到 U_ID
            let queryParams = [
                request.Info.U_ID,
                request.body.pid
            ]
            //根据用户的id和 产品的id 去数据库里查询一次,如果有 就修改输了,否则就插入一条新的
            let query = " SELECT * FROM `carts` WHERE U_ID=? AND P_ID=? ";


            let querReuslt = await db.exec(query, queryParams);

            // 判断是否已经购买过?
            if (querReuslt.length >= 1) {
                //已经购买了
                let updatePrams = [
                    Number(request.body.pnumber),
                    request.Info.U_ID,
                    request.body.pid
                ]

                console.log(updatePrams)

                let updateSQL = 'UPDATE `carts` SET P_NUMBER=P_NUMBER+? , P_TOTAL=P_NUMBER*P_PRICE WHERE U_ID=? AND P_ID=?;'

                let updateResult = await db.exec(updateSQL, updatePrams);
                if (updateResult && updateResult.affectedRows >= 1) {

                    resposne.json({
                        code: 200,
                        msg: "加入购车成功u",
                    })
                } else {
                    resposne.json({
                        code: 200,
                        msg: "加入购车失败u",

                    })
                }
            } else {
                //还没购买

                let insertParmas = [
                    request.Info.U_ID,
                    request.body.pid,
                    request.body.pname,
                    request.body.pimg,
                    request.body.pnumber,
                    request.body.pprice,
                    request.body.pprice * request.body.pnumber,
                    moment().format("YYYY-MM-DD HH:mm:ss")

                ]
                let insertSql = "INSERT INTO carts (`U_ID`,`P_ID`,`P_NAME`,`P_IMG`,`P_NUMBER`,`P_PRICE`,P_TOTAL) ";
                insertSql += " values(?,?,?,?,?,?,?,?);";

                let resultInset = await db.exec(insertSql, insertParmas);

                //affectedRows
                if (resultInset && resultInset.affectedRows >= 1) {
                    resposne.json({
                        code: 200,
                        msg: "加入购车成功i",
                    })
                } else {
                    resposne.json({
                        code: 200,
                        msg: "加入购车失败i",
                    })
                }



            }

        } catch (error) {
            resposne.json({
                code: -200,
                msg: "加入购车失败",
                error
            })
        }

    }
    // 修改数量
    async modifyCart(request, resposne, next) {

        let parmas = [
            request.body.pnumber,
            request.body.cid,
        ]
        let sql = "UPDATE carts SET `P_NUMBER`=?  ,`P_TOTAL`=`P_NUMBER`*`P_PRICE` WHERE c_id=? and P_STATUS=1 ;";

        try {
            let result = await db.exec(sql, parmas);
            if (result && result.affectedRows >= 1) {
                resposne.json({
                    msg: "修改成功",
                    code: 200
                })
            } else {
                resposne.json({
                    msg: "修改失败",
                    code: 200
                })
            }

        } catch (error) {
            console.log(error);

            resposne.json({
                msg: "修改失败",
                code: -200,
                error //error 之后再后台的控制台中输出,不能带到前端,测试而已
            })
        }

    }
    // 删除购物车
    async deleteCart(request, resposne, next) {

        let parmas = [
            request.body.cid,
        ]
        let sql = "UPDATE carts SET `P_STATUS` = 0  ,`P_TOTAL`=`P_NUMBER`*`P_PRICE` WHERE c_id=? and P_STATUS=1;";

        try {
            let result = await db.exec(sql, parmas);
            if (result && result.affectedRows >= 1) {
                resposne.json({
                    msg: "删除成功",
                    code: 200
                })
            } else {
                resposne.json({
                    msg: "删除失败",
                    code: 200
                })
            }

        } catch (error) {
            console.log(error);

            resposne.json({
                msg: "删除失败",
                code: -200,
                error //error 之后再后台的控制台中输出,不能带到前端,测试而已
            })
        }

    }
    // 结算 把状态1 改成2
    async giveMoney(request, resposne, next) {
        resposne.send("addCart")
    }


    //添加文章
    async addWenzhang(request, resposne, next) {
        try {
            let insertParmas = [
                request.body.title,
                request.body.introduction,
                request.body.biaoqian,
                +request.body.isgood,
                request.body.img,
                +request.body.isGhost,
                moment().format("YYYY-MM-DD HH:mm:ss")]
            let insertSql = "INSERT INTO wenzhang (`title`,`introduction`,`biaoqian`,`isgood`,`img`,`isGhost`,`time`)";
            insertSql += " values(?,?,?,?,?,?,?);";
            let resultInset = await db.exec(insertSql, insertParmas);
            if (resultInset && resultInset.affectedRows >= 1) {
                console.log(resultInset)
                resposne.json({
                    code: 200,
                    msg: "插入成功",
                    data: resultInset.insertId

                })
            } else {
                resposne.json({
                    code: 200,
                    msg: "插入失败",
                })
            }
        } catch (error) {
            resposne.json({
                code: -200,
                msg: "插入失败",
                error
            })
        }

    }
    //添加文章内容
    async addWenzhangconcet(request, resposne, next) {
        try {
            let insertParmas = [
                request.body.id,
                request.body.content]
            let insertSql = "INSERT INTO wenzicontent (`id`,`content`)";
            insertSql += " values(?,?);";
            let resultInset = await db.exec(insertSql, insertParmas);
            if (resultInset && resultInset.affectedRows >= 1) {
                console.log(resultInset)
                resposne.json({
                    code: 200,
                    msg: "插入成功",
                    data: resultInset

                })
            } else {
                resposne.json({
                    code: 200,
                    msg: "插入失败",
                })
            }
        } catch (error) {
            resposne.json({
                code: -200,
                msg: "插入失败",
                error
            })
        }

    }
    // 获取全部文章信息
    async getCartByUser(request, resposne, next) {
        //1.得到当前的用户id
        let sql = "select * from wenzhang";
        try {
            let result = await db.exec(sql);
            resposne.json({
                code: 200,
                msg: "查询成功",
                data: result
            })

        } catch (error) {
            resposne.json({
                code: -200,
                msg: "查询失败"
            })
        }

    }
    //获取文章内容
    async getwenzahngconcetByUser(request, resposne, next) {
        //1.得到当前的用户id
        let sql = "select * from wenzhang left outer join wenzicontent on wenzhang.id=wenzicontent.id where wenzhang.id=?";
        let parmas = [
            request.query.wenzhangId,
        ]
        try {
            let result = await db.exec(sql, parmas);
            resposne.json({
                code: 200,
                msg: "查询成功",
                data: result
            })

        } catch (error) {
            resposne.json({
                code: -200,
                msg: "查询失败"
            })
        }

    }
}

module.exports = new CartsController();