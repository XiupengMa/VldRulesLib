//excepted results
var results = {};

//根据VldRulesLib.CODE_TABLE制造预期的结果,只能制造简单结果，复合结果需要手动构造

function generateResults() {
    for (code in VldRulesLib.CODE_TABLE) {
        results[code] = {
            result: code.charAt(1) == "2" ? true : false,
            code: code,
            msg: VldRulesLib.CODE_TABLE[code] + "," + (code.charAt(1) == "2" ? "passed" : "failed")
        }
    }
}
generateResults();

//对deepEqual的封装

function check(data, rule, resultCode, revisedVal) {
    var result = $.extend({}, resultCode, {
        revisedVal: revisedVal
    });
    deepEqual(VldRulesLib.validate(data, rule, "passed", "failed"), result);
}

//ok
module("ok");
test("正确", function() {
    var data = true;
    check(data, "ok", results.E200, data);
});
test("错误", function() {
    var data = false;
    check(data, "ok", results.E420, data);
});
test("数据类型错误", function() {
    var data = "true";
    check(data, "ok", results.E419, data);
});
test("空值", function() {
    var data = "";
    check(data, "ok", results.E401, data);
});

//required
module("required");
test("不为空", function() {
    var data = "123";
    check(data, "required", results.E200, data);
});
test("为空", function() {
    var data = "";
    check(data, "required", results.E401, data);
});

//valid
module("valid");
test("undefined", function() {
    var data;
    check(data, "valid", results.E421, true);
});
test("null", function() {
    var data = null;
    check(data, "valid", results.E421, true);
});
test("false", function() {
    var data = false;
    check(data, "valid", results.E421, true);
});
test("空字符串", function() {
    var data = "";
    check(data, "valid", results.E421, true);
});
test("空对象", function() {
    var data = {};
    check(data, "valid", results.E200, data);
});

//min
module("min");
test("min[3]", function() {
    var data = "1234";
    check(data, "min[3]", results.E200, data);
    data = "123";
    check(data, "min[3]", results.E200, data);
    data = "12";
    check(data, "min[3]", results.E403, data);
    data = "";
    check(data, "min[3]", results.E401, data);
});
test("min[0]", function() {
    var data = "1234";
    check(data, "min[0]", results.E200, data);
    data = "";
    check(data, "min[0]", results.E200, data);
});
test("min[-3]", function() {
    var data = "1234";
    check(data, "min[-3]", results.E200, data);
    data = "";
    check(data, "min[-3]", results.E200, data);
});

//max
module("max");
test("max[3]", function() {
    var data = "1234";
    check(data, "max[3]", results.E402, "123");
    data = "123";
    check(data, "max[3]", results.E200, data);
    data = "12";
    check(data, "max[3]", results.E200, data);
    data = "";
    check(data, "max[3]", results.E201, data);
});
test("max[0]", function() {
    var data = "1234";
    check(data, "max[0]", results.E402, "");
    data = "";
    check(data, "max[0]", results.E201, "");
});
test("max[-3]", function() {
    var data = "1234";
    check(data, "max[-3]", results.E402, "");
    data = "";
    check(data, "max[-3]", results.E201, "");
});

//email
module("email");
test("合法", function() {
    var data = "abc_123_aa@abc.com";
    check(data, "email", results.E200, data);
});
test("非法", function() {
    var data = "123@123"
    check(data, "email", results.E411, data);
});

//phone
module("phone");
test("7位", function() {
    var data = "1234567";
    check(data, "phone", results.E200, data);
});
test("8位", function() {
    var data = "12345678";
    check(data, "phone", results.E200, data);
});
test("带字母", function() {
    var data = "123458A";
    check(data, "phone", results.E412, "123458");
});

//mobile
module("mobile");
test("合法", function() {
    var data = "13345678901";
    check(data, "mobile", results.E200, data);
});
test("非1开头", function() {
    var data = "23345678901";
    check(data, "mobile", results.E413, data);
});
test("带字母", function() {
    var data = "1A345678901";
    check(data, "mobile", results.E413, "1345678901");
});

