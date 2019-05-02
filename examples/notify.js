/*
  此脚本用来接收来自gatepay的异步通知回调，
  
  通常用来处理自己的网站的业务，用户成功支付后 比如给会员充值，让具体的内容可以看见等等。

*/
var express = require('express');
var md5 = require('md5');
var app = express();


app.get('/notify', function (req, res) {
  
  //1.接收参数
  var appkey = req.query.appkey; //公钥，
  var order_id = req.query.order_id;//gatepay 订单编号
  var out_order_id = req.query.out_order_id;//外部订单号 即你的系统的订单号，
  var price = req.query.price; //商品价格
  var realprice = req.query.realprice;//支付价格
  var type = req.query.type; //支付类型， wechat 微信 alipay 支付宝
  var paytime = req.query.paytime; //成功支付时的时间戳
  var extend = req.query.extend; //扩展字段，用来传递与订单有关的数据，比如用户名，手机号之类的。
  var sign = req.query.sign; //签名信息
  //2.签名校验
  var appsecret  = 'your appsecret'; //私钥，gatepay.io管理后台->账户管理 参看，妥善保管。
  var signed = md5(md5(appkey+order_id+out_order_id+price + realprice + type+paytime+extend)+appsecret);
  if(signed != sign){
     res.send('fail');
  }
  //3. 参数校验
  // 具体的，比如价格，时间 可以自行校验。
  
  //4.业务处理
  //比如给你的网站充值会员，加钱什么的，写这里。
  //5.状态返回
  if(welldone){
      res.send('success');
  }
  else{
     res.send('fail');
  }
  
})
