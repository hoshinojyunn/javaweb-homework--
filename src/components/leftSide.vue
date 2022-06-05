<template>
  <div class='leftside'>
    <div id="profile">
        <img :src="avatar" width="100%" height="100%">
    </div>
    <div>
        <i class="el-icon-document"></i>
        <el-button type="text" @click="myEvent" style="font-size:18px;">我的事件</el-button>
    </div>
    <div>
        <i class="el-icon-message-solid"></i>
        <el-button type="text" @click="myMessage" style="font-size:18px;">我的消息</el-button>
    </div>
    <div>
        <i class="el-icon-s-custom"></i>
        <el-button type="text" @click="myFriend" style="font-size:18px;">我的好友</el-button>
    </div>
    <div>
        <i class="el-icon-setting"></i>
        <el-button type="text" @click="setting" style="font-size:18px;">设置</el-button>
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
    name: "leftSide",
    created: function(){
        this.avatar = window.sessionStorage.getItem('avatar'); 
    },
data(){
return{
    avatar: null
}
},
create(){

},
methods:{
    myEvent(){
        VueRouter.push('/myEvent');
    },
    myMessage(){
        VueRouter.push('/myMessage');
    },
    myFriend(){
        VueRouter.push('/myFriend');
    },
    setting(){
        VueRouter.push('/setting');
    }
}
}

</script>
<style scoped>

    .leftside{
        float: left;
        width: 265px;
        height: 781px;
        background-color: #eeeeee;
        /* background-image: url('../assets/mainBackGround.jpg'); */
    }
    /* .choice{
        
    } */
    .leftside>div{
        width: 245px;
        height: 60px;
        color: black;
        background-color: #ffffff;
        margin: 0 auto;
        margin-bottom: 67px ;
        text-align: center;
        line-height: 60px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    #profile{
        width: 239px;
        height: 235px;
        border-radius: 50%;
        line-height: 240px;
        box-shadow: 0px 2px 16px -4px black;
        margin: 0 auto;
        margin-bottom: 67px;
        margin-top: 10px;
    }
    #profile>img{
        width: 239px;
        height: 235px;
        border-radius: 50%;
        line-height: 240px;
        box-shadow: 0px 2px 16px -4px black;
        margin: 0 auto;
        margin-bottom: 67px;
    }
</style>