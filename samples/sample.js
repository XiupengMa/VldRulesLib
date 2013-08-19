$(document).ready(function() {
    var msgDiv = $(".message");
    var input = $("#data")[0];
    var select = $("#rule")[0];
    msgDiv.hide();
    $("#add-value").on("click",function(){
        var data = "AAA\u0003\n\u0005BBB";
        input.value = data;
    });
    $("#submit").on("click", function() {
        var data = input.value;
        var rule = select.value.split("&");
        var result = VldRulesLib.validate(data, rule);
        if(result.passed){
            ok(result.revisedVal);
        } else {
            error(result.revisedVal);
        }
        function ok(value, rule, results) {
            console.log('success!');
            console.log(value);
        }
        function error(value, rule, results) {
            console.log('fail');
            console.log(value);
        }
        var html = [];
        html.push("<b>通过: " + result.passed + "</b><br/>");
        html.push("<span>修正后数据：" + result.revisedVal + "</span><br/>");
        msgDiv.html(html.join(""));
        msgDiv.show();
    });
});