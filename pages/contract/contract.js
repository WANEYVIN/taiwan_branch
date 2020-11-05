// miniprogram/pages/contract/contract.js
Page({



  /**
   * 页面的初始数据
   */

  // data: {
  //   imgUrl:'https://www.top-talent.com.cn/linghuo/contract/templates/freelancer/contract_template.jpg',  //图片路径
  //   contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/templates/freelancer/full_contract.pdf'
  //
  //
  // },
  data: {
    imgUrl:'',  //图片路径
    contractDoc: ''


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.setData({
      // this.setData({
      member_id: options.member_id,
      member_name: options.member_name,
      task_id: options.task_id,
      loading:1


    });

    if(that.data.task_id === '0'){

      that.setData({
          imgUrl:'https://www.top-talent.com.cn/linghuo/contract/templates/freelancer/contract_template.jpg',  //图片路径
          contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/templates/freelancer/full_contract.pdf'
          })
    }else{
      that.setData({
      imgUrl:'https://www.top-talent.com.cn/linghuo/contract/templates/'+that.data.task_id+'/contract_template.jpg',  //图片路径
      contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/templates/'+that.data.task_id+'/contract_template.pdf'
      })
      }


  console.log("task id = ",that.data.task_id)
// console.error("cannot find :",getCurrentPages())
  },
  imageOnLoad(ev) {
    this.setData({
    loading:0
    })
    console.log(`图片加载成功，width: ${ev.detail.width}; height: ${ev.detail.height}`)
  },
  imageOnLoadError() {
    console.log('图片加载失败')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // ctx = wx.createContext();
  // ctx.drawImage(this.data.img, 0, 0, 686, 686);
  // ctx.stroke();
  // wx.drawCanvas({
  //   canvasId: "myCanvas",
  //   reserve: true,
  //   actions: ctx.getActions() // 获取绘图动作数组
  // });
  //
  //
  // wx.canvasToTempFilePath({
  //   width: 686,
  //   height: 686,
  //   canvasId: "myCanvas",
  //   success: function success(res) {
  //     var tempFilePath = res.tempFilePath;
  //     console.log(tempFilePath);
  //     //把图片保存到相册
  //     wx.saveImageToPhotosAlbum({
  //       filePath: tempFilePath
  //     });
  //     //把图片保存到相册
  //     //进行文件的拷贝
  //     //上传
  //     wx.uploadFile({
  //       url: "http://192.168.0.101:8080/Teacher/copyfile.action",
  //       filePath: tempFilePath,
  //       name: "file",
  //       header: { "Content-Type": "multipart/form-data" },
  //       //成功
  //       success: function success(res) {
  //         console.log(res);
  //         if (res.statusCode != 200) {
  //           wx.showModal({
  //             title: "提示",
  //             content: "上传失败",
  //             showCancel: false
  //           });
  //           return;
  //         }
  //         var data = res.data;
  //         console.log("田江南你好刷币:" + data);
  //       },
  //       //成功
  //       fail: function fail(e) {
  //         console.log(e);
  //         wx.showModal({
  //           title: "提示",
  //           content: "上传失败",
  //           showCancel: false
  //         });
  //       }
  //     });
  //     //进行文件的拷贝
  //   }
  // });


  clickImg: function(e){
    var imgUrl = this.data.imgUrl;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
// 下载文件
  // 使用这个api获取到临时路径
  downloadFile(e) {
    // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
    var src = this.data.contractDoc; // 这个定义了一个属性src来存地址

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
            console.log('打开文档成功')
          }
        })
      },
      fail:function (res){
        console.log(res)
      }
    })

  },

  /**是否同意协议 */
  boxcheck: function (e) {
    var flag = e.detail.value[0];
    if (flag === undefined) {
      // this.data.next_class = '';
      flag = false;
    } else {
      // this.data.next_class = "text_blue";
      flag = true;

    }
    console.log("flag = ",flag)
    console.log("contract page memberID = ",this.data.member_id)
    console.log("contract page member Name = ",this.data.member_name)
    // console.log("contract page memberID = ",data.member_id)


    if (flag===true){
    wx.navigateTo({
      url:'../draw1/draw1?member_id='+this.data.member_id+'&member_name='+this.data.member_name+'&task_id='+this.data.task_id
    })
    console.log("flag draw= ",flag)

  }

    }

})
