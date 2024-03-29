const express = require('express')

//const bodyParser=require('body-parser')


const server = express()
server.use(express.json({ limit: '50mb' }))
//引入中间件
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/account', require('./router/account'));
server.use('/wenzi', require('./router/wenzi'));
server.use('/dianzan', require('./router/dianzan'));
server.use('/msg', require('./router/msg'));
server.use('/getmsg', require('./router/getmsg'));
server.use(express.static('../boke/dist'))
server.use(express.static('./upload'));
server.listen(8080, () => {
    console.log('server is running at port 8080')
})
