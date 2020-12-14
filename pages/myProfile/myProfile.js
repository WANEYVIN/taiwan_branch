let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractDoc: '',
    IsMember: '',
    submitButton: '确认提交',
    drop_button: '撤销会员资质登记',
    array: ['未婚', '已婚', '其它'],
    index: 0,
    shown_marrige: "请选择",
    shown_gender: "请选择",
    gender_array: ['女', '男'],
    gender_index: 0,
    // expired_colour: '#E64340'
    expired_colour: '',
    label_nationality: "民族:",
    default_input: '请输入',
    management:1

  },
  // data: {
  //   array: ['未婚', '已婚', '其它'],
  //   index: 0,
  //   // shown_marrige: member_marrige
  //
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //onLoad: function (options) {  // this should be better to change to onShow for reload everytime coming in
    /*
        wx.getStorageInfo({
          success (res) {
            console.log(res.keys)
            console.log(res.currentSize)
            console.log(res.limitSize)
          }
        })
        */
///


    var that = this
    if (wx.getStorageSync("member_id").substring(0, 2) === '83') {
      that.setData({
        label_nationality: "證件屬籍:"
      })
    }


    // if (wx.getStorageSync("openid") === 'oMa-B4qh1ancRHPAr32QBHiTQGSk') {
      var member_role = wx.getStorageSync("member_role")
    console.log("MY ROLE = ",member_role)

    if ( member_role === ('admin' || 'manager')) {
        that.setData({
        management: '1'
      })
      console.log("ROLE = ",member_role,"management = ",that.data.management)

    }
  },
  onShow: function () {
    var that = this


    let open_id = wx.getStorageSync("openid");
    that.getTask();
    // var task_id = that.getTask();
    // console.log("get from getTask = "+ that.getTask())

// try to use membership and IDcheck.wxml to merge a new page that can provide facility for editing the profile

    // wx.login({
    //   success: function (res) {
    //     var code = res.code;
    //
    //     console.log("cd= "+app.globalData.openid)
    wx.request({
      // url: '后台通过获取前端传的code返回openid的接口地址',
      url: getApp().globalData.serverURL + '/membership.php?uid=' + open_id,

      // data: { code: code },
      // method: 'POST',
      method: 'GET',
      header: {'content-type': 'application/json'},
      success: function (res) {
        // console.log("status= "+res.statusCode);
        console.log("1 OPEN ID= " + JSON.stringify(res.data), res);
        // console.log("2 OPEN ID= "+ res.data.member[0].member_address);


        if (res.statusCode == 200) {
          console.log("result of access membership.php: ", res);

          that.setData({
            IsMember: res.data.IsMember
          })
          console.log("IsMember: ", res.data.IsMember);
          // that.globalData.openid= res.data.openid
          // that.globalData.IsMember=res.data.IsMember
          if (res.data.IsMember != 0) {

            that.setData({
              member_id_expiration: res.data.member[0].member_ID_expiration,
              member_bank_name: res.data.member[0].member_bank_name,
              member_bank_branch: res.data.member[0].member_bank_branch,
              member_bank: res.data.member[0].member_bank,


              member_address: res.data.member[0].member_address,
              member_application: res.data.member[0].member_application,
              member_certificate: res.data.member[0].member_certificate,
              member_id: res.data.member[0].member_id,
              // member_marrige: res.data.member[0].member_marrige,
              // member_marrige: that.data.array[res.data.member[0].member_marrige],
              shown_marrige: res.data.member[0].member_marrige ? res.data.member[0].member_marrige : "请选择",

              // index:that.data.array.indexOf(that.data.shown_marrige),
              member_name: res.data.member[0].member_name,
              member_openID: res.data.member[0].member_openID,
              member_gender: res.data.member[0].member_gender,

              gender_index: that.data.gender_array.indexOf(res.data.member[0].member_gender),
              shown_gender: res.data.member[0].member_gender,
              member_nationality: res.data.member[0].member_nationality,
              member_phone_num: res.data.member[0].member_phone_num,
              member_registered_addr: res.data.member[0].member_registered_addr,
              member_role: res.data.member[0].member_role,
              member_sn: res.data.member[0].member_sn,
              member_birthday: res.data.member[0].member_birthday,
              member_bank: res.data.member[0].member_bank,
              contractDoc: getApp().globalData.serverURL + '/contract/member_signoff/' + res.data.member[0].member_id + '/' + res.data.member[0].member_id + '-' + wx.getStorageSync("task_id") + '.pdf'
            })
            console.log("gender index", that.data.gender_array.indexOf(res.data.member[0].member_gender), res.data.member[0].member_gender)

          }// check ismember, if it is not a member then no necessary to set data!
          else {
            that.setData({
              IsMember: res.data.IsMember
            })
            var IsMember = res.data.IsMember
            // this is not a registered member , go tp persuade to register
            console.log("this is not a registered member , go tp persuade to register", IsMember)

          }
        } else {
          console.log(res.errMsg)
        }
        // console.log( "contract = ", that.data.contractDoc)

      }
    })


  },
  downloadFile(e) {
    var that = this

    // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
    // var src = this.data.contractDoc; // 这个定义了一个属性src来存地址
    // var src = e.data.contractDoc; // 这个定义了一个属性src来存地址
    console.log("contract = ", this.data.contractDoc)
    var src = this.data.contractDoc

    wx.downloadFile({
      url: src,
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          Type: 'pdf',
          showMenu: true,
          success: function (res) {
            console.log('打开文档成功',res)
            console.log('打开文档成功PATH: ',Path)

            // wx.navigateBack({
            //   delta:1
            // })

                if (Path.length > 0){
                  wx.removeSavedFile({
                    filePath: Path,
                    complete (res) {
                      console.log("REMOVE FILE",res)
                    }
                  })
                }


          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })

  },
  takeCamera: function () {
    wx.navigateTo({
      // wx.redirectTo({
      url: '../scan/scan'
      // url: '../test/test'
    })
  },

  formSubmit: function (e) {
    let that = this
    console.log("update content= ", e)

    var update = that.update2DB(e);
    console.log("update = ", update)

    wx.showModal({
      // title: "提示"+update,
      content: "更新已送出",
      showCancel: false
    });

    // // if(update ===1){
    //   if(update ===1){
    //   wx.showModal({
    //     title: "提示"+update,
    //     content: "更新完成",
    //     showCancel: false
    //   });
    // }else{
    //   wx.showModal({
    //     title: "提示"+update,
    //     content: "上传失败",
    //     showCancel: false
    //   });
    // }

  },
  update2DB(e) {
    var app = getApp();
    let that = this


    // console.log("ADDR1=", e);
    console.log("OPENID=", app.globalData.openid);
    // that.globalData.openid
    // let{input_name,input_ID,input_addr,input_gender,input_nationality,input_birthday,input_phone,input_home,input_marriage,input_certificates}=e.detail.value;

    console.log("marriage=", that.data.index);

    // that.setData({
    //   name: e.detail.value.input_name,
    //   id: e.detail.value.input_ID,
    // })

    wx.request({
      // url: 'https://www.top-talent.com.cn/linghuo/update2DB.php',
      url: getApp().globalData.serverURL + '/update2DB.php',
      method: "POST",
      header: {
        // 'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },

      data: {
        name: e.detail.value.input_member_name,
        id: e.detail.value.input_member_id,
        addr: e.detail.value.input_member_address,
        // birthday: e.detail.value.input_member_birthday,
        birthday: that.data.member_birthday,
        // gender: e.detail.value.input_member_gender,
        // gender: that.data.gender_index,
        gender: that.data.gender_array[that.data.gender_index],

        nationality: e.detail.value.input_member_nationality,
        // type: e.detail.value.input_type,
        openid: wx.getStorageSync("openid"),
        // marrige:e.detail.value.input_member_marrige,
        // marrige:that.data.index,
        marrige: that.data.array[that.data.index],

        // certificates:e.detail.value.input_member_certificate,
        home_addr: e.detail.value.input_member_registered_addr,
        phone_num: e.detail.value.input_member_phone_num,
        bank: e.detail.value.input_member_bank,
        bank_name: e.detail.value.input_bank_name,
        bank_branch: e.detail.value.input_bank_branch,
        ID_expiration: that.data.member_id_expiration
        // role:"員工",
        // application:"應徵介紹"input_member_marrige

      },


      success: function (ret) {
        // that.globalData.openid= openid,
        // that.globalData.member_id=id
        console.log('db result ', ret.data);
        // console.log('member_id=',this.data.name);
        // console.log('member_id=',that.data.id);
        // return ret.data
        return ret.data
              // wx.clearStorageSync()

        // console.log('member_id=',app.globalData.member_id);
        // console.log('openid=',that.globalData.openid);
        // console.log('memberid=',e.detail.value.input_ID);
        // wx.navigateTo({
        //   url:'../contract/contract?openid='+app.globalData.openid+'&member_id='+that.data.id+'&member_name='+that.data.name
        //
        // })

      }
    })

  },
  drop: function () {
    let member_id = wx.getStorageSync("member_id")

    let that = this
    var drop_button = '撤销会员资质登记'
    that.setData({
      drop_button: '撤销会员资质登记'
    })

    wx.showModal({
      title: '重要提示',
      content: '您正在撤销会员资质登记',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          // wx.navigateTo({
          //   url:'../index/index'
          // }) // no use
          // wx.switchTab({
          //   url: '../index/index',
          // });


          wx.request({
            //撤銷人員方式為刪除該員資料庫裡的open_id
            // url: 'https://www.top-talent.com.cn/linghuo/delete_member.php?openid='+openid,
            url: getApp().globalData.serverURL + '/member_self_drop.php?member_id=' + member_id,
            // url: 'https://www.top-talent.com.cn/linghuo/member_self_drop.php?member_id='+member_id,
            method: "POST",
            header: {
              // 'Content-Type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
            },


            success: function (ret) {

              console.log('db result ', ret);
              wx.clearStorageSync()
              console.log('clean storage');
              // wx.navigateTo({
              //   url:'../index/index'
              // })
              // wx.reLaunch({
              //   url: 'index'
              // })
              wx.switchTab({
                url: '../index/index',
              });

            }
          })


          console.log('用户点击gogo')

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getTask() {
    let that = this;
    var open_id = wx.getStorageSync("openid");
    wx.request({
      // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=' + open_id,
      url: getApp().globalData.serverURL + '/member_query.php?openid=' + open_id,
      // url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=oMa-B4rXn6o8QrlzhXhz27zxxhqs',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {


        console.log("get task info :", res.data);
        console.log("if task assigned :", res.data['matched']);
        if (res.data['matched'] == 1) {
          var ifmatched = res.data[0].task_id;
        } else {
          var ifmatched = '0';
        }
        console.log("IFMATCHED  :", ifmatched);

        that.setData({
          list: res.data,
          matched: res.data['matched'],
          ifMatched: ifmatched


        })
        wx.setStorageSync("task_id", that.data.ifMatched);

        // that.data.list.pop()
        // var cutting = that.data.list.splice(2,1);

        console.log("onshow : ", res.data);

      },
      fail: function (res) {
        console.log("fail: ", res);
      },
      complete: function (res) {
        console.log("return matched task id : ", that.data.ifMatched);

        return that.data.ifMatched
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      member_birthday: e.detail.value
    })
  },

  expirationChange: function (e) {
    this.setData({
      member_id_expiration: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.array[1])
    this.setData({
      index: e.detail.value,
      shown_marrige: this.data.array[e.detail.value]
      // member_marrige: this.data.array[e.detail.value]

    })
  },

  Picker_gender: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.gender_array[1])
    this.setData({
      gender_index: e.detail.value,
      shown_gender: this.data.gender_array[e.detail.value]
      // member_marrige: this.data.array[e.detail.value]

    })
  },
  manager(e) {

    // verifyRole(openid){
    let that = this
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: getApp().globalData.serverURL + '/updateMemberRole.php?query=role&id=' + openid,
      // url: 'https://www.top-talent.com.cn/linghuo/updateMemberRole.php?query=role&id='+openid,
      method: "GET",
      header: {
        'Content-Type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },
      success: function (ret) {

        console.log('verify result=', ret.data);

        // that.setData({
        //   role: ret.data
        // })
        console.log('verify result set data=', that.data.role);
        console.log('click approval=', e.currentTarget.id);

        if (ret.data === 'admin' && e.currentTarget.id=='approval'){
          wx.redirectTo({
            url: '../apply4mgmt/apply4mgmt'
            // url: '../test/test'
          })
        }


        if (ret.data === 'admin' || ret.data === 'manager') {




          wx.redirectTo({
            url: '../mgmt/mgmt'
            // url: '../test/test'
          })
        } else {

          wx.showModal({
            title: '只开放管理员进入',
            content: '若您是管理员请按『确定』申请管理员权限，或按『取消』退回原来页面。',
            success(res) {
              if (res.confirm) {
                // jump to scan the back side
                // that.photo("shenfenzheng")
                // record everything on to local storage

                wx.request({
                  url: getApp().globalData.serverURL + '/updateMemberRole.php?query=apply&id=' + openid,
                  method: "GET",
                  header: {
                    'Content-Type': 'application/json'
                    // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
                  },
                  success: function (ret) {
                    console.log("apply for a manager: ", ret)

                  }
                })
                // }
              } else {
                // wx.navigateTo({
                wx.switchTab({
                  url: '../myProfile/myProfile'
                })

              }

            }
          })

        }


      }
    })


  },

  getPhoneNumber(e) {
    console.log('ERR MSG', e.detail.errMsg)
    console.log('iv', e.detail.iv)
    console.log('DATA', e.detail.encryptedData)

    let that = this
    /*
    wx.login({

      success: function (res) {
        var code = res.code;

        console.log(res + "code= " + code)
        wx.request({
          // url: '后台通过获取前端传的code返回openid的接口地址',
          // url: 'https://www.top-talent.com.cn/linghuo/getOpenID.php?code='+code,
          // url: 'https://www.melburg.tw/linghuo/getOpenID.php?code='+code,
         url: getApp().globalData.serverURL + '/getOpenID.php?code=' + code+'&iv='+e.detail.iv+'&data='+e.detail.encryptedData,

          data: {
            code: code,
            encryptedData:e.detail.encryptedData,
            iv:e.detail.iv

          },
          // method: 'POST',
          method: 'GET',
          header: {'content-type': 'application/json'},
          success: function (res) {

            // that.globalData.openid = res.data.openid
            // console.log("status= "+res.statusCode);
            // console.log(res.data.errMsg + "1 OPEN ID= " + res.data.openid + "    ---   SESSIID = " + res.data.session_key + " other factor =" + res.data.IsMember);
            console.log("login result",res);
            // return that.globalData.openid

          }
        })

      }
    })
    */


    /////////////////////////////////////

    wx.login({

      success: function (res) {
        var code = res.code;

        console.log(res+"code= "+code)
        wx.request({

          url: getApp().globalData.serverURL+'/getOpenID.php?code='+code,

          data: { code: code
          },
          // method: 'POST',
          method: 'GET',
          header: { 'content-type': 'application/json'},
          success: function (res) {

            console.log("RES:",res.data.openid);
            console.log("    ---   SESSIID = "+res.data.session_key);
            // return that.globalData.openid

            if (res.statusCode == 200) {
              console.log("APP_JS onShow = "+  JSON.stringify(res));
              // that.globalData.openid = res.data.openid;
              // // that.globalData.userId = res.data.UserId;
              // // console.log("openid= "+that.globalData.openid);
              // wx.setStorageSync("openid", that.globalData.openid)


              that.setData({
                condition: 1,
                openid : res.data.openid,
                session_key : res.data.session_key

              })


              wx.request({

                url: getApp().globalData.serverURL + '/getOpenID.php',


                data: {
                  //   // code: code,
                  encryptedData:e.detail.encryptedData,
                  // encryptedData:"HoLM9cNa1Y5sl4nb1XZmSZCYSxmVbkpOVbYqQ+H9iQP7CnQUzKFzBX96VjfNb/C8IZyA4WPbQctlkdZ3Rr2q2SaEhUomAEoLkHZ2JTCUuvs5CjnHdxF+nIG8fSJzhH3kQRqVSU+Yg9OvPO8YoZo+6+2LbIvN8FiLOMps7BsSCLeQUY/m6rGahFZDqWW2OI00tuhh7pCGDlhGtYUGHHlXcw==",
                  iv:e.detail.iv,
                  sessionKey:that.data.session_key
                  // iv:"HdfNFpG19ZXCDMzikSEJQA==",
                  // sessionKey:"HS4+tljWW6cIL4REPbNbAA=="
                  //
                },

                method: 'POST',
                // method: 'GET',
                // header: {'content-type': 'application/json'},
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("encryptedData :",e.detail.encryptedData);
                  console.log("iv :",e.detail.iv);
                  console.log("sessionKey :",that.data.session_key);

                  // that.globalData.openid = res.data.openid
                  // console.log("status= "+res.statusCode);
                  // console.log(res.data.errMsg + "1 OPEN ID= " + res.data.openid + "    ---   SESSIID = " + res.data.session_key + " other factor =" + res.data.IsMember);
                  console.log("login result",res.data.phoneNumber);
                  // return that.globalData.openid
                  if (res.data.phoneNumber!= '') {
                    that.setData({
                      member_phone_num: res.data.phoneNumber,
                    })
                  }


                }
              })


            } else {
              console.log("network status = "+  res.statusCode); // this error code should be recorded on the backend server

              console.log("network error = "+res.errMsg);// useless error message
              // reject(res);
            }

            // resolve(res)
            // }else{
            //     reject('error')
          },
          fail: function(res) {
            // reject(res);
            wx.showToast({
              title: '系统错误'
            })
          },
          complete: () => {

          } //complete接口执行后的回调函数，无论成功失败都会调用

        })

      }
    })






    /////////////////////////////////
    /*
    getApp().userLogin().then(

        function (res){
          console.log("promise回调后的数据session_key："+res.data.session_key);
          console.log("res in page= ",res);
          // var test = that.GetData(res.data.openid);
          // console.log("if res true : ", test);
          that.setData({
            condition: 1,
            openid : res.data.openid,
            session_key : res.data.session_key



          })

          console.log("POST parameters: data : ",e.detail.encryptedData);
          console.log("POST parameters: iv : ",e.detail.iv);
          console.log("POST parameters: session : ",that.data.session_key);
          wx.request({
            // url: '后台通过获取前端传的code返回openid的接口地址',
            // url: 'https://www.top-talent.com.cn/linghuo/getOpenID.php?code='+code,
            // url: 'https://www.melburg.tw/linghuo/getOpenID.php?code='+code,
            // url: getApp().globalData.serverURL + '/getOpenID.php?code=' + code+'&iv='+e.detail.iv+'&data='+e.detail.encryptedData,
            // url: getApp().globalData.serverURL + '/getOpenID.php?iv='+e.detail.iv+'&data='+e.detail.encryptedData+'&sessionKey='+that.data.session_key,
            url: getApp().globalData.serverURL + '/getOpenID.php',


            data: {
            //   // code: code,
              encryptedData:e.detail.encryptedData,
                  // encryptedData:"HoLM9cNa1Y5sl4nb1XZmSZCYSxmVbkpOVbYqQ+H9iQP7CnQUzKFzBX96VjfNb/C8IZyA4WPbQctlkdZ3Rr2q2SaEhUomAEoLkHZ2JTCUuvs5CjnHdxF+nIG8fSJzhH3kQRqVSU+Yg9OvPO8YoZo+6+2LbIvN8FiLOMps7BsSCLeQUY/m6rGahFZDqWW2OI00tuhh7pCGDlhGtYUGHHlXcw==",
              iv:e.detail.iv,
              sessionKey:that.data.session_key
              // iv:"HdfNFpG19ZXCDMzikSEJQA==",
              // sessionKey:"HS4+tljWW6cIL4REPbNbAA=="
            //
            },

            method: 'POST',
            // method: 'GET',
            // header: {'content-type': 'application/json'},
            header:{
            'content-type':'application/x-www-form-urlencoded'
          },
            success: function (res) {
              console.log("encryptedData :",e.detail.encryptedData);
              console.log("iv :",e.detail.iv);
              console.log("sessionKey :",that.data.session_key);

              // that.globalData.openid = res.data.openid
              // console.log("status= "+res.statusCode);
              // console.log(res.data.errMsg + "1 OPEN ID= " + res.data.openid + "    ---   SESSIID = " + res.data.session_key + " other factor =" + res.data.IsMember);
              console.log("login result",res.data.phoneNumber);
              // return that.globalData.openid
              if (res.data.phoneNumber!= '') {
                that.setData({
                  member_phone_num: res.data.phoneNumber,
                })
              }


            }
          })




          // getApp().GetData(app.globalData.openid)
          // // if this is a new user without registering as a member, then only openID will be recorded in local storage
          //
          // console.log("进入的用户：" +app.globalData.openid,wx.getStorageSync("member_id"));

        }
        ,
        function (res){

          console.log("promise rejected  : "+res);


        })

    */

  }
})
