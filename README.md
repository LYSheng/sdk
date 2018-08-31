
<h1 align="center">Baic</h1>

<p align="center">Js sdk是生成钱包支付二维码</p>

## Js sdk

```sh
Js sdk是生成钱包支付二维码， demo.html为示例，可参考使用，demoSuccess.html为支付成功页面。
```
## 配置

在使用本扩展之前，你需要去 [BAIC商户后台] 注册账号，然后创建应用，获取应用的 APP Id与Key。
必须引入文档中以下几个文件：//jq  //jq.qrcode生成二维码包//二维码依赖得转换包//生成二维码得js
<script src="jquery.min.js"></script>    
<script src="jquery.qrcode.js"></script>  
<script src="utf.js"></script>             
<script src="sdk.js"></script>             
## 使用

```js
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

>###    1.获取Token
>
>```js
>sdk.getData(sdkId,appkey);
>    'appkey' => '23',  //App_key
>    'sdkId' => SdkId,                              //自己的sdkId
>```
>响应示例：
>
>```json
>{
>    "success": "true",
>    "message": "获取成功！",
>    "token": "1252002bd3ff4a418b24b331cd28b0c4"
>}
>```
>|参数|参数类型|参数说明|
>|:---:|:---:|:---:|
>|success|String|是否校验成功:true成功;false不成功|
>|message|String|相应信息|
>|token|String|Token|

>###    2.获取Porder 生成二维码  使用钱包扫描二维码
>
>```js
>sdk.getCode(token,sdkId,orderAmount,orderNo,currencyType)
>    'token' => '1252002bd3ff4a418b24b331cd28b0c4',  //获取的token
>    'sdkId' => SdkId,                              //自己的sdkId
>    'orderAmount' => 10,                            //订单金额
>    'currencyType' => 'BAIC',                       //币种
>    'orderNo' => '12121212',                        //自己系统中的订单号
>```
>响应示例：
>
>```json
>{
>    "success": "true",
>    "message": "請求成功！",
>    "porder": "yh4ea65gh41ae65t4pxm-123123-999-1534925308319-BAIC"
>}
>```
>###    3.通过 轮询，或者websocket查询订单支付结果 根据支付结果跳到对应的页面   如下代码示例:  
```js
// 在js中调用
    拿到porder后生成二维码，然后钱包APP扫码进行后续操作
    第一种通过websocket：
    var wsServer = 'wss://echo.websocket.org'; //查询支付结果地址  （此地址为现为demo地址实际地址应以实际地址调用）
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
        window.location.href = "./demofail.html";    //失败页面
    }
    };
    websocket.onerror = function (evt) {
    //产生异常
    }; 
    第二种轮询：
              var time= setInterval(function(){
            $.ajax({
                // url:urlApi+"/paygateway/pos/resultTest",
                url:"http://10.132.4.65:8080/paygateway/pos/resultTest",// 查询支付结果地址  （此地址为现为demo地址实际地址应以实际地址调用）
                type:"post",
                // contentType: "application/json",
                dataType:"json",
                data:{"porder":"yh4ea65gh41ae65t4pxm-123123-23-1535616938658"},
                success:function(data){
                   if(data.isSuccess==0){
                    clearInterval(time)
                    window.location.href = "./demofail.html";   //失败页面
                   }else if(data.isSuccess==1){
                    clearInterval(time)
                    window.location.href = "./demoSuccess.html";   //成功页面
                   }else{
                //    未支付
                   }
                },
                error:function(xhr, ajaxOptions, thrownError){
                    console.info("error");
                        if (xhr.status == 200) {
                            console.log(ajaxOptions);
                        }
                        else {
                            console.log(xhr.status);
                            // console.log(xhr.responseJSON.error);
                        }
                }
            });
            },1000)


```


## 参考
- [BAIC网关接口]

## License

MIT





