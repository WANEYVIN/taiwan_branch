// this page is for validate ID card with camera OCR recognition ////////
var _switch =0
// globalData:{
//   userInfo:null,
//       test:"test"
// }
Page({

  data:{
    loading: '0',
    frontCheck:'0',
    backCheck:'0',
    inputVal:null,
    msg:'',
    current:'',
    toast: false,
    load: false,
    hideToast: false,
    hideLoading: false,
    // onChoose:'true'

  },

  onLoad: function (options) {

    console.log("onchoose -3", this.data.onChoose);

/*
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
*/

    console.log("onchoose -2", this.data.onChoose)


    // this.photo("shenfenzheng")
    // this.photo("shenfenzheng")
    // this.photo("shenfenzheng")



    // this.shenfenzheng();



  },

  onShow: function (options) {
    let that = this
    // if(this.data.loading ==='0'){
    //   this.shenfenzheng();
    // this.photo("shenfenzheng")

    // }

    // var pages = getCurrentPages();
    // console.log("page", pages)
    //
    // if(pages.length == 0) {
    //   //your code
    //   this.photo("shenfenzheng")
    //
    // }
    // if (_switch){
    //   _switch = false;
    //   return;
    // }
    // console.log("switych", _switch)
    console.log("onchoose -1", this.data.onChoose)

    // if (this.data.onChoose) return;
    // that.data.onChoose = true


    console.log("onchoose 0", this.data.onChoose)
    _switch +=1
    console.log("switch :", _switch);
    if(_switch<2) {

      that.photo("shenfenzheng")
      // console.log("without chooseImage ")
/*
            wx.chooseImage({
                 count: 1,
                 sizeType: ['original', 'compressed'],
                 sourceType: ['camera', 'album'],

             success: function (res) {
               console.log("chooseImage ", res)

             }



           that.photo("shenfenzheng").then(
               function (res){

                 // success(res)=>{

             console.log("promise success", res)

             that.data.loading = 1

             that.setData({
               loading: "1",
               onChoose: false
             })
             console.log("onchoose3", that.data.onChoose,"loading:",that.data.loading)


             // tempFilePath可以作为img标签的src属性显示图片
             let imgUrl = res.tempFilePaths[0];
             // return;
             // It was directly go to getImgUrl but I change it for better control
             console.log("choose image OK, uploading the image to OCR", that.data, res)
             that.loadIcon()

             that.uploadImg("shenfenzheng", imgUrl)


           },
               function (res){

                 console.log("promise failed", res)

                 that.setData({
                   loading: "1",
                   onChoose: false,
                 })




                 // console.log("counting concels:", countCencel)

                 console.log("choose image failure", res)

                 if (_switch < 4) {

                   countCencel += 1

                   console.log("go go counting concels:", countCencel)

                   that.photo("shenfenzheng") // currently working

                 } else {

                   wx.showModal({
                     title: '是否发生问题?',
                     content: '请按『确定』键选择正确照片，或按『取消』键回到主页。',
                     success (res) {
                       if (res.confirm) {
                         // jump to scan the back side
                         that.photo("shenfenzheng")
                         // record everything on to local storage
                       }else{
                         // wx.navigateTo({
                         wx.switchTab({
                           url: '../index/index'
                         })

                       }

                     }//success of showModal
                   }) // end of showModal



                 }
                 // return false


          })

 */

    }
    // this.loadIcon()

  },
  onUnload: function (options) {
  // _switch =0
    console.log("onUnload and _switch = ",_switch)

    // log to the backend
  },

  /*
    shenfenzheng(){
      // it was a chain reaction but I change it to a controllable process
      this.photo("shenfenzheng")


    },

*/

//拍照或者从相册选择要识别的照片
  // due to infinite looping when chooseImage, I change the photo function to a promise way
  /////////////////////////////
  photo_promise: function(type) {
    // login means get the openID not necessary means registered as a member
    var that = this;
    var countCencel=0

//定义promise方法
    return new Promise(function(resolve, reject) {


          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera', 'album'],

        success: function (res) {
          resolve(res)
/*
          console.log("chooseImage success",res)

          return

          that.data.loading = 1

          that.setData({
            loading: "1",
            onChoose: false
          })
          console.log("onchoose3", that.data.onChoose,"loading:",that.data.loading)


          // tempFilePath可以作为img标签的src属性显示图片
          let imgUrl = res.tempFilePaths[0];
          // return;
          // It was directly go to getImgUrl but I change it for better control
          console.log("choose image OK, uploading the image to OCR", that.data, res)
          that.loadIcon()

          that.uploadImg(type, imgUrl)

*/


          // resolve(res)



            },
            fail: function(res) {

              reject(res);
/*
              that.setData({
                loading: "1",
                onChoose: false,
              })




              console.log("counting concels:", countCencel)

              console.log("choose image failure", res)

              if (_switch < 4) {

                countCencel += 1

                console.log("go go counting concels:", countCencel)

                that.photo("shenfenzheng") // currently working

              } else {

                wx.showModal({
                  title: '是否发生问题?',
                  content: '请按『确定』键选择正确照片，或按『取消』键回到主页。',
                  success (res) {
                    if (res.confirm) {
                      // jump to scan the back side
                      that.photo("shenfenzheng")
                      // record everything on to local storage
                    }else{
                      // wx.navigateTo({
                      wx.switchTab({
                        url: '../index/index'
                      })

                    }

                  }//success of showModal
                }) // end of showModal



              }
              // return false
*/



            },
            complete: () => {


            } //complete接口执行后的回调函数，无论成功失败都会调用

          })


    }).catch(function(reason) {
      console.log('catch:', reason);
      reject(res);
    })






  },



  /////////////////////////////
  // photo_backup(type) {
    photo(type) {

      let that = this;
      // console.log("data", this.data)

      // if (that.data.onChoose) return
      // if (this.data==true) return
      //
      // that.setData({
      //   loading: "0",
      //   onChoose : true
      //
      // })
      console.log("onchoose1", that.data.onChoose)
      // if (this.data.onChoose) {
      //   return
      // }else{
      //
      // that.data.onChoose = true

      // if(that.data.onChoose){

      // if (that.data.onChoose==true) return
      // that.data.onChoose = true
      // var pages = getCurentPages();
    //
    //     that.data.onChoose = false

        console.log("onchoose2", that.data.onChoose)

      // if(that.data.onChoose==true) {
        // _switch = true
        // that.setData({
        //   loading: "1",
        //   onChoose: false
        // })

      var countCencel=0


        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          // sizeType: ['original'],

          // sourceType: ['album', 'camera'],
          sourceType: ['camera', 'album'],
          // sourceType: ['camera'],

          success: function (res) {
            console.log("chooseImage success",res)

            // return

            that.data.loading = 1

            that.setData({
              loading: "1",
              onChoose: false
            })
            console.log("onchoose3", that.data.onChoose,"loading:",that.data.loading)




            // openLoading: function() {
           /* console.log("start to set loading circle running")
              that.setData({
                load: true
              });
              setTimeout(() => {
                that.setData({
                  hideLoading: true
                });
                setTimeout(() => {
                  that.setData({
                    load: false,
                    hideLoading: false,
                  });
                }, 300);
              }, 3000);
            // }
            console.log("end of setting loading circle running")

            */


            // tempFilePath可以作为img标签的src属性显示图片
            let imgUrl = res.tempFilePaths[0];
            // return;
            // It was directly go to getImgUrl but I change it for better control
            console.log("choose image OK, uploading the image to OCR", that.data, res)
            that.loadIcon()

            that.uploadImg(type, imgUrl)

            // return true
            // this.data.onChoose = false
            // that.data.onChoose = false


          },
          fail: function (res) {

            // console.log("choose image failure", res)
            that.setData({
              loading: "1",
              onChoose: false,
              // countCancel:that.data.countCencel+1

            })




            console.log("counting concels:", countCencel)

            console.log("choose image failure", res)

            // if (countCencel < 4) {
              if (_switch < 4) {

              countCencel += 1

              // that.photo(type)
              // this.data.onChoose = false
              // this.photo("shenfenzheng")
              console.log("go go counting concels:", countCencel)

              that.photo("shenfenzheng") // currently working
              // that.shenfenzheng();

            } else {



                wx.showModal({
                  title: '是否发生问题?',
                  content: '请按『确定』键选择正确照片，或按『取消』键回到主页。',
                  success (res) {
                                     if (res.confirm) {
                      // jump to scan the back side
                      that.photo("shenfenzheng")
                      // record everything on to local storage
                    }else{
                                       // wx.navigateTo({
                                       wx.switchTab({
                                         url: '../index/index'
                                       })

                                     }

                  }
                })



            }
            // return false

          }

        })

      // }//if onchosse is true



    },

  loadIcon(){


        console.log("start to set loading circle running")
        this.setData({
          load: true,
          loading:1
        });
        setTimeout(() => {
          this.setData({
            hideLoading: true
          });
          setTimeout(() => {
            this.setData({
              load: false,
              hideLoading: false,
            });
          }, 300);
        }, 3000);
        // }
        console.log("end of setting loading circle running")
        // console.log("上传成功", res.fileID, "timestamp:", current_time)
      },

    // 上传图片到云存储
    uploadImg(type, imgUrl) {
      var current_time = new Date().getTime();
      var openid = wx.getStorageSync("openid");
      let that = this
      console.log("上传", that.data.loading)
      wx.cloud.uploadFile({
        // cloudPath: 'ocr/' + type + '.png', // I added for test
        cloudPath: 'ocr/' + type + current_time +'.png',
        // cloudPath: 'ocr/'+ type +'-'+ openid +'.png',

        filePath: imgUrl, // 文件路径
        success: res => {
      that.setData({
        loading: "1",
        current: current_time
      })

          // It was directly go to getImgUrl but I change it for better control
          that.getImgUrl(type, res.fileID)


          // return true

        },
        fail: err => {
          console.log("失败", err)
        }
      })
    },

    //获取云存储里的图片url
    getImgUrl(type, imgUrl) {
      let that = this
      wx.cloud.getTempFileURL({
        fileList: [imgUrl],
        success: res => {
          let imgUrl = res.fileList[0].tempFileURL
          console.log("获取图片url成功", imgUrl,res.fileList[0])
          // I addedd it for test
          // that.shibie(type, imgUrl)
          that.bianshi1(type,imgUrl) // currently working
          // that.shenfenzheng(imgUrl)

          console.log("上传成功123", res.fileID, "cloudPath:")

        },
        fail: err => {
          console.log("获取图片url失败", err)
        }
      })
    },
