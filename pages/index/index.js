
Page({
  data:{
    condition: '',
    openid:wx.getStorageSync("openid"),
      name : wx.getStorageSync("member_name")
  },

  onLoad: function (option) {


      var app=getApp();
    var that = this;
    let openid = wx.getStorageSync("openid");

      console.log("进入首页的用户编号为：" + openid);

    if (openid == '') { // for the brand new user who enter this app for the first time, call back the user login function on app.js

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
        this.setData({
            condition : 1

        })

        getApp().GetData(that.data.openid);

        console.log("进入首页的用户为：" +app.globalData.openid,wx.getStorageSync("member_id"),that.data.openid);
        // if this user is registered member then profile will be recorded in storage
        // or else only openid will be in storage

    }




  },



  onShow: function () {
    // var app = getApp();
    var that = this;
    let open_id = wx.getStorageSync("openid");


      /*
      issue log: check if this user has already assigned to specific task with backend php member_query

       */
  wx.request({
    url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=' + open_id,
    // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=oMa-B4rXn6o8QrlzhXhz27zxxhqs',
    header:{
        'Content-Type': 'application/json'
    },
    success: function(res) {

        console.log("get data from storage :", res.data);
        // console.log("get matched from storage :", res.data.length);
        // console.log("delete the last :", res.data['matched']);
        if(res.data['matched']==1){
            var ifmatched='你有指定的任务';
            console.log("check if condition = 1:", that.data.condition);
        }else{
            var ifmatched='请浏览任务';
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
            matched :res.data['matched'],
            ifMatched: ifmatched


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
        // var task_length = that.data.list.length;

        console.log("task tapped, & task ID= ",taskID); //输出点击的view的id，第二种情况就不重复写了
        // console.log("task content:" + JSON.stringify(task));
        console.log("task value:" + JSON.stringify(task[taskID]));
        console.log("matched value:" + matched);

        // console.log("task tapped",viewId);
        wx.redirectTo({
            url: '../viewTask/viewTask?taskID='+JSON.stringify(task[taskID])+'&matched='+matched,
            // url: '../viewTask/viewTask?taskID='+task[taskID],
        })
    }
})