var express = require('express')
var app = express()

app.get('/notify', function (req, res) {
  
  //1.接收参数
  
  //2.签名校验
  
  //3. 参数校验
  
  //4.业务处理
  
  //5.状态返回
  if(welldone){
      res.send('success')
  }
  else{
     res.send('fail')
  }
  
})