//////  I added this for management in the folder  ///////
  delFile(imgUrl) {
    var that = this;
    var fileID = 'cloud://testbed-freestyle.7465-testbed-freestyle-1300943434/ocr/'+'shenfenzheng'+that.data.current+'.png'
    console.log("deleting the file ID", fileID)
    wx.cloud.deleteFile({
      // fileList: [imgUrl],
      fileList: [fileID],

      // fileList: ["cloud://test-1adh8.7465-test-1adh8/images/1"],
      //cloud://testbed-freestyle.7465-testbed-freestyle-1300943434/ocr/shenfenzheng.png
      // fileList: ["cloud://testbed-freestyle.7465-testbed-freestyle-1300943434/ocr/shenfenzheng.png"],
      success(res) {
        console.log("删除文件：", res, "file:", res.fileList[0], "fileID:", fileID)

      }
    })

  },

  //////////////

  // input(e){
  //   // console.log("bind input :", e)
  //   this.setData({
  //     inputVal:e.detail.value
  //
  //   })
  //   console.log("bind input :", e)
  //
  // },
 bianshi1: function(type,imgUrl, e=null) {
 let that = this
  wx.cloud.callFunction({
    name: "ocr",
    data: {
      type: type,
      imgUrl: imgUrl
    },
    success(res) {
   console.log("识别成功xx", res, " TYPE=", type, " IMAGE URL=", imgUrl)

   console.log("GET the ID number", res.result.id)


   console.log("last result from the other side", e)


      var process = that.data.frontCheck+that.data.backCheck

      // var lastResult = JSON.parse(e)
      // var result = JSON.stringify(JSON.parse(result).push(lastResult))
      // var result = JSON.stringify(res.push(lastResult)) /// not work
      // console.log("new result:", result)
      var result = JSON.stringify(res)
      if(res.result.type==='Front') {



        // that.setLocalStorage(res.result)

        // console.log("set local storage", res.result);
        //
        // that.setLocalStorage(res.result)
        var result = res.result

                switch (process){
                  case "11":
                    console.log("both sides are scanned, go to next", process);
                    that.setData({
                      msg:'lets go to the next page front'
                    })

                    wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                      // url:'../test/test?info=test',
                      url: '../IDcheck/IDcheck?result=' + result,
                    })
                    break;

                  case "10":
                    console.log("front side is scanned, please turn around to the back", process);
                    that.setData({
                      // frontCheck:'1',
                      msg:'please turn to the back side'
                    })
                    console.log("set local storage", result);

                    that.setLocalStorage(result)
                    wx.showModal({
                      title: '此面扫描完成',
                      content: '请翻面拍照上传',
                      success (res) {
                        // jump to scan the back side
                        // that.bianshi1(type,imgUrl,result)
                        // that.photo("shenfenzheng")
                        if (res.confirm) {
                          // jump to scan the back side
                          that.photo("shenfenzheng")
                          // record everything on to local storage


                        }



                      }
                    })

                    break;
                  case "00":

                    console.log("both sides are NOT scanned", process);
                    // scan it and set front =1
                    that.setData({
                      frontCheck:'1',
                      msg:'you scanned the front side please turn to the back side'
                    })

                    var pass = that.IdentityCodeValid(res.result.id)
                          if (pass===true) {


                            console.log("set local storage", result);

                            that.setLocalStorage(result)
                            // that.upload2backend(imgUrl,res.result.type)
                            // var result = JSON.stringify(res)
                            wx.showModal({
                              title: '此面扫描完成',
                              content: '请翻面拍照上传',
                              success: function(res) {

                                if (res.confirm) {
                                  // jump to scan the back side
                                  that.photo("shenfenzheng")
                                  // that.shenfenzheng();
                                  // record everything on to local storage
                                }

                              }
                            })

                          }else { // if id number is not passed the validation

                            wx.showModal({
                              title: '身分证号有误',
                              content: '请使用正确证件重新拍照',
                              success (res) {
                                if (res.confirm) {
                                  that.photo("shenfenzheng")
                                  console.log('用户点击确定,重新拍照')

                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })


                          }

                    // console.log("upload and delete the image")
                    // that.upload2backend(imgUrl,res.result.type)

                    break;
                  case "01":
                    console.log("back side is scanned", process);
                    // scan it and set front =1
                    that.setData({frontCheck:'1'})
                    // var lastResult = JSON.parse(e)
                    // var result = JSON.stringify(JSON.parse(result).push(lastResult))
                    // var result = JSON.stringify(res.push(lastResult))


                    var pass = that.IdentityCodeValid(res.result.id)
                          if (pass===true) {


                            var result = JSON.stringify(res)
                            wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                              url: '../IDcheck/IDcheck?result=' + result,
                            })

                          }else { // if id number is not passed the validation

                            wx.showModal({
                              title: '身分证号有误',
                              content: '请使用正确证件重新拍照',
                              success (res) {
                                if (res.confirm) {
                                  that.photo("shenfenzheng")
                                  console.log('用户点击确定,重新拍照')

                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })


                          }
                    console.log("upload and delete the image")
                    that.upload2backend(imgUrl,res.result.type)
                    break;
                }

                /// processing the scan and set frontcheck =1

      }

      else
      {
/*
        const scanBack = new Promise(function (resolve,reject){
          var exdate = that.printedText(type,imgUrl)
          if(exdate==true){
            resolve(exdate)

          }else{
            reject(exdate)
          }

        })*/
        _switch =0
        console.log("switch :", _switch);
              switch (process) {
                case "11":
                  console.log("both sides are scanned, go to next", process);
                  that.setData({
                    msg: 'lets go to the next page'
                  })


                  wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                    // url:'../test/test?info=test',
                    url: '../IDcheck/IDcheck?result=0',
                  })
                  break;




                case "10":
                  console.log("front side is scanned, lets do the back side", process);
                  // scan it and set back =1
                  that.setData({
                    backCheck: '1',
                    msg: 'now both side are scanned, lets go to the next page'
                  })
                  ///////////////////////////////////////////////
                  // var exdate = that.printedText(type,imgUrl)
                  // console.log("the expired date is : ", exdate);
                  /*const scanBack = new Promise(function (resolve,reject){
                    var exdate = that.printedText(type,imgUrl)
                    if(exdate===true){
                      resolve(exdate)

                    }else{
                      reject(exdate)
                    }

                  })
                    */

                  var validDate_format = /\d{8}\-\d{8}/;
                  console.log("regular TESTING : ",res.result.validDate);
                  console.log("regular TEST works : ",validDate_format.test(res.result.validDate));
                  // console.log("regular TEST works : ",validDate_format.test("  20040919-20240918 0 "));



                  if (validDate_format.test(res.result.validDate)){
                    // if (res.result.validDate.match()){
                    console.log("EXTRACTING regular result : ", that.extraValidDate(res.result.validDate));
                    // extraValidDate(e)
                    // var exdate = that.printedText(type,imgUrl)
                    var extraDate =  that.extraValidDate(res.result.validDate)
                    // extraValidDate(e)
                    // var exdate = that.printedText(type,imgUrl)
                    if(that.verifyExpiration(extraDate)){
///////////////  if the regular recognition works then no need to ocr text
                    /*
                  var validDate_format = /^\d{8}\-\d{9}\$/;
                  console.log("regular TEST: ", res.result.validDate);

                  if (validDate_format.test(res.result.validDate)) {
                    // if (res.result.validDate.match()){
                    console.log("regular TEST works : ", resresult.validDate);
                    console.log("EXTRACTING regular result : ", extraValidDate(e));
                    var extraDate =  that.extraValidDate(res.result.validDate)
                    // extraValidDate(e)
                    // var exdate = that.printedText(type,imgUrl)
                    wx.setStorageSync("expiration", extraDate[0] + "." + extraDate[1] + "." + extraDate[2]);

                    var expirationDate = wx.getStorageSync("expiration");
                    console.log("status 10 and get is expiration test passed then go to the next : ", expirationDate, result, exdate);

                                if(that.verifyExpiration(extraDate)){
                                  //go next
*/


                                  wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                                    // url:'../test/test?info=test',
                                    url: '../IDcheck/IDcheck?result=0',
                                  })



                                }else{

                                  wx.showModal({
                                    title: '证件过期',
                                    content: '证件到期日 : ' + expirationDate + '  ,若您确定未过期， 请按[确定]，' +
                                        '  ' +
                                        ' 或者按[取消]，请更新证件后重新拍照',
                                    success(res) {
                                      // jmp to scan the back side
                                      // that.bianshi1(type,imgUrl)
                                      // navigate to warning page
                                      if (res.confirm) {
                                        // that.photo("shenfenzheng")
                                        console.log('证件过期,用户点击确定,重新拍照', err)
                                        // wx.setStorageSync("expiration", expirationDate);
                                        wx.setStorageSync("expiration_err", err);

                                        wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                                          // url:'../test/test?info=test',
                                          url: '../IDcheck/IDcheck?result=0',
                                        })

                                      } else if (res.cancel) {
                                        console.log('用户点击取消')
                                      }
                                    }

                                  })

                                }


                  }else{


                  var exdate = that.printedText(type, imgUrl)

                  // exdate.then(function(){
                  exdate.then(function (exdate) {

                    var expirationDate = wx.getStorageSync("expiration");
                    console.log("normal status 10 and get is expiration test passed then go to the next : ", expirationDate, result, exdate);


                    wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                      // url:'../test/test?info=test',
                      url: '../IDcheck/IDcheck?result=0',
                    })
                    /*
                    wx.showModal({
                      title: '此面扫描完成',
                      content: '请翻面拍照上传',
                      success (res) {
                        // jump to scan the back side
                        // that.bianshi1(type,imgUrl)
                        if (res.confirm) {
                          that.photo("shenfenzheng")
                        }
                      }
                    })

                    */
                  }, function (err) {

                    if (err == '00000000') {
                                      wx.showModal({
                                        title: '辨识错误',
                                        content: '若您确定未过期，请按[确定]，请稍后手动输入' +
                                            '  ' +
                                            '或者按[取消]，请更新证件后重新拍照',
                                        success(res) {
                                          // jmp to scan the back side
                                          // that.bianshi1(type,imgUrl)
                                          // navigate to warning page
                                          if (res.confirm) {
                                            // that.photo("shenfenzheng")
                                            console.log('证件过期,用户点击确定,重新拍照', err)
                                            // wx.setStorageSync("expiration", expirationDate);
                                            wx.setStorageSync("expiration_err", err);
                                            that.photo("shenfenzheng")

                                            /*
                                            wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                                              // url:'../test/test?info=test',
                                              url: '../IDcheck/IDcheck?result=' + result,
                                            })
                                            */

                                          } else if (res.cancel) {
                                            console.log('用户点击取消')
                                          }
                                        }

                                      })
                        } else {


                      console.log('出错了!!!', err);

                      // var expirationDate = wx.getStorageSync("expiration");
                      wx.showModal({
                        title: '证件过期',
                        content: '证件到期日 : ' + err + '  ,若您确定未过期， 请按[确定]，' +
                            '  ' +
                            ' 或者按[取消]，请更新证件后重新拍照',
                        success(res) {
                          // jmp to scan the back side
                          // that.bianshi1(type,imgUrl)
                          // navigate to warning page
                          if (res.confirm) {
                            // that.photo("shenfenzheng")
                            console.log('证件过期,用户点击确定,重新拍照', err)
                            // wx.setStorageSync("expiration", expirationDate);
                            wx.setStorageSync("expiration_err", err);

                            wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                              // url:'../test/test?info=test',
                              url: '../IDcheck/IDcheck?result=0',
                            })

                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }

                      })
                    } // end of if-else of expiration return == 00000000
                  }).catch(function () {


                  });

              }// if else of normal recognition successfully works, no need to OCR text

                  console.log("upload and delete the image")
                  that.upload2backend(imgUrl,res.result.type)

