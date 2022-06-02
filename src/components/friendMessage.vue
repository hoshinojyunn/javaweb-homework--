<template>
  <div class="friendMessage">
    <el-page-header @back="goBack" :content="friendName+'给你的消息'" style="margin-bottom: 5px;margin-top: 5px;">
    </el-page-header>
    <el-table
      :data="friendMessage"
      style="width: 100%;overflow: scroll;" class="table">
      <el-table-column
        prop="createDate"
        label="消息发送时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="message"
        label="消息内容">
      </el-table-column>
    </el-table>
  </div>


</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from '../router/index';
Vue.use(VueAxios,axios);
export default {
    created: function(){
        this.friendId = this.$route.params.friendId;
        this.friendName = this.$route.params.friendName;
        axios.get('http://localhost:8080/getFriendMessage',{
            params:{
                friendId: this.friendId
            }
        }).then(response=>{
            this.friendMessage = response.data;
            console.log(this.friendMessage);
        });
    },
data(){
    
return{
    friendId: null,
    friendName: null,
    friendMessage: null
}
},
create(){

},
methods:{
    goBack: function(){
        VueRouter.push('/myMessage');
    },
    formatDate: function(val){
        if(val!=null){
            var date = new Date(val);
            return date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();
        }
        return null;
    }
}
}

</script>
<style scoped>

    .friendMessage{
      float: left;
      width: 1235px;
      height: 781px;
      background-color: #f2f2f2;
    }
    .table{
        float:left;
        width: 1235px;
        height: 747px;
    }
</style>