var log = function (page,event){
    let that = this
    var currentTime =  formatTime( new Date());
    that.setData({
        logger: "currentTime - "+page+" - "+event,
    })

}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


module.exports={
    logging: log
}