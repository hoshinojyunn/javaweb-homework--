<!-- 
  
-->
<template>
  <div>
    <Header></Header>
    <div class="loginbody">
      <div class="loginbox">
        <div style="margin-bottom: 25px;font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;font-size: 30px;">登录
        </div>
        <el-form status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" size="medium">
            <el-col :span="16">
              <el-input type="text" v-model="username" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="pass" size="medium">
            <el-col :span="16">
              <el-input type="password" v-model="password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="margin: 0 auto">
            <el-col :span="16">
              <el-button type="primary" @click="onSubmit" class="submit" :loading="logging">登录</el-button>
              <el-button @click="register">注册</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        
      </div>
        
      
    
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
  .loginbody{
    width: 1517px;
    height: 781px;
    background-image: url('../assets/loginbackground.png');
    overflow: hidden;
  }
  .loginbox{
    
    width: 426px;
    height: 510px;
    margin-top: 122px;
    margin-left: 957px;
    background-color: #ffffff;
    font-size: 30px;
    background-image: url('../assets/loginBodyBackGround.jpg');
  }
  .loginbox .form{
    margin-top: 50px;
    font-size: 15px;
  }
</style>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index'
import Header from './header/header.vue';
import Footer from './footer/footer.vue';
Vue.use(VueAxios,axios);
export default {
    name: "Login",
    inject: ['reload'],
    data() {
        return {
            username: null,
            password: null,
            loginState: null,
            logging: false
        };
    },
    methods: {
        onSubmit(event) {
            this.logging = true;
            // var formData = new FormData();
            // formData.append("username", "hoshino");
            // formData.append("password", "123456");
            axios.get("http://localhost:8080/login", {
                params: {
                    username: this.username,
                    password: this.password
                }
            }).then(response => {
                axios.get('http://localhost:8080/getAvatar').then(response=>{
                  var avatar = 'http://localhost:8080/avatar/'+response.data;
                  window.sessionStorage.setItem('avatar',avatar);
                  console.log(avatar);
                  VueRouter.push("/main");
                });
                this.logging = false;
                this.loginState = response.data;
                if (this.loginState != null) {
                    window.sessionStorage.setItem("username",JSON.stringify(response.data.username));
                    window.sessionStorage.setItem("id",JSON.stringify(response.data.id));
                    
                }
                else {
                    this.loggin = false;
                    this.$message.error('账号或密码错误');
                    this.fresh();
                }
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            });
             
        },
        register(){
          VueRouter.push('/register');
        },
        fresh(){
          this.reload();
        }
    },
    components: { Header, Footer }
}
</script>

