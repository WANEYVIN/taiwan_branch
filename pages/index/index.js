
Page({
  data:{
    condition: '',
    openid:wx.getStorageSync("openid"),
    name : wx.getStorageSync("member_name"),
    badge:0,
    mgmt_badge:0,
    commercials: false,
      dialog2: false,
      subscribe: "知道了",
      notice_request: "为了方便通知您，请允许我们传消息给您。",
      always_accept_request:"您也可以选总是允许，不再询问，以免每次询问打扰",
      request_title:"请求",
      request_subtile: "提醒通知",
      abc: '',

  },

  onLoad: function (option) {



      var app=getApp();
    var that = this;
    let openid = wx.getStorageSync("openid");

      console.log("进入首页的用户编号为：" + openid);

    if (openid == '') { // for the brand new user who enter this app for the first time, call back the user login function on app.js
                        // 首次登入或者撤銷用戶，其openid將會是空值，因此呼叫app.js中的登入程序
      this.setData({
        condition : 0
        // IsMember : app.globalData.IsMember
                })
      console.log("SET CONDITION =0：" + that.data.condition);

      app.userLogin().then(

          function (res){
            console.log("promise回调后的数据："+res.data.openid);
            console.log("res in page= ",res);
            // var test = that.GetData(res.data.openid);
            // console.log("if res true : ", test);
              that.setData({
                  condition: 1,
                  openid : res.data.openid


              })



              getApp().GetData(app.globalData.openid)
              // if this is a new user without registering as a member, then only openID will be recorded in local storage

              console.log("进入的用户：" +app.globalData.openid,wx.getStorageSync("member_id"));

          }
      ,
          function (res){

              console.log("promise rejected  : "+res);


          })
    }

      // no need to veriy if the user had open id in buffer
    else
    {
//用户缓存存在
        if(wx.getStorageSync("member_id")){
            that.setData({
                condition : 1

            })

            getApp().GetData(that.data.openid);
            console.log("3进入首页的用户为：" +app.globalData.openid,wx.getStorageSync("member_id"),that.data.openid);

        }else{
            that.setData({
                condition : 0,
                badge:1

            })
            console.log("4进入首页的用户为： o member_id condition =0 bage =1", that.data.condition, that.data.badge);

        }


        console.log("1进入首页的用户为：" ,wx.getStorageSync("member_id"),that.data.condition);
        console.log("2进入首页的用户为：" ,that.data.openid);
        // if this user is registered member then profile will be recorded in storage
        // or else only openid will be in storage

    }




  },



  onShow: function () {


      var that = this;



      if (wx.getStorageSync("member_role") === ("admin" || "manager")) {
          that.admin_badge()
          console.log("ROLE = ", wx.getStorageSync("member_role"));

      }


      // var app = getApp();
      let open_id = wx.getStorageSync("openid");
      // that.ifSucribe();
      // I added it for the dropped user redirect to index without openid, and should be re-login
      if (open_id == '') {
          // that.onLoad();
          console.log("ex_onShow open_id =null and go getAPP()" );

          // getApp().onLaunch;
          wx.reLaunch({
              url: 'index'
          })

          console.log("finished go getAPP()" );

      }else{

      /*
      issue log: check if this user has already been assigned to specific task with backend php member_query

       */
      wx.request({
          // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=' + open_id,
          url: getApp().globalData.serverURL + '/member_query.php?openid=' + open_id,
          // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=oMa-B4rXn6o8QrlzhXhz27zxxhqs',
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {


              console.log("get data from database :", res.data);
              // console.log("get matched from storage :", res.data.length);
              // console.log("delete the last :", res.data['matched']);
              if (res.data['matched'] == 1) {
                  if (res.data['signOff'] == 1) {
                      var ifmatched = '你有指定的任务';

                  } else {
                      var ifmatched = '你有指定的任务，请尽快签署协议，并完善个人资质';

                  }

                    // if it is a registered member and has been assigned with job, then advertise the commercials
                  that.setData({
                      commercials:true,
                  })
                    that.shoppingWindows()

                  // var ifmatched='你有指定的任务';
                  console.log("check if condition = 1:", that.data.condition);
              } else {
                  console.log("check if condition =0 :", that.data.condition);
                  that.setData({

                      badge:1

                  })

                  if (that.data.condition == '0') {

                      var ifmatched = '请点击头像至登录程序成为会员';

                  } else {

                      var ifmatched = '请浏览任务';
                  }




              }

              that.setData({
                  list: res.data,
                  task_name: '職缺',
                  task_corporation: '公司',
                  task_date: '刊登日期',
                  task_description: '工作內容',
                  task_requirement: '要求資質',
                  task_address: '工作地點',
                  task_num_recruiting: '需求人數',
                  task_expiration: '截止日期',
                  matched: res.data['matched'],
                  ifMatched: ifmatched,
                  signOff: res.data['signOff'] ? res.data['signOff'] : 0


              })

              // that.data.list.pop()
              // var cutting = that.data.list.splice(2,1);

              console.log("onshow : ", res.data);

          },
          fail: function (res) {
              console.log("fail: ", res);
          },
          complete: function (res) {
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh();
          }
      })


  } // if open_id exist then try to get task id, OR ELSE go to onLoad and get open_id first


},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
// record what user has chosen for marketing algorithm
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


  onPullDownRefresh: function() {
    // var app =getApp();
    // var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // console.log("reloading: ", app.globalData.openid);
    console.log("reloading: ", getApp().globalData.openid);
    this.onShow();
  },
    myProfile: function(){
        var that = this;
        console.log("photo tapped and condition = ", that.data.condition);

        if(that.data.condition===0) {
            console.log("this is a brand new user not yet registered ", that.data.openid);

                        // wx.redirectTo({
                        //     url: '../membership/membership'
                        //                 })



            wx.switchTab({
                url: '../myProfile/myProfile',
            });

        }else{
            console.log("this is an existing user and open id = ", that.data.openid);

            wx.switchTab({
                url: '../myProfile/myProfile',
            });

        }

    },


    viewTask(e){
        var that = this;

        var taskID = e.currentTarget.id;
        var task = that.data.list;
        var matched = that.data.matched;
        var signOff = that.data.signOff;
        // var task_length = that.data.list.length;

        console.log("task tapped, & task ID= ",taskID); //输出点击的view的id，第二种情况就不重复写了
        // console.log("task content:" + JSON.stringify(task));
        console.log("task value:" + JSON.stringify(task[taskID]));
        console.log("matched value:" + matched);
        console.log("sign off value:" + signOff);

        var tempID = 'mp6GxqAHDj4TUiop2I4Txd35ZM8UTVY_FUKPSCvzdNw'

        wx.getSetting({withSubscriptions: true,
            success(res){
                console.log("withSubscriptions",res)
                // console.log("e",e)
                // console.log("withSubscriptions.subscriptionsSetting-mainSwitch",res.subscriptionsSetting.mainSwitch)
                // console.log("withSubscriptions.subscriptionsSetting-itemSettings",res.subscriptionsSetting.itemSettings[e])
                if(!res.subscriptionsSetting.mainSwitch){
                    //mainswitch should be turn on as true , or else no message will be accepted

                    wx.showModal({
                        title: '您关闭了订阅消息开关',
                        content: '请点击右上角三点并在设置中打开接收订阅消息，以便收到通知消息',
                        success(res) {

                        }
                    })

                }else{
                    if (res.subscriptionsSetting.itemSettings[tempID]== "accept"){

                     wx.redirectTo({
                            url: '../viewTask/viewTask?taskID='+JSON.stringify(task[taskID])+'&matched='+matched+'&signOff='+signOff,
                            // url: '../viewTask/viewTask?taskID='+task[taskID],
                        })

                    } else{
                        // console.log("notice is NOT accepted",e, res.subscriptionsSetting.itemSettings[e])
                        that.setData({
                            dialog2: true,
                            path : '../viewTask/viewTask?taskID='+JSON.stringify(task[taskID])+'&matched='+matched+'&signOff='+signOff
                        })


                    }
                  }
                // console.log("final flag",that.data.subscription)

            },
            fail(err){}
        });














    },

    admin_badge(){
        let that = this
        wx.request({
            url: getApp().globalData.serverURL + '/updateMemberRole.php?query=count&id='+wx.getStorageSync("member_id"),
            method: "GET",
            header: {
                'Content-Type': 'application/json'
                // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
            },
            success: function (ret) {
                console.log("successfully get count ", ret.data)

                that.setData({
                mgmt_badge:ret.data

                })

            }
        })


    },

    ifSubscribe(e){
        let that = this
        wx.getSetting({withSubscriptions: true,
            success(res){
                // console.log("withSubscriptions",res)
                // console.log("e",e)
                // console.log("withSubscriptions.subscriptionsSetting-mainSwitch",res.subscriptionsSetting.mainSwitch)
                // console.log("withSubscriptions.subscriptionsSetting-itemSettings",res.subscriptionsSetting.itemSettings[e])
                if(!res.subscriptionsSetting.mainSwitch){
                    //mainswitch should be turn on as true , or else no message will be accepted

                    wx.showModal({
                        title: '您关闭了订阅消息开关',
                        content: '请点击右上角三点并在设置中打开接收订阅消息，以便收到通知消息',
                        success(res) {

                        }
                    })
                    that.setData({
                        abc: 0,
                    })


                }else{
                    if (res.subscriptionsSetting.itemSettings[e]== "accept"){



                        console.log("TRUE nitice is accepted",e, res.subscriptionsSetting.itemSettings[e])
                        that.setData({
                            abc: 1,
                        })
                        return 1;
                        // console.log("TRUE flag",that.data.subscription)

                    } else{
                        // console.log("notice is NOT accepted",e, res.subscriptionsSetting.itemSettings[e])

                        that.setData({
                            abc: 0,
                        })

                    }



                }

                console.log("final flag",that.data.subscription)

            },
            fail(err){}
        });

    },
    close(){
        let that = this
        that.setData({
            dialog2: false,
        })
        var tmplIds = 'mp6GxqAHDj4TUiop2I4Txd35ZM8UTVY_FUKPSCvzdNw'

            wx.requestSubscribeMessage({
                tmplIds: ['mp6GxqAHDj4TUiop2I4Txd35ZM8UTVY_FUKPSCvzdNw'],

                // tmplIds: ['mCx2f5QrEiQfIdHdLL2z2fv28SO9zTieO7zBCldrOns'],


                success(res) {
                    console.log("requestSubscribeMessage", res)

                    console.log("redirect; ", res[tmplIds])

                    if(res[tmplIds]=="accept"){
                        // wx.switchTab({
                        wx.redirectTo({
                            url: that.data.path
                        })
                        console.log("redirect; ", res[tmplIds])

                        // return true
                    }else{
                        // persuade the user to accept again
                    }

                },
                fail(res) {
                    console.log("FAILED requestSubscribeMessage", res)

                }
            })
        },


    shoppingWindows(){
        let that = this
        wx.request({
            url: getApp().globalData.serverURL + '/shopping_windows.php',
            method: "GET",
            header: {
                'Content-Type': 'application/json'
                // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
            },
            success: function (ret) {
                console.log("successfully get products ", ret)

                that.setData({
                    ads:ret.data,
                    mode:'aspectFill'

                })

            }
        })
    }





})