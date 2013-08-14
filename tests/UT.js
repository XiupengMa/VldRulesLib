
//对equal的封装
function check(data, rule, passed, revisedVal) {
    var result = VldRulesLib.validate(data, rule)
    equal(result.passed, passed);
    equal(result.revisedVal, revisedVal);
}

//required
module("required");
test("不为空", function() {
    var data = "123";
    check(data, [VldRulesLib.RULES.required()], true, data);
});
test("为空", function() {
    var data = "";
    check(data, [VldRulesLib.RULES.required()], false, data);
});

//min
module("min");
test("min[3]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.min(3)], true, data);
    data = "123";
    check(data, [VldRulesLib.RULES.min(3)], true, data);
    data = "12";
    check(data, [VldRulesLib.RULES.min(3)], false, data);
    data = "";
    check(data, [VldRulesLib.RULES.min(3)], false, data);
});
test("min[0]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.min(0)], true, data);
    data = "";
    check(data, [VldRulesLib.RULES.min(0)], false, data);
});
test("min[-3]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.min(-3)], true, data);
    data = "";
    check(data, [VldRulesLib.RULES.min(-3)], false, data);
});

//max
module("max");
test("max[3]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.max(3)], false, "123");
    data = "123";
    check(data, [VldRulesLib.RULES.max(3)], true, data);
    data = "12";
    check(data, [VldRulesLib.RULES.max(3)], true, data);
    data = "";
    //check(data, [VldRulesLib.RULES.max(3)], results.E201, data);
    check(data, [VldRulesLib.RULES.max(3)], true, data);
});
test("max[0]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.max(0)], false, "");
    data = "";
    //check(data, [VldRulesLib.RULES.max(0)], results.E201, "");
    check(data, [VldRulesLib.RULES.max(0)], true, "");
});
test("max[-3]", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.max(-3)], false, "");
    data = "";
    //check(data, [VldRulesLib.RULES.max(-3)], results.E201, "");
    check(data, [VldRulesLib.RULES.max(-3)], true, "");
});

//email
module("email");
test("合法", function() {
    var data = "abc_123_aa@abc.com";
    check(data, [VldRulesLib.RULES.email()], true, data);
});
test("非法", function() {
    var data = "123@123"
    check(data, [VldRulesLib.RULES.email()], false, data);
});

//phone
module("phone");
test("7位", function() {
    var data = "1234567";
    check(data, [VldRulesLib.RULES.phone()], true, data);
});
test("8位", function() {
    var data = "12345678";
    check(data, [VldRulesLib.RULES.phone()], true, data);
});
test("带字母", function() {
    var data = "123458A";
    check(data, [VldRulesLib.RULES.phone()], false, "123458");
});

//mobile
module("mobile");
test("合法", function() {
    var data = "13345678901";
    check(data, [VldRulesLib.RULES.mobile()], true, data);
});
test("非1开头", function() {
    var data = "23345678901";
    check(data, [VldRulesLib.RULES.mobile()], false, data);
});
test("带字母", function() {
    var data = "1A345678901";
    check(data, [VldRulesLib.RULES.mobile()], false, "1345678901");
});

