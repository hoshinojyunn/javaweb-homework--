import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


import Login from "../views/Login";
import Main from "../views/Main";
import Myevent from "../components/myEvent";
import MyMessage from "../components/myMessage";
import MyFriend from "../components/myfriend";
import Setting from "../components/setting";
import Register from "../views/Register";
import axios from 'axios';
import VueAxios from 'vue-axios';
import manageGroups from '../components/manageGroups';
import groupMessage from '../components/groupMessage';
import friendMessage from '../components/friendMessage';
import manageFriends from '../components/manageFriends';
import personalSetting from '../components/personalSetting';
import securitySetting from '../components/securitySetting';
Vue.use(VueAxios,axios);
export default new VueRouter({
  routes: [
    {
      path: "/main",
      component: Main,
      beforeEnter: (to, from, next) => {
        /* must call `next` */
        console.log('checking');
        axios.get('http://localhost:8080/check').then(response=>{
          if(response.data==true){
            next();
          }else{
            alert('您还未登录');
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            });
          }
        })
      },
      children: [
        {
          path: '/myevent',
          component: Myevent,
          beforeEnter: (to, from, next) => {
            /* must call `next` */
            axios.get('http://localhost:8080/check').then(response=>{
              if(response.data==true){
                next();
              }else{
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                });
              }
            })
          }
        },
        {
          path: '/mymessage',
          component: MyMessage,
          beforeEnter: (to, from, next) => {
            /* must call `next` */
            axios.get('http://localhost:8080/check').then(response=>{
              if(response.data==true){
                next();
              }else{
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                });
              }
            })
          }
        },
        {
          path: '/myfriend',
          component: MyFriend,
          beforeEnter: (to, from, next) => {
            /* must call `next` */
            axios.get('http://localhost:8080/check').then(response=>{
              if(response.data==true){
                next();
              }else{
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                });
              }
            })
          }
        },
        {
          path: '/setting',
          component: Setting,
          beforeEnter: (to, from, next) => {
            /* must call `next` */
            axios.get('http://localhost:8080/check').then(response=>{
              if(response.data==true){
                next();
              }else{
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                });
              }
            })
          }
        },
        {
          path: '/manageGroups',
          component: manageGroups
        },
        {
          name: 'groupMessage',
          path: '/groupMessage/:groupId/:groupName',
          component: groupMessage
        },
        {
          name: 'friendMessage',
          path: '/friendMessage/:friendId/:friendName',
          component: friendMessage
        },
        {
          path: '/manageFriends',
          component: manageFriends
        },
        {
          path: '/personalSetting',
          component: personalSetting
        },
        {
          path: '/securitySetting',
          component: securitySetting
        }
      ] 
    },
    {
    path: '/login',
      component: Login
    },
    {
      path: '/gohome',
      redirect: '/main',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/',
        component: Login
    }
  ]
},)

