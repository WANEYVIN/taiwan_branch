var log = function (event,result=null){
    let that = this
    var currentTime =  formatTime( new Date());

    var logger = [{
        level: "info",
        target:getCurrentUserOpenID(),
        time: currentTime,
        page: getCurrentPageUrl(),
        event: event,
        result:JSON.stringify(result),
            }]

     if(wx.getStorageSync("log")){
       var logged = wx.getStorageSync("log")
         // console.log("LOGGED",logged)
         logger =   logged.concat(logger)
         // logger =   logger.concat(logged)
         logger =  wx.setStorageSync("log",logger)

     }else{
         logger =  wx.setStorageSync("log",logger)
   }

    return logger

}

var error = function (event,result=null){
    let that = this
    var currentTime =  formatTime( new Date());

    var logger = [{
        level: "error",
        target:getCurrentUserOpenID(),
        time: currentTime,
        page: getCurrentPageUrl(),
        event: event,
        result:JSON.stringify(result),
    }]

    if(wx.getStorageSync("log")){
        var logged = wx.getStorageSync("log")
        // console.log("LOGGED",logged)
        logger =   logged.concat(logger)
        // logger =   logger.concat(logged)
        logger =  wx.setStorageSync("log",logger)

    }else{
        logger =  wx.setStorageSync("log",logger)
    }

    return logger

}

var send = function (e){
    var log = wx.getStorageSync("log")
    console.log("sending log to the backend",log)

    let that = this
        wx.request({
            url: getApp().globalData.serverURL + '/log.php',
            // method: "GET",
            method: "POST",
            header: {
                // 'Content-Type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
            },
            data: {
               log:JSON.stringify(log)
            },
            success: function (ret) {
                console.log("send log responding",ret)
                // console.log("send log SON.stringify(log)",JSON.parse(ret))

            }
        })







    wx.removeStorageSync("log")
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
    logging: log,
    send: send,
    error:error,
    // getCurrentPageUrl: getCurrentPageUrl,

}