/*
 * VldRulesLib 验证规则库
 * @author Maxiupeng
 * @date 2013-6-26
 */

var VldRulesLib = {
    CODE_TABLE: {
        //2XX表示验证通过
        E200: "验证通过",
        E201: "数据为空",
        //4XX表示验证失败
        E401: "输入数据为空",
        E402: "长度超出",
        E403: "长度不够",
        E404: "输入了非数字",
        E405: "输入了非字母",
        E406: "输入了符号",
        E407: "输入了非法字符",
        E408: "超过最大阈值",
        E409: "低于最小阈值",
        E410: "不满足格式要求",
        E411: "不满足Email格式",
        E412: "不满足电话号码格式(座机)",
        E413: "不满足手机号码格式",
        E414: "不满足URL格式",
        E415: "不等于给定值",
        E416: "参数非法",
        E417: "不满足自定义的正则表达式",
        E418: "不满足身份证号码格式",
        E419: "输入数据的类型错误",
        E420: "结果为false",
        E421: "数据不可用"
    },

    checkValueArgs: function(value, args) {
        var result = {};
        if (value == "") {
            result.result = true;
            result.code = "E201";
            result.msg = "";
            return result;
        }
        if (args.length == 0 || !/^[\d.,]*$/.test(args)) {
            result.result = false;
            result.code = "E416";
            result.msg = "";
            return result;
        }
        if (!/^[\d.]*$/.test(value)) {
            result.result = false;
            result.code = "E404";
            result.msg = "";
            return result;
        }
        return result;
    },

    /*
     * 验证规则表
     * 返回一个object,包括3个属性:{boolean} result 是否通过验证
     *                            {string}  code   验证结果代码
     *                            {string}  msg    附加消息
     */
    rulesTable: {
        //value是否严格相等true
        ok:function(value, args, msg1, msg2){
            var result = {};
            if(value === "" || value === undefined || value === null){
                result.result = false,
                result.code = "E401",
                result.msg = msg2
                return result;
            }
            if(typeof value != "boolean") {
                result.result = false;
                result.code = "E419";
                result.msg = msg2;
            } else if(value === true) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else if(value === false) {
                result.result = false;
                result.code = "E420";
                result.msg = msg2;
            }
            return result;
        },
        //value是否为true(非严格相等)
        valid: function(value, args, msg1, msg2){
            var result = {};
            if(value) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E421";
                result.msg = msg2;
            }
            return result;
        },
        required: function(value, args, msg1, msg2) {
            var result = {};
            if (value.length == 0) {
                result.result = false;
                result.code = "E401";
                result.msg = msg2;
            } else {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            }
            return result;
        },

        min: function(value, args, msg1, msg2) {
            var result = {};
            if (value.length >= args) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else if (value.length == 0) {
                result.result = false;
                result.code = "E401";
                result.msg = msg2;
            } else {
                result.result = false;
                result.code = "E403";
                result.msg = msg2;
            }
            return result;
        },

        max: function(value, args, msg1, msg2) {
            var result = {};
            if (value.length == 0) {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (value.length <= args) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E402";
                result.msg = msg2;
            }
            return result;
        },

        email: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E411";
                result.msg = msg2;
            }
            return result;
        },

        phone: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E412";
                result.msg = msg2;
            }
            return result;
        },

        mobile: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E413";
                result.msg = msg2;
            }
            return result;
        },

        url: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E414";
                result.msg = msg2;
            }
            return result;
        },

        alphanumeric: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[A-Za-z0-9]*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E406";
                result.msg = msg2;
            }
            return result;
        },

        alphanumeric_space: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[a-zA-Z0-9_\s]*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E407";
                result.msg = msg2;
            }
            return result;
        },

        number: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[\d.,]*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E404";
                result.msg = msg2;
            }
            return result;
        },

        alpha: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[A-Za-z]*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E405";
                result.msg = msg2;
            }
            return result;
        },

        alpha_space: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (/^[A-Za-z_\s]*$/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E407";
                result.msg = msg2;
            }
            return result;
        },

        lt: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result !== undefined) {
                return result;
            }
            if (parseFloat(value) < parseFloat(args)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E408";
                result.msg = msg2;
            }
            return result;
        },

        gt: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result !== undefined) {
                return result;
            }
            if (parseFloat(value) > parseFloat(args)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E409";
                result.msg = msg2;
            }
            return result;
        },

        equal: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result !== undefined) {
                return result;
            }
            if (parseFloat(value) == parseFloat(args)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E415";
                result.msg = msg2;
            }
            return result;
        },

        le: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result !== undefined) {
                return result;
            }
            if (parseFloat(value) <= parseFloat(args)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E408";
                result.msg = msg2;
            }
            return result;
        },

        ge: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result !== undefined) {
                return result;
            }
            if (parseFloat(value) >= parseFloat(args)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E409";
                result.msg = msg2;
            }
            return result;
        },

        idCard: function(value, args, msg1, msg2) {
            var result = {};
            if (value == "") {
                result.result = true;
                result.code = "E201";
                result.msg = msg1;
            } else if (!/^[\dXx]*$/.test(value)) {
                result.result = false;
                result.code = "E407";
                result.msg = msg2;
            } else if (/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E418";
                result.msg = msg2;
            }
            return result;
        },

        regexp: function(value, args, msg1, msg2) {
            var result = VldRulesLib.checkValueArgs(value, args);
            if (result.result) {
                return result;
            }
            var re = eval(args);
            if (!re instanceof RegExp) {
                result.result = false;
                result.code = "E416";
                result.msg = msg2;
                return result;
            }
            if (re.test(value)) {
                result.result = true;
                result.code = "E200";
                result.msg = msg1;
            } else {
                result.result = false;
                result.code = "E417";
                result.msg = msg2;
            }
            return result;
        }
    },


    /*
     * 规则解析函数，将复合规则解析成object
     * @param:rule        {string} 规则语句
     * @return:results    {array}  第一个元素表示规则之间的关系，or或者and；剩余元素为独立的规则。
     *                             如果是单一规则，则直接返回包含该规则的单元素数组
     *                             eg:[{rel:or},{rule:min,args:5},{rule:max,args:10}]
     */
    parseRule: function(rule){
        var results = [];
        var rules = [];
        if (rule.indexOf("&") != -1) {
            rules = rule.split("&");
            results.push({
                rel: "and"
            });
        } else if (rule.indexOf("|") != -1) {
            rules = rule.split("|");
            results.push({
                rel: "or"
            })
        } else {
            rules.push(rule);
        }
        for (var i = 0; i < rules.length; i++) {
            var temp = rules[i].match(/(\w+)(\[([\s\S]+)\])?/);
            var name = temp[1];//规则名
            var args = temp[3];//参数
            if (!VldRulesLib.rulesTable[name]) {
                console.log("规则错误！");
                return false;
            }
            results.push({
                rule: name,
                args: args
            });
        }
        return results;
    },
    /*
     * 数据验证
     * @param:value   {string|number}  待检验的数据
     * @param:rule    {string}         检验规则,支持用'&'或'|'进行规则组合
     * @param:success {function}       检验成功后的回调函数.传参:待检验数据,规则描述字符串,本函数的返回值
     * @param:fail    {function}       检验失败后的回调函数.传参:待检验数据,规则描述字符串,本函数的返回值
     * @return        {obj}            包含三个属性:
     *                                 {boolean} result 是否通过验证
     *                                 {string}  code   验证结果代码,多个代码之间用&连接
     *                                 {string}  msg    附加消息,多个消息之间用&连接
     */
    validate: function(value, rule, msg1, msg2, success, fail) {
        var rules = this.parseRule(rule);
        var results = {};
        results.result = false;
        results.code = "";
        results.msg = "";

        if(typeof success != "function"){
            success = function(){};
        }
        if(typeof fail != "function"){
            fail = function(){};
        }

        if(!rules){
            return false;
        }
        if (rules.length == 1) {
            var result = this.rulesTable[rules[0].rule](value, rules[0].args, msg1, msg2);
            results.result = result.result;
            results.code = result.code;
            results.msg = this.CODE_TABLE[results.code] + (result.msg == "" ? "" : ("," + result.msg));
            if (results.result) {
                success(value,rule,results);
            } else {
                fail(value,rule,results);
            }
            return results;
        }
        if (rules[0].rel == "or") {
            for (var j = 1; j < rules.length; j++) {
                var result = this.rulesTable[rules[j].rule](value, rules[j].args, msg1, msg2);
                if(result.result){
                    results.result = result.result;
                    results.code = result.code;
                    results.msg = this.CODE_TABLE[results.code] + (result.msg == "" ? "" : ("," + result.msg));
                    success(value,rule,results);
                    return results;
                }
                results.result = false;
                if(results.code == ""){
                    results.code = result.code;
                }else{
                    results.code += "&" + result.code;
                }
                if(results.msg == ""){
                    results.msg = this.CODE_TABLE[result.code] + (result.msg == "" ? "" : ("," + result.msg));
                }else{
                    results.msg += "&" + this.CODE_TABLE[result.code] + ((result.msg == "" ? "" : ("," + result.msg)));
                }
            }
            fail(value,rule,results);
            return results;
        } else if (rules[0].rel == "and") {
            for (var j = 1; j < rules.length; j++) {
                var result = this.rulesTable[rules[j].rule](value, rules[j].args, msg1, msg2);
                if (!result.result) {
                    results.result = result.result;
                    results.code = result.code;
                    results.msg = this.CODE_TABLE[results.code] + (result.msg == "" ? "" : ("," + result.msg));
                    fail(value,rule,results);
                    return results;
                }

                results.result = true;
                if(results.code == ""){
                    results.code = result.code;
                }else{
                    results.code += "&" + result.code;
                }
                if(results.msg == ""){
                    results.msg = result.msg;
                }else{
                    results.msg += "&" + ((result.msg == "" ? "" : ("," + result.msg)));
                }
            }
            if(results.code.indexOf("E201") != -1){
                results.code = "E201";
            }else{
                results.code = "E200";
            }
            results.msg = this.CODE_TABLE[results.code] + results.msg;
            success(value,rule,results);
            return results;
        } else {
            console.log("规则错误！");
            return false;
        }
    },

};