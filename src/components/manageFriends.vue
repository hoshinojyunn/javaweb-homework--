<template>
  <div class="friendsBody">
    <el-page-header @back="goBack" content="管理好友" style="margin-bottom: 5px;margin-top: 5px;">
    </el-page-header>
    <el-table
    :data="friends"
    style="width: 100%;overflow-y: scroll;" class="friends" height="747">
        <el-table-column
            prop="id"
            label="好友ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="username"
            label="好友名称"
            width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <i class="el-icon-delete"></i>
                <el-button @click="deleteFriend(scope.row.id)" type="text" size="small">删除好友</el-button>
                <i class="el-icon-edit"></i>
                <el-button @click="sendToFriend(scope.row.id,scope.row.username)" type="text" size="small">发消息</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
            :title="sendTitle"
            :visible.sync="sendFriendMessageVisible"
            width="30%"
            center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="消息title">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="消息描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sendFriendMessageVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendFriendMessage()">确 定</el-button>
            </span>
        </el-dialog>
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
        axios.get('http://localhost:8080/getFriends').then(response=>{
          this.friends = response.data;
          console.log(this.friends);
        });
    },
data(){
return{
    friends: null,
    sendFriendMessageVisible: false,
    friendId: null,
    form: {
        name: '',
        desc: ''
    },
    sendTitle : null
}
},
create(){

},
inject: ['reload'],
methods:{
    goBack: function(){
        VueRouter.push('/setting');
    },
    deleteFriend: function(friendId){
        this.$confirm('您要删除该好友吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('http://localhost:8080/deleteFriend',{
            params: {
                friendId: friendId
            }
          }).then(response=>{
            if(response.data==true){
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
            }else{
                this.$message.error('删除失败')
            }
            this.fresh();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    sendToFriend: function(friendId,friendName){
      this.sendFriendMessageVisible = true;
      this.friendId = friendId;
      this.sendTitle = '发给'+friendName+"的消息";
    },
    sendFriendMessage: function(){
        this.sendFriendMessageVisible = false;
        axios.get('http://localhost:8080/sendMessageToFriend',{
          params: {
            friendId: this.friendId,
            title: this.form.name,
            message: this.form.desc
          }
        }).then(response=>{
          if(response.data==true){
            this.$message({
              message: '发送成功',
              type: 'success'
            });
          }else{
            this.$message.error('发送失败');
          }
        });
    },
    fresh(){
        this.reload();
    }
}
}

</script>
<style scoped>

    .friendsBody{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #f2f2f2;
    }
</style>