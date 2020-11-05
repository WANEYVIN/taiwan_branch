
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()



// 云函数入口函数
exports.main = async (event, context) => {

  let {
    type,
    imgUrl
  } = event
  console.log("识别身份证??", " TYPE=", type, " IMAGE URL=", imgUrl)
// 我自己加的計算使用量


  switch (type) {
    case 'shenfenzheng':
      {
        // 识别身份证
        // console.log("识别身份证", res, " TYPE=", type, " IMAGE URL=", imgUrl)
        return shenfenzheng(imgUrl)
      }
    case 'yinhangka':
      {
        // 识别银行卡
        return yinhangka(imgUrl)
      }
    case 'xingshizheng':
      {
        // 识别行驶证////// I change this for text ocr
        return xingshizheng(imgUrl)
      }
    case 'textocr':
      {
        // textocr
        return textocr(imgUrl)
      }
    default:
      {
        return
      }
  }
}

//识别身份证
async function shenfenzheng(imgUrl) {
  try {
    const result = await cloud.openapi.ocr.idcard({
      type: 'photo',
      imgUrl: imgUrl
    })
    return result
    console.log("识别成功789!!!", res)

  } catch (err) {
    console.log(err)
    return err
  }
}
//识别银行卡
async function yinhangka(imgUrl) {
  try {
    const result = await cloud.openapi.ocr.bankcard({
      type: 'photo',
      imgUrl: imgUrl
    })
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
//识别行驶证
async function xingshizheng(imgUrl) {
  try {
    // const result = await cloud.openapi.ocr.vehicleLicense({
    const result = await cloud.openapi.ocr.printedText({

      type: 'photo',
      // imgUrl: imgUrl
      imgUrl: imgUrl
    })
    return result
    console.log("识别??", " TYPE=", type, " IMAGE URL=", imgUrl)

  } catch (err) {
    console.log(err)
    return err
  }
}


/// text
async function textocr(imgUrl) {
  try {
    // const result = await cloud.openapi.ocr.vehicleLicense({
    const result = await cloud.openapi.ocr.printedText({

      type: 'photo',
      // imgUrl: imgUrl
      imgUrl: imgUrl
    })
    return result
    console.log("识别texr ocr??", " TYPE=", type, " IMAGE URL=", imgUrl)

  } catch (err) {
    console.log(err)
    return err
  }
}
