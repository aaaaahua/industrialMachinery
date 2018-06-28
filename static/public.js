Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

CountAgo = function(timestamp){
    var now = new Date().getTime() / 1000;
    var delta = now - timestamp;

    if(delta<=0){
        return "刚刚";
    }

    var year = delta / (31536000);
    if(year > 1){
        return Math.round(year) + "年前";
    }else{
        var month = delta / (2592000);
        if(month > 1){
            return Math.round(month) + "个月前";
        }else{
            var day = delta / (86400);
            var week = day / 7;
            if(week > 1){
                return Math.round(week) + "周前";
            }else if(day > 1){
                return Math.round(day) + "天前";
            }else{
                var hour = delta / (3600);
                if(hour > 1){
                    return Math.round(hour) + "小时前";
                }else{
                    var minute = delta / (60);
                    if(minute > 1){
                        return Math.round(minute) + "分钟前";
                    }else{
                        return Math.round(delta) + "秒前";
                    }
                }
            }
        }
    }
}

StartLoading = function(needLoad){
    if(needLoad <= 0) return ;
    if(!layui || !layui.layer) return;

    var idx = layui.layer.load(1, {shade: [0.5,'#888']});

    localStorage.setItem("needLoad", needLoad);
    localStorage.setItem("idxLoad", idx);
}

CheckLoading = function(){
    var needLoad = localStorage.getItem("needLoad");
    var idxLoad = localStorage.getItem("idxLoad");
    if(!idxLoad || !needLoad) return;
    if(!layui || !layui.layer) return;

    needLoad = parseInt(needLoad);
    idxLoad = parseInt(idxLoad);

    if(--needLoad == 0) {
        layer.close(idxLoad);
        localStorage.removeItem("needLoad");
        localStorage.removeItem("idxLoad");
    }else{
        localStorage.setItem("needLoad", needLoad);
    }
}