(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53359,29870,70276,e=>{"use strict";e.i(89171);var t=e.i(59990);let a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};var n=e.i(24144);function s(){return(s=Object.assign.bind()).apply(this,arguments)}let o=t.forwardRef((e,o)=>t.createElement(n.default,s({},e,{ref:o,icon:a})));e.s(["default",0,o],53359);let l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};function r(){return(r=Object.assign.bind()).apply(this,arguments)}let i=t.forwardRef((e,a)=>t.createElement(n.default,r({},e,{ref:a,icon:l})));e.s(["default",0,i],29870);let c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};function u(){return(u=Object.assign.bind()).apply(this,arguments)}let d=t.forwardRef((e,a)=>t.createElement(n.default,u({},e,{ref:a,icon:c})));e.s(["default",0,d],70276)},17900,96385,e=>{"use strict";let t=e.i(38727).default;e.s(["Button",0,t],17900);let a=e.i(59990).default.createContext({});e.s(["AppConfigContext",0,a],96385)},59611,e=>{"use strict";e.i(89171);var t=e.i(35492),a=e.i(59990),n=e.i(45605),s=e.i(96385),o=e.i(59782),l=e.i(77425),r=e.i(53359),i=e.i(557),c=e.i(29870),u=e.i(70276),d=e.i(33421),m=e.i(45512),f=e.i(7284);e.i(98178);var p=e.i(85238),p=p,g=e.i(47371),y=e.i(14828);function h(){return(h=Object.assign.bind()).apply(this,arguments)}let v=a.forwardRef((e,t)=>{let{prefixCls:n,style:s,className:o,duration:l=4.5,showProgress:r,pauseOnHover:i=!0,eventKey:c,content:u,closable:d,props:m,onClick:p,onNoticeClose:v,times:x,hovering:C}=e,[E,b]=a.useState(!1),[S,N]=a.useState(0),[w,k]=a.useState(0),R=C||E,$="number"==typeof l?l:0,j=$>0&&r,T=()=>{v(c)};a.useEffect(()=>{if(!R&&$>0){let e=Date.now()-w,t=setTimeout(()=>{T()},1e3*$-w);return()=>{i&&clearTimeout(t),k(Date.now()-e)}}},[$,R,x]),a.useEffect(()=>{if(!R&&j&&(i||0===w)){let e,t=performance.now(),a=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(e=>{let n=Math.min((e+w-t)/(1e3*$),1);N(100*n),n<1&&a()})};return a(),()=>{i&&cancelAnimationFrame(e)}}},[$,w,R,j,x]);let P=a.useMemo(()=>"object"==typeof d&&null!==d?d:{},[d]),A=(0,y.default)(P,!0),M=100-(!S||S<0?0:S>100?100:S),D=`${n}-notice`;return a.createElement("div",h({},m,{ref:t,className:(0,f.clsx)(D,o,{[`${D}-closable`]:d}),style:s,onMouseEnter:e=>{b(!0),m?.onMouseEnter?.(e)},onMouseLeave:e=>{b(!1),m?.onMouseLeave?.(e)},onClick:p}),a.createElement("div",{className:`${D}-content`},u),d&&a.createElement("button",h({className:`${D}-close`,onKeyDown:e=>{("Enter"===e.key||"Enter"===e.code||e.keyCode===g.default.ENTER)&&T()},"aria-label":"Close"},A,{onClick:e=>{e.preventDefault(),e.stopPropagation(),T()}}),P.closeIcon??"x"),j&&a.createElement("progress",{className:`${D}-progress`,max:"100",value:M},M+"%"))}),x=a.default.createContext({}),C=({children:e,classNames:t})=>a.default.createElement(x.Provider,{value:{classNames:t}},e);function E(){return(E=Object.assign.bind()).apply(this,arguments)}let b=e=>{let t,{configList:n,placement:s,prefixCls:o,className:l,style:r,motion:i,onAllNoticeRemoved:c,onNoticeClose:u,stack:d}=e,{classNames:m}=(0,a.useContext)(x),g=(0,a.useRef)({}),[y,h]=(0,a.useState)(null),[C,b]=(0,a.useState)([]),S=n.map(e=>({config:e,key:String(e.key)})),[N,{offset:w,threshold:k,gap:R}]=(t={offset:8,threshold:3,gap:16},d&&"object"==typeof d&&(t.offset=d.offset??8,t.threshold=d.threshold??3,t.gap=d.gap??16),[!!d,t]),$=N&&(C.length>0||S.length<=k),j="function"==typeof i?i(s):i;return(0,a.useEffect)(()=>{N&&C.length>1&&b(e=>e.filter(e=>S.some(({key:t})=>e===t)))},[C,S,N]),(0,a.useEffect)(()=>{N&&g.current[S[S.length-1]?.key]&&h(g.current[S[S.length-1]?.key])},[S,N]),a.default.createElement(p.default,E({key:s,className:(0,f.clsx)(o,`${o}-${s}`,m?.list,l,{[`${o}-stack`]:!!N,[`${o}-stack-expanded`]:$}),style:r,keys:S,motionAppear:!0},j,{onAllRemoved:()=>{c(s)}}),({config:e,className:t,style:n,index:l},r)=>{let{key:i,times:c}=e,d=String(i),{className:p,style:h,classNames:x,styles:k,...j}=e,T=S.findIndex(e=>e.key===d),P={};if(N){let e=S.length-1-(T>-1?T:l-1),t="top"===s||"bottom"===s?"-50%":"0";if(e>0){P.height=$?g.current[d]?.offsetHeight:y?.offsetHeight;let a=0;for(let t=0;t<e;t++)a+=g.current[S[S.length-1-t].key]?.offsetHeight+R;let n=($?a:e*w)*(s.startsWith("top")?1:-1),o=!$&&y?.offsetWidth&&g.current[d]?.offsetWidth?(y?.offsetWidth-2*w*(e<3?e:3))/g.current[d]?.offsetWidth:1;P.transform=`translate3d(${t}, ${n}px, 0) scaleX(${o})`}else P.transform=`translate3d(${t}, 0, 0)`}return a.default.createElement("div",{ref:r,className:(0,f.clsx)(`${o}-notice-wrapper`,t,x?.wrapper),style:{...n,...P,...k?.wrapper},onMouseEnter:()=>b(e=>e.includes(d)?e:[...e,d]),onMouseLeave:()=>b(e=>e.filter(e=>e!==d))},a.default.createElement(v,E({},j,{ref:e=>{T>-1?g.current[d]=e:delete g.current[d]},prefixCls:o,classNames:x,styles:k,className:(0,f.clsx)(p,m?.notice),style:h,times:c,key:i,eventKey:i,onNoticeClose:u,hovering:N&&C.length>0})))})},S=a.forwardRef((e,t)=>{let{prefixCls:n="rc-notification",container:s,motion:o,maxCount:l,className:r,style:i,onAllRemoved:c,stack:u,renderNotifications:d}=e,[f,p]=a.useState([]),g=e=>{let t=f.find(t=>t.key===e),a=t?.closable,{onClose:n}=a&&"object"==typeof a?a:{};n?.(),t?.onClose?.(),p(t=>t.filter(t=>t.key!==e))};a.useImperativeHandle(t,()=>({open:e=>{p(t=>{let a=[...t],n=a.findIndex(t=>t.key===e.key),s={...e};return n>=0?(s.times=(t[n]?.times||0)+1,a[n]=s):(s.times=0,a.push(s)),l>0&&a.length>l&&(a=a.slice(-l)),a})},close:e=>{g(e)},destroy:()=>{p([])}}));let[y,h]=a.useState({});a.useEffect(()=>{let e={};f.forEach(t=>{let{placement:a="topRight"}=t;a&&(e[a]=e[a]||[],e[a].push(t))}),Object.keys(y).forEach(t=>{e[t]=e[t]||[]}),h(e)},[f]);let v=e=>{h(t=>{let a={...t};return(a[e]||[]).length||delete a[e],a})},x=a.useRef(!1);if(a.useEffect(()=>{Object.keys(y).length>0?x.current=!0:x.current&&(c?.(),x.current=!1)},[y]),!s)return null;let C=Object.keys(y);return(0,m.createPortal)(a.createElement(a.Fragment,null,C.map(e=>{let t=y[e],s=a.createElement(b,{key:e,configList:t,placement:e,prefixCls:n,className:r?.(e),style:i?.(e),motion:o,onNoticeClose:g,onAllNoticeRemoved:v,stack:u});return d?d(s,{prefixCls:n,key:e}):s})),s)});e.i(51235);var N=e.i(26600);let w=()=>document.body,k=0;var R=e.i(31861),$=e.i(1975),j=e.i(31328);e.i(99838);var T=e.i(34471),P=e.i(81221),A=e.i(97638),M=e.i(4999),D=e.i(21746);let I=(0,M.genStyleHooks)("Message",e=>(e=>{let{componentCls:t,iconCls:a,boxShadow:n,colorText:s,colorSuccess:o,colorError:l,colorWarning:r,colorInfo:i,fontSizeLG:c,motionEaseInOutCirc:u,motionDurationSlow:d,marginXS:m,paddingXS:f,borderRadiusLG:p,zIndexPopup:g,contentPadding:y,contentBg:h}=e,v=`${t}-notice`,x=new T.Keyframes("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:f,transform:"translateY(0)",opacity:1}}),C=new T.Keyframes("MessageMoveOut",{"0%":{maxHeight:e.height,padding:f,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),E={padding:f,textAlign:"center",[`${t}-custom-content`]:{display:"flex",alignItems:"center"},[`${t}-custom-content > ${a}`]:{marginInlineEnd:m,fontSize:c},[`${v}-content`]:{display:"inline-block",padding:y,background:h,borderRadius:p,boxShadow:n,pointerEvents:"all"},[`${t}-success > ${a}`]:{color:o},[`${t}-error > ${a}`]:{color:l},[`${t}-warning > ${a}`]:{color:r},[`${t}-info > ${a},
      ${t}-loading > ${a}`]:{color:i}};return[{[t]:{...(0,A.resetComponent)(e),color:s,position:"fixed",top:m,width:"100%",pointerEvents:"none",zIndex:g,[`${t}-move-up`]:{animationFillMode:"forwards"},[`
        ${t}-move-up-appear,
        ${t}-move-up-enter
      `]:{animationName:x,animationDuration:d,animationPlayState:"paused",animationTimingFunction:u},[`
        ${t}-move-up-appear${t}-move-up-appear-active,
        ${t}-move-up-enter${t}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${t}-move-up-leave`]:{animationName:C,animationDuration:d,animationPlayState:"paused",animationTimingFunction:u},[`${t}-move-up-leave${t}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}}},{[t]:{[`${v}-wrapper`]:{...E}}},{[`${t}-notice-pure-panel`]:{...E,padding:0,textAlign:"start"}}]})((0,D.mergeToken)(e,{height:150})),e=>({zIndexPopup:e.zIndexPopupBase+P.CONTAINER_MAX_OFFSET+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`})),O={info:a.createElement(u.default,null),success:a.createElement(r.default,null),error:a.createElement(i.default,null),warning:a.createElement(c.default,null),loading:a.createElement(d.default,null)},L=e=>{let{prefixCls:t,type:n,icon:s,children:o,classNames:l,styles:r}=e,i=s||n&&O[n],c=(0,$.cloneElement)(i,e=>{let t={...e?.style,...r?.icon};return{className:(0,f.clsx)(e.className,l?.icon),style:t}});return a.createElement("div",{className:(0,f.clsx)(`${t}-custom-content`,`${t}-${n}`)},c,a.createElement("span",{className:l?.content,style:r?.content},o))};var z=e.i(92233),B=e.i(39266);function H(e){let t,a=new Promise(a=>{t=e(()=>{a(!0)})}),n=()=>{t?.()};return n.then=(e,t)=>a.then(e,t),n.promise=a,n}let U=({children:e,prefixCls:t})=>{let n=(0,j.default)(t),[s,o]=I(t,n);return a.createElement(C,{classNames:{list:(0,f.clsx)(s,o,n)}},e)},F=(e,{prefixCls:t,key:n})=>a.createElement(U,{prefixCls:t,key:n},e),_=a.forwardRef((e,t)=>{let{top:n,prefixCls:s,getContainer:o,maxCount:r,duration:i=3,rtl:c,transitionName:u,onAllRemoved:d,pauseOnHover:m=!0}=e,{getPrefixCls:p,direction:g,getPopupContainer:y}=(0,l.useComponentConfig)("message"),{message:h}=a.useContext(l.ConfigContext),v=s||p("message"),[x,C]=(0,R.useMergeSemantic)([e?.classNames,h?.classNames],[e?.styles,h?.styles],{props:e}),[E,b]=function(e={}){let{getContainer:t=w,motion:n,prefixCls:s,maxCount:o,className:l,style:r,onAllRemoved:i,stack:c,renderNotifications:u,...d}=e,[m,f]=a.useState(),p=a.useRef(),g=a.createElement(S,{container:m,ref:p,prefixCls:s,motion:n,maxCount:o,className:l,style:r,onAllRemoved:i,stack:c,renderNotifications:u}),[y,h]=a.useState([]),v=(0,N.useEvent)(e=>{let t=function(...e){let t={};return e.forEach(e=>{e&&Object.keys(e).forEach(a=>{let n=e[a];void 0!==n&&(t[a]=n)})}),t}(d,e);(null===t.key||void 0===t.key)&&(t.key=`rc-notification-${k}`,k+=1),h(e=>[...e,{type:"open",config:t}])}),x=a.useMemo(()=>({open:v,close:e=>{h(t=>[...t,{type:"close",key:e}])},destroy:()=>{h(e=>[...e,{type:"destroy"}])}}),[]);return a.useEffect(()=>{f(t())}),a.useEffect(()=>{if(p.current&&y.length){let e,t;y.forEach(e=>{switch(e.type){case"open":p.current.open(e.config);break;case"close":p.current.close(e.key);break;case"destroy":p.current.destroy()}}),h(a=>(e===a&&t||(e=a,t=a.filter(e=>!y.includes(e))),t))}},[y]),[x,g]}({prefixCls:v,style:()=>({left:"50%",transform:"translateX(-50%)",top:n??8}),className:()=>(0,f.clsx)({[`${v}-rtl`]:c??"rtl"===g}),motion:()=>({motionName:u??`${v}-move-up`}),closable:!1,duration:i,getContainer:()=>o?.()||y?.()||document.body,maxCount:r,onAllRemoved:d,renderNotifications:F,pauseOnHover:m});return a.useImperativeHandle(t,()=>({...E,prefixCls:v,message:h,classNames:x,styles:C})),b}),W=0;function K(e){let t=a.useRef(null);return(0,B.devUseWarning)("Message"),[a.useMemo(()=>{let n=e=>{t.current?.close(e)},s=s=>{if(!t.current){let e=()=>{};return e.then=()=>{},e}let{open:o,prefixCls:l,message:r,classNames:i,styles:c}=t.current,u=r?.className||{},d=r?.style||{},m=r?.classNames||{},p=r?.styles||{},g=`${l}-notice`,{content:y,icon:h,type:v,key:x,className:C,style:E,onClose:b,classNames:S={},styles:N={},...w}=s,k=x;(0,z.default)(k)||(W+=1,k=`antd-message-${W}`);let $={...e,...s},j=(0,R.resolveStyleOrClass)(m,{props:$}),T=(0,R.resolveStyleOrClass)(S,{props:$}),P=(0,R.resolveStyleOrClass)(p,{props:$}),A=(0,R.resolveStyleOrClass)(N,{props:$}),M=(0,R.mergeClassNames)(void 0,j,T,i),D=(0,R.mergeStyles)(P,A,c);return H(e=>(o({...w,key:k,content:a.createElement(L,{prefixCls:l,type:v,icon:h,classNames:M,styles:D},y),placement:"top",className:(0,f.clsx)({[`${g}-${v}`]:v},C,u,M.root),style:{...D.root,...d,...E},onClose:()=>{b?.(),e()}}),()=>{n(k)}))},o={open:s,destroy:e=>{void 0!==e?n(e):t.current?.destroy()}};return["info","success","warning","error","loading"].forEach(e=>{o[e]=(t,a,n)=>{let o,l,r;return o=t&&"object"==typeof t&&"content"in t?t:{content:t},"function"==typeof a?r=a:(l=a,r=n),s({onClose:r,duration:l,...o,type:e})}}),o},[]),a.createElement(_,{key:"message-holder",...e,ref:t})]}let G=null,X=[],Q={};function J(){let{getContainer:e,duration:t,rtl:a,maxCount:n,top:s}=Q,o=e?.()||document.body;return{getContainer:()=>o,duration:t,rtl:a,maxCount:n,top:s}}let V=a.default.forwardRef((e,t)=>{let{messageConfig:n,sync:o}=e,{getPrefixCls:r}=(0,a.useContext)(l.ConfigContext),i=Q.prefixCls||r("message"),c=(0,a.useContext)(s.AppConfigContext),[u,d]=K({...n,prefixCls:i,...c.message});return a.default.useImperativeHandle(t,()=>{let e={...u};return Object.keys(e).forEach(t=>{e[t]=(...e)=>(o(),u[t].apply(u,e))}),{instance:e,sync:o}}),d}),Y=a.default.forwardRef((e,t)=>{let[n,s]=a.default.useState(J),l=()=>{s(J)};a.default.useEffect(l,[]);let r=(0,o.globalConfig)(),i=r.getRootPrefixCls(),c=r.getIconPrefixCls(),u=r.getTheme(),d=a.default.createElement(V,{ref:t,sync:l,messageConfig:n});return a.default.createElement(o.default,{prefixCls:i,iconPrefixCls:c,theme:u},r.holderRender?r.holderRender(d):d)}),q=()=>{if(!G){let e=document.createDocumentFragment(),t={fragment:e};G=t,(()=>{(0,n.render)(a.default.createElement(Y,{ref:e=>{let{instance:a,sync:n}=e||{};Promise.resolve().then(()=>{!t.instance&&a&&(t.instance=a,t.sync=n,q())})}}),e)})();return}G.instance&&(X.forEach(e=>{let{type:a,skipped:n}=e;if(!n)switch(a){case"open":{let t=G.instance.open({...Q,...e.config});t?.then(e.resolve),e.setCloseFn(t)}break;case"destroy":G?.instance.destroy(e.key);break;default:{var s;let n=(s=G.instance)[a].apply(s,(0,t.default)(e.args));n?.then(e.resolve),e.setCloseFn(n)}}}),X=[])},Z={open:function(e){let t=H(t=>{let a,n={type:"open",config:e,resolve:t,setCloseFn:e=>{a=e}};return X.push(n),()=>{a?(()=>{a()})():n.skipped=!0}});return q(),t},destroy:e=>{X.push({type:"destroy",key:e}),q()},config:function(e){Q={...Q,...e},(()=>{G?.sync?.()})()},useMessage:function(e){return K(e)},_InternalPanelDoNotUseOrYouWillBeFired:e=>{let{prefixCls:t,className:n,style:s,type:o,icon:r,content:i,classNames:c,styles:u,...d}=e,{getPrefixCls:m,className:p,style:g,classNames:y,styles:h}=(0,l.useComponentConfig)("message"),x=t||m("message"),C=(0,j.default)(x),[E,b]=I(x,C),[S,N]=(0,R.useMergeSemantic)([y,c],[h,u],{props:e});return a.createElement(v,{...d,prefixCls:x,className:(0,f.clsx)(p,S.root,n,E,`${x}-notice-pure-panel`,b,C),style:{...N.root,...g,...s},eventKey:"pure",duration:null,content:a.createElement(L,{prefixCls:x,type:o,icon:r,classNames:S,styles:N},i)})}};["success","info","warning","error","loading"].forEach(e=>{Z[e]=(...t)=>{let a;return(0,o.globalConfig)(),a=H(a=>{let n,s={type:e,args:t,resolve:a,setCloseFn:e=>{n=e}};return X.push(s),()=>{n?(()=>{n()})():s.skipped=!0}}),q(),a}});e.s(["message",0,Z],59611)},21583,(e,t,a)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,a=[],n=0;n<e.rangeCount;n++)a.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||a.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,a)=>{"use strict";var n=e.r(21583),s={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var a,o,l,r,i,c,u,d,m=!1;t||(t={}),l=t.debug||!1;try{if(i=n(),c=document.createRange(),u=document.getSelection(),(d=document.createElement("span")).textContent=e,d.ariaHidden="true",d.style.all="unset",d.style.position="fixed",d.style.top=0,d.style.clip="rect(0, 0, 0, 0)",d.style.whiteSpace="pre",d.style.webkitUserSelect="text",d.style.MozUserSelect="text",d.style.msUserSelect="text",d.style.userSelect="text",d.addEventListener("copy",function(a){if(a.stopPropagation(),t.format)if(a.preventDefault(),void 0===a.clipboardData){l&&console.warn("unable to use e.clipboardData"),l&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var n=s[t.format]||s.default;window.clipboardData.setData(n,e)}else a.clipboardData.clearData(),a.clipboardData.setData(t.format,e);t.onCopy&&(a.preventDefault(),t.onCopy(a.clipboardData))}),document.body.appendChild(d),c.selectNodeContents(d),u.addRange(c),!document.execCommand("copy"))throw Error("copy command was unsuccessful");m=!0}catch(n){l&&console.error("unable to copy using execCommand: ",n),l&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),m=!0}catch(n){l&&console.error("unable to copy using clipboardData: ",n),l&&console.error("falling back to prompt"),a="message"in t?t.message:"Copy to clipboard: #{key}, Enter",o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",r=a.replace(/#{\s*key\s*}/g,o),window.prompt(r,e)}}finally{u&&("function"==typeof u.removeRange?u.removeRange(c):u.removeAllRanges()),d&&document.body.removeChild(d),i()}return m}},74190,e=>{"use strict";e.i(89171);var t=e.i(59990);let a={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"};var n=e.i(24144);function s(){return(s=Object.assign.bind()).apply(this,arguments)}let o=t.forwardRef((e,o)=>t.createElement(n.default,s({},e,{ref:o,icon:a})));e.s(["default",0,o],74190)},93857,e=>{"use strict";var t=e.i(65408),a=e.i(59990),n=e.i(33086),s=e.i(54022),o=e.i(17900),l=e.i(59611),r=e.i(57737),i=e.i(26012),c=e.i(98870);let u=[{id:"1",title:"Git 提交规范",description:"使用 Conventional Commits 格式规范 Git 提交信息",content:`# Git 提交规范

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
- 使用真实环境`,category:"测试",tags:["测试","单元测试","Jest"]}];function d(){let[e,d]=(0,a.useState)(""),[m,f]=(0,a.useState)(null),[p,g]=(0,a.useState)(""),[y,h]=(0,a.useState)(!1),v=u.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.description.toLowerCase().includes(e.toLowerCase())||t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase()))),x=e=>{(0,i.default)(e),l.message.success("复制成功")},C=async e=>{let t=`${window.location.origin}/rules?rule=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let a=await c.default.toDataURL(t);g(a),f(e),h(!0)}catch{l.message.error("生成二维码失败")}};return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Rules"})}),(0,t.jsx)(n.Input,{placeholder:"搜索 Rules...",value:e,onChange:e=>d(e.target.value),className:"mb-6",size:"large"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:v.map(e=>(0,t.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>f(e),children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mb-3",children:e.tags.slice(0,3).map(e=>(0,t.jsx)(r.Tag,{color:"orange",children:e},e))}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(o.Button,{size:"small",onClick:t=>{t.stopPropagation(),x(e.content)},children:"复制"}),(0,t.jsx)(o.Button,{size:"small",onClick:t=>{t.stopPropagation(),C(e)},children:"分享"})]})]},e.id))}),(0,t.jsx)(s.Modal,{open:!!m,onCancel:()=>f(null),footer:null,width:800,title:m?.title,children:m&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("p",{className:"text-gray-600",children:m.description})}),(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsxs)("div",{className:"flex flex-wrap gap-1",children:[(0,t.jsx)(r.Tag,{color:"orange",children:m.category}),m.tags.map(e=>(0,t.jsx)(r.Tag,{children:e},e))]})}),(0,t.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto",children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:m.content})}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(o.Button,{type:"primary",onClick:()=>x(m.content),children:"复制"}),(0,t.jsx)(o.Button,{onClick:()=>C(m),children:"分享"})]})]})}),(0,t.jsx)(s.Modal,{open:y,onCancel:()=>h(!1),footer:null,title:"分享 Rule",children:p&&(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:p,alt:"QR Code",className:"mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Rule"})]})})]})}e.s(["default",()=>d],93857)}]);