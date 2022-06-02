<template>
  <div>
    <Header></Header>
    <div class="registerBody">
      <div class="registerBox">
        <div style="margin-left: 10px;text-align: left;">
          <el-button type="text" @click="goback">返回登录</el-button>
        </div>
        <div style="margin-bottom: 25px;font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;font-size: 30px;">注册
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" size="medium">
            <el-col :span="16">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="pass" size="medium">
            <el-col :span="16">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" size="medium">
            <el-col :span="16">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="margin: 0 auto">
            <el-col :span="16">
              <el-button type="primary" @click="submitForm('ruleForm')" class="submit">提交</el-button>
              <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
            </el-col>
            
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index'
import Header from './header/header.vue';
import Footer from './footer/footer.vue';
Vue.use(VueAxios,axios);
export default {
    data() {
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
        var checkUserName = (rule, value, callback) => {
            axios.get("http://localhost:8080/checkUserName", {
                params: {
                    username: value
                }
            }).then(response => {
                if (response.data == true) {
                    callback();
                }
                else {
                    callback(new Error("此用户名已有人使用，重新换一个吧"));
                }
            });
        };
        return {
            ruleForm: {
                pass: "",
                checkPass: "",
                username: ""
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: "blur" }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: "blur" }
                ],
                username: [
                    { validator: checkUserName, trigger: "blur" }
                ]
            }
        };
    },
    create() {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { // 检查通过 提交
                    axios.get("http://localhost:8080/register", {
                        params: {
                            username: this.ruleForm.username,
                            password: this.ruleForm.pass
                        }
                    }).then(response => {
                        if (response.data == true) {
                            this.$message({
                                message: "注册成功",
                                type: "success"
                            });
                            VueRouter.push("/login");
                        }
                        else {
                            this.$message.error("注册失败");
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
        goback(){
          VueRouter.push('/login');
        }
    },
    components: { Header, Footer }
}

</script>
<style lang="scss" scoped>
  .registerBody{
    width: 1517px;
    height: 781px;
    background-image: url('../assets/loginbackground.png');
    overflow: hidden;
  }
  .registerBox{
    width: 426px;
    height: 510px;
    margin: 0 auto;
    margin-top: 122px;
    margin-left: 957px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // text-align: center;
    background-image: url('../assets/loginBodyBackGround.jpg');
  }
</style>