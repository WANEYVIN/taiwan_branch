// miniprogram/pages/IDcheck/IDcheck.js
let app = getApp();
// var res = wx.getStorageSync("result");


Page({

  data:{
    submitButton:"确认提交",
    label_nationality: "民族:",
    gender_array: ['女', '男'],
    gender_index: 0,
  },

  onLoad(options) {
    var res =JSON.parse(options.result);


    console.log("result from scan and recoginsing:", res)
    // if(wx.getStorageSync("member_id").substr(0,1)==='83' || res["result"].id.substring(0,1)==='83'){
    //   // var member_nationality = '台'
    //   wx.setStorageSync("member_nationality", '台');
    //   console.log("台:", wx.getStorageSync("member_id"))
    //
    //
    // }

    if (res =='0'){
      this.setData({

        // openid = wx.getStorageSync("openid");
        placeholder_addr: wx.getStorageSync("member_address"),
        placeholder_name: wx.getStorageSync("member_name"),
        member_birthday: wx.getStorageSync("member_birthday"),
        placeholder_gender: wx.getStorageSync("member_gender"),
        placeholder_id: wx.getStorageSync("member_id"),
        placeholder_nationality: wx.getStorageSync("member_nationality"),
        member_id_expiration: wx.getStorageSync("expiration_err"),
        member_id_expiration: wx.getStorageSync("expiration")


      })
    }else {
      // var packAddr = options.packages;
      // var packAddr = options.packages[esult"].addr;
      // var packAddr = e.pack_addr;
      // console.log('1携带数据为', e.pack_addr);
      // var addres= res["result"].addr;
      this.setData({
        // sent_result: res,
        // addr: res["result"].addr,
        // name1: res["result"].name,
        // birth: res["result"].birth,
        // gender: res["result"].gender,
        // id: res["result"].id,
        // nationality:res["result"].nationality,
        placeholder_addr: res["result"].addr,
        placeholder_name: res["result"].name,
        member_birthday: res["result"].birth,
        placeholder_gender: res["result"].gender,
        placeholder_id: res["result"].id,
        placeholder_nationality: res["result"].nationality,
        member_id_expiration: wx.getStorageSync("expiration_err"),
        member_id_expiration: wx.getStorageSync("expiration")
      })
    }
    if(this.data.placeholder_id.substring(0,2)==='83'){
      this.setData({
        label_nationality: "證件屬籍:",
        placeholder_nationality: "台"
      })

    }
    var scan_result =[
        this.data.placeholder_name,
      this.data.placeholder_id,

      this.data.placeholder_addr,

      this.data.member_birthday,
      this.data.placeholder_gender,
      this.data.placeholder_nationality,
        this.data.member_id_expiration
    ]
    this.setData({
      scan_result: scan_result
    })

  },



  formSubmit: function (e) {

    console.log("tap2submit",e)
    let that = this
    that.insert2DB(e);

   // let{input_name,input_ID,input_addr,input_gender,input_nationality,input_birthday,input_phone,input_home,input_marriage,input_certificates}=e.detail.value;
   //  var insert = that.insert2DB(e);
   //  if(insert==="1"){
   //    console.log("insert2DB result successfully",insert)
   //
   //  }else{
   //    console.log("insert2DB result failed",insert)
   //
   //  }

    app.GetData(wx.getStorageSync("openid")) // this is for writing data to local storage

    // console.log("mem_id",wx.getStageSync("member_id"))
    that.IfTask();
/*
     var matchedTask = that.IfTask();
    if(matchedTask==="0"){
      console.log("there is no matched task",that.IfTask())


    }else{
      console.log("matched task id is ",matchedTask    }

    */
    // console.log("TRUE = ",this.IfTask())




    // let { phone, pwd, isPub, sex } = e.detail.value;
    // if (!phone || !pwd) {
    //   this.setData({
    //     warn: "手机号或密码为空！",
    //     isSubmit: true
    //   })
    //   return;
    // }
    // this.setData({
    //   warn: "",
    //   isSubmit: true,
    //   phone,
    //   pwd,
    //   isPub,
    //   sex
    // })
    // this.setData({
    //   warn: "",
    //   isSubmit: true,
    //   input_name,
    //   input_ID,
    //   input_addr,
    //   input_gender,
    //   input_nationality,
    //   input_birthday,
    //   input_phone,
    //  input_home,
    //   input_marriage,
    //   input_certificates
    //   // sex
    // })
  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

  insert2DB(e){
    var app = getApp();
    let that = this


    console.log("all data=", e);
    console.log("OPENID=", app.globalData.openid);
    // that.globalData.openid
    // let{input_name,input_ID,input_addr,input_gender,input_nationality,input_birthday,input_phone,input_home,input_marriage,input_certificates}=e.detail.value;

    console.log("ADDR2=", e.detail.value.input_addr);
    console.log("phone =", e.detail.value.input_phone);
    console.log("birthday =", that.data.member_birthday);
    console.log("expiration =", that.data.member_id_expiration);

    that.setData({
      name: e.detail.value.input_name,
      id: e.detail.value.input_ID,
    })

    wx.request({
      url: 'https://www.top-talent.com.cn/linghuo/insert2DB.php',
      method:"POST",
      header:{
        // 'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },

      data:{
        name: e.detail.value.input_name,
        id: e.detail.value.input_ID,
        addr: e.detail.value.input_addr,
        // birthday: e.detail.value.input_birthday,
        birthday: that.data.member_birthday,
        gender: e.detail.value.input_gender,
        nationality: e.detail.value.input_nationality,
        // type: e.detail.value.input_type,
        openid: wx.getStorageSync("openid"),
        // marriage:e.detail.value.input_marriage,
        // certificates:e.detail.value.input_certificates,
        // home_addr: e.detail.value.input_home,
        // phone_num:e.detail.value.input_phone,
        expiration:that.data.member_id_expiration,
        // role:"員工",
        application:that.data.scan_result
        //
        // name: e["result"].name,
        // id: e["result"].ID,
        // addr: e["result"].addr,
        // birthday: e["result"].birthday,
        // gender: e["result"].gender,
        // nationality: e["result"].nationality,
        // type: e["result"].type,
        // openid: app.globalData.member_openID,
        // marriage:"0",
        // certificates:"0",
        // registered_addr: "0",
        // phone_num:"0",
        // role:"0",
        // application:"0"
        //
        // name: input_name,
        // input_ID,
        // input_addr,
        // input_gender,
        // input_nationality,
        // input_birthday,
        // input_phone,
        // input_home,
        // input_marriage,
        // input_certificates
        //

      },


      success:function(ret){
        // that.globalData.openid= openid,
        // that.globalData.member_id=id
        console.log('app=',app.globalData.openid);
        // console.log('member_id=',this.data.name);
        console.log('member_id=',that.data.id);
        console.log('insert2DB result=',ret);

        if(ret.data === that.data.id){
          return 1;
        }else{
          return 0;
        }

        // console.log('member_id=',app.globalData.member_id);
        // console.log('openid=',that.globalData.openid);
        // console.log('memberid=',e.detail.value.input_ID);

        // I shall check whether this member was assigned to specific task_id before getting sign off

            // member_id: app.globalData.member_id,
        //
        // that.setData({
        //
        //
        //   list: ret.data,
        // })
        // wx.hideToast();
        // if(ret){
        //   wx.navigateTo({ // o NOT use stch bar url
        //     // url:'../test/test?info=test',
        //     url:'../draw/draw?info=test',
        //   }),
              // wx.showModal({
              //   title: 'RETURN',
              //   content: '返回'+ret.data,
              // })

        // }



      }
    })



    // wx.navigateTo({
    //   url: '../storageConsole/storageConsole'
    // })


  },

  IfTask(uid){
    var app = getApp();
    let that = this

    var open_id = wx.getStorageSync("openid");
    var ifmatched=''
    // that.setData({
    //   name: e.detail.value.input_name,
    //   id: e.detail.value.input_ID,
    // })
    wx.request({
      url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=' + open_id,
      // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=oMa-B4rXn6o8QrlzhXhz27zxxhqs',
      header:{
        'Content-Type': 'application/json'
      },
      success: function(res) {

        if(res.data['matched']==1){
          that.setData({
          ifmatched:res.data[0].task_id})
        }else{
          that.setData({
            ifmatched:'0'})
        }
        console.log("if task:",res)

        console.log("assigned task:",that.data.ifmatched)
        console.log("assigned task matched:",res.data["matched"])
        //
        // that.setData({
        //   list: res.data,
        //   task_name: '職缺',
        //   task_corporation: '公司',
        //   task_date: '刊登日期',
        //   task_description: '工作內容',
        //   task_requirement: '要求資質',
        //   task_address: '工作地點',
        //   task_num_recruiting: '需求人數',
        //   task_expiration: '截止日期',
        //   matched :res.data['matched'],
        //   ifMatched: ifmatched
        //
        //
        // })

      },
      fail: function (res) {
        console.log("fail: ", res);
      },
      complete: function (res) {
        console.log("switch contract by task id : ", that.data.ifmatched);


            wx.navigateTo({
              url:'../contract/contract?openid='+app.globalData.openid+'&member_id='+that.data.id+'&member_name='+that.data.name+'&task_id='+that.data.ifmatched
            })

      }
    })

  },


  bindDateChange: function(e) {
    this.setData({
      member_id_expiration: e.detail.value
    })
  },
  birthdayChange: function(e) {
    this.setData({
      member_birthday: e.detail.value
    })
  },


})
