(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57737,84323,e=>{"use strict";e.i(89171);var o=e.i(59990);e.i(51235);var l=e.i(23267),t=e.i(7284),r=e.i(74190),a=e.i(14828),n=e.i(59894),i=e.i(18218);let s=function(...e){let o={};return e.forEach(e=>{e&&Object.keys(e).forEach(l=>{void 0!==e[l]&&(o[l]=e[l])})}),o};var c=e.i(92233);let d=e=>{if(!e)return;let{closable:o,closeIcon:l}=e;return{closable:o,closeIcon:l}},u={},g=(e,o)=>{if(!e&&(!1===e||!1===o||null===o))return!1;if(void 0===e&&void 0===o)return null;let l={closeIcon:"boolean"!=typeof o&&null!==o?o:void 0};return e&&"object"==typeof e&&(l={...l,...e}),l},p=(e,l,t=u)=>{let[d]=(0,n.useLocale)("global",i.default.global);return o.default.useMemo(()=>((e,l,t=u,n="Close")=>{let i=g(e?.closable,e?.closeIcon),d=g(l?.closable,l?.closeIcon),p={closeIcon:o.default.createElement(r.default,null),...t},m=!1!==i&&(i?s(p,d,i):!1!==d&&(d?s(p,d):!!p.closable&&p)),C="boolean"!=typeof m&&!!m?.disabled;if(!1===m)return[!1,null,C,{}];let[b,f]=((e,l,t)=>{let{closeIconRender:r}=l,{closeIcon:n,...i}=e,s=n,d=(0,a.default)(i,!0);return(0,c.default)(s)&&(r&&(s=r(s)),s=o.default.isValidElement(s)?o.default.cloneElement(s,{"aria-label":t,...s.props,...d}):o.default.createElement("span",{"aria-label":t,...d},s)),[s,d]})(m,p,n);return[!0,b,C,f]})(e,l,{closeIcon:o.default.createElement(r.default,null),...t},d.close),[e,l,t,d.close])};e.s(["pickClosable",0,d,"useClosable",0,p],84323);var m=e.i(31861),C=e.i(1975),b=e.i(94776),f=e.i(77425),h=e.i(82614);e.i(99838);var x=e.i(32556);e.i(13567);var v=e.i(43932),y=e.i(79251),k=e.i(10338),S=e.i(97638),$=e.i(4999),T=e.i(21746);let E=e=>{let{lineWidth:o,fontSizeIcon:l,calc:t}=e,r=e.fontSizeSM;return(0,T.mergeToken)(e,{tagFontSize:r,tagLineHeight:(0,x.unit)(t(e.lineHeightSM).mul(r).equal()),tagIconSize:t(l).sub(t(o).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},N=e=>{let o=(0,k.isBright)(new y.AggregationColor(e.colorBgSolid),"#fff")?"#000":"#fff";return{defaultBg:new v.FastColor(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText,solidTextColor:o}},w=(0,$.genStyleHooks)("Tag",e=>(e=>{let{paddingXXS:o,lineWidth:l,tagPaddingHorizontal:t,componentCls:r,calc:a}=e,n=a(t).sub(l).equal(),i=a(o).sub(l).equal();return{[r]:{...(0,S.resetComponent)(e),display:"inline-block",height:"auto",paddingInline:n,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",backgroundColor:e.defaultBg,border:`${(0,x.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${r}-close-icon`]:{marginInlineStart:i,fontSize:e.tagIconSize,color:e.colorIcon,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive},"&-disabled":{cursor:"not-allowed",[`&:not(${r}-checkable-checked)`]:{color:e.colorTextDisabled,"&:hover":{backgroundColor:"transparent"}},[`&${r}-checkable-checked`]:{color:e.colorTextDisabled,backgroundColor:e.colorBgContainerDisabled},"&:hover, &:active":{backgroundColor:e.colorBgContainerDisabled,color:e.colorTextDisabled},[`&:not(${r}-checkable-checked):hover`]:{color:e.colorTextDisabled}},"&-group":{display:"flex",flexWrap:"wrap",gap:e.paddingXS}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:n}},[`&${e.componentCls}-solid`]:{borderColor:"transparent",color:e.colorTextLightSolid,backgroundColor:e.colorBgSolid,[`&${r}-default`]:{color:e.solidTextColor}},[`${r}-filled`]:{borderColor:"transparent",backgroundColor:e.tagBorderlessBg},[`&${r}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",backgroundColor:e.colorBgContainerDisabled,a:{cursor:"not-allowed",pointerEvents:"none",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}},"a&":{"&:hover, &:active":{color:e.colorTextDisabled}},[`&${r}-outlined`]:{borderColor:e.colorBorderDisabled},[`&${r}-solid, &${r}-filled`]:{color:e.colorTextDisabled,[`${r}-close-icon`]:{color:e.colorTextDisabled}},[`${r}-close-icon`]:{cursor:"not-allowed",color:e.colorTextDisabled,"&:hover":{color:e.colorTextDisabled}}}}})(E(e)),N),R=o.forwardRef((e,l)=>{let{prefixCls:r,style:a,className:n,checked:i,children:s,icon:c,onChange:d,onClick:u,disabled:g,...p}=e,{getPrefixCls:m,tag:C}=o.useContext(f.ConfigContext),b=o.useContext(h.default),x=g??b,v=m("tag",r),[y,k]=w(v),S=(0,t.clsx)(v,`${v}-checkable`,{[`${v}-checkable-checked`]:i,[`${v}-checkable-disabled`]:x},C?.className,n,y,k);return o.createElement("span",{...p,ref:l,style:{...a,...C?.style},className:S,onClick:e=>{x||(d?.(!i),u?.(e))}},c,o.createElement("span",null,s))});var j=e.i(35492),P=e.i(89118),B=e.i(31328);let I=o.default.forwardRef(function(e,l){let{id:r,prefixCls:n,rootClassName:i,className:s,style:c,classNames:d,styles:u,disabled:g,options:p,value:C,defaultValue:b,onChange:h,multiple:x,...v}=e,{getPrefixCls:y,direction:k,className:S,style:$,classNames:T,styles:E}=(0,f.useComponentConfig)("tag"),N=y("tag",n),I=`${N}-checkable-group`,D=(0,B.default)(N),[A,L]=w(N,D),[M,H]=(0,m.useMergeSemantic)([T,d],[E,u],{props:e}),z=(0,o.useMemo)(()=>(p||[]).map(e=>e&&"object"==typeof e?e:{value:e,label:e}),[p]),[_,U]=(0,P.useControlledState)(b,C),F=o.default.useRef(null);(0,o.useImperativeHandle)(l,()=>({nativeElement:F.current}));let O=(0,a.default)(v,{aria:!0,data:!0});return o.default.createElement("div",{...O,className:(0,t.clsx)(I,S,i,{[`${I}-disabled`]:g,[`${I}-rtl`]:"rtl"===k},A,L,s,M.root),style:{...$,...H.root,...c},id:r,ref:F},z.map(e=>o.default.createElement(R,{key:e.value,className:(0,t.clsx)(`${I}-item`,M.item),style:H.item,checked:x?(_||[]).includes(e.value):_===e.value,onChange:o=>((e,o)=>{let l=null;if(x){let t=_||[];l=e?[].concat((0,j.default)(t),[o.value]):t.filter(e=>e!==o.value)}else l=e?o.value:null;U(l),h?.(l)})(o,e),disabled:g},e.label)))});var D=e.i(57079),A=e.i(39931);let L=(0,$.genSubStyleComponent)(["Tag","preset"],e=>{let o;return o=E(e),(0,A.genPresetColor)(o,(e,{textColor:l,lightBorderColor:t,lightColor:r,darkColor:a})=>({[`${o.componentCls}${o.componentCls}-${e}:not(${o.componentCls}-disabled)`]:{[`&${o.componentCls}-outlined`]:{backgroundColor:r,borderColor:t,color:l},[`&${o.componentCls}-solid`]:{backgroundColor:a,borderColor:a,color:o.colorTextLightSolid},[`&${o.componentCls}-filled`]:{backgroundColor:r,color:l}}}))},N),M=(e,o,l)=>{let t="string"!=typeof l?l:l.charAt(0).toUpperCase()+l.slice(1);return{[`${e.componentCls}${e.componentCls}-${o}:not(${e.componentCls}-disabled)`]:{[`&${e.componentCls}-outlined`]:{backgroundColor:e[`color${t}Bg`],borderColor:e[`color${t}Border`],color:e[`color${l}`]},[`&${e.componentCls}-solid`]:{backgroundColor:e[`color${l}`],borderColor:e[`color${l}`]},[`&${e.componentCls}-filled`]:{backgroundColor:e[`color${t}Bg`],color:e[`color${l}`]}}}},H=(0,$.genSubStyleComponent)(["Tag","status"],e=>{let o=E(e);return[M(o,"success","Success"),M(o,"processing","Info"),M(o,"error","Error"),M(o,"warning","Warning")]},N),z=o.forwardRef((e,r)=>{let{prefixCls:a,className:n,rootClassName:i,style:s,children:c,icon:u,color:g,variant:x,onClose:y,bordered:k,disabled:S,href:$,target:T,styles:E,classNames:N,...R}=e,{getPrefixCls:j,direction:P,className:B,variant:I,style:A,classNames:M,styles:z}=(0,f.useComponentConfig)("tag"),[_,U,F,O,W]=function(e,l){let{color:t,variant:r,bordered:a}=e;return o.useMemo(()=>{let e,o=t?.endsWith("-inverse");e=r||(o?"solid":!1===a?"filled":l||"filled");let n=o?t?.replace("-inverse",""):t,i=(0,D.isPresetColor)(t),s=(0,D.isPresetStatusColor)(t),c={};if(!i&&!s&&n)if("solid"===e)c.backgroundColor=t;else{let o=new v.FastColor(n).toHsl();o.l=.95,c.backgroundColor=new v.FastColor(o).toHexString(),c.color=t,"outlined"===e&&(c.borderColor=t)}return[e,n,i,s,c]},[t,r,a,l])}(e,I),G=F||O,q=o.useContext(h.default),Q=S??q,{tag:J}=o.useContext(f.ConfigContext),[K,V]=o.useState(!0),X=(0,l.omit)(R,["closeIcon","closable"]),Y={...e,color:U,variant:_,disabled:Q,href:$,target:T,icon:u},[Z,ee]=(0,m.useMergeSemantic)([M,N],[z,E],{props:Y}),eo=o.useMemo(()=>{let e={...ee.root,...A,...s};return Q||(e={...W,...e}),e},[ee.root,A,s,W,Q]),el=j("tag",a),[et,er]=w(el),ea=(0,t.clsx)(el,B,Z.root,`${el}-${_}`,{[`${el}-${U}`]:G,[`${el}-hidden`]:!K,[`${el}-rtl`]:"rtl"===P,[`${el}-disabled`]:Q},n,i,et,er),en=e=>{Q||(e.stopPropagation(),y?.(e),e.defaultPrevented||V(!1))},[,ei]=p(d(e),d(J),{closable:!1,closeIconRender:e=>{let l=o.createElement("span",{className:`${el}-close-icon`,onClick:en},e);return(0,C.replaceElement)(e,l,e=>({onClick:o=>{e?.onClick?.(o),en(o)},className:(0,t.clsx)(e?.className,`${el}-close-icon`)}))}}),es="function"==typeof R.onClick||c&&"a"===c.type,ec=(0,C.cloneElement)(u,{className:(0,t.clsx)(o.isValidElement(u)?u.props?.className:"",Z.icon),style:ee.icon}),ed=ec?o.createElement(o.Fragment,null,ec,c&&o.createElement("span",{className:Z.content,style:ee.content},c)):c,eu=o.createElement($?"a":"span",{...X,ref:r,className:ea,style:eo,href:Q?void 0:$,target:T,onClick:Q?void 0:X.onClick,...$&&Q?{"aria-disabled":!0}:{}},ed,ei,F&&o.createElement(L,{key:"preset",prefixCls:el}),O&&o.createElement(H,{key:"status",prefixCls:el}));return es?o.createElement(b.default,{component:"Tag"},eu):eu});z.CheckableTag=R,z.CheckableTagGroup=I,e.s(["Tag",0,z],57737)},93857,e=>{"use strict";var o=e.i(65408),l=e.i(59990),t=e.i(33086),r=e.i(54022),a=e.i(17900),n=e.i(59611),i=e.i(57737),s=e.i(26012),c=e.i(98870);let d=[{id:"1",title:"Git 提交规范",description:"使用 Conventional Commits 格式规范 Git 提交信息",content:`# Git 提交规范

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
- 使用真实环境`,category:"测试",tags:["测试","单元测试","Jest"]}];function u(){let[e,u]=(0,l.useState)(""),[g,p]=(0,l.useState)(null),[m,C]=(0,l.useState)(""),[b,f]=(0,l.useState)(!1),h=d.filter(o=>o.title.toLowerCase().includes(e.toLowerCase())||o.description.toLowerCase().includes(e.toLowerCase())||o.tags.some(o=>o.toLowerCase().includes(e.toLowerCase()))),x=e=>{(0,s.default)(e),n.message.success("复制成功")},v=async e=>{let o=`${window.location.origin}/rules?rule=${encodeURIComponent(JSON.stringify({title:e.title,content:e.content}))}`;try{let l=await c.default.toDataURL(o);C(l),p(e),f(!0)}catch{n.message.error("生成二维码失败")}};return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,o.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Rules"})}),(0,o.jsx)(t.Input,{placeholder:"搜索 Rules...",value:e,onChange:e=>u(e.target.value),className:"mb-6",size:"large"}),(0,o.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:h.map(e=>(0,o.jsxs)("div",{className:"bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",onClick:()=>p(e),children:[(0,o.jsx)("h3",{className:"font-medium text-gray-900 mb-2",children:e.title}),(0,o.jsx)("p",{className:"text-sm text-gray-500 mb-3 line-clamp-2",children:e.description}),(0,o.jsx)("div",{className:"flex flex-wrap gap-1 mb-3",children:e.tags.slice(0,3).map(e=>(0,o.jsx)(i.Tag,{color:"orange",children:e},e))}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),x(e.content)},children:"复制"}),(0,o.jsx)(a.Button,{size:"small",onClick:o=>{o.stopPropagation(),v(e)},children:"分享"})]})]},e.id))}),(0,o.jsx)(r.Modal,{open:!!g,onCancel:()=>p(null),footer:null,width:800,title:g?.title,children:g&&(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsx)("p",{className:"text-gray-600",children:g.description})}),(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsxs)("div",{className:"flex flex-wrap gap-1",children:[(0,o.jsx)(i.Tag,{color:"orange",children:g.category}),g.tags.map(e=>(0,o.jsx)(i.Tag,{children:e},e))]})}),(0,o.jsx)("div",{className:"bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto",children:(0,o.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-sm",children:g.content})}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)(a.Button,{type:"primary",onClick:()=>x(g.content),children:"复制"}),(0,o.jsx)(a.Button,{onClick:()=>v(g),children:"分享"})]})]})}),(0,o.jsx)(r.Modal,{open:b,onCancel:()=>f(!1),footer:null,title:"分享 Rule",children:m&&(0,o.jsxs)("div",{className:"text-center",children:[(0,o.jsx)("img",{src:m,alt:"QR Code",className:"mx-auto mb-4"}),(0,o.jsx)("p",{className:"text-gray-500 text-sm",children:"扫描二维码查看 Rule"})]})})]})}e.s(["default",()=>u],93857)}]);