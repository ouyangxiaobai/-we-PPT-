// created by gpake
(function() {

var config = {
    qiniuRegion: '',
    qiniuImageURLPrefix: '',
    qiniuUploadToken: '',
    qiniuUploadTokenURL: '',
    qiniuUploadTokenFunction: null
}

module.exports = {
    init: init,
    upload: upload,
}

// 在整个程序生命周期中，只需要 init 一次即可
// 如果需要变更参数，再调用 init 即可
function init(options) {
    config = {
        qiniuRegion: '',
        qiniuImageURLPrefix: '',
        qiniuUploadToken: '',
        qiniuUploadTokenURL: '',
        qiniuUploadTokenFunction: null
    };
    updateConfigWithOptions(options);
}

function updateConfigWithOptions(options) {
    if (options.region) {
        config.qiniuRegion = options.region;
    } else {
        console.error('qiniu uploader need your bucket region');
    }
    if (options.uptoken) {
        config.qiniuUploadToken = options.uptoken;
    } else if (options.uptokenURL) {
        config.qiniuUploadTokenURL = options.uptokenURL;
    } else if(options.uptokenFunc) {
        config.qiniuUploadTokenFunction = options.uptokenFunc;
    }
    if (options.domain) {
        config.qiniuImageURLPrefix = options.domain;
    }
}

function upload(filePath, success, fail, openid, options) {
    if (null == filePath) {
        console.error('qiniu uploader need filePath to upload');
        return;
    }
    if (options) {
        init(options);
    }
    doUpload(filePath, success, fail, openid, options);
    //token不在在这儿产生
    // if (config.qiniuUploadToken) {
    //     doUpload(filePath, success, fail, options);
    // } else if (config.qiniuUploadTokenURL) {
    //     getQiniuToken(function() {
    //         doUpload(filePath, success, fail, options);
    //     });
    // } else if (config.qiniuUploadTokenFunction) {
    //     config.qiniuUploadToken = config.qiniuUploadTokenFunction();
    // } else {
    //     console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
    //     return;
    // }
}

function doUpload(filePath, success, fail, openid, options) {
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    //产生key
    var nowDate = new Date();
    var fileName = nowDate.getTime()+'.png';
    if(openid){
        fileName = openid+nowDate.getTime()+'.png'; 
    }
    //产生token
    wx.request({
        url: config.qiniuUploadTokenURL+'?key='+fileName,
        success: function (res) {
            var token = res.data.uptoken;
            config.qiniuUploadToken = token;
            //上传动作
            var formData = {
                'token': token,
                'key': fileName
            };
            console.log('url:', url, 'filePath:', filePath, 'formData:', formData)
            wx.uploadFile({
                url: url,
                filePath: filePath,
                name: 'file',
                formData: formData,
                success: function (res) {
                    var dataString = res.data
                    var dataObject = JSON.parse(dataString);
                    //do something
                    var imageUrl = config.qiniuImageURLPrefix + dataObject.key;
                    dataObject.imageURL = imageUrl;
                    console.log(dataObject);
                    if (success) {
                        success(dataObject);
                    }
                },
                fail: function (error) {
                    console.log(error);
                    if (fail) {
                        fail(error);
                    }
                }
            })
        },
        fail: function (error) {
            console.log(error);
        }
    })
 
    
}

function getQiniuToken(callback) {
  wx.request({
    url: config.qiniuUploadTokenURL,
    success: function (res) {
      var token = res.data.uptoken;
      config.qiniuUploadToken = token;
      if (callback) {
          callback();
      }
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

function uploadURLFromRegionCode(code) {
    var uploadURL = null;
    switch(code) {
        case 'ECN': uploadURL = 'https://up.qbox.me'; break;
        case 'NCN': uploadURL = 'https://up-z1.qbox.me'; break;
        case 'SCN': uploadURL = 'https://up-z2.qbox.me'; break;
        case 'NA': uploadURL = 'https://up-na0.qbox.me'; break;
        default: console.error('please make the region is with one of [ECN, SCN, NCN, NA]');
    }
    return uploadURL;
}

})();