(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[717],{94830:function(e,n,s){Promise.resolve().then(s.bind(s,60529)),Promise.resolve().then(s.bind(s,52679)),Promise.resolve().then(s.bind(s,14725))},29886:function(e,n,s){"use strict";var t=s(94630),i=s(57437);n.Z=(0,t.Z)((0,i.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},18947:function(e,n,s){"use strict";var t=s(94630),i=s(57437);n.Z=(0,t.Z)((0,i.jsx)("path",{d:"M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"EditRounded")},90741:function(e,n,s){"use strict";var t=s(94630),i=s(57437);n.Z=(0,t.Z)((0,i.jsx)("path",{d:"M22 9V8c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m4.51-8.95C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95m4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17"}),"GroupAddRounded")},20073:function(e,n,s){"use strict";var t=s(94630),i=s(57437);n.Z=(0,t.Z)((0,i.jsx)("path",{d:"M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5"}),"SettingsRounded")},52679:function(e,n,s){"use strict";s.d(n,{default:function(){return g}});var t=s(57437),i=s(2265),r=s(1958),a=s(25002),c=s(87349),l=s(74183),d=s(18154),o=s(11608),x=s(29886),h=s(90741),u=s(49048),p=s(33069);let j={can_manage_users:!1,can_write:!0,can_read:!0,can_delete:!1,can_send_audio:!1,can_read_audio:!1,can_send_video:!1,can_read_video:!1,can_send_photo:!1,can_read_photo:!1,can_send_file:!1,can_read_file:!1},m={can_manage_users:"Управление пользователями",can_write:"Запись",can_read:"Чтение",can_delete:"Удаление",can_send_audio:"Отправка аудио",can_read_audio:"Чтение аудио",can_send_video:"Отправка видео",can_read_video:"Чтение видео",can_send_photo:"Отправка фото",can_read_photo:"Чтение фото",can_send_file:"Отправка файла",can_read_file:"Чтение файла"};async function Z(e,n,s){return encodeURIComponent(window.document.cookie),await fetch("".concat("https://euphoria-messenger.uz:4000","/roles/create"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({name:e,description:n,access:s})})}function g(){let[e,n]=i.useState(!1),[s,g]=i.useState(""),[f,v]=i.useState(""),[_,y]=i.useState(j);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.Z,{startDecorator:(0,t.jsx)(x.Z,{}),onClick:()=>n(!0),size:"sm",children:"Добавить"}),(0,t.jsx)(c.ZP,{open:e,onClose:()=>n(!1),children:(0,t.jsxs)(l.Z,{sx:{maxWidth:{xs:"94%",sm:"400px"},width:"100%",overflowY:"auto"},children:[(0,t.jsxs)(d.Z,{children:["Новый Роль",(0,t.jsx)(h.Z,{sx:{fontSize:24},color:"primary"})]}),(0,t.jsxs)(o.Z,{spacing:2,children:[(0,t.jsx)(a.Z,{required:!0,children:"Имя роля"}),(0,t.jsx)(u.Z,{autoFocus:!0,required:!0,onChange:e=>g(e.target.value)}),(0,t.jsx)(a.Z,{required:!0,children:"Описание"}),(0,t.jsx)(u.Z,{required:!0,onChange:e=>v(e.target.value)}),Object.keys(_).map(e=>(0,t.jsx)(p.Z,{label:m[e],checked:_[e],setChecked:n=>{y(s=>({...s,[e]:n}))}},e)),(0,t.jsx)(r.Z,{type:"submit",size:"sm",onClick:e=>{e.preventDefault(),Z(s,f,_).then(()=>{n(!1)}),window.location.reload()},children:"Добавить"})]})]})})]})}},14725:function(e,n,s){"use strict";s.d(n,{default:function(){return O}});var t=s(57437),i=s(2265),r=s(5481),a=s(1958),c=s(84673),l=s(53092),d=s(71779),o=s(66500),x=s(36164),h=s(55075),u=s(79335),p=s(32271),j=s(96703),m=s(64233),Z=s(20073),g=s(12428),f=s(59456),v=s(36766),_=s(34641),y=s(23345),C=s(25002),b=s(87349),w=s(74183),k=s(18154),S=s(11608),z=s(90741),P=s(49048),T=s(33069),F=s(18947);let D={can_manage_users:"Управление пользователями",can_write:"Запись",can_read:"Чтение",can_delete:"Удаление",can_send_audio:"Отправка аудио",can_read_audio:"Чтение аудио",can_send_video:"Отправка видео",can_read_video:"Чтение видео",can_send_photo:"Отправка фото",can_read_photo:"Чтение фото",can_send_file:"Отправка файла",can_read_file:"Чтение файла"};async function I(e,n,s,t){return encodeURIComponent(window.document.cookie),await fetch("".concat("https://euphoria-messenger.uz:4000","/roles/one/").concat(e),{method:"PATCH",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({name:n,description:s,access:t})})}function A(e){let[n,s]=i.useState(!1),[r,c]=i.useState(e.name),[l,d]=i.useState(e.description),[o,h]=i.useState(e.access);return(0,t.jsxs)(i.Fragment,{children:[e.disabled?(0,t.jsx)(x.ZP,{size:"sm",color:"danger",disabled:!0,children:(0,t.jsx)(F.Z,{})}):(0,t.jsx)(x.ZP,{size:"sm",color:"primary",onClick:()=>s(!0),children:(0,t.jsx)(F.Z,{})}),(0,t.jsx)(b.ZP,{open:n,onClose:()=>s(!1),children:(0,t.jsxs)(w.Z,{sx:{maxWidth:{xs:"94%",sm:"400px"},width:"100%",overflowY:"auto"},children:[(0,t.jsxs)(k.Z,{children:["Новый Роль",(0,t.jsx)(z.Z,{sx:{fontSize:24},color:"primary"})]}),(0,t.jsx)("form",{onSubmit:n=>{n.preventDefault(),I(e.id,r,l,o).then(()=>{s(!1)}),window.location.reload()},children:(0,t.jsxs)(S.Z,{spacing:2,children:[(0,t.jsx)(C.Z,{required:!0,children:"Имя роля"}),(0,t.jsx)(P.Z,{value:r,autoFocus:!0,required:!0,onChange:e=>c(e.target.value)}),(0,t.jsx)(C.Z,{required:!0,children:"Описание"}),(0,t.jsx)(P.Z,{value:l,required:!0,onChange:e=>d(e.target.value)}),Object.keys(o).map(e=>(0,t.jsx)(T.Z,{label:D[e],checked:o[e],setChecked:n=>{h(s=>({...s,[e]:n}))}},e)),(0,t.jsx)(a.Z,{type:"submit",size:"sm",children:"Добавить"})]})})]})})]})}var q=s(75339);function O(e){let{roles:n}=e,[s,C]=(0,i.useState)(""),[b,w]=(0,i.useState)(n),[k,S]=(0,i.useState)(1),[z,P]=(0,i.useState)(10),[T,F]=(0,i.useState)("asc"),D=e=>{S(e)},I=Math.max(1,Math.ceil(b.length/z)),O=(k-1)*z;return b.slice(O,O+z),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.Z,{className:"SearchAndFilters-tabletUp",sx:{borderRadius:"sm",py:2,display:{xs:"none",sm:"flex"},flexWrap:"wrap",gap:1.5,"& > *":{minWidth:{xs:"120px",md:"160px"}}},children:(0,t.jsx)(c.Z,{sx:{flex:1},size:"sm",children:(0,t.jsx)(l.ZP,{size:"sm",placeholder:"Поиск пользователей",startDecorator:(0,t.jsx)(u.Z,{}),value:s,onChange:e=>{let s=e.target.value.toLowerCase();C(s),w(n.filter(e=>e.name.toLowerCase().includes(s)||e.description.toLowerCase().includes(s))),S(1)}})})}),(0,t.jsx)(o.Z,{className:"OrderTableContainer",variant:"outlined",sx:{display:{xs:"none",sm:"initial"},width:"100%",borderRadius:"sm",flexShrink:1,overflow:"auto",minHeight:0},children:(0,t.jsxs)(d.Z,{"aria-labelledby":"tableTitle",stickyHeader:!0,stickyFooter:!0,hoverRow:!0,sx:{"--TableCell-headBackground":"var(--joy-palette-background-level1)","--Table-headerUnderlineThickness":"1px","--TableRow-hoverBackground":"var(--joy-palette-background-level1)","--TableCell-paddingY":"8px","--TableCell-paddingX":"8px"},children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{style:{width:"6%",textAlign:"center",padding:"12px 6px"},children:(0,t.jsx)(g.Z,{})}),(0,t.jsx)("th",{style:{width:200,padding:"16px 6px"},children:(0,t.jsx)(h.ZP,{children:"Имя"})}),(0,t.jsx)("th",{style:{width:200,padding:"16px 6px"},children:"Описание"}),(0,t.jsx)("th",{style:{width:200,padding:"16px 6px"},children:"Управление"}),(0,t.jsx)("th",{style:{width:200,padding:"16px 6px"},children:"Количество пользователей"}),(0,t.jsx)("th",{style:{width:"15%",padding:"16px 6px"},children:"Дата создания"}),(0,t.jsx)("th",{style:{width:"4%",padding:"10px 6px",textAlign:"center"},children:(0,t.jsx)(Z.Z,{})}),(0,t.jsx)("th",{style:{width:"6%",padding:"10px 6px",textAlign:"center"},children:(0,t.jsx)(p.Z,{})})]})}),(0,t.jsx)("tbody",{children:n&&n.map((e,n)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{textAlign:"center",width:120},children:n+1}),(0,t.jsx)("td",{children:(0,t.jsxs)(r.Z,{sx:{display:"flex",gap:2,alignItems:"center"},children:[(0,t.jsx)(v.Z,{size:"sm",fullname:e.name[0]}),(0,t.jsx)(h.ZP,{level:"body-xs",children:e.name})]})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:"24px"},children:(0,t.jsx)(h.ZP,{level:"body-xs",children:e.description})})}),(0,t.jsx)("td",{children:(0,t.jsx)(h.ZP,{level:"body-xs",children:e.access.can_manage_users?"Да":"Нет "})}),(0,t.jsx)("td",{children:(0,t.jsx)(h.ZP,{level:"body-xs",children:e.users_count})}),(0,t.jsx)("td",{children:(0,t.jsx)(h.ZP,{level:"body-xs",children:e.created_at.slice(0,10)})}),(0,t.jsx)("td",{style:{textAlign:"center"},children:"Админ"!==e.name?(0,t.jsx)(A,{id:e.id,name:e.name,description:e.description,access:e.access}):(0,t.jsx)(A,{id:e.id,name:e.name,description:e.description,access:e.access,disabled:!0})}),(0,t.jsx)("td",{style:{textAlign:"center"},children:"Админ"!==e.name?(0,t.jsx)(q.Z,{id:e.id,canDelete:!0,url:"roles/one"}):(0,t.jsx)(q.Z,{id:e.id,canDelete:!1,url:"roles/one"})})]},e.id))})]})}),(0,t.jsxs)(r.Z,{className:"Pagination",sx:{pt:2,gap:1,display:{xs:"none",md:"flex"},justifyContent:"space-between",alignItems:"center",position:"sticky",bottom:0,borderTop:"1px solid #ccc",p:2},children:[(0,t.jsxs)(r.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,t.jsx)(h.ZP,{children:"Показать:"}),(0,t.jsx)(y.Z,{size:"sm",value:z,defaultValue:25,onChange:(e,n)=>{P(parseInt(String(n),10)),S(1)},indicator:(0,t.jsx)(_.Z,{}),sx:{ml:2,minWidth:80},children:[5,10,25,50].map(e=>(0,t.jsx)(f.Z,{value:e,children:e},e))})]}),(0,t.jsxs)(r.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,t.jsx)(a.Z,{size:"sm",variant:"outlined",color:"neutral",startDecorator:(0,t.jsx)(m.Z,{}),onClick:()=>D(k-1),disabled:1===k,children:"До"}),(0,t.jsx)(r.Z,{sx:{mx:2,display:"flex",alignItems:"center",gap:1},children:Array.from({length:I},(e,n)=>n+1).slice(0,10).map(e=>(0,t.jsx)(x.ZP,{size:"sm",variant:e===k?"solid":"outlined",color:"neutral",onClick:()=>D(e),children:e},e))}),(0,t.jsx)(a.Z,{size:"sm",variant:"outlined",color:"neutral",endDecorator:(0,t.jsx)(j.Z,{}),onClick:()=>D(k+1),disabled:k===I,children:"После"})]})]})]})}},36766:function(e,n,s){"use strict";s.d(n,{Z:function(){return d}});var t=s(57437);s(2265);var i=s(87505),r=s(18467);let a="abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщьыэюя".split(""),c=e=>{let n=e.charCodeAt(0);return"#".concat((16777216+(13*n%200+55<<16)+(37*n%200+55<<8)+(61*n%200+55)).toString(16).slice(1))},l=e=>{let n=parseInt(e.slice(1,3),16);return .2126*n+.7152*parseInt(e.slice(3,5),16)+.0722*parseInt(e.slice(5,7),16)<128};function d(e){let{online:n=!1,fullname:s="",status:d,...o}=e,x=(e=>{if(!e)return"#CCCCCC";let n=e[0].toLowerCase();return a.includes(n)?c(n):"#CCCCCC"})(s),h=l(x)?"#FFFFFF":"#000000";return(0,t.jsx)("div",{children:d?(0,t.jsx)(i.Z,{color:"UserStatusOnline"===d.className?"success":"neutral",variant:n?"solid":"soft",size:"sm",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeInset:"4px 4px",children:(0,t.jsx)(r.Z,{...o,sx:{bgcolor:x,color:h},children:s[0]||""})}):(0,t.jsx)(r.Z,{...o,sx:{bgcolor:x,color:h},children:s[0]||""})})}},75339:function(e,n,s){"use strict";s.d(n,{Z:function(){return v}});var t=s(57437),i=s(2265),r=s(1958),a=s(87349),c=s(36164),l=s(74183),d=s(18154),o=s(23824),x=s(17925),h=s(81630),u=s(98897),p=s(55972),j=s(31469),m=s(50074),Z=s(75186),g=s(2662),f=s(76672);function v(e){let[n,s]=i.useState(!1),[v,_]=i.useState(!1),y=()=>{if(!e.canDelete){Z.ZP.error("Нельзя удалить этот элемент");return}s(!0)},C=()=>{fetch("".concat("https://euphoria-messenger.uz:4000","/").concat(e.url,"/").concat(e.id),{method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"}}).then(n=>{if(n.ok)return e.deleteCallback?(e.deleteCallback(e.id),Z.ZP.success("Успешно удалено"),s(!1)):(Z.ZP.success("Успешно удалено"),window.location.reload()),n.json();Z.ZP.error("Ошибка при удалении"),window.location.reload()})};return(0,t.jsxs)(t.Fragment,{children:[e.isMaterial?(0,t.jsx)(g.Z,{size:"small",onClick:()=>y(),children:e.canDelete?(0,t.jsx)(f.Z,{}):(0,t.jsx)(m.Z,{})}):(0,t.jsx)(c.ZP,{size:"sm",color:"danger",onClick:()=>y(),children:e.canDelete?(0,t.jsx)(j.Z,{}):(0,t.jsx)(m.Z,{})}),(0,t.jsx)(a.ZP,{"aria-labelledby":"modal-title","aria-describedby":"modal-desc",open:n,onClose:()=>s(!1),sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:v?(0,t.jsx)(l.Z,{variant:"outlined",role:"alertdialog",children:(0,t.jsx)(u.Z,{color:"danger",variant:"soft"})}):(0,t.jsxs)(l.Z,{variant:"outlined",role:"alertdialog",color:"danger",children:[(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(p.Z,{}),"Вы уверены, что хотите удалить?"]}),(0,t.jsx)(o.Z,{}),e.dangerText&&(0,t.jsx)(x.Z,{children:e.dangerText}),(0,t.jsxs)(h.Z,{buttonFlex:2,children:[(0,t.jsx)(r.Z,{variant:"solid",color:"danger",onClick:()=>{_(!0),C()},children:"Да"}),(0,t.jsx)(r.Z,{variant:"solid",color:"primary",onClick:()=>s(!1),children:"Нет"})]})]})})]})}},33069:function(e,n,s){"use strict";s.d(n,{Z:function(){return c}});var t=s(57437),i=s(84673),r=s(25002),a=s(31049);function c(e){return(0,t.jsxs)(i.Z,{orientation:"horizontal",sx:{maxWidth:{xs:"94%",sm:"600px"},width:"100%",overflowY:"auto",justifyContent:"space-between"},children:[(0,t.jsx)(r.Z,{color:e.checked?"primary":"text.primary",children:e.label}),(0,t.jsx)(a.Z,{checked:e.checked,onChange:n=>e.setChecked(n.target.checked),color:"primary",variant:e.checked?"solid":"outlined",slotProps:{endDecorator:{sx:{minWidth:24}}}})]})}s(2265)}},function(e){e.O(0,[420,529,630,186,657,971,117,744],function(){return e(e.s=94830)}),_N_E=e.O()}]);