///////////////////////////////

                    /*
                  scanBack.then(function(exdate){
                    console.log("vvvvvv the expired date is : ", exdate);


                    wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                      // url:'../test/test?info=test',
                      url: '../IDcheck/IDcheck?result=' + result,
                    })

                  },function (error){

                    var expirationDate = wx.getStorageSync("expiration");
                    wx.showModal({
                      title: '证件过期',
                      content: '证件到期日:'+expirationDate+'请更新证件',
                      success (res) {
                        // jmp to scan the back side
                        // that.bianshi1(type,imgUrl)
                        // navigate to warning page
                      }
                    })
                    console.error('出错了', error);
                  });

*/


                /*
                  if(exdate){
                    wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                      // url:'../test/test?info=test',
                      url: '../IDcheck/IDcheck?result=' + result,
                    })
                  }else{
                    wx.showModal({
                      title: '证件过期',
                      content: '证件到期日:'+expirationDate+'请更新证件',
                      success (res) {
                        // jump to scan the back side
                        // that.bianshi1(type,imgUrl)
                        // navigate to warning page
                      }
                    })
                  }


                  */




                  break;


                case "00":
                  console.log("both sides are NOT scanned", process);
                  // scan it and set back =1
                  that.setData({backCheck:'1'})


                 /*const scanBack = new Promise(function (resolve,reject){
                   // var exdate = that.printedText(type,imgUrl)
                   console.log("show exdate : ", exdate,type,imgUrl);


                   if(that.printedText(type,imgUrl)){
                     console.log("resolve")
                     resolve()

                   }else{
                     console.log("reject")
                     reject()
                   }

                 })*/


                  // var res ="20040919-20240918"
                  var validDate_format = /\d{8}\-\d{8}/;
                  console.log("regular TESTING : ",res.result.validDate);
                  console.log("regular TEST works : ",validDate_format.test(res.result.validDate));
                  // console.log("regular TEST works : ",validDate_format.test("  20040919-20240918 0 "));



                  if (validDate_format.test(res.result.validDate)){
                    // if (res.result.validDate.match()){
                    console.log("EXTRACTING regular result : ", that.extraValidDate(res.result.validDate));
                    // extraValidDate(e)
                    // var exdate = that.printedText(type,imgUrl)
                    var extraDate =  that.extraValidDate(res.result.validDate)
                    // extraValidDate(e)
                    // var exdate = that.printedText(type,imgUrl)
                    if(that.verifyExpiration(extraDate)){
                      //go next
                      wx.showModal({
                        title: '此面扫描完成',
                        content: '请翻面拍照上传',
                        success(res) {
                          // jump to scan the back side
                          // that.bianshi1(type,imgUrl)
                          if (res.confirm) {
                            that.photo("shenfenzheng")
                          }
                        }
                      })
                    }else{
                      //exception
                      var expirationDate = wx.getStorageSync("expiration");

                      wx.showModal({

                        title: '证件过期',
                        content: '证件到期日 : ' + expirationDate + '  ,若您确定未过期，请按[确定]，' +
                            '  ' +
                            '或者按[取消]，请更新证件后重新拍照',
                        success(res) {
                          // jmp to scan the back side
                          // that.bianshi1(type,imgUrl)
                          // navigate to warning page
                          if (res.confirm) {
                            // that.photo("shenfenzheng")
                            console.log('证件过期,用户点击确定,重新拍照', err)
                            // wx.setStorageSync("expiration", expirationDate);
                            wx.setStorageSync("expiration_err", err);
                            that.photo("shenfenzheng")

                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }

                      })
                    }




                      wx.setStorageSync("expiration", exaDate[0] + "." + extraDate[1] + "." + extraDate[2]);

                    var expirationDate = wx.getStorageSync("expiration");
                    console.log("normal status 00 and get is expiration test passed then go to the next : ", expirationDate, result, exdate);

                  }else {

                    var exdate = that.printedText(type,imgUrl)

                    exdate.then(function () {
                          console.log("vvvvvv the expired date is : ");
                          var expirationDate = wx.getStorageSync("expiration");
                          console.log("get expirationDate from local Storage : ", expirationDate);

                          wx.showModal({
                            title: '此面扫描完成',
                            content: '请翻面拍照上传',
                            success(res) {
                              // jump to scan the back side
                              // that.bianshi1(type,imgUrl)
                              if (res.confirm) {
                                that.photo("shenfenzheng")
                              }
                            }
                          })
                        }

                        , function (err) {
                          console.log('出错了!!!', err);
                          // console.log('出错了!!!',err);


                          if (err == '00000000') {
                            wx.showModal({
                              title: '辨识错误',
                              content: '若您确定未过期，请按[确定]，请稍后手动输入' +
                                  '  ' +
                                  '或者按[取消]，请更新证件后重新拍照',
                              success(res) {
                                // jmp to scan the back side
                                // that.bianshi1(type,imgUrl)
                                // navigate to warning page
                                if (res.confirm) {
                                  // that.photo("shenfenzheng")
                                  console.log('证件过期,用户点击确定,重新拍照', err)
                                  // wx.setStorageSync("expiration", expirationDate);
                                  wx.setStorageSync("expiration_err", err);
                                  that.photo("shenfenzheng")

                                  /*
                                  wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                                    // url:'../test/test?info=test',
                                    url: '../IDcheck/IDcheck?result=' + result,
                                  })
                                  */

                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }

                            })
                          } else {


                          var expirationDate = wx.getStorageSync("expiration");
                          wx.showModal({
                            title: '证件过期',
                            content: '证件到期日 : ' + err + '  ,若您确定未过期，请按[确定]，' +
                                '  ' +
                                '或者按[取消]，请更新证件后重新拍照',
                            success(res) {
                              // jmp to scan the back side
                              // that.bianshi1(type,imgUrl)
                              // navigate to warning page
                              if (res.confirm) {
                                // that.photo("shenfenzheng")
                                console.log('证件过期,用户点击确定,重新拍照', err)
                                // wx.setStorageSync("expiration", expirationDate);
                                wx.setStorageSync("expiration_err", err);
                                that.photo("shenfenzheng")

                                /*
                                wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                                  // url:'../test/test?info=test',
                                  url: '../IDcheck/IDcheck?result=' + result,
                                })
                                */

                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }

                          })
                        }
                        });

                  } // else when normal recognition works then no need to use text OCR



                  // console.log("vvvvvv the expired date is : ", exdate);
                  // var expirationDate = wx.getStorageSync("expiration");
/*
                  wx.showModal({
                    title: '此面扫描完成',
                    content: '请翻面拍照'+expirationDate,
                    success (res) {
                      // jump to scan the back side
                      // that.bianshi1(type,imgUrl)
                      if (res.confirm) {
                        that.photo("shenfenzheng")
                      }
                    }
                  })

                    */

                  console.log("upload and delete the image")
                  that.upload2backend(imgUrl,res.result.type)

                  break;
                case "01":
                  console.log("back side is scanned, please turn around to the front", process);
                  // jump to front

                  wx.showModal({
                    title: '此面扫描完成',
                    content: '请翻面拍照上传',
                    success (res) {
                      // jump to scan the back side
                      // that.bianshi1(type,imgUrl)
                      if(res.confirm){
                        that.photo("shenfenzheng")

                      }
                    }
                  })
                  break;
                           }

      }
    },
    fail(res){
      console.log("FAIL in cloud call Function OCR:",res)

    },
  })


  /*
    console.log("the processing number:", process)

  // var process = that.data.frontCheck+that.data.backCheck


  console.log("this step processing number:", process, that.data.msg)


  var finalDate =  that.extractString()
   console.log("check the expired:", finalDate)

   wx.showModal({
     title: '重要提示'+finalDate,
     content: that.data.msg,
     success (res) {

     }
   })
     */



},

