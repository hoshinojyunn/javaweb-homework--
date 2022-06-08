<template>
  <div class="security">
    <el-page-header @back="goBack" content="个人设置" style="margin-bottom: 5px;margin-top: 5px;">
    </el-page-header>
    <el-tabs v-model="activeName" tab-position="left">
    <!-- 账号安全 -->
      <el-tab-pane label="账号安全" name="accountSecurity">
        <div style="margin: 0 auto;">
          <div style="text-align: left; margin-left: 220px; margin-bottom: 25px;font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;font-size: 30px;">
          重置密码
          </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass" size="medium">
            <el-col :span="8">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" size="medium">
            <el-col :span="8">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode" size="medium" style="width: 500px">
            <el-col :span="8">
              <el-input type="text" v-model="ruleForm.checkCode" autocomplete="off"></el-input>
              <canvas ref="checkCode" @click="getCode" style="position: absolute; top: 0px;left: 150px"></canvas>
            </el-col>
          </el-form-item>
          <el-form-item style="margin: 0 auto">
            <el-col :span="8">
              <el-button type="primary" @click="submitForm('ruleForm')" class="submit">提交</el-button>
              <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
            </el-col>
            
          </el-form-item>
        </el-form>
        </div>
      </el-tab-pane>
      <!-- 消息安全 -->
      <el-tab-pane label="消息安全" name="messageSecurity">
        消息安全
      </el-tab-pane>
      <!-- 隐私安全 -->
      <el-tab-pane label="隐私安全" name="privacySecurity">
        隐私安全
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index'
Vue.use(VueAxios,axios);
export default {
  mounted() {
    // 获取验证码图
    this.getCode();
  },
data(){
  var validatePass = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请输入密码"));
    }
    else {
        if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
    }
};
var validatePass2 = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    }
    else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
    }
    else {
        callback();
    }
};
var validateCheckCode = (rule,value,callback)=>{
    var check = this.checkMe();
    if(check){
      callback();
    }else{
      callback(new Error("验证错误"));
    }
};
return{
  accountSecurityVisible : false,
  messageSecurityVisible: false,
  privacySecurityVisible: false,
  activeName: 'accountSecurity',
  ruleForm: {
      pass: "",
      checkPass: "",
      checkCode: ""
  },
  rules: {
      pass: [
          { validator: validatePass, trigger: "blur" }
      ],
      checkPass: [
          { validator: validatePass2, trigger: "blur" }
      ],
      checkCode: [
          { validator: validateCheckCode, trigger: "blur"}
      ]
  },
  message:'test',
    checkCode: '',  // 图片验证码的值
    expressValue: '',  // 表达式的值
    // canvas各种设置
    cvs: {
        w: 100, // 给出默认宽度  宽度会在图片绘制时根据长度更改
        h: 36,  // 高 与input保持一致
        fontSize: 24,   // 字体大小
        str: '+-*',  // 符号生成范围
        line: 3 // 噪音线个数
    }
  
}
},
create(){

},
methods:{
    goBack: function(){
      VueRouter.push('/setting');
    },
    accountSecurity: function(){

    },
    messageSecurity: function(){

    },
    privacySecurity: function(){

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) { // 检查通过 提交
              axios.get("http://localhost:8080/resetPassword", {
                  params: {
                      password: this.ruleForm.pass
                  }
              }).then(response => {
                  if (response.data == true) {
                      this.$message({
                          message: "密码重置成功，请重新登录",
                          type: "success"
                      });
                      window.sessionStorage.removeItem("username");
                      window.sessionStorage.removeItem("avatar");
                      window.sessionStorage.removeItem("id");
                      VueRouter.push("/login");
                  }
                  else {
                      this.$message.error("重置失败");
                  }
              });
          }
          else {
              console.log("error submit!!");
              return false;
          }
      });
},
resetForm(formName) {
    this.$refs[formName].resetFields();
},
// 随机整数生成器，范围[0, max)
rInt(max) {
    return Math.floor(Math.random() * 100000 % max);
},

// 生成随机表达式
rCode() {
    let a = this.rInt(100);
    let b = this.rInt(10);
    let op = this.cvs.str.charAt(this.rInt(this.cvs.str.length));
    // 表达式
    let code = `${a}${op}${b}=`;
    this.checkCode = code;
    // 表达式的值
    this.expressValue = eval(code.substr(0, code.length - 1));
    return code;
},
// 生成随机颜色 rgba格式
rColor() {
    let a = ((Math.random()*5 + 5) / 10).toFixed(2);
    return `rgba(${this.rInt(256)}, ${this.rInt(256)}, ${this.rInt(256)}, ${a})`
},
// 验证码图片绘制
drawCode(domCvs) {
    let _this = this;
    // 随机表达式
    let checkCode = this.rCode();
    // 宽设置
    this.cvs.w = 10 + this.cvs.fontSize * this.checkCode.length;

    // 判断是否支持canvas
    if (domCvs !== null && domCvs.getContext && domCvs.getContext('2d')) {
        // 设置显示区域大小
        domCvs.style.width = _this.cvs.w;
        // 设置画板宽高
        domCvs.setAttribute('width', _this.cvs.w);
        domCvs.setAttribute('height', _this.cvs.h);
        // 画笔
        let pen = domCvs.getContext('2d');
        // 背景: 颜色  区域
        pen.fillStyle = '#eee';
        pen.fillRect(0, 0, _this.cvs.w, _this.cvs.h);
        // 水平线位置
        pen.textBaseline = 'middle';   // top middle bottom
        // 内容
        for (let i = 0; i < _this.checkCode.length; i++) {
            pen.fillStyle = _this.rColor(); // 随机颜色
            pen.font = `bold ${_this.cvs.fontSize}px 微软雅黑`; // 字体设置
            // 字符绘制: (字符, X坐标, Y坐标)
            pen.fillText(checkCode.charAt(i), 10 + _this.cvs.fontSize * i, 17 + _this.rInt(10));
        }
        // 噪音线
        for (let i = 0; i < _this.cvs.line; i++) {
            // 起点
            pen.moveTo(_this.rInt(_this.cvs.w) / 2, _this.rInt(_this.cvs.h));
            // 终点
            pen.lineTo(_this.rInt(_this.cvs.w), _this.rInt(_this.cvs.h));
            // 颜色
            pen.strokeStyle = _this.rColor();
            // 粗细
            pen.lineWidth = '2';
            // 绘制
            pen.stroke();
        }

    } else {
        alert('不支持验证码格式，请升级或更换浏览器重试');
    }
},
getCode: function(){
    let domCvs = this.$refs.checkCode;
    console.log(domCvs);
    this.drawCode(domCvs);
},
checkMe() {
    // 空、 错误、 正确 三个判断
    if (this.ruleForm.checkCode) {
        if (eval(this.ruleForm.checkCode) === eval(this.expressValue)) {
            // 验证成功要做的事
            return true;
        } else {
            // 验证码有误
            return false;
        }
    } else {
        // 输入为空
        return false;
    }
}

}
}

</script>
<style scoped>
    .security{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #f2f2f2;
    }

</style>