//url
module("url");
test("合法域名", function() {
    var data = "http://www.baidu.com";
    check(data, "url", results.E200, data);
});
test("无http", function() {
    var data = "www.baidu.com";
    check(data, "url", results.E200, data);
});
test("二级域名", function() {
    var data = "http://123.www.baidu.com";
    check(data, "url", results.E200, data);
});
test("目录", function() {
    var data = "http://123.www.baidu.com/abc";
    check(data, "url", results.E200, data);
});
test("文件", function() {
    var data = "http://123.www.baidu.com/abc.html";
    check(data, "url", results.E200, data);
});
test("端口", function() {
    var data = "http://www.baidu.com:8080";
    check(data, "url", results.E200, data);
});
test("IP", function() {
    var data = "http://127.0.0.1:8080";
    check(data, "url", results.E200, data);
});
test("非法", function() {
    var data = "http://abc";
    check(data, "url", results.E414, data);
});

//alphanumeric
module("alphanumeric");
test("纯字母", function() {
    var data = "abcd";
    check(data, "alphanumeric", results.E200, data);
});
test("纯数字", function() {
    var data = "1234";
    check(data, "alphanumeric", results.E200, data);
});
test("混合", function() {
    var data = "abvc123acd";
    check(data, "alphanumeric", results.E200, data);
});
test("空格", function() {
    var data = "dfa34 dfa";
    check(data, "alphanumeric", results.E406, "dfa34dfa");
});

//alphanumeric_underline
module("alphanumeric_underline");
test("纯字母", function() {
    var data = "abcd";
    check(data, "alphanumeric_underline", results.E200, data);
});
test("纯数字", function() {
    var data = "1234";
    check(data, "alphanumeric_underline", results.E200, data);
});
test("混合", function() {
    var data = "abvc123_acd";
    check(data, "alphanumeric_underline", results.E200, data);
});
test("空格", function() {
    var data = "dfa34 d_fa";
    check(data, "alphanumeric_underline", results.E407, "dfa34d_fa");
});