/*
    //调用云函数，实现OCR识别
    shibie(type, imgUrl) {

      console.log("Shibei",type,imgUrl)
      let that = this
      wx.cloud.callFunction({
        name: "ocr",
        data: {
          type: type,
          imgUrl: imgUrl
        },
        success(res) {
          console.log("识别成功xx", res, " TYPE=", type, " IMAGE URL=", imgUrl)

          console.log("GET the ID number", res.result.id)
          //////  check if this is front side or rare /////////


           if(res.result.type==='Front'){



                    if (that.data.frontCheck==='1'){

                      console.log("the front side is already checked, please turn around to scan the backside", that.data.frontCheck)
                    }

                     var pass = that.IdentityCodeValid(res.result.id)





          /////////////////////////////////////////

          // var pass = that.IdentityCodeValid(res.result.id)
          getApp().globalData.member_id =res.result.id
          console.log("ID validation", pass)
          // console.log("ID validation2", that.IdentityCodeValid('830000199201300022'))


                          if (pass===true) {

                            var result = JSON.stringify(res)

                            /////////////////////   I added this for managing the cloud file system ////////////
                            console.log("front side or rare: ", res.result['type'])

                            // that.uploadImg(type, imgUrl);
                            // that.delFile(imgUrl);


                            that.setData({
                              frontCheck:"1"
                            })


                            ////////////////////////////////////////////////////////////////////////////////////

                            wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                              // url:'../test/test?info=test',
                              url: '../IDcheck/IDcheck?result=' + result,
                            })
                          } else { // if id number is not passed the validation

                            wx.showModal({
                              title: '身分证号有误',
                              content: '请重新拍照',
                              success (res) {
                                if (res.confirm) {
                                  that.photo("shenfenzheng")
                                  console.log('用户点击确定,重新拍照')

                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })


                          }



           }else{ // if type is back side
             console.log("jump to the next scan",res);
             console.log("jump to the next scan",res.result.type);
             // console.log("jump to authority",res.result.authority);
             console.log("jump to validDate",res.result.validDate);
             // console.log("jump to the next scan",res.result.cardProperty);
             console.log("jump to the next scan",res.result.errCode);

             //
             // var textOCR = that.printedText("textocr",imgUrl)
             //
             // console.log("OCR @ text", textOCR);
             // // console.log("raw OCR @ text", that.printedText("textocr",imgUrl));



             var expiration = that.verifyExpiration(res.result.validDate)
             // if (that.verifyExpiration(res.result.validDate)===true){
             if (expiration===true){
               console.log("final not expired",expiration)



             }else{



               console.log("This ID card is expired, please update!",expiration)


              // if the ID card expired by first scan then rescan with OCR text to verify again.

               var textOCR = that.printedText("textocr",imgUrl)

               console.log("OCR @ text", textOCR);
               // console.log("raw OCR @ text", that.printedText("textocr",imgUrl));


               wx.redirectTo({
                 url: '../test/expiredPage'
               })
             }


           }

        },
        fail(res) {
          console.log("识别失败123!!!", res, " TYPE=", type, " IMAGE URL=", imgUrl)
        }
      })
    },

  */

    IdentityCodeValid(code) {

      // var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
      var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",83:"台湾",81:"香港",82:"澳门",91:"国外 "};

      var tip = "";

      var pass= true;
      if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){

        tip = "身份证号格式错误";

        pass = false;

      }
      else if(!city[code.substr(0,2)]){

        tip = "地址编码错误";

        pass = false;

      }

      else{

        //18位身份证需要验证最后一位校验位

        if(code.length == 18){

          code = code.split('');

          //∑(ai×Wi)(mod 11)

          //加权因子

          var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];

          //校验位

          var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];

          var sum = 0;

          var ai = 0;

          var wi = 0;

          for (var i = 0; i < 17; i++)

          {

            ai = code[i];

            wi = factor[i];

            sum += ai * wi;

          }

          var last = parity[sum % 11];

          if(parity[sum % 11] != code[17]){

            tip = "校验位错误";

            pass =false;

          }

        }

      }

      // if(!pass) alert(tip);
      if(!pass) console.log(tip);

      return pass;

    },

  verifyExpiration(d){
      // var expired =  d.substr(-8)
    var inputDate = d[0]+d[1]+d[2]

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+mm +dd;
    // var today ='20440701'
    console.log("today vs expired:",today,inputDate )

    if (parseInt(today) > parseInt(inputDate)){
    //   if (1 > 0){
      console.log("expired:",today,d )
      return false;
    }else{
      console.log("not expire:",today,d )

      return true;
    }
},


  printedText(type,url){

    var that = this

    const scanBack = new Promise(function (resolve,reject) {
      // var exdate = that.printedText(type,imgUrl)
      console.log("START PROMISE!!!");


      // var that = this


      console.log("cloud callFunction", url)


      wx.cloud.callFunction({
        name: "ocr",
        data: {
          type: 'textocr',
          // imgUrl: imgUrl
          // imgUrl: encodeURI(url)
          imgUrl: url
        },
        success(res) {

          // console.log("cloud init",res)
          // console.log("OCR recognised ",res.result.items[5].text)
          //
          // console.log("string index of 有效期限", res.result.items.indexOf("有效期限"))
          console.log("length of 有效期限length", res.result.items.length)
          console.log("text of item", res.result.items.text)
          console.log("all items", res.result.items)
          //console.log("有效期限", res.result.items.find(element=>text="有效期限"))
          var targeted = null
          var ilength = res.result.items.length
          for (var i = 0; i < ilength; i++) {

            var idx = res.result.items[i].text.indexOf("有效期限")

            /////////////////////////////
            var item_i = res.result.items[i].text
            // var re = /^\d{4}\.\d{2}\.\d{2}/i;
            var re = /\d{4}\.\d{2}\.\d{2}/;

            // var found = item_i.match(re);
            // console.log("get the matched: ",found);
            /////////////////////////////////
            console.log("RE.test: ",re.test(item_i),item_i);

            // if (idx == 0) {
            //   targeted = i
            // }
            if (re.test(item_i)) {
             targeted = i
            }
            // console.log("for loop string index of 有效期限", idx, targeted,i )
          }
          console.log("final for loop string index of 有效期限 target",  targeted,"current i", i,isNaN(targeted),typeof targeted)
          if(targeted == null){
            console.log("targeted NaN",  targeted,"NaN(target)",isNaN(targeted))

            reject("00000000")
            return;

          }
          // var expired_date = res.result.items[targeted + 1].text
          var expired_date = res.result.items[targeted].text

          console.log("returned result", expired_date)

          var extraDate = that.extractString(expired_date)

          console.log("extra date", extraDate)
          if (that.verifyExpiration(extraDate)) {
            console.log("the date is valid, allow!", expired_date)
            wx.setStorageSync("expiration", extraDate[0] + "." + extraDate[1] + "." + extraDate[2]);

            // return true;
            console.log("resolve",extraDate[0] + "." + extraDate[1] + "." + extraDate[2])
             resolve(extraDate[0] + "." + extraDate[1] + "." + extraDate[2])

          } else {
            console.log("the date is expired, don't allow!", expired_date)

            // return false

            var finalExtraDate = extraDate[0] + "." + extraDate[1] + "." + extraDate[2]
            console.log("reject",finalExtraDate)

            reject(finalExtraDate)

          }


        },

        fail(res) {
          console.log("识别失败123!!!", res, " TYPE=", type, " IMAGE URL=", url)
          return res.result.errmsg;
        }
      })

      /*if(that.printedText(type,imgUrl)){
        console.log("resolve")
        resolve()

      }else{
        console.log("reject")
        reject()
      }*/

    // })


    }) // end of promise

    return scanBack;
  },

