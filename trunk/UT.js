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

function check(data, rule, result) {
    deepEqual(VldRulesLib.validate(data, rule, "passed", "failed"), result);
}

//ok
module("ok");
test("正确", function() {
    var data = true;
    check(data, "ok", results.E200);
});
test("错误", function() {
    var data = false;
    check(data, "ok", results.E420);
});
test("数据类型错误", function() {
    var data = "true";
    check(data, "ok", results.E419);
});
test("空值", function() {
    var data = "";
    check(data, "ok", results.E401);
});

//required
module("required");
test("不为空", function() {
    var data = "123";
    check(data, "required", results.E200);
});
test("为空", function() {
    var data = "";
    check(data, "required", results.E401);
});

//valid
module("valid");
test("undefined", function() {
    var data;
    check(data, "valid", results.E421);
});
test("null", function() {
    var data = null;
    check(data, "valid", results.E421);
});
test("false", function() {
    var data = false;
    check(data, "valid", results.E421);
});
test("空字符串", function() {
    var data = "";
    check(data, "valid", results.E421);
});
test("空对象", function() {
    var data = {};
    check(data, "valid", results.E200);
});

//min
module("min");
test("min[3]", function() {
    var data = "1234";
    check(data, "min[3]", results.E200);
    data = "123";
    check(data, "min[3]", results.E200);
    data = "12";
    check(data, "min[3]", results.E403);
    data = "";
    check(data, "min[3]", results.E401);
});
test("min[0]", function() {
    var data = "1234";
    check(data, "min[0]", results.E200);
    data = "";
    check(data, "min[0]", results.E200);
});
test("min[-3]", function() {
    var data = "1234";
    check(data, "min[-3]", results.E200);
    data = "";
    check(data, "min[-3]", results.E200);
});

//max
module("max");
test("max[3]", function() {
    var data = "1234";
    check(data, "max[3]", results.E402);
    data = "123";
    check(data, "max[3]", results.E200);
    data = "12";
    check(data, "max[3]", results.E200);
    data = "";
    check(data, "max[3]", results.E201);
});
test("max[0]", function() {
    var data = "1234";
    check(data, "max[0]", results.E402);
    data = "";
    check(data, "max[0]", results.E201);
});
test("max[-3]", function() {
    var data = "1234";
    check(data, "max[-3]", results.E402);
    data = "";
    check(data, "max[-3]", results.E201);
});