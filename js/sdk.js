
 var oFuncs = {
    fAdd : function(iA,iB){
        console.log(iA+iB)
        return iA+iB
    },
    fMul:function(iA,iB){
        console.log(iA-iB)
    }
}
    var urlApi="http://140.143.225.189:80"
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
                        width : "100",               //二维码的宽度
                        height : "100",              //二维码的高度
                        background : "#ffffff",       //二维码的后景色
                        foreground : "#000000",        //二维码的前景色
                        src: 'http://img.mp.itc.cn/upload/20170303/0792ffabfeec42ba9c9afba80d8ff16a_th.gif'             //二维码中间的图片
                    });
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
        }
    }
