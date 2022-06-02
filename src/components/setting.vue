<template>
  <div class="setting">
    <div class="personalResource">
      <img src="../assets/personalResourceLogo.png">
      <el-button type="text" @click="personalSetting" style="font-size:35px;vertical-align: middle;">个人资料</el-button>
      <!-- <router-link to="/personalSetting">个人资料</router-link> -->
    </div>
    <div class="manageFriends">
      <img src="../assets/manageFriendsLogo.png">
      <el-button type="text" @click="manageFriends" style="font-size:35px;vertical-align: middle;">管理好友</el-button>
      <!-- <router-link to="/manageFriends">管理好友</router-link> -->
    </div>
    <div class="manageGroups">
      <img src="../assets/manageGroupsLgo.png">
      <el-button type="text" @click="manageGroups" style="font-size:35px;vertical-align: middle;">管理群组</el-button>
      <!-- <router-link to="/manageGroups">管理群组</router-link> -->
    </div>
    <div class="safeSetting">
      <img src="../assets/safeSettingLogo.png">
      <el-button type="text" @click="securitySetting" style="font-size:35px;vertical-align: middle;">安全设置</el-button>
      <!-- <router-link to="/securitySetting">安全设置</router-link> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index';
Vue.use(VueAxios,axios);
export default {
   
data(){
return{

}
},
create(){

},
methods:{
  personalSetting(){
    VueRouter.push('/personalSetting');
  },
  manageFriends(){
    VueRouter.push('/manageFriends');
  },
  manageGroups(){
    VueRouter.push('/manageGroups');
  },
  securitySetting(){
    VueRouter.push('/securitySetting');
  }
}
}

</script>
<style scoped>
  .setting{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #ffffff;
  }
  .setting>div{
    line-height: 180px;
    width: 1235px;
    height: 195px;
    border-bottom: 0.1px solid #000;
  }
  .setting>div>img{
    vertical-align: middle;
  }
</style>