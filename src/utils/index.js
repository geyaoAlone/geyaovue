/**
 * Created by leigero on 2018/6/21.
 *  此乃工具类
 */
import { Indicator } from 'mint-ui';
export default {
    // 加法
    accAdd (arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m
    },

    // 减法
    accSub (arg1,arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    },

    // 乘法
    accMul(arg1,arg2) {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },

    // 获取地址栏参数,方法参数可选
    getRequest:function(name) {
        // 获取url中"?"符后的字串
        var url = window.location.href,
            reqMap = { };

        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf('?') + 1), strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                reqMap[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }
        }

        return name in reqMap ?  reqMap[name]: typeof name === 'undefined' ? reqMap : null ;
    },

    // 获取浏览器标识
    browser:function() {
        var userAgent = navigator.userAgent.toLowerCase();

        if( userAgent.match(/Alipay/i) == "alipay" ) {
            return  'ALIPAY';
        }

        if( userAgent.match(/MicroMessenger/i) == "micromessenger" ) {
            return 'WECHAT';
        }

        return 'OTHER';

    },

    // 唤起支付宝收银台
    evokeAliPay: function(payInfo) {
        var fn = function (payInfo) {
            var dfd = $.Deferred();

            // 通过传入交易号唤起快捷调用方式(注意tradeNO大小写严格)
            try {
                AlipayJSBridge.call("tradePay", payInfo, function (data) {
                    // 支付成功回调
                    if ("9000" == data.resultCode) {
                        dfd.resolve(data);
                        // 支付失败回调（包括用户取消支付）
                    } else {
                        dfd.reject(data);
                    }
                });

            } catch (err){
                alert('调用收银台异常');
                dfd.reject();
            }
            return dfd.promise();
        }
        return $.when(fn(payInfo));
    },

    // 唤起微信收银台 ，WeixinJSBridge 这个内置对象一般为页面加载完一段时间后才能拿到这个对象 ，有加载时间
    evokeWxPay: function(payInfo) {

        var fn  =  function (payInfo) {
            var dfd = $.Deferred();

            try {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    payInfo,
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            dfd.resolve(res);
                        } else {
                            dfd.reject(res);
                        }
                    }
                );

            }catch(err){
                alert('调用收银台异常');
                dfd.reject();
            }
            return dfd.promise();
        }

        return $.when(fn(payInfo));

    },
    // 关闭浏览器
    closeView: function() {
        try {
            WeixinJSBridge.call('closeWindow');
        }catch(err) {
            try{
                AlipayJSBridge.call('closeWebview');
            }catch(err) {
                throw new Error('关闭View异常')
            }
        }

    },
    wait(second) {

        let fn  = function (second) {
            Indicator.open('请稍后...');
            let  dfd = $.Deferred();

            setTimeout( () => {
                Indicator.close();
                dfd.resolve();
            },second * 1000)
            return dfd.promise();
        }

        return $.when(fn(second));
    },
    appID: function() {
        return this.browser() === 'WECHAT' ? 'wx55105376180251a3' : this.browser() === 'ALIPAY' ? '1': null;
    }
}
