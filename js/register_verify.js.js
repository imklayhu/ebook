/**
 * Created by Clam on 2016/9/28.
 */



/*tipsForInput()
* 设置了失焦事件和注册按钮的点击事件
* */
function tipsForInput(){
    //获取注册页面的表单
    var regiaterUsername = $("#regiater_username");
    var regitaerPassword = $("#regiaterPassword");
    var regitaerPassword_again = $("#regiaterPassword_again");
    var telNumber = $("#tel_number");
    var telMessage = $("#tel_message");
    var btnRegitear = $("#btnRegitear");

    /*注册表单的输入验证*/
    regiaterUsername.blur(function () {

        /*验证用户名输入是否合法的正则表达式
        * ·由字母a～z(不区分大小写)、数字0～9、点、减号或下划线组成
          ·只能以字母开头，包含字符 数字 下划线，例如：beijing.2008
          ·用户名长度为4～18个字符
         */
        var patten = /^[a-zA-Z]\w{3,15}$/ig;
        if(this.value == ""){
            regiaterUsername.addClass("warning");
            regiaterUsername.placeholder = "用户名不能为空！";
            console.log("输入内容为空！");
            return false;
        }
        else if(!patten.test(this.value)){
            regiaterUsername.addClass("warning");
            alert("用户名格式有误！");
            return false;
        }
        /*验证用户名是否已经存在*/
        else {
            var url = "";
            $.ajax({
                type:get,
                url:url,//接口
                dataType: 'json',
                data:{
                    usr:regiaterUsername
                },
                success:function (data) {
                    /*提示：
                     * 1.用户名可用 return true;
                     * 2.用户名不可用 return false;
                     * */
                },
                error:function () {
                    alert("用户名验证失败！")
                }
            })
        }
    }); //return true ;表示用户名设置正确且可用

    regitaerPassword.blur(function () {

        var base = /^(\w){6,20}$/;
        var val = this.value;
        if (val == "") { //判断是否为空
            regitaerPassword.addClass("warning");
            console.log("输入内容为空！");
            return false;
        }
        else if(base.exec(val)){//如果密码的格式正确，再判断密码的强度
            var standard = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
            var strObj = val.match(standard);
            //var strength = val.match(standard).length;
            if( strObj == null || strObj.length <= 1 ){
                regitaerPassword.addClass("warning");
                regitaerPassword.value == null;
                regitaerPassword.attr('placeholder',"长度为6-20，至少一个小写字母，至少一个大写字母");
                alert("强度弱！");
            }
            else if(strObj.length > 1 && strObj.length <= 6){
                alert("强度中！");
            }
            else {
                alert("强度高！");
            }
            return true;
        }
        else{
            regitaerPassword.addClass("warning");
            alert("密码格式不正确！");
            return false;
        }
    });//密码格式正确即返回true  --> return true;

    regitaerPassword_again.blur(function () {
        if(this.value == ""){
            regitaerPassword_again.addClass("warning");
            console.log("输入内容为空！");
            return false;
        }
        /*验证重新输入的密码是否与上次输入否认密码相同*/
        else if(this.value != regitaerPassword.value){
            regitaerPassword_again.addClass("warning");
            alert("两次输入的密码不同");
            return false;
        }
        else{
            console.log("再次输入正确！");
            return true;
        }
    });//密码再次输入正确，则返回一个true

    telNumber.blur(function () {

        reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
        if(this.value == ""){
            telNumber.addClass("warning");
            console.log("输入内容为空");
        }
        if(this.val().length != 11 ){
            telNumber.addClass("warning");
            console.log("输入的手机号长度有误！");
        }
    });

    telMessage.blur(function () {
        if(this.value == ""){
            telMessage.addClass("warning");
            console.log("输入内容为空！");
        }
    });
    //设置注册按钮的点击事件，判断是否点击按钮的时候表单的输入内容为空
    btnRegitear.click(function () {
        console.log("点击事件");
        var input_txt = $("input");
        // console.log(input_txt);
        input_txt.each(function (i) {
            console.log(this.id);
            if(this.value == ""){
                input_txt.eq(i).addClass("warning");
                console.log("输入内容为空！");
            }
            /*else{
                $.ajax({
                    type:"get",
                    url: url,
                    async:true,
                    data:{
                        usr:$()
                    }
                })
            }*/
        })


        var url = "";/*注册接口*/
        if("表单输入格式正确"){
            $.ajax({
                type:get,
                url:url,
                async:true,
                dataType:'json',
                data:{
                    usr:input_txt.eq(0).value,
                    pwd:input_txt.eq(1).value,
                    pwd_again:input_txt.eq(2).value,
                    tel:input_txt.eq(3).value,
                    msg:input_txt.eq(4).value
                },
                success:function (data) {
                    alert("注册成功，回到登陆界面！");
                },
                error:function () {
                    alert("注册失败！");
                }
            })
        }
    })
}


/*focusForInput()
* 聚焦事件
* 目标是：表单是聚焦的时候，取消表单失焦的样式
* Created by Clam
* 我想大言不惭卑微奢求来世再爱你--《不再见》 陈学冬
* */

function focusForInput(){

    //获取注册页面的表单
    var regiaterUsername = $("#regiater_username");
    var regitaerPassword = $("#regiaterPassword");
    var regitaerPassword_again = $("#regiaterPassword_again");
    var telNumber = $("#tel_number");
    var telMessage = $("#tel_message");
    var btnRegitear = $("#btnRegitear");
    //获取登录页面的表单
    var loginUsername = $("#username");
    var loginPassword = $("#password");
    var testCode = $("#testCode");

    //表单的聚焦事件
    regiaterUsername.focus(function () {
        if(this.value == ""){
            regiaterUsername.removeClass("warning");
            console.log("表单已聚焦");
        }
    });

    regitaerPassword.focus(function () {
        if(this.value == ""){
            regitaerPassword.removeClass("warning");
            console.log("表单已聚焦");
        }
    });

    regitaerPassword_again.focus(function () {
        if(this.value == ""){
            regitaerPassword_again.removeClass("warning");
            console.log("表单已聚焦");
        }
    });

    telNumber.focus(function () {
        if(this.value == ""){
            telNumber.removeClass("warning");
            console.log("表单已聚焦");
        }
    });

    telMessage.focus(function () {
        if(this.value == ""){
            telMessage.removeClass("warning");
            console.log("表单已聚焦");
        }
    });
}

