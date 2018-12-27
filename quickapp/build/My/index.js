(function(){
  
  var createPageHandler = function() {
    return !function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var a={};t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=22)}({0:function(e,t,a){"use strict";function n(){return new Promise(function(e,t){u.get({key:"auth",success:function(t){c.Cookie=t,e(!0)},fail:function(t,a){e(!1)}})})}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"get";return console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"),console.log("┃ url: ",d+e),console.log("┃ method: ",a),console.log("┃ data: ",JSON.stringify(t)),console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"),new Promise(function(n,i){o.fetch({url:d+e,data:t,header:c,method:a,success:function(e){n(e)},fail:function(e,t){i(e)}})})}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"get",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n().then(function(n){return n||r?i(e,t,a):new Promise(function(e,t){t("请先登录！")})})}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.withAuth?r(e,t,"post",a.canSkip):i(e,t,"post")}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.withAuth?r(e,t,"get",a.canSkip):i(e,t,"get")}Object.defineProperty(t,"__esModule",{value:!0});var o=$app_require$("@app-module/system.fetch"),u=$app_require$("@app-module/system.storage"),d="http://localtestapi.ejzhi.com/",c={};t.default={login:function(e){return l("api/user/login.do",e)},getCode:function(e){return l("api/user/sendRegisterSMS.do",e)},register:function(e){return l("api/user/register.do",e)},backCode:function(e){return l("api/user/sendFindBackSMS.do",e)},forget:function(e){return l("api/user/findPassword.do",e)},getJobList:function(e){return l("api/job/offline/getList.do",e)},getJobDetails:function(e){return l("api/job/offline/getSingle.do",e)},getisdeliver:function(e){return l("api/job/offline/getisdeliver.do",e)},deliver:function(e){return l("api/job/offline/deliverResume.do",e)},getEnterprise:function(e){return l("api/enterprise/getEnterprise.do",e)},gethotWords:function(e){return l("api/job/offline/getHotWord.do",e)},gethotCitys:function(e){return l("api/city/getHotCity.do",e)},getCitys:function(e){return l("api/city/getCitysForGPS.do",e)},getCityName:function(e){return s("god/map/getCityName.do",e)},showUserResume:function(e){return l("api/user/showUserResume.do",e)},getData:function(e){return l("api/user/getData.do",e)},getJobOfflineList:function(e){return l("api/jobRequest/getJobOfflineList.do",e)},getDaiLuYongList:function(e){return l("api/jobRequest/getDaiLuYongList.do",e)},deldeliverResume:function(e){return s("api/job/offline/deldeliverResume.do",e)},getDaiShangGangList:function(e){return l("api/jobRequest/getDaiShangGangList.do",e)},getDaiJieSuanList:function(e){return l("api/jobRequest/getDaiJieSuanList.do",e)},getYiJieSuanList:function(e){return l("api/jobRequest/getYiJieSuanList.do",e)},getShangGangJiLu:function(e){return l("api/jobRequest/getShangGangJiLu.do",e)},osstoken:function(e){return l("ali/osstoken.do",e)},getmainJobType:function(e){return l("api/job/offline/mainJobType.do",e)},getProvince:function(e){return l("api/city/getProvince.do",e)},getChildrenCity:function(e){return l("api/city/getChildrenCity.do",e)},getArea:function(e){return l("api/city/getArea.do",e)},editUserInfo:function(e){return s("api/user/editUserInfo.do",e)},updateDegree:function(e){return s("api/user/updateDegree.do",e)},getCollectArticle:function(e){return l("lg/collect/list/"+e+"/json",null,{withAuth:!0})},collectArticle:function(e){return s("lg/collect/"+e+"/json",null,{withAuth:!0})},collectArticleAdd:function(e){return s("lg/collect/add/json",e,{withAuth:!0})},uncollectArticle:function(e){return s("lg/uncollect_originId/"+e+"/json",null,{withAuth:!0})},uncollect:function(e,t){return s("lg/uncollect/"+e+"/json",{originId:t},{withAuth:!0})},getCollectWeb:function(){return l("lg/collect/usertools/json",null,{withAuth:!0})},collectWeb:function(e){return s("lg/collect/addtool/json",e,{withAuth:!0})},editCollectWeb:function(e){return s("lg/collect/updatetool/json",e,{withAuth:!0})},deleteCollectWeb:function(e){return s("lg/collect/deletetool/json",{id:e},{withAuth:!0})}}},22:function(e,t,a){var n=a(23),i=a(24),r=a(25);$app_define$("@app-component/index",[],function(e,t,a){r(a,t,e),t.__esModule&&t.default&&(a.exports=t.default),a.exports.template=n,a.exports.style=i}),$app_bootstrap$("@app-component/index",{packagerVersion:"0.0.5"})},23:function(e,t){e.exports={type:"div",attr:{},classList:["page"],children:[{type:"div",attr:{},classList:["flex_page"],children:[{type:"div",attr:{},classList:["flex_page_top"],children:[{type:"div",attr:{},classList:["header"],children:[{type:"div",attr:{},classList:["head_box"],events:{click:"intoResume"},children:[{type:"image",attr:{src:function(){return this.userResume.headerFile?this.userResume.headerFile:"img/head_icon.png"}},classList:["headerurl"]}]},{type:"div",attr:{},classList:["user_box"],shown:function(){return this.isLogin},children:[{type:"div",attr:{},classList:["user_name_box"],children:[{type:"text",attr:{value:function(){return this.userResume.realName?this.userResume.realName:this.userResume.phoneNumber}},classList:["user_name"]}]},{type:"div",attr:{},classList:["user_data"],children:[{type:"div",attr:{},classList:["resume"],children:[{type:"text",attr:{value:function(){return this.userdata.resumedata+"%"}},classList:["resume_nub"]},{type:"text",attr:{value:"完善简历"},classList:["resume_text"],events:{click:"intoResume"}}]},{type:"div",attr:{},classList:["wallet"],children:[{type:"div",attr:{},classList:["wallet_nub"],children:[{type:"text",attr:{value:function(){return this.userdata.wallet}},classList:["wallet_nub_text"]},{type:"text",attr:{value:"元"},classList:["yuan"]}]},{type:"text",attr:{value:"钱包余额"}}]}]}]},{type:"div",attr:{},classList:["notLogin"],shown:function(){return!this.isLogin},events:{click:"intoLogin"},children:[{type:"text",attr:{value:"未登录"},classList:["login_text"]}]}]},{type:"div",attr:{},classList:["deliver_box"],children:[{type:"div",attr:{},classList:["deliver_top"],events:{click:function(e){this.intoDeliver(0,e)}},children:[{type:"text",attr:{value:"我的投递"},classList:["deliver_top_text"]},{type:"image",attr:{src:function(){return this.entrance}}}]},{type:"div",attr:{},classList:["deliver_bottom"],children:[{type:"div",attr:{},classList:["deliver_item"],repeat:function(){return this.deliverlist},events:{click:function(e){this.intoDeliver(this.$item.index,e)}},children:[{type:"div",attr:{},children:[{type:"image",attr:{src:function(){return this.$item.delivericon}},classList:["deliver_item_icon"]}]},{type:"text",attr:{value:function(){return this.$item.delivertext}},classList:["deliver_item_text"]}]}]}]}]},{type:"div",attr:{},classList:["tabbar_box"],children:[{type:"div",attr:{},classList:["tabbar_index"],events:{click:function(e){this.clickTabBar(e)}},children:[{type:"image",attr:{src:function(){return this.indexicon}},classList:["index_icon"]},{type:"text",attr:{value:"首页"},classList:["index_text"]}]},{type:"div",attr:{},classList:["tabbar_my"],children:[{type:"image",attr:{src:function(){return this.myicon}},classList:["my_icon"]},{type:"text",attr:{value:"我的"},classList:["my_text"]}]}]}]}]}},24:function(e,t){e.exports={".page .flex_page":{width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"page"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"flex_page"}]}},".flex_page_top":{width:"100%",display:"flex",flexDirection:"column"},".header":{width:"100%",height:"232px",display:"flex",justifyContent:"flex-start",paddingTop:"26px",paddingRight:"0px",paddingBottom:"26px",paddingLeft:"48px",borderBottomWidth:"1px",borderBottomColor:"#eeeeee"},".header .head_box":{width:"180px",height:"180px",marginRight:"48px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"head_box"}]}},".header .head_box .headerurl":{width:"180px",height:"180px",borderRadius:"90px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"head_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"headerurl"}]}},".header .user_box":{width:"436px",height:"180px",display:"flex",flexDirection:"column",justifyContent:"space-between",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"}]}},".header .user_box .user_name_box":{display:"flex",justifyContent:"space-between",alignItems:"center",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_name_box"}]}},".header .user_box .user_name_box .user_name":{color:"#333333",fontSize:"44px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_name_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_name"}]}},".header .user_box .user_name_box .quit":{width:"36px",height:"42px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_name_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"quit"}]}},".header .user_box .user_data":{display:"flex",justifyContent:"space-between",height:"90px",width:"100%",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"}]}},".header .user_box .user_data .resume":{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"124px",height:"90px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"resume"}]}},".header .user_box .user_data .resume .resume_nub":{fontSize:"34px",color:"#333333",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"resume"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"resume_nub"}]}},".header .user_box .user_data .wallet":{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"90px",width:"240px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet"}]}},".header .user_box .user_data .wallet .wallet_nub .wallet_nub_text":{fontSize:"34px",color:"#37d3cb",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet_nub"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet_nub_text"}]}},".header .user_box .user_data .wallet .wallet_nub .yuan":{fontSize:"20px",color:"#333333",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"user_data"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"wallet_nub"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"yuan"}]}},".header .notLogin":{width:"380px",height:"180px",display:"flex",justifyContent:"flex-start",alignItems:"center",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"notLogin"}]}},".header .notLogin .login_text":{fontSize:"44px",color:"#333333",textAlign:"left",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"header"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"notLogin"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"login_text"}]}},".deliver_box":{height:"232px",width:"100%",borderBottomWidth:"1px",borderBottomColor:"#eeeeee",display:"flex",flexDirection:"column"},".deliver_box .deliver_top":{height:"80px",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"0px",paddingRight:"46px",paddingBottom:"0px",paddingLeft:"46px",marginBottom:"10px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_top"}]}},".deliver_box .deliver_top .deliver_top_text":{fontSize:"30px",color:"#333333",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_top"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_top_text"}]}},".deliver_box .deliver_bottom":{paddingTop:"0px",paddingRight:"70px",paddingBottom:"0px",paddingLeft:"70px",display:"flex",justifyContent:"space-between",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_bottom"}]}},".deliver_box .deliver_bottom .deliver_item":{height:"110px",width:"70px",display:"flex",flexDirection:"column",alignItems:"center",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_bottom"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_item"}]}},".deliver_box .deliver_bottom .deliver_item .deliver_item_icon":{width:"60px",height:"60px",backgroundSize:"100% 100%",marginBottom:"24px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_bottom"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_item"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_item_icon"}]}},".deliver_box .deliver_bottom .deliver_item .deliver_item_text":{fontSize:"22px",color:"#666666",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"deliver_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_bottom"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_item"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"deliver_item_text"}]}},".tabbar_box":{display:"flex",justifyContent:"space-between",alignItems:"center",borderTopWidth:"1px",borderTopColor:"#eeeeee",height:"98px",width:"100%"},".tabbar_box .tabbar_index":{marginLeft:"146px",width:"44px",height:"70px",display:"flex",flexDirection:"column",alignItems:"center",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_index"}]}},".tabbar_box .tabbar_index .index_icon":{width:"44px",height:"44px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_index"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"index_icon"}]}},".tabbar_box .tabbar_index .index_text":{fontSize:"20px",color:"#888888",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_index"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"index_text"}]}},".tabbar_box .tabbar_my":{marginRight:"146px",width:"44px",height:"70px",display:"flex",flexDirection:"column",alignItems:"center",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_my"}]}},".tabbar_box .tabbar_my .my_icon":{width:"44px",height:"44px",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_my"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"my_icon"}]}},".tabbar_box .tabbar_my .my_text":{fontSize:"20px",color:"#888888",_meta:{ruleDef:[{t:"a",n:"class",i:!1,a:"element",v:"tabbar_box"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"tabbar_my"},{t:"d"},{t:"a",n:"class",i:!1,a:"element",v:"my_text"}]}}}},25:function(e,t,a){e.exports=function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=a(26);t.default={data:{indexicon:"img/index_icon.png",myicon:"img/my_active_icon.png",entrance:"img/entrance_icon.png",deliverlist:[{delivericon:"img/hire_icon.png",delivertext:"待录用",index:1},{delivericon:"img/mountGuard.png",delivertext:"待上岗",index:2},{delivericon:"img/settlement.png",delivertext:"待结算",index:3},{delivericon:"img/pay.png",delivertext:"已结算",index:4}],isLogin:!1,userResume:{},userdata:{resumedata:"",wallet:""},token:""},onMenuPress:function(){this.$app.$def.showMenu()},onShow:function(){var e=this;this.$app.$def.storage.get({key:"user",success:function(t){t?(e.isLogin=!0,e.token=JSON.parse(t).dataMap.token,e.showUserResume(),e.getData()):e.isLogin=!1},fail:function(e,t){console.log(e)}})},showUserResume:function(){var e=this;(0,r.showUserResume)(this.token).then(function(t){0!==t.code?e.$app.$def.prompt.showToast({message:t.msg}):(console.log(t),e.userResume=t.dataMap.userResume)}).catch(function(t){e.$app.$def.prompt.showToast({message:"请检查您的网络"})})},getData:function(){var e=this;(0,r.getData)(this.token).then(function(t){0==t.code?(t.dataMap.userData.resumedata=t.dataMap.userData.resumedata.slice(3,4),e.userdata=t.dataMap.userData):e.$app.$def.prompt.showToast({message:t.msg})}).catch(function(t){e.$app.$def.prompt.showToast({message:"请检查您的网络"})})},intoLogin:function(){this.$app.$def.router.push({uri:"/Login"})},intoDeliver:function(e){this.isLogin?this.$app.$def.router.push({uri:"/Deliver",params:{index:e}}):this.$app.$def.router.push({uri:"/Login"})},intoResume:function(){this.isLogin?0==this.userdata.resumedata?this.$app.$def.router.push({uri:"/Resume"}):this.$app.$def.router.push({uri:"/ResumeShow"}):this.$app.$def.router.push({uri:"/Login"})},clickTabBar:function(){this.$app.$def.router.replace({uri:"/Index"})}};var s=t.default||e.exports,l=["public","protected","private"];if(s.data&&l.some(function(e){return s[e]}))throw new Error('页面VM对象中的属性data不可与"'+l.join(",")+'"同时存在，请使用private替换data名称');s.data||(s.data={},s._descriptor={},l.forEach(function(e){var t=i(s[e]);if("object"===t){s.data=Object.assign(s.data,s[e]);for(var a in s[e])s._descriptor[a]={access:e}}else"function"===t&&console.warn("页面VM对象中的属性"+e+"的值不能是函数，请使用对象")}))}},26:function(e,t,a){"use strict";function n(e){return s.default.showUserResume({token:e}).then(function(e){return Promise.resolve(JSON.parse(e.data))}).catch(function(e){return Promise.reject(e)})}function i(e){return s.default.getData({token:e}).then(function(e){return Promise.resolve(JSON.parse(e.data))}).catch(function(e){return Promise.reject(e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.showUserResume=n,t.getData=i;var r=a(0),s=function(e){return e&&e.__esModule?e:{default:e}}(r)}});
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();