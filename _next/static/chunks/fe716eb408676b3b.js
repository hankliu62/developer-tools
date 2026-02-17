(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57737,84323,e=>{"use strict";e.i(89171);var o=e.i(59990);e.i(51235);var l=e.i(23267),t=e.i(7284),r=e.i(74190),a=e.i(14828),n=e.i(59894),i=e.i(18218);let c=function(...e){let o={};return e.forEach(e=>{e&&Object.keys(e).forEach(l=>{void 0!==e[l]&&(o[l]=e[l])})}),o};var s=e.i(92233);let d=e=>{if(!e)return;let{closable:o,closeIcon:l}=e;return{closable:o,closeIcon:l}},u={},g=(e,o)=>{if(!e&&(!1===e||!1===o||null===o))return!1;if(void 0===e&&void 0===o)return null;let l={closeIcon:"boolean"!=typeof o&&null!==o?o:void 0};return e&&"object"==typeof e&&(l={...l,...e}),l},p=(e,l,t=u)=>{let[d]=(0,n.useLocale)("global",i.default.global);return o.default.useMemo(()=>((e,l,t=u,n="Close")=>{let i=g(e?.closable,e?.closeIcon),d=g(l?.closable,l?.closeIcon),p={closeIcon:o.default.createElement(r.default,null),...t},m=!1!==i&&(i?c(p,d,i):!1!==d&&(d?c(p,d):!!p.closable&&p)),b="boolean"!=typeof m&&!!m?.disabled;if(!1===m)return[!1,null,b,{}];let[C,f]=((e,l,t)=>{let{closeIconRender:r}=l,{closeIcon:n,...i}=e,c=n,d=(0,a.default)(i,!0);return(0,s.default)(c)&&(r&&(c=r(c)),c=o.default.isValidElement(c)?o.default.cloneElement(c,{"aria-label":t,...c.props,...d}):o.default.createElement("span",{"aria-label":t,...d},c)),[c,d]})(m,p,n);return[!0,C,b,f]})(e,l,{closeIcon:o.default.createElement(r.default,null),...t},d.close),[e,l,t,d.close])};e.s(["pickClosable",0,d,"useClosable",0,p],84323);var m=e.i(31861),b=e.i(1975),C=e.i(94776),f=e.i(77425),h=e.i(82614);e.i(99838);var x=e.i(32556);e.i(13567);var v=e.i(43932),y=e.i(79251),k=e.i(10338),$=e.i(97638),S=e.i(4999),T=e.i(21746);let E=e=>{let{lineWidth:o,fontSizeIcon:l,calc:t}=e,r=e.fontSizeSM;return(0,T.mergeToken)(e,{tagFontSize:r,tagLineHeight:(0,x.unit)(t(e.lineHeightSM).mul(r).equal()),tagIconSize:t(l).sub(t(o).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},N=e=>{let o=(0,k.isBright)(new y.AggregationColor(e.colorBgSolid),"#fff")?"#000":"#fff";return{defaultBg:new v.FastColor(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText,solidTextColor:o}},j=(0,S.genStyleHooks)("Tag",e=>(e=>{let{paddingXXS:o,lineWidth:l,tagPaddingHorizontal:t,componentCls:r,calc:a}=e,n=a(t).sub(l).equal(),i=a(o).sub(l).equal();return{[r]:{...(0,$.resetComponent)(e),display:"inline-block",height:"auto",paddingInline:n,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",backgroundColor:e.defaultBg,border:`${(0,x.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${r}-close-icon`]:{marginInlineStart:i,fontSize:e.tagIconSize,color:e.colorIcon,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive},"&-disabled":{cursor:"not-allowed",[`&:not(${r}-checkable-checked)`]:{color:e.colorTextDisabled,"&:hover":{backgroundColor:"transparent"}},[`&${r}-checkable-checked`]:{color:e.colorTextDisabled,backgroundColor:e.colorBgContainerDisabled},"&:hover, &:active":{backgroundColor:e.colorBgContainerDisabled,color:e.colorTextDisabled},[`&:not(${r}-checkable-checked):hover`]:{color:e.colorTextDisabled}},"&-group":{display:"flex",flexWrap:"wrap",gap:e.paddingXS}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:n}},[`&${e.componentCls}-solid`]:{borderColor:"transparent",color:e.colorTextLightSolid,backgroundColor:e.colorBgSolid,[`&${r}-default`]:{color:e.solidTextColor}},[`${r}-filled`]:{borderColor:"transparent",backgroundColor:e.tagBorderlessBg},[`&${r}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",backgroundColor:e.colorBgContainerDisabled,a:{cursor:"not-allowed",pointerEvents:"none",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}},"a&":{"&:hover, &:active":{color:e.colorTextDisabled}},[`&${r}-outlined`]:{borderColor:e.colorBorderDisabled},[`&${r}-solid, &${r}-filled`]:{color:e.colorTextDisabled,[`${r}-close-icon`]:{color:e.colorTextDisabled}},[`${r}-close-icon`]:{cursor:"not-allowed",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}}}}})(E(e)),N),w=o.forwardRef((e,l)=>{let{prefixCls:r,style:a,className:n,checked:i,children:c,icon:s,onChange:d,onClick:u,disabled:g,...p}=e,{getPrefixCls:m,tag:b}=o.useContext(f.ConfigContext),C=o.useContext(h.default),x=g??C,v=m("tag",r),[y,k]=j(v),$=(0,t.clsx)(v,`${v}-checkable`,{[`${v}-checkable-checked`]:i,[`${v}-checkable-disabled`]:x},b?.className,n,y,k);return o.createElement("span",{...p,ref:l,style:{...a,...b?.style},className:$,onClick:e=>{x||(d?.(!i),u?.(e))}},s,o.createElement("span",null,c))});var B=e.i(35492),I=e.i(89118),D=e.i(31328);let P=o.default.forwardRef(function(e,l){let{id:r,prefixCls:n,rootClassName:i,className:c,style:s,classNames:d,styles:u,disabled:g,options:p,value:b,defaultValue:C,onChange:h,multiple:x,...v}=e,{getPrefixCls:y,direction:k,className:$,style:S,classNames:T,styles:E}=(0,f.useComponentConfig)("tag"),N=y("tag",n),P=`${N}-checkable-group`,R=(0,D.default)(N),[A,L]=j(N,R),[M,H]=(0,m.useMergeSemantic)([T,d],[E,u],{props:e}),z=(0,o.useMemo)(()=>(p||[]).map(e=>e&&"object"==typeof e?e:{value:e,label:e}),[p]),[F,q]=(0,I.useControlledState)(C,b),Q=o.default.useRef(null);(0,o.useImperativeHandle)(l,()=>({nativeElement:Q.current}));let U=(0,a.default)(v,{aria:!0,data:!0});return o.default.createElement("div",{...U,className:(0,t.clsx)(P,$,i,{[`${P}-disabled`]:g,[`${P}-rtl`]:"rtl"===k},A,L,c,M.root),style:{...S,...H.root,...s},id:r,ref:Q},z.map(e=>o.default.createElement(w,{key:e.value,className:(0,t.clsx)(`${P}-item`,M.item),style:H.item,checked:x?(F||[]).includes(e.value):F===e.value,onChange:o=>((e,o)=>{let l=null;if(x){let t=F||[];l=e?[].concat((0,B.default)(t),[o.value]):t.filter(e=>e!==o.value)}else l=e?o.value:null;q(l),h?.(l)})(o,e),disabled:g},e.label)))});var R=e.i(57079),A=e.i(39931);let L=(0,S.genSubStyleComponent)(["Tag","preset"],e=>{let o;return o=E(e),(0,A.genPresetColor)(o,(e,{textColor:l,lightBorderColor:t,lightColor:r,darkColor:a})=>({[`${o.componentCls}${o.componentCls}-${e}:not(${o.componentCls}-disabled)`]:{[`&${o.componentCls}-outlined`]:{backgroundColor:r,borderColor:t,color:l},[`&${o.componentCls}-solid`]:{backgroundColor:a,borderColor:a,color:o.colorTextLightSolid},[`&${o.componentCls}-filled`]:{backgroundColor:r,color:l}}}))},N),M=(e,o,l)=>{let t="string"!=typeof l?l:l.charAt(0).toUpperCase()+l.slice(1);return{[`${e.componentCls}${e.componentCls}-${o}:not(${e.componentCls}-disabled)`]:{[`&${e.componentCls}-outlined`]:{backgroundColor:e[`color${t}Bg`],borderColor:e[`color${t}Border`],color:e[`color${l}`]},[`&${e.componentCls}-solid`]:{backgroundColor:e[`color${l}`],borderColor:e[`color${l}`]},[`&${e.componentCls}-filled`]:{backgroundColor:e[`color${t}Bg`],color:e[`color${l}`]}}}},H=(0,S.genSubStyleComponent)(["Tag","status"],e=>{let o=E(e);return[M(o,"success","Success"),M(o,"processing","Info"),M(o,"error","Error"),M(o,"warning","Warning")]},N),z=o.forwardRef((e,r)=>{let{prefixCls:a,className:n,rootClassName:i,style:c,children:s,icon:u,color:g,variant:x,onClose:y,bordered:k,disabled:$,href:S,target:T,styles:E,classNames:N,...w}=e,{getPrefixCls:B,direction:I,className:D,variant:P,style:A,classNames:M,styles:z}=(0,f.useComponentConfig)("tag"),[F,q,Q,U,G]=function(e,l){let{color:t,variant:r,bordered:a}=e;return o.useMemo(()=>{let e,o=t?.endsWith("-inverse");e=r||(o?"solid":!1===a?"filled":l||"filled");let n=o?t?.replace("-inverse",""):t,i=(0,R.isPresetColor)(t),c=(0,R.isPresetStatusColor)(t),s={};if(!i&&!c&&n)if("solid"===e)s.backgroundColor=t;else{let o=new v.FastColor(n).toHsl();o.l=.95,s.backgroundColor=new v.FastColor(o).toHexString(),s.color=t,"outlined"===e&&(s.borderColor=t)}return[e,n,i,c,s]},[t,r,a,l])}(e,P),O=Q||U,W=o.useContext(h.default),J=$??W,{tag:K}=o.useContext(f.ConfigContext),[V,_]=o.useState(!0),X=(0,l.omit)(w,["closeIcon","closable"]),Y={...e,color:q,variant:F,disabled:J,href:S,target:T,icon:u},[Z,ee]=(0,m.useMergeSemantic)([M,N],[z,E],{props:Y}),eo=o.useMemo(()=>{let e={...ee.root,...A,...c};return J||(e={...G,...e}),e},[ee.root,A,c,G,J]),el=B("tag",a),[et,er]=j(el),ea=(0,t.clsx)(el,D,Z.root,`${el}-${F}`,{[`${el}-${q}`]:O,[`${el}-hidden`]:!V,[`${el}-rtl`]:"rtl"===I,[`${el}-disabled`]:J},n,i,et,er),en=e=>{J||(e.stopPropagation(),y?.(e),e.defaultPrevented||_(!1))},[,ei]=p(d(e),d(K),{closable:!1,closeIconRender:e=>{let l=o.createElement("span",{className:`${el}-close-icon`,onClick:en},e);return(0,b.replaceElement)(e,l,e=>({onClick:o=>{e?.onClick?.(o),en(o)},className:(0,t.clsx)(e?.className,`${el}-close-icon`)}))}}),ec="function"==typeof w.onClick||s&&"a"===s.type,es=(0,b.cloneElement)(u,{className:(0,t.clsx)(o.isValidElement(u)?u.props?.className:"",Z.icon),style:ee.icon}),ed=es?o.createElement(o.Fragment,null,es,s&&o.createElement("span",{className:Z.content,style:ee.content},s)):s,eu=o.createElement(S?"a":"span",{...X,ref:r,className:ea,style:eo,href:J?void 0:S,target:T,onClick:J?void 0:X.onClick,...S&&J?{"aria-disabled":!0}:{}},ed,ei,Q&&o.createElement(L,{key:"preset",prefixCls:el}),U&&o.createElement(H,{key:"status",prefixCls:el}));return ec?o.createElement(C.default,{component:"Tag"},eu):eu});z.CheckableTag=w,z.CheckableTagGroup=P,e.s(["Tag",0,z],57737)},60860,e=>{"use strict";var o=e.i(65408),l=e.i(59990),t=e.i(33086),r=e.i(54022),a=e.i(17900),n=e.i(59611),i=e.i(57737),c=e.i(26012),s=e.i(98870);let d=[{id:"1",title:"代码审查助手",description:"帮助你进行代码审查，提供改进建议",content:`请作为资深代码审查专家，审查以下代码并提供详细的改进建议：

\`\`\`
{{code}}
\`\`\`

请从以下方面进行审查：
1. 代码逻辑正确性
2. 性能优化
3. 安全性
4. 可读性和可维护性
5. 最佳实践

请提供具体的改进建议和优化方案。`,category:"开发",tags:["代码审查","代码质量","最佳实践"]},{id:"2",title:"技术文档生成器",description:"自动生成技术文档",content:`请为以下代码生成详细的技术文档：

\`\`\`
{{code}}
\`\`\`

请包含以下内容：
1. 功能概述
2. API 说明
3. 参数说明
4. 返回值说明
5. 使用示例
6. 注意事项`,category:"文档",tags:["文档","API","技术文档"]},{id:"3",title:"单元测试生成器",description:"为代码生成单元测试",content:`请为以下代码生成单元测试：

\`\`\`
{{code}}
\`\`\`

请使用 Jest 框架，生成完整的测试用例，包括：
1. 正常输入测试
2. 边界条件测试
3. 异常情况测试
4. 覆盖率要求 80% 以上`,category:"测试",tags:["测试","单元测试","Jest"]},{id:"4",title:"SQL 查询优化器",description:"优化 SQL 查询语句",content:`请分析并优化以下 SQL 查询：

\`\`\`
{{sql}}
\`\`\`

请提供：
1. 性能分析
2. 优化建议
3. 优化后的 SQL
4. 索引建议`,category:"数据库",tags:["SQL","优化","数据库"]},{id:"5",title:"API 设计助手",description:"帮助设计 RESTful API",content:`请为以下功能设计 RESTful API：

功能描述：{{description}}

请提供：
1. API 端点设计
2. HTTP 方法选择
3. 请求参数定义
4. 响应格式定义
5. 错误处理方案`,category:"设计",tags:["API","RESTful","设计"]},{id:"6",title:"正则表达式生成器",description:"根据描述生成正则表达式",content:`请根据以下描述生成正则表达式：

描述：{{description}}

请提供：
1. 完整的正则表达式
2. 解释每个部分的含义
3. 使用示例
4. 注意事项`,category:"工具",tags:["正则","Regex","工具"]},{id:"7",title:"README 生成器",description:"生成项目 README 文档",content:`请为以下项目生成 README 文档：

项目名称：{{name}}
项目描述：{{description}}
技术栈：{{tech_stack}}

请包含：
1. 项目介绍
2. 功能特性
3. 技术栈
4. 快速开始
5. 使用说明
6. API 文档（如适用）
7. 贡献指南
8. 许可证`,category:"文档",tags:["README","文档","项目"]},{id:"8",title:"错误消息优化器",description:"优化错误提示消息",content:`请优化以下错误消息，使其更友好、更具可操作性：

原始消息：{{error_message}}

请提供：
1. 用户友好的错误消息
2. 可能的解决方案
3. 相关文档链接（如适用）`,category:"用户体验",tags:["错误处理","用户体验","UI"]},{id:"9",title:"Git 提交信息生成器",description:"生成规范的 Git 提交信息",content:`请根据以下更改生成 Git 提交信息：

更改内容：
{{changes}}

请使用 Conventional Commits 格式：
<type>(<scope>): <description>

[optional body]

[optional footer]`,category:"开发",tags:["Git","提交规范","版本控制"]},{id:"10",title:"数据模型设计器",description:"帮助设计数据库表结构",content:`请为以下功能设计数据库表结构：

功能需求：{{requirements}}

请提供：
1. 表结构设计
2. 字段说明
3. 索引设计
4. ER 图（文本形式）
5. 注意事项`,category:"数据库",tags:["数据库","ER图","设计"]}];function u(){let[e,u]=(0,l.useState)(""),[g,p]=(0,l.useState)(null),[m,b]=(0,l.useState)(""),[C,f]=(0,l.useState)(!1),h=d.filter(o=>o.title.toLowerCase().includes(e.toLowerCase())||o.description.toLowerCase().includes(e.toLowerCase())||o.tags.some(o=>o.toLowerCase().includes(e.toLowerCase()))),x=e=>{(0,c.default)(e),n.message.success("复制成功")},v=async e=>{let o=`${window.location.origin}/prompts?prompt=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let l=await s.default.toDataURL(o);b(l),p(e),f(!0)}catch{n.message.error("生成二维码失败")}};return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,o.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"提示词"})}),(0,o.jsx)(t.Input,{placeholder:"搜索提示词...",value:e,onChange:e=>u(e.target.value),className:"mb-6",size:"large"}),(0,o.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:h.map(e=>(0,o.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>p(e),children:[(0,o.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.title}),(0,o.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,o.jsx)("div",{className:"flex flex-wrap gap-1 mb-3",children:e.tags.slice(0,3).map(e=>(0,o.jsx)(i.Tag,{color:"blue",children:e},e))}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),x(e.content)},children:"复制"}),(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),v(e)},children:"分享"})]})]},e.id))}),(0,o.jsx)(r.Modal,{open:!!g,onCancel:()=>p(null),footer:null,width:800,title:g?.title,children:g&&(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsx)("p",{className:"text-gray-600",children:g.description})}),(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsx)("div",{className:"flex flex-wrap gap-1",children:g.tags.map(e=>(0,o.jsx)(i.Tag,{color:"blue",children:e},e))})}),(0,o.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4",children:(0,o.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:g.content})}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{type:"primary",onClick:()=>x(g.content),children:"复制"}),(0,o.jsx)(a.Button,{onClick:()=>v(g),children:"分享"})]})]})}),(0,o.jsx)(r.Modal,{open:C,onCancel:()=>f(!1),footer:null,title:"分享提示词",children:m&&(0,o.jsxs)("div",{className:"text-center",children:[(0,o.jsx)("img",{src:m,alt:"QR Code",className:"mx-auto mb-4"}),(0,o.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看提示词"})]})})]})}e.s(["default",()=>u],60860)}]);