//url
module("url");
test("合法域名", function() {
    var data = "http://www.baidu.com";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("无http", function() {
    var data = "www.baidu.com";
    check(data, [VldRulesLib.RULES.url()], true, data);
});
test("二级域名", function() {
    var data = "http://123.www.baidu.com";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("目录", function() {
    var data = "http://123.www.baidu.com/abc";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("文件", function() {
    var data = "http://123.www.baidu.com/abc.html";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("端口", function() {
    var data = "http://www.baidu.com:8080";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("IP", function() {
    var data = "http://127.0.0.1:8080";
    check(data, [VldRulesLib.RULES.url("http")], true, data);
});
test("ftp", function() {
    var data = "http://127.0.0.1:8080";
    check(data, [VldRulesLib.RULES.url("ftp")], false, data);
});
test("ftp", function() {
    var data = "ftp://127.0.0.1:8080";
    check(data, [VldRulesLib.RULES.url("ftp")], true, data);
});
test("非法", function() {
    var data = "http://abc";
    check(data, [VldRulesLib.RULES.url("http")], false, data);
});

//alphanumeric
module("alphanumeric");
test("纯字母", function() {
    var data = "abcd";
    check(data, [VldRulesLib.RULES.alphanumeric()], true, data);
});
test("纯数字", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.alphanumeric()], true, data);
});
test("混合", function() {
    var data = "abvc123acd";
    check(data, [VldRulesLib.RULES.alphanumeric()], true, data);
});
test("空格", function() {
    var data = "dfa34 dfa";
    check(data, [VldRulesLib.RULES.alphanumeric()], false, "dfa34dfa");
});

//alphanumeric_underline
module("alphanumeric_underline");
test("纯字母", function() {
    var data = "abcd";
    check(data, [VldRulesLib.RULES.alphanumeric_underline()], true, data);
});
test("纯数字", function() {
    var data = "1234";
    check(data, [VldRulesLib.RULES.alphanumeric_underline()], true, data);
});
test("混合", function() {
    var data = "abvc123_acd";
    check(data, [VldRulesLib.RULES.alphanumeric_underline()], true, data);
});
test("空格", function() {
    var data = "dfa34 d_fa";
    check(data, [VldRulesLib.RULES.alphanumeric_underline()], false, "dfa34d_fa");
});

//number
module("number");
test("数字", function() {
    var data = "1234321";
    check(data, [VldRulesLib.RULES.number()], true, data);
});
test("负数", function() {
    var data = "-1234321";
    check(data, [VldRulesLib.RULES.number()], true, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, [VldRulesLib.RULES.number()], true, data);
});
test("多个负号", function() {
    var data = "-123--45.-1-2-3-%$#ADFdf";
    check(data, [VldRulesLib.RULES.number()], false, "-12345.123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',./\"asdfghjkl ";
    check(data, [VldRulesLib.RULES.number()], false, ".");
});

//int
module("num_int");
test("数字", function() {
    var data = "1234321";
    check(data, [VldRulesLib.RULES.num_int()], true, data);
});
test("位数超出", function() {
    var data = "1234567890";
    check(data, [VldRulesLib.RULES.num_int(7)], false, "1234567");
});
test("负数", function() {
    var data = "-1234321";
    check(data, [VldRulesLib.RULES.num_int()], true, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, [VldRulesLib.RULES.num_int()], false, "1234321111231");
});
test("多个负号", function() {
    var data = "-123--45-1-2-3-%$#ADFdf";
    check(data, [VldRulesLib.RULES.num_int()], false, "-12345123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',1/\"asdfghjkl ";
    check(data, [VldRulesLib.RULES.num_int()], false, "1");
});

//float
module("num_float");
test("整数", function() {
    var data = "1234321";
    check(data, [VldRulesLib.RULES.num_float()], false, data);
});
test("负数", function() {
    var data = "-123.4321";
    check(data, [VldRulesLib.RULES.num_float()], true, data);
});
test("小数", function() {
    var data = "1234321.111231";
    check(data, [VldRulesLib.RULES.num_float()], true, data);
});
test("位数超出", function() {
    var data = "1234321.111231";
    check(data, [VldRulesLib.RULES.num_float(3)], false, "1234321.111");
});
test("多个负号", function() {
    var data = "-123--45-1-2-3-%$#ADFdf";
    check(data, [VldRulesLib.RULES.num_float()], false, "-12345123");
});
test("字母符号", function() {
    var data = "+_)(*&^%$#@!<>?:{}[];',1/\"asdfghjkl ";
    check(data, [VldRulesLib.RULES.num_float()], false, "1");
});

//pwdL1()
module("pwdL1");
test("满足", function() {
    var data = "asdf123adf1";
    check(data, [VldRulesLib.RULES.pwdl1()], true, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, [VldRulesLib.RULES.pwdl1()], false, data);
});
test("无字母", function() {
    var data = "1233211234567";
    check(data, [VldRulesLib.RULES.pwdl1()], false, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, [VldRulesLib.RULES.pwdl1()], true, data);
});

//pwdL2
module("pwdL2");
test("满足", function() {
    var data = "asdf123adf1ASDF";
    check(data, [VldRulesLib.RULES.pwdl2()], true, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, [VldRulesLib.RULES.pwdl2()], false, data);
});
test("无小写字母", function() {
    var data = "1233211234567ASDF";
    check(data, [VldRulesLib.RULES.pwdl2()], false, data);
});
test("无大写字母", function() {
    var data = "123321asdf1234567";
    check(data, [VldRulesLib.RULES.pwdl2()], false, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, [VldRulesLib.RULES.pwdl2()], true, data);
});

//pwdL3
module("pwdL3");
test("满足", function() {
    var data = "asdf123adf1ASDF!@#';/.,";
    check(data, [VldRulesLib.RULES.pwdl3()], true, data);
});
test("无数字", function() {
    var data = "asdfadf";
    check(data, [VldRulesLib.RULES.pwdl3()], false, data);
});
test("无小写字母", function() {
    var data = "1233211234567ASDF";
    check(data, [VldRulesLib.RULES.pwdl3()], false, data);
});
test("无大写字母", function() {
    var data = "123321asdf1234567";
    check(data, [VldRulesLib.RULES.pwdl3()], false, data);
});
test("无符号", function() {
    var data = "123321asdf1234567ASDF";
    check(data, [VldRulesLib.RULES.pwdl3()], false, data);
});
test("复杂密码", function() {
    var data = "abcd123EFGH@sogou.com!@#";
    check(data, [VldRulesLib.RULES.pwdl3()], true, data);
});

//singleSpace
module("singleSpace");
test("无空格", function() {
    var data = "asdf123adf1ASDF!@#';/.,";
    check(data, [VldRulesLib.RULES.singlespace()], true, data);
});
test("单一空格", function() {
    var data = "asdf12 3a df1 ASD F!@#' ; / .,";
    check(data, [VldRulesLib.RULES.singlespace()], true, data);
});
test("连续空格", function() {
    var data = "asdf12  3a     df1   ASD F!@#'     ;    /                .,";
    check(data, [VldRulesLib.RULES.singlespace()], false, "asdf12 3a df1 ASD F!@#' ; / .,");
});
test("全部空格", function() {
    var data = "                                   ";
    check(data, [VldRulesLib.RULES.singlespace()], false, " ");
});

//alpha
module("alpha");
test("字母", function() {
    var data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    check(data, [VldRulesLib.RULES.alpha()], true, data);
});
test("符号数字", function() {
    var data = "+_)(*&^%$#@!{}:<>?[];',./1234567890\\|\"~` ";
    check(data, [VldRulesLib.RULES.alpha()], false, "");
});

//alpha_underline
module("alpha_underline");
test("字母下划线", function() {
    var data = "abcdefghijk__lmnopqrstuvw____xyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    check(data, [VldRulesLib.RULES.alpha_underline()], true, data);
});
test("符号数字", function() {
    var data = "+_)(*&^%$#@!{}:<>?[];',./1234567890\\|\"~` ";
    check(data, [VldRulesLib.RULES.alpha_underline()], false, "_");
});

//lt
module("lt");
test("小于", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.lt(100)], true, data);
});
test("等于", function() {
    var data = "100";
    check(data, [VldRulesLib.RULES.lt(100)], false, data);
});
test("大于", function() {
    var data = "101";
    check(data, [VldRulesLib.RULES.lt(100)], false, data);
});
test("负数", function() {
    var data = "-101";
    check(data, [VldRulesLib.RULES.lt(100)], true, data);
});
test("小数", function() {
    var data = "-102.2002";
    check(data, [VldRulesLib.RULES.lt(100)], true, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, [VldRulesLib.RULES.lt(100)], false, "");
});

//gt
module("gt");
test("小于", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.gt(100)], false, data);
});
test("等于", function() {
    var data = "100";
    check(data, [VldRulesLib.RULES.gt(100)], false, data);
});
test("大于", function() {
    var data = "101";
    check(data, [VldRulesLib.RULES.gt(100)], true, data);
});
test("负数", function() {
    var data = "-99";
    check(data, [VldRulesLib.RULES.gt(-100)], true, data);
});
test("小数", function() {
    var data = "-92.2002";
    check(data, [VldRulesLib.RULES.gt(-100)], true, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, [VldRulesLib.RULES.gt(100)], false, "");
});

//le&ge
module("ge&le");
test("非法", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.ge(100), VldRulesLib.RULES.le(200)], false, data);
});

