<template>
  <div class="groupMessage">
    <el-page-header @back="goBack" :content="groupName+'的事件'" style="margin-bottom: 5px;margin-top: 5px;">
    </el-page-header>
    <el-table
      :data="groupMessage"
      style="width: 100%;overflow: scroll;" class="table" height="721"> 
      <el-table-column
        prop="groupEventId"
        label="事件编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="eventName"
        label="事件标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="eventDescription"
        label="事件描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
            <i class="el-icon-delete"></i>
            <el-button @click="deleteEvent(scope.row.groupEventId)" type="text" size="small">删除</el-button>
        </template>
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
        this.groupId = this.$route.params.groupId;
        this.groupName = this.$route.params.groupName;
        axios.get('http://localhost:8080/getGroupMessage',{
            params:{
                groupId: this.groupId
            }
        }).then(response=>{
            this.groupMessage = response.data;
            console.log(this.groupMessage);
            for(let item of this.groupMessage){
                item.startTime = this.formatDate(item.startTime);
                item.endTime = this.formatDate(item.endTime);
            }
            this.groupMessage.sort(function(a,b){
                return Date.parse(a.startTime)-Date.parse(b.startTime);
            });
        });
    },
    inject: ['reload'],
data(){
    
return{
    groupId: null,
    groupName: null,
    groupMessage: null
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
    },
    deleteEvent: function(event){
      this.$confirm('此操作将永久删除该事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('http://localhost:8080/deleteGroupEvent',{
            params: {
                groupId: this.groupId,
                eventId: event
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
    fresh(){
        this.reload();
    }
}
}

</script>
<style scoped>

    .groupMessage{
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