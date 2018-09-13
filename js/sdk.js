
 var oFuncs = {
    fAdd : function(iA,iB){
        console.log(iA+iB)
        return iA+iB
    },
    fMul:function(iA,iB){
        console.log(iA-iB)
    }
}
    var urlApi="http://140.143.225.189:8080"
    // if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //    console.log("1111111")
    // } else {
    //     console.log("222222")
    // }
    var sdk={
        // getData("999","23","10.888888",'fc2u4hf8723hhc32','BAIC','qrcodeCanvas')
        // getCode为获取二维码得方法 
        // getCode为获取token  
        // 参数信息：sdkid：SdkId  appkey：App_key  orderAmount：订单金额 orderNo：订单号 currencyType：货币类型 domId:二维码绑定得元素
        getData:function (sdkId,appkey,orderAmount,orderNo,currencyType,domId){
            // 获取token
            $.ajax({
                url:urlApi+"/paygateway/sdk/getToken?sdkId="+sdkId+"&appKey="+appkey,
                type:"get",
                // contentType: "application/json",
                dataType:"json",
                success:function(data){
                    console.log(data)
                    if(data.success=="true"){
                        sdk.getCode(data.token,sdkId,orderAmount,orderNo,currencyType,domId)
                    }else{
                        alert(data.message)
                    }
                },
                error:function(xhr, ajaxOptions, thrownError){
                    console.info("error");
                        if (xhr.status == 200) {
                            console.log(ajaxOptions);
                        }
                        else {
                            console.log(xhr.status);
                            console.log(xhr.responseJSON.error);
                        }
                }
            });
        },
        // 获取二维码
        getCode:function (token,sdkId,orderAmount,orderNo,currencyType,domId){
            $.ajax({
                url:urlApi+"/paygateway/sdk/getPorder",
                type:"post",
                dataType:"json",
                data:{"token":token,"sdkId":sdkId,"orderAmount":orderAmount,"orderNo":orderNo,"currencyType":currencyType},
                // data:JSON.stringify({"token":token,"sdkId":sdkId,"orderAmount":orderAmount,"orderNo":orderNo,"currencyType":currencyType}),
                success:function(data){
                if(data.success=="true"){
                    $("#"+domId+"").qrcode({
                        render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
                        text : data.porder,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
                        width : "150",               //二维码的宽度
                        height : "150",              //二维码的高度
                        background : "#ffffff",       //二维码的后景色
                        foreground : "#000000",        //二维码的前景色
                        src: 'https://lysheng.github.io/sdk/icon.png'             //二维码中间的图片
                    });
                    var str = data.porder;
                    var index = str.lastIndexOf("\-") 
                    str  = str .substring(0, index);
                    console.log(str );
                    sdk.router(str)
                }else{
                    alert(data.message);
                }
                },
                error:function(xhr, ajaxOptions, thrownError){
                    console.info("error.");
                        if (xhr.status == 200) {
                            console.log(ajaxOptions);
                        }
                        else {
                            console.log(xhr.status);
                            console.log(xhr.responseJSON.error);
                        }
                }
            });
        },
        // 支付结果
        router:function(porder){
           var time= setInterval(function(){
            $.ajax({
                url:urlApi+"/paygateway/pos/resultTest",
                // url:"http://10.132.4.65:8080/paygateway/pos/resultTest",// 此地址为查询支付结果地址
                type:"post",
                // contentType: "application/json",
                dataType:"json",
                data:{"porder":porder},
                success:function(data){
                   if(data.isSuccess==0){
                    clearInterval(time)
                    window.location.href = "./demofail.html";   //失败页面
                   }else if(data.isSuccess==1){
                    clearInterval(time)
                    window.location.href = "./demoSuccess.html";   //成功页面
                   }else{
                //    未支付
                console.log("未支付")
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
        }
    }
