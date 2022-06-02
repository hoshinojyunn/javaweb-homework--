<template>
  <div class='myevent'>
    <div style="height: 60px">
        <el-button type="primary" style="float: left;margin:10px" @click="visible = true">创建事件</el-button>
        <el-dialog
        title="创建事件"
        :visible.sync="visible"
        width="30%"
        center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="事件title">
                <el-input v-model="form.title"></el-input>
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
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="addEvent()">确 定</el-button>
        </span>
    </el-dialog>
    </div>
    <el-table
      :data="eventsData"
      style="width: 100%;" class="events" height="721">
        <el-table-column
            prop="eventId"
            label="事件ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="eventName"
            label="事件名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="startTime"
            label="开始时间"
            width="180">
        </el-table-column>
        <el-table-column
            prop="endTime"
            label="结束时间"
            width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <i class="el-icon-tickets"></i>
                <el-button @click="detailAboat(scope.row.eventId)" type="text" size="small">查看详细</el-button>
                <i class="el-icon-delete"></i>
                <el-button @click="deleteEvent(scope.row.eventId)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
        title="详细信息"
        :visible.sync="detailVisible"
        width="30%">
        <span v-if="detailMessage==''">这个事件没有详细描述信息哟</span>
        <span v-else>{{detailMessage}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="detailVisible = false">取 消</el-button>
            <el-button type="primary" @click="detailVisible = false">确 定</el-button>
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
    name: "myevent",
    created: function(){
        axios.get('http://localhost:8080/myEvent').then(response=>{
            this.eventsData = response.data;
            for(let item of this.eventsData){
                item.startTime = this.formatDate(item.startTime);
                item.endTime = this.formatDate(item.endTime);
            }
            this.eventsData.sort(function(a,b){
                return Date.parse(a.startTime)-Date.parse(b.startTime);
            });
        }).catch(err=>{
            console.log(err);
        });
    },
    inject: ['reload'],
data(){
return{
    eventsData: null,
    item: null,
    form: {
        title: null,
        desc: null,
        date1: null,
        date2: null
    },
    visible: false,
    detailVisible: false,
    detailId: null,
    detailMessage: null
}
},
create(){

},
methods:{
    getWeek:function(dateString) {
            var date;
            if (!dateString) {
                date = new Date();
            } else {
                var dateArray = dateString.split("-");
                date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2].slice(0,2));
                console.log(date);
            }
            //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
            //return "星期" + weeks[date.getDay()];
            return "星期" + "日一二三四五六".charAt(date.getDay());
    },
    formatDate: function(val){
        if(val!=null){
            var date = new Date(val);
            return date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate();
        }
        return null;
    },
    addEvent: function(){
        console.log(this.form);
        this.visible = false;
        axios.get('http://localhost:8080/addMyEvent',{
            params: {
                eventName: this.form.title,
                startTime: this.form.date1,
                endTime: this.form.date2,
                eventDescription: this.form.desc
            }
        }).then(response=>{
            if(response.data==true){
                this.$message({
                    message: '创建成功',
                    type: 'success'
                })
            }else{
                this.$message.error('创建失败');
            }
            this.fresh();
        });
    },
    deleteEvent: function(eventId){
        this.$confirm('此操作将永久删除该事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('http://localhost:8080/deleteUserEvent',{
            params: {
                eventId: eventId
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
    detailAboat: function(eventId){
        this.detailId = eventId;
        this.detailVisible = true;
        var index = 0;
        for(let i =0;i<this.eventsData.length;++i){
            if(this.eventsData[i].eventId == eventId){
                index = i;
            }
        }
        this.detailMessage = this.eventsData[index].eventDescription;
        console.log(this.detailMessage);
    },
    fresh(){
        this.reload();
    }
}
}

</script>
<style scoped>

    .myevent{
        float: left;
        width: 1235px;
        height: 781px;
        background-color: #f2f2f2;
    }

</style>