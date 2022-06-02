<template>
  <div class='myfriendBody'>
      <div class="myFriend">
        <div class="top"><img src="../assets/friendLogo.png">我的好友&nbsp&nbsp<i class="el-icon-plus" style="vertical-align: middle;"></i><a href="#" @click="addfriend" class="al">添加好友</a></div>
        <el-table
          :data="friends"
          style="width: 100%;overflow-y: scroll;" class="table">
          <el-table-column
            prop="id"
            label="好友ID"
            width="420">
          </el-table-column>
          <el-table-column
            prop="username"
            label="好友名字"
            width="180">
          </el-table-column>
        </el-table>
        
        <!-- 添加好友弹窗 -->
        <el-dialog title="新增好友" :visible.sync="userVisible" width="30%">
          <form>
            输入好友id:&nbsp<input type="text" name="friendId" v-model="friendId">
          </form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitAddFriend">保存</el-button>
            <el-button @click="userVisible = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="myGroup">
        <div class="top"><img src="../assets/groupLogo.png">我的群组&nbsp&nbsp<i class="el-icon-plus" style="vertical-align: middle;"></i><a href="#" @click="addgroup" class="al">加入群组</a></div>

        <el-table
          :data="groups"
          style="width: 100%;overflow-y: scroll;" class="table">
          <el-table-column
            prop="groupId"
            label="群组ID"
            width="420">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="群组名字"
            width="180">
          </el-table-column>
        </el-table>
        
        <!-- 添加好友弹窗 -->
        <el-dialog title="加入群组" :visible.sync="groupVisible" width="30%">
          <form>
            输入群组id:&nbsp<input type="text" name="groupId" v-model="groupId">
          </form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitJoinGroup">保存</el-button>
            <el-button @click="groupVisible = false">关闭</el-button>
          </span>
        </el-dialog>

      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);
export default {
   created: function(){
      axios.get('http://localhost:8080/getFriends').then(response=>{
          this.friends = response.data;
          console.log(this.friends);
      });
      axios.get('http://localhost:8080/getGroups').then(response=>{
          this.groups = response.data;
          console.log(this.groups);
      });
   },
data(){
return{
  friends: null,
  groups: null,
  userVisible: false,
  groupVisible: false,
  friendId: null,
  groupId: null
}
},
inject: ['reload'],
create(){

},
methods:{
  
  addfriend: function(){
    this.userVisible = true;
  },
  addgroup: function(){
    this.groupVisible = true;
  },
  submitAddFriend: function(){
    this.userVisible = false;
    axios.get('http://localhost:8080/addFriend',{
      params: {
        'friendId': this.friendId
      }
    }).then(response=>{
        console.log(response);
        if(response.data==true){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        }else{
          this.$message.error('好友已经存在或找不到好友，添加错误');
        }
        this.fresh();
    });
  },
  submitJoinGroup: function(){
    this.groupVisible = false;
    axios.get('http://localhost:8080/joinGroup',{
      params: {
        'groupId': this.groupId
      }
    }).then(response=>{
        console.log(response);
        if(response.data==true){
          this.$message({
            message: '加入成功',
            type: 'success'
          });
        }else{
          this.$message.error('已经加入了群组或找不到该群组，加入失败');
        }
        this.fresh();
    });
  },
  fresh(){
    this.reload();
  }
}
}

</script>
<style scoped>

  .myfriendBody{
      float: left;
      width: 1235px;
      height: 781px;
      background-color: #ffffff;
  }
  .myFriend{
      float: left;
      width: 617px;
      height: 781px;
      font-size: 45px;
      
  }
  .myFriend a{
    font-size: 30px;
  }
  .myGroup{
      float: left;
      width: 617px;
      height: 781px;
      font-size: 45px;
  }
  .myGroup a{
    font-size: 30px;
  }
  .myFriend img{
    vertical-align: middle;
  }
  .myGroup img{
    vertical-align: middle;
  }
  .table{
    width: 617px;
    height: 721px;
  }
  .top{
    height: 60px;
  }
  .al{
    text-decoration: none;
  }
</style>