(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,459611,e=>{"use strict";var t=e.i(987306);e.s(["message",()=>t.default])},17900,e=>{"use strict";var t=e.i(347435);e.s(["Button",()=>t.default])},121583,(e,t,a)=>{t.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,a=[],s=0;s<e.rangeCount;s++)a.push(e.getRangeAt(s));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||a.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},26012,(e,t,a)=>{"use strict";var s=e.r(121583),n={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(e,t){var a,l,o,r,c,i,m,d,u=!1;t||(t={}),o=t.debug||!1;try{if(c=s(),i=document.createRange(),m=document.getSelection(),(d=document.createElement("span")).textContent=e,d.ariaHidden="true",d.style.all="unset",d.style.position="fixed",d.style.top=0,d.style.clip="rect(0, 0, 0, 0)",d.style.whiteSpace="pre",d.style.webkitUserSelect="text",d.style.MozUserSelect="text",d.style.msUserSelect="text",d.style.userSelect="text",d.addEventListener("copy",function(a){if(a.stopPropagation(),t.format)if(a.preventDefault(),void 0===a.clipboardData){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var s=n[t.format]||n.default;window.clipboardData.setData(s,e)}else a.clipboardData.clearData(),a.clipboardData.setData(t.format,e);t.onCopy&&(a.preventDefault(),t.onCopy(a.clipboardData))}),document.body.appendChild(d),i.selectNodeContents(d),m.addRange(i),!document.execCommand("copy"))throw Error("copy command was unsuccessful");u=!0}catch(s){o&&console.error("unable to copy using execCommand: ",s),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(s){o&&console.error("unable to copy using clipboardData: ",s),o&&console.error("falling back to prompt"),a="message"in t?t.message:"Copy to clipboard: #{key}, Enter",l=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",r=a.replace(/#{\s*key\s*}/g,l),window.prompt(r,e)}}finally{m&&("function"==typeof m.removeRange?m.removeRange(i):m.removeAllRanges()),d&&document.body.removeChild(d),c()}return u}},893997,e=>{"use strict";var t=e.i(802734);e.s(["Select",()=>t.default])},100872,e=>{"use strict";var t=e.i(725391);e.s(["Switch",()=>t.default])},989259,e=>{"use strict";var t=e.i(665408),a=e.i(17900),s=e.i(333086),n=e.i(459611),l=e.i(893997),o=e.i(100872),r=e.i(26012),c=e.i(659990);let{TextArea:i}=s.Input;function m(){let[e,m]=(0,c.useState)(""),[d,u]=(0,c.useState)("javascript"),[p,h]=(0,c.useState)("benchmarkscript"),[b,x]=(0,c.useState)(1e4),[g,f]=(0,c.useState)(!0),[y,v]=(0,c.useState)(!1),[j,$]=(0,c.useState)([{name:"test1",code:""},{name:"test2",code:""}]),w=(0,c.useCallback)(()=>{let e="";"javascript"===d?"benchmarkscript"===p?(e=`const { Benchmark } = require('benchmark');
const suite = new Benchmark.Suite();

`,j.forEach((t,a)=>{t.code.trim()&&(e+=`suite.add('${t.name||`test${a+1}`}', function() {
${t.code}
});
`)}),e+=`
suite.on('complete', function() {
  console.log('Results:');
  this.forEach(benchmark => {
    console.log(\`  \${benchmark.name}: \${benchmark.stats.mean * 1000}ms (\xb1\${benchmark.stats.rme.toFixed(2)}%)\`);
  });
});

${g?`suite.on('start', function() {
  console.log('Warming up...');
});`:""}

${y?"suite.run({ async: true });":"suite.run();"}
`):"console"===p&&(e=`function measure(fn, iterations = ${b}) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return end - start;
}

`,j.forEach((t,a)=>{t.code.trim()&&(e+=`// Test ${a+1}: ${t.name||`test${a+1}`}
function test${a+1}() {
${t.code}
}
const time${a+1} = measure(test${a+1});
console.log('${t.name||`test${a+1}`}:', time${a+1}.toFixed(2), 'ms');

`)})):"python"===d?"pytest"===p?(e=`import pytest
import time

`,j.forEach((t,a)=>{if(t.code.trim()){let s=t.name?.replace(/[^a-zA-Z0-9_]/g,"_")||`test_${a+1}`;e+=`def ${s}():
${t.code.split("\n").map(e=>`    ${e}`).join("\n")}

`}}),e+=`
if __name__ == '__main__':
    pytest.main([__file__, '-v'])
`):"timeit"===p&&(e=`import timeit

`,j.forEach((t,a)=>{t.code.trim()&&(e+=`# Test ${a+1}: ${t.name||`test${a+1}`}
setup${a+1} = """
${t.code.split("\n").map(e=>`    ${e}`).join("\n")}
"""
code${a+1} = """
${t.code.split("\n").map(e=>`    ${e}`).join("\n")}
"""
t${a+1} = timeit.timeit(code${a+1}, setup${a+1}, number=${b})
print('${t.name||`test${a+1}`}:', t${a+1}, 'seconds')

`)})):"go"===d&&(e=`package main

import (
	"testing"
	"time"
)

`,j.forEach((t,a)=>{if(t.code.trim()){let s=t.name?.replace(/[^a-zA-Z0-9_]/g,"_")||`test_${a+1}`;e+=`func Benchmark${s.charAt(0).toUpperCase()+s.slice(1)}(b *testing.B) {
${t.code.split("\n").map(e=>`	${e}`).join("\n")}
}

`}}),e+=`
// Run with: go test -bench=${j[0]?.name||"."} -benchmem`),m(e)},[d,p,j,b,g,y]),k=(e,t,a)=>{let s=[...j];s[e]={...s[e],[t]:a},$(s)};return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,t.jsxs)("div",{className:"mb-8 text-center",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"⚡ 性能基准测试构建"}),(0,t.jsx)("p",{className:"text-gray-600",children:"生成代码进行性能测试"})]}),(0,t.jsxs)("div",{className:"bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4",children:[(0,t.jsx)("span",{className:"font-semibold text-gray-800 block mb-4",children:"⚙️ 测试配置"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm text-gray-600 block mb-2",children:"语言"}),(0,t.jsx)(l.Select,{value:d,onChange:u,style:{width:"100%"},options:[{value:"javascript",label:"JavaScript"},{value:"python",label:"Python"},{value:"go",label:"Go"}]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm text-gray-600 block mb-2",children:"框架"}),(0,t.jsx)(l.Select,{value:p,onChange:h,style:{width:"100%"},options:"javascript"===d?[{value:"benchmarkscript",label:"Benchmark.js"},{value:"console",label:"Console Time"}]:"python"===d?[{value:"pytest",label:"pytest-benchmark"},{value:"timeit",label:"timeit"}]:[{value:"testing",label:"testing.B"}]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm text-gray-600 block mb-2",children:"迭代次数"}),(0,t.jsx)(l.Select,{value:b,onChange:x,style:{width:"100%"},options:[{value:1e3,label:"1,000"},{value:5e3,label:"5,000"},{value:1e4,label:"10,000"},{value:5e4,label:"50,000"},{value:1e5,label:"100,000"}]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm text-gray-600 block mb-2",children:"异步模式"}),(0,t.jsx)(o.Switch,{checked:y,onChange:v,disabled:"javascript"!==d})]})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("span",{className:"font-semibold text-gray-800",children:"📝 测试用例"}),(0,t.jsx)(a.Button,{size:"small",onClick:()=>{$([...j,{name:`test${j.length+1}`,code:""}])},children:"+ 添加测试"})]}),(0,t.jsx)("div",{className:"space-y-4",children:j.map((e,n)=>(0,t.jsxs)("div",{className:"border border-gray-200 rounded-lg p-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)(s.Input,{value:e.name,onChange:e=>k(n,"name",e.target.value),placeholder:"测试名称",style:{width:150},size:"small"}),j.length>1&&(0,t.jsx)(a.Button,{size:"small",danger:!0,onClick:()=>{j.length>1&&$(j.filter((e,t)=>t!==n))},children:"删除"})]}),(0,t.jsx)(i,{value:e.code,onChange:e=>k(n,"code",e.target.value),placeholder:"// 输入要测试的代码...",className:"font-mono text-sm",rows:3})]},n))})]}),(0,t.jsx)(a.Button,{type:"primary",size:"large",block:!0,onClick:w,className:"h-12 text-base font-medium mb-4",children:"🚀 生成基准测试代码"}),e&&(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("span",{className:"font-semibold text-gray-800",children:"📋 生成代码"}),(0,t.jsx)(a.Button,{onClick:()=>{e&&((0,r.default)(e),n.message.success("复制成功"))},children:"📋 复制"})]}),(0,t.jsx)("pre",{className:"bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap",children:e})]}),(0,t.jsxs)("div",{className:"bg-blue-50 rounded-xl p-5",children:[(0,t.jsx)("h3",{className:"font-semibold text-blue-900 mb-3",children:"💡 使用提示"}),(0,t.jsxs)("ul",{className:"text-sm text-blue-800 space-y-2",children:[(0,t.jsx)("li",{children:"• 支持 JavaScript、Python、Go 三种语言的基准测试生成"}),(0,t.jsx)("li",{children:"• 可添加多个测试用例进行对比测试"}),(0,t.jsx)("li",{children:"• Benchmark.js 需要先安装：npm install benchmark"}),(0,t.jsx)("li",{children:"• Python timeit 模块适合简单测试，pytest-benchmark 适合复杂场景"}),(0,t.jsx)("li",{children:"• Go 使用内置 testing.B，运行命令：go test -bench=. -benchmem"})]})]})]})}e.s(["default",()=>m])}]);