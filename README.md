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
