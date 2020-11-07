// this page is for validate ID card with camera OCR recognition ////////
Page({

  data:{
    loading: '0',
    frontCheck:'',
    backCheck:''
  },

  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    this.shenfenzheng();
  },


    /*
   * IDcard OCR
   */
    shenfenzheng(){

      this.photo("shenfenzheng")
    },

//拍照或者从相册选择要识别的照片
    photo(type) {

      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        // sourceType: ['album', 'camera'],
        sourceType: ['camera','album'],
        // sourceType: ['camera'],

        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let imgUrl = res.tempFilePaths[0];
          that.uploadImg(type, imgUrl)
          that.setData({
            loading: "1"
          })
        },
        fail(res){
        that.setData({
          loading: "0"
        })
          that.photo(type)
        }
      })
    },



    // 上传图片到云存储
    uploadImg(type, imgUrl) {
      var current_time = new Date().getTime();
      var openid = wx.getStorageSync("openid");
      let that = this

      this.setData({
        loading: "1"
      })


      wx.cloud.uploadFile({
        // cloudPath: 'ocr/' + type + '.png', // I added for test
        cloudPath: 'ocr/' + type + current_time +'.png',
        // cloudPath: 'ocr/'+ type +'-'+ openid +'.png',

        filePath: imgUrl, // 文件路径
        success: res => {
          // console.log("上传成功", res.fileID, "timestamp:", current_time)
          console.log("上传成功123", res.fileID, "cloudPath:")

          that.getImgUrl(type, res.fileID)
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
          console.log("获取图片url成功", imgUrl)
          // I addedd it for test
          that.shibie(type, imgUrl)
          // that.shenfenzheng(imgUrl)
          // that.ocr(imgUrl)
          // that.printedText("textocr",imgUrl)
          // console.log("printedText", imgUrl)

        },
        fail: err => {
          console.log("获取图片url失败", err)
        }
      })
    },
//////  I added this for management in the folder  ///////
  delFile(imgUrl) {
    var that = this;
    wx.cloud.deleteFile({
      fileList: [imgUrl],
      // fileList: ["cloud://test-1adh8.7465-test-1adh8/images/1"],
      //cloud://testbed-freestyle.7465-testbed-freestyle-1300943434/ocr/shenfenzheng.png
      // fileList: ["cloud://testbed-freestyle.7465-testbed-freestyle-1300943434/ocr/shenfenzheng.png"],
      success(res) {
        console.log("删除文件：", res, "file:", res.fileList[0])

      }
    })

  },

  //////////////




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
      var expired =  d.substr(-8)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+mm +dd;
    // var today ='20440701'
    console.log("today vs expired:",today,expired )

    if (parseInt(today) > parseInt(expired)){
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


    console.log("cloud callFunction",url)

    wx.cloud.callFunction({
      name: "ocr",
      data: {
        type: 'textocr',
        // imgUrl: imgUrl
        // imgUrl: encodeURI(url)
        imgUrl: url
      },
      success(res) {

        console.log("cloud init",res)
        console.log("OCR recognised ",res.result.items[5].text)
        var expired_date = res.result.items[5].text
        return expired_date;

      },

        fail(res) {
      console.log("识别失败123!!!", res, " TYPE=", type, " IMAGE URL=", url)
          return res.result.errmsg;
    }
  })

  },

  backSide(){

    let that = this

    ////////  step 1 choose image and upload
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      // sourceType: ['album', 'camera'],
      sourceType: ['camera','album'],
      // sourceType: ['camera'],

      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let imgUrl = res.tempFilePaths[0];
        that.uploadImg(type, imgUrl)

      }



    })




  }


})

