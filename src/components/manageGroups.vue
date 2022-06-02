<template>
  <div class="groupsBody">
      <div>
          <el-page-header @back="goBack" content="管理群组" style="margin-bottom: 5px;margin-top: 5px;">
          </el-page-header>
          <el-table
            :data="groups"
            style="width: 100%;overflow-y: scroll;" class="groups" height="747">
                <el-table-column
                    prop="groupId"
                    label="群组ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="groupName"
                    label="群组名称"
                    width="180">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-remove"></i>
                        <el-button @click="setLeaveGroupId(scope.row.groupId,scope.row.groupName)" type="text" size="small">退出</el-button>
                        <i class="el-icon-edit"></i>
                        <el-button @click="setSendGroupId(scope.row.groupId,scope.row.groupName)" type="text" size="small">发布消息</el-button>
                    </template>
                </el-table-column>
            </el-table>
          <el-dialog
            :title="'离开 '+leaveGroupName"
            :visible.sync="deleteVisible"
            width="30%"
            center>
            <span>确定退出该群组吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="leaveGroup(leaveGroupId)">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :title="'向群组 '+sendGroupName+' 发消息'"
            :visible.sync="sendGroupMessageVisible"
            width="30%"
            center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="消息title">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="事件时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker placeholder="选择截止时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="消息描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sendGroupMessageVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendGroupMessage(sendGroupId)">确 定</el-button>
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
    created: function(){
        axios.get('http://localhost:8080/getGroups').then(response=>{
          this.groups = response.data;
          console.log(this.groups);
          this.groups.sort(function(a,b){
            return a.groupId-b.groupId;
          });
        });
        
    },
data(){
return{
    groups: null,
    deleteVisible: false,
    sendGroupMessageVisible: false,
    leaveGroupId: null,
    sendGroupId: null,
    form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
    },
    sendGroupName: '',
    leaveGroupName: ''
}
},
create(){

},
inject: ['reload'],
methods:{
    setLeaveGroupId: function(index,groupName){
        this.deleteVisible = true;
        this.leaveGroupId = index;
        this.leaveGroupName = groupName;
    },
    setSendGroupId: function(index,groupName){
        this.sendGroupMessageVisible = true;
        this.sendGroupId = index;
        this.sendGroupName = groupName;
    },
    leaveGroup: function(groupId){
        this.deleteVisible = false;
        axios.get('http://localhost:8080/leaveGroup',{
            params: {
                groupId: groupId
            }
        }).then(response=>{
            if(response.data==true){
                let deleteIndex = 0;
                for(let i =0;i<this.groups.length;++i){
                    console.log(this.groups[i]);
                    if(this.groups[i].groupId == this.leaveGroupId){
                        deleteIndex = i;
                    }
                }
                this.groups.splice(deleteIndex,1);
                this.leaveGroupId = null;
                const h = this.$createElement;

                this.$notify({
                    title: '退出群组',
                    message: h('i', { style: 'color: teal'}, '您已成功退出该群组')
                });
                this.$forceUpdate();
            }else{
                const h = this.$createElement;

                this.$notify({
                    title: '退出群组',
                    message: h('i', { style: 'color: teal'}, '发生错误，无法退出该群组')
                });
            }
            this.fresh();
        });
    },
    sendGroupMessage: function(groupId){
        console.log(this.sendGroupId);
        this.sendGroupMessageVisible = false;
        axios.get('http://localhost:8080/sendGroupMessage',{
            params: {
                groupId: groupId,
                eventName: this.form.name,
                startTime: this.form.date1,
                endTime: this.form.date2,
                eventDescription:  this.form.desc
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
    goBack: function(){
        VueRouter.push('/setting');
    },
    fresh(){
        this.reload();
    }
}
}

</script>
<style scoped>

    .groupsBody{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #f2f2f2;
    }
</style>