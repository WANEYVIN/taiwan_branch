App({    /**
     * 定义全局变量
     */
    globalData: {
        openid: '', //用户openid
        userId: '', //用户编号
        member_address: '',
        serverURL: '',
        log:''

    },
    onLaunch: function() {

        wx.clearStorage()
        console.log('App Launch check openid= ',wx.getStorageSync("openid"))
        var log1 = require('lib/log.js') // 引用上面的log.js文件
        this.globalData.log =log1
        // this.globalData.serverURL = "https://xyz.yi-wen.wang/linghuo";
        this.globalData.serverURL = "https://www.top-talent.com.cn/linghuo";

        console.log('App Launch')
//不在这里默认请求


        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                env:'testbed-freestyle',
                traceUser: true,

            })
        }


        /*
         * add this for version detect and automatic update
         *
         */

        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            console.log("updateManager: ",updateManager);
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res);
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        })
                    })
                }
            })
        }
    },
    // /**
    //  * 定义全局变量
    //  */
    // globalData: {
    //     openid: '', //用户openid
    //     userId: '', //用户编号
    //     member_address: '',
    //     serverURL: ''
    //
    // },
    /**
     * 用户登录请求封装(解决onlaunch和onload执行顺序问题)
     */
    userLogin: function() {
        // login means get the openID not necessary means registered as a member
        var that = this;
//定义promise方法
        return new Promise(function(resolve, reject) {

           console.log("resolve-----------------")
            // var that = this
            wx.login({

                success: function (res) {
                    var code = res.code;

                    console.log(res+"code= "+code)
                    wx.request({
                        // url: '后台通过获取前端传的code返回openid的接口地址',
                        // url: 'https://www.top-talent.com.cn/linghuo/getOpenID.php?code='+code,
                        // url: 'https://www.melburg.tw/linghuo/getOpenID.php?code='+code,
                        url: that.globalData.serverURL+'/getOpenID.php?code='+code,

                        data: { code: code
                                },
                        // method: 'POST',
                        method: 'GET',
                        header: { 'content-type': 'application/json'},
                        success: function (res) {

                            // that.globalData.openid = res.data.openid
                            // console.log("status= "+res.statusCode);
                            console.log(res.data.errMsg+"1 OPEN ID= "+ res.data.openid+"    ---   SESSIID = "+res.data.session_key+" other factor ="+res.data.IsMember);
                            console.log("login result"+  that.globalData.openid+"    ---   SESSIID = "+res.data.session_key+" other factor ="+res.data.IsMember);
                            // return that.globalData.openid

                            if (res.statusCode == 200) {
                                console.log("APP_JS onShow = "+  JSON.stringify(res));
                                that.globalData.openid = res.data.openid;
                                // that.globalData.userId = res.data.UserId;
                                console.log("openid= "+that.globalData.openid);
                                wx.setStorageSync("openid", that.globalData.openid)
                                // wx.setStorageSync("session", res.data.session_key)

                                // if (res.data.IsMember !=0) {
                                //
                                // } // isMember>0 which is member and will return properties
                                // console.log("2 OPEN ID= "+ res.data.openid+"    ---   SESSIID = "+res.data.session_key+" other factor ="+res.data.IsMember);
                                // that.GetData(res.data.openid);
                                resolve(res)

                                console.log("network status = "+  res.statusCode);

                            } else {
                                console.log("network status = "+  res.statusCode); // this error code should be recorded on the backend server

                                console.log("network error = "+res.errMsg);// useless error message
                                reject(res);
                            }

                            // resolve(res)
                        // }else{
                        //     reject('error')
                        },
                        fail: function(res) {
                            reject(res);
                            wx.showToast({
                                title: '系统错误'
                            })
                        },
                        complete: () => {

                        } //complete接口执行后的回调函数，无论成功失败都会调用

                    })

                }
            })
            // WxLogin(e)
// 调用登录接口

        }).catch(function(reason) {
            console.log('catch:', reason);
            reject(res);
        })






    },
// })

    GetData:function(openid)
    {
        // if user is registered as a member then get the profile
//需要用到用户编号换取商品信息的接口
        if(!openid){
    let openid = wx.getStorageSync("openid");}
        // return openid;
        let that = this;

        wx.request({
            // url: '后台通过获取前端传的code返回openid的接口地址',
            // url: 'https://www.ttalent.com.cn/linghuo/getOpenID.php?p=1&profile='+openid,
            url: getApp().globalData.serverURL+'/getOpenID.php?p=1&profile='+openid,

            // data: { code: code },
            // method: 'POST',
            method: 'GET',
            header: { 'content-type': 'application/json'},
            success: function (res) {
                console.log("********query database for profile = ",res);



                if (res.statusCode == 200) {


                            if(res.data != 0) { // if this is not a registered member then backend return 0 , then not neecessary to setstorage

                                wx.setStorageSync("member_address", res.data[0].member_address)
                                wx.setStorageSync("member_application", res.data[0].member_application)
                                wx.setStorageSync("member_certificate", res.data[0].member_certificate)
                                wx.setStorageSync("member_id", res.data[0].member_id)
                                wx.setStorageSync("member_marrige", res.data[0].member_marrige)
                                wx.setStorageSync("member_name", res.data[0].member_name)
                                wx.setStorageSync("member_openID", res.data[0].member_openID)
                                wx.setStorageSync("member_gender", res.data[0].member_gender)
                                wx.setStorageSync("member_nationality", res.data[0].member_nationality)
                                wx.setStorageSync("member_phone_num", res.data[0].member_phone_num)
                                wx.setStorageSync("member_registered_addr", res.data[0].member_registered_addr)
                                wx.setStorageSync("member_role", res.data[0].member_role)
                                wx.setStorageSync("member_sn", res.data[0].member_sn)
                                wx.setStorageSync("member_birthday", res.data[0].member_birthday)
                                wx.setStorageSync("member_corporate", res.data[0].member_corporate)
                                wx.setStorageSync("expiration", res.data[0].member_ID_expiration)

                            }else{
                                console.log("this is a new user, not yet register as a member");
                                // issue log : how to persuade new user to register
                            }


                } else { // network or backend server problem
                    console.log("network status = "+  res.statusCode); // this error code should be recorded on the backend server

                    // console.log("network error = "+res.errMsg);// useless error message
                    // reject(res);
                }

                // resolve(res)
                // }else{
                //     reject('error')
            },
            fail: function(res) {
                // reject(res);
                wx.showToast({
                    title: '后台系统错误'
                })
            },
            complete: () => {

            } //complete接口执行后的回调函数，无论成功失败都会调用

        })

    },









})
