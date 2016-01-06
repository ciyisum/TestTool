(function(){
    /**
     * 作者：battle
     * js基础服务类
     * 日期：2015-04-15
     *
     */
        //基本类：通过function扩展类型：提高语言的表现力（因为javascript原型继承的本质，所有的原型方法立刻被赋予到所有的实例）
    Function.prototype.method=function(name,fn){
        if(!this.prototype[name]){
            this.prototype[name]=fn;
            return this;
        }
    };

    //去除字符串[左右]的空格 示例：" 12 a si 56 ".trim(); //12 as i56
    if(!String.prototype.trim){
        String.method('trim',function(){
            return this.replace(/^\s+/,'').replace(/^\s+$/,'');
        });
    }
    //去除全部空格
    if(!String.prototype.noSpace){
        String.method('noSpace',function(){
            return this.replace(/\s+/g, "");
        });
    }


    //高效JS数组乱序（为Array.prototype添加了一个函数） 调用arr.shuffle();
    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function() {
            for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
        };
    }

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    if(!Date.prototype.format){
        Date.prototype.format =function(format){
            var o = {
                "M+" : this.getMonth()+1, //month
                "d+" : this.getDate(), //day
                "h+" : this.getHours(), //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3), //quarter
                "S" : this.getMilliseconds() //millisecond
            };
            if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                (this.getFullYear()+"").substr(4- RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length==1? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        };
    }

    //浮点数加法运算
    var FloatAdd=function(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };
    if(!window.FloatAdd){
        window.FloatAdd=FloatAdd;
    }
    // 浮点数减法运算
    var FloatSub=function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    };
    if(!window.FloatSub){
        window.FloatSub=FloatSub;
    }
    //格式化金额，截取金额小数点位数
    var formatMoney=function (s, n){
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for(var i = 0; i < l.length; i ++ )
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };
    if(!window.formatMoney){
        window.formatMoney=formatMoney;
    }


})();

(function(){
    /**
     * ===========================================
     * 功能：定义一个全局对象
     * 作者：battle
     * 时间：2015-04-03
     * 描述：添加功能模块的命名空间,禁止在其他命名空间下赋值
     * 	（命名空间 shop 下放的是店铺基础信息 不允许被占用）
     * 其他 命名空间 可根据开发人员 自行定义
     * 示例：MLJIA.namespace("business");
     *	  MLJIA.business.shop=1182;
     * ===========================================
     */
    var MLJIA={};
    MLJIA.namespace=function(str){
        var arr=str.split("."),o=MLJIA;
        for(var i=(arr[0]=="MLJIA") ? 1 : 0; i<arr.length; i++){
            o[arr[i]]=o[arr[i]] || {};
            o=o[arr[i]];
        }
    };
    if(!window.MLJIA){
        window.MLJIA=MLJIA;
    }

    MLJIA.namespace("shopSet");//存储店铺全局参数信息（）





})();

/**
 @Name：laytpl-v1.1 精妙的js模板引擎
 @Author：贤心 - 2014-08-16
 @Site：http://sentsin.com/layui/laytpl
 @License：MIT license
 */
;!function(){"use strict";var f,b={open:"{{",close:"}}"},c={exp:function(a){return new RegExp(a,"g")},query:function(a,c,e){var f=["#([\\s\\S])+?","([^{#}])*?"][a||0];return d((c||"")+b.open+f+b.close+(e||""))},escape:function(a){return String(a||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(a,b){var c="Laytpl Error：";return"object"==typeof console&&console.error(c+a+"\n"+(b||"")),c+a}},d=c.exp,e=function(a){this.tpl=a};e.pt=e.prototype,e.pt.parse=function(a,e){var f=this,g=a,h=d("^"+b.open+"#",""),i=d(b.close+"$","");a=a.replace(/[\r\t\n]/g," ").replace(d(b.open+"#"),b.open+"# ").replace(d(b.close+"}"),"} "+b.close).replace(/\\/g,"\\\\").replace(/(?="|')/g,"\\").replace(c.query(),function(a){return a=a.replace(h,"").replace(i,""),'";'+a.replace(/\\/g,"")+'; view+="'}).replace(c.query(1),function(a){var c='"+(';return a.replace(/\s/g,"")===b.open+b.close?"":(a=a.replace(d(b.open+"|"+b.close),""),/^=/.test(a)&&(a=a.replace(/^=/,""),c='"+_escape_('),c+a.replace(/\\/g,"")+')+"')}),a='"use strict";var view = "'+a+'";return view;';try{return f.cache=a=new Function("d, _escape_",a),a(e,c.escape)}catch(j){return delete f.cache,c.error(j,g)}},e.pt.render=function(a,b){var e,d=this;return a?(e=d.cache?d.cache(a,c.escape):d.parse(d.tpl,a),b?(b(e),void 0):e):c.error("no data")},f=function(a){return"string"!=typeof a?c.error("Template not found"):new e(a)},f.config=function(a){a=a||{};for(var c in a)b[c]=a[c]},f.v="1.1","function"==typeof define?define(function(){return f}):"undefined"!=typeof exports?module.exports=f:window.laytpl=f}();


(function(e){
    if(!window.toMonitor){
        //默认的全局本地监听
        var c="",b="",d=[],n=0;
        e(document).ajaxStart(function(){
            c=new Date().getTime();
        }).ajaxSend(function(h,i,g){
            url=g.url.split("?")[0];
            var f={url:url,startTime:new Date().getTime()};
            d.push(f);
            if(url.indexOf("poll")==-1){
                n=$.layer({type:3,title:false,shade:[0],border:[0],bgcolor:"",loading:{type:2}});
            }
        }).ajaxSuccess(function(g,h,f){
        }).ajaxError(function(h,i,g,f){
            a(h,i,g,f);
        }).ajaxStop(function(){
            b=new Date().getTime();
            console.log("Native_AJAX长耗时："+(b-c)+"毫秒");
            d=[];
            layer.close(n);
        });
        var a=function(h,i,g,f){
            console.log(g.url+" 请求错误Native_exception："+f);
//			console.log("请求错误Native_responseText："+i.responseText);
        };

        window.toMonitor=function(g,h){
            for(var f=0;f<d.length;f++){
                if(d[f].url==g){
                    console.log(g.split("/")[3]+"/Native_耗时:"+(new Date().getTime()-d[f].startTime)+"毫秒");
                    break;
                }
            }
            if(h!=null && h.status && h.status!=200){
                console.log("Native_信息："+JSON.stringify(h));
            }
        };
    }
})(jQuery);

 
