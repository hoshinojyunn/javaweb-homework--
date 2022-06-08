<template>
  <div style="width:1500px">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div class="logo" style="margin-top: 15px;margin-left: 20px"><img src="../../assets/logo.png"></div>
      <div class="welcome" style="float: left" :v-model="this.username">{{this.username}}</div>
      <button class="exit" @click="logout">退出</button>
      <el-submenu index="setting" style="float:right">
        <template slot="title">设置</template>
        <el-menu-item index="personalSetting">个人资料</el-menu-item>
        <el-menu-item index="manageFriend" route="/manageFriends">管理好友</el-menu-item>
        <el-menu-item index="manageGroup" route="/manageGroups">管理群组</el-menu-item>
        <el-menu-item index="securitySetting" route="/securitySetting">安全设置</el-menu-item>
      </el-submenu>
      <el-menu-item index="myFriend" style="float: right;margin-right: 30px;">我的好友</el-menu-item>
      <el-menu-item index="myMessage" style="float: right;margin-right: 30px;">我的消息</el-menu-item>
      <el-menu-item index="myEvent" style="margin-right: 30px;float:right">我的事件</el-menu-item>
      <!-- <div style="float: right;box-shadow: 0px 2px 16px -4px black;border-radius: 4px;margin-right: 30px;margin-top:10px;height: 40px;width: 40px;">
        <img :v-model="this.circleUrl" :src="circleUrl" style="width:100%;height:100%"/>
      </div> -->
      <el-popover
        placement="bottom"
        width="150"
        trigger="hover">
        <div>你的ID：{{this.id}}</div><br>
        <el-link type="primary" @click="toPersonalSetting">个人信息</el-link><br><br>
        <el-link type="primary" @click="logout">退出</el-link>
        <div slot="reference" style="float: right;box-shadow: 0px 2px 16px -4px black;border-radius: 4px;margin-right: 30px;margin-top:10px;height: 40px;width: 40px;">
          <img :v-model="this.circleUrl" :src="circleUrl" style="width:100%;height:100%"/>
        </div>
      </el-popover>
      <!-- <el-avatar fit="scale-down" shape="square" :size="45" :v-model="this.circleUrl" :src="circleUrl" style="float: right;margin-right: 30px;margin-top:8px"></el-avatar> -->
    </el-menu>
  </div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../../router/index';
Vue.use(VueAxios,axios);
export default {
  name: "Profile",
  created: function(){
    let userName = window.sessionStorage.getItem("username");
    console.log(userName);
    if(userName){
      this.username = '欢迎，'+userName;
    }
    this.id = window.sessionStorage.getItem('id');
    let avatar = window.sessionStorage.getItem('avatar');
    if(avatar){
      this.circleUrl = avatar;
    }else{
      axios.get('http://localhost:8080/getAvatar').then(response=>{
        this.circleUrl = 'http://localhost:8080/avatar/'+response.data;
      });
    }
  },
  methods: {
    logout: function(){
      axios.get('http://localhost:8080/logout').then(response=>{
        if(response.data==true){
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          window.sessionStorage.removeItem("username");
          window.sessionStorage.removeItem("avatar");
          window.sessionStorage.removeItem("id");
        }else{
          this.$message.error('您还没登录');
        }
        VueRouter.push('/login');
      });
    },
    handleSelect(key, keyPath) {
        console.log(key);
        switch(key){
          case 'myEvent': 
            VueRouter.push('/myEvent');
            break;
          case 'myMessage':
            VueRouter.push('/myMessage');
            break;
          case 'myFriend':
            VueRouter.push('/myFriend');
            break;
          case 'personalSetting':
            VueRouter.push('/personalSetting');
            break;
          case 'manageFriend': 
            VueRouter.push('/manageFriends');
            break;
          case 'manageGroup': 
            VueRouter.push('/manageGroups');
            break;
          case 'securitySetting': 
            VueRouter.push('/securitySetting');
            break;
          default: 
            VueRouter.push('/main');
            break;
        }
    },
    toPersonalSetting: function(){
      VueRouter.push('/personalSetting');
    }
  },
  data(){
    return {
      activeIndex: 'myEvent',
      username : '',
      circleUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      id: null
    }
  }
}
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .header{
    width:1500px;
    height: 23px;
    margin: 23px auto;
    background-color: #ffffff;
  }
  .logo{
    float:left;
  }
  .exit{
    float: right;
    color: white;
    margin-top: 18px;
    margin-right: 20px;
    margin-left: 10px;
    background-color: #03bb7a; /* Green */
    border: none;
    color: white;
    padding: 4px 12px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 4px;
  }
  .logo img{
    vertical-align: middle;
  }
  .welcome{
    background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
    text-shadow: 5px -5px black, 4px -4px white;
    font-weight: bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    margin-top: 24px;
    margin-left: 20px;
}
</style>