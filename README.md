# Js sdk
Js sdk是生成钱包支付二维码

# CDN
以下JS为必须引用得
```bash
<script src="./js/jquery.min.js"></script>
<script src="./js/jquery.qrcode.js"></script>
<script src="./js/utf.js"></script>
<script src="./js/sdk.js"></script>
```

调用方法:
```Javascript
// 在js中调用
sdk.getData(sdkId,appkey,orderAmount,orderNo,currencyType,domId);
eg:sdk.getData("999","23","10.888888",'fc2u4hf8723hhc32','BAIC','qrcodeCanvas');
参数说明：(参数均为必填)
sdkId：SdkId(999) 
appkey：App_key(23)  
orderAmount：订单金额(10.888888) 
orderNo：订单号(fc2u4hf8723hhc32) 
currencyType：货币类型(BAIC) 
domId:二维码绑定得元素(qrcodeCanvas) 该domId名称为要绑定得容器得ID名
```

