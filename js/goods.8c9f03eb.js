(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods"],{"112a":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=Object(o["createTextVNode"])("添加商品"),c=Object(o["createTextVNode"])(" 编辑"),a=Object(o["createTextVNode"])(" 删除");function i(e,t,n,i,u,l){var d=Object(o["resolveComponent"])("my-breadcrumb"),b=Object(o["resolveComponent"])("el-button"),s=Object(o["resolveComponent"])("el-input"),p=Object(o["resolveComponent"])("el-col"),j=Object(o["resolveComponent"])("el-row"),f=Object(o["resolveComponent"])("el-table-column"),O=Object(o["resolveComponent"])("el-table"),g=Object(o["resolveComponent"])("el-pagination"),h=Object(o["resolveComponent"])("el-card");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])(d,{firstName:"商品管理",secondName:"商品列表"}),Object(o["createVNode"])(h,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(j,{gutter:20},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(p,{span:8},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,{modelValue:e.queryInfo.query,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.queryInfo.query=t}),placeholder:"请输入内容",clearable:"",onClear:i.getGoodsList,onKeyup:Object(o["withKeys"])(i.getGoodsList,["enter"])},{append:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(b,{icon:"el-icon-search",onClick:i.getGoodsList},null,8,["onClick"])]})),_:1},8,["modelValue","onClear","onKeyup"])]})),_:1}),Object(o["createVNode"])(p,{span:4},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(b,{type:"primary",onClick:i.toAddPage},{default:Object(o["withCtx"])((function(){return[r]})),_:1},8,["onClick"])]})),_:1})]})),_:1}),Object(o["createVNode"])(O,{data:e.goodsList,border:"",stripe:"",ref:"tableRef"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(f,{type:"index",label:"#"}),Object(o["createVNode"])(f,{label:"商品名称",prop:"goods_name"}),Object(o["createVNode"])(f,{label:"商品价格",prop:"goods_price",width:"95px"}),Object(o["createVNode"])(f,{label:"商品重量",prop:"goods_weight",width:"80px"}),Object(o["createVNode"])(f,{label:"创建时间",width:"140px"},{default:Object(o["withCtx"])((function(e){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(i.format(e.row.add_time)),1)]})),_:1}),Object(o["createVNode"])(f,{label:"操作",width:"200px"},{default:Object(o["withCtx"])((function(e){return[Object(o["createVNode"])(b,{size:"mini",type:"primary",icon:"el-icon-edit",onClick:function(t){return i.handleEdit(e.row)}},{default:Object(o["withCtx"])((function(){return[c]})),_:2},1032,["onClick"]),Object(o["createVNode"])(b,{size:"mini",type:"danger",icon:"el-icon-delete",onClick:function(t){return i.handleDelete(e.row.goods_id)}},{default:Object(o["withCtx"])((function(){return[a]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"]),Object(o["createVNode"])(g,{onSizeChange:i.handleSizeChange,onCurrentChange:i.handleCurrentChange,"current-page":e.queryInfo.pagenum,"page-sizes":[10,12],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,background:""},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]})),_:1})],64)}var u=n("5530"),l=(n("96cf"),n("1da1")),d=n("6c02"),b=n("d084"),s=n("baa8"),p=n("80e6"),j={name:"Goods",components:{MyBreadcrumb:p["a"]},setup:function(){var e=Object(d["c"])(),t=Object(o["ref"])(""),n=Object(o["reactive"])({goodsList:[],queryInfo:{query:"",pagenum:1,pagesize:10},total:0}),r=function(e){return Object(s["b"])(e)},c=function(){e.push("/goods/add")},a=function(){Object(s["f"])("该功能暂未开发!")},i=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["d"])(t);case 2:n=e.sent,n&&f();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(e){n.queryInfo.pagesize=e,f()},j=function(e){n.queryInfo.pagenum=e,f()},f=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["h"])(n.queryInfo);case 2:t=e.sent,o=t.goodsList,r=t.total,n.goodsList=o,n.total=r;case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o["onMounted"])((function(){f(),Object(s["d"])(t)})),Object(u["a"])(Object(u["a"])({},Object(o["toRefs"])(n)),{},{tableRef:t,handleEdit:a,handleDelete:i,handleSizeChange:p,handleCurrentChange:j,getGoodsList:f,toAddPage:c,format:r})}};j.render=i;t["default"]=j}}]);
//# sourceMappingURL=goods.8c9f03eb.js.map