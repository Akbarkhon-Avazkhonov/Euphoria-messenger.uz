(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[425],{97437:function(e,n,s){Promise.resolve().then(s.bind(s,60529)),Promise.resolve().then(s.bind(s,1855))},1855:function(e,n,s){"use strict";s.d(n,{default:function(){return P}});var t=s(57437),i=s(50850),l=s(20111),c=s(27103),r=s(5481),o=s(55075),d=s(2265),a=s(11608),x=s(66500),h=s(36164),u=s(53092),j=s(44038),p=s(18151),m=s(45371),f=s(1324),Z=s(84737),g=s(38998),b=s(36766),v=s(13692),k=s(83266),C=s(58);function y(e){let[n,s]=d.useState(!1),{chats:i,setSelectedChat:l,selectedChatId:c}=e;return(0,t.jsxs)(x.Z,{sx:{borderLeft:"1px solid",borderColor:"divider",height:"100vh",display:"flex",flexDirection:"column"},children:[(0,t.jsxs)(a.Z,{direction:"row",spacing:1,alignItems:"center",justifyContent:"space-between",p:2,pb:1.5,children:[(0,t.jsx)(o.ZP,{fontSize:{xs:"md",md:"lg"},component:"h1",fontWeight:"lg",sx:{mr:"auto"},children:"РОПЫ"}),(0,t.jsx)(h.ZP,{onClick:()=>{s(!0)},children:(0,t.jsx)(k.Z,{})})]}),(0,t.jsx)(r.Z,{sx:{px:2,pb:1.5},children:(0,t.jsx)(u.ZP,{size:"sm",startDecorator:(0,t.jsx)(g.Z,{}),placeholder:"Поиск...","aria-label":"Search"})}),(0,t.jsx)(Z.Z,{sx:{overflowY:"scroll",flex:1},children:i.map(e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j.Z,{children:(0,t.jsx)(p.Z,{onClick:()=>l(e),children:(0,t.jsx)(m.Z,{children:(0,t.jsxs)(a.Z,{direction:"row",spacing:1.5,children:[(0,t.jsx)(b.Z,{fullname:e.name}),(0,t.jsxs)(r.Z,{sx:{flex:1},children:[(0,t.jsx)(o.ZP,{level:"title-sm",children:e.name}),(0,t.jsx)(o.ZP,{level:"body-sm",children:e.phoneNumber})]}),(0,t.jsx)(r.Z,{sx:{lineHeight:1.5,textAlign:"right"},children:(0,t.jsx)(o.ZP,{level:"body-xs",display:{xs:"none",md:"block"},noWrap:!0,children:e.role})})]})})})},e.id),(0,t.jsx)(f.Z,{sx:{margin:1},inset:"gutter"})]}))}),(0,t.jsxs)(v.Z,{anchorOrigin:{vertical:"top",horizontal:"center"},open:n,onClose:()=>s(!1),color:"warning",size:"md",variant:"outlined",invertedColors:!0,children:[(0,t.jsx)(C.Z,{}),"В разработке"]})]})}async function w(e){return await fetch("".concat("https://euphoria-messenger.uz:4000","/admin/getUserSession/").concat(e),{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include",cache:"force-cache"}).then(e=>e.json())}function P(e){let[n,s]=d.useState(null),a=async e=>{let n=await w(e.id);document.cookie="session=".concat(n.session,"; path=/; max-age=86400"),l.socket.disconnect(),l.socket.connect(),s(e)};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Z,{xs:9,children:(0,t.jsx)(r.Z,{sx:{display:"flex",minHeight:"100dvh"},children:(0,t.jsx)(r.Z,{component:"main",className:"MainContent",sx:{flex:1,display:"flex",alignItems:"center"},children:n?(0,t.jsx)(i.default,{socket:l.socket},n.id):(0,t.jsx)(r.Z,{sx:{width:"100%",flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:(0,t.jsx)(r.Z,{sx:{padding:"10px 20px",borderRadius:"50px",backgroundColor:"background.level2"},children:(0,t.jsx)(o.ZP,{sx:{textAlign:"center"},children:"Выберите чат, чтобы начать общение"})})})})})}),(0,t.jsx)(c.Z,{xs:3,sx:{height:"100vh"},children:(0,t.jsx)(y,{chats:e.chats,selectedChatId:null==n?void 0:n.id,setSelectedChat:a})})]})}}},function(e){e.O(0,[420,529,630,270,673,850,971,117,744],function(){return e(e.s=97437)}),_N_E=e.O()}]);