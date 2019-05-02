# gatepay.io-node
node.js sdk of gatepay

![home](https://gatepay.gatecdn.com/static/thedocs/1.3.1/assets/img/banner_admin.png)

这是一个个人收款系统Gatepay.io 提供的收款接口，如果你是一个开发者或者站长或者知识付费、内容创造的从业人员，对你会有帮助。

这个系统主要特点就是零费率和点对点即时到账到自己的收款微信或者支付宝上，不参与具体的交易细节。

--------------------——准备工作开始-----------------------------------

在使用这个SDK之前需要去gatepay.io 注册一个账户，然后在管理后台->账户配置里填写几个必填的选项。

1. 支付成功后回调地址, 作用是 如果收款成功了，会跳转到你预先设定的一个通知地址，如果是做一个会员充值的应用， 那么这个通知地址的作用就是给会员加钱。

2. 支付成功后前台跳转地址，作用是 如果收款成功了，这个页面要跳转到哪里去，如果是做一个会员充值的应用，那么这个前台跳转地址应该是跳转到会员中心的首页或者钱包的首页。

3. 用户支付后未到账（可能超时付款），支付页面显示的反馈按钮链接， 这个就是如果用户支付超时，则页面跳转到哪里去，这个可填可不填

![help_01](https://gatepay.gatecdn.com/assets/img/help/help_01.png)

4. 个人任意金额支付宝二维码, 手机支付宝->收钱->不填金额->保存图片，上传到后台就可以了。

5. 个人任意金额微信二维码，手机微信->我->支付->收付款->二维码收款->不填金额->保存图片，上传到后台就可以了。

6. 支付宝ID,手机支付宝扫描下面的二维码，填写到后台即可。

![help_02](https://gatepay.gatecdn.com/assets/img/help/help_02.png)

---------------------准备工作结束-------------------------------------

接下来我们讲讲这个sdk怎么耍起来
先是在你的应用的目录下npm install这个sdk 
```
npm install gatepay.io-node
```

然后在应用里引入它 
```
var gatepay = require('gatepay.io-node');
```

现在进入正题，gatepay提供三种接口，分别是anypay，stablepay，grouppay，不论哪种接口，我们都需要使用gatepay后台提供我们的appkey和appsecret。

```php
$appkey = 'your appkey from gatepay';
$appsecret = 'your appsecret from gatepay';
```

1. 任意金额支付 anypay,

这个主要的特点是：金额是任意的，无需后台提前上传二维码，填写商品啥的。比如你的应用是不固定价格的服务，比如充值会员的服务，想充多少充多少。那这个比较合适搞。

调用也很简单：

```Javascript
//注意，测试时，必须在真实网站环境测试，本地文件浏览模式不可以。
var params = {};//定义请求参数
params.price = 0.99;//任意金额都可以，商品价格。
params.type ='wechat';//支付方式，如果是支付宝则填写alipay
params.out_order_id = gatepay.uuid();//外部订单号，也就是你的系统产生的订单号，演示这里是用随机函数生成的编号
params.custom = 'terry';//这个是携带的客户信息， 可以是任何字符串，比如你的网站是充值会员，这个可以是会员用户名，邮箱 或者电话之类的。
var sign = gatepay.sign(appkey,params,appsecret);//执行签名，获取携带签名的参数信息，
//发起rpc请求
gatepay.any(sign,function(response){
	if(response.code == 100){
		//代表请求成功
    		gatepay.go(response.data.pay_url); //这个GO方法将会执行页面跳转，直接跳转到支付页面
    	}
    	else{
    		alert(response.msg);//输出错误信息，自己处理咯。
    	}
});
```

2.固定商品支付 stablepay,

这个主要的特点是，先要去管理后台->产品卡密->产品管理里创建一个产品，然后上传支付宝微信二维码。

然后在管理后台->产品卡密->卡密管理 里导入这个产品的卡密。

感觉是很麻烦，但是这个stablepay 可以帮我们做到销售卡密的过程，比如你要卖什么xxx影视会员点卡之类，对接这个api就可以。

直接上代码：

```Javascript
//注意，测试时，必须在真实网站环境测试，本地文件浏览模式不可以。
var params = {};//定义请求参数
params.product_id = '8';//产品ID为8,
params.type ='wechat';//支付方式，如果是支付宝则填写alipay
params.out_order_id = gatepay.uuid();//外部订单号，也就是你的系统产生的订单号，演示这里是用随机函数生成的编号
params.custom = 'terry';//这个是携带的客户信息， 可以是任何字符串，比如你的网站是充值会员，这个可以是会员用户名，邮箱 或者电话之类的。
var sign = gatepay.sign(appkey,params,appsecret);//执行签名，获取携带签名的参数信息，
//发起rpc请求
gatepay.stable(sign,function(response){
	if(response.code == 100){
		//代表请求成功
    		gatepay.go(response.data.pay_url); //这个GO方法将会执行页面跳转，直接跳转到支付页面
    	}
    	else{
    		alert(response.msg);//输出错误信息，自己处理咯。
    	}
});
```
3. 组合商品支付  grouppay,

可以实现对多个固定商品 组合后进行支付， 如果你想实现 一些组合出售的需求，可以使用这个接口。

直接上代码
```Javascript
//注意，测试时，必须在真实网站环境测试，本地文件浏览模式不可以。
var params = {};//定义请求参数
params.fields = '8:2,7:3,10:1';//产品ID为8的购买2件，产品ID为7的购买3件，产品ID为10的购买1件。
params.type ='wechat';//支付方式，如果是支付宝则填写alipay
params.out_order_id = gatepay.uuid();//外部订单号，也就是你的系统产生的订单号，演示这里是用随机函数生成的编号
params.custom = 'terry';//这个是携带的客户信息， 可以是任何字符串，比如你的网站是充值会员，这个可以是会员用户名，邮箱 或者电话之类的。
var sign = gatepay.sign(appkey,params,appsecret);//执行签名，获取携带签名的参数信息，
//发起rpc请求
gatepay.group(sign,function(response){
	if(response.code == 100){
		//代表请求成功
    		gatepay.go(response.data.pay_url); //这个GO方法将会执行页面跳转，直接跳转到支付页面
    	}
    	else{
    		alert(response.msg);//输出错误信息，自己处理咯。
    	}
});
```
