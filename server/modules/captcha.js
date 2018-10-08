var svgCaptcha = require('svg-captcha');

exports.getCode = (req,res)=>{
    var codeConfig = {
        size:4,//验证码长度
        ignoreChars:'0o1il',//验证码字符串中排除0o1il
        noise:2,//干扰线条数
        height:35
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase();//存session用于验证接口获取文字码
    return captcha.data;
}