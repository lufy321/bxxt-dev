"use strict";(self["webpackChunkbxxt"]=self["webpackChunkbxxt"]||[]).push([[152],{7298:function(e,o,a){a.d(o,{x:function(){return s},z:function(){return t}});var n=a(7707);function s(e){return(0,n.W)({url:"/api/login",method:"post",data:e})}function t(e){return(0,n.W)({url:"/api/register",method:"post",data:e})}},3560:function(e,o,a){a.r(o),a.d(o,{default:function(){return _}});var n=a(6252);const s={class:"register"},t=(0,n.Uk)("新用户注册"),r={class:"top-img"},l={class:"su-button"},u=(0,n.Uk)(" 提交 ");function i(e,o,a,i,d,m){const p=(0,n.up)("nav-bar"),c=(0,n.up)("van-image"),f=(0,n.up)("van-field"),g=(0,n.up)("van-button"),w=(0,n.up)("van-form");return(0,n.wg)(),(0,n.iD)("div",s,[(0,n.Wm)(p,null,{left:(0,n.w5)((()=>[])),default:(0,n.w5)((()=>[t])),_:1}),(0,n._)("div",r,[(0,n.Wm)(c,{width:"10rem",height:"5rem",fit:"contain",src:e.logo},null,8,["src"])]),(0,n.Wm)(w,{onSubmit:i.onSubmit},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{modelValue:e.username,"onUpdate:modelValue":o[0]||(o[0]=o=>e.username=o),name:"工号",label:"工号",placeholder:"请输入您的工号",rules:[{required:!0,message:"请填写工号"}]},null,8,["modelValue"]),(0,n.Wm)(f,{modelValue:e.password,"onUpdate:modelValue":o[1]||(o[1]=o=>e.password=o),type:"password",name:"密码",label:"密码",placeholder:"密码",rules:[{required:!0,message:"请填写密码"}]},null,8,["modelValue"]),(0,n.Wm)(f,{modelValue:e.password_confirmation,"onUpdate:modelValue":o[2]||(o[2]=o=>e.password_confirmation=o),type:"password",name:"确认密码",label:"确认密码",placeholder:"请确认密码",rules:[{required:!0,message:"两次密码不相同，请重新输入"}]},null,8,["modelValue"]),(0,n._)("div",l,[(0,n._)("div",{class:"link-login",onClick:o[3]||(o[3]=o=>e.$router.push({path:"/login"}))}," 已有账号，立即登录 "),(0,n.Wm)(g,{round:"",block:"",type:"info",color:"#44b883","native-type":"submit"},{default:(0,n.w5)((()=>[u])),_:1})])])),_:1},8,["onSubmit"])])}a(8479);var d=a(8274),m=(a(4447),a(8762)),p=a(3204),c=a(2119),f=a(2262),g=a(7298),w=a(3907),b={name:"Register",components:{NavBar:p.Z},setup(){(0,w.oR)();const e=(0,c.tv)(),o=(0,f.qj)({username:"",password:"",password_confirmation:""}),a=(0,f.qj)({logo:"http://nxbx.ejianlong.com:8086/assets/images/logo.png"}),n=()=>{o.password!==o.password_confirmation?(0,m.Z)("两次密码不一致，请重新输入!"):(d.Z.loading({duration:0,message:"注册中...",forbidClick:!0}),(0,g.z)(o).then((a=>{d.Z.clear(),0===a.status?(d.Z.success("注册成功"),setTimeout((()=>{e.push({path:"/login"})}),1e3)):1===a.status&&(0,m.Z)(a),console.log(a),o.password="",o.password_confirmation=""})))};return{...(0,f.BK)(o),...(0,f.BK)(a),onSubmit:n,image:a}}},h=a(3744);const v=(0,h.Z)(b,[["render",i],["__scopeId","data-v-663f5620"]]);var _=v}}]);
//# sourceMappingURL=152.93e60c94.js.map