extraValidDate(e){
  console.log("extractString input: ", e)
  var sep = e.split("-")
  console.log("separated , the 2nd term ", sep[1])
  // var date = sep[1].split(".")
  // console.log("extracting expiration date", date)
  // var yyyy= date[0]
  // var mm = date[1]
  // var dd = date[2].substr(0,2)
  var yyyy= sep[1].substring(0,4)
  var mm = sep[1].substring(4,6)
  var dd = sep[1].substring(6,8)

  console.log("after extract the date", yyyy, mm, dd)
  return [yyyy,mm,dd]

},


  extractString(e){
      //
      // var expirationDate = "2020.10.20-2022.11.24 0"
      // var sep = expirationDate.split("-")
    console.log("extractString input: ", e)
    if(e.indexOf("-")>0) {
      var sep = e.split("-")
      console.log("separation of - ", sep[1])
    }else {
            if(e.indexOf(" ")>0)
            {
              var sep = e.split(" ")
              console.log("separation of space ", sep[1])
            }
          }
        var date = sep[1].split(".")


    console.log("extracting expiration date", date)
    var yyyy= date[0]
    var mm = date[1]
    var dd = date[2].substr(0,2)

    console.log("after extract the date", yyyy, mm, dd)
    return [yyyy,mm,dd]



  },

  setLocalStorage(result){
    console.log("result.id", result.id,"substring:", result.id.substring(0,2))

    if(result.id.substring(0,2)==='83'){
      // var member_nationality = '台'
      // wx.setStorageSync("member_nationality", '台');
      console.log("台:", result.id)
      var nationality = '台'
      //   console.log("台:", wx.getStorageSync("member_id"))

    }else{
      var nationality = result.nationality

    }

    wx.setStorageSync("member_address", result.addr)
    wx.setStorageSync("member_id", result.id)
    wx.setStorageSync("member_name", result.name)
    wx.setStorageSync("member_gender", result.gender)
    wx.setStorageSync("member_nationality", nationality)
    wx.setStorageSync("member_birthday", result.birth)
  },

  upload2backend(file, type){
    var that = this
    var openid = wx.getStorageSync("openid");
    var member_id = wx.getStorageSync("member_id");
    console.log("upload parameters:", file ,type);


    wx.downloadFile({
      url: file,
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        // wx.openDocument({
        //   filePath: Path,
        //   Type: 'pdf',
        //   showMenu: true,
        //   success: function (res) {
        //     console.log('打开文档成功')
        //   }
        // })

        wx.uploadFile({
          // url: "https://www.top-talent.com.cn/linghuo/upload_IDcard.php?openid="+openid+"&member_id="+member_id+"&type="+type,
          url: getApp().globalData.serverURL+"/upload_IDcard.php?openid="+openid+"&member_id="+member_id+"&type="+type,
          filePath: Path,
          name: "file",
          header: { "Content-Type": "multipart/form-data" },
          //成功
          success: function success(res) {
            console.log(res);
            if (res.statusCode != 200) {
              // log it in the back end
              console.log("network problem status ! = 200 :", res);

              return;
            }
            var data = res.data;
            console.log("successfully uploaded:", data);
            that.delFile(file)

          },
          //成功
          fail: function fail(e) {
            // log it in the back end
            console.log("failed to upload", e);
          }
        });

      },
      fail:function (res){
        console.log("Download file failed ",res)
      }
    })

/*
    wx.uploadFile({
      url: "https://www.top-talent.com.cn/linghuo/upload_IDcard.php?openid="+openid+"&member_id="+member_id+"&type="+type,
      filePath: file,
      name: "file",
      header: { "Content-Type": "multipart/form-data" },
      //成功
      success: function success(res) {
        console.log(res);
        if (res.statusCode != 200) {
        // log it in the back end
          console.log("network problem status ! = 200 :", res);

          return;
        }
        var data = res.data;
        console.log("successfully uploaded:", data);
        that.delFile(file)

      },
      //成功
      fail: function fail(e) {
        // log it in the back end
        console.log("failed to upload", e);
      }
    });

    */



  }


})

