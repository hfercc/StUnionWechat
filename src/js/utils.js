/**
 * Created by hfercc on 2016/12/10.
 */
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
export function wxconfig(data) {
    wx.config({
        debug:false,
        appId: data.config.appId,
        timestamp: data.config.timestamp,
        nonceStr:data.config.nonceStr,
        signature: data.config.signature,
        jsApiList:["hideMenuItems"]
    });
    wx.ready(function () {
        wx.hideMenuItems({
            menuList:["menuItem:share:weiboApp","menuItem:copyUrl","menuItem:share:email"]
        });
    })
}