const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//路径模块
const path = require('path')

const app = express();
//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
//配置页面
app.use(express.static(path.join(__dirname, 'public')))
//跨域模块
app.use(cors())

var { query } = require('./db/db'); //将db.js里面定义的query方法导入

const {
  fundraiserSheet, categorySheet
} = require('./db/actions');

//首页 为活动中的列表
app.get('/home', function (req, res, next) {
  fundraiserSheet.select(" active=1 ", (err, resdata) => {
    res.send({ status: 200, code: 'request success!', data: resdata });
  });
});

//列表数据
app.get('/search', function (req, res, next) {
  const query = req.query;
  var str=' 1=1 '
  if(query.city){
    str+=" and city='"+query.city+"' "
  }
  if(query.category_id){
    str+=" and category_id="+query.category_id
  }
  if(query.caption){
    str+=" and caption like '%"+query.caption+"%' "
  }
  fundraiserSheet.select(str, (err, resdata) => {
    res.send({ status: 200, code: 'request success!', data: resdata });
  });
});


//详情
app.get('/detail/:id', function (req, res, next) {
  if(req.params.id && parseInt(req.params.id)>0){
    const upid = parseInt(req.params.id)
    query("SELECT * from fundraiser fr,category ca where fr.category_id = ca.category_id and fundraiser_id="+upid, (err, data) => {
      if (data.length > 0) {
        res.send({ status: 200, code: 'request success!', data: data[0] });
      } else {
        res.send({ status: 504, code: 'request error!' });
      }
    });
  }else{
    res.send({ status: 504, code: 'id is null!' });
  }
});




//端口为8111
const server = app.listen(8111, function () {
  console.log("访问地址:");
  console.log("http://localhost:" + server.address().port + "/index.html");
});