//number
module("number");
test("数字", function() {
    var data = "1234321";
    check(data, "number", results.E200, data);
});
test("负数", function() {
    var data = "-1234321";
    check(data, "number", results.E200, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, "number", results.E200, data);
});
test("多个负号",function() {
    var data = "-123--45.-1-2-3-%$#ADFdf";
    check(data, "number", results.E404, "-12345.123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',./\"asdfghjkl ";
    check(data, "number", results.E404, ".");
});

//int
module("int");
test("数字", function() {
    var data = "1234321";
    check(data, "int", results.E200, data);
});
test("负数", function() {
    var data = "-1234321";
    check(data, "int", results.E200, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, "int", results.E425, "1234321111231");
});
test("多个负号",function() {
    var data = "-123--45-1-2-3-%$#ADFdf";
    check(data, "int", results.E425, "-12345123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',1/\"asdfghjkl ";
    check(data, "int", results.E425, "1");
});

//float
module("float");
test("整数", function() {
    var data = "1234321";
    check(data, "float", results.E426, data);
});
test("负数", function() {
    var data = "-123.4321";
    check(data, "float", results.E200, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, "float", results.E200, data);
});
test("多个负号",function() {
    var data = "-123--45-1-2-3-%$#ADFdf";
    check(data, "float", results.E426, "-12345123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',1/\"asdfghjkl ";
    check(data, "float", results.E426, "1");
});

//pwdL1
module("pwdL1");
test("满足", function() {
    var data = "asdf123adf1";
    check(data, "pwdL1", results.E200, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, "pwdL1", results.E427, data);
});
test("无字母", function() {
    var data = "1233211234567";
    check(data, "pwdL1", results.E427, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, "pwdL1", results.E200, data);
});

//pwdL2
module("pwdL2");
test("满足", function() {
    var data = "asdf123adf1ASDF";
    check(data, "pwdL2", results.E200, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, "pwdL2", results.E428, data);
});
test("无小写字母", function() {
    var data = "1233211234567ASDF";
    check(data, "pwdL2", results.E428, data);
});
test("无大写字母", function() {
    var data = "123321asdf1234567";
    check(data, "pwdL2", results.E428, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, "pwdL2", results.E200, data);
});

//pwdL3
module("pwdL3");
test("满足", function() {
    var data = "asdf123adf1ASDF!@#';/.,";
    check(data, "pwdL3", results.E200, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, "pwdL3", results.E429, data);
});
test("无小写字母", function() {
    var data = "1233211234567ASDF";
    check(data, "pwdL3", results.E429, data);
});
test("无大写字母", function() {
    var data = "123321asdf1234567";
    check(data, "pwdL3", results.E429, data);
});
test("无符号", function() {
    var data = "123321asdf1234567ASDF";
    check(data, "pwdL3", results.E429, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, "pwdL3", results.E200, data);
});

//singleSpace
module("singleSpace");
test("无空格", function() {
    var data = "asdf123adf1ASDF!@#';/.,";
    check(data, "singleSpace", results.E200, data);
});
test("单一空格", function() {
    var data = "asdf12 3a df1 ASD F!@#' ; / .,";
    check(data, "singleSpace", results.E200, data);
});
test("连续空格", function() {
    var data = "asdf12  3a     df1   ASD F!@#'     ;    /                .,";
    check(data, "singleSpace", results.E430, "asdf12 3a df1 ASD F!@#' ; / .,");
});
test("全部空格", function() {
    var data = "                                   ";
    check(data, "singleSpace", results.E430, " ");
});

//alpha
module("alpha");
test("字母", function() {
    var data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    check(data, "alpha", results.E200, data);
});
test("符号数字", function() {
    var data = "+_)(*&^%$#@!{}:<>?[];',./1234567890\\|\"~` ";
    check(data, "alpha", results.E405, "");
});

//alpha_underline
module("alpha_underline");
test("字母下划线", function() {
    var data = "abcdefghijk__lmnopqrstuvw____xyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    check(data, "alpha_underline", results.E200, data);
});
test("符号数字", function() {
    var data = "+_)(*&^%$#@!{}:<>?[];',./1234567890\\|\"~` ";
    check(data, "alpha_underline", results.E407, "_");
});

//lt
module("lt");
test("小于", function() {
    var data = "99";
    check(data, "lt[100]", results.E200, data);
});
test("等于", function() {
    var data = "100";
    check(data, "lt[100]", results.E408, data);
});
test("大于", function() {
    var data = "101";
    check(data, "lt[100]", results.E408, data);
});
test("负数", function() {
    var data = "-101";
    check(data, "lt[100]", results.E200, data);
});
test("小数", function() {
    var data = "-102.2002";
    check(data, "lt[100]", results.E200, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, "lt[100]", results.E404, "");
});

//gt
module("gt");
test("小于", function() {
    var data = "99";
    check(data, "gt[100]", results.E409, data);
});
test("等于", function() {
    var data = "100";
    check(data, "gt[100]", results.E409, data);
});
test("大于", function() {
    var data = "101";
    check(data, "gt[100]", results.E200, data);
});
test("负数", function() {
    var data = "-99";
    check(data, "gt[-100]", results.E200, data);
});
test("小数", function() {
    var data = "-92.2002";
    check(data, "gt[-100]", results.E200, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, "gt[100]", results.E404, "");
});

//equal
module("equal");
test("小于", function() {
    var data = "99";
    check(data, "equal[100]", results.E415, data);
});
test("等于", function() {
    var data = "100";
    check(data, "equal[100]", results.E200, data);
});
test("大于", function() {
    var data = "101";
    check(data, "equal[100]", results.E415, data);
});
test("负数", function() {
    var data = "-100";
    check(data, "equal[-100]", results.E200, data);
});
test("小数", function() {
    var data = "-100.000";
    check(data, "equal[-100]", results.E200, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, "equal[100]", results.E404, "");
});

//le
module("le");
test("小于", function() {
    var data = "99";
    check(data, "le[100]", results.E200, data);
});
test("等于", function() {
    var data = "100";
    check(data, "le[100]", results.E200, data);
});
test("大于", function() {
    var data = "101";
    check(data, "le[100]", results.E408, data);
});
test("负数", function() {
    var data = "-99";
    check(data, "le[-100]", results.E408, data);
});
test("小数", function() {
    var data = "-100.000";
    check(data, "le[-100]", results.E200, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, "le[100]", results.E404, "");
});

//ge
module("ge");
test("小于", function() {
    var data = "99";
    check(data, "ge[100]", results.E409, data);
});
test("等于", function() {
    var data = "100";
    check(data, "ge[100]", results.E200, data);
});
test("大于", function() {
    var data = "101";
    check(data, "ge[100]", results.E200, data);
});
test("负数", function() {
    var data = "-99";
    check(data, "ge[-100]", results.E200, data);
});
test("小数", function() {
    var data = "-100.000";
    check(data, "ge[-100]", results.E200, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, "ge[100]", results.E404, "");
});

//idCard
module("idCard");
test("合法", function() {
    var data = "110101199001010012";
    check(data, "idCard", results.E200, data);
});
test("合法带X", function() {
    var data = "11010119900101001X";
    check(data, "idCard", results.E200, data);
});
test("合法带x", function() {
    var data = "11010119900101001x";
    check(data, "idCard", results.E200, data);
});
test("长度错误", function() {
    var data = "1101011990010100121";
    check(data, "idCard", results.E418, data);
});
test("非法字符", function() {
    var data = "11010119X900101001";
    check(data, "idCard", results.E418, data);
});

//only
module("only");
// test("符号",function(){
//     var data = "_+=-)(*&^%$#@!~`\\|}{\":?><][';//.,']";
//     check(data,"only[~!@#$%^&*()`[];',./{}:\"<>?\'\\|_+-=]",results.E200,data);
// });
test("数字大小写字母", function() {
    var data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    check(data, "only[A-Za-z0-9]", results.E200, data);
});
test("非法字符", function() {
    var data = "abc_+=-)(*&^%$#@!~`\\123|}{\":?><][';//.,']ABC";
    check(data, "only[A-Za-z0-9]", results.E422, "abc123ABC");
});

//exclude
module("exclude");
// test("符号",function(){
//     var data = "_+=-)(*&^%$#@!~`\\|}{\":?><][';//.,']";
//     check(data,"exclude[~!@#$%^&*()`[];',./{}:\"<>?\'\\|_+-=]",results.E200,data);
// });
test("数字大小写字母", function() {
    var data = "abcdefghijklmnopqrstuvwxyzABCDE&FGHIJKL|MNOPQRSTUVWXYZ1234567890";
    check(data, "exclude[A-Za-z0-9]", results.E423, "&|");
});
test("非法字符", function() {
    var data = "abc_+=-)(*&^%$#@!~`\\123|}{\":?><][';//.,']ABC";
    check(data, "exclude[A-Za-z0-9]", results.E423, "_+=-)(*&^%$#@!~`\\|}{\":?><][';//.,']");
});

//trad2simp
module("trad2simp");
test("转换", function() {
    var data = "測試數據";
    check(data, "trad2simp", results.E424, "测试数据");
});
test("不转换", function() {
    var data = "搜狗搜狐";
    check(data, "trad2simp", results.E200, data);
});

//regexp
module("regexp");
test("简单正则", function() {
    var data = "test";
    check(data, "regexp[/test/]", results.E200, data);
});
// test("复杂正则",function(){
//     var data = "http://www.baidu.com/abc.html";
//     check(data, "regexp["
//             + '^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
//             + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
//             + '|' // 允许IP和DOMAIN（域名）
//             + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
//             + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
//             + '[a-z]{2,6})' // first level domain- .com or .museum
//             + '(:[0-9]{1,4})?' // 端口- :80
//             + '((/?)|' // a slash isn't required if there is no file name
//             + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
//             + "]", results.E200, data);
// });
test("直接正则", function() {
    var data = "http://www.baidu.com/abc.html";
    var re = new RegExp('^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
            + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$');
    check(data, re, results.E200, data);
});
test("直接正则",function(){
    var data = "111";
    var re = /test/;
    check(data, re, results.E417, data);
});
