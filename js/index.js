
// sdk.getData为获取二维码的方法    
// 参数信息：
    // sdkid：SdkId(999) 
    // appkey：App_key(23)  
    // orderAmount：订单金额(10.888888) 
    // orderNo：订单号(fc2u4hf8723hhc32) 
    // currencyType：货币类型(BAIC) 
    // domId:二维码绑定得元素(qrcodeCanvas) 该domId名称为要绑定得容器得ID名
// 第一步调用生成钱包支付二维码
// sdk.getData(sdkid,appkey,orderAmount,orderNo,currencyType,domId);
sdk.getData("0258b2a6-cfd6-4c46-8577-a3d922c83e00","402c2c6f5683fc69672097dc0553b987","200",'fc2u4hf8723hhc32','USDT','qrcodeCanvas');
// 第二步生成二维码后用户进行支付，支付结果会通知给第三方服务器，前端自行取服务器查询结果   代码如下：
    // var wsServer = 'wss://echo.websocket.org'; //服务器地址  
    // var websocket = new WebSocket(wsServer); //创建WebSocket对象
    // console.log(websocket.readyState);//查看websocket当前状态
    // websocket.onopen = function (evt) {
    // //已经建立连接
    // websocket.send("hello");//向服务器发送消息
    // };
    // websocket.onclose = function (evt) {
    // //已经关闭连接
    // };
    // websocket.onmessage = function (evt) {
    // //收到服务器消息，使用evt.data提取
    // // 根据evt.data返回信息 跳转成功失败页面
    // console.log(evt.data)
    // if(evt.data==true){
    //     // 跳转支付成功      
    //     window.location.href = "./demoSuccess.html";   //成功页面
    // }else{
    //     // 否则跳转失败
    //     window.location.href = "./demoSuccess.html";    //失败页面
    // }
    // };
    // websocket.onerror = function (evt) {
    // //产生异常
    // }; 
    // 或者轮询
    var sdkid,appkey,orderAmount,orderNo,currencyType="";
    $("#submit").on("click",function(){
        $('#qrcodeCanvas').html("")
        sdkid=$("#sdkidInput").val()
        appkey=$("#appkeyInput").val()
        orderAmount=$("#orderAmountInput").val()
        orderNo=$("#orderNoInput").val()
        currencyType=$("#currencyTypeInput").val()
        // console.log()appkeyInput  orderAmountInput  orderNoInput  currencyTypeInput
        sdk.getData(sdkid,appkey,orderAmount,orderNo,currencyType,'qrcodeCanvas');
    })
        
