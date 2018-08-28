# Js sdk
Js sdk是生成钱包支付二维码，
demo.html为示例，可参考使用，demoSuccess.html为支付成功页面。

# CDN
以下JS为必须引用得
```bash
<script src="./js/jquery.min.js"></script>
<script src="./js/jquery.qrcode.js"></script>
<script src="./js/utf.js"></script>
<script src="./js/sdk.js"></script>
```

# 调用方法:
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

# 使用方法:
```Javascript
// 在js中调用
第一步在调用sdk.getData(sdkId,appkey,orderAmount,orderNo,currencyType,domId)后，会生成二维码，在生成二维码后可以执行如下代码：
第二步生成二维码后用户进行支付，支付结果会通知给第三方服务器，前端自行取服务器查询结果   代码如下：
    var wsServer = 'wss://echo.websocket.org'; //服务器地址 
    var websocket = new WebSocket(wsServer); //创建WebSocket对象
    console.log(websocket.readyState);//查看websocket当前状态
    websocket.onopen = function (evt) {
    //已经建立连接
    websocket.send("hello");//向服务器发送消息
    };
    websocket.onclose = function (evt) {
    //已经关闭连接
    };
    websocket.onmessage = function (evt) {
    //收到服务器消息，使用evt.data提取
    // 根据evt.data返回信息 跳转成功失败页面
    console.log(evt.data)
    if(evt.data==true){
        // 跳转支付成功      
        window.location.href = "./demoSuccess.html";   //成功页面
    }else{
        // 否则跳转失败
        window.location.href = "./demoSuccess.html";    //失败页面
    }
    };
    websocket.onerror = function (evt) {
    //产生异常
    }; 


```

