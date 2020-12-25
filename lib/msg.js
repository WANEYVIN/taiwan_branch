var msg = function (msg,target=null){
    let that = this
    var currentTime =  formatTime( new Date());

    var logger = [{
        level: "info",
        target:getCurrentUserOpenID(),
        time: currentTime,
        page: getCurrentPageUrl(),
        result:JSON.stringify(result),
            }]


    return logger

}
var ifSubscribe = function(e){
    let that = this
    wx.getSetting({withSubscriptions: true,
        success(res){
          if(res.subscriptionsSetting.mainSwitch){
              if (res.subscriptionsSetting.itemSettings[e]== "accept"){
                    return true
                    }else{
                    return false
                          }
          }else{
                wx.showModal({
                    title: '您关闭了订阅消息开关',
                    content: '请点击右上角三点并在设置中打开接收订阅消息，以便收到通知消息',
                    success(res) {

                    getApp().globalData.log.logging("warning to user that subscription main switch is off")

                    }
                })
            }
        },
        fail(err){
        getApp().globalData.log.error("FAILED to wx.getSetting({withSubscriptions: true,",err)
        }
    });

}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    return year+"."+month+"."+day+"-"+hour+":"+minute+":"+second
}
function getCurrentPageUrl(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    // var url = currentPage    //当前页面url

    return url
}

function getCurrentUserOpenID(){
    if(wx.getStorageSync("openid")) {
        var openid = wx.getStorageSync("openid")}
    else{
        var openid = "not_yet_got_openid"
    }
    return openid

}

module.exports={
   msg:msg,

}