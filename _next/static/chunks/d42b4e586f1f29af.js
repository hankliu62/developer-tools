(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53359,e=>{"use strict";e.i(89171);var t=e.i(59990);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};var a=e.i(24144);function s(){return(s=Object.assign.bind()).apply(this,arguments)}let o=t.forwardRef((e,o)=>t.createElement(a.default,s({},e,{ref:o,icon:r})));e.s(["default",0,o],53359)},96385,e=>{"use strict";let t=e.i(59990).default.createContext({});e.s(["AppConfigContext",0,t])},29870,70276,e=>{"use strict";e.i(89171);var t=e.i(59990);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};var a=e.i(24144);function s(){return(s=Object.assign.bind()).apply(this,arguments)}let o=t.forwardRef((e,o)=>t.createElement(a.default,s({},e,{ref:o,icon:r})));e.s(["default",0,o],29870);let n={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};function i(){return(i=Object.assign.bind()).apply(this,arguments)}let l=t.forwardRef((e,r)=>t.createElement(a.default,i({},e,{ref:r,icon:n})));e.s(["default",0,l],70276)},59611,37248,e=>{"use strict";e.i(89171);var t=e.i(35492),r=e.i(59990),a=e.i(45605),s=e.i(96385),o=e.i(59782),n=e.i(77425),i=e.i(53359),l=e.i(557),c=e.i(29870),d=e.i(70276),u=e.i(33421),p=e.i(45512),m=e.i(7284);e.i(98178);var g=e.i(85238);e.s(["CSSMotionList",()=>g.default],37248);var g=g,f=e.i(47371),y=e.i(14828);function h(){return(h=Object.assign.bind()).apply(this,arguments)}let b=r.forwardRef((e,t)=>{let{prefixCls:a,style:s,className:o,duration:n=4.5,showProgress:i,pauseOnHover:l=!0,eventKey:c,content:d,closable:u,props:p,onClick:g,onNoticeClose:b,times:C,hovering:x}=e,[v,E]=r.useState(!1),[k,S]=r.useState(0),[w,$]=r.useState(0),R=x||v,N="number"==typeof n?n:0,T=N>0&&i,I=()=>{b(c)};r.useEffect(()=>{if(!R&&N>0){let e=Date.now()-w,t=setTimeout(()=>{I()},1e3*N-w);return()=>{l&&clearTimeout(t),$(Date.now()-e)}}},[N,R,C]),r.useEffect(()=>{if(!R&&T&&(l||0===w)){let e,t=performance.now(),r=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(e=>{let a=Math.min((e+w-t)/(1e3*N),1);S(100*a),a<1&&r()})};return r(),()=>{l&&cancelAnimationFrame(e)}}},[N,w,R,T,C]);let A=r.useMemo(()=>"object"==typeof u&&null!==u?u:{},[u]),P=(0,y.default)(A,!0),D=100-(!k||k<0?0:k>100?100:k),M=`${a}-notice`;return r.createElement("div",h({},p,{ref:t,className:(0,m.clsx)(M,o,{[`${M}-closable`]:u}),style:s,onMouseEnter:e=>{E(!0),p?.onMouseEnter?.(e)},onMouseLeave:e=>{E(!1),p?.onMouseLeave?.(e)},onClick:g}),r.createElement("div",{className:`${M}-content`},d),u&&r.createElement("button",h({className:`${M}-close`,onKeyDown:e=>{("Enter"===e.key||"Enter"===e.code||e.keyCode===f.default.ENTER)&&I()},"aria-label":"Close"},P,{onClick:e=>{e.preventDefault(),e.stopPropagation(),I()}}),A.closeIcon??"x"),T&&r.createElement("progress",{className:`${M}-progress`,max:"100",value:D},D+"%"))}),C=r.default.createContext({}),x=({children:e,classNames:t})=>r.default.createElement(C.Provider,{value:{classNames:t}},e);function v(){return(v=Object.assign.bind()).apply(this,arguments)}let E=e=>{let t,{configList:a,placement:s,prefixCls:o,className:n,style:i,motion:l,onAllNoticeRemoved:c,onNoticeClose:d,stack:u}=e,{classNames:p}=(0,r.useContext)(C),f=(0,r.useRef)({}),[y,h]=(0,r.useState)(null),[x,E]=(0,r.useState)([]),k=a.map(e=>({config:e,key:String(e.key)})),[S,{offset:w,threshold:$,gap:R}]=(t={offset:8,threshold:3,gap:16},u&&"object"==typeof u&&(t.offset=u.offset??8,t.threshold=u.threshold??3,t.gap=u.gap??16),[!!u,t]),N=S&&(x.length>0||k.length<=$),T="function"==typeof l?l(s):l;return(0,r.useEffect)(()=>{S&&x.length>1&&E(e=>e.filter(e=>k.some(({key:t})=>e===t)))},[x,k,S]),(0,r.useEffect)(()=>{S&&f.current[k[k.length-1]?.key]&&h(f.current[k[k.length-1]?.key])},[k,S]),r.default.createElement(g.default,v({key:s,className:(0,m.clsx)(o,`${o}-${s}`,p?.list,n,{[`${o}-stack`]:!!S,[`${o}-stack-expanded`]:N}),style:i,keys:k,motionAppear:!0},T,{onAllRemoved:()=>{c(s)}}),({config:e,className:t,style:a,index:n},i)=>{let{key:l,times:c}=e,u=String(l),{className:g,style:h,classNames:C,styles:$,...T}=e,I=k.findIndex(e=>e.key===u),A={};if(S){let e=k.length-1-(I>-1?I:n-1),t="top"===s||"bottom"===s?"-50%":"0";if(e>0){A.height=N?f.current[u]?.offsetHeight:y?.offsetHeight;let r=0;for(let t=0;t<e;t++)r+=f.current[k[k.length-1-t].key]?.offsetHeight+R;let a=(N?r:e*w)*(s.startsWith("top")?1:-1),o=!N&&y?.offsetWidth&&f.current[u]?.offsetWidth?(y?.offsetWidth-2*w*(e<3?e:3))/f.current[u]?.offsetWidth:1;A.transform=`translate3d(${t}, ${a}px, 0) scaleX(${o})`}else A.transform=`translate3d(${t}, 0, 0)`}return r.default.createElement("div",{ref:i,className:(0,m.clsx)(`${o}-notice-wrapper`,t,C?.wrapper),style:{...a,...A,...$?.wrapper},onMouseEnter:()=>E(e=>e.includes(u)?e:[...e,u]),onMouseLeave:()=>E(e=>e.filter(e=>e!==u))},r.default.createElement(b,v({},T,{ref:e=>{I>-1?f.current[u]=e:delete f.current[u]},prefixCls:o,classNames:C,styles:$,className:(0,m.clsx)(g,p?.notice),style:h,times:c,key:l,eventKey:l,onNoticeClose:d,hovering:S&&x.length>0})))})},k=r.forwardRef((e,t)=>{let{prefixCls:a="rc-notification",container:s,motion:o,maxCount:n,className:i,style:l,onAllRemoved:c,stack:d,renderNotifications:u}=e,[m,g]=r.useState([]),f=e=>{let t=m.find(t=>t.key===e),r=t?.closable,{onClose:a}=r&&"object"==typeof r?r:{};a?.(),t?.onClose?.(),g(t=>t.filter(t=>t.key!==e))};r.useImperativeHandle(t,()=>({open:e=>{g(t=>{let r=[...t],a=r.findIndex(t=>t.key===e.key),s={...e};return a>=0?(s.times=(t[a]?.times||0)+1,r[a]=s):(s.times=0,r.push(s)),n>0&&r.length>n&&(r=r.slice(-n)),r})},close:e=>{f(e)},destroy:()=>{g([])}}));let[y,h]=r.useState({});r.useEffect(()=>{let e={};m.forEach(t=>{let{placement:r="topRight"}=t;r&&(e[r]=e[r]||[],e[r].push(t))}),Object.keys(y).forEach(t=>{e[t]=e[t]||[]}),h(e)},[m]);let b=e=>{h(t=>{let r={...t};return(r[e]||[]).length||delete r[e],r})},C=r.useRef(!1);if(r.useEffect(()=>{Object.keys(y).length>0?C.current=!0:C.current&&(c?.(),C.current=!1)},[y]),!s)return null;let x=Object.keys(y);return(0,p.createPortal)(r.createElement(r.Fragment,null,x.map(e=>{let t=y[e],s=r.createElement(E,{key:e,configList:t,placement:e,prefixCls:a,className:i?.(e),style:l?.(e),motion:o,onNoticeClose:f,onAllNoticeRemoved:b,stack:d});return u?u(s,{prefixCls:a,key:e}):s})),s)});e.i(51235);var S=e.i(26600);let w=()=>document.body,$=0;var R=e.i(31861),N=e.i(1975),T=e.i(31328);e.i(99838);var I=e.i(34471),A=e.i(81221),P=e.i(97638),D=e.i(4999),M=e.i(21746);let j=(0,D.genStyleHooks)("Message",e=>(e=>{let{componentCls:t,iconCls:r,boxShadow:a,colorText:s,colorSuccess:o,colorError:n,colorWarning:i,colorInfo:l,fontSizeLG:c,motionEaseInOutCirc:d,motionDurationSlow:u,marginXS:p,paddingXS:m,borderRadiusLG:g,zIndexPopup:f,contentPadding:y,contentBg:h}=e,b=`${t}-notice`,C=new I.Keyframes("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:m,transform:"translateY(0)",opacity:1}}),x=new I.Keyframes("MessageMoveOut",{"0%":{maxHeight:e.height,padding:m,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),v={padding:m,textAlign:"center",[`${t}-custom-content`]:{display:"flex",alignItems:"center"},[`${t}-custom-content > ${r}`]:{marginInlineEnd:p,fontSize:c},[`${b}-content`]:{display:"inline-block",padding:y,background:h,borderRadius:g,boxShadow:a,pointerEvents:"all"},[`${t}-success > ${r}`]:{color:o},[`${t}-error > ${r}`]:{color:n},[`${t}-warning > ${r}`]:{color:i},[`${t}-info > ${r},
      ${t}-loading > ${r}`]:{color:l}};return[{[t]:{...(0,P.resetComponent)(e),color:s,position:"fixed",top:p,width:"100%",pointerEvents:"none",zIndex:f,[`${t}-move-up`]:{animationFillMode:"forwards"},[`
        ${t}-move-up-appear,
        ${t}-move-up-enter
      `]:{animationName:C,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`
        ${t}-move-up-appear${t}-move-up-appear-active,
        ${t}-move-up-enter${t}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${t}-move-up-leave`]:{animationName:x,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`${t}-move-up-leave${t}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}}},{[t]:{[`${b}-wrapper`]:{...v}}},{[`${t}-notice-pure-panel`]:{...v,padding:0,textAlign:"start"}}]})((0,M.mergeToken)(e,{height:150})),e=>({zIndexPopup:e.zIndexPopupBase+A.CONTAINER_MAX_OFFSET+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`})),U={info:r.createElement(d.default,null),success:r.createElement(i.default,null),error:r.createElement(l.default,null),warning:r.createElement(c.default,null),loading:r.createElement(u.default,null)},L=e=>{let{prefixCls:t,type:a,icon:s,children:o,classNames:n,styles:i}=e,l=s||a&&U[a],c=(0,N.cloneElement)(l,e=>{let t={...e?.style,...i?.icon};return{className:(0,m.clsx)(e.className,n?.icon),style:t}});return r.createElement("div",{className:(0,m.clsx)(`${t}-custom-content`,`${t}-${a}`)},c,r.createElement("span",{className:n?.content,style:i?.content},o))};var O=e.i(92233),B=e.i(39266);function H(e){let t,r=new Promise(r=>{t=e(()=>{r(!0)})}),a=()=>{t?.()};return a.then=(e,t)=>r.then(e,t),a.promise=r,a}let _=({children:e,prefixCls:t})=>{let a=(0,T.default)(t),[s,o]=j(t,a);return r.createElement(x,{classNames:{list:(0,m.clsx)(s,o,a)}},e)},q=(e,{prefixCls:t,key:a})=>r.createElement(_,{prefixCls:t,key:a},e),F=r.forwardRef((e,t)=>{let{top:a,prefixCls:s,getContainer:o,maxCount:i,duration:l=3,rtl:c,transitionName:d,onAllRemoved:u,pauseOnHover:p=!0}=e,{getPrefixCls:g,direction:f,getPopupContainer:y}=(0,n.useComponentConfig)("message"),{message:h}=r.useContext(n.ConfigContext),b=s||g("message"),[C,x]=(0,R.useMergeSemantic)([e?.classNames,h?.classNames],[e?.styles,h?.styles],{props:e}),[v,E]=function(e={}){let{getContainer:t=w,motion:a,prefixCls:s,maxCount:o,className:n,style:i,onAllRemoved:l,stack:c,renderNotifications:d,...u}=e,[p,m]=r.useState(),g=r.useRef(),f=r.createElement(k,{container:p,ref:g,prefixCls:s,motion:a,maxCount:o,className:n,style:i,onAllRemoved:l,stack:c,renderNotifications:d}),[y,h]=r.useState([]),b=(0,S.useEvent)(e=>{let t=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(r=>{let a=e[r];void 0!==a&&(t[r]=a)})}),t}(u,e);(null===t.key||void 0===t.key)&&(t.key=`rc-notification-${$}`,$+=1),h(e=>[...e,{type:"open",config:t}])}),C=r.useMemo(()=>({open:b,close:e=>{h(t=>[...t,{type:"close",key:e}])},destroy:()=>{h(e=>[...e,{type:"destroy"}])}}),[]);return r.useEffect(()=>{m(t())}),r.useEffect(()=>{if(g.current&&y.length){let e,t;y.forEach(e=>{switch(e.type){case"open":g.current.open(e.config);break;case"close":g.current.close(e.key);break;case"destroy":g.current.destroy()}}),h(r=>(e===r&&t||(e=r,t=r.filter(e=>!y.includes(e))),t))}},[y]),[C,f]}({prefixCls:b,style:()=>({left:"50%",transform:"translateX(-50%)",top:a??8}),className:()=>(0,m.clsx)({[`${b}-rtl`]:c??"rtl"===f}),motion:()=>({motionName:d??`${b}-move-up`}),closable:!1,duration:l,getContainer:()=>o?.()||y?.()||document.body,maxCount:i,onAllRemoved:u,renderNotifications:q,pauseOnHover:p});return r.useImperativeHandle(t,()=>({...v,prefixCls:b,message:h,classNames:C,styles:x})),E}),z=0;function G(e){let t=r.useRef(null);return(0,B.devUseWarning)("Message"),[r.useMemo(()=>{let a=e=>{t.current?.close(e)},s=s=>{if(!t.current){let e=()=>{};return e.then=()=>{},e}let{open:o,prefixCls:n,message:i,classNames:l,styles:c}=t.current,d=i?.className||{},u=i?.style||{},p=i?.classNames||{},g=i?.styles||{},f=`${n}-notice`,{content:y,icon:h,type:b,key:C,className:x,style:v,onClose:E,classNames:k={},styles:S={},...w}=s,$=C;(0,O.default)($)||(z+=1,$=`antd-message-${z}`);let N={...e,...s},T=(0,R.resolveStyleOrClass)(p,{props:N}),I=(0,R.resolveStyleOrClass)(k,{props:N}),A=(0,R.resolveStyleOrClass)(g,{props:N}),P=(0,R.resolveStyleOrClass)(S,{props:N}),D=(0,R.mergeClassNames)(void 0,T,I,l),M=(0,R.mergeStyles)(A,P,c);return H(e=>(o({...w,key:$,content:r.createElement(L,{prefixCls:n,type:b,icon:h,classNames:D,styles:M},y),placement:"top",className:(0,m.clsx)({[`${f}-${b}`]:b},x,d,D.root),style:{...M.root,...u,...v},onClose:()=>{E?.(),e()}}),()=>{a($)}))},o={open:s,destroy:e=>{void 0!==e?a(e):t.current?.destroy()}};return["info","success","warning","error","loading"].forEach(e=>{o[e]=(t,r,a)=>{let o,n,i;return o=t&&"object"==typeof t&&"content"in t?t:{content:t},"function"==typeof r?i=r:(n=r,i=a),s({onClose:i,duration:n,...o,type:e})}}),o},[]),r.createElement(F,{key:"message-holder",...e,ref:t})]}let W=null,K=[],V={};function X(){let{getContainer:e,duration:t,rtl:r,maxCount:a,top:s}=V,o=e?.()||document.body;return{getContainer:()=>o,duration:t,rtl:r,maxCount:a,top:s}}let Y=r.default.forwardRef((e,t)=>{let{messageConfig:a,sync:o}=e,{getPrefixCls:i}=(0,r.useContext)(n.ConfigContext),l=V.prefixCls||i("message"),c=(0,r.useContext)(s.AppConfigContext),[d,u]=G({...a,prefixCls:l,...c.message});return r.default.useImperativeHandle(t,()=>{let e={...d};return Object.keys(e).forEach(t=>{e[t]=(...e)=>(o(),d[t].apply(d,e))}),{instance:e,sync:o}}),u}),Q=r.default.forwardRef((e,t)=>{let[a,s]=r.default.useState(X),n=()=>{s(X)};r.default.useEffect(n,[]);let i=(0,o.globalConfig)(),l=i.getRootPrefixCls(),c=i.getIconPrefixCls(),d=i.getTheme(),u=r.default.createElement(Y,{ref:t,sync:n,messageConfig:a});return r.default.createElement(o.default,{prefixCls:l,iconPrefixCls:c,theme:d},i.holderRender?i.holderRender(u):u)}),J=()=>{if(!W){let e=document.createDocumentFragment(),t={fragment:e};W=t,(()=>{(0,a.render)(r.default.createElement(Q,{ref:e=>{let{instance:r,sync:a}=e||{};Promise.resolve().then(()=>{!t.instance&&r&&(t.instance=r,t.sync=a,J())})}}),e)})();return}W.instance&&(K.forEach(e=>{let{type:r,skipped:a}=e;if(!a)switch(r){case"open":{let t=W.instance.open({...V,...e.config});t?.then(e.resolve),e.setCloseFn(t)}break;case"destroy":W?.instance.destroy(e.key);break;default:{var s;let a=(s=W.instance)[r].apply(s,(0,t.default)(e.args));a?.then(e.resolve),e.setCloseFn(a)}}}),K=[])},Z={open:function(e){let t=H(t=>{let r,a={type:"open",config:e,resolve:t,setCloseFn:e=>{r=e}};return K.push(a),()=>{r?(()=>{r()})():a.skipped=!0}});return J(),t},destroy:e=>{K.push({type:"destroy",key:e}),J()},config:function(e){V={...V,...e},(()=>{W?.sync?.()})()},useMessage:function(e){return G(e)},_InternalPanelDoNotUseOrYouWillBeFired:e=>{let{prefixCls:t,className:a,style:s,type:o,icon:i,content:l,classNames:c,styles:d,...u}=e,{getPrefixCls:p,className:g,style:f,classNames:y,styles:h}=(0,n.useComponentConfig)("message"),C=t||p("message"),x=(0,T.default)(C),[v,E]=j(C,x),[k,S]=(0,R.useMergeSemantic)([y,c],[h,d],{props:e});return r.createElement(b,{...u,prefixCls:C,className:(0,m.clsx)(g,k.root,a,v,`${C}-notice-pure-panel`,E,x),style:{...S.root,...f,...s},eventKey:"pure",duration:null,content:r.createElement(L,{prefixCls:C,type:o,icon:i,classNames:k,styles:S},l)})}};["success","info","warning","error","loading"].forEach(e=>{Z[e]=(...t)=>{let r;return(0,o.globalConfig)(),r=H(r=>{let a,s={type:e,args:t,resolve:r,setCloseFn:e=>{a=e}};return K.push(s),()=>{a?(()=>{a()})():s.skipped=!0}}),J(),r}});e.s(["message",0,Z],59611)},21583,(e,t,r)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],a=0;a<e.rangeCount;a++)r.push(e.getRangeAt(a));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||r.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,r)=>{"use strict";var a=e.r(21583),s={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var r,o,n,i,l,c,d,u,p=!1;t||(t={}),n=t.debug||!1;try{if(l=a(),c=document.createRange(),d=document.getSelection(),(u=document.createElement("span")).textContent=e,u.ariaHidden="true",u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),void 0===r.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=s[t.format]||s.default;window.clipboardData.setData(a,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))}),document.body.appendChild(u),c.selectNodeContents(u),d.addRange(c),!document.execCommand("copy"))throw Error("copy command was unsuccessful");p=!0}catch(a){n&&console.error("unable to copy using execCommand: ",a),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),p=!0}catch(a){n&&console.error("unable to copy using clipboardData: ",a),n&&console.error("falling back to prompt"),r="message"in t?t.message:"Copy to clipboard: #{key}, Enter",o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",i=r.replace(/#{\s*key\s*}/g,o),window.prompt(i,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(c):d.removeAllRanges()),u&&document.body.removeChild(u),l()}return p}},74190,e=>{"use strict";e.i(89171);var t=e.i(59990);let r={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"};var a=e.i(24144);function s(){return(s=Object.assign.bind()).apply(this,arguments)}let o=t.forwardRef((e,o)=>t.createElement(a.default,s({},e,{ref:o,icon:r})));e.s(["default",0,o],74190)},81485,e=>{"use strict";e.i(89171);var t=e.i(59990),r=e.i(7284),a=e.i(31861),s=e.i(77425);let o=e=>{let{prefixCls:a,className:s,style:o,size:n,shape:i}=e,l=(0,r.clsx)({[`${a}-lg`]:"large"===n,[`${a}-sm`]:"small"===n}),c=(0,r.clsx)({[`${a}-circle`]:"circle"===i,[`${a}-square`]:"square"===i,[`${a}-round`]:"round"===i}),d=t.useMemo(()=>"number"==typeof n?{width:n,height:n,lineHeight:`${n}px`}:{},[n]);return t.createElement("span",{className:(0,r.clsx)(a,l,c,s),style:{...d,...o}})};e.i(99838);var n=e.i(34471),i=e.i(32556),l=e.i(4999),c=e.i(21746);let d=new n.Keyframes("ant-skeleton-loading",{"0%":{backgroundPosition:"100% 50%"},"100%":{backgroundPosition:"0 50%"}}),u=e=>({height:e,lineHeight:(0,i.unit)(e)}),p=e=>({width:e,...u(e)}),m=(e,t)=>({width:t(e).mul(5).equal(),minWidth:t(e).mul(5).equal(),...u(e)}),g=e=>{let{gradientFromColor:t,borderRadiusSM:r,imageSizeBase:a,calc:s}=e;return{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"middle",background:t,borderRadius:r,...p(s(a).mul(2).equal())}},f=(e,t,r)=>{let{skeletonButtonCls:a}=e;return{[`${r}${a}-circle`]:{width:t,minWidth:t,borderRadius:"50%"},[`${r}${a}-round`]:{borderRadius:t}}},y=(e,t)=>({width:t(e).mul(2).equal(),minWidth:t(e).mul(2).equal(),...u(e)}),h=(0,l.genStyleHooks)("Skeleton",e=>{let{componentCls:t,calc:r}=e;return(e=>{let{componentCls:t,skeletonAvatarCls:r,skeletonTitleCls:a,skeletonParagraphCls:s,skeletonButtonCls:o,skeletonInputCls:n,skeletonNodeCls:i,skeletonImageCls:l,controlHeight:c,controlHeightLG:u,controlHeightSM:h,gradientFromColor:b,padding:C,marginSM:x,borderRadius:v,titleHeight:E,blockRadius:k,paragraphLiHeight:S,controlHeightXS:w,paragraphMarginTop:$}=e;return{[t]:{display:"table",width:"100%",[`${t}-header`]:{display:"table-cell",paddingInlineEnd:C,verticalAlign:"top",[r]:{display:"inline-block",verticalAlign:"top",background:b,...p(c)},[`${r}-circle`]:{borderRadius:"50%"},[`${r}-lg`]:{...p(u)},[`${r}-sm`]:{...p(h)}},[`${t}-section`]:{display:"table-cell",width:"100%",verticalAlign:"top",[a]:{width:"100%",height:E,background:b,borderRadius:k,[`+ ${s}`]:{marginBlockStart:h}},[s]:{padding:0,"> li":{width:"100%",height:S,listStyle:"none",background:b,borderRadius:k,"+ li":{marginBlockStart:w}}},[`${s}> li:last-child:not(:first-child):not(:nth-child(2))`]:{width:"61%"}},[`&-round ${t}-section`]:{[`${a}, ${s} > li`]:{borderRadius:v}}},[`${t}-with-avatar ${t}-section`]:{[a]:{marginBlockStart:x,[`+ ${s}`]:{marginBlockStart:$}}},[`${t}${t}-element`]:{display:"inline-block",width:"auto",...(e=>{let{borderRadiusSM:t,skeletonButtonCls:r,controlHeight:a,controlHeightLG:s,controlHeightSM:o,gradientFromColor:n,calc:i}=e;return{[r]:{display:"inline-block",verticalAlign:"top",background:n,borderRadius:t,width:i(a).mul(2).equal(),minWidth:i(a).mul(2).equal(),...y(a,i)},...f(e,a,r),[`${r}-lg`]:{...y(s,i)},...f(e,s,`${r}-lg`),[`${r}-sm`]:{...y(o,i)},...f(e,o,`${r}-sm`)}})(e),...(e=>{let{skeletonAvatarCls:t,gradientFromColor:r,controlHeight:a,controlHeightLG:s,controlHeightSM:o}=e;return{[t]:{display:"inline-block",verticalAlign:"top",background:r,...p(a)},[`${t}${t}-circle`]:{borderRadius:"50%"},[`${t}${t}-lg`]:{...p(s)},[`${t}${t}-sm`]:{...p(o)}}})(e),...(e=>{let{controlHeight:t,borderRadiusSM:r,skeletonInputCls:a,controlHeightLG:s,controlHeightSM:o,gradientFromColor:n,calc:i}=e;return{[a]:{display:"inline-block",verticalAlign:"top",background:n,borderRadius:r,...m(t,i)},[`${a}-lg`]:{...m(s,i)},[`${a}-sm`]:{...m(o,i)}}})(e),...{[e.skeletonNodeCls]:{...g(e)}},...(e=>{let{skeletonImageCls:t,imageSizeBase:r,calc:a}=e;return{[t]:{...g(e),[`${t}-path`]:{fill:"#bfbfbf"},[`${t}-svg`]:{...p(r),maxWidth:a(r).mul(4).equal(),maxHeight:a(r).mul(4).equal()},[`${t}-svg${t}-svg-circle`]:{borderRadius:"50%"}},[`${t}${t}-circle`]:{borderRadius:"50%"}}})(e)},[`${t}${t}-block`]:{width:"100%",[o]:{width:"100%"},[n]:{width:"100%"}},[`${t}${t}-active`]:{[`
        ${a},
        ${s} > li,
        ${r},
        ${o},
        ${n},
        ${i},
        ${l}
      `]:{...{background:e.skeletonLoadingBackground,backgroundSize:"400% 100%",animationName:d,animationDuration:e.skeletonLoadingMotionDuration,animationTimingFunction:"ease",animationIterationCount:"infinite"}}}}})((0,c.mergeToken)(e,{skeletonAvatarCls:`${t}-avatar`,skeletonTitleCls:`${t}-title`,skeletonParagraphCls:`${t}-paragraph`,skeletonButtonCls:`${t}-button`,skeletonInputCls:`${t}-input`,skeletonNodeCls:`${t}-node`,skeletonImageCls:`${t}-image`,imageSizeBase:r(e.controlHeight).mul(1.5).equal(),borderRadius:100,skeletonLoadingBackground:`linear-gradient(90deg, ${e.gradientFromColor} 25%, ${e.gradientToColor} 37%, ${e.gradientFromColor} 63%)`,skeletonLoadingMotionDuration:"1.4s"}))},e=>{let{colorFillContent:t,colorFill:r}=e;return{color:t,colorGradientEnd:r,gradientFromColor:t,gradientToColor:r,titleHeight:e.controlHeight/2,blockRadius:e.borderRadiusSM,paragraphMarginTop:e.marginLG+e.marginXXS,paragraphLiHeight:e.controlHeight/2}},{deprecatedTokens:[["color","gradientFromColor"],["colorGradientEnd","gradientToColor"]]}),b=e=>{let{prefixCls:a,className:o,classNames:n,rootClassName:i,internalClassName:l,style:c,styles:d,active:u,children:p}=e,{getPrefixCls:m}=t.useContext(s.ConfigContext),g=m("skeleton",a),[f,y]=h(g),b=(0,r.clsx)(g,`${g}-element`,{[`${g}-active`]:u},f,n?.root,o,i,y);return t.createElement("div",{className:b,style:d?.root},t.createElement("div",{className:(0,r.clsx)(n?.content,l||`${g}-node`),style:{...d?.content,...c}},p))},C=e=>{let{prefixCls:a,className:s,style:o,rows:n=0}=e,i=Array.from({length:n}).map((r,a)=>t.createElement("li",{key:a,style:{width:((e,t)=>{let{width:r,rows:a=2}=t;return Array.isArray(r)?r[e]:a-1===e?r:void 0})(a,e)}}));return t.createElement("ul",{className:(0,r.clsx)(a,s),style:o},i)},x=({prefixCls:e,className:a,width:s,style:o})=>t.createElement("h3",{className:(0,r.clsx)(e,a),style:{width:s,...o}});function v(e){return e&&"object"==typeof e?e:{}}let E=e=>{let{prefixCls:n,loading:i,className:l,rootClassName:c,classNames:d,style:u,styles:p,children:m,avatar:g=!1,title:f=!0,paragraph:y=!0,active:b,round:E}=e,{getPrefixCls:k,direction:S,className:w,style:$,classNames:R,styles:N}=(0,s.useComponentConfig)("skeleton"),T=k("skeleton",n),[I,A]=h(T),P={...e,avatar:g,title:f,paragraph:y},[D,M]=(0,a.useMergeSemantic)([R,d],[N,p],{props:P});if(i||!("loading"in e)){let e,a,s=!!g,n=!!f,i=!!y;if(s){let a={className:D.avatar,prefixCls:`${T}-avatar`,...n&&!i?{size:"large",shape:"square"}:{size:"large",shape:"circle"},...v(g),style:M.avatar};e=t.createElement("div",{className:(0,r.clsx)(D.header,`${T}-header`),style:M.header},t.createElement(o,{...a}))}if(n||i){let e,o;if(n){let r={className:D.title,prefixCls:`${T}-title`,...!s&&i?{width:"38%"}:s&&i?{width:"50%"}:{},...v(f),style:M.title};e=t.createElement(x,{...r})}if(i){let e,r={className:D.paragraph,prefixCls:`${T}-paragraph`,...(e={},(!s||!n)&&(e.width="61%"),!s&&n?e.rows=3:e.rows=2,e),...v(y),style:M.paragraph};o=t.createElement(C,{...r})}a=t.createElement("div",{className:(0,r.clsx)(D.section,`${T}-section`),style:M.section},e,o)}let d=(0,r.clsx)(T,{[`${T}-with-avatar`]:s,[`${T}-active`]:b,[`${T}-rtl`]:"rtl"===S,[`${T}-round`]:E},D.root,w,l,c,I,A);return t.createElement("div",{className:d,style:{...M.root,...$,...u}},e,a)}return m??null};E.Button=e=>{let{prefixCls:a,className:n,rootClassName:i,classNames:l,active:c,style:d,styles:u,block:p=!1,size:m="default",...g}=e,{getPrefixCls:f}=t.useContext(s.ConfigContext),y=f("skeleton",a),[b,C]=h(y),x=(0,r.clsx)(y,`${y}-element`,{[`${y}-active`]:c,[`${y}-block`]:p},l?.root,n,i,b,C);return t.createElement("div",{className:x,style:u?.root},t.createElement(o,{prefixCls:`${y}-button`,className:l?.content,style:{...u?.content,...d},size:m,...g}))},E.Avatar=e=>{let{prefixCls:a,className:n,classNames:i,rootClassName:l,active:c,style:d,styles:u,shape:p="circle",size:m="default",...g}=e,{getPrefixCls:f}=t.useContext(s.ConfigContext),y=f("skeleton",a),[b,C]=h(y),x=(0,r.clsx)(y,`${y}-element`,{[`${y}-active`]:c},i?.root,n,l,b,C);return t.createElement("div",{className:x,style:u?.root},t.createElement(o,{prefixCls:`${y}-avatar`,className:i?.content,style:{...u?.content,...d},shape:p,size:m,...g}))},E.Input=e=>{let{prefixCls:a,className:n,classNames:i,rootClassName:l,active:c,block:d,style:u,styles:p,size:m="default",...g}=e,{getPrefixCls:f}=t.useContext(s.ConfigContext),y=f("skeleton",a),[b,C]=h(y),x=(0,r.clsx)(y,`${y}-element`,{[`${y}-active`]:c,[`${y}-block`]:d},i?.root,n,l,b,C);return t.createElement("div",{className:x,style:p?.root},t.createElement(o,{prefixCls:`${y}-input`,className:i?.content,style:{...p?.content,...u},size:m,...g}))},E.Image=e=>{let{getPrefixCls:r}=t.useContext(s.ConfigContext),a=r("skeleton",e.prefixCls);return t.createElement(b,{...e,internalClassName:`${a}-image`},t.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:`${a}-image-svg`},t.createElement("title",null,"Image placeholder"),t.createElement("path",{d:"M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",className:`${a}-image-path`})))},E.Node=b,e.s(["default",0,E],81485)},57737,84323,e=>{"use strict";e.i(89171);var t=e.i(59990);e.i(51235);var r=e.i(23267),a=e.i(7284),s=e.i(74190),o=e.i(14828),n=e.i(59894),i=e.i(18218);let l=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(r=>{void 0!==e[r]&&(t[r]=e[r])})}),t};var c=e.i(92233);let d=e=>{if(!e)return;let{closable:t,closeIcon:r}=e;return{closable:t,closeIcon:r}},u={},p=(e,t)=>{if(!e&&(!1===e||!1===t||null===t))return!1;if(void 0===e&&void 0===t)return null;let r={closeIcon:"boolean"!=typeof t&&null!==t?t:void 0};return e&&"object"==typeof e&&(r={...r,...e}),r},m=(e,r,a=u)=>{let[d]=(0,n.useLocale)("global",i.default.global);return t.default.useMemo(()=>((e,r,a=u,n="Close")=>{let i=p(e?.closable,e?.closeIcon),d=p(r?.closable,r?.closeIcon),m={closeIcon:t.default.createElement(s.default,null),...a},g=!1!==i&&(i?l(m,d,i):!1!==d&&(d?l(m,d):!!m.closable&&m)),f="boolean"!=typeof g&&!!g?.disabled;if(!1===g)return[!1,null,f,{}];let[y,h]=((e,r,a)=>{let{closeIconRender:s}=r,{closeIcon:n,...i}=e,l=n,d=(0,o.default)(i,!0);return(0,c.default)(l)&&(s&&(l=s(l)),l=t.default.isValidElement(l)?t.default.cloneElement(l,{"aria-label":a,...l.props,...d}):t.default.createElement("span",{"aria-label":a,...d},l)),[l,d]})(g,m,n);return[!0,y,f,h]})(e,r,{closeIcon:t.default.createElement(s.default,null),...a},d.close),[e,r,a,d.close])};e.s(["pickClosable",0,d,"useClosable",0,m],84323);var g=e.i(31861),f=e.i(1975),y=e.i(94776),h=e.i(77425),b=e.i(82614);e.i(99838);var C=e.i(32556);e.i(13567);var x=e.i(43932),v=e.i(79251),E=e.i(10338),k=e.i(97638),S=e.i(4999),w=e.i(21746);let $=e=>{let{lineWidth:t,fontSizeIcon:r,calc:a}=e,s=e.fontSizeSM;return(0,w.mergeToken)(e,{tagFontSize:s,tagLineHeight:(0,C.unit)(a(e.lineHeightSM).mul(s).equal()),tagIconSize:a(r).sub(a(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},R=e=>{let t=(0,E.isBright)(new v.AggregationColor(e.colorBgSolid),"#fff")?"#000":"#fff";return{defaultBg:new x.FastColor(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText,solidTextColor:t}},N=(0,S.genStyleHooks)("Tag",e=>(e=>{let{paddingXXS:t,lineWidth:r,tagPaddingHorizontal:a,componentCls:s,calc:o}=e,n=o(a).sub(r).equal(),i=o(t).sub(r).equal();return{[s]:{...(0,k.resetComponent)(e),display:"inline-block",height:"auto",paddingInline:n,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",backgroundColor:e.defaultBg,border:`${(0,C.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${s}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${s}-close-icon`]:{marginInlineStart:i,fontSize:e.tagIconSize,color:e.colorIcon,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${s}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive},"&-disabled":{cursor:"not-allowed",[`&:not(${s}-checkable-checked)`]:{color:e.colorTextDisabled,"&:hover":{backgroundColor:"transparent"}},[`&${s}-checkable-checked`]:{color:e.colorTextDisabled,backgroundColor:e.colorBgContainerDisabled},"&:hover, &:active":{backgroundColor:e.colorBgContainerDisabled,color:e.colorTextDisabled},[`&:not(${s}-checkable-checked):hover`]:{color:e.colorTextDisabled}},"&-group":{display:"flex",flexWrap:"wrap",gap:e.paddingXS}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:n}},[`&${e.componentCls}-solid`]:{borderColor:"transparent",color:e.colorTextLightSolid,backgroundColor:e.colorBgSolid,[`&${s}-default`]:{color:e.solidTextColor}},[`${s}-filled`]:{borderColor:"transparent",backgroundColor:e.tagBorderlessBg},[`&${s}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",backgroundColor:e.colorBgContainerDisabled,a:{cursor:"not-allowed",pointerEvents:"none",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}},"a&":{"&:hover, &:active":{color:e.colorTextDisabled}},[`&${s}-outlined`]:{borderColor:e.colorBorderDisabled},[`&${s}-solid, &${s}-filled`]:{color:e.colorTextDisabled,[`${s}-close-icon`]:{color:e.colorTextDisabled}},[`${s}-close-icon`]:{cursor:"not-allowed",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}}}}})($(e)),R),T=t.forwardRef((e,r)=>{let{prefixCls:s,style:o,className:n,checked:i,children:l,icon:c,onChange:d,onClick:u,disabled:p,...m}=e,{getPrefixCls:g,tag:f}=t.useContext(h.ConfigContext),y=t.useContext(b.default),C=p??y,x=g("tag",s),[v,E]=N(x),k=(0,a.clsx)(x,`${x}-checkable`,{[`${x}-checkable-checked`]:i,[`${x}-checkable-disabled`]:C},f?.className,n,v,E);return t.createElement("span",{...m,ref:r,style:{...o,...f?.style},className:k,onClick:e=>{C||(d?.(!i),u?.(e))}},c,t.createElement("span",null,l))});var I=e.i(35492),A=e.i(89118),P=e.i(31328);let D=t.default.forwardRef(function(e,r){let{id:s,prefixCls:n,rootClassName:i,className:l,style:c,classNames:d,styles:u,disabled:p,options:m,value:f,defaultValue:y,onChange:b,multiple:C,...x}=e,{getPrefixCls:v,direction:E,className:k,style:S,classNames:w,styles:$}=(0,h.useComponentConfig)("tag"),R=v("tag",n),D=`${R}-checkable-group`,M=(0,P.default)(R),[j,U]=N(R,M),[L,O]=(0,g.useMergeSemantic)([w,d],[$,u],{props:e}),B=(0,t.useMemo)(()=>(m||[]).map(e=>e&&"object"==typeof e?e:{value:e,label:e}),[m]),[H,_]=(0,A.useControlledState)(y,f),q=t.default.useRef(null);(0,t.useImperativeHandle)(r,()=>({nativeElement:q.current}));let F=(0,o.default)(x,{aria:!0,data:!0});return t.default.createElement("div",{...F,className:(0,a.clsx)(D,k,i,{[`${D}-disabled`]:p,[`${D}-rtl`]:"rtl"===E},j,U,l,L.root),style:{...S,...O.root,...c},id:s,ref:q},B.map(e=>t.default.createElement(T,{key:e.value,className:(0,a.clsx)(`${D}-item`,L.item),style:O.item,checked:C?(H||[]).includes(e.value):H===e.value,onChange:t=>((e,t)=>{let r=null;if(C){let a=H||[];r=e?[].concat((0,I.default)(a),[t.value]):a.filter(e=>e!==t.value)}else r=e?t.value:null;_(r),b?.(r)})(t,e),disabled:p},e.label)))});var M=e.i(57079),j=e.i(39931);let U=(0,S.genSubStyleComponent)(["Tag","preset"],e=>{let t;return t=$(e),(0,j.genPresetColor)(t,(e,{textColor:r,lightBorderColor:a,lightColor:s,darkColor:o})=>({[`${t.componentCls}${t.componentCls}-${e}:not(${t.componentCls}-disabled)`]:{[`&${t.componentCls}-outlined`]:{backgroundColor:s,borderColor:a,color:r},[`&${t.componentCls}-solid`]:{backgroundColor:o,borderColor:o,color:t.colorTextLightSolid},[`&${t.componentCls}-filled`]:{backgroundColor:s,color:r}}}))},R),L=(e,t,r)=>{let a="string"!=typeof r?r:r.charAt(0).toUpperCase()+r.slice(1);return{[`${e.componentCls}${e.componentCls}-${t}:not(${e.componentCls}-disabled)`]:{[`&${e.componentCls}-outlined`]:{backgroundColor:e[`color${a}Bg`],borderColor:e[`color${a}Border`],color:e[`color${r}`]},[`&${e.componentCls}-solid`]:{backgroundColor:e[`color${r}`],borderColor:e[`color${r}`]},[`&${e.componentCls}-filled`]:{backgroundColor:e[`color${a}Bg`],color:e[`color${r}`]}}}},O=(0,S.genSubStyleComponent)(["Tag","status"],e=>{let t=$(e);return[L(t,"success","Success"),L(t,"processing","Info"),L(t,"error","Error"),L(t,"warning","Warning")]},R),B=t.forwardRef((e,s)=>{let{prefixCls:o,className:n,rootClassName:i,style:l,children:c,icon:u,color:p,variant:C,onClose:v,bordered:E,disabled:k,href:S,target:w,styles:$,classNames:R,...T}=e,{getPrefixCls:I,direction:A,className:P,variant:D,style:j,classNames:L,styles:B}=(0,h.useComponentConfig)("tag"),[H,_,q,F,z]=function(e,r){let{color:a,variant:s,bordered:o}=e;return t.useMemo(()=>{let e,t=a?.endsWith("-inverse");e=s||(t?"solid":!1===o?"filled":r||"filled");let n=t?a?.replace("-inverse",""):a,i=(0,M.isPresetColor)(a),l=(0,M.isPresetStatusColor)(a),c={};if(!i&&!l&&n)if("solid"===e)c.backgroundColor=a;else{let t=new x.FastColor(n).toHsl();t.l=.95,c.backgroundColor=new x.FastColor(t).toHexString(),c.color=a,"outlined"===e&&(c.borderColor=a)}return[e,n,i,l,c]},[a,s,o,r])}(e,D),G=q||F,W=t.useContext(b.default),K=k??W,{tag:V}=t.useContext(h.ConfigContext),[X,Y]=t.useState(!0),Q=(0,r.omit)(T,["closeIcon","closable"]),J={...e,color:_,variant:H,disabled:K,href:S,target:w,icon:u},[Z,ee]=(0,g.useMergeSemantic)([L,R],[B,$],{props:J}),et=t.useMemo(()=>{let e={...ee.root,...j,...l};return K||(e={...z,...e}),e},[ee.root,j,l,z,K]),er=I("tag",o),[ea,es]=N(er),eo=(0,a.clsx)(er,P,Z.root,`${er}-${H}`,{[`${er}-${_}`]:G,[`${er}-hidden`]:!X,[`${er}-rtl`]:"rtl"===A,[`${er}-disabled`]:K},n,i,ea,es),en=e=>{K||(e.stopPropagation(),v?.(e),e.defaultPrevented||Y(!1))},[,ei]=m(d(e),d(V),{closable:!1,closeIconRender:e=>{let r=t.createElement("span",{className:`${er}-close-icon`,onClick:en},e);return(0,f.replaceElement)(e,r,e=>({onClick:t=>{e?.onClick?.(t),en(t)},className:(0,a.clsx)(e?.className,`${er}-close-icon`)}))}}),el="function"==typeof T.onClick||c&&"a"===c.type,ec=(0,f.cloneElement)(u,{className:(0,a.clsx)(t.isValidElement(u)?u.props?.className:"",Z.icon),style:ee.icon}),ed=ec?t.createElement(t.Fragment,null,ec,c&&t.createElement("span",{className:Z.content,style:ee.content},c)):c,eu=t.createElement(S?"a":"span",{...Q,ref:s,className:eo,style:et,href:K?void 0:S,target:w,onClick:K?void 0:Q.onClick,...S&&K?{"aria-disabled":!0}:{}},ed,ei,q&&t.createElement(U,{key:"preset",prefixCls:er}),F&&t.createElement(O,{key:"status",prefixCls:er}));return el?t.createElement(y.default,{component:"Tag"},eu):eu});B.CheckableTag=T,B.CheckableTagGroup=D,e.s(["Tag",0,B],57737)},93857,e=>{"use strict";var t=e.i(65408),r=e.i(77674),a=e.i(33086),s=e.i(59611),o=e.i(57737),n=e.i(26012),i=e.i(73182),l=e.i(98870),c=e.i(59990);let d=[{id:"1",title:"Git 提交规范",description:"使用 Conventional Commits 格式规范 Git 提交信息",content:`# Git 提交规范

## 格式
\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer]
\`\`\`

## Type 类型
- \`feat\`: 新功能
- \`fix\`: Bug 修复
- \`docs\`: 文档更新
- \`style\`: 代码格式（不影响功能）
- \`refactor\`: 重构（不影响功能）
- \`perf\`: 性能优化
- \`test\`: 测试相关
- \`chore\`: 构建过程或辅助工具变动

## 示例
\`\`\`
feat(auth): add login API
fix(ui): resolve button alignment issue
docs: update README with installation guide
\`\`\`

## 规则
1. 标题不超过 50 字符
2. 使用祈使句
3. 勿在标题后加句号
4. body 说明 what 和 why，不说明 how
5. footer 用于关联 issue`,category:"版本控制",tags:["Git","提交规范","Conventional Commits"],dateAdded:"2024-01-01",stars:15e3},{id:"2",title:"React 组件规范",description:"React 组件开发最佳实践",content:`# React 组件规范

## 组件命名
- 使用 PascalCase 命名组件
- 使用 camelCase 命名组件实例
- 组件文件名使用 PascalCase

## Props 规范
- 所有 props 都有类型定义
- 使用 interface 定义 props 类型
- 必填 props 在类型中标注
- 提供合理的默认值

## Hooks 使用
- 自定义 hooks 以 \`use\` 开头
- hooks 放在组件顶部
- 相关 hooks 组合在一起
- 依赖数组要完整

## 状态管理
- 使用 useState 处理本地状态
- 使用 useRef 处理不需要触发渲染的值
- 避免不必要的状态
- 状态位置要合理

## 性能
- 适当使用 useMemo 和 useCallback
- 大列表使用 virtualization
- 图片使用 lazy loading
- 合理使用 React.memo`,category:"前端开发",tags:["React","组件","最佳实践"],dateAdded:"2024-01-05",stars:12500},{id:"3",title:"TypeScript 编码规范",description:"TypeScript 项目开发规范",content:`# TypeScript 编码规范

## 类型定义
- 始终使用显式类型，不使用 any
- 使用 \`interface\` 定义对象类型
- 使用 \`type\` 定义联合类型、别名
- 导出类型而不是实现

## 命名规范
- 变量/函数: camelCase
- 类/接口/类型: PascalCase
- 常量: UPPER_SNAKE_CASE
- 文件: kebab-case

## Null 处理
- 优先使用可选链 (?.)
- 使用空值合并 (??) 处理默认值
- 避免使用 \`!\` 强制非空
- 明确处理所有 null 和 undefined

## 最佳实践
1. 启用 strict 模式
2. 不使用 \`as\` 类型断言
3. 使用类型守卫进行类型收缩
4. 优先使用泛型而不是 any`,category:"前端开发",tags:["TypeScript","类型系统","最佳实践"],dateAdded:"2024-01-10",stars:11800},{id:"4",title:"RESTful API 设计规范",description:"REST API 设计和命名规范",content:`# RESTful API 设计规范

## URL 设计
- 使用名词而非动词
- 使用复数形式
- 使用小写字母
- 使用连字符分隔单词
- 层级不超过三层

## HTTP 方法
- GET: 获取资源
- POST: 创建资源
- PUT: 完整更新资源
- PATCH: 部分更新资源
- DELETE: 删除资源

## 状态码
- 200: 成功
- 201: 创建成功
- 204: 删除成功
- 400: 请求错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器错误

## 版本控制
- URL 中包含版本号: /api/v1/
- 使用语义化版本

## 错误响应
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "描述信息",
    "details": []
  }
}
\`\`\``,category:"后端开发",tags:["REST","API","设计规范"],dateAdded:"2024-01-15",stars:13200},{id:"5",title:"CSS 命名规范",description:"BEM 命名方法和 CSS 组织规范",content:`# CSS 命名规范

## BEM 命名
\`\`\`
block
block__element
block--modifier
\`\`\`

## 示例
\`\`\`css
/* Block */
.nav { }

/* Element */
.nav__item { }
.nav__link { }

/* Modifier */
.nav__item--active { }
.nav--dark { }
\`\`\`

## 命名规则
- 使用小写字母
- 使用连字符分隔
- 避免使用 ID 选择器
- 保持名称简短但有意义

## CSS 组织
1. Reset/Normalize
2. 工具类
3. 通用组件
4. 特定页面样式
5. 响应式调整`,category:"前端开发",tags:["CSS","BEM","命名规范"],dateAdded:"2024-01-20",stars:9500},{id:"6",title:"数据库设计规范",description:"数据库表设计和索引规范",content:`# 数据库设计规范

## 表设计
- 使用有意义的表名
- 使用下划线命名
- 添加 \`created_at\` 和 \`updated_at\` 字段
- 主键使用自增 ID 或 UUID
- 添加业务相关的索引

## 字段规范
- 字段名使用小写和下划线
- 为每个字段添加注释
- 合理设置字段长度
- 使用合适的数据类型

## 索引
- 为 WHERE 条件字段添加索引
- 复合索引考虑字段顺序
- 避免过多索引
- 定期分析和优化

## 事务
- 保持事务简短
- 避免嵌套事务
- 合理处理死锁
- 使用乐观锁或悲观锁`,category:"数据库",tags:["数据库","索引","设计规范"],dateAdded:"2024-01-25",stars:8800},{id:"7",title:"安全开发规范",description:"Web 应用安全最佳实践",content:`# 安全开发规范

## 常见漏洞防护
1. SQL 注入: 使用参数化查询
2. XSS: 转义输出，使用 CSP
3. CSRF: 使用 token 验证
4. 密码: 使用强哈希算法存储
5. 文件上传: 验证文件类型和大小

## 认证授权
- 使用 HTTPS
- 密码加密存储
- 实现会话管理
- 限制登录尝试
- JWT 使用短期过期

## 数据保护
- 敏感数据加密传输
- 敏感信息不记录日志
- 合理设置 CORS
- 使用安全 headers`,category:"安全",tags:["安全","XSS","SQL注入"],dateAdded:"2024-01-30",stars:10200},{id:"8",title:"代码审查检查清单",description:"代码审查时需要检查的项目",content:`# 代码审查检查清单

## 代码逻辑
- [ ] 逻辑正确性
- [ ] 边界条件处理
- [ ] 错误处理
- [ ] 资源释放

## 性能
- [ ] 避免不必要的循环
- [ ] 合理使用缓存
- [ ] 数据库查询优化
- [ ] 避免内存泄漏

## 安全
- [ ] 输入验证
- [ ] 敏感数据处理
- [ ] 权限检查
- [ ] SQL 注入防护

## 可维护性
- [ ] 代码可读性
- [ ] 命名规范
- [ ] 注释适当
- [ ] 函数长度合理
- [ ] 单一职责

## 测试
- [ ] 单元测试覆盖
- [ ] 边界条件测试
- [ ] 异常情况测试`,category:"开发流程",tags:["Code Review","代码质量"],dateAdded:"2024-02-01",stars:7900},{id:"9",title:"错误处理规范",description:"统一的项目错误处理方式",content:`# 错误处理规范

## 错误分类
1. 系统错误: 网络、数据库等
2. 业务错误: 业务逻辑验证
3. 用户错误: 输入验证

## 处理原则
- 区分可恢复和不可恢复错误
- 记录详细错误日志
- 返回有意义的错误信息
- 不暴露敏感信息

## 前端处理
- 统一错误提示
- 友好的错误信息
- 错误重试机制
- 错误上报

## 后端处理
- 使用统一的错误格式
- 合适的 HTTP 状态码
- 错误日志记录
- 异常捕获

## 日志规范
- 记录级别: debug, info, warn, error
- 包含上下文信息
- 脱敏敏感数据`,category:"开发流程",tags:["错误处理","日志","最佳实践"],dateAdded:"2024-02-05",stars:7200},{id:"10",title:"测试规范",description:"单元测试和集成测试最佳实践",content:`# 测试规范

## 测试金字塔
- 单元测试: 70%
- 集成测试: 20%
- E2E 测试: 10%

## 单元测试
### AAA 原则
1. Arrange: 准备测试数据
2. Act: 执行测试操作
3. Assert: 断言结果

### 命名规范
\`\`\`
describe('FunctionName', () => {
  it('should do something specific', () => {});
});
\`\`\`

### 覆盖率要求
- 语句覆盖率: 80%+
- 分支覆盖率: 75%+
- 函数覆盖率: 100%

## 集成测试
- 测试组件交互
- 测试数据流
- Mock 外部依赖

## E2E 测试
- 关键用户路径
- 避免测试过多细节
- 使用真实环境`,category:"测试",tags:["测试","单元测试","Jest"],dateAdded:"2024-03-15",stars:8500},{id:"11",title:"TypeScript 最佳实践",description:"TypeScript 编码规范和最佳实践指南",content:`# TypeScript 最佳实践

## 类型定义

### 使用类型推断
\`\`\`typescript
// 好的做法 - 让 TypeScript 推断类型
const name = "Alice";
const numbers = [1, 2, 3];

// 不好的做法 - 不必要的类型注解
const name: string = "Alice";
\`\`\`

### 接口 vs 类型
\`\`\`typescript
// 接口 - 用于对象结构
interface User {
  id: number;
  name: string;
}

// 类型 - 用于联合类型、交叉类型
type Status = "pending" | "active" | "done";
type Admin = User & { role: "admin" };
\`\`\`

## 严格模式

### 启用所有严格检查
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 空值检查
\`\`\`typescript
// 使用可选链
const name = user?.profile?.name;

// 使用空值合并
const value = data ?? "default";

// 使用类型守卫
if (user) {
  console.log(user.name);
}
\`\`\`

## 泛型

### 约束泛型
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}
\`\`\`

### 常用泛型模式
\`\`\`typescript
// Promise 类型
async function fetchUser(): Promise<User> {}

// 数组类型
const users: User[] = [];

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## 最佳实践

1. 避免使用 \`any\`，使用 \`unknown\` 代替
2. 优先使用接口定义对象类型
3. 使用类型别名定义联合类型
4. 启用 strict 模式
5. 使用可选链和空值合并运算符
6. 避免类型断言（as）`,category:"开发",tags:["TypeScript","类型","最佳实践"],dateAdded:"2024-03-16",stars:12e3},{id:"12",title:"React Hooks 最佳实践",description:"React Hooks 的正确使用方式和最佳实践",content:`# React Hooks 最佳实践

## Hooks 规则

### 只在顶层调用
\`\`\`typescript
// 好的做法 - 在顶层调用
useEffect(() => {
  // ...
}, []);

if (condition) {
  const [value, setValue] = useState(0);
}

// 不好的做法 - 在条件语句中调用
if (condition) {
  const [value, setValue] = useState(0);
}
\`\`\`

### 只在 React 函数中调用
- 在函数组件中
- 在自定义 Hook 中
- 不能在普通函数中调用

## useState 最佳实践

### 多个状态分开管理
\`\`\`typescript
// 好的做法 - 分开管理相关状态
const [name, setName] = useState("");
const [email, setEmail] = useState("");

// 不好的做法 - 合并不相关状态
const [user, setUser] = useState({ name: "", email: "" });
\`\`\`

### 使用函数更新状态
\`\`\`typescript
setCount(prev => prev + 1);
\`\`\`

## useEffect 最佳实践

### 依赖数组
\`\`\`typescript
// 每次渲染都执行
useEffect(() => {});

// 只执行一次（相当于 componentDidMount）
useEffect(() => {}, []);

// 依赖变化时执行
useEffect(() => {}, [dependency]);
\`\`\`

### 清理副作用
\`\`\`typescript
useEffect(() => {
  const subscription = subscribe(id);
  return () => {
    subscription.unsubscribe();
  };
}, [id]);
\`\`\`

### 避免副作用依赖频繁变化的值
\`\`\`typescript
// 使用 ref 存储不需要触发渲染的值
const countRef = useRef(0);
\`\`\`

## useMemo 和 useCallback

### useMemo - 缓存计算结果
\`\`\`typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
\`\`\`

### useCallback - 缓存函数
\`\`\`typescript
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);
\`\`\`

## 自定义 Hook

### 提取逻辑
\`\`\`typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
\`\`\`

## 最佳实践

1. 保持 Hooks 调用顺序一致
2. 合理使用依赖数组
3. 使用 useMemo 缓存昂贵计算
4. 使用 useCallback 稳定回调函数
5. 提取重复逻辑到自定义 Hook`,category:"前端",tags:["React","Hooks","最佳实践"],dateAdded:"2024-03-17",stars:9800},{id:"13",title:"API 设计规范",description:"RESTful API 设计和命名规范",content:`# API 设计规范

## RESTful 原则

### 资源命名
\`\`\`
# 复数形式
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id

# 嵌套资源
GET /users/:id/posts
GET /users/:id/posts/:postId/comments
\`\`\`

### HTTP 方法
- GET: 获取资源
- POST: 创建资源
- PUT: 完整更新资源
- PATCH: 部分更新资源
- DELETE: 删除资源

## 响应格式

### 成功响应
\`\`\`json
{
  "data": { "id": 1, "name": "Alice" },
  "meta": { "page": 1, "total": 100 }
}
\`\`\`

### 错误响应
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid format" }
    ]
  }
}
\`\`\`

## 状态码

### 2xx 成功
- 200 OK
- 201 Created
- 204 No Content

### 4xx 客户端错误
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 422 Unprocessable Entity

### 5xx 服务端错误
- 500 Internal Server Error
- 503 Service Unavailable

## 分页

### URL 参数
\`\`\`
GET /users?page=1&limit=20
\`\`\`

### 响应
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
\`\`\`

## 版本控制

### URL 版本
\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\`

## 最佳实践

1. 使用名词而非动词命名资源
2. 保持 URL 简洁
3. 使用复数形式
4. 正确使用 HTTP 方法
5. 保持响应格式一致
6. 使用适当的状态码
7. 实现分页
8. 版本化 API`,category:"后端",tags:["API","REST","设计规范"],dateAdded:"2024-03-18",stars:7600},{id:"14",title:"代码审查最佳实践",description:"高效代码审查的指南和 checklist",content:`# 代码审查最佳实践

## 审查原则

### 作为审查者
1. 关注代码正确性而非风格
2. 提供建设性反馈
3. 解释原因而非只说"不好"
4. 认可好的代码

### 作为提交者
1. 保持提交小而专注
2. 编写清晰的提交信息
3. 响应反馈及时
4. 不要把审查当作个人攻击

## 审查清单

### 代码正确性
- [ ] 代码是否正确实现了功能？
- [ ] 是否有明显的 bug？
- [ ] 边界情况是否处理？

### 代码质量
- [ ] 代码是否可读？
- [ ] 是否有重复代码？
- [ ] 是否有不必要的复杂性？
- [ ] 命名是否清晰？

### 错误处理
- [ ] 错误是否被正确处理？
- [ ] 是否有适当的日志？
- [ ] 敏感信息是否泄露？

### 安全性
- [ ] 是否有安全漏洞？
- [ ] 输入是否验证？
- [ ] 敏感数据是否保护？

### 测试
- [ ] 是否有足够的测试？
- [ ] 测试是否覆盖边界情况？

### 性能
- [ ] 是否有性能问题？
- [ ] 是否有不必要的计算？

## 反馈技巧

### 好的反馈
\`\`\`
👍 简洁的实现

💡 可以使用 xxx 方法简化代码

❌ 这里有 bug：xxx 会导致 yyy

❓ 为什么选择这个方案？
\`\`\`

### 避免的反馈
- "这不符合我的风格" - 除非有明确规范
- "可以用更酷的方式" - 简洁优先
- 过于挑剔格式问题 - 让 linter 处理

## 最佳实践

1. 审查及时，不要积压
2. 保持评论建设性
3. 关注重要问题
4. 批准小型改进
5. 使用自动化工具处理格式`,category:"开发流程",tags:["Code Review","代码审查","最佳实践"],dateAdded:"2024-03-19",stars:6500},{id:"15",title:"Docker 最佳实践",description:"Docker 镜像构建和容器化最佳实践",content:`# Docker 最佳实践

## 镜像构建

### 使用多阶段构建
\`\`\`dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/index.js"]
\`\`\`

### 减少镜像层数
\`\`\`dockerfile
# 好的做法 - 合并相关命令
RUN npm ci && \
    npm cache clean --force

# 不好的做法 - 分离命令
RUN npm ci
RUN npm cache clean --force
\`\`\`

### 使用 .dockerignore
\`\`\`
node_modules
.git
*.md
.env*
dist
coverage
\`\`\`

## 镜像优化

### 选择合适的基础镜像
\`\`\`dockerfile
# 使用 alpine 版本减小镜像
FROM node:18-alpine

# 使用特定版本避免缓存问题
FROM node:18.17.0-alpine3.18
\`\`\`

### 优化层缓存
\`\`\`dockerfile
# 先复制依赖文件
COPY package*.json ./
RUN npm ci

# 再复制源代码
COPY . .
\`\`\`

## 容器运行

### 以非 root 用户运行
\`\`\`dockerfile
RUN addgroup -g 1001 appgroup && \\
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser
\`\`\`

### 健康检查
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
\`\`\`

## 安全最佳实践

1. 定期更新基础镜像
2. 不在镜像中存储敏感信息
3. 使用最小权限用户
4. 扫描镜像漏洞
5. 不要在镜像中运行 SSH

## 最佳实践

1. 使用多阶段构建
2. 减少镜像层数
3. 合理使用 .dockerignore
4. 使用 alpine 基础镜像
5. 以非 root 用户运行
6. 添加健康检查
7. 扫描安全漏洞`,category:"DevOps",tags:["Docker","容器","最佳实践"],dateAdded:"2024-03-20",stars:8200},{id:"16",title:"数据库设计规范",description:"数据库表设计和索引优化指南",content:`# 数据库设计规范

## 表设计原则

### 命名规范
\`\`\`sql
-- 表名使用复数、下划线分隔
CREATE TABLE users ();
CREATE TABLE order_items ();

-- 列名使用下划线分隔
user_id
created_at
updated_at
\`\`\`

### 主键设计
\`\`\`sql
-- 优先使用自增 ID
id BIGINT PRIMARY KEY AUTO_INCREMENT;

-- 或使用 UUID
id CHAR(36) PRIMARY KEY DEFAULT (UUID());
\`\`\`

### 时间戳
\`\`\`sql
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

## 索引设计

### 创建索引
\`\`\`sql
-- 单列索引
CREATE INDEX idx_user_email ON users(email);

-- 复合索引
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);

-- 唯一索引
CREATE UNIQUE INDEX idx_user_email ON users(email);
\`\`\`

### 索引原则
1. 为 WHERE、JOIN、ORDER BY 字段创建索引
2. 避免过多索引（影响写入性能）
3. 遵循最左前缀原则
4. 考虑选择性高的字段

## 规范化

### 范式级别
- 第一范式：原子性，每列不可再分
- 第二范式：消除部分依赖
- 第三范式：消除传递依赖

### 反规范化场景
- 读取频繁写入少
- 需要计算的性能优化
- 避免多表 JOIN

## 查询优化

### 避免全表扫描
\`\`\`sql
-- 不好
SELECT * FROM users WHERE LOWER(name) = 'john';

-- 好
SELECT * FROM users WHERE name = 'John';
-- 确保有索引
\`\`\`

### 使用 EXPLAIN 分析
\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

## 最佳实践

1. 使用有意义的表名和列名
2. 总是添加 created_at 和 updated_at
3. 为常用查询创建适当索引
4. 避免 SELECT *
5. 使用参数化查询防 SQL 注入
6. 定期清理无用数据
7. 做好数据备份`,category:"后端",tags:["数据库","SQL","设计规范"],dateAdded:"2024-03-21",stars:7100},{id:"17",title:"CSS 命名规范",description:"BEM 命名规范和 CSS 组织方式",content:`# CSS 命名规范

## BEM 命名

### 块（Block）
\`\`\`css
.block { }
\`\`\`

### 元素（Element）
\`\`\`css
.block__element { }
\`\`\`

### 修饰符（Modifier）
\`\`\`css
.block--modifier { }
.block__element--modifier { }
\`\`\`

### 示例
\`\`\`html
<button class="btn btn--primary btn--large">
  <span class="btn__text">Click me</span>
</button>
\`\`\`

\`\`\`css
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn--primary {
  background: blue;
  color: white;
}

.btn--large {
  padding: 15px 30px;
  font-size: 18px;
}

.btn__text {
  font-weight: bold;
}
\`\`\`

## 其他命名方式

### 连字符命名
\`\`\`css
.my-component { }
.my-component-inner { }
.my-component-inner-box { }
\`\`\`

### 驼峰命名
\`\`\`css
.myComponent { }
.myComponentInner { }
\`\`\`

## CSS 组织

### 按组件组织
\`\`\`css
/* button.css */
.btn { }
.btn--primary { }

/* card.css */
.card { }
.card__header { }
.card__body { }
\`\`\`

### 使用 CSS Modules
\`\`\`typescript
import styles from './Button.module.css';

<button className={styles.btn}>Click</button>
\`\`\`

## 最佳实践

1. 使用 BEM 或一致的命名规范
2. 避免使用 ID 选择器
3. 使用类选择器而非元素选择器
4. 保持选择器简短
5. 使用 CSS Modules 或 scoped CSS
6. 避免 !important
7. 使用 CSS 变量管理主题`,category:"前端",tags:["CSS","BEM","命名规范"],dateAdded:"2024-03-22",stars:5800},{id:"18",title:"错误处理最佳实践",description:"前端和后端错误处理策略",content:`# 错误处理最佳实践

## 原则

### 错误分类
1. **可预期错误** - 网络失败、验证失败
2. **编程错误** - Bug、空指针
3. **业务错误** - 权限不足、余额不足

### 处理策略
- 可预期错误：友好提示用户
- 编程错误：上报监控系统
- 业务错误：提示用户解决方案

## 前端错误处理

### Try-Catch
\`\`\`typescript
try {
  const result = await riskyOperation();
} catch (error) {
  if (error instanceof NetworkError) {
    showToast("网络连接失败");
  } else if (error instanceof ValidationError) {
    showValidationErrors(error.fields);
  } else {
    reportError(error);
    showToast("操作失败，请重试");
  }
}
\`\`\`

### 边界错误处理
\`\`\`typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    reportError(error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
\`\`\`

## 后端错误处理

### 统一错误响应
\`\`\`typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// 使用
throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid input');
\`\`\`

### 中间件处理
\`\`\`typescript
app.use((err, req, res, next) => {
  logger.error(err);
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message
      }
    });
  }
  
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: '服务器错误'
    }
  });
});
\`\`\`

## 日志记录

### 结构化日志
\`\`\`typescript
logger.info('User action', {
  userId: user.id,
  action: 'create_order',
  orderId: order.id,
  duration: endTime - startTime
});
\`\`\`

## 最佳实践

1. 不要吞掉错误
2. 提供有意义的错误信息
3. 区分错误类型处理
4. 记录错误日志
5. 上报关键错误到监控系统
6. 给用户友好的错误提示`,category:"开发",tags:["错误处理","异常","最佳实践"],dateAdded:"2024-03-23",stars:6300},{id:"19",title:"性能优化指南",description:"前端性能优化技巧和指标",content:`# 性能优化指南

## 核心 Web 指标

### LCP (最大内容绘制)
- 目标: < 2.5s
- 优化: 优化服务器响应、减少 CSS 阻塞

### FID (首次输入延迟)
- 目标: < 100ms
- 优化: 减少 JS 执行时间、代码分割

### CLS (累积布局偏移)
- 目标: < 0.1
- 优化: 设置图片尺寸、避免动态插入内容

## 图片优化

### 格式选择
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>
\`\`\`

### 响应式图片
\`\`\`html
<img 
  srcset="img-400.jpg 400w, img-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  src="img-800.jpg"
  loading="lazy"
  alt="描述"
>
\`\`\`

## 代码优化

### 代码分割
\`\`\`typescript
// 动态导入
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// 路由级别分割
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
\`\`\`

### Tree Shaking
\`\`\`javascript
// 好 - 使用 ES 模块
import { cloneDeep } from 'lodash';

// 不好 - 导入整个库
import _ from 'lodash';
\`\`\`

## 缓存策略

### 静态资源
\`\`\`
Cache-Control: public, max-age=31536000, immutable
\`\`\`

### API 响应
\`\`\`
Cache-Control: no-cache
\`\`\`

## React 优化

### React.memo
\`\`\`typescript
const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});
\`\`\`

### useMemo / useCallback
\`\`\`typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
\`\`\`

## 最佳实践

1. 监控核心 Web 指标
2. 优化图片格式和大小
3. 使用代码分割
4. 实现缓存策略
5. 使用 React.memo 避免不必要渲染
6. 延迟加载非关键资源`,category:"性能",tags:["性能优化","Web Vitals","最佳实践"],dateAdded:"2024-03-24",stars:8900},{id:"20",title:"Git 工作流",description:"Git 分支管理策略和工作流",content:`# Git 工作流

## 分支策略

### Git Flow
- main: 生产环境代码
- develop: 开发主分支
- feature/*: 功能分支
- release/*: 发布分支
- hotfix/*: 紧急修复分支

### 简化工作流
- main: 主分支
- develop: 开发分支
- feature/*: 功能分支

## 分支命名

### 功能分支
\`\`\`
feature/user-authentication
feature/add-shopping-cart
\`\`\`

### 修复分支
\`\`\`
bugfix/login-issue
hotfix/security-patch
\`\`\`

### 发布分支
\`\`\`
release/v1.0.0
\`\`\`

## 提交规范

### 提交信息格式
\`\`\`
feat(auth): add OAuth login support
fix(ui): resolve button alignment issue
docs: update API documentation
refactor(payment): simplify transaction logic
test: add unit tests for user service
\`\`\`

### 提交粒度
- 每个提交只做一件事
- 提交信息描述 what 和 why
- 保持提交小而专注

## 常用命令

### 创建分支
\`\`\`bash
git checkout -b feature/new-feature
\`\`\`

### 合并分支
\`\`\`bash
git checkout main
git merge feature/new-feature
\`\`\`

### 变基（Rebase）
\`\`\`bash
git checkout feature/new-feature
git rebase main
\`\`\`

## 最佳实践

1. 使用功能分支工作流
2. 保持 main 分支可部署
3. 定期从 main 变基
4. 使用有意义的提交信息
5. 小而频繁的提交
6. 删除已合并的分支`,category:"版本控制",tags:["Git","分支策略","工作流"],dateAdded:"2024-03-25",stars:7400},{id:"21",title:"Clean Code 最佳实践",description:"编写清晰、可维护代码的原则和技巧",content:`# Clean Code 最佳实践

## 命名规范

### 变量命名
\`\`\`typescript
// 好的命名
const activeUsers = [];
const maxRetryCount = 3;

// 避免
const data = [];
const temp = 3;
\`\`\`

### 函数命名
\`\`\`typescript
// 好的命名
function calculateTotalPrice() {}
function validateUserInput() {}

// 避免
function calc() {}
function check() {}
\`\`\`

### 类命名
\`\`\`typescript
class UserService {}
class PaymentProcessor {}
class OrderRepository {}
\`\`\`

## 函数原则

### 单一职责
\`\`\`typescript
// 好的做法 - 一个函数做一件事
function validateEmail(email: string): boolean {}
function sendEmail(to: string, subject: string) {}

// 避免 - 多个职责
function validateAndSendEmail(email: string) {}
\`\`\`

### 参数数量
- 最少越好，最好 0-2 个
- 超过 3 个考虑封装对象

### 函数体长度
- 保持在 20 行以内
- 超过考虑拆分

## 代码结构

### 导入顺序
\`\`\`typescript
// 1. React/框架
import React from 'react';

// 2. 第三方库
import { useState, useEffect } from 'react';
import axios from 'axios';

// 3. 内部模块
import { UserService } from '@/services';
import { UserCard } from '@/components';

// 4. 类型
import type { User } from '@/types';

// 5. 样式
import styles from './index.module.css';
\`\`\`

### 常量提取
\`\`\`typescript
// 好的做法
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';

// 避免
if (file.size > 10485760) {}
\`\`\`

## 注释规范

### 好的注释
- 解释为什么，而不是做什么
- 解释复杂的业务逻辑
- TODO 和 FIXME 标记

### 避免的注释
- 解释显而易见的代码
- 过时的注释
- 注释掉的代码

## 错误处理

\`\`\`typescript
// 好的做法
try {
  await processData();
} catch (error) {
  logger.error('处理数据失败', { error });
  throw new AppError('处理失败');
}

// 避免
try {
  await processData();
} catch (error) {
  console.log(error);
}
\`\`\`

## 最佳实践

1. 保持函数短小单一
2. 使用有意义的命名
3. 减少嵌套层级
4. 提前返回避免嵌套
5. 使用解释性变量
6. 移除重复代码
7. 保持代码格式一致`,category:"开发",tags:["Clean Code","代码质量","最佳实践"],dateAdded:"2024-03-26",stars:11200},{id:"22",title:"设计模式",description:"常见设计模式及 TypeScript 实现",content:`# 设计模式

## 创建型模式

### 单例模式
\`\`\`typescript
class Singleton {
  private static instance: Singleton;
  
  private constructor() {}
  
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
\`\`\`

### 工厂模式
\`\`\`typescript
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  operation() { return 'Product A'; }
}

class ConcreteProductB implements Product {
  operation() { return 'Product B'; }
}

class Factory {
  createProduct(type: 'A' | 'B'): Product {
    switch (type) {
      case 'A': return new ConcreteProductA();
      case 'B': return new ConcreteProductB();
    }
  }
}
\`\`\`

## 结构型模式

### 装饰器模式
\`\`\`typescript
class Coffee {
  cost() { return 5; }
}

class MilkDecorator {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 1; }
}

class SugarDecorator {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 0.5; }
}
\`\`\`

### 代理模式
\`\`\`typescript
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }
  display() { console.log('Displaying', this.filename); }
  private loadFromDisk() { /* 加载图片 */ }
}

class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  constructor(private filename: string) {}
  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}
\`\`\`

## 行为型模式

### 观察者模式
\`\`\`typescript
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}
\`\`\`

### 策略模式
\`\`\`typescript
interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) { /* 信用卡支付 */ }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) { /* PayPal 支付 */ }
}

class ShoppingCart {
  constructor(private strategy: PaymentStrategy) {}
  
  async checkout(amount: number) {
    await this.strategy.pay(amount);
  }
}
\`\`\`

## 最佳实践

1. 理解问题本质再选择模式
2. 避免过度设计
3. 优先使用简单方案
4. 考虑可测试性
5. 记住模式背后的原则`,category:"架构",tags:["设计模式","架构","最佳实践"],dateAdded:"2024-03-27",stars:9500},{id:"23",title:"Redis 最佳实践",description:"Redis 使用场景和性能优化指南",content:`# Redis 最佳实践

## 数据结构选择

### String
- 缓存简单值
- 计数器
- 限流

### Hash
- 存储对象
- 购物车数据

### List
- 消息队列
- 最新列表

### Set
- 标签系统
- 好友关系
- 去重

### Sorted Set
- 排行榜
- 延迟队列

## 键命名规范
\`\`\`
# 格式: 项目:模块:业务:具体值
user:profile:12345
order:list:user:12345
cache:product:info:67890
\`\`\`

## 过期策略

### 设置过期时间
\`\`\`typescript
// 设置 1 小时过期
await redis.expire('key', 3600);

// 设置具体时间点过期
await redis.expireat('key', timestamp);
\`\`\`

### 避免大量键同时过期
- 添加随机偏移量
- 使用 Range 逐步过期

## 性能优化

### Pipeline 批量操作
\`\`\`typescript
// 好的做法
const pipeline = redis.pipeline();
for (const key of keys) {
  pipeline.get(key);
}
const results = await pipeline.exec();

// 避免
for (const key of keys) {
  await redis.get(key);
}
\`\`\`

### Lua 脚本
\`\`\`typescript
const luaScript = \`
  local current = redis.call('GET', KEYS[1])
  if current == false or tonumber(current) < tonumber(ARGV[1]) then
    redis.call('SET', KEYS[1], ARGV[1])
    return 1
  end
  return 0
\`;
await redis.eval(luaScript, 1, 'counter', '100');
\`\`\`

## 内存优化

### 压缩数据
\`\`\`typescript
// 对于大字符串使用压缩
const compressed = zlib.deflateSync(data);
await redis.set('key', compressed);
\`\`\`

### 合理选择数据结构
- 少量数据用 String 存储对象 JSON
- 大量相关数据用 Hash

## 缓存策略

### Cache-Aside
\`\`\`typescript
async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const user = await db.user.findById(id);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## 最佳实践

1. 键使用有意义的命名
2. 设置合理的过期时间
3. 使用 Pipeline 批量操作
4. 避免大 Value
5. 做好熔断降级
6. 监控内存使用`,category:"后端",tags:["Redis","缓存","最佳实践"],dateAdded:"2024-03-28",stars:7800},{id:"24",title:"GraphQL 设计规范",description:"GraphQL API 设计和最佳实践",content:`# GraphQL 设计规范

## Schema 设计

### 命名规范
\`\`\`graphql
# 类型使用 PascalCase
type User { ... }

# 字段使用 camelCase
type User {
  firstName: String!
  lastName: String!
}

# Query/Mutation 使用 PascalCase
type Query {
  user(id: ID!): User
  users: [User!]!
}
\`\`\`

### 字段设计
\`\`\`graphql
# 好的设计
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

# 避免过度嵌套
type Post {
  author: User!  # 而非 author: AuthorDetail
}
\`\`\`

## 查询设计

### 使用 Fragment
\`\`\`graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserFields
  }
}
\`\`\`

### 避免 N+1 问题
\`\`\`typescript
// DataLoader 批量加载
const userLoader = new DataLoader(async (ids) => {
  const users = await db.users.findByIds(ids);
  return ids.map(id => users.find(u => u.id === id));
});
\`\`\`

## Mutation 设计

### 命名规范
\`\`\`graphql
# 使用动词前缀
createUser(input: CreateUserInput!): User!
updateUser(id: ID!, input: UpdateUserInput!): User!
deleteUser(id: ID!): Boolean!

# 批量操作
createUsers(input: [CreateUserInput!]!): [User!]!
\`\`\`

### Input 类型
\`\`\`graphql
input CreateUserInput {
  name: String!
  email: String!
  profile: CreateProfileInput
}
\`\`\`

## 错误处理

\`\`\`graphql
type Error {
  code: String!
  message: String!
  field: String
}

type CreateUserPayload {
  user: User
  errors: [Error!]!
}
\`\`\`

## 分页设计

### Connection 模式
\`\`\`graphql
type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
\`\`\`

## 最佳实践

1. 遵循命名规范
2. 使用非空约束
3. 避免深度嵌套查询
4. 实现 DataLoader 解决 N+1
5. 合理使用分页
6. 做好错误处理
7. 版本化 API`,category:"后端",tags:["GraphQL","API","最佳实践"],dateAdded:"2024-03-29",stars:8200},{id:"25",title:"CI/CD 最佳实践",description:"持续集成和持续部署流程指南",content:`# CI/CD 最佳实践

## CI 流程

### 提交阶段检查
\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Type check
        run: npm run typecheck
        
      - name: Test
        run: npm run test -- --coverage
        
      - name: Build
        run: npm run build
\`\`\`

### 分支保护规则
1. 需要 PR 才能合并
2. 需要通过 CI 检查
3. 需要代码审查
4. 需要状态检查通过

## CD 流程

### 部署流程
\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build and Deploy
        run: |
          npm ci
          npm run build
          npm run deploy:production
\`\`\`

## 环境管理

### 环境配置
\`\`\`
development -> staging -> production
\`\`\`

### 秘钥管理
- 使用 Secrets Manager
- 不要提交到代码仓库
- 运行时注入环境变量

## 部署策略

### 蓝绿部署
- 维护两套环境
- 切换流量完成部署
- 快速回滚

### 滚动更新
- 逐步替换实例
- 无 downtime
- 逐步验证

### 金丝雀发布
- 先部署到小部分用户
- 监控指标
- 逐步扩大范围

## 最佳实践

1. 保持 CI 流程快速
2. 自动化所有检查
3. 小而频繁的提交
4. 使用特性开关
5. 做好回滚方案
6. 监控部署过程
7. 记录部署日志`,category:"DevOps",tags:["CI/CD","DevOps","最佳实践"],dateAdded:"2024-03-30",stars:8600},{id:"26",title:"日志规范",description:"日志记录最佳实践和规范",content:`# 日志规范

## 日志级别

### DEBUG
- 详细信息
- 开发调试使用
- 生产环境关闭
\`\`\`typescript
logger.debug('Processing request', { requestId, payload });
\`\`\`

### INFO
- 正常业务流程
- 重要事件记录
\`\`\`typescript
logger.info('User logged in', { userId, ip });
logger.info('Order created', { orderId, amount });
\`\`\`

### WARN
- 潜在问题
- 需要关注但非错误
\`\`\`typescript
logger.warn('Rate limit approaching', { userId, count });
logger.warn('Deprecated API called', { endpoint });
\`\`\`

### ERROR
- 错误和异常
- 需要立即处理
\`\`\`typescript
logger.error('Payment failed', { orderId, error: error.message });
\`\`\`

## 日志内容

### 结构化日志
\`\`\`typescript
// 好的做法
logger.info('Order processed', {
  orderId: '12345',
  userId: 'user_001',
  amount: 99.99,
  currency: 'USD',
  processingTime: 1250,
  status: 'success'
});
\`\`\`

### 避免的内容
- 敏感信息（密码、Token）
- 大量重复数据
- 无关业务信息

## 上下文信息

\`\`\`typescript
// 添加请求上下文
const logger = child({
  requestId: uuid(),
  userId: user?.id,
  ip: request.ip,
  userAgent: request.headers['user-agent']
});
\`\`\`

## 日志位置

### 服务端
\`\`\`typescript
// API 请求日志
logger.info('API Request', {
  method: req.method,
  path: req.path,
  query: req.query,
  duration: Date.now() - startTime
});
\`\`\`

### 业务日志
\`\`\`typescript
// 业务事件
logger.info('Business Event', {
  event: 'user.registered',
  userId: user.id,
  source: 'web'
});
\`\`\`

## 最佳实践

1. 统一日志格式
2. 使用合适的日志级别
3. 记录结构化数据
4. 添加上下文信息
5. 避免敏感信息
6. 合理控制日志量
7. 做好日志轮转
8. 集中日志收集`,category:"后端",tags:["日志","监控","最佳实践"],dateAdded:"2024-03-31",stars:6800},{id:"27",title:"响应式设计",description:"移动优先的响应式设计指南",content:`# 响应式设计

## 断点选择
\`\`\`css
/* 移动优先 */
.container {
  width: 100%;
  padding: 0 16px;
}

/* 小屏幕 */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

/* 中屏幕 */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

/* 大屏幕 */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* 超大屏幕 */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
\`\`\`

## 移动优先原则

### 基础样式（移动端）
\`\`\`css
/* 默认样式针对移动端 */
.sidebar {
  display: none;
  width: 250px;
}

.main-content {
  width: 100%;
}
\`\`\`

### 平板及以上
\`\`\`css
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
  .main-content {
    width: calc(100% - 250px);
  }
}
\`\`\`

## 弹性图片
\`\`\`css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 响应式图片 */
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="描述">
</picture>
\`\`\`

## 触摸优化

### 触摸目标
\`\`\`css
/* 最小 44x44 像素 */
button,
a,
.clickable {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}
\`\`\`

### 禁用缩放
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
\`\`\`

## 布局模式

### Flexbox
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

### Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
\`\`\`

## 最佳实践

1. 移动优先设计
2. 使用相对单位（rem, em, %）
3. 弹性图片和视频
4. 触摸目标足够大
5. 测试真实设备
6. 考虑横屏模式
7. 性能优化
8. 渐进增强`,category:"前端",tags:["响应式","CSS","移动端"],dateAdded:"2024-04-01",stars:7200},{id:"28",title:"消息队列最佳实践",description:"消息队列使用场景和设计指南",content:`# 消息队列最佳实践

## 使用场景

### 异步处理
- 邮件发送
- 短信通知
- 推送消息

### 系统解耦
- 服务间通信
- 事件驱动架构
- 分布式事务

### 流量削峰
- 订单处理
- 抢票系统
- 秒杀活动

## 队列设计

### 命名规范
\`\`\`
# 格式: 项目.模块.操作
order.created
payment.processed
user.registered
notification.email
\`\`\`

### 消息结构
\`\`\`typescript
interface Message<T> {
  id: string;
  type: string;
  payload: T;
  timestamp: number;
  retryCount: number;
  headers: Record<string, string>;
}
\`\`\`

## 消费者设计

### 幂等性处理
\`\`\`typescript
async function processMessage(message) {
  // 检查是否已处理
  const processed = await redis.exists(\`processed:\${message.id}\`);
  if (processed) {
    logger.info('Message already processed', { id: message.id });
    return;
  }
  
  // 处理业务
  await doBusiness(message);
  
  // 标记已处理
  await redis.setex(\`processed:\${message.id}\`, 86400, '1');
}
\`\`\`

### 重试机制
\`\`\`typescript
async function handleMessage(message) {
  try {
    await processMessage(message);
  } catch (error) {
    if (message.retryCount < 3) {
      // 延迟重试
      await delay(message.retryCount * 1000);
      await message.requeue({ retryCount: message.retryCount + 1 });
    } else {
      // 发送到死信队列
      await message.sendToDlq();
    }
  }
}
\`\`\`

## 最佳实践

1. 消息持久化
2. 消费者幂等
3. 合理设置重试
4. 死信队列处理
5. 监控队列积压
6. 消息顺序性处理
7. 避免消息过大
8. 做好容量规划`,category:"后端",tags:["消息队列","异步","最佳实践"],dateAdded:"2024-04-02",stars:7500},{id:"29",title:"监控与告警",description:"系统监控和告警策略设计",content:`# 监控与告警

## 监控指标

### 基础设施监控
- CPU 使用率
- 内存使用
- 磁盘 I/O
- 网络流量

### 应用监控
- 请求延迟
- 错误率
- 吞吐量
- 并发数

### 业务监控
- 订单量
- 转化率
- 活跃用户
- 收入

## 指标采集

### Prometheus 指标
\`\`\`typescript
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status']
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path'],
  buckets: [0.1, 0.5, 1, 2, 5]
});
\`\`\`

## 告警策略

### 告警级别
- P1: 紧急 - 服务不可用
- P2: 高 - 功能受损
- P3: 中 - 性能下降
- P4: 低 - 需要关注

### 告警规则
\`\`\`yaml
groups:
  - name: service
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "高错误率告警"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m]))) > 2
        for: 5m
        labels:
          severity: warning
\`\`\`

## 可观测性

### 日志聚合
- 结构化日志
- 统一格式
- 集中存储

### 链路追踪
\`\`\`typescript
import { trace, SpanStatusCode } from '@opentelemetry/api';

function handleRequest(req, res) {
  const span = trace.getTracer('service').startSpan('handleRequest');
  try {
    await processRequest(req);
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    throw error;
  } finally {
    span.end();
  }
}
\`\`\`

## 最佳实践

1. 全面监控覆盖
2. 合理的告警阈值
3. 避免告警风暴
4. 告警分级处理
5. 值班轮换
6. 告警收敛
7. 持续优化
8. 应急响应流程`,category:"DevOps",tags:["监控","告警","可观测性"],dateAdded:"2024-04-03",stars:6900},{id:"30",title:"微服务架构",description:"微服务设计和拆分原则",content:`# 微服务架构

## 服务拆分

### 拆分原则
- 单一职责
- 业务边界清晰
- 独立部署
- 独立数据库

### 拆分粒度
- 不是越小越好
- 考虑团队规模
- 考虑业务复杂度

## 服务通信

### 同步通信 - REST
\`\`\`typescript
// 服务 A 调用服务 B
async function getUserWithOrders(userId: string) {
  const user = await fetch(\`http://user-service/users/\${userId}\`)
    .then(res => res.json());
  
  const orders = await fetch(\`http://order-service/orders?userId=\${userId}\`)
    .then(res => res.json());
    
  return { user, orders };
}
\`\`\`

### 异步通信 - 消息队列
\`\`\`typescript
// 发布事件
await eventBus.publish('order.created', {
  orderId: '123',
  userId: '456',
  amount: 99.99,
  timestamp: Date.now()
});

// 订阅事件
eventBus.subscribe('order.created', async (event) => {
  await notificationService.sendEmail(event.userId, 'Order created');
  await analyticsService.track('order_created', event);
});
\`\`\`

## 服务发现

### 健康检查
\`\`\`yaml
# K8s 健康检查
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

## 分布式事务

### Saga 模式
\`\`\`typescript
async function placeOrder(order) {
  // 1. 创建订单
  await orderService.create(order);
  
  // 2. 预留库存 (补偿: 释放库存)
  try {
    await inventoryService.reserve(order.items);
  } catch {
    await orderService.cancel(order.id);
    throw new Error('库存不足');
  }
  
  // 3. 扣款 (补偿: 退款)
  try {
    await paymentService.charge(order.userId, order.amount);
  } catch {
    await inventoryService.release(order.items);
    await orderService.cancel(order.id);
    throw new Error('支付失败');
  }
  
  // 4. 完成订单
  await orderService.complete(order.id);
}
\`\`\`

## 最佳实践

1. 合理拆分服务
2. 服务独立部署
3. 使用 API 网关
4. 服务健康检查
5. 分布式追踪
6. 熔断降级
7. 配置中心
8. 监控告警`,category:"架构",tags:["微服务","分布式","架构"],dateAdded:"2024-04-04",stars:9200}],u="rules-favorites";function p(){let[e,p]=(0,c.useState)(""),[m,g]=(0,c.useState)(null),[f,y]=(0,c.useState)(""),[h,b]=(0,c.useState)(!1),[C,x]=(0,c.useState)(!1),[v,E]=(0,c.useState)("markdown"),[k,S]=(0,c.useState)([]);(0,c.useEffect)(()=>{let e;S((e=localStorage.getItem(u))?JSON.parse(e):[])},[]);let w=(0,c.useMemo)(()=>{let t=d.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.description.toLowerCase().includes(e.toLowerCase())||t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase()))).map(e=>({...e,isFavorite:k.includes(e.id)}));return t.sort((e,t)=>e.isFavorite&&!t.isFavorite?-1:!e.isFavorite&&t.isFavorite?1:(t.stars||0)-(e.stars||0)),t},[e,k]),$=(0,c.useMemo)(()=>{if(!m)return"";try{return i.marked.parse(m.content)}catch{return m.content}},[m]),R=e=>{(0,n.default)(e),s.message.success("复制成功")},N=async e=>{let t=`${window.location.origin}/rules?rule=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let r=await l.default.toDataURL(t);y(r),g(e),b(!0)}catch{s.message.error("生成二维码失败")}};return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Rules"})}),(0,t.jsx)(a.Input,{placeholder:"搜索 Rules...",value:e,onChange:e=>p(e.target.value),className:"mb-6",size:"large"}),(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:w.map(e=>{var r,a;return(0,t.jsxs)("div",{className:"group relative flex flex-col bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer overflow-hidden",onClick:()=>{g(e),E("markdown"),x(!0)},children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/20 transition-all duration-300"}),(0,t.jsxs)("div",{className:"relative flex flex-1 flex-col justify-between",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)(o.Tag,{color:"blue",className:"shrink-0 text-xs",children:e.category}),(0,t.jsx)("h3",{className:"font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors flex-1 line-clamp-1",children:e.title}),(0,t.jsx)("button",{type:"button",onClick:t=>{var r;let a;t.stopPropagation(),r=e.id,S(a=k.includes(r)?k.filter(e=>e!==r):[...k,r]),localStorage.setItem(u,JSON.stringify(a)),s.message.success(k.includes(r)?"已取消收藏":"已添加收藏")},className:"shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer","aria-label":e.isFavorite?"取消收藏":"添加收藏",children:(0,t.jsx)("svg",{className:`w-5 h-5 ${e.isFavorite?"text-red-500 fill-current":"text-gray-400"}`,viewBox:"0 0 24 24",fill:e.isFavorite?"currentColor":"none",stroke:"currentColor",strokeWidth:2,"aria-label":e.isFavorite?"已收藏":"未收藏",children:(0,t.jsx)("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})})})]}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mb-3",children:e.tags.slice(0,3).map(e=>(0,t.jsx)(o.Tag,{color:"orange",children:e},e))}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-xs text-gray-400 mb-3",children:[void 0!==e.stars&&e.stars>0&&(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("svg",{className:"w-3.5 h-3.5",viewBox:"0 0 24 24",fill:"currentColor","aria-label":"stars",children:(0,t.jsx)("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})}),(r=e.stars)?r>=1e3?`${(r/1e3).toFixed(1)}k`:r.toString():"0"]}),e.dateAdded&&(0,t.jsx)("span",{children:(a=e.dateAdded)?new Date(a).toLocaleDateString("zh-CN",{year:"numeric",month:"short",day:"numeric"}):""})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-3 border-t border-gray-100 mt-auto",children:[(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer w-20",onClick:t=>{t.stopPropagation(),R(e.content)},children:"复制"}),(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer w-20",onClick:t=>{t.stopPropagation(),N(e)},children:"分享"})]})]})]},e.id)})}),(0,t.jsx)(r.Drawer,{title:m?.title,placement:"right",size:"large",onClose:()=>x(!1),open:C,children:m&&(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 mb-4",children:m.description}),(0,t.jsxs)("div",{className:"mb-4 flex flex-wrap items-center gap-2",children:[(0,t.jsx)(o.Tag,{color:"blue",children:m.category}),m.tags.map(e=>(0,t.jsx)(o.Tag,{children:e},e)),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer",onClick:()=>R(m.content),children:"复制"}),(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer",onClick:()=>N(m),children:"分享"})]}),(0,t.jsxs)("div",{className:"mb-2 flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"内容预览"}),(0,t.jsx)("button",{type:"button",className:`px-3 py-1 text-sm font-medium rounded-lg transition-colors cursor-pointer ${"markdown"===v?"bg-indigo-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,onClick:()=>E("markdown"===v?"raw":"markdown"),children:"markdown"===v?"📄 原始":"🎨 渲染"})]}),(0,t.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg max-h-[70vh] overflow-y-auto",children:"markdown"===v?(0,t.jsx)("div",{className:"prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-gray-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-800 prose-pre:text-gray-100",dangerouslySetInnerHTML:{__html:$}}):(0,t.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm text-gray-700",children:m.content})})]})}),(0,t.jsx)(r.Drawer,{title:"分享 Rule",placement:"bottom",height:"300px",onClose:()=>b(!1),open:h,children:f&&(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:f,alt:"QR Code",className:"mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Rule"})]})})]})}e.s(["default",()=>p],93857)}]);