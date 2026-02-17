(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,17900,e=>{"use strict";let t=e.i(38727).default;e.s(["Button",0,t],17900)},53359,e=>{"use strict";e.i(89171);var t=e.i(59990);let l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};var o=e.i(24144);function a(){return(a=Object.assign.bind()).apply(this,arguments)}let n=t.forwardRef((e,n)=>t.createElement(o.default,a({},e,{ref:n,icon:l})));e.s(["default",0,n],53359)},29870,70276,e=>{"use strict";e.i(89171);var t=e.i(59990);let l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};var o=e.i(24144);function a(){return(a=Object.assign.bind()).apply(this,arguments)}let n=t.forwardRef((e,n)=>t.createElement(o.default,a({},e,{ref:n,icon:l})));e.s(["default",0,n],29870);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};function s(){return(s=Object.assign.bind()).apply(this,arguments)}let i=t.forwardRef((e,l)=>t.createElement(o.default,s({},e,{ref:l,icon:r})));e.s(["default",0,i],70276)},96385,e=>{"use strict";let t=e.i(59990).default.createContext({});e.s(["AppConfigContext",0,t])},59611,37248,e=>{"use strict";e.i(89171);var t=e.i(35492),l=e.i(59990),o=e.i(45605),a=e.i(96385),n=e.i(59782),r=e.i(77425),s=e.i(53359),i=e.i(557),c=e.i(29870),d=e.i(70276),u=e.i(33421),m=e.i(45512),p=e.i(7284);e.i(98178);var g=e.i(85238);e.s(["CSSMotionList",()=>g.default],37248);var g=g,f=e.i(47371),h=e.i(14828);function y(){return(y=Object.assign.bind()).apply(this,arguments)}let C=l.forwardRef((e,t)=>{let{prefixCls:o,style:a,className:n,duration:r=4.5,showProgress:s,pauseOnHover:i=!0,eventKey:c,content:d,closable:u,props:m,onClick:g,onNoticeClose:C,times:b,hovering:v}=e,[x,$]=l.useState(!1),[k,E]=l.useState(0),[S,w]=l.useState(0),N=v||x,R="number"==typeof r?r:0,T=R>0&&s,M=()=>{C(c)};l.useEffect(()=>{if(!N&&R>0){let e=Date.now()-S,t=setTimeout(()=>{M()},1e3*R-S);return()=>{i&&clearTimeout(t),w(Date.now()-e)}}},[R,N,b]),l.useEffect(()=>{if(!N&&T&&(i||0===S)){let e,t=performance.now(),l=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(e=>{let o=Math.min((e+S-t)/(1e3*R),1);E(100*o),o<1&&l()})};return l(),()=>{i&&cancelAnimationFrame(e)}}},[R,S,N,T,b]);let A=l.useMemo(()=>"object"==typeof u&&null!==u?u:{},[u]),j=(0,h.default)(A,!0),D=100-(!k||k<0?0:k>100?100:k),P=`${o}-notice`;return l.createElement("div",y({},m,{ref:t,className:(0,p.clsx)(P,n,{[`${P}-closable`]:u}),style:a,onMouseEnter:e=>{$(!0),m?.onMouseEnter?.(e)},onMouseLeave:e=>{$(!1),m?.onMouseLeave?.(e)},onClick:g}),l.createElement("div",{className:`${P}-content`},d),u&&l.createElement("button",y({className:`${P}-close`,onKeyDown:e=>{("Enter"===e.key||"Enter"===e.code||e.keyCode===f.default.ENTER)&&M()},"aria-label":"Close"},j,{onClick:e=>{e.preventDefault(),e.stopPropagation(),M()}}),A.closeIcon??"x"),T&&l.createElement("progress",{className:`${P}-progress`,max:"100",value:D},D+"%"))}),b=l.default.createContext({}),v=({children:e,classNames:t})=>l.default.createElement(b.Provider,{value:{classNames:t}},e);function x(){return(x=Object.assign.bind()).apply(this,arguments)}let $=e=>{let t,{configList:o,placement:a,prefixCls:n,className:r,style:s,motion:i,onAllNoticeRemoved:c,onNoticeClose:d,stack:u}=e,{classNames:m}=(0,l.useContext)(b),f=(0,l.useRef)({}),[h,y]=(0,l.useState)(null),[v,$]=(0,l.useState)([]),k=o.map(e=>({config:e,key:String(e.key)})),[E,{offset:S,threshold:w,gap:N}]=(t={offset:8,threshold:3,gap:16},u&&"object"==typeof u&&(t.offset=u.offset??8,t.threshold=u.threshold??3,t.gap=u.gap??16),[!!u,t]),R=E&&(v.length>0||k.length<=w),T="function"==typeof i?i(a):i;return(0,l.useEffect)(()=>{E&&v.length>1&&$(e=>e.filter(e=>k.some(({key:t})=>e===t)))},[v,k,E]),(0,l.useEffect)(()=>{E&&f.current[k[k.length-1]?.key]&&y(f.current[k[k.length-1]?.key])},[k,E]),l.default.createElement(g.default,x({key:a,className:(0,p.clsx)(n,`${n}-${a}`,m?.list,r,{[`${n}-stack`]:!!E,[`${n}-stack-expanded`]:R}),style:s,keys:k,motionAppear:!0},T,{onAllRemoved:()=>{c(a)}}),({config:e,className:t,style:o,index:r},s)=>{let{key:i,times:c}=e,u=String(i),{className:g,style:y,classNames:b,styles:w,...T}=e,M=k.findIndex(e=>e.key===u),A={};if(E){let e=k.length-1-(M>-1?M:r-1),t="top"===a||"bottom"===a?"-50%":"0";if(e>0){A.height=R?f.current[u]?.offsetHeight:h?.offsetHeight;let l=0;for(let t=0;t<e;t++)l+=f.current[k[k.length-1-t].key]?.offsetHeight+N;let o=(R?l:e*S)*(a.startsWith("top")?1:-1),n=!R&&h?.offsetWidth&&f.current[u]?.offsetWidth?(h?.offsetWidth-2*S*(e<3?e:3))/f.current[u]?.offsetWidth:1;A.transform=`translate3d(${t}, ${o}px, 0) scaleX(${n})`}else A.transform=`translate3d(${t}, 0, 0)`}return l.default.createElement("div",{ref:s,className:(0,p.clsx)(`${n}-notice-wrapper`,t,b?.wrapper),style:{...o,...A,...w?.wrapper},onMouseEnter:()=>$(e=>e.includes(u)?e:[...e,u]),onMouseLeave:()=>$(e=>e.filter(e=>e!==u))},l.default.createElement(C,x({},T,{ref:e=>{M>-1?f.current[u]=e:delete f.current[u]},prefixCls:n,classNames:b,styles:w,className:(0,p.clsx)(g,m?.notice),style:y,times:c,key:i,eventKey:i,onNoticeClose:d,hovering:E&&v.length>0})))})},k=l.forwardRef((e,t)=>{let{prefixCls:o="rc-notification",container:a,motion:n,maxCount:r,className:s,style:i,onAllRemoved:c,stack:d,renderNotifications:u}=e,[p,g]=l.useState([]),f=e=>{let t=p.find(t=>t.key===e),l=t?.closable,{onClose:o}=l&&"object"==typeof l?l:{};o?.(),t?.onClose?.(),g(t=>t.filter(t=>t.key!==e))};l.useImperativeHandle(t,()=>({open:e=>{g(t=>{let l=[...t],o=l.findIndex(t=>t.key===e.key),a={...e};return o>=0?(a.times=(t[o]?.times||0)+1,l[o]=a):(a.times=0,l.push(a)),r>0&&l.length>r&&(l=l.slice(-r)),l})},close:e=>{f(e)},destroy:()=>{g([])}}));let[h,y]=l.useState({});l.useEffect(()=>{let e={};p.forEach(t=>{let{placement:l="topRight"}=t;l&&(e[l]=e[l]||[],e[l].push(t))}),Object.keys(h).forEach(t=>{e[t]=e[t]||[]}),y(e)},[p]);let C=e=>{y(t=>{let l={...t};return(l[e]||[]).length||delete l[e],l})},b=l.useRef(!1);if(l.useEffect(()=>{Object.keys(h).length>0?b.current=!0:b.current&&(c?.(),b.current=!1)},[h]),!a)return null;let v=Object.keys(h);return(0,m.createPortal)(l.createElement(l.Fragment,null,v.map(e=>{let t=h[e],a=l.createElement($,{key:e,configList:t,placement:e,prefixCls:o,className:s?.(e),style:i?.(e),motion:n,onNoticeClose:f,onAllNoticeRemoved:C,stack:d});return u?u(a,{prefixCls:o,key:e}):a})),a)});e.i(51235);var E=e.i(26600);let S=()=>document.body,w=0;var N=e.i(31861),R=e.i(1975),T=e.i(31328);e.i(99838);var M=e.i(34471),A=e.i(81221),j=e.i(97638),D=e.i(4999),P=e.i(21746);let I=(0,D.genStyleHooks)("Message",e=>(e=>{let{componentCls:t,iconCls:l,boxShadow:o,colorText:a,colorSuccess:n,colorError:r,colorWarning:s,colorInfo:i,fontSizeLG:c,motionEaseInOutCirc:d,motionDurationSlow:u,marginXS:m,paddingXS:p,borderRadiusLG:g,zIndexPopup:f,contentPadding:h,contentBg:y}=e,C=`${t}-notice`,b=new M.Keyframes("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:p,transform:"translateY(0)",opacity:1}}),v=new M.Keyframes("MessageMoveOut",{"0%":{maxHeight:e.height,padding:p,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),x={padding:p,textAlign:"center",[`${t}-custom-content`]:{display:"flex",alignItems:"center"},[`${t}-custom-content > ${l}`]:{marginInlineEnd:m,fontSize:c},[`${C}-content`]:{display:"inline-block",padding:h,background:y,borderRadius:g,boxShadow:o,pointerEvents:"all"},[`${t}-success > ${l}`]:{color:n},[`${t}-error > ${l}`]:{color:r},[`${t}-warning > ${l}`]:{color:s},[`${t}-info > ${l},
      ${t}-loading > ${l}`]:{color:i}};return[{[t]:{...(0,j.resetComponent)(e),color:a,position:"fixed",top:m,width:"100%",pointerEvents:"none",zIndex:f,[`${t}-move-up`]:{animationFillMode:"forwards"},[`
        ${t}-move-up-appear,
        ${t}-move-up-enter
      `]:{animationName:b,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`
        ${t}-move-up-appear${t}-move-up-appear-active,
        ${t}-move-up-enter${t}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${t}-move-up-leave`]:{animationName:v,animationDuration:u,animationPlayState:"paused",animationTimingFunction:d},[`${t}-move-up-leave${t}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}}},{[t]:{[`${C}-wrapper`]:{...x}}},{[`${t}-notice-pure-panel`]:{...x,padding:0,textAlign:"start"}}]})((0,P.mergeToken)(e,{height:150})),e=>({zIndexPopup:e.zIndexPopupBase+A.CONTAINER_MAX_OFFSET+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`})),B={info:l.createElement(d.default,null),success:l.createElement(s.default,null),error:l.createElement(i.default,null),warning:l.createElement(c.default,null),loading:l.createElement(u.default,null)},H=e=>{let{prefixCls:t,type:o,icon:a,children:n,classNames:r,styles:s}=e,i=a||o&&B[o],c=(0,R.cloneElement)(i,e=>{let t={...e?.style,...s?.icon};return{className:(0,p.clsx)(e.className,r?.icon),style:t}});return l.createElement("div",{className:(0,p.clsx)(`${t}-custom-content`,`${t}-${o}`)},c,l.createElement("span",{className:r?.content,style:s?.content},n))};var L=e.i(92233),z=e.i(39266);function F(e){let t,l=new Promise(l=>{t=e(()=>{l(!0)})}),o=()=>{t?.()};return o.then=(e,t)=>l.then(e,t),o.promise=l,o}let q=({children:e,prefixCls:t})=>{let o=(0,T.default)(t),[a,n]=I(t,o);return l.createElement(v,{classNames:{list:(0,p.clsx)(a,n,o)}},e)},O=(e,{prefixCls:t,key:o})=>l.createElement(q,{prefixCls:t,key:o},e),U=l.forwardRef((e,t)=>{let{top:o,prefixCls:a,getContainer:n,maxCount:s,duration:i=3,rtl:c,transitionName:d,onAllRemoved:u,pauseOnHover:m=!0}=e,{getPrefixCls:g,direction:f,getPopupContainer:h}=(0,r.useComponentConfig)("message"),{message:y}=l.useContext(r.ConfigContext),C=a||g("message"),[b,v]=(0,N.useMergeSemantic)([e?.classNames,y?.classNames],[e?.styles,y?.styles],{props:e}),[x,$]=function(e={}){let{getContainer:t=S,motion:o,prefixCls:a,maxCount:n,className:r,style:s,onAllRemoved:i,stack:c,renderNotifications:d,...u}=e,[m,p]=l.useState(),g=l.useRef(),f=l.createElement(k,{container:m,ref:g,prefixCls:a,motion:o,maxCount:n,className:r,style:s,onAllRemoved:i,stack:c,renderNotifications:d}),[h,y]=l.useState([]),C=(0,E.useEvent)(e=>{let t=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(l=>{let o=e[l];void 0!==o&&(t[l]=o)})}),t}(u,e);(null===t.key||void 0===t.key)&&(t.key=`rc-notification-${w}`,w+=1),y(e=>[...e,{type:"open",config:t}])}),b=l.useMemo(()=>({open:C,close:e=>{y(t=>[...t,{type:"close",key:e}])},destroy:()=>{y(e=>[...e,{type:"destroy"}])}}),[]);return l.useEffect(()=>{p(t())}),l.useEffect(()=>{if(g.current&&h.length){let e,t;h.forEach(e=>{switch(e.type){case"open":g.current.open(e.config);break;case"close":g.current.close(e.key);break;case"destroy":g.current.destroy()}}),y(l=>(e===l&&t||(e=l,t=l.filter(e=>!h.includes(e))),t))}},[h]),[b,f]}({prefixCls:C,style:()=>({left:"50%",transform:"translateX(-50%)",top:o??8}),className:()=>(0,p.clsx)({[`${C}-rtl`]:c??"rtl"===f}),motion:()=>({motionName:d??`${C}-move-up`}),closable:!1,duration:i,getContainer:()=>n?.()||h?.()||document.body,maxCount:s,onAllRemoved:u,renderNotifications:O,pauseOnHover:m});return l.useImperativeHandle(t,()=>({...x,prefixCls:C,message:y,classNames:b,styles:v})),$}),W=0;function _(e){let t=l.useRef(null);return(0,z.devUseWarning)("Message"),[l.useMemo(()=>{let o=e=>{t.current?.close(e)},a=a=>{if(!t.current){let e=()=>{};return e.then=()=>{},e}let{open:n,prefixCls:r,message:s,classNames:i,styles:c}=t.current,d=s?.className||{},u=s?.style||{},m=s?.classNames||{},g=s?.styles||{},f=`${r}-notice`,{content:h,icon:y,type:C,key:b,className:v,style:x,onClose:$,classNames:k={},styles:E={},...S}=a,w=b;(0,L.default)(w)||(W+=1,w=`antd-message-${W}`);let R={...e,...a},T=(0,N.resolveStyleOrClass)(m,{props:R}),M=(0,N.resolveStyleOrClass)(k,{props:R}),A=(0,N.resolveStyleOrClass)(g,{props:R}),j=(0,N.resolveStyleOrClass)(E,{props:R}),D=(0,N.mergeClassNames)(void 0,T,M,i),P=(0,N.mergeStyles)(A,j,c);return F(e=>(n({...S,key:w,content:l.createElement(H,{prefixCls:r,type:C,icon:y,classNames:D,styles:P},h),placement:"top",className:(0,p.clsx)({[`${f}-${C}`]:C},v,d,D.root),style:{...P.root,...u,...x},onClose:()=>{$?.(),e()}}),()=>{o(w)}))},n={open:a,destroy:e=>{void 0!==e?o(e):t.current?.destroy()}};return["info","success","warning","error","loading"].forEach(e=>{n[e]=(t,l,o)=>{let n,r,s;return n=t&&"object"==typeof t&&"content"in t?t:{content:t},"function"==typeof l?s=l:(r=l,s=o),a({onClose:s,duration:r,...n,type:e})}}),n},[]),l.createElement(U,{key:"message-holder",...e,ref:t})]}let G=null,K=[],X={};function V(){let{getContainer:e,duration:t,rtl:l,maxCount:o,top:a}=X,n=e?.()||document.body;return{getContainer:()=>n,duration:t,rtl:l,maxCount:o,top:a}}let Q=l.default.forwardRef((e,t)=>{let{messageConfig:o,sync:n}=e,{getPrefixCls:s}=(0,l.useContext)(r.ConfigContext),i=X.prefixCls||s("message"),c=(0,l.useContext)(a.AppConfigContext),[d,u]=_({...o,prefixCls:i,...c.message});return l.default.useImperativeHandle(t,()=>{let e={...d};return Object.keys(e).forEach(t=>{e[t]=(...e)=>(n(),d[t].apply(d,e))}),{instance:e,sync:n}}),u}),J=l.default.forwardRef((e,t)=>{let[o,a]=l.default.useState(V),r=()=>{a(V)};l.default.useEffect(r,[]);let s=(0,n.globalConfig)(),i=s.getRootPrefixCls(),c=s.getIconPrefixCls(),d=s.getTheme(),u=l.default.createElement(Q,{ref:t,sync:r,messageConfig:o});return l.default.createElement(n.default,{prefixCls:i,iconPrefixCls:c,theme:d},s.holderRender?s.holderRender(u):u)}),Y=()=>{if(!G){let e=document.createDocumentFragment(),t={fragment:e};G=t,(()=>{(0,o.render)(l.default.createElement(J,{ref:e=>{let{instance:l,sync:o}=e||{};Promise.resolve().then(()=>{!t.instance&&l&&(t.instance=l,t.sync=o,Y())})}}),e)})();return}G.instance&&(K.forEach(e=>{let{type:l,skipped:o}=e;if(!o)switch(l){case"open":{let t=G.instance.open({...X,...e.config});t?.then(e.resolve),e.setCloseFn(t)}break;case"destroy":G?.instance.destroy(e.key);break;default:{var a;let o=(a=G.instance)[l].apply(a,(0,t.default)(e.args));o?.then(e.resolve),e.setCloseFn(o)}}}),K=[])},Z={open:function(e){let t=F(t=>{let l,o={type:"open",config:e,resolve:t,setCloseFn:e=>{l=e}};return K.push(o),()=>{l?(()=>{l()})():o.skipped=!0}});return Y(),t},destroy:e=>{K.push({type:"destroy",key:e}),Y()},config:function(e){X={...X,...e},(()=>{G?.sync?.()})()},useMessage:function(e){return _(e)},_InternalPanelDoNotUseOrYouWillBeFired:e=>{let{prefixCls:t,className:o,style:a,type:n,icon:s,content:i,classNames:c,styles:d,...u}=e,{getPrefixCls:m,className:g,style:f,classNames:h,styles:y}=(0,r.useComponentConfig)("message"),b=t||m("message"),v=(0,T.default)(b),[x,$]=I(b,v),[k,E]=(0,N.useMergeSemantic)([h,c],[y,d],{props:e});return l.createElement(C,{...u,prefixCls:b,className:(0,p.clsx)(g,k.root,o,x,`${b}-notice-pure-panel`,$,v),style:{...E.root,...f,...a},eventKey:"pure",duration:null,content:l.createElement(H,{prefixCls:b,type:n,icon:s,classNames:k,styles:E},i)})}};["success","info","warning","error","loading"].forEach(e=>{Z[e]=(...t)=>{let l;return(0,n.globalConfig)(),l=F(l=>{let o,a={type:e,args:t,resolve:l,setCloseFn:e=>{o=e}};return K.push(a),()=>{o?(()=>{o()})():a.skipped=!0}}),Y(),l}});e.s(["message",0,Z],59611)},21583,(e,t,l)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,l=[],o=0;o<e.rangeCount;o++)l.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||l.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,l)=>{"use strict";var o=e.r(21583),a={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var l,n,r,s,i,c,d,u,m=!1;t||(t={}),r=t.debug||!1;try{if(i=o(),c=document.createRange(),d=document.getSelection(),(u=document.createElement("span")).textContent=e,u.ariaHidden="true",u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",function(l){if(l.stopPropagation(),t.format)if(l.preventDefault(),void 0===l.clipboardData){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=a[t.format]||a.default;window.clipboardData.setData(o,e)}else l.clipboardData.clearData(),l.clipboardData.setData(t.format,e);t.onCopy&&(l.preventDefault(),t.onCopy(l.clipboardData))}),document.body.appendChild(u),c.selectNodeContents(u),d.addRange(c),!document.execCommand("copy"))throw Error("copy command was unsuccessful");m=!0}catch(o){r&&console.error("unable to copy using execCommand: ",o),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),m=!0}catch(o){r&&console.error("unable to copy using clipboardData: ",o),r&&console.error("falling back to prompt"),l="message"in t?t.message:"Copy to clipboard: #{key}, Enter",n=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",s=l.replace(/#{\s*key\s*}/g,n),window.prompt(s,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(c):d.removeAllRanges()),u&&document.body.removeChild(u),i()}return m}},74190,e=>{"use strict";e.i(89171);var t=e.i(59990);let l={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"};var o=e.i(24144);function a(){return(a=Object.assign.bind()).apply(this,arguments)}let n=t.forwardRef((e,n)=>t.createElement(o.default,a({},e,{ref:n,icon:l})));e.s(["default",0,n],74190)},81485,e=>{"use strict";e.i(89171);var t=e.i(59990),l=e.i(7284),o=e.i(31861),a=e.i(77425);let n=e=>{let{prefixCls:o,className:a,style:n,size:r,shape:s}=e,i=(0,l.clsx)({[`${o}-lg`]:"large"===r,[`${o}-sm`]:"small"===r}),c=(0,l.clsx)({[`${o}-circle`]:"circle"===s,[`${o}-square`]:"square"===s,[`${o}-round`]:"round"===s}),d=t.useMemo(()=>"number"==typeof r?{width:r,height:r,lineHeight:`${r}px`}:{},[r]);return t.createElement("span",{className:(0,l.clsx)(o,i,c,a),style:{...d,...n}})};e.i(99838);var r=e.i(34471),s=e.i(32556),i=e.i(4999),c=e.i(21746);let d=new r.Keyframes("ant-skeleton-loading",{"0%":{backgroundPosition:"100% 50%"},"100%":{backgroundPosition:"0 50%"}}),u=e=>({height:e,lineHeight:(0,s.unit)(e)}),m=e=>({width:e,...u(e)}),p=(e,t)=>({width:t(e).mul(5).equal(),minWidth:t(e).mul(5).equal(),...u(e)}),g=e=>{let{gradientFromColor:t,borderRadiusSM:l,imageSizeBase:o,calc:a}=e;return{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"middle",background:t,borderRadius:l,...m(a(o).mul(2).equal())}},f=(e,t,l)=>{let{skeletonButtonCls:o}=e;return{[`${l}${o}-circle`]:{width:t,minWidth:t,borderRadius:"50%"},[`${l}${o}-round`]:{borderRadius:t}}},h=(e,t)=>({width:t(e).mul(2).equal(),minWidth:t(e).mul(2).equal(),...u(e)}),y=(0,i.genStyleHooks)("Skeleton",e=>{let{componentCls:t,calc:l}=e;return(e=>{let{componentCls:t,skeletonAvatarCls:l,skeletonTitleCls:o,skeletonParagraphCls:a,skeletonButtonCls:n,skeletonInputCls:r,skeletonNodeCls:s,skeletonImageCls:i,controlHeight:c,controlHeightLG:u,controlHeightSM:y,gradientFromColor:C,padding:b,marginSM:v,borderRadius:x,titleHeight:$,blockRadius:k,paragraphLiHeight:E,controlHeightXS:S,paragraphMarginTop:w}=e;return{[t]:{display:"table",width:"100%",[`${t}-header`]:{display:"table-cell",paddingInlineEnd:b,verticalAlign:"top",[l]:{display:"inline-block",verticalAlign:"top",background:C,...m(c)},[`${l}-circle`]:{borderRadius:"50%"},[`${l}-lg`]:{...m(u)},[`${l}-sm`]:{...m(y)}},[`${t}-section`]:{display:"table-cell",width:"100%",verticalAlign:"top",[o]:{width:"100%",height:$,background:C,borderRadius:k,[`+ ${a}`]:{marginBlockStart:y}},[a]:{padding:0,"> li":{width:"100%",height:E,listStyle:"none",background:C,borderRadius:k,"+ li":{marginBlockStart:S}}},[`${a}> li:last-child:not(:first-child):not(:nth-child(2))`]:{width:"61%"}},[`&-round ${t}-section`]:{[`${o}, ${a} > li`]:{borderRadius:x}}},[`${t}-with-avatar ${t}-section`]:{[o]:{marginBlockStart:v,[`+ ${a}`]:{marginBlockStart:w}}},[`${t}${t}-element`]:{display:"inline-block",width:"auto",...(e=>{let{borderRadiusSM:t,skeletonButtonCls:l,controlHeight:o,controlHeightLG:a,controlHeightSM:n,gradientFromColor:r,calc:s}=e;return{[l]:{display:"inline-block",verticalAlign:"top",background:r,borderRadius:t,width:s(o).mul(2).equal(),minWidth:s(o).mul(2).equal(),...h(o,s)},...f(e,o,l),[`${l}-lg`]:{...h(a,s)},...f(e,a,`${l}-lg`),[`${l}-sm`]:{...h(n,s)},...f(e,n,`${l}-sm`)}})(e),...(e=>{let{skeletonAvatarCls:t,gradientFromColor:l,controlHeight:o,controlHeightLG:a,controlHeightSM:n}=e;return{[t]:{display:"inline-block",verticalAlign:"top",background:l,...m(o)},[`${t}${t}-circle`]:{borderRadius:"50%"},[`${t}${t}-lg`]:{...m(a)},[`${t}${t}-sm`]:{...m(n)}}})(e),...(e=>{let{controlHeight:t,borderRadiusSM:l,skeletonInputCls:o,controlHeightLG:a,controlHeightSM:n,gradientFromColor:r,calc:s}=e;return{[o]:{display:"inline-block",verticalAlign:"top",background:r,borderRadius:l,...p(t,s)},[`${o}-lg`]:{...p(a,s)},[`${o}-sm`]:{...p(n,s)}}})(e),...{[e.skeletonNodeCls]:{...g(e)}},...(e=>{let{skeletonImageCls:t,imageSizeBase:l,calc:o}=e;return{[t]:{...g(e),[`${t}-path`]:{fill:"#bfbfbf"},[`${t}-svg`]:{...m(l),maxWidth:o(l).mul(4).equal(),maxHeight:o(l).mul(4).equal()},[`${t}-svg${t}-svg-circle`]:{borderRadius:"50%"}},[`${t}${t}-circle`]:{borderRadius:"50%"}}})(e)},[`${t}${t}-block`]:{width:"100%",[n]:{width:"100%"},[r]:{width:"100%"}},[`${t}${t}-active`]:{[`
        ${o},
        ${a} > li,
        ${l},
        ${n},
        ${r},
        ${s},
        ${i}
      `]:{...{background:e.skeletonLoadingBackground,backgroundSize:"400% 100%",animationName:d,animationDuration:e.skeletonLoadingMotionDuration,animationTimingFunction:"ease",animationIterationCount:"infinite"}}}}})((0,c.mergeToken)(e,{skeletonAvatarCls:`${t}-avatar`,skeletonTitleCls:`${t}-title`,skeletonParagraphCls:`${t}-paragraph`,skeletonButtonCls:`${t}-button`,skeletonInputCls:`${t}-input`,skeletonNodeCls:`${t}-node`,skeletonImageCls:`${t}-image`,imageSizeBase:l(e.controlHeight).mul(1.5).equal(),borderRadius:100,skeletonLoadingBackground:`linear-gradient(90deg, ${e.gradientFromColor} 25%, ${e.gradientToColor} 37%, ${e.gradientFromColor} 63%)`,skeletonLoadingMotionDuration:"1.4s"}))},e=>{let{colorFillContent:t,colorFill:l}=e;return{color:t,colorGradientEnd:l,gradientFromColor:t,gradientToColor:l,titleHeight:e.controlHeight/2,blockRadius:e.borderRadiusSM,paragraphMarginTop:e.marginLG+e.marginXXS,paragraphLiHeight:e.controlHeight/2}},{deprecatedTokens:[["color","gradientFromColor"],["colorGradientEnd","gradientToColor"]]}),C=e=>{let{prefixCls:o,className:n,classNames:r,rootClassName:s,internalClassName:i,style:c,styles:d,active:u,children:m}=e,{getPrefixCls:p}=t.useContext(a.ConfigContext),g=p("skeleton",o),[f,h]=y(g),C=(0,l.clsx)(g,`${g}-element`,{[`${g}-active`]:u},f,r?.root,n,s,h);return t.createElement("div",{className:C,style:d?.root},t.createElement("div",{className:(0,l.clsx)(r?.content,i||`${g}-node`),style:{...d?.content,...c}},m))},b=e=>{let{prefixCls:o,className:a,style:n,rows:r=0}=e,s=Array.from({length:r}).map((l,o)=>t.createElement("li",{key:o,style:{width:((e,t)=>{let{width:l,rows:o=2}=t;return Array.isArray(l)?l[e]:o-1===e?l:void 0})(o,e)}}));return t.createElement("ul",{className:(0,l.clsx)(o,a),style:n},s)},v=({prefixCls:e,className:o,width:a,style:n})=>t.createElement("h3",{className:(0,l.clsx)(e,o),style:{width:a,...n}});function x(e){return e&&"object"==typeof e?e:{}}let $=e=>{let{prefixCls:r,loading:s,className:i,rootClassName:c,classNames:d,style:u,styles:m,children:p,avatar:g=!1,title:f=!0,paragraph:h=!0,active:C,round:$}=e,{getPrefixCls:k,direction:E,className:S,style:w,classNames:N,styles:R}=(0,a.useComponentConfig)("skeleton"),T=k("skeleton",r),[M,A]=y(T),j={...e,avatar:g,title:f,paragraph:h},[D,P]=(0,o.useMergeSemantic)([N,d],[R,m],{props:j});if(s||!("loading"in e)){let e,o,a=!!g,r=!!f,s=!!h;if(a){let o={className:D.avatar,prefixCls:`${T}-avatar`,...r&&!s?{size:"large",shape:"square"}:{size:"large",shape:"circle"},...x(g),style:P.avatar};e=t.createElement("div",{className:(0,l.clsx)(D.header,`${T}-header`),style:P.header},t.createElement(n,{...o}))}if(r||s){let e,n;if(r){let l={className:D.title,prefixCls:`${T}-title`,...!a&&s?{width:"38%"}:a&&s?{width:"50%"}:{},...x(f),style:P.title};e=t.createElement(v,{...l})}if(s){let e,l={className:D.paragraph,prefixCls:`${T}-paragraph`,...(e={},(!a||!r)&&(e.width="61%"),!a&&r?e.rows=3:e.rows=2,e),...x(h),style:P.paragraph};n=t.createElement(b,{...l})}o=t.createElement("div",{className:(0,l.clsx)(D.section,`${T}-section`),style:P.section},e,n)}let d=(0,l.clsx)(T,{[`${T}-with-avatar`]:a,[`${T}-active`]:C,[`${T}-rtl`]:"rtl"===E,[`${T}-round`]:$},D.root,S,i,c,M,A);return t.createElement("div",{className:d,style:{...P.root,...w,...u}},e,o)}return p??null};$.Button=e=>{let{prefixCls:o,className:r,rootClassName:s,classNames:i,active:c,style:d,styles:u,block:m=!1,size:p="default",...g}=e,{getPrefixCls:f}=t.useContext(a.ConfigContext),h=f("skeleton",o),[C,b]=y(h),v=(0,l.clsx)(h,`${h}-element`,{[`${h}-active`]:c,[`${h}-block`]:m},i?.root,r,s,C,b);return t.createElement("div",{className:v,style:u?.root},t.createElement(n,{prefixCls:`${h}-button`,className:i?.content,style:{...u?.content,...d},size:p,...g}))},$.Avatar=e=>{let{prefixCls:o,className:r,classNames:s,rootClassName:i,active:c,style:d,styles:u,shape:m="circle",size:p="default",...g}=e,{getPrefixCls:f}=t.useContext(a.ConfigContext),h=f("skeleton",o),[C,b]=y(h),v=(0,l.clsx)(h,`${h}-element`,{[`${h}-active`]:c},s?.root,r,i,C,b);return t.createElement("div",{className:v,style:u?.root},t.createElement(n,{prefixCls:`${h}-avatar`,className:s?.content,style:{...u?.content,...d},shape:m,size:p,...g}))},$.Input=e=>{let{prefixCls:o,className:r,classNames:s,rootClassName:i,active:c,block:d,style:u,styles:m,size:p="default",...g}=e,{getPrefixCls:f}=t.useContext(a.ConfigContext),h=f("skeleton",o),[C,b]=y(h),v=(0,l.clsx)(h,`${h}-element`,{[`${h}-active`]:c,[`${h}-block`]:d},s?.root,r,i,C,b);return t.createElement("div",{className:v,style:m?.root},t.createElement(n,{prefixCls:`${h}-input`,className:s?.content,style:{...m?.content,...u},size:p,...g}))},$.Image=e=>{let{getPrefixCls:l}=t.useContext(a.ConfigContext),o=l("skeleton",e.prefixCls);return t.createElement(C,{...e,internalClassName:`${o}-image`},t.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:`${o}-image-svg`},t.createElement("title",null,"Image placeholder"),t.createElement("path",{d:"M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",className:`${o}-image-path`})))},$.Node=C,e.s(["default",0,$],81485)},57737,84323,e=>{"use strict";e.i(89171);var t=e.i(59990);e.i(51235);var l=e.i(23267),o=e.i(7284),a=e.i(74190),n=e.i(14828),r=e.i(59894),s=e.i(18218);let i=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(l=>{void 0!==e[l]&&(t[l]=e[l])})}),t};var c=e.i(92233);let d=e=>{if(!e)return;let{closable:t,closeIcon:l}=e;return{closable:t,closeIcon:l}},u={},m=(e,t)=>{if(!e&&(!1===e||!1===t||null===t))return!1;if(void 0===e&&void 0===t)return null;let l={closeIcon:"boolean"!=typeof t&&null!==t?t:void 0};return e&&"object"==typeof e&&(l={...l,...e}),l},p=(e,l,o=u)=>{let[d]=(0,r.useLocale)("global",s.default.global);return t.default.useMemo(()=>((e,l,o=u,r="Close")=>{let s=m(e?.closable,e?.closeIcon),d=m(l?.closable,l?.closeIcon),p={closeIcon:t.default.createElement(a.default,null),...o},g=!1!==s&&(s?i(p,d,s):!1!==d&&(d?i(p,d):!!p.closable&&p)),f="boolean"!=typeof g&&!!g?.disabled;if(!1===g)return[!1,null,f,{}];let[h,y]=((e,l,o)=>{let{closeIconRender:a}=l,{closeIcon:r,...s}=e,i=r,d=(0,n.default)(s,!0);return(0,c.default)(i)&&(a&&(i=a(i)),i=t.default.isValidElement(i)?t.default.cloneElement(i,{"aria-label":o,...i.props,...d}):t.default.createElement("span",{"aria-label":o,...d},i)),[i,d]})(g,p,r);return[!0,h,f,y]})(e,l,{closeIcon:t.default.createElement(a.default,null),...o},d.close),[e,l,o,d.close])};e.s(["pickClosable",0,d,"useClosable",0,p],84323);var g=e.i(31861),f=e.i(1975),h=e.i(94776),y=e.i(77425),C=e.i(82614);e.i(99838);var b=e.i(32556);e.i(13567);var v=e.i(43932),x=e.i(79251),$=e.i(10338),k=e.i(97638),E=e.i(4999),S=e.i(21746);let w=e=>{let{lineWidth:t,fontSizeIcon:l,calc:o}=e,a=e.fontSizeSM;return(0,S.mergeToken)(e,{tagFontSize:a,tagLineHeight:(0,b.unit)(o(e.lineHeightSM).mul(a).equal()),tagIconSize:o(l).sub(o(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},N=e=>{let t=(0,$.isBright)(new x.AggregationColor(e.colorBgSolid),"#fff")?"#000":"#fff";return{defaultBg:new v.FastColor(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText,solidTextColor:t}},R=(0,E.genStyleHooks)("Tag",e=>(e=>{let{paddingXXS:t,lineWidth:l,tagPaddingHorizontal:o,componentCls:a,calc:n}=e,r=n(o).sub(l).equal(),s=n(t).sub(l).equal();return{[a]:{...(0,k.resetComponent)(e),display:"inline-block",height:"auto",paddingInline:r,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",backgroundColor:e.defaultBg,border:`${(0,b.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${a}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${a}-close-icon`]:{marginInlineStart:s,fontSize:e.tagIconSize,color:e.colorIcon,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${a}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive},"&-disabled":{cursor:"not-allowed",[`&:not(${a}-checkable-checked)`]:{color:e.colorTextDisabled,"&:hover":{backgroundColor:"transparent"}},[`&${a}-checkable-checked`]:{color:e.colorTextDisabled,backgroundColor:e.colorBgContainerDisabled},"&:hover, &:active":{backgroundColor:e.colorBgContainerDisabled,color:e.colorTextDisabled},[`&:not(${a}-checkable-checked):hover`]:{color:e.colorTextDisabled}},"&-group":{display:"flex",flexWrap:"wrap",gap:e.paddingXS}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:r}},[`&${e.componentCls}-solid`]:{borderColor:"transparent",color:e.colorTextLightSolid,backgroundColor:e.colorBgSolid,[`&${a}-default`]:{color:e.solidTextColor}},[`${a}-filled`]:{borderColor:"transparent",backgroundColor:e.tagBorderlessBg},[`&${a}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",backgroundColor:e.colorBgContainerDisabled,a:{cursor:"not-allowed",pointerEvents:"none",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}},"a&":{"&:hover, &:active":{color:e.colorTextDisabled}},[`&${a}-outlined`]:{borderColor:e.colorBorderDisabled},[`&${a}-solid, &${a}-filled`]:{color:e.colorTextDisabled,[`${a}-close-icon`]:{color:e.colorTextDisabled}},[`${a}-close-icon`]:{cursor:"not-allowed",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}}}}})(w(e)),N),T=t.forwardRef((e,l)=>{let{prefixCls:a,style:n,className:r,checked:s,children:i,icon:c,onChange:d,onClick:u,disabled:m,...p}=e,{getPrefixCls:g,tag:f}=t.useContext(y.ConfigContext),h=t.useContext(C.default),b=m??h,v=g("tag",a),[x,$]=R(v),k=(0,o.clsx)(v,`${v}-checkable`,{[`${v}-checkable-checked`]:s,[`${v}-checkable-disabled`]:b},f?.className,r,x,$);return t.createElement("span",{...p,ref:l,style:{...n,...f?.style},className:k,onClick:e=>{b||(d?.(!s),u?.(e))}},c,t.createElement("span",null,i))});var M=e.i(35492),A=e.i(89118),j=e.i(31328);let D=t.default.forwardRef(function(e,l){let{id:a,prefixCls:r,rootClassName:s,className:i,style:c,classNames:d,styles:u,disabled:m,options:p,value:f,defaultValue:h,onChange:C,multiple:b,...v}=e,{getPrefixCls:x,direction:$,className:k,style:E,classNames:S,styles:w}=(0,y.useComponentConfig)("tag"),N=x("tag",r),D=`${N}-checkable-group`,P=(0,j.default)(N),[I,B]=R(N,P),[H,L]=(0,g.useMergeSemantic)([S,d],[w,u],{props:e}),z=(0,t.useMemo)(()=>(p||[]).map(e=>e&&"object"==typeof e?e:{value:e,label:e}),[p]),[F,q]=(0,A.useControlledState)(h,f),O=t.default.useRef(null);(0,t.useImperativeHandle)(l,()=>({nativeElement:O.current}));let U=(0,n.default)(v,{aria:!0,data:!0});return t.default.createElement("div",{...U,className:(0,o.clsx)(D,k,s,{[`${D}-disabled`]:m,[`${D}-rtl`]:"rtl"===$},I,B,i,H.root),style:{...E,...L.root,...c},id:a,ref:O},z.map(e=>t.default.createElement(T,{key:e.value,className:(0,o.clsx)(`${D}-item`,H.item),style:L.item,checked:b?(F||[]).includes(e.value):F===e.value,onChange:t=>((e,t)=>{let l=null;if(b){let o=F||[];l=e?[].concat((0,M.default)(o),[t.value]):o.filter(e=>e!==t.value)}else l=e?t.value:null;q(l),C?.(l)})(t,e),disabled:m},e.label)))});var P=e.i(57079),I=e.i(39931);let B=(0,E.genSubStyleComponent)(["Tag","preset"],e=>{let t;return t=w(e),(0,I.genPresetColor)(t,(e,{textColor:l,lightBorderColor:o,lightColor:a,darkColor:n})=>({[`${t.componentCls}${t.componentCls}-${e}:not(${t.componentCls}-disabled)`]:{[`&${t.componentCls}-outlined`]:{backgroundColor:a,borderColor:o,color:l},[`&${t.componentCls}-solid`]:{backgroundColor:n,borderColor:n,color:t.colorTextLightSolid},[`&${t.componentCls}-filled`]:{backgroundColor:a,color:l}}}))},N),H=(e,t,l)=>{let o="string"!=typeof l?l:l.charAt(0).toUpperCase()+l.slice(1);return{[`${e.componentCls}${e.componentCls}-${t}:not(${e.componentCls}-disabled)`]:{[`&${e.componentCls}-outlined`]:{backgroundColor:e[`color${o}Bg`],borderColor:e[`color${o}Border`],color:e[`color${l}`]},[`&${e.componentCls}-solid`]:{backgroundColor:e[`color${l}`],borderColor:e[`color${l}`]},[`&${e.componentCls}-filled`]:{backgroundColor:e[`color${o}Bg`],color:e[`color${l}`]}}}},L=(0,E.genSubStyleComponent)(["Tag","status"],e=>{let t=w(e);return[H(t,"success","Success"),H(t,"processing","Info"),H(t,"error","Error"),H(t,"warning","Warning")]},N),z=t.forwardRef((e,a)=>{let{prefixCls:n,className:r,rootClassName:s,style:i,children:c,icon:u,color:m,variant:b,onClose:x,bordered:$,disabled:k,href:E,target:S,styles:w,classNames:N,...T}=e,{getPrefixCls:M,direction:A,className:j,variant:D,style:I,classNames:H,styles:z}=(0,y.useComponentConfig)("tag"),[F,q,O,U,W]=function(e,l){let{color:o,variant:a,bordered:n}=e;return t.useMemo(()=>{let e,t=o?.endsWith("-inverse");e=a||(t?"solid":!1===n?"filled":l||"filled");let r=t?o?.replace("-inverse",""):o,s=(0,P.isPresetColor)(o),i=(0,P.isPresetStatusColor)(o),c={};if(!s&&!i&&r)if("solid"===e)c.backgroundColor=o;else{let t=new v.FastColor(r).toHsl();t.l=.95,c.backgroundColor=new v.FastColor(t).toHexString(),c.color=o,"outlined"===e&&(c.borderColor=o)}return[e,r,s,i,c]},[o,a,n,l])}(e,D),_=O||U,G=t.useContext(C.default),K=k??G,{tag:X}=t.useContext(y.ConfigContext),[V,Q]=t.useState(!0),J=(0,l.omit)(T,["closeIcon","closable"]),Y={...e,color:q,variant:F,disabled:K,href:E,target:S,icon:u},[Z,ee]=(0,g.useMergeSemantic)([H,N],[z,w],{props:Y}),et=t.useMemo(()=>{let e={...ee.root,...I,...i};return K||(e={...W,...e}),e},[ee.root,I,i,W,K]),el=M("tag",n),[eo,ea]=R(el),en=(0,o.clsx)(el,j,Z.root,`${el}-${F}`,{[`${el}-${q}`]:_,[`${el}-hidden`]:!V,[`${el}-rtl`]:"rtl"===A,[`${el}-disabled`]:K},r,s,eo,ea),er=e=>{K||(e.stopPropagation(),x?.(e),e.defaultPrevented||Q(!1))},[,es]=p(d(e),d(X),{closable:!1,closeIconRender:e=>{let l=t.createElement("span",{className:`${el}-close-icon`,onClick:er},e);return(0,f.replaceElement)(e,l,e=>({onClick:t=>{e?.onClick?.(t),er(t)},className:(0,o.clsx)(e?.className,`${el}-close-icon`)}))}}),ei="function"==typeof T.onClick||c&&"a"===c.type,ec=(0,f.cloneElement)(u,{className:(0,o.clsx)(t.isValidElement(u)?u.props?.className:"",Z.icon),style:ee.icon}),ed=ec?t.createElement(t.Fragment,null,ec,c&&t.createElement("span",{className:Z.content,style:ee.content},c)):c,eu=t.createElement(E?"a":"span",{...J,ref:a,className:en,style:et,href:K?void 0:E,target:S,onClick:K?void 0:J.onClick,...E&&K?{"aria-disabled":!0}:{}},ed,es,O&&t.createElement(B,{key:"preset",prefixCls:el}),U&&t.createElement(L,{key:"status",prefixCls:el}));return ei?t.createElement(h.default,{component:"Tag"},eu):eu});z.CheckableTag=T,z.CheckableTagGroup=D,e.s(["Tag",0,z],57737)},93857,e=>{"use strict";var t=e.i(65408),l=e.i(17900),o=e.i(33086),a=e.i(54022),n=e.i(59611),r=e.i(57737),s=e.i(26012),i=e.i(98870),c=e.i(59990);let d=[{id:"1",title:"Git 提交规范",description:"使用 Conventional Commits 格式规范 Git 提交信息",content:`# Git 提交规范

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
5. footer 用于关联 issue`,category:"版本控制",tags:["Git","提交规范","Conventional Commits"]},{id:"2",title:"React 组件规范",description:"React 组件开发最佳实践",content:`# React 组件规范

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
- 合理使用 React.memo`,category:"前端开发",tags:["React","组件","最佳实践"]},{id:"3",title:"TypeScript 编码规范",description:"TypeScript 项目开发规范",content:`# TypeScript 编码规范

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
4. 优先使用泛型而不是 any`,category:"前端开发",tags:["TypeScript","类型系统","最佳实践"]},{id:"4",title:"RESTful API 设计规范",description:"REST API 设计和命名规范",content:`# RESTful API 设计规范

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
\`\`\``,category:"后端开发",tags:["REST","API","设计规范"]},{id:"5",title:"CSS 命名规范",description:"BEM 命名方法和 CSS 组织规范",content:`# CSS 命名规范

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
5. 响应式调整`,category:"前端开发",tags:["CSS","BEM","命名规范"]},{id:"6",title:"数据库设计规范",description:"数据库表设计和索引规范",content:`# 数据库设计规范

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
- 使用乐观锁或悲观锁`,category:"数据库",tags:["数据库","索引","设计规范"]},{id:"7",title:"安全开发规范",description:"Web 应用安全最佳实践",content:`# 安全开发规范

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
- 使用安全 headers`,category:"安全",tags:["安全","XSS","SQL注入"]},{id:"8",title:"代码审查检查清单",description:"代码审查时需要检查的项目",content:`# 代码审查检查清单

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
- [ ] 异常情况测试`,category:"开发流程",tags:["Code Review","代码质量"]},{id:"9",title:"错误处理规范",description:"统一的项目错误处理方式",content:`# 错误处理规范

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
- 脱敏敏感数据`,category:"开发流程",tags:["错误处理","日志","最佳实践"]},{id:"10",title:"测试规范",description:"单元测试和集成测试最佳实践",content:`# 测试规范

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
- 使用真实环境`,category:"测试",tags:["测试","单元测试","Jest"]}];function u(){let[e,u]=(0,c.useState)(""),[m,p]=(0,c.useState)(null),[g,f]=(0,c.useState)(""),[h,y]=(0,c.useState)(!1),C=d.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.description.toLowerCase().includes(e.toLowerCase())||t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase()))),b=e=>{(0,s.default)(e),n.message.success("复制成功")},v=async e=>{let t=`${window.location.origin}/rules?rule=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let l=await i.default.toDataURL(t);f(l),p(e),y(!0)}catch{n.message.error("生成二维码失败")}};return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Rules"})}),(0,t.jsx)(o.Input,{placeholder:"搜索 Rules...",value:e,onChange:e=>u(e.target.value),className:"mb-6",size:"large"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:C.map(e=>(0,t.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>p(e),children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mb-3",children:e.tags.slice(0,3).map(e=>(0,t.jsx)(r.Tag,{color:"orange",children:e},e))}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(l.Button,{size:"small",onClick:t=>{t.stopPropagation(),b(e.content)},children:"复制"}),(0,t.jsx)(l.Button,{size:"small",onClick:t=>{t.stopPropagation(),v(e)},children:"分享"})]})]},e.id))}),(0,t.jsx)(a.Modal,{open:!!m,onCancel:()=>p(null),footer:null,width:800,title:m?.title,children:m&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("p",{className:"text-gray-600",children:m.description})}),(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsxs)("div",{className:"flex flex-wrap gap-1",children:[(0,t.jsx)(r.Tag,{color:"orange",children:m.category}),m.tags.map(e=>(0,t.jsx)(r.Tag,{children:e},e))]})}),(0,t.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto",children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:m.content})}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(l.Button,{type:"primary",onClick:()=>b(m.content),children:"复制"}),(0,t.jsx)(l.Button,{onClick:()=>v(m),children:"分享"})]})]})}),(0,t.jsx)(a.Modal,{open:h,onCancel:()=>y(!1),footer:null,title:"分享 Rule",children:g&&(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:g,alt:"QR Code",className:"mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Rule"})]})})]})}e.s(["default",()=>u],93857)}]);