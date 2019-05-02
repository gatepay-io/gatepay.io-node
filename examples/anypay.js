var hprose = require("hprose");
var gatepay = require('../src/gatepay');

var appkey = 'your appkey ';//在gatepay管理后台的账户设置里有
var appsecret = 'your appscret';//在gatepay管理后台的账户设置里有

var params = {};//定义请求参数
params.price = 0.99;//任意金额都可以，商品价格。
params.type ='wechat';//支付方式，如果是支付宝则填写alipay
params.out_order_id = gatepay.uuid();//外部订单号，也就是你的系统产生的订单号，演示这里是用随机函数生成的编号
params.custom = 'terry';//这个是携带的客户信息， 可以是任何字符串，比如你的网站是充值会员，这个可以是会员用户名，邮箱 或者电话之类的。
//如果担心appsecret泄露，可以在服务端生成。这里直接用js的sdk执行了签名
var sign = gatepay.sign(appkey,params,appsecret);//执行签名，获取携带签名的参数信息，
//发起rpc请求
gatepay.any(sign,function(response){
  	console.log(response);
	if(response.code == 100){
		//代表请求成功
      	//console.log(response.data.pay_url);	
   }
   else{
 		//console.log(response.msg);
   }
});
