"use strict";(self["webpackChunkbxxt"]=self["webpackChunkbxxt"]||[]).push([[588],{4982:function(n,t,s){s.d(t,{b:function(){return e},n:function(){return u}});var o=s(7707);function e(){return(0,o.W)({url:"/my/getUserInfo"})}function u(){return(0,o.W)({url:"/my/logOut",method:"post"})}},7643:function(n,t,s){s.r(t),s.d(t,{default:function(){return T}});var o=s(6252),e=s(3577);const u=n=>((0,o.dD)("data-v-3145aa68"),n=n(),(0,o.Cn)(),n),a=(0,o.Uk)("个人中心"),l={class:"use-body"},r={class:"user-info"},c={class:"info"},i=u((()=>(0,o._)("img",{src:"http://nxbx.ejianlong.com:8086/assets/images/favicon.ico",alt:""},null,-1))),v={class:"user-desc"},d=u((()=>(0,o._)("div",{class:"name"},"个性签名：机会只留给有准备的人",-1))),m={class:"user-list"},f=u((()=>(0,o._)("span",null,"关于我们",-1))),p={style:{margin:"16px"}},_=(0,o.Uk)("退出登录");function b(n,t,s,u,b,g){const h=(0,o.up)("nav-bar"),k=(0,o.up)("van-icon"),w=(0,o.up)("van-button");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(h,null,{left:(0,o.w5)((()=>[])),default:(0,o.w5)((()=>[a])),_:1}),(0,o._)("div",l,[(0,o._)("div",r,[(0,o._)("div",c,[i,(0,o._)("div",v,[(0,o._)("div",null,"昵称："+(0,e.zw)(n.user.username),1),(0,o._)("div",null,"登录名："+(0,e.zw)(n.user.username),1),d])])]),(0,o._)("ul",m,[(0,o._)("li",{class:"van-hairline--bottom",onClick:t[0]||(t[0]=n=>u.goTo("/about"))},[f,(0,o.Wm)(k,{class:"icon",name:"arrow"})])]),(0,o._)("div",p,[(0,o.Wm)(w,{onClick:u.tologout,round:"",block:"",color:"#44ba80"},{default:(0,o.w5)((()=>[_])),_:1},8,["onClick"])])])])}s(8479);var g=s(8274),h=s(3204),k=s(4982),w=s(2262),x=s(2119),C=s(3907),y={name:"Profile",components:{NavBar:h.Z},setup(){const n=(0,x.tv)(),t=(0,C.oR)(),s=(0,w.qj)({user:{}});(0,o.bv)((()=>{s.user=t.state.user}));const e=()=>{(0,k.n)().then((s=>{"204"==s.status&&(g.Z.success("退出成功"),localStorage.removeItem("token"),t.commit("setIslogin",!1),setTimeout((()=>{n.push({path:"/login"})}),500))}))},u=(t,s)=>{n.push({path:t,query:s||{}})};return{...(0,w.BK)(s),goTo:u,tologout:e}}},W=s(3744);const I=(0,W.Z)(y,[["render",b],["__scopeId","data-v-3145aa68"]]);var T=I}}]);
//# sourceMappingURL=588.0ff3e182.js.map