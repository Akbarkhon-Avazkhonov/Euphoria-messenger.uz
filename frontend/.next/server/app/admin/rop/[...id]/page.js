(()=>{var e={};e.id=755,e.ids=[755],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},87747:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>c,routeModule:()=>h,tree:()=>d}),t(22027),t(94564),t(95537),t(90996);var r=t(30170),n=t(45002),a=t(83876),i=t.n(a),l=t(66299),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(s,o);let d=["",{children:["admin",{children:["rop",{children:["[...id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,22027)),"C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\admin\\rop\\[...id]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,94564)),"C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\admin\\layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,95537)),"C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,90996,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\admin\\rop\\[...id]\\page.tsx"],p="/admin/rop/[...id]/page",x={require:t,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/admin/rop/[...id]/page",pathname:"/admin/rop/[...id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},44084:(e,s,t)=>{Promise.resolve().then(t.bind(t,9662)),Promise.resolve().then(t.bind(t,93258)),Promise.resolve().then(t.bind(t,57215))},60787:(e,s,t)=>{"use strict";t.d(s,{Z:()=>a});var r=t(70531),n=t(97247);let a=(0,r.Z)((0,n.jsx)("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"}),"PersonAddRounded")},93258:(e,s,t)=>{"use strict";t.d(s,{default:()=>j});var r=t(97247),n=t(28964),a=t(32088),i=t(38833),l=t(55116),o=t(26339),d=t(86961),c=t(33453),p=t(61441),x=t(97242),h=t(60787);async function u(e){return await fetch(`https://api.euphoria-messenger.uz/users/getOperatorsNotRop/${e}`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then(e=>e.json())}async function m(e,s){return await fetch(`https://api.euphoria-messenger.uz/users/addRopOperator/${e}/${s}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then(e=>e.json())}function j(e){let[s,t]=n.useState(!1),[j,g]=n.useState(!1),[f,y]=n.useState(""),[Z,v]=n.useState(""),[b,w]=n.useState(!0),[k,C]=n.useState([]),[P,z]=n.useState(!1);return n.useEffect(()=>{(async()=>{try{let s=await u(e.id);C(s.data),w(!1)}catch(e){console.error("Failed to fetch roles:",e),w(!1)}})()},[]),n.useEffect(()=>{P&&(t(!1),v(""),z(!1),y(""),window.location.reload())},[P]),(0,r.jsxs)(r.Fragment,{children:[r.jsx(i.Z,{startDecorator:r.jsx(h.Z,{}),onClick:()=>t(!0),size:"sm",children:"Добавить"}),r.jsx(a.ZP,{open:s,onClose:()=>t(!1),children:(0,r.jsxs)(l.Z,{sx:{maxWidth:{xs:"94%",sm:"400px"},width:"100%",overflowY:"auto"},children:[(0,r.jsxs)(o.Z,{color:"primary",level:"h4",children:["Добавить оператора Ропу",r.jsx(h.Z,{sx:{fontSize:24},color:"primary"})]}),(0,r.jsxs)(d.Z,{spacing:2,children:[r.jsx(c.Z,{required:!0,children:"Выберите оператора"}),r.jsx(p.Z,{name:"operator",required:!0,sx:{minWidth:200},value:f,onChange:(e,s)=>y(s),disabled:b,children:b?r.jsx(x.Z,{value:"",disabled:!0,children:"Загрузка..."}):k.map(e=>r.jsx(x.Z,{value:e.id,children:e.name},e.id))}),r.jsx(i.Z,{type:"submit",size:"sm",onClick:s=>{s.preventDefault(),m(e.id,f).then(()=>{t(!1)}),window.location.reload()},children:"Добавить"})]})]})})]})}},57215:(e,s,t)=>{"use strict";t.d(s,{default:()=>w});var r=t(97247),n=t(28964),a=t(71009),i=t(38833),l=t(93665),o=t(76262),d=t(9290),c=t(22690),p=t(7413),x=t(76617),h=t(61272),u=t(86606),m=t(51e3),j=t(8971),g=t(65646),f=t(97242),y=t(76157),Z=t(92946),v=t(61441),b=t(78757);function w({rop_id:e,users:s}){let[t,w]=(0,n.useState)(""),[k,C]=(0,n.useState)(s),[P,z]=(0,n.useState)(1),[T,S]=(0,n.useState)(10),[D,E]=(0,n.useState)("asc"),_=e=>{z(e)},A=Math.max(1,Math.ceil((k?k.length:1)/T));return n.useEffect(()=>{fetch("https://api.euphoria-messenger.uz/users/getRops",{credentials:"include"}).then(e=>e.json()).then(e=>{C(e.data)})},[]),(0,r.jsxs)(r.Fragment,{children:[r.jsx(a.Z,{className:"SearchAndFilters-tabletUp",sx:{borderRadius:"sm",py:2,display:{xs:"none",sm:"flex"},flexWrap:"wrap",gap:1.5,"& > *":{minWidth:{xs:"120px",md:"160px"}}},children:r.jsx(l.Z,{sx:{flex:1},size:"sm",children:r.jsx(o.ZP,{size:"sm",placeholder:"Поиск пользователей",startDecorator:r.jsx(h.Z,{}),value:t,onChange:e=>{let s=e.target.value.toLowerCase();w(s),C(k.filter(e=>e.name.toLowerCase().includes(s)||e.login.toLowerCase().includes(s)||e.phoneNumber.toLowerCase().includes(s))),z(1)}})})}),r.jsx(c.Z,{className:"OrderTableContainer",variant:"outlined",sx:{display:{xs:"none",sm:"initial"},width:"100%",borderRadius:"sm",flexShrink:1,overflow:"auto",minHeight:0},children:(0,r.jsxs)(d.Z,{"aria-labelledby":"tableTitle",stickyHeader:!0,stickyFooter:!0,hoverRow:!0,sx:{"--TableCell-headBackground":"var(--joy-palette-background-level1)","--Table-headerUnderlineThickness":"1px","--TableRow-hoverBackground":"var(--joy-palette-background-level1)","--TableCell-paddingY":"8px","--TableCell-paddingX":"8px"},children:[r.jsx("thead",{children:(0,r.jsxs)("tr",{children:[r.jsx("th",{style:{width:"6%",textAlign:"center",padding:"12px 6px"},children:r.jsx(g.Z,{})}),r.jsx("th",{style:{width:200,padding:"16px 6px"},children:r.jsx(x.ZP,{children:"Имя"})}),r.jsx("th",{style:{width:200,padding:"16px 6px"},children:"Логин"}),r.jsx("th",{style:{width:200,padding:"16px 6px"},children:"Телефон"}),r.jsx("th",{style:{width:200,padding:"16px 6px"},children:r.jsx(x.ZP,{children:"Роль"})}),r.jsx("th",{style:{width:"15%",padding:"16px 6px"},children:"Дата создания"}),r.jsx("th",{style:{width:"4%",padding:"10px 6px",textAlign:"center"},children:r.jsx(u.Z,{})})]})}),r.jsx("tbody",{children:s&&s.map((s,t)=>(0,r.jsxs)("tr",{children:[r.jsx("td",{style:{textAlign:"center",width:120},children:t+1}),r.jsx("td",{children:(0,r.jsxs)(a.Z,{sx:{display:"flex",gap:2,alignItems:"center"},children:[r.jsx(y.Z,{size:"sm",fullname:s.name[0]}),r.jsx(x.ZP,{level:"body-xs",children:s.name})]})}),r.jsx("td",{children:r.jsx(a.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:"24px"},children:r.jsx(x.ZP,{level:"body-xs",children:s.login})})}),r.jsx("td",{children:r.jsx(x.ZP,{level:"body-xs",children:s.phoneNumber})}),r.jsx("td",{children:r.jsx(x.ZP,{level:"body-xs",children:s.role})}),r.jsx("td",{children:r.jsx(x.ZP,{level:"body-xs",children:s.created_at.slice(0,10)})}),r.jsx("td",{style:{textAlign:"center"},children:r.jsx(b.Z,{id:`${e}/${s.id}`,url:"users/removeRopOperator",canDelete:!0})})]},t))})]})}),(0,r.jsxs)(a.Z,{className:"Pagination",sx:{pt:2,gap:1,display:{xs:"none",md:"flex"},justifyContent:"space-between",alignItems:"center",position:"sticky",bottom:0,borderTop:"1px solid #ccc",p:2},children:[(0,r.jsxs)(a.Z,{sx:{display:"flex",alignItems:"center"},children:[r.jsx(x.ZP,{children:"Показать:"}),r.jsx(v.Z,{size:"sm",value:T,defaultValue:25,onChange:(e,s)=>{S(parseInt(String(s),10)),z(1)},indicator:r.jsx(Z.Z,{}),sx:{ml:2,minWidth:80},children:[5,10,25,50].map(e=>r.jsx(f.Z,{value:e,children:e},e))})]}),(0,r.jsxs)(a.Z,{sx:{display:"flex",alignItems:"center"},children:[r.jsx(i.Z,{size:"sm",variant:"outlined",color:"neutral",startDecorator:r.jsx(j.Z,{}),onClick:()=>_(P-1),disabled:1===P,children:"До"}),r.jsx(a.Z,{sx:{mx:2,display:"flex",alignItems:"center",gap:1},children:Array.from({length:A},(e,s)=>s+1).slice(0,10).map(e=>r.jsx(p.ZP,{size:"sm",variant:e===P?"solid":"outlined",color:"neutral",onClick:()=>_(e),children:e},e))}),r.jsx(i.Z,{size:"sm",variant:"outlined",color:"neutral",endDecorator:r.jsx(m.Z,{}),onClick:()=>_(P+1),disabled:P===A,children:"После"})]})]})]})}},78757:(e,s,t)=>{"use strict";t.d(s,{Z:()=>Z});var r=t(97247),n=t(28964),a=t(38833),i=t(32088),l=t(7413),o=t(55116),d=t(26339),c=t(90693),p=t(94504),x=t(65441),h=t(95498),u=t(8882),m=t(34113),j=t(47058),g=t(72411),f=t(82076),y=t(6055);function Z(e){let[s,t]=n.useState(!1),[Z,v]=n.useState(!1),b=()=>{if(!e.canDelete){g.ZP.error("Нельзя удалить этот элемент");return}t(!0)},w=()=>{fetch(`https://api.euphoria-messenger.uz/${e.url}/${e.id}`,{method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"}}).then(s=>{if(s.ok)return e.deleteCallback?(e.deleteCallback(e.id),g.ZP.success("Успешно удалено"),t(!1)):(g.ZP.success("Успешно удалено"),window.location.reload()),s.json();g.ZP.error("Ошибка при удалении"),window.location.reload()})};return(0,r.jsxs)(r.Fragment,{children:[e.isMaterial?r.jsx(f.Z,{size:"small",onClick:()=>b(),children:e.canDelete?r.jsx(y.Z,{}):r.jsx(j.Z,{})}):r.jsx(l.ZP,{size:"sm",color:"danger",onClick:()=>b(),children:e.canDelete?r.jsx(m.Z,{}):r.jsx(j.Z,{})}),r.jsx(i.ZP,{"aria-labelledby":"modal-title","aria-describedby":"modal-desc",open:s,onClose:()=>t(!1),sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:Z?r.jsx(o.Z,{variant:"outlined",role:"alertdialog",children:r.jsx(h.Z,{color:"danger",variant:"soft"})}):(0,r.jsxs)(o.Z,{variant:"outlined",role:"alertdialog",color:"danger",children:[(0,r.jsxs)(d.Z,{children:[r.jsx(u.Z,{}),"Вы уверены, что хотите удалить?"]}),r.jsx(c.Z,{}),e.dangerText&&r.jsx(p.Z,{children:e.dangerText}),(0,r.jsxs)(x.Z,{buttonFlex:2,children:[r.jsx(a.Z,{variant:"solid",color:"danger",onClick:()=>{v(!0),w()},children:"Да"}),r.jsx(a.Z,{variant:"solid",color:"primary",onClick:()=>t(!1),children:"Нет"})]})]})})]})}},22027:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>c});var r=t(72051),n=t(67229),a=t(52845),i=t(45347);(0,i.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\admin\rop\AddOperator.tsx#fetchOperators`);let l=(0,i.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\admin\rop\AddOperator.tsx#default`),o=(0,i.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\admin\rop\OperatorsTables.tsx#default`);async function d(e,s){return await fetch(`https://api.euphoria-messenger.uz/users/getGroupUsers/${s}`,{method:"GET",headers:{"Content-Type":"application/json",Cookie:"token="+e},credentials:"include",cache:"no-cache"}).then(e=>e.json())}async function c({params:e}){let s=(0,a.cookies)(),t=s.get("token")?.value;if(!t)throw Error("Token not found in cookies");let i=await d(t,e.id[0]);return console.log(i),(0,r.jsxs)(n.Box,{component:"main",className:"MainContent",sx:{px:{xs:2,md:6},pt:{xs:"calc(12px + var(--Header-height))",sm:"calc(12px + var(--Header-height))",md:3},pb:{xs:2,sm:2,md:3},flex:1,display:"flex",flexDirection:"column",minWidth:0,height:"100dvh",gap:1},children:[(0,r.jsxs)(n.Box,{sx:{display:"flex",mb:1,gap:1,flexDirection:{xs:"column",sm:"row"},alignItems:{xs:"start",sm:"center"},flexWrap:"wrap",justifyContent:"space-between"},children:[r.jsx(n.Typography,{level:"h2",component:"h1",children:decodeURIComponent(e.id[1])}),r.jsx(l,{id:e.id[0]})]}),r.jsx(o,{rop_id:e.id[0],users:i.data})]})}}};var s=require("../../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[379,226,173,550,695,203,562],()=>t(87747));module.exports=r})();