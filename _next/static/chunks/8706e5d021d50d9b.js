(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,459611,e=>{"use strict";var t=e.i(987306);e.s(["message",()=>t.default])},121583,(e,t,o)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],r=0;r<e.rangeCount;r++)o.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||o.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,o)=>{"use strict";var r=e.r(121583),a={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var o,s,n,i,l,c,d,p,g=!1;t||(t={}),n=t.debug||!1;try{if(l=r(),c=document.createRange(),d=document.getSelection(),(p=document.createElement("span")).textContent=e,p.ariaHidden="true",p.style.all="unset",p.style.position="fixed",p.style.top=0,p.style.clip="rect(0, 0, 0, 0)",p.style.whiteSpace="pre",p.style.webkitUserSelect="text",p.style.MozUserSelect="text",p.style.msUserSelect="text",p.style.userSelect="text",p.addEventListener("copy",function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),void 0===o.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var r=a[t.format]||a.default;window.clipboardData.setData(r,e)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,e);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))}),document.body.appendChild(p),c.selectNodeContents(p),d.addRange(c),!document.execCommand("copy"))throw Error("copy command was unsuccessful");g=!0}catch(r){n&&console.error("unable to copy using execCommand: ",r),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),g=!0}catch(r){n&&console.error("unable to copy using clipboardData: ",r),n&&console.error("falling back to prompt"),o="message"in t?t.message:"Copy to clipboard: #{key}, Enter",s=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",i=o.replace(/#{\s*key\s*}/g,s),window.prompt(i,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(c):d.removeAllRanges()),p&&document.body.removeChild(p),l()}return g}},457737,e=>{"use strict";var t=e.i(524662);e.s(["Tag",()=>t.default])},560860,e=>{"use strict";var t=e.i(665408),o=e.i(777674),r=e.i(333086),a=e.i(459611),s=e.i(457737),n=e.i(26012),i=e.i(698870),l=e.i(659990);let c=[{id:"1",title:"代码审查助手",description:"帮助你进行代码审查，提供改进建议",content:`请作为资深代码审查专家，审查以下代码并提供详细的改进建议：

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
5. 注意事项`,category:"数据库",tags:["数据库","ER图","设计"]}];function d(){let[e,d]=(0,l.useState)(""),[p,g]=(0,l.useState)(null),[u,m]=(0,l.useState)(!1),[x,y]=(0,l.useState)(""),[b,h]=(0,l.useState)(!1),f=c.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.description.toLowerCase().includes(e.toLowerCase())||t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase()))),v=e=>{(0,n.default)(e),a.message.success("复制成功")},w=async e=>{let t=`${window.location.origin}/prompts?prompt=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let o=await i.default.toDataURL(t);y(o),g(e),h(!0)}catch{a.message.error("生成二维码失败")}};return(0,t.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,t.jsxs)("div",{className:"mb-8 text-center",children:[(0,t.jsxs)("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:[(0,t.jsx)("span",{className:"inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mr-2",children:"📝"}),"提示词库"]}),(0,t.jsx)("p",{className:"text-gray-600",children:"AI 提示词库"})]}),(0,t.jsx)(r.Input,{placeholder:"搜索提示词...",value:e,onChange:e=>d(e.target.value),className:"mb-6",size:"large"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:f.map(e=>(0,t.jsxs)("div",{className:"group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",onClick:()=>{g(e),m(!0)},children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-200"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("h3",{className:"font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5 mb-3",children:e.tags.slice(0,3).map(e=>(0,t.jsx)(s.Tag,{className:"bg-gray-100 text-gray-600 border-transparent hover:bg-blue-50 hover:text-blue-600",children:e},e))}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-3 border-t border-gray-100 mt-auto",children:[(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer w-20",onClick:t=>{t.stopPropagation(),v(e.content)},children:"复制"}),(0,t.jsx)("button",{type:"button",className:"px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer w-20",onClick:t=>{t.stopPropagation(),w(e)},children:"分享"})]})]})]},e.id))}),(0,t.jsx)(o.Drawer,{title:p?.title,placement:"right",size:"large",onClose:()=>{m(!1),g(null)},open:u,children:p&&(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 mb-4",children:p.description}),(0,t.jsxs)("div",{className:"mb-4 flex flex-wrap items-center gap-2",children:[p.tags.map(e=>(0,t.jsx)(s.Tag,{color:"blue",children:e},e)),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsx)("button",{type:"button",className:"px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer",onClick:()=>v(p.content),children:"复制"}),(0,t.jsx)("button",{type:"button",className:"px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer",onClick:()=>w(p),children:"分享"})]}),(0,t.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg max-h-[70vh] overflow-y-auto",children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm text-gray-700",children:p.content})})]})}),(0,t.jsx)(o.Drawer,{title:"分享提示词",placement:"bottom",height:300,onClose:()=>h(!1),open:b,children:x&&(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:x,alt:"QR Code",className:"mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看提示词"})]})})]})}e.s(["default",()=>d],560860)}]);