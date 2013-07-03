$(document).ready(function() {
    var msgDiv = $(".message");
    var input = $("#data")[0];
    var select = $("#rule")[0];
    msgDiv.hide();
    $("#submit").bind("click", function() {
        var data = input.value;
        var rule = select.value;
        //调用格式 VldRulesLib.validate(value,rule,success,fail)
        var result = VldRulesLib.validate(data, rule, "passed", "failed", function(value, rule, results) {
            console.log('success!');
            console.log(value);
            console.log(rule);
            console.log(results);
        }, function(value, rule, results) {
            console.log('fail');
            console.log(value);
            console.log(rule);
            console.log(results);
        });
        var html = [];
        html.push("<b>通过: " + result.result + "</b><br/>");
        html.push("<span>代码: " + result.code + "</span><br/>");
        html.push("<span>消息: " + result.msg + "</span>");
        msgDiv.html(html.join(""));
        msgDiv.show();
    });
});