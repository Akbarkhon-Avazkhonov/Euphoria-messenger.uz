(()=>{var e={};e.id=797,e.ids=[797],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},78893:e=>{"use strict";e.exports=require("buffer")},61282:e=>{"use strict";e.exports=require("child_process")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},74175:e=>{"use strict";e.exports=require("tty")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},91302:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c}),t(53480),t(95537),t(90996);var s=t(30170),n=t(45002),i=t(83876),o=t.n(i),a=t(66299),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);t.d(r,l);let c=["",{children:["user",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,53480)),"C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\user\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,95537)),"C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,90996,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\akbar\\Desktop\\messenger\\Euphoria-messenger.uz\\frontend\\src\\app\\user\\page.tsx"],u="/user/page",x={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/user/page",pathname:"/user",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},14791:(e,r,t)=>{Promise.resolve().then(t.bind(t,9662)),Promise.resolve().then(t.bind(t,72411)),Promise.resolve().then(t.bind(t,34871))},58891:(e,r,t)=>{Promise.resolve().then(t.bind(t,9662)),Promise.resolve().then(t.bind(t,73359)),Promise.resolve().then(t.bind(t,93013)),Promise.resolve().then(t.bind(t,4872))},40424:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,63642,23)),Promise.resolve().then(t.t.bind(t,87586,23)),Promise.resolve().then(t.t.bind(t,47838,23)),Promise.resolve().then(t.t.bind(t,58057,23)),Promise.resolve().then(t.t.bind(t,77741,23)),Promise.resolve().then(t.t.bind(t,13118,23))},34871:(e,r,t)=>{"use strict";t.d(r,{default:()=>u});var s=t(97247);t(28964);var n=t(49714),i=t(34739),o=t(10819),a=t.n(o),l=t(99026),c=t.n(l);let d=(0,t(74951).Z)({fontFamily:{body:c().style.fontFamily,display:c().style.fontFamily,code:a().style.fontFamily}});function u({children:e}){return(0,s.jsxs)(n.lL,{theme:d,children:[s.jsx(i.Z,{}),e]})}},73359:(e,r,t)=>{"use strict";t.d(r,{default:()=>q});var s=t(97247),n=t(93013),i=t(4872),o=t(65392),a=t(71009),l=t(76617),c=t(28964),d=t.n(c),u=t(86961),x=t(22690),p=t(7413),h=t(76262),m=t(49267),g=t(24833),f=t(14526),j=t(64067),v=t(56464),y=t(78993),b=t(76157),C=t(17914),Z=t(23771),k=t(39269);function P(e){let[r,t]=c.useState(!1),{chats:n,setSelectedChat:i,selectedChatId:o}=e;return(0,s.jsxs)(x.Z,{sx:{borderLeft:"1px solid",borderColor:"divider",height:"100vh",display:"flex",flexDirection:"column"},children:[(0,s.jsxs)(u.Z,{direction:"row",spacing:1,alignItems:"center",justifyContent:"space-between",p:2,pb:1.5,children:[s.jsx(l.ZP,{fontSize:{xs:"md",md:"lg"},component:"h1",fontWeight:"lg",sx:{mr:"auto"},children:"Операторы"}),s.jsx(p.ZP,{onClick:()=>{t(!0)},children:s.jsx(Z.Z,{})})]}),s.jsx(a.Z,{sx:{px:2,pb:1.5},children:s.jsx(h.ZP,{size:"sm",startDecorator:s.jsx(y.Z,{}),placeholder:"Поиск...","aria-label":"Search"})}),s.jsx(v.Z,{sx:{overflowY:"scroll",flex:1},children:n.map(e=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(m.Z,{children:s.jsx(g.Z,{onClick:()=>i(e),children:s.jsx(f.Z,{children:(0,s.jsxs)(u.Z,{direction:"row",spacing:1.5,children:[s.jsx(b.Z,{fullname:e.name}),s.jsx(a.Z,{sx:{flex:1},children:s.jsx(l.ZP,{level:"title-sm",children:e.name})}),s.jsx(a.Z,{sx:{lineHeight:1.5,textAlign:"right"},children:s.jsx(l.ZP,{level:"body-xs",display:{xs:"none",md:"block"},noWrap:!0,children:e.role})})]})})})},e.id),s.jsx(j.Z,{sx:{margin:1},inset:"gutter"})]}))}),(0,s.jsxs)(C.Z,{anchorOrigin:{vertical:"top",horizontal:"center"},open:r,onClose:()=>t(!1),color:"warning",size:"md",variant:"outlined",invertedColors:!0,children:[s.jsx(k.Z,{}),"В разработке"]})]})}async function w(e){return await fetch(`https://api.euphoria-messenger.uz/admin/getUserSession/${e}`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include",cache:"force-cache"}).then(e=>e.json())}function q(e){let[r,t]=d().useState(null),c=async e=>{let r=await w(e.id);document.cookie=`session=${r.session}; path=/; max-age=86400`,i.socket.disconnect(),i.socket.connect(),t(e)};return(0,s.jsxs)(s.Fragment,{children:[s.jsx(o.Z,{xs:9,children:s.jsx(a.Z,{sx:{display:"flex",minHeight:"100dvh"},children:s.jsx(a.Z,{component:"main",className:"MainContent",sx:{flex:1,display:"flex",alignItems:"center"},children:r?s.jsx(n.default,{socket:i.socket},r.id):s.jsx(a.Z,{sx:{width:"100%",flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:s.jsx(a.Z,{sx:{padding:"10px 20px",borderRadius:"50px",backgroundColor:"background.level2"},children:s.jsx(l.ZP,{sx:{textAlign:"center"},children:"Выберите чат, чтобы начать общение"})})})})})}),s.jsx(o.Z,{xs:3,sx:{height:"100vh"},children:s.jsx(P,{chats:e.chats,selectedChatId:r?.id,setSelectedChat:c})})]})}},76157:(e,r,t)=>{"use strict";t.d(r,{Z:()=>c});var s=t(97247);t(28964);var n=t(80209),i=t(23787);let o="abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщьыэюя".split(""),a=e=>{let r=e.charCodeAt(0);return`#${(16777216+(13*r%200+55<<16)+(37*r%200+55<<8)+(61*r%200+55)).toString(16).slice(1)}`},l=e=>{let r=parseInt(e.slice(1,3),16);return .2126*r+.7152*parseInt(e.slice(3,5),16)+.0722*parseInt(e.slice(5,7),16)<128};function c(e){let{online:r=!1,fullname:t="",status:c,...d}=e,u=(e=>{if(!e)return"#CCCCCC";let r=e[0].toLowerCase();return o.includes(r)?a(r):"#CCCCCC"})(t),x=l(u)?"#FFFFFF":"#000000";return s.jsx("div",{children:c?s.jsx(n.Z,{color:"UserStatusOnline"===c.className?"success":"neutral",variant:r?"solid":"soft",size:"sm",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeInset:"4px 4px",children:s.jsx(i.Z,{...d,sx:{bgcolor:u,color:x},children:t[0]||""})}):s.jsx(i.Z,{...d,sx:{bgcolor:u,color:x},children:t[0]||""})})}},43441:(e,r,t)=>{"use strict";t.d(r,{Z:()=>c});var s=t(97247),n=t(28964),i=t(49714),o=t(7413),a=t(59059),l=t(7041);function c(e){let{onClick:r,sx:t,...c}=e,{mode:d,setMode:u}=(0,i.tv)(),[x,p]=n.useState(!1);return(n.useEffect(()=>{p(!0)},[]),x)?s.jsx(o.ZP,{id:"toggle-mode",size:"sm",variant:"outlined",color:"neutral",...c,onClick:e=>{u("light"===d?"dark":"light"),r?.(e)},sx:[...Array.isArray(t)?t:[t]],children:"light"===d?s.jsx(a.Z,{}):s.jsx(l.Z,{})}):s.jsx(o.ZP,{id:"toggle-mode",size:"sm",variant:"outlined",color:"neutral",...c,sx:[...Array.isArray(t)?t:[t]],children:"light"===d?s.jsx(a.Z,{}):s.jsx(l.Z,{})})}},95537:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>c,metadata:()=>l});var s=t(72051),n=t(88750);t(26269);var i=t(67229);let o=(0,t(45347).createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\ThemeRegistry\ThemeRegistry.tsx#default`);var a=t(10247);t(5023);let l={title:"Euphoria-messenger.uz",description:"Euphoria-messenger.uz"};function c({children:e}){return(0,s.jsxs)("html",{lang:"en",suppressHydrationWarning:!0,children:[(0,s.jsxs)("head",{children:[s.jsx(n.Z,{}),s.jsx("meta",{charSet:"UTF-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s.jsx("title",{children:l.title}),s.jsx("meta",{name:"description",content:l.description})]}),s.jsx("body",{children:(0,s.jsxs)(o,{children:[s.jsx(i.GlobalStyles,{styles:{}}),s.jsx(a.x7,{position:"top-center",toastOptions:{duration:2e3,success:{style:{border:"1px solid #00A4A6"},iconTheme:{primary:"#00A4A6",secondary:"#fff"}},error:{style:{border:"1px solid #FF0000"},iconTheme:{primary:"#FF0000",secondary:"#fff"}}}}),e]})})]})}},53480:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>p});var s=t(72051),n=t(45347);let i=(0,n.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\ui\Chat.tsx#default`),o=(0,n.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\socket.tsx#socket`);async function a(e){var r;let t=(r=e,new TextEncoder().encode(r));return crypto?.subtle?.importKey("raw",t,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function l(e){try{var r;let t=await a("zQp3JmO7XhC9WsE4LkZ1RxY8GtV2QwB6"),s=Uint8Array.from(atob(e),e=>e.charCodeAt(0)),n=s.slice(0,12),i=s.slice(12);return r=await crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,i),new TextDecoder().decode(r)}catch(e){return console.error("Error decrypting data:",e),null}}var c=t(67229),d=t(52845);let u=(0,n.createProxy)(String.raw`C:\Users\akbar\Desktop\messenger\Euphoria-messenger.uz\frontend\src\components\rop\RopChat.tsx#default`);async function x(e,r){return await fetch(`https://api.euphoria-messenger.uz/users/getRopOperators/${r}`,{method:"GET",headers:{"Content-Type":"application/json",Cookie:"token="+e},credentials:"include",cache:"no-cache"}).then(e=>e.json())}async function p(){let e=(0,d.cookies)(),r=e.get("access")?.value;if(r){let t=await l(r);if(t&&JSON.parse(t).can_manage_users){let r=e.get("token")?.value,t=e.get("id")?.value||"";if(!r)throw Error("Token not found in cookies");let n=await x(r,t);return s.jsx(c.Grid,{container:!0,sx:{flexGrow:1},children:s.jsx(u,{chats:n.data})})}}return s.jsx(c.Box,{sx:{display:"flex",minHeight:"100dvh"},children:s.jsx(c.Box,{component:"main",className:"MainContent",sx:{flex:1},children:s.jsx(i,{socket:o})})})}},73881:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(54564);let n=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},5023:()=>{}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[379,226,173,550,242,976,13],()=>t(91302));module.exports=s})();