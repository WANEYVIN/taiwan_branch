// pages/draw.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isClear: false,
        // penColor: 'red',
        penColor: 'blue',
        lineWidth: 5,
    },

    /**
     * 触摸开始
     */
    touchStart: function (e) {
        //得到触摸点的坐标
        this.startX = e.changedTouches[0].x
        this.startY = e.changedTouches[0].y
        this.context = wx.createCanvasContext("myCanvas", this)

        if (this.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
            this.context.setStrokeStyle('#ffffff') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果
            this.context.setLineCap('round') //设置线条端点的样式
            this.context.setLineJoin('round') //设置两线相交处的样式
            this.context.setLineWidth(20) //设置线条宽度
            this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
            this.context.beginPath() //开始一个路径
            this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形
            this.context.fill();  //对当前路径进行填充
            this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
        } else {
            // 设置画笔颜色
            this.context.setStrokeStyle(this.data.penColor);
            // 设置线条宽度
            this.context.setLineWidth(this.data.lineWidth);
            this.context.setLineCap('round') // 让线条圆润
            this.context.beginPath()
        }
    },

    /**
     * 手指触摸后移动
     */
    touchMove: function (e) {

        var startX1 = e.changedTouches[0].x
        var startY1 = e.changedTouches[0].y

        if (this.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
            this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
            this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
            this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
            this.context.stroke();  //对当前路径进行描边
            this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

            this.startX = startX1;
            this.startY = startY1;

        } else {
            this.context.moveTo(this.startX, this.startY)
            this.context.lineTo(startX1, startY1)
            this.context.stroke()

            this.startX = startX1;
            this.startY = startY1;

        }

        //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
        wx.drawCanvas({
            canvasId: 'myCanvas',
            reserve: true,
            actions: this.context.getActions() // 获取绘图动作数组
        })

    },

    /**
     * 触摸结束
     */
    touchEnd: function (e) {
        this.touchMove(e);
        var app = getApp();

        wx.canvasToTempFilePath({
                  width: 686,
                  height: 686,
                  canvasId: "myCanvas",
                  success: function success(res) {
                    var tempFilePath = res.tempFilePath;
                    console.log(tempFilePath);
                    //把图片保存到相册
                    // wx.saveImageToPhotosAlbum({
                    //   filePath: tempFilePath
                    // });
                    //把图片保存到相册
                    //进行文件的拷贝
                    //上传


                    wx.uploadFile({
                      // url: "http://192.168.0.101:8080/Teacher/copyfile.action",
                      url: "https://www.top-talent.com.cn/linghuo/uploaded_doc.php?id="+app.globalData.openid+"&memberID="+app.globalData.member_id,
                      filePath: tempFilePath,
                      name: "file",
                      header: { "Content-Type": "multipart/form-data" },
                      //成功
                      success: function success(res) {
                        console.log(res);
                        if (res.statusCode != 200) {
                          wx.showModal({
                            title: "提示",
                            content: "上传失败",
                            showCancel: false
                          });
                          return;
                        }
                        var data = res.data;
                        console.log("田江南你好刷币:" + data);
                      },
                      //成功
                      fail: function fail(e) {
                        console.log(e);
                        wx.showModal({
                          title: "提示",
                          content: "上传失败",
                          showCancel: false
                        });
                      }
                    });


                    //进行文件的拷贝
                  }
                });
    },

    /**
     * 画笔选择
     */
    penSelect: function (options) {
        var lineWidth = options.target.dataset.param;
        console.log("lineWidth:" + lineWidth);
        this.setData ({
            isClear: false,
            lineWidth: lineWidth,
        });
    },

    /**
     * 颜色选择
     */
    colorSelect: function (options) {
        var penColor = options.target.dataset.param;
        console.log("penColor:" + penColor);
        this.setData({
            isClear: false,
            penColor: penColor,
        });
    },

    /**
     * 清除涂鸦信息
     */
    clearCanvas: function (options) {
        console.log("clearCanvas");
        this.setData({
            isClear: true
        });
    },

    // save2tmp: function (options){
    //     wx.canvasToTempFilePath({
    //         x: 100,
    //         y: 200,
    //         width: 50,
    //         height: 50,
    //         destWidth: 100,
    //         destHeight: 100,
    //         canvasId: 'myCanvas',
    //         success(res) {
    //             console.log(res.tempFilePath)
    //         }
    //     })
    // }

    // saveCanvas: function(options){
    //     ctx = wx.createContext();
    //     ctx.drawImage(this.data.img, 0, 0, 686, 686);
    //     ctx.stroke();
    //     wx.drawCanvas({
    //       canvasId: "myCanvas",
    //       reserve: true,
    //       actions: ctx.getActions() // 获取绘图动作数组
    //     });




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

    // }
})