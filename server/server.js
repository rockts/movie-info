const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
    res.send({
        msg: 'hello node'
    })
})

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send({
        code: 200,
        data: req.body
    })
})

sequelize.sync()
    .then(() => {
        console.log('🟢 连接已成功建立。')
        app.listen(3000, () => console.log('🚛 服务器已在端口 3000 上启动'))
    })
    .catch(err => {
        console.error('❌ 无法连接到数据库:', err)
    })
