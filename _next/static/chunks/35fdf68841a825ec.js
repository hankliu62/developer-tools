(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57737,84323,e=>{"use strict";e.i(89171);var o=e.i(59990);e.i(51235);var t=e.i(23267),r=e.i(7284),l=e.i(74190),a=e.i(14828),s=e.i(59894),i=e.i(18218);let n=function(...e){let o={};return e.forEach(e=>{e&&Object.keys(e).forEach(t=>{void 0!==e[t]&&(o[t]=e[t])})}),o};var c=e.i(92233);let d=e=>{if(!e)return;let{closable:o,closeIcon:t}=e;return{closable:o,closeIcon:t}},u={},p=(e,o)=>{if(!e&&(!1===e||!1===o||null===o))return!1;if(void 0===e&&void 0===o)return null;let t={closeIcon:"boolean"!=typeof o&&null!==o?o:void 0};return e&&"object"==typeof e&&(t={...t,...e}),t},m=(e,t,r=u)=>{let[d]=(0,s.useLocale)("global",i.default.global);return o.default.useMemo(()=>((e,t,r=u,s="Close")=>{let i=p(e?.closable,e?.closeIcon),d=p(t?.closable,t?.closeIcon),m={closeIcon:o.default.createElement(l.default,null),...r},g=!1!==i&&(i?n(m,d,i):!1!==d&&(d?n(m,d):!!m.closable&&m)),f="boolean"!=typeof g&&!!g?.disabled;if(!1===g)return[!1,null,f,{}];let[h,b]=((e,t,r)=>{let{closeIconRender:l}=t,{closeIcon:s,...i}=e,n=s,d=(0,a.default)(i,!0);return(0,c.default)(n)&&(l&&(n=l(n)),n=o.default.isValidElement(n)?o.default.cloneElement(n,{"aria-label":r,...n.props,...d}):o.default.createElement("span",{"aria-label":r,...d},n)),[n,d]})(g,m,s);return[!0,h,f,b]})(e,t,{closeIcon:o.default.createElement(l.default,null),...r},d.close),[e,t,r,d.close])};e.s(["pickClosable",0,d,"useClosable",0,m],84323);var g=e.i(31861),f=e.i(1975),h=e.i(94776),b=e.i(77425),C=e.i(82614);e.i(99838);var v=e.i(32556);e.i(13567);var y=e.i(43932),k=e.i(79251),x=e.i(10338),S=e.i(97638),w=e.i(4999),$=e.i(21746);let T=e=>{let{lineWidth:o,fontSizeIcon:t,calc:r}=e,l=e.fontSizeSM;return(0,$.mergeToken)(e,{tagFontSize:l,tagLineHeight:(0,v.unit)(r(e.lineHeightSM).mul(l).equal()),tagIconSize:r(t).sub(r(o).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},D=e=>{let o=(0,x.isBright)(new k.AggregationColor(e.colorBgSolid),"#fff")?"#000":"#fff";return{defaultBg:new y.FastColor(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText,solidTextColor:o}},P=(0,w.genStyleHooks)("Tag",e=>(e=>{let{paddingXXS:o,lineWidth:t,tagPaddingHorizontal:r,componentCls:l,calc:a}=e,s=a(r).sub(t).equal(),i=a(o).sub(t).equal();return{[l]:{...(0,S.resetComponent)(e),display:"inline-block",height:"auto",paddingInline:s,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",backgroundColor:e.defaultBg,border:`${(0,v.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${l}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${l}-close-icon`]:{marginInlineStart:i,fontSize:e.tagIconSize,color:e.colorIcon,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${l}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive},"&-disabled":{cursor:"not-allowed",[`&:not(${l}-checkable-checked)`]:{color:e.colorTextDisabled,"&:hover":{backgroundColor:"transparent"}},[`&${l}-checkable-checked`]:{color:e.colorTextDisabled,backgroundColor:e.colorBgContainerDisabled},"&:hover, &:active":{backgroundColor:e.colorBgContainerDisabled,color:e.colorTextDisabled},[`&:not(${l}-checkable-checked):hover`]:{color:e.colorTextDisabled}},"&-group":{display:"flex",flexWrap:"wrap",gap:e.paddingXS}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:s}},[`&${e.componentCls}-solid`]:{borderColor:"transparent",color:e.colorTextLightSolid,backgroundColor:e.colorBgSolid,[`&${l}-default`]:{color:e.solidTextColor}},[`${l}-filled`]:{borderColor:"transparent",backgroundColor:e.tagBorderlessBg},[`&${l}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",backgroundColor:e.colorBgContainerDisabled,a:{cursor:"not-allowed",pointerEvents:"none",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}},"a&":{"&:hover, &:active":{color:e.colorTextDisabled}},[`&${l}-outlined`]:{borderColor:e.colorBorderDisabled},[`&${l}-solid, &${l}-filled`]:{color:e.colorTextDisabled,[`${l}-close-icon`]:{color:e.colorTextDisabled}},[`${l}-close-icon`]:{cursor:"not-allowed",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}}}}})(T(e)),D),j=o.forwardRef((e,t)=>{let{prefixCls:l,style:a,className:s,checked:i,children:n,icon:c,onChange:d,onClick:u,disabled:p,...m}=e,{getPrefixCls:g,tag:f}=o.useContext(b.ConfigContext),h=o.useContext(C.default),v=p??h,y=g("tag",l),[k,x]=P(y),S=(0,r.clsx)(y,`${y}-checkable`,{[`${y}-checkable-checked`]:i,[`${y}-checkable-disabled`]:v},f?.className,s,k,x);return o.createElement("span",{...m,ref:t,style:{...a,...f?.style},className:S,onClick:e=>{v||(d?.(!i),u?.(e))}},c,o.createElement("span",null,n))});var N=e.i(35492),B=e.i(89118),I=e.i(31328);let R=o.default.forwardRef(function(e,t){let{id:l,prefixCls:s,rootClassName:i,className:n,style:c,classNames:d,styles:u,disabled:p,options:m,value:f,defaultValue:h,onChange:C,multiple:v,...y}=e,{getPrefixCls:k,direction:x,className:S,style:w,classNames:$,styles:T}=(0,b.useComponentConfig)("tag"),D=k("tag",s),R=`${D}-checkable-group`,E=(0,I.default)(D),[F,A]=P(D,E),[H,U]=(0,g.useMergeSemantic)([$,d],[T,u],{props:e}),z=(0,o.useMemo)(()=>(m||[]).map(e=>e&&"object"==typeof e?e:{value:e,label:e}),[m]),[L,M]=(0,B.useControlledState)(h,f),q=o.default.useRef(null);(0,o.useImperativeHandle)(t,()=>({nativeElement:q.current}));let O=(0,a.default)(y,{aria:!0,data:!0});return o.default.createElement("div",{...O,className:(0,r.clsx)(R,S,i,{[`${R}-disabled`]:p,[`${R}-rtl`]:"rtl"===x},F,A,n,H.root),style:{...w,...U.root,...c},id:l,ref:q},z.map(e=>o.default.createElement(j,{key:e.value,className:(0,r.clsx)(`${R}-item`,H.item),style:U.item,checked:v?(L||[]).includes(e.value):L===e.value,onChange:o=>((e,o)=>{let t=null;if(v){let r=L||[];t=e?[].concat((0,N.default)(r),[o.value]):r.filter(e=>e!==o.value)}else t=e?o.value:null;M(t),C?.(t)})(o,e),disabled:p},e.label)))});var E=e.i(57079),F=e.i(39931);let A=(0,w.genSubStyleComponent)(["Tag","preset"],e=>{let o;return o=T(e),(0,F.genPresetColor)(o,(e,{textColor:t,lightBorderColor:r,lightColor:l,darkColor:a})=>({[`${o.componentCls}${o.componentCls}-${e}:not(${o.componentCls}-disabled)`]:{[`&${o.componentCls}-outlined`]:{backgroundColor:l,borderColor:r,color:t},[`&${o.componentCls}-solid`]:{backgroundColor:a,borderColor:a,color:o.colorTextLightSolid},[`&${o.componentCls}-filled`]:{backgroundColor:l,color:t}}}))},D),H=(e,o,t)=>{let r="string"!=typeof t?t:t.charAt(0).toUpperCase()+t.slice(1);return{[`${e.componentCls}${e.componentCls}-${o}:not(${e.componentCls}-disabled)`]:{[`&${e.componentCls}-outlined`]:{backgroundColor:e[`color${r}Bg`],borderColor:e[`color${r}Border`],color:e[`color${t}`]},[`&${e.componentCls}-solid`]:{backgroundColor:e[`color${t}`],borderColor:e[`color${t}`]},[`&${e.componentCls}-filled`]:{backgroundColor:e[`color${r}Bg`],color:e[`color${t}`]}}}},U=(0,w.genSubStyleComponent)(["Tag","status"],e=>{let o=T(e);return[H(o,"success","Success"),H(o,"processing","Info"),H(o,"error","Error"),H(o,"warning","Warning")]},D),z=o.forwardRef((e,l)=>{let{prefixCls:a,className:s,rootClassName:i,style:n,children:c,icon:u,color:p,variant:v,onClose:k,bordered:x,disabled:S,href:w,target:$,styles:T,classNames:D,...j}=e,{getPrefixCls:N,direction:B,className:I,variant:R,style:F,classNames:H,styles:z}=(0,b.useComponentConfig)("tag"),[L,M,q,O,W]=function(e,t){let{color:r,variant:l,bordered:a}=e;return o.useMemo(()=>{let e,o=r?.endsWith("-inverse");e=l||(o?"solid":!1===a?"filled":t||"filled");let s=o?r?.replace("-inverse",""):r,i=(0,E.isPresetColor)(r),n=(0,E.isPresetStatusColor)(r),c={};if(!i&&!n&&s)if("solid"===e)c.backgroundColor=r;else{let o=new y.FastColor(s).toHsl();o.l=.95,c.backgroundColor=new y.FastColor(o).toHexString(),c.color=r,"outlined"===e&&(c.borderColor=r)}return[e,s,i,n,c]},[r,l,a,t])}(e,R),V=q||O,G=o.useContext(C.default),J=S??G,{tag:K}=o.useContext(b.ConfigContext),[X,Q]=o.useState(!0),Y=(0,t.omit)(j,["closeIcon","closable"]),Z={...e,color:M,variant:L,disabled:J,href:w,target:$,icon:u},[_,ee]=(0,g.useMergeSemantic)([H,D],[z,T],{props:Z}),eo=o.useMemo(()=>{let e={...ee.root,...F,...n};return J||(e={...W,...e}),e},[ee.root,F,n,W,J]),et=N("tag",a),[er,el]=P(et),ea=(0,r.clsx)(et,I,_.root,`${et}-${L}`,{[`${et}-${M}`]:V,[`${et}-hidden`]:!X,[`${et}-rtl`]:"rtl"===B,[`${et}-disabled`]:J},s,i,er,el),es=e=>{J||(e.stopPropagation(),k?.(e),e.defaultPrevented||Q(!1))},[,ei]=m(d(e),d(K),{closable:!1,closeIconRender:e=>{let t=o.createElement("span",{className:`${et}-close-icon`,onClick:es},e);return(0,f.replaceElement)(e,t,e=>({onClick:o=>{e?.onClick?.(o),es(o)},className:(0,r.clsx)(e?.className,`${et}-close-icon`)}))}}),en="function"==typeof j.onClick||c&&"a"===c.type,ec=(0,f.cloneElement)(u,{className:(0,r.clsx)(o.isValidElement(u)?u.props?.className:"",_.icon),style:ee.icon}),ed=ec?o.createElement(o.Fragment,null,ec,c&&o.createElement("span",{className:_.content,style:ee.content},c)):c,eu=o.createElement(w?"a":"span",{...Y,ref:l,className:ea,style:eo,href:J?void 0:w,target:$,onClick:J?void 0:Y.onClick,...w&&J?{"aria-disabled":!0}:{}},ed,ei,q&&o.createElement(A,{key:"preset",prefixCls:et}),O&&o.createElement(U,{key:"status",prefixCls:et}));return en?o.createElement(h.default,{component:"Tag"},eu):eu});z.CheckableTag=j,z.CheckableTagGroup=R,e.s(["Tag",0,z],57737)},30815,e=>{"use strict";var o=e.i(65408),t=e.i(59990),r=e.i(33086),l=e.i(54022),a=e.i(17900),s=e.i(59611),i=e.i(57737),n=e.i(26012),c=e.i(98870);let d=[{id:"1",name:"frontend-design",description:"Create distinctive, production-grade frontend interfaces with high design quality",content:`# Frontend Design Skill

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
- Don't overload servers`,category:"Automation",source:"browser-use"}];function u(){let[e,u]=(0,t.useState)(""),[p,m]=(0,t.useState)(null),[g,f]=(0,t.useState)(""),[h,b]=(0,t.useState)(!1),C=d.filter(o=>o.name.toLowerCase().includes(e.toLowerCase())||o.description.toLowerCase().includes(e.toLowerCase())),v=e=>{(0,n.default)(e),s.message.success("复制成功")},y=async e=>{let o=`${window.location.origin}/skills?skill=${encodeURIComponent(JSON.stringify({name:e.name,content:e.content}))}`;try{let t=await c.default.toDataURL(o);f(t),m(e),b(!0)}catch{s.message.error("生成二维码失败")}};return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,o.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Skills"})}),(0,o.jsx)(r.Input,{placeholder:"搜索 Skills...",value:e,onChange:e=>u(e.target.value),className:"mb-6",size:"large"}),(0,o.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:C.map(e=>(0,o.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>m(e),children:[(0,o.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.name}),(0,o.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,o.jsxs)("div",{className:"flex items-center justify-between",children:[(0,o.jsx)(i.Tag,{color:"green",children:e.category}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),v(e.content)},children:"复制"}),(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),y(e)},children:"分享"})]})]})]},e.id))}),(0,o.jsx)(l.Modal,{open:!!p,onCancel:()=>m(null),footer:null,width:800,title:p?.name,children:p&&(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsx)("p",{className:"text-gray-600",children:p.description})}),(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)(i.Tag,{color:"green",children:p.category}),(0,o.jsxs)(i.Tag,{className:"ml-2",children:["来源: ",p.source]})]}),(0,o.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto",children:(0,o.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:p.content})}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{type:"primary",onClick:()=>v(p.content),children:"复制"}),(0,o.jsx)(a.Button,{onClick:()=>y(p),children:"分享"})]})]})}),(0,o.jsx)(l.Modal,{open:h,onCancel:()=>b(!1),footer:null,title:"分享 Skill",children:g&&(0,o.jsxs)("div",{className:"text-center",children:[(0,o.jsx)("img",{src:g,alt:"QR Code",className:"mx-auto mb-4"}),(0,o.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Skill"})]})})]})}e.s(["default",()=>u],30815)}]);