//equal
module("equal");
test("小于", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.equal(100)], false, data);
});
test("等于", function() {
    var data = "100";
    check(data, [VldRulesLib.RULES.equal(100)], true, data);
});
test("大于", function() {
    var data = "101";
    check(data, [VldRulesLib.RULES.equal(100)], false, data);
});
test("负数", function() {
    var data = "-100";
    check(data, [VldRulesLib.RULES.equal(-100)], true, data);
});
test("小数", function() {
    var data = "-100.000";
    check(data, [VldRulesLib.RULES.equal(-100)], true, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, [VldRulesLib.RULES.equal(100)], false, data);
});

//le
module("le");
test("小于", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.le(100)], true, data);
});
test("等于", function() {
    var data = "100";
    check(data, [VldRulesLib.RULES.le(100)], true, data);
});
test("大于", function() {
    var data = "101";
    check(data, [VldRulesLib.RULES.le(100)], false, "100");
});
test("负数", function() {
    var data = "-99";
    check(data, [VldRulesLib.RULES.le(-100)], false, "-100");
});
test("小数", function() {
    var data = "-100.000";
    check(data, [VldRulesLib.RULES.le(-100)], true, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, [VldRulesLib.RULES.le(100)], false, "");
});

//ge
module("ge");
test("小于", function() {
    var data = "99";
    check(data, [VldRulesLib.RULES.ge(100)], false, data);
});
test("等于", function() {
    var data = "100";
    check(data, [VldRulesLib.RULES.ge(100)], true, data);
});
test("大于", function() {
    var data = "101";
    check(data, [VldRulesLib.RULES.ge(100)], true, data);
});
test("负数", function() {
    var data = "-99";
    check(data, [VldRulesLib.RULES.ge(-100)], true, data);
});
test("小数", function() {
    var data = "-100.000";
    check(data, [VldRulesLib.RULES.ge(-100)], true, data);
});
test("非法字符", function() {
    var data = "AAA";
    check(data, [VldRulesLib.RULES.ge(100)], false, "");
});

