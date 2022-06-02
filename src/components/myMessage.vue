<template>
  <div class="myMessage">
    <div class="friendMessage">
      好友消息<img src="../assets/friendMessageLogo.png">
      <el-table
        :data="friends"
        style="width: 100%">
        <el-table-column prop="id" label="好友ID" width="120">
        </el-table-column>
        <el-table-column prop="username" label="好友名称" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <i class="el-icon-tickets"></i>
            <el-button @click="setFriendId(scope.row.id,scope.row.username)" type="text" size="small">查看消息</el-button>
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
    <div class="groupMessage">
      群组消息<img src="../assets/groupMessageLogo.png">
      <el-table
        :data="groups"
        style="width: 100%">
        <el-table-column prop="groupId" label="群组ID" width="120">
        </el-table-column>
        <el-table-column prop="groupName" label="群组名称" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <i class="el-icon-tickets"></i>
            <el-button @click="setGroupId(scope.row.groupId,scope.row.groupName)" type="text" size="small">查看消息</el-button>
            <i class="el-icon-edit"></i>
            <el-button @click="setSendGroupId(scope.row.groupId,scope.row.groupName)" type="text" size="small">发消息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="'向群组 '+sendGroupName+' 发消息'"
        :visible.sync="sendGroupMessageVisible"
        width="30%"
        center>
        <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="消息title">
                <el-input v-model="form1.name"></el-input>
            </el-form-item>
            <el-form-item label="事件时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择开始时间" v-model="form1.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-date-picker placeholder="选择截止时间" v-model="form1.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="消息描述">
                <el-input type="textarea" v-model="form1.desc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sendGroupMessageVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendGroupMessage(GroupId)">确 定</el-button>
        </span>
    </el-dialog>
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
  created:function(){
    axios.get('http://localhost:8080/getFriends').then(response=>{
          this.friends = response.data;
          console.log(this.friends);
      });
    axios.get('http://localhost:8080/getGroups').then(response=>{
        this.groups = response.data;
    });
  }, 
data(){
  
return{
  groups: null,
  GroupId: null,
  form: {
        name: '',
        desc: ''
      },
  form1: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
  friends: null,
  friendId: null,
  sendFriendMessageVisible: false,
  sendTitle: null,
  sendGroupMessageVisible: false,
  sendGroupName: ''
}
},
create(){

},
methods:{ 
    setGroupId: function(index,groupName){
        this.GroupId = index;
        console.log(this.GroupId);
        VueRouter.push({name: 'groupMessage',params:{groupId: this.GroupId,groupName: groupName}});
    },
    setFriendId: function(index,friendName){
        this.friendId = index;
        VueRouter.push({name: 'friendMessage',params: {friendId: this.friendId,friendName: friendName}});
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
    sendGroupMessage: function(groupId){
        this.sendGroupMessageVisible = false;
        axios.get('http://localhost:8080/sendGroupMessage',{
            params: {
                groupId: groupId,
                eventName: this.form1.name,
                startTime: this.form1.date1,
                endTime: this.form1.date2,
                eventDescription:  this.form1.desc
            }
        }).then(response=>{
            console.log(response.data);
            if(response.data==true){
                const h = this.$createElement;
                this.$notify({
                    title: '发布群组消息',
                    message: h('i', { style: 'color: teal'}, '已成功发布')
                });
            }else{
                const h = this.$createElement;
                this.$notify({
                    title: '发布群组消息',
                    message: h('i', { style: 'color: teal'}, '发生错误，发布失败')
                });
            }
        })
    },
    setSendGroupId: function(index,groupName){
        this.sendGroupMessageVisible = true;
        this.GroupId = index;
        this.sendGroupName = groupName;
    }


}
}

</script>
<style scoped>

  .myMessage{
      float: left;
      width: 1235px;
      height: 781px;
      background-color: #f2f2f2;
  }

  .Groups{
      float: left;
      width: 600px;
      height: 40px;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      margin-bottom: 5px;
      font-size: 25px;
  }
  .Friends{
      float: left;
      width: 600px;
      height: 40px;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      margin-bottom: 5px;
      font-size: 25px;
  }


  .myMessage>div{
    float: left;
    width: 617px;
    height: 781px;
    font-size: 50px;
  }
  .friendMessage img{
    vertical-align: middle;
  }
  .groupMessage img{
    vertical-align: middle;
  }
  .groupMessage{
    overflow-y: scroll;
  }
  .friendMessage{
    overflow-y: scroll;
  }
  .detail{
    float: right;
    margin-right: 5px;
    
  }
</style>