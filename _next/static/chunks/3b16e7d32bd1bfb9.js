(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53359,29870,70276,e=>{"use strict";e.i(89171);var t=e.i(59990);let s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};var n=e.i(24144);function a(){return(a=Object.assign.bind()).apply(this,arguments)}let r=t.forwardRef((e,r)=>t.createElement(n.default,a({},e,{ref:r,icon:s})));e.s(["default",0,r],53359);let o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};function i(){return(i=Object.assign.bind()).apply(this,arguments)}let l=t.forwardRef((e,s)=>t.createElement(n.default,i({},e,{ref:s,icon:o})));e.s(["default",0,l],29870);let c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};function d(){return(d=Object.assign.bind()).apply(this,arguments)}let u=t.forwardRef((e,s)=>t.createElement(n.default,d({},e,{ref:s,icon:c})));e.s(["default",0,u],70276)},17900,96385,e=>{"use strict";let t=e.i(38727).default;e.s(["Button",0,t],17900);let s=e.i(59990).default.createContext({});e.s(["AppConfigContext",0,s],96385)},59611,e=>{"use strict";e.i(89171);var t=e.i(35492),s=e.i(59990),n=e.i(45605),a=e.i(96385),r=e.i(59782),o=e.i(77425),i=e.i(53359),l=e.i(557),c=e.i(29870),d=e.i(70276),u=e.i(33421),p=e.i(45512),m=e.i(7284);e.i(98178);var f=e.i(85238),f=f,g=e.i(47371),h=e.i(14828);function y(){return(y=Object.assign.bind()).apply(this,arguments)}let v=s.forwardRef((e,t)=>{let{prefixCls:n,style:a,className:r,duration:o=4.5,showProgress:i,pauseOnHover:l=!0,eventKey:c,content:d,closable:u,props:p,onClick:f,onNoticeClose:v,times:C,hovering:x}=e,[b,w]=s.useState(!1),[k,S]=s.useState(0),[E,N]=s.useState(0),D=x||b,R="number"==typeof o?o:0,P=R>0&&i,j=()=>{v(c)};s.useEffect(()=>{if(!D&&R>0){let e=Date.now()-E,t=setTimeout(()=>{j()},1e3*R-E);return()=>{l&&clearTimeout(t),N(Date.now()-e)}}},[R,D,C]),s.useEffect(()=>{if(!D&&P&&(l||0===E)){let e,t=performance.now(),s=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(e=>{let n=Math.min((e+E-t)/(1e3*R),1);S(100*n),n<1&&s()})};return s(),()=>{l&&cancelAnimationFrame(e)}}},[R,E,D,P,C]);let $=s.useMemo(()=>"object"==typeof u&&null!==u?u:{},[u]),A=(0,h.default)($,!0),T=100-(!k||k<0?0:k>100?100:k),I=`${n}-notice`;return s.createElement("div",y({},p,{ref:t,className:(0,m.clsx)(I,r,{[`${I}-closable`]:u}),style:a,onMouseEnter:e=>{w(!0),p?.onMouseEnter?.(e)},onMouseLeave:e=>{w(!1),p?.onMouseLeave?.(e)},onClick:f}),s.createElement("div",{className:`${I}-content`},d),u&&s.createElement("button",y({className:`${I}-close`,onKeyDown:e=>{("Enter"===e.key||"Enter"===e.code||e.keyCode===g.default.ENTER)&&j()},"aria-label":"Close"},A,{onClick:e=>{e.preventDefault(),e.stopPropagation(),j()}}),$.closeIcon??"x"),P&&s.createElement("progress",{className:`${I}-progress`,max:"100",value:T},T+"%"))}),C=s.default.createContext({}),x=({children:e,classNames:t})=>s.default.createElement(C.Provider,{value:{classNames:t}},e);function b(){return(b=Object.assign.bind()).apply(this,arguments)}let w=e=>{let t,{configList:n,placement:a,prefixCls:r,className:o,style:i,motion:l,onAllNoticeRemoved:c,onNoticeClose:d,stack:u}=e,{classNames:p}=(0,s.useContext)(C),g=(0,s.useRef)({}),[h,y]=(0,s.useState)(null),[x,w]=(0,s.useState)([]),k=n.map(e=>({config:e,key:String(e.key)})),[S,{offset:E,threshold:N,gap:D}]=(t={offset:8,threshold:3,gap:16},u&&"object"==typeof u&&(t.offset=u.offset??8,t.threshold=u.threshold??3,t.gap=u.gap??16),[!!u,t]),R=S&&(x.length>0||k.length<=N),P="function"==typeof l?l(a):l;return(0,s.useEffect)(()=>{S&&x.length>1&&w(e=>e.filter(e=>k.some(({key:t})=>e===t)))},[x,k,S]),(0,s.useEffect)(()=>{S&&g.current[k[k.length-1]?.key]&&y(g.current[k[k.length-1]?.key])},[k,S]),s.default.createElement(f.default,b({key:a,className:(0,m.clsx)(r,`${r}-${a}`,p?.list,o,{[`${r}-stack`]:!!S,[`${r}-stack-expanded`]:R}),style:i,keys:k,motionAppear:!0},P,{onAllRemoved:()=>{c(a)}}),({config:e,className:t,style:n,index:o},i)=>{let{key:l,times:c}=e,u=String(l),{className:f,style:y,classNames:C,styles:N,...P}=e,j=k.findIndex(e=>e.key===u),$={};if(S){let e=k.length-1-(j>-1?j:o-1),t="top"===a||"bottom"===a?"-50%":"0";if(e>0){$.height=R?g.current[u]?.offsetHeight:h?.offsetHeight;let s=0;for(let t=0;t<e;t++)s+=g.current[k[k.length-1-t].key]?.offsetHeight+D;let n=(R?s:e*E)*(a.startsWith("top")?1:-1),r=!R&&h?.offsetWidth&&g.current[u]?.offsetWidth?(h?.offsetWidth-2*E*(e<3?e:3))/g.current[u]?.offsetWidth:1;$.transform=`translate3d(${t}, ${n}px, 0) scaleX(${r})`}else $.transform=`translate3d(${t}, 0, 0)`}return s.default.createElement("div",{ref:i,className:(0,m.clsx)(`${r}-notice-wrapper`,t,C?.wrapper),style:{...n,...$,...N?.wrapper},onMouseEnter:()=>w(e=>e.includes(u)?e:[...e,u]),onMouseLeave:()=>w(e=>e.filter(e=>e!==u))},s.default.createElement(v,b({},P,{ref:e=>{j>-1?g.current[u]=e:delete g.current[u]},prefixCls:r,classNames:C,styles:N,className:(0,m.clsx)(f,p?.notice),style:y,times:c,key:l,eventKey:l,onNoticeClose:d,hovering:S&&x.length>0})))})},k=s.forwardRef((e,t)=>{let{prefixCls:n="rc-notification",container:a,motion:r,maxCount:o,className:i,style:l,onAllRemoved:c,stack:d,renderNotifications:u}=e,[m,f]=s.useState([]),g=e=>{let t=m.find(t=>t.key===e),s=t?.closable,{onClose:n}=s&&"object"==typeof s?s:{};n?.(),t?.onClose?.(),f(t=>t.filter(t=>t.key!==e))};s.useImperativeHandle(t,()=>({open:e=>{f(t=>{let s=[...t],n=s.findIndex(t=>t.key===e.key),a={...e};return n>=0?(a.times=(t[n]?.times||0)+1,s[n]=a):(a.times=0,s.push(a)),o>0&&s.length>o&&(s=s.slice(-o)),s})},close:e=>{g(e)},destroy:()=>{f([])}}));let[h,y]=s.useState({});s.useEffect(()=>{let e={};m.forEach(t=>{let{placement:s="topRight"}=t;s&&(e[s]=e[s]||[],e[s].push(t))}),Object.keys(h).forEach(t=>{e[t]=e[t]||[]}),y(e)},[m]);let v=e=>{y(t=>{let s={...t};return(s[e]||[]).length||delete s[e],s})},C=s.useRef(!1);if(s.useEffect(()=>{Object.keys(h).length>0?C.current=!0:C.current&&(c?.(),C.current=!1)},[h]),!a)return null;let x=Object.keys(h);return(0,p.createPortal)(s.createElement(s.Fragment,null,x.map(e=>{let t=h[e],a=s.createElement(w,{key:e,configList:t,placement:e,prefixCls:n,className:i?.(e),style:l?.(e),motion:r,onNoticeClose:g,onAllNoticeRemoved:v,stack:d});return u?u(a,{prefixCls:n,key:e}):a})),a)});e.i(51235);var S=e.i(26600);let E=()=>document.body,N=0;var D=e.i(31861),R=e.i(1975),P=e.i(31328);e.i(99838);var j=e.i(34471),$=e.i(81221),A=e.i(97638),T=e.i(4999),I=e.i(21746);let F=(0,T.genStyleHooks)("Message",e=>(e=>{let{componentCls:t,iconCls:s,boxShadow:n,colorText:a,colorSuccess:r,colorError:o,colorWarning:i,colorInfo:l,fontSizeLG:c,motionEaseInOutCirc:d,motionDurationSlow:u,marginXS:p,paddingXS:m,borderRadiusLG:f,zIndexPopup:g,contentPadding:h,contentBg:y}=e,v=`${t}-notice`,C=new j.Keyframes("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:m,transform:"translateY(0)",opacity:1}}),x=new j.Keyframes("MessageMoveOut",{"0%":{maxHeight:e.height,padding:m,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),b={padding:m,textAlign:"center",[`${t}-custom-content`]:{display:"flex",alignItems:"center"},[`${t}-custom-content > ${s}`]:{marginInlineEnd:p,fontSize:c},[`${v}-content`]:{display:"inline-block",padding:h,background:y,borderRadius:f,boxShadow:n,pointerEvents:"all"},[`${t}-success > ${s}`]:{color:r},[`${t}-error > ${s}`]:{color:o},[`${t}-warning > ${s}`]:{color:i},[`${t}-info > ${s},
      ${t}-loading > ${s}`]:{color:l}};return[{[t]:{...(0,A.resetComponent)(e),color:a,position:"fixed",top:p,width:"100%",pointerEvents:"none",zIndex:g,[`${t}-move-up`]:{animationFillMode:"forwards"},[`
        ${t}-move-up-appear,
        ${t}-move-up-enter
      `]:{animationName:C,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`
        ${t}-move-up-appear${t}-move-up-appear-active,
        ${t}-move-up-enter${t}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${t}-move-up-leave`]:{animationName:x,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`${t}-move-up-leave${t}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}}},{[t]:{[`${v}-wrapper`]:{...b}}},{[`${t}-notice-pure-panel`]:{...b,padding:0,textAlign:"start"}}]})((0,I.mergeToken)(e,{height:150})),e=>({zIndexPopup:e.zIndexPopupBase+$.CONTAINER_MAX_OFFSET+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`})),M={info:s.createElement(d.default,null),success:s.createElement(i.default,null),error:s.createElement(l.default,null),warning:s.createElement(c.default,null),loading:s.createElement(u.default,null)},z=e=>{let{prefixCls:t,type:n,icon:a,children:r,classNames:o,styles:i}=e,l=a||n&&M[n],c=(0,R.cloneElement)(l,e=>{let t={...e?.style,...i?.icon};return{className:(0,m.clsx)(e.className,o?.icon),style:t}});return s.createElement("div",{className:(0,m.clsx)(`${t}-custom-content`,`${t}-${n}`)},c,s.createElement("span",{className:o?.content,style:i?.content},r))};var B=e.i(92233),O=e.i(39266);function U(e){let t,s=new Promise(s=>{t=e(()=>{s(!0)})}),n=()=>{t?.()};return n.then=(e,t)=>s.then(e,t),n.promise=s,n}let L=({children:e,prefixCls:t})=>{let n=(0,P.default)(t),[a,r]=F(t,n);return s.createElement(x,{classNames:{list:(0,m.clsx)(a,r,n)}},e)},H=(e,{prefixCls:t,key:n})=>s.createElement(L,{prefixCls:t,key:n},e),W=s.forwardRef((e,t)=>{let{top:n,prefixCls:a,getContainer:r,maxCount:i,duration:l=3,rtl:c,transitionName:d,onAllRemoved:u,pauseOnHover:p=!0}=e,{getPrefixCls:f,direction:g,getPopupContainer:h}=(0,o.useComponentConfig)("message"),{message:y}=s.useContext(o.ConfigContext),v=a||f("message"),[C,x]=(0,D.useMergeSemantic)([e?.classNames,y?.classNames],[e?.styles,y?.styles],{props:e}),[b,w]=function(e={}){let{getContainer:t=E,motion:n,prefixCls:a,maxCount:r,className:o,style:i,onAllRemoved:l,stack:c,renderNotifications:d,...u}=e,[p,m]=s.useState(),f=s.useRef(),g=s.createElement(k,{container:p,ref:f,prefixCls:a,motion:n,maxCount:r,className:o,style:i,onAllRemoved:l,stack:c,renderNotifications:d}),[h,y]=s.useState([]),v=(0,S.useEvent)(e=>{let t=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(s=>{let n=e[s];void 0!==n&&(t[s]=n)})}),t}(u,e);(null===t.key||void 0===t.key)&&(t.key=`rc-notification-${N}`,N+=1),y(e=>[...e,{type:"open",config:t}])}),C=s.useMemo(()=>({open:v,close:e=>{y(t=>[...t,{type:"close",key:e}])},destroy:()=>{y(e=>[...e,{type:"destroy"}])}}),[]);return s.useEffect(()=>{m(t())}),s.useEffect(()=>{if(f.current&&h.length){let e,t;h.forEach(e=>{switch(e.type){case"open":f.current.open(e.config);break;case"close":f.current.close(e.key);break;case"destroy":f.current.destroy()}}),y(s=>(e===s&&t||(e=s,t=s.filter(e=>!h.includes(e))),t))}},[h]),[C,g]}({prefixCls:v,style:()=>({left:"50%",transform:"translateX(-50%)",top:n??8}),className:()=>(0,m.clsx)({[`${v}-rtl`]:c??"rtl"===g}),motion:()=>({motionName:d??`${v}-move-up`}),closable:!1,duration:l,getContainer:()=>r?.()||h?.()||document.body,maxCount:i,onAllRemoved:u,renderNotifications:H,pauseOnHover:p});return s.useImperativeHandle(t,()=>({...b,prefixCls:v,message:y,classNames:C,styles:x})),w}),q=0;function K(e){let t=s.useRef(null);return(0,O.devUseWarning)("Message"),[s.useMemo(()=>{let n=e=>{t.current?.close(e)},a=a=>{if(!t.current){let e=()=>{};return e.then=()=>{},e}let{open:r,prefixCls:o,message:i,classNames:l,styles:c}=t.current,d=i?.className||{},u=i?.style||{},p=i?.classNames||{},f=i?.styles||{},g=`${o}-notice`,{content:h,icon:y,type:v,key:C,className:x,style:b,onClose:w,classNames:k={},styles:S={},...E}=a,N=C;(0,B.default)(N)||(q+=1,N=`antd-message-${q}`);let R={...e,...a},P=(0,D.resolveStyleOrClass)(p,{props:R}),j=(0,D.resolveStyleOrClass)(k,{props:R}),$=(0,D.resolveStyleOrClass)(f,{props:R}),A=(0,D.resolveStyleOrClass)(S,{props:R}),T=(0,D.mergeClassNames)(void 0,P,j,l),I=(0,D.mergeStyles)($,A,c);return U(e=>(r({...E,key:N,content:s.createElement(z,{prefixCls:o,type:v,icon:y,classNames:T,styles:I},h),placement:"top",className:(0,m.clsx)({[`${g}-${v}`]:v},x,d,T.root),style:{...I.root,...u,...b},onClose:()=>{w?.(),e()}}),()=>{n(N)}))},r={open:a,destroy:e=>{void 0!==e?n(e):t.current?.destroy()}};return["info","success","warning","error","loading"].forEach(e=>{r[e]=(t,s,n)=>{let r,o,i;return r=t&&"object"==typeof t&&"content"in t?t:{content:t},"function"==typeof s?i=s:(o=s,i=n),a({onClose:i,duration:o,...r,type:e})}}),r},[]),s.createElement(W,{key:"message-holder",...e,ref:t})]}let V=null,X=[],G={};function J(){let{getContainer:e,duration:t,rtl:s,maxCount:n,top:a}=G,r=e?.()||document.body;return{getContainer:()=>r,duration:t,rtl:s,maxCount:n,top:a}}let Y=s.default.forwardRef((e,t)=>{let{messageConfig:n,sync:r}=e,{getPrefixCls:i}=(0,s.useContext)(o.ConfigContext),l=G.prefixCls||i("message"),c=(0,s.useContext)(a.AppConfigContext),[d,u]=K({...n,prefixCls:l,...c.message});return s.default.useImperativeHandle(t,()=>{let e={...d};return Object.keys(e).forEach(t=>{e[t]=(...e)=>(r(),d[t].apply(d,e))}),{instance:e,sync:r}}),u}),_=s.default.forwardRef((e,t)=>{let[n,a]=s.default.useState(J),o=()=>{a(J)};s.default.useEffect(o,[]);let i=(0,r.globalConfig)(),l=i.getRootPrefixCls(),c=i.getIconPrefixCls(),d=i.getTheme(),u=s.default.createElement(Y,{ref:t,sync:o,messageConfig:n});return s.default.createElement(r.default,{prefixCls:l,iconPrefixCls:c,theme:d},i.holderRender?i.holderRender(u):u)}),Q=()=>{if(!V){let e=document.createDocumentFragment(),t={fragment:e};V=t,(()=>{(0,n.render)(s.default.createElement(_,{ref:e=>{let{instance:s,sync:n}=e||{};Promise.resolve().then(()=>{!t.instance&&s&&(t.instance=s,t.sync=n,Q())})}}),e)})();return}V.instance&&(X.forEach(e=>{let{type:s,skipped:n}=e;if(!n)switch(s){case"open":{let t=V.instance.open({...G,...e.config});t?.then(e.resolve),e.setCloseFn(t)}break;case"destroy":V?.instance.destroy(e.key);break;default:{var a;let n=(a=V.instance)[s].apply(a,(0,t.default)(e.args));n?.then(e.resolve),e.setCloseFn(n)}}}),X=[])},Z={open:function(e){let t=U(t=>{let s,n={type:"open",config:e,resolve:t,setCloseFn:e=>{s=e}};return X.push(n),()=>{s?(()=>{s()})():n.skipped=!0}});return Q(),t},destroy:e=>{X.push({type:"destroy",key:e}),Q()},config:function(e){G={...G,...e},(()=>{V?.sync?.()})()},useMessage:function(e){return K(e)},_InternalPanelDoNotUseOrYouWillBeFired:e=>{let{prefixCls:t,className:n,style:a,type:r,icon:i,content:l,classNames:c,styles:d,...u}=e,{getPrefixCls:p,className:f,style:g,classNames:h,styles:y}=(0,o.useComponentConfig)("message"),C=t||p("message"),x=(0,P.default)(C),[b,w]=F(C,x),[k,S]=(0,D.useMergeSemantic)([h,c],[y,d],{props:e});return s.createElement(v,{...u,prefixCls:C,className:(0,m.clsx)(f,k.root,n,b,`${C}-notice-pure-panel`,w,x),style:{...S.root,...g,...a},eventKey:"pure",duration:null,content:s.createElement(z,{prefixCls:C,type:r,icon:i,classNames:k,styles:S},l)})}};["success","info","warning","error","loading"].forEach(e=>{Z[e]=(...t)=>{let s;return(0,r.globalConfig)(),s=U(s=>{let n,a={type:e,args:t,resolve:s,setCloseFn:e=>{n=e}};return X.push(a),()=>{n?(()=>{n()})():a.skipped=!0}}),Q(),s}});e.s(["message",0,Z],59611)},21583,(e,t,s)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,s=[],n=0;n<e.rangeCount;n++)s.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||s.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,s)=>{"use strict";var n=e.r(21583),a={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var s,r,o,i,l,c,d,u,p=!1;t||(t={}),o=t.debug||!1;try{if(l=n(),c=document.createRange(),d=document.getSelection(),(u=document.createElement("span")).textContent=e,u.ariaHidden="true",u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",function(s){if(s.stopPropagation(),t.format)if(s.preventDefault(),void 0===s.clipboardData){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var n=a[t.format]||a.default;window.clipboardData.setData(n,e)}else s.clipboardData.clearData(),s.clipboardData.setData(t.format,e);t.onCopy&&(s.preventDefault(),t.onCopy(s.clipboardData))}),document.body.appendChild(u),c.selectNodeContents(u),d.addRange(c),!document.execCommand("copy"))throw Error("copy command was unsuccessful");p=!0}catch(n){o&&console.error("unable to copy using execCommand: ",n),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),p=!0}catch(n){o&&console.error("unable to copy using clipboardData: ",n),o&&console.error("falling back to prompt"),s="message"in t?t.message:"Copy to clipboard: #{key}, Enter",r=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",i=s.replace(/#{\s*key\s*}/g,r),window.prompt(i,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(c):d.removeAllRanges()),u&&document.body.removeChild(u),l()}return p}},74190,e=>{"use strict";e.i(89171);var t=e.i(59990);let s={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"};var n=e.i(24144);function a(){return(a=Object.assign.bind()).apply(this,arguments)}let r=t.forwardRef((e,r)=>t.createElement(n.default,a({},e,{ref:r,icon:s})));e.s(["default",0,r],74190)},30815,e=>{"use strict";var t=e.i(65408),s=e.i(59990),n=e.i(33086),a=e.i(54022),r=e.i(17900),o=e.i(59611),i=e.i(57737),l=e.i(26012),c=e.i(98870);let d=[{id:"1",name:"frontend-design",description:"Create distinctive, production-grade frontend interfaces with high design quality",content:`# Frontend Design Skill

You are an expert frontend designer specializing in creating distinctive, production-grade user interfaces.

## Capabilities
- Build React components, HTML/CSS layouts, landing pages, dashboards
- Create visually appealing, unique designs that avoid generic AI aesthetics
- Implement responsive designs with proper mobile-first approach
- Use modern CSS techniques (Flexbox, Grid, CSS Variables)

## Design Principles
1. Prioritize usability and accessibility
2. Use consistent spacing and typography
3. Implement proper color contrast
4. Add subtle animations for better UX
5. Keep designs clean and uncluttered

## Output Requirements
- Clean, well-organized code
- Proper semantic HTML
- CSS-in-JS or scoped styles
- TypeScript when appropriate
- Responsive on all screen sizes`,category:"Development",source:"anthropics/skills"},{id:"2",name:"vercel-react-best-practices",description:"React best practices for Vercel deployments",content:`# Vercel React Best Practices

Follow these practices when building React apps for Vercel:

## Performance
- Use Next.js App Router
- Implement proper code splitting
- Optimize images with next/image
- Use dynamic imports for heavy components

## Data Fetching
- Use Server Components for data fetching
- Implement proper caching strategies
- Use optimistic updates where appropriate

## State Management
- Prefer React Server Components over client state
- Use useState for simple local state
- Consider Zustand or Jotai for global state

## Deployment
- Ensure proper environment variables
- Configure proper headers
- Optimize for Edge runtime when possible`,category:"Development",source:"vercel-labs/agent-skills"},{id:"3",name:"agent-tools",description:"Tools and utilities for AI agent development",content:`# Agent Tools Skill

This skill provides utilities for building AI agents.

## Core Capabilities
- File system operations
- Command execution
- Web search and fetch
- Code interpretation

## Usage
Use these tools to:
- Read and write files
- Execute shell commands
- Search the web
- Run code snippets

## Best Practices
- Always verify file operations
- Use absolute paths
- Handle errors gracefully
- Log all operations`,category:"Tools",source:"inference-sh-0/skills"},{id:"4",name:"skill-creator",description:"Guide for creating effective skills for AI agents",content:`# Skill Creator

Learn how to create effective skills for AI agents.

## Skill Structure
A skill consists of:
1. Name and description
2. Instructions/prompts
3. Available tools (optional)
4. Examples

## Best Practices
- Write clear, specific instructions
- Include examples when helpful
- Define tool usage explicitly
- Test the skill thoroughly

## Template
\`\`\`
# Skill Name

[Description]

## Instructions
[Step-by-step instructions]

## Examples
[Optional examples]
\`\`\``,category:"Development",source:"anthropics/skills"},{id:"5",name:"data-visualization",description:"Create data visualizations with chart selection and best practices",content:`# Data Visualization Skill

Create effective data visualizations using Chart.js and other libraries.

## Chart Selection
- Bar charts: Compare categories
- Line charts: Show trends over time
- Scatter plots: Show correlations
- Pie charts: Show proportions (use sparingly)
- Heatmaps: Show density

## Best Practices
1. Choose appropriate chart type
2. Label axes clearly
3. Use colors effectively
4. Add legends when needed
5. Make it responsive

## Implementation
Use Chart.js for most visualizations:
- Include Chart.js CDN or npm package
- Prepare data in correct format
- Configure options for responsiveness
- Handle updates properly`,category:"Design",source:"anthropics/knowledge-work-plugins"},{id:"6",name:"pdf",description:"PDF operations including reading, writing, and conversion",content:`# PDF Skill

Handle all PDF-related tasks.

## Capabilities
- Read and extract text/tables from PDFs
- Combine or merge multiple PDFs
- Split PDFs into separate pages
- Rotate, add watermarks
- Create new PDFs
- Fill PDF forms
- Encrypt/decrypt PDFs
- OCR on scanned documents

## Tools
Use libraries like:
- pdf.js for reading
- pdf-lib for modification
- tesseract.js for OCR

## Best Practices
- Always handle errors gracefully
- Show progress for large files
- Preserve original quality when possible
- Test with various PDF formats`,category:"Tools",source:"anthropics/skills"},{id:"7",name:"interactive-dashboard-builder",description:"Build interactive HTML dashboards with Chart.js",content:`# Interactive Dashboard Builder

Create self-contained interactive HTML dashboards.

## Features
- Chart.js integration
- Dropdown filters
- Professional styling
- Works without server

## Implementation
1. Include Chart.js and Bootstrap
2. Create responsive layout
3. Add filter controls
4. Implement chart rendering
5. Handle data updates

## Output Format
Single HTML file with embedded CSS/JS that works offline.`,category:"Development",source:"anthropics/knowledge-work-plugins"},{id:"8",name:"feature-spec",description:"Write structured product requirements documents",content:`# Feature Spec Skill

Write structured PRDs (Product Requirements Documents).

## Template Sections
1. Problem Statement
2. User Stories
3. Requirements
4. Success Metrics
5. Timeline
6. Technical Notes

## Guidelines
- Be specific and measurable
- Include acceptance criteria
- Define out-of-scope items
- Consider edge cases`,category:"Product",source:"anthropics/knowledge-work-plugins"},{id:"9",name:"codereview-roasted",description:"Brutally honest code review in the style of Linus Torvalds",content:`# Code Review - Roast Style

Provide brutally honest code reviews.

## Focus Areas
- Data structures choice
- Algorithm efficiency
- Code simplicity
- Naming conventions
- Error handling
- Security concerns

## Tone
- Direct and honest
- Focus on technical merit
- Suggest improvements
- Don't be mean, be helpful`,category:"Development",source:"openhands/skills"},{id:"10",name:"browser-use",description:"Automate browser tasks using Playwright or Puppeteer",content:`# Browser Automation Skill

Automate browser tasks using Playwright or Puppeteer.

## Use Cases
- Web scraping
- Form filling
- Screenshot capture
- Testing web applications
- Automation workflows

## Best Practices
- Use Playwright for modern features
- Handle waits properly
- Clean up resources
- Respect robots.txt
- Don't overload servers`,category:"Automation",source:"browser-use"}];function u(){let[e,u]=(0,s.useState)(""),[p,m]=(0,s.useState)(null),[f,g]=(0,s.useState)(""),[h,y]=(0,s.useState)(!1),v=d.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.description.toLowerCase().includes(e.toLowerCase())),C=e=>{(0,l.default)(e),o.message.success("复制成功")},x=async e=>{let t=`${window.location.origin}/skills?skill=${encodeURIComponent(JSON.stringify({name:e.name,content:e.content}))}`;try{let s=await c.default.toDataURL(t);g(s),m(e),y(!0)}catch{o.message.error("生成二维码失败")}};return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Skills"})}),(0,t.jsx)(n.Input,{placeholder:"搜索 Skills...",value:e,onChange:e=>u(e.target.value),className:"mb-6",size:"large"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:v.map(e=>(0,t.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>m(e),children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.name}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(i.Tag,{color:"green",children:e.category}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(r.Button,{size:"small",onClick:t=>{t.stopPropagation(),C(e.content)},children:"复制"}),(0,t.jsx)(r.Button,{size:"small",onClick:t=>{t.stopPropagation(),x(e)},children:"分享"})]})]})]},e.id))}),(0,t.jsx)(a.Modal,{open:!!p,onCancel:()=>m(null),footer:null,width:800,title:p?.name,children:p&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("p",{className:"text-gray-600",children:p.description})}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)(i.Tag,{color:"green",children:p.category}),(0,t.jsxs)(i.Tag,{className:"ml-2",children:["来源: ",p.source]})]}),(0,t.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto",children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:p.content})}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(r.Button,{type:"primary",onClick:()=>C(p.content),children:"复制"}),(0,t.jsx)(r.Button,{onClick:()=>x(p),children:"分享"})]})]})}),(0,t.jsx)(a.Modal,{open:h,onCancel:()=>y(!1),footer:null,title:"分享 Skill",children:f&&(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:f,alt:"QR Code",className:"mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Skill"})]})})]})}e.s(["default",()=>u],30815)}]);