//idCard
module("idCard");
test("合法", function() {
    var data = "110101199001010012";
    check(data, [VldRulesLib.RULES.idcard()], true, data);
});
test("合法带X", function() {
    var data = "11010119900101001X";
    check(data, [VldRulesLib.RULES.idcard()], true, data);
});
test("合法带x", function() {
    var data = "11010119900101001x";
    check(data, [VldRulesLib.RULES.idcard()], true, data);
});
test("长度错误", function() {
    var data = "1101011990010100121";
    check(data, [VldRulesLib.RULES.idcard()], false, data);
});
test("非法字符", function() {
    var data = "11010119X900101001";
    check(data, [VldRulesLib.RULES.idcard()], false, data);
});

// //only
// module("only");
// test("符号",function(){
//     var data = "_+=-)(*&^%$#@!~`\\|}{\":?><][';//.,']";
//     check(data,"only[~!@#$%^&*()`\\\[\\\];',\./{}:\"<>?\'\\|_+-=]",true,data);
// });
// test("数字大小写字母", function() {
//     var data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//     check(data, [VldRulesLib.RULES.only(A-Za-z0-9)], true, data);
// });
// test("非法字符", function() {
//     var data = "abc_+=-)(*&^%$#@!~`\\123|}{\":?><][';//.,']ABC";
//     check(data, [VldRulesLib.RULES.only(A-Za-z0-9)], false, "abc123ABC");
// });

// //exclude
// module("exclude");
// test("符号",function(){
//     var data = "_+=-)(*&^%$#@!~`\\|}{\":?><][';//.,']";
//     check(data,"exclude[~!@#$%^&*()`\\\[\\\];',./{}:\"<>?\'\\|_+-=]",true,data);
// });
// test("数字大小写字母", function() {
//     var data = "abcdefghijklmnopqrstuvwxyzABCDE&FGHIJKL|MNOPQRSTUVWXYZ1234567890";
//     check(data, [VldRulesLib.RULES.exclude(A-Za-z0-9)], false, "&|");
// });
// test("非法字符", function() {
//     var data = "abc_+=-)(*&^%$#@!~`\\123|}{\":?><][';//.,']ABC";
//     check(data, [VldRulesLib.RULES.exclude[A-Za-z0-9]], false, "_+=-)(*&^%$#@!~`\\|}{\":?><](';//.,')");
// });

//trad2simp
module("trad2simp");
test("转换", function() {
    var data = "測試數據";
    check(data, [VldRulesLib.RULES.trad2simp()], false, "测试数据");
});
test("不转换", function() {
    var data = "搜狗搜狐";
    check(data, [VldRulesLib.RULES.trad2simp()], true, data);
});

//regexp
// module("regexp");
// test("简单正则", function() {
//     var data = "test";
//     check(data, [VldRulesLib.RULES.regexp(/test/)], true, data);
// });
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
//             + "]", true, data);
// });
// test("直接正则", function() {
//     var data = "http://www.baidu.com/abc.html";
//     var re = new RegExp('^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
//         + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
//         + '|' // 允许IP和DOMAIN（域名）
//         + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
//         + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
//         + '[a-z]{2,6})' // first level domain- .com or .museum
//         + '(:[0-9]{1,4})?' // 端口- :80
//         + '((/?)|' // a slash isn't required if there is no file name
//         + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$');
//     check(data, re, true, data);
// });
// test("直接正则", function() {
//     var data = "111";
//     var re = /test/;
//     check(data, re, false, data);
// });

//textarea
module("textarea");
test("综合测试", function() {
    var data = "  sogou-inc.com  \n"
              + " Haidian District \n"
              + "    \n"
              + "   \n"
              + "Beijing\n"
              + "China\n"
              + "\n"
              + "\n"
              + "Beijing\n"
              + "\n"
              + "\n"
              + "0123456789012345678901234567890\n"
              + "BIZTECH\n"
              + "\n"
    check(data, 
        [VldRulesLib.RULES.textarea("rows5&length20&noBlankLine&noRepeat&noBlankHead&noBlankRear")], 
        false, 
        "sogou-inc.com\n"
          + "Haidian District\n"
          + "Beijing\n"
          + "China\n"
          + "01234567890123456789"
        );
});
