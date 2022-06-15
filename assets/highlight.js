/*!
  Highlight.js v11.5.0 (git: 7d33402501)
  (c) 2006-2022 undefined and other contributors
  License: BSD-3-Clause
 */
  var hljs=function(){"use strict";var e={exports:{}};function t(e){
    return e instanceof Map?e.clear=e.delete=e.set=()=>{
    throw Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=()=>{
    throw Error("set is read-only")
    }),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((n=>{var i=e[n]
    ;"object"!=typeof i||Object.isFrozen(i)||t(i)})),e}
    e.exports=t,e.exports.default=t;var n=e.exports;class i{constructor(e){
    void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}
    ignoreMatch(){this.isMatchIgnored=!0}}function r(e){
    return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")
    }function s(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t]
    ;return t.forEach((e=>{for(const t in e)n[t]=e[t]})),n}
    const o=e=>!!e.scope||e.sublanguage&&e.language;class a{constructor(e,t){
    this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){
    this.buffer+=r(e)}openNode(e){if(!o(e))return;let t=""
    ;t=e.sublanguage?"language-"+e.language:((e,{prefix:t})=>{if(e.includes(".")){
    const n=e.split(".")
    ;return[`${t}${n.shift()}`,...n.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")
    }return`${t}${e}`})(e.scope,{prefix:this.classPrefix}),this.span(t)}
    closeNode(e){o(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
    this.buffer+=`<span class="${e}">`}}const c=(e={})=>{const t={children:[]}
    ;return Object.assign(t,e),t};class l{constructor(){
    this.rootNode=c(),this.stack=[this.rootNode]}get top(){
    return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){
    this.top.children.push(e)}openNode(e){const t=c({scope:e})
    ;this.add(t),this.stack.push(t)}closeNode(){
    if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){
    for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
    walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){
    return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),
    t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){
    "string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{
    l._collapse(e)})))}}class g extends l{constructor(e){super(),this.options=e}
    addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}
    addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root
    ;n.sublanguage=!0,n.language=t,this.add(n)}toHTML(){
    return new a(this,this.options).value()}finalize(){return!0}}function d(e){
    return e?"string"==typeof e?e:e.source:null}function u(e){return f("(?=",e,")")}
    function h(e){return f("(?:",e,")*")}function p(e){return f("(?:",e,")?")}
    function f(...e){return e.map((e=>d(e))).join("")}function b(...e){const t=(e=>{
    const t=e[e.length-1]
    ;return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}
    })(e);return"("+(t.capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}
    function m(e){return RegExp(e.toString()+"|").exec("").length-1}
    const E=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
    ;function x(e,{joinWith:t}){let n=0;return e.map((e=>{n+=1;const t=n
    ;let i=d(e),r="";for(;i.length>0;){const e=E.exec(i);if(!e){r+=i;break}
    r+=i.substring(0,e.index),
    i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?r+="\\"+(Number(e[1])+t):(r+=e[0],
    "("===e[0]&&n++)}return r})).map((e=>`(${e})`)).join(t)}
    const w="[a-zA-Z]\\w*",y="[a-zA-Z_]\\w*",_="\\b\\d+(\\.\\d+)?",O="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",N={
    begin:"\\\\[\\s\\S]",relevance:0},k={scope:"string",begin:"'",end:"'",
    illegal:"\\n",contains:[N]},M={scope:"string",begin:'"',end:'"',illegal:"\\n",
    contains:[N]},S=(e,t,n={})=>{const i=s({scope:"comment",begin:e,end:t,
    contains:[]},n);i.contains.push({scope:"doctag",
    begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
    ;const r=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
    ;return i.contains.push({begin:f(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i
    },R=S("//","$"),j=S("/\\*","\\*/"),A=S("#","$");var I=Object.freeze({
    __proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:w,UNDERSCORE_IDENT_RE:y,
    NUMBER_RE:_,C_NUMBER_RE:O,BINARY_NUMBER_RE:v,
    RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG:(e={})=>{const t=/^#![ ]*\//
    ;return e.binary&&(e.begin=f(t,/.*\b/,e.binary,/\b.*/)),s({scope:"meta",begin:t,
    end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},
    BACKSLASH_ESCAPE:N,APOS_STRING_MODE:k,QUOTE_STRING_MODE:M,PHRASAL_WORDS_MODE:{
    begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    },COMMENT:S,C_LINE_COMMENT_MODE:R,C_BLOCK_COMMENT_MODE:j,HASH_COMMENT_MODE:A,
    NUMBER_MODE:{scope:"number",begin:_,relevance:0},C_NUMBER_MODE:{scope:"number",
    begin:O,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:v,relevance:0},
    REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,
    end:/\/[gimuy]*/,illegal:/\n/,contains:[N,{begin:/\[/,end:/\]/,relevance:0,
    contains:[N]}]}]},TITLE_MODE:{scope:"title",begin:w,relevance:0},
    UNDERSCORE_TITLE_MODE:{scope:"title",begin:y,relevance:0},METHOD_GUARD:{
    begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:e=>Object.assign(e,{
    "on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{
    t.data._beginMatch!==e[1]&&t.ignoreMatch()}})});function T(e,t){
    "."===e.input[e.index-1]&&t.ignoreMatch()}function L(e,t){
    void 0!==e.className&&(e.scope=e.className,delete e.className)}function B(e,t){
    t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
    e.__beforeBegin=T,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
    void 0===e.relevance&&(e.relevance=0))}function D(e,t){
    Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function H(e,t){
    if(e.match){
    if(e.begin||e.end)throw Error("begin & end are not supported with match")
    ;e.begin=e.match,delete e.match}}function P(e,t){
    void 0===e.relevance&&(e.relevance=1)}const C=(e,t)=>{if(!e.beforeMatch)return
    ;if(e.starts)throw Error("beforeMatch cannot be used with starts")
    ;const n=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]
    })),e.keywords=n.keywords,e.begin=f(n.beforeMatch,u(n.begin)),e.starts={
    relevance:0,contains:[Object.assign(n,{endsParent:!0})]
    },e.relevance=0,delete n.beforeMatch
    },$=["of","and","for","in","not","or","if","then","parent","list","value"]
    ;function U(e,t,n="keyword"){const i=Object.create(null)
    ;return"string"==typeof e?r(n,e.split(" ")):Array.isArray(e)?r(n,e):Object.keys(e).forEach((n=>{
    Object.assign(i,U(e[n],t,n))})),i;function r(e,n){
    t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((t=>{const n=t.split("|")
    ;i[n[0]]=[e,z(n[0],n[1])]}))}}function z(e,t){
    return t?Number(t):(e=>$.includes(e.toLowerCase()))(e)?0:1}const K={},W=e=>{
    console.error(e)},X=(e,...t)=>{console.log("WARN: "+e,...t)},G=(e,t)=>{
    K[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),K[`${e}/${t}`]=!0)
    },Z=Error();function F(e,t,{key:n}){let i=0;const r=e[n],s={},o={}
    ;for(let e=1;e<=t.length;e++)o[e+i]=r[e],s[e+i]=!0,i+=m(t[e-1])
    ;e[n]=o,e[n]._emit=s,e[n]._multi=!0}function V(e){(e=>{
    e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
    delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
    _wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
    }),(e=>{if(Array.isArray(e.begin)){
    if(e.skip||e.excludeBegin||e.returnBegin)throw W("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
    Z
    ;if("object"!=typeof e.beginScope||null===e.beginScope)throw W("beginScope must be object"),
    Z;F(e,e.begin,{key:"beginScope"}),e.begin=x(e.begin,{joinWith:""})}})(e),(e=>{
    if(Array.isArray(e.end)){
    if(e.skip||e.excludeEnd||e.returnEnd)throw W("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
    Z
    ;if("object"!=typeof e.endScope||null===e.endScope)throw W("endScope must be object"),
    Z;F(e,e.end,{key:"endScope"}),e.end=x(e.end,{joinWith:""})}})(e)}function q(e){
    function t(t,n){
    return RegExp(d(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(n?"g":""))
    }class n{constructor(){
    this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
    addRule(e,t){
    t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),
    this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
    ;const e=this.regexes.map((e=>e[1]));this.matcherRe=t(x(e,{joinWith:"|"
    }),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
    ;const t=this.matcherRe.exec(e);if(!t)return null
    ;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),i=this.matchIndexes[n]
    ;return t.splice(0,n),Object.assign(t,i)}}class i{constructor(){
    this.rules=[],this.multiRegexes=[],
    this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){
    if(this.multiRegexes[e])return this.multiRegexes[e];const t=new n
    ;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),
    t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){
    return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){
    this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){
    const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex
    ;let n=t.exec(e)
    ;if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{
    const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}
    return n&&(this.regexIndex+=n.position+1,
    this.regexIndex===this.count&&this.considerAll()),n}}
    if(e.compilerExtensions||(e.compilerExtensions=[]),
    e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
    ;return e.classNameAliases=s(e.classNameAliases||{}),function n(r,o){const a=r
    ;if(r.isCompiled)return a
    ;[L,H,V,C].forEach((e=>e(r,o))),e.compilerExtensions.forEach((e=>e(r,o))),
    r.__beforeBegin=null,[B,D,P].forEach((e=>e(r,o))),r.isCompiled=!0;let c=null
    ;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),
    c=r.keywords.$pattern,
    delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=U(r.keywords,e.case_insensitive)),
    a.keywordPatternRe=t(c,!0),
    o&&(r.begin||(r.begin=/\B|\b/),a.beginRe=t(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),
    r.end&&(a.endRe=t(a.end)),
    a.terminatorEnd=d(a.end)||"",r.endsWithParent&&o.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+o.terminatorEnd)),
    r.illegal&&(a.illegalRe=t(r.illegal)),
    r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((t=>s(e,{
    variants:null},t)))),e.cachedVariants?e.cachedVariants:J(e)?s(e,{
    starts:e.starts?s(e.starts):null
    }):Object.isFrozen(e)?s(e):e))("self"===e?r:e)))),r.contains.forEach((e=>{n(e,a)
    })),r.starts&&n(r.starts,o),a.matcher=(e=>{const t=new i
    ;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"
    }))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"
    }),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t})(a),a}(e)}function J(e){
    return!!e&&(e.endsWithParent||J(e.starts))}class Y extends Error{
    constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}
    const Q=r,ee=s,te=Symbol("nomatch");var ne=(e=>{
    const t=Object.create(null),r=Object.create(null),s=[];let o=!0
    ;const a="Could not find the language '{}', did you forget to load/include a language module?",c={
    disableAutodetect:!0,name:"Plain text",contains:[]};let l={
    ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
    languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
    cssSelector:"pre code",languages:null,__emitter:g};function d(e){
    return l.noHighlightRe.test(e)}function m(e,t,n){let i="",r=""
    ;"object"==typeof t?(i=e,
    n=t.ignoreIllegals,r=t.language):(G("10.7.0","highlight(lang, code, ...args) has been deprecated."),
    G("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
    r=e,i=t),void 0===n&&(n=!0);const s={code:i,language:r};k("before:highlight",s)
    ;const o=s.result?s.result:E(s.language,s.code,n)
    ;return o.code=s.code,k("after:highlight",o),o}function E(e,n,r,s){
    const c=Object.create(null);function g(){if(!N.keywords)return void M.addText(S)
    ;let e=0;N.keywordPatternRe.lastIndex=0;let t=N.keywordPatternRe.exec(S),n=""
    ;for(;t;){n+=S.substring(e,t.index)
    ;const r=y.case_insensitive?t[0].toLowerCase():t[0],s=(i=r,N.keywords[i]);if(s){
    const[e,i]=s
    ;if(M.addText(n),n="",c[r]=(c[r]||0)+1,c[r]<=7&&(R+=i),e.startsWith("_"))n+=t[0];else{
    const n=y.classNameAliases[e]||e;M.addKeyword(t[0],n)}}else n+=t[0]
    ;e=N.keywordPatternRe.lastIndex,t=N.keywordPatternRe.exec(S)}var i
    ;n+=S.substring(e),M.addText(n)}function d(){null!=N.subLanguage?(()=>{
    if(""===S)return;let e=null;if("string"==typeof N.subLanguage){
    if(!t[N.subLanguage])return void M.addText(S)
    ;e=E(N.subLanguage,S,!0,k[N.subLanguage]),k[N.subLanguage]=e._top
    }else e=x(S,N.subLanguage.length?N.subLanguage:null)
    ;N.relevance>0&&(R+=e.relevance),M.addSublanguage(e._emitter,e.language)
    })():g(),S=""}function u(e,t){let n=1;const i=t.length-1;for(;n<=i;){
    if(!e._emit[n]){n++;continue}const i=y.classNameAliases[e[n]]||e[n],r=t[n]
    ;i?M.addKeyword(r,i):(S=r,g(),S=""),n++}}function h(e,t){
    return e.scope&&"string"==typeof e.scope&&M.openNode(y.classNameAliases[e.scope]||e.scope),
    e.beginScope&&(e.beginScope._wrap?(M.addKeyword(S,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
    S=""):e.beginScope._multi&&(u(e.beginScope,t),S="")),N=Object.create(e,{parent:{
    value:N}}),N}function p(e,t,n){let r=((e,t)=>{const n=e&&e.exec(t)
    ;return n&&0===n.index})(e.endRe,n);if(r){if(e["on:end"]){const n=new i(e)
    ;e["on:end"](t,n),n.isMatchIgnored&&(r=!1)}if(r){
    for(;e.endsParent&&e.parent;)e=e.parent;return e}}
    if(e.endsWithParent)return p(e.parent,t,n)}function f(e){
    return 0===N.matcher.regexIndex?(S+=e[0],1):(I=!0,0)}function b(e){
    const t=e[0],i=n.substring(e.index),r=p(N,e,i);if(!r)return te;const s=N
    ;N.endScope&&N.endScope._wrap?(d(),
    M.addKeyword(t,N.endScope._wrap)):N.endScope&&N.endScope._multi?(d(),
    u(N.endScope,e)):s.skip?S+=t:(s.returnEnd||s.excludeEnd||(S+=t),
    d(),s.excludeEnd&&(S=t));do{
    N.scope&&M.closeNode(),N.skip||N.subLanguage||(R+=N.relevance),N=N.parent
    }while(N!==r.parent);return r.starts&&h(r.starts,e),s.returnEnd?0:t.length}
    let m={};function w(t,s){const a=s&&s[0];if(S+=t,null==a)return d(),0
    ;if("begin"===m.type&&"end"===s.type&&m.index===s.index&&""===a){
    if(S+=n.slice(s.index,s.index+1),!o){const t=Error(`0 width match regex (${e})`)
    ;throw t.languageName=e,t.badRule=m.rule,t}return 1}
    if(m=s,"begin"===s.type)return(e=>{
    const t=e[0],n=e.rule,r=new i(n),s=[n.__beforeBegin,n["on:begin"]]
    ;for(const n of s)if(n&&(n(e,r),r.isMatchIgnored))return f(t)
    ;return n.skip?S+=t:(n.excludeBegin&&(S+=t),
    d(),n.returnBegin||n.excludeBegin||(S=t)),h(n,e),n.returnBegin?0:t.length})(s)
    ;if("illegal"===s.type&&!r){
    const e=Error('Illegal lexeme "'+a+'" for mode "'+(N.scope||"<unnamed>")+'"')
    ;throw e.mode=N,e}if("end"===s.type){const e=b(s);if(e!==te)return e}
    if("illegal"===s.type&&""===a)return 1
    ;if(A>1e5&&A>3*s.index)throw Error("potential infinite loop, way more iterations than matches")
    ;return S+=a,a.length}const y=O(e)
    ;if(!y)throw W(a.replace("{}",e)),Error('Unknown language: "'+e+'"')
    ;const _=q(y);let v="",N=s||_;const k={},M=new l.__emitter(l);(()=>{const e=[]
    ;for(let t=N;t!==y;t=t.parent)t.scope&&e.unshift(t.scope)
    ;e.forEach((e=>M.openNode(e)))})();let S="",R=0,j=0,A=0,I=!1;try{
    for(N.matcher.considerAll();;){
    A++,I?I=!1:N.matcher.considerAll(),N.matcher.lastIndex=j
    ;const e=N.matcher.exec(n);if(!e)break;const t=w(n.substring(j,e.index),e)
    ;j=e.index+t}
    return w(n.substring(j)),M.closeAllNodes(),M.finalize(),v=M.toHTML(),{
    language:e,value:v,relevance:R,illegal:!1,_emitter:M,_top:N}}catch(t){
    if(t.message&&t.message.includes("Illegal"))return{language:e,value:Q(n),
    illegal:!0,relevance:0,_illegalBy:{message:t.message,index:j,
    context:n.slice(j-100,j+100),mode:t.mode,resultSoFar:v},_emitter:M};if(o)return{
    language:e,value:Q(n),illegal:!1,relevance:0,errorRaised:t,_emitter:M,_top:N}
    ;throw t}}function x(e,n){n=n||l.languages||Object.keys(t);const i=(e=>{
    const t={value:Q(e),illegal:!1,relevance:0,_top:c,_emitter:new l.__emitter(l)}
    ;return t._emitter.addText(e),t})(e),r=n.filter(O).filter(N).map((t=>E(t,e,!1)))
    ;r.unshift(i);const s=r.sort(((e,t)=>{
    if(e.relevance!==t.relevance)return t.relevance-e.relevance
    ;if(e.language&&t.language){if(O(e.language).supersetOf===t.language)return 1
    ;if(O(t.language).supersetOf===e.language)return-1}return 0})),[o,a]=s,g=o
    ;return g.secondBest=a,g}function w(e){let t=null;const n=(e=>{
    let t=e.className+" ";t+=e.parentNode?e.parentNode.className:""
    ;const n=l.languageDetectRe.exec(t);if(n){const t=O(n[1])
    ;return t||(X(a.replace("{}",n[1])),
    X("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}
    return t.split(/\s+/).find((e=>d(e)||O(e)))})(e);if(d(n))return
    ;if(k("before:highlightElement",{el:e,language:n
    }),e.children.length>0&&(l.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
    console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
    console.warn("The element with unescaped HTML:"),
    console.warn(e)),l.throwUnescapedHTML))throw new Y("One of your code blocks includes unescaped HTML.",e.innerHTML)
    ;t=e;const i=t.textContent,s=n?m(i,{language:n,ignoreIllegals:!0}):x(i)
    ;e.innerHTML=s.value,((e,t,n)=>{const i=t&&r[t]||n
    ;e.classList.add("hljs"),e.classList.add("language-"+i)
    })(e,n,s.language),e.result={language:s.language,re:s.relevance,
    relevance:s.relevance},s.secondBest&&(e.secondBest={
    language:s.secondBest.language,relevance:s.secondBest.relevance
    }),k("after:highlightElement",{el:e,result:s,text:i})}let y=!1;function _(){
    "loading"!==document.readyState?document.querySelectorAll(l.cssSelector).forEach(w):y=!0
    }function O(e){return e=(e||"").toLowerCase(),t[e]||t[r[e]]}
    function v(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{
    r[e.toLowerCase()]=t}))}function N(e){const t=O(e)
    ;return t&&!t.disableAutodetect}function k(e,t){const n=e;s.forEach((e=>{
    e[n]&&e[n](t)}))}
    "undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(()=>{
    y&&_()}),!1),Object.assign(e,{highlight:m,highlightAuto:x,highlightAll:_,
    highlightElement:w,
    highlightBlock:e=>(G("10.7.0","highlightBlock will be removed entirely in v12.0"),
    G("10.7.0","Please use highlightElement now."),w(e)),configure:e=>{l=ee(l,e)},
    initHighlighting:()=>{
    _(),G("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
    initHighlightingOnLoad:()=>{
    _(),G("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
    },registerLanguage:(n,i)=>{let r=null;try{r=i(e)}catch(e){
    if(W("Language definition for '{}' could not be registered.".replace("{}",n)),
    !o)throw e;W(e),r=c}
    r.name||(r.name=n),t[n]=r,r.rawDefinition=i.bind(null,e),r.aliases&&v(r.aliases,{
    languageName:n})},unregisterLanguage:e=>{delete t[e]
    ;for(const t of Object.keys(r))r[t]===e&&delete r[t]},
    listLanguages:()=>Object.keys(t),getLanguage:O,registerAliases:v,
    autoDetection:N,inherit:ee,addPlugin:e=>{(e=>{
    e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{
    e["before:highlightBlock"](Object.assign({block:t.el},t))
    }),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{
    e["after:highlightBlock"](Object.assign({block:t.el},t))})})(e),s.push(e)}
    }),e.debugMode=()=>{o=!1},e.safeMode=()=>{o=!0
    },e.versionString="11.5.0",e.regex={concat:f,lookahead:u,either:b,optional:p,
    anyNumberOfTimes:h};for(const e in I)"object"==typeof I[e]&&n(I[e])
    ;return Object.assign(e,I),e})({});return ne}()
    ;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);

    /*! `bash` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{const s=e.regex,t={},n={begin:/\$\{/,
end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{
className:"variable",variants:[{
begin:s.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});const a={
className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i={
begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,
end:/(\w+)/,className:"string"})]}},c={className:"string",begin:/"/,end:/"/,
contains:[e.BACKSLASH_ESCAPE,t,a]};a.contains.push(c);const o={begin:/\$\(\(/,
end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,t]
},r=e.SHEBANG({binary:"(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",relevance:10
}),l={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,
contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{
name:"Bash",aliases:["sh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,
keyword:["if","then","else","elif","fi","for","while","in","do","done","case","esac","function"],
literal:["true","false"],
built_in:["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset","alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","type","typeset","ulimit","unalias","set","shopt","autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp","chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"]
},contains:[r,e.SHEBANG(),l,o,e.HASH_COMMENT_MODE,i,{match:/(\/[a-z._-]+)+/},c,{
className:"",begin:/\\"/},{className:"string",begin:/'/,end:/'/},t]}}})()
;hljs.registerLanguage("bash",e)})();

/*! `css` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict"
;const e=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","p","q","quote","samp","section","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],i=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"],r=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"],t=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"],o=["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","content-visibility","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-synthesis","font-variant","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","inline-size","isolation","justify-content","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","pause","pause-after","pause-before","perspective","perspective-origin","pointer-events","position","quotes","resize","rest","rest-after","rest-before","right","row-gap","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","speak","speak-as","src","tab-size","table-layout","text-align","text-align-all","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-transform","text-underline-position","top","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index"].reverse()
;return n=>{const a=n.regex,l=(e=>({IMPORTANT:{scope:"meta",begin:"!important"},
BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",
begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{
className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{
scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",
contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{
scope:"number",
begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z][A-Za-z0-9_-]*/}
}))(n),s=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE];return{name:"CSS",
case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},
classNameAliases:{keyframePosition:"selector-tag"},contains:[l.BLOCK_COMMENT,{
begin:/-(webkit|moz|ms|o)-(?=[a-z])/},l.CSS_NUMBER_MODE,{
className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{
className:"selector-class",begin:"\\.[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0
},l.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{
begin:":("+r.join("|")+")"},{begin:":(:)?("+t.join("|")+")"}]},l.CSS_VARIABLE,{
className:"attribute",begin:"\\b("+o.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,
contains:[l.BLOCK_COMMENT,l.HEXCOLOR,l.IMPORTANT,l.CSS_NUMBER_MODE,...s,{
begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"
},contains:[{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]
},l.FUNCTION_DISPATCH]},{begin:a.lookahead(/@/),end:"[{;]",relevance:0,
illegal:/:/,contains:[{className:"keyword",begin:/@-?\w[\w]*(-\w+)*/},{
begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{
$pattern:/[a-z-]+/,keyword:"and or not only",attribute:i.join(" ")},contains:[{
begin:/[a-z-]+(?=:)/,className:"attribute"},...s,l.CSS_NUMBER_MODE]}]},{
className:"selector-tag",begin:"\\b("+e.join("|")+")\\b"}]}}})()
;hljs.registerLanguage("css",e)})();

/*! `xml` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{
  const a=e.regex,n=a.concat(/[\p{L}_]/u,a.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),s={
  className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},t={begin:/\s/,
  contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]
  },i=e.inherit(t,{begin:/\(/,end:/\)/}),c=e.inherit(e.APOS_STRING_MODE,{
  className:"string"}),l=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),r={
  endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",
  begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{
  className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{
  begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{
  name:"HTML, XML",
  aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],
  case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,
  end:/>/,relevance:10,contains:[t,l,c,i,{begin:/\[/,end:/\]/,contains:[{
  className:"meta",begin:/<![a-z]/,end:/>/,contains:[t,i,l,c]}]}]
  },e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,
  relevance:10},s,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,
  relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",
  begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[r],starts:{
  end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",
  begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[r],starts:{
  end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{
  className:"tag",begin:/<>|<\/>/},{className:"tag",
  begin:a.concat(/</,a.lookahead(a.concat(n,a.either(/\/>/,/>/,/\s/)))),
  end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:r}]},{
  className:"tag",begin:a.concat(/<\//,a.lookahead(a.concat(n,/>/))),contains:[{
  className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}
  })();hljs.registerLanguage("xml",e)})();

  /*! `json` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>({name:"JSON",contains:[{
  className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},{
  match:/[{}[\],:]/,className:"punctuation",relevance:0},e.QUOTE_STRING_MODE,{
  beginKeywords:"true false null"
  },e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"})
  })();hljs.registerLanguage("json",e)})();

  /*! `java` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict"
;var e="\\.([0-9](_*[0-9])*)",a="[0-9a-fA-F](_*[0-9a-fA-F])*",n={
className:"number",variants:[{
begin:`(\\b([0-9](_*[0-9])*)((${e})|\\.)?|(${e}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
},{begin:`\\b([0-9](_*[0-9])*)((${e})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{
begin:`(${e})[fFdD]?\\b`},{begin:"\\b([0-9](_*[0-9])*)[fFdD]\\b"},{
begin:`\\b0[xX]((${a})\\.?|(${a})?\\.(${a}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${a})[lL]?\\b`},{
begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],
relevance:0};function s(e,a,n){return-1===n?"":e.replace(a,(t=>s(e,a,n-1)))}
return e=>{
const a=e.regex,t="[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*",i=t+s("(?:<"+t+"~~~(?:\\s*,\\s*"+t+"~~~)*>)?",/~~~/g,2),r={
keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed"],
literal:["false","true","null"],
type:["char","boolean","long","float","int","byte","short","double"],
built_in:["super","this"]},l={className:"meta",begin:"@"+t,contains:[{
begin:/\(/,end:/\)/,contains:["self"]}]},c={className:"params",begin:/\(/,
end:/\)/,keywords:r,relevance:0,contains:[e.C_BLOCK_COMMENT_MODE],endsParent:!0}
;return{name:"Java",aliases:["jsp"],keywords:r,illegal:/<\/|#/,
contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,
relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{
begin:/import java\.[a-z]+\./,keywords:"import",relevance:2
},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,
className:"string",contains:[e.BACKSLASH_ESCAPE]
},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{
match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,t],className:{
1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{
begin:[a.concat(/(?!else)/,t),/\s+/,t,/\s+/,/=(?!=)/],className:{1:"type",
3:"variable",5:"operator"}},{begin:[/record/,/\s+/,t],className:{1:"keyword",
3:"title.class"},contains:[c,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{
beginKeywords:"new throw return else",relevance:0},{
begin:["(?:"+i+"\\s+)",e.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{
2:"title.function"},keywords:r,contains:[{className:"params",begin:/\(/,
end:/\)/,keywords:r,relevance:0,
contains:[l,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,n,e.C_BLOCK_COMMENT_MODE]
},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},n,l]}}})()
;hljs.registerLanguage("java",e)})();

/*! `javascript` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict"
;const e="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],a=["true","false","null","undefined","NaN","Infinity"],t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],r=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","module","global"],i=[].concat(r,t,s)
;return o=>{const l=o.regex,b=e,d={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{
const a=e[0].length+e.index,t=e.input[a]
;if("<"===t||","===t)return void n.ignoreMatch();let s
;">"===t&&(((e,{after:n})=>{const a="</"+e[0].slice(1)
;return-1!==e.input.indexOf(a,n)})(e,{after:a
})||n.ignoreMatch()),(s=e.input.substring(a).match(/^\s+extends\s+/))&&0===s.index&&n.ignoreMatch()
}},g={$pattern:e,keyword:n,literal:a,built_in:i,"variable.language":c
},u="\\.([0-9](_?[0-9])*)",m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",E={
className:"number",variants:[{
begin:`(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{
begin:`\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`},{
begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{
begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{
begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{
begin:"\\b0[0-7]+n?\\b"}],relevance:0},A={className:"subst",begin:"\\$\\{",
end:"\\}",keywords:g,contains:[]},y={begin:"html`",end:"",starts:{end:"`",
returnEnd:!1,contains:[o.BACKSLASH_ESCAPE,A],subLanguage:"xml"}},N={
begin:"css`",end:"",starts:{end:"`",returnEnd:!1,
contains:[o.BACKSLASH_ESCAPE,A],subLanguage:"css"}},_={className:"string",
begin:"`",end:"`",contains:[o.BACKSLASH_ESCAPE,A]},f={className:"comment",
variants:[o.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{
begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",
begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,
excludeBegin:!0,relevance:0},{className:"variable",begin:b+"(?=\\s*(-)|$)",
endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]
}),o.C_BLOCK_COMMENT_MODE,o.C_LINE_COMMENT_MODE]
},h=[o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,y,N,_,E];A.contains=h.concat({
begin:/\{/,end:/\}/,keywords:g,contains:["self"].concat(h)})
;const v=[].concat(f,A.contains),p=v.concat([{begin:/\(/,end:/\)/,keywords:g,
contains:["self"].concat(v)}]),S={className:"params",begin:/\(/,end:/\)/,
excludeBegin:!0,excludeEnd:!0,keywords:g,contains:p},w={variants:[{
match:[/class/,/\s+/,b,/\s+/,/extends/,/\s+/,l.concat(b,"(",l.concat(/\./,b),")*")],
scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{
match:[/class/,/\s+/,b],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,
match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
className:"title.class",keywords:{_:[...t,...s]}},O={variants:[{
match:[/function/,/\s+/,b,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],
className:{1:"keyword",3:"title.function"},label:"func.def",contains:[S],
illegal:/%/},k={
match:l.concat(/\b/,(I=[...r,"super"],l.concat("(?!",I.join("|"),")")),b,l.lookahead(/\(/)),
className:"title.function",relevance:0};var I;const x={
begin:l.concat(/\./,l.lookahead(l.concat(b,/(?![0-9A-Za-z$_(])/))),end:b,
excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={
match:[/get|set/,/\s+/,b,/(?=\()/],className:{1:"keyword",3:"title.function"},
contains:[{begin:/\(\)/},S]
},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+o.UNDERSCORE_IDENT_RE+")\\s*=>",M={
match:[/const|var|let/,/\s+/,b,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(C)],
keywords:"async",className:{1:"keyword",3:"title.function"},contains:[S]}
;return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:g,exports:{
PARAMS_CONTAINS:p,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,
contains:[o.SHEBANG({label:"shebang",binary:"node",relevance:5}),{
label:"use_strict",className:"meta",relevance:10,
begin:/^\s*['"]use (strict|asm)['"]/
},o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,y,N,_,f,E,R,{className:"attr",
begin:b+l.lookahead(":"),relevance:0},M,{
begin:"("+o.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
keywords:"return throw case",relevance:0,contains:[f,o.REGEXP_MODE,{
className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{
className:"params",variants:[{begin:o.UNDERSCORE_IDENT_RE,relevance:0},{
className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,
excludeEnd:!0,keywords:g,contains:p}]}]},{begin:/,/,relevance:0},{match:/\s+/,
relevance:0},{variants:[{begin:"<>",end:"</>"},{
match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:d.begin,
"on:begin":d.isTrulyOpeningTag,end:d.end}],subLanguage:"xml",contains:[{
begin:d.begin,end:d.end,skip:!0,contains:["self"]}]}]},O,{
beginKeywords:"while if switch catch for"},{
begin:"\\b(?!function)"+o.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
returnBegin:!0,label:"func.def",contains:[S,o.inherit(o.TITLE_MODE,{begin:b,
className:"title.function"})]},{match:/\.\.\./,relevance:0},x,{match:"\\$"+b,
relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},
contains:[S]},k,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,
className:"variable.constant"},w,T,{match:/\$[(.]/}]}}})()
;hljs.registerLanguage("javascript",e)})();

/*! `markdown` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{const n={begin:/<\/?[A-Za-z_]/,
end:">",subLanguage:"xml",relevance:0},a={variants:[{begin:/\[.+?\]\[.*?\]/,
relevance:0},{
begin:/\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
relevance:2},{
begin:e.regex.concat(/\[.+?\]\(/,/[A-Za-z][A-Za-z0-9+.-]*/,/:\/\/.*?\)/),
relevance:2},{begin:/\[.+?\]\([./?&#].*?\)/,relevance:1},{
begin:/\[.*?\]\(.*?\)/,relevance:0}],returnBegin:!0,contains:[{match:/\[(?=\])/
},{className:"string",relevance:0,begin:"\\[",end:"\\]",excludeBegin:!0,
returnEnd:!0},{className:"link",relevance:0,begin:"\\]\\(",end:"\\)",
excludeBegin:!0,excludeEnd:!0},{className:"symbol",relevance:0,begin:"\\]\\[",
end:"\\]",excludeBegin:!0,excludeEnd:!0}]},i={className:"strong",contains:[],
variants:[{begin:/_{2}/,end:/_{2}/},{begin:/\*{2}/,end:/\*{2}/}]},s={
className:"emphasis",contains:[],variants:[{begin:/\*(?!\*)/,end:/\*/},{
begin:/_(?!_)/,end:/_/,relevance:0}]},c=e.inherit(i,{contains:[]
}),t=e.inherit(s,{contains:[]});i.contains.push(t),s.contains.push(c)
;let g=[n,a];return[i,s,c,t].forEach((e=>{e.contains=e.contains.concat(g)
})),g=g.concat(i,s),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{
className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:g},{
begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",
contains:g}]}]},n,{className:"bullet",begin:"^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
end:"\\s+",excludeEnd:!0},i,s,{className:"quote",begin:"^>\\s+",contains:g,
end:"$"},{className:"code",variants:[{begin:"(`{3,})[^`](.|\\n)*?\\1`*[ ]*"},{
begin:"(~{3,})[^~](.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{
begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",
contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},{
begin:"^[-\\*]{3,}",end:"$"},a,{begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{
className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{
className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]}]}}})()
;hljs.registerLanguage("markdown",e)})();

/*! `plaintext` grammar compiled for Highlight.js 11.5.0 */
(()=>{var t=(()=>{"use strict";return t=>({name:"Plain text",
aliases:["text","txt"],disableAutodetect:!0})})()
;hljs.registerLanguage("plaintext",t)})();

/*! `yaml` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{
  const n="true false yes no null",a="[\\w#;/?:@&=+$,.~*'()[\\]]+",s={
  className:"string",relevance:0,variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/
  },{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,{className:"template-variable",
  variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]}]},i=e.inherit(s,{
  variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),l={
  end:",",endsWithParent:!0,excludeEnd:!0,keywords:n,relevance:0},t={begin:/\{/,
  end:/\}/,contains:[l],illegal:"\\n",relevance:0},g={begin:"\\[",end:"\\]",
  contains:[l],illegal:"\\n",relevance:0},b=[{className:"attr",variants:[{
  begin:"\\w[\\w :\\/.-]*:(?=[ \t]|$)"},{begin:'"\\w[\\w :\\/.-]*":(?=[ \t]|$)'},{
  begin:"'\\w[\\w :\\/.-]*':(?=[ \t]|$)"}]},{className:"meta",begin:"^---\\s*$",
  relevance:10},{className:"string",
  begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{
  begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,
  relevance:0},{className:"type",begin:"!\\w+!"+a},{className:"type",
  begin:"!<"+a+">"},{className:"type",begin:"!"+a},{className:"type",begin:"!!"+a
  },{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",
  begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",
  relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:n,keywords:{literal:n}},{
  className:"number",
  begin:"\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
  },{className:"number",begin:e.C_NUMBER_RE+"\\b",relevance:0},t,g,s],r=[...b]
  ;return r.pop(),r.push(i),l.contains=r,{name:"YAML",case_insensitive:!0,
  aliases:["yml"],contains:b}}})();hljs.registerLanguage("yaml",e)})();
  
/*! `apex` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{
  const s=e.regex,t="[a-zA-Z][a-zA-Z_0-9]*",a={scope:"number",variants:[{
  match:/\b[0-9]+(?:\.[0-9]+)?/},{match:/\s(?:[0-9,]+)?\.[0-9]+/}],relevance:0
  },c={
  match:s.either(/-/,/~/,/\*/,/\*=/,/\/=/,/%/,/\+/,/<</,/>>/,/>=/,/<=/,/\s<\s/,/\s>\s/,/\^/,/\^=/,/!=/,/!/,/==/,/&&/,/&/,/\|\|/,/\|/,/(?<=\s)\?|:(?=\s)/,/=/,/=>/,/\?\./),
  scope:"operator",relevance:0},n={
  match:[/\b/,s.either("ApexPages|10","AppLauncher","Approval","Auth","Cache","Canvas","ChatterAnswers|10","CommercePayments|10","ConnectApi|10","Database","Datacloud|10","DataSource|10","Dom","EventBus|10","Flow","Functions","KbManagement|10","Label","LxScheduler|10","Messaging","Metadata","Pref_center|10","Process","QuickAction","Reports","Schema","Search","Sfc|10","Sfdc_Checkout|10","sfdc_surveys|10","Site","Support","System","TerritoryMgmt|10","Test","Trigger|10","TxnSecurity|10","Type","UserProvisioning|10","VisualEditor|10","Wave|10"),/(?=\.)/],
  scope:{2:"built_in"},relevance:10
  },r=e.COMMENT("//",/[$\n]/),o=e.COMMENT("/\\*","\\*/",{relevance:0,contains:[{
  begin:/\w+@/,relevance:0},{scope:"doctag",begin:"@[A-Za-z_]+"},{begin:"`",
  end:"`",excludeBegin:!0,excludeEnd:!0,scope:"code",
  contains:[e.BACKSLASH_ESCAPE],relevance:0},e.APOS_STRING_MODE,{
  match:[/(?<=@param)/,/\s+/,/\w+/],scope:{3:"variable"}}]}),i={relevance:10,
  scope:{1:"meta"},match:["@"+t,/(?=(\(|\b|\s))/]},l=[{
  match:/\b[a-zA-Z\d]*Exception\b/,scope:"title.class",relevance:0},{
  match:[/\wthrow\s+new\s+/,t],scope:{1:"keyword",2:"title.class"},relevance:0
  }],b=[{match:[s.concat(/\b/,t,/\b/),/>/],scope:{1:"type"},relevance:10}],p=[{
  match:[/\b(list|set|map)\s*/,"<",/[\.\w]+/],scope:{1:"type",3:"type"},
  relevance:10},{match:[t,s.lookahead(/\s*\[\]/)],scope:{1:"type"}}],E={
  match:[/[^\.]/,/\b[a-zA-Z][a-zA-Z\d_]*__[cxeb]\b/,/[\(\s;,]+/],scope:{2:"type"},
  relevance:10},A={variants:[{begin:[/\./,s.concat("(?:"+t+")"),/(?=\s*\(\))/],
  scope:{2:"title.function.invoke"}},{
  begin:[/\./,s.concat("(?:"+t+")"),/(?=\s*\([^\)])/],scope:{
  2:"title.function.invoke"}},{
  begin:[/(?<=\s)/,s.concat("(?:"+t+")"),/(?=\s*\()/],scope:{2:"title.function"}
  }],contains:[r,o,e.APOS_STRING_MODE],relevance:0},u={
  begin:/\[[\s\n]*(?=SELECT)/,end:/\]/,scope:"subst",relevance:10,contains:[{
  begin:s.concat(/\b/,s.either("ABOVE_OR_BELOW","ABOVE","ACTIVE","ADVANCED","ALL",/ALL\s+FIELDS/,"AND","ANY","ARRAY","AS","ASC","BY","CATEGORY","CONTAINS","COUNT","COUNT_DISTINCT","SUM","MAX","MIN","HOUR_IN_DAY","CONVERTCURRENCY","CUBE","DATA","DESC","DIVISION","END","EXCLUDES","FIELDS","FIND","FIRST","FOR","FROM",/GROUP\s+BY/,"HAVING","INCLUDES","LAST","LAST_90_DAYS","LAST_MONTH","LAST_N_DAYS","LAST_WEEK","LAST","LIKE","LIMIT","NETWORK","NEXT_90_DAYS","NEXT_MONTH","NEXT_N_DAYS","NEXT_WEEK","NULLS","OFFSET","ON","OR",/ORDER\s+BY/,"REFERENCE","RETURNING","ROLLUP","ROWS","SEARCH","SECURITY_ENFORCED","SELECT","SNIPPET","SORT","THIS_MONTH","THIS_WEEK","TODAY","TOLABEL","TOMORROW","TRACKING","TYPEOF","UPDATE",/USING\s+SCOPE/,"VIEW","VIEWSTAT","VIEWSTATE","WHERE","WITH","YESTERDAY","USER_MODE"),/\b/),
  scope:"keyword"},{match:/(\bIN\b|<|<=|>|>=|\bNOT\s+IN\b|=|!\s*=|:{1})/,
  scope:"literal",relevance:0},{match:/(?<=\bFROM\b\s+)\w+/,scope:"type",
  relevance:0},{match:/\b[a-zA-Z][a-zA-Z_0-9]*\b/,scope:"property"},a,A],
  illegal:"::"};return{name:"Apex",aliases:["apex","lightning"],
  case_insensitive:!0,disableAutodetect:!1,ignoreIllegals:!1,keywords:{
  $pattern:"[A-Za-z][0-9A-Za-z$_]*",
  keyword:["trigger|10","class","interface","abstract","AccessLevel","USER_MODE","break","catch","continue","default","do","else","execute","exports","extends|6","finally","finish","for","get","put","set","global","if","implements","new","newMap|10","old|10","oldMap|10","override","private","protected","public","return","start","static","throws","throw","testmethod|10","try","virtual","webservice","when","while"],
  "variable.language":["final","instanceof","super","this","transient"],
  built_in:["insert","update","upsert|8","delete","undelete","merge","schedulable|10","batchable|10","queueable|10","comparable|10","callable|10"],
  type:["anytype","blob|0","boolean|0","byte|0","currency|0","date|0","datetime|0","decimal|0","double|0","enum|0","float|0","integer|0","long|0","object","pagereference|10","selectoption|10","short|0","sobject|10","string|0","time|0","void|0","float|0"],
  literal:["false","true","null"]},
  illegal:["</","<#","<]","<div>","\x3c!--","!DOCTYPE",/<iframe\b/,/^#/,/^import \.[a-zA-Z]+\./,/^import [\w]+/,/^import$/,/^include </,/^use\s+</,/\b(const|var)\s+\w+\s*=/,/\bstruct\b/,"System.log","console.log",/\bfor\s+\w+\s+IN\s+/,/\bif\s+\w+\s+IN\s+/,/\bend\s+if\b/,/\bend\s+select\b/,/\b(int|var)\s+\w+\s+=/,/\b(int[0-9]+|bool)\b/,/\b\$/,"::=",/\s#[a-zA-Z]/,/\s_[a-zA-Z]/,/\s\$[a-zA-Z]/,"#if","%if",/\bif(?!\s+\()/,"%endif","#endif",/\w::\w/,/RETURNING\s+\*/,/\bint\b/,/import\s+\w+\s+=\s+require\("\w+"\)/,"/^include\b/",/\buse\s+strict\b/,/\w+\s+=\s+"\S*";/,/\/include\//,/\Anamespace\b/,/\bend\.\n/,/\bend\n/,'"""',/@\w+\[\w+\]/],
  contains:[i,[{match:[/\b(?<=enum|\bnew)/,/\s+/,t,/\s*(?=[{()])/],scope:{3:"type"
  },contains:[r,o,E]},{match:[/(?<=\bclass\b)/,/\s+/,t],scope:{3:"title.class"}},{
  match:[/(?<=public)/,/\s+/,t,/(?=\s*\()/],scope:{3:"constructor"}},{
  begin:[/(?<=\btrigger\b)/,/\s+/,t,/\s+/,"on",/\s+/,t],end:"{",scope:{
  3:"title.class",7:"type"},contains:[r,o,{
  match:/(?:before|after)\s+(?:insert|update|delete|undelete)/,scope:"built_in",
  relevance:10}],relevance:10},{match:[/\bextends/,/\s+/,t],scope:{
  3:"title.class.inherited"},contains:[r,o,n],illegal:[/\b_/,/_\b/]}],[{
  match:[t,/\s+/,t,/\s+/,/=/],scope:{1:"type",3:"variable",5:"operator"},
  relevance:0},{match:[t,/\s+/,t,/\s+/,";"],scope:{1:"type",3:"variable"},
  relevance:0},{match:[/\s+/,t,/\s+/,/=/],scope:{2:"variable",4:"operator"},
  relevance:0},{match:[/(?<=\w+\s+=\s+\()/,t,/(?=\))/],scope:{2:"type"},
  relevance:0}],{relevance:10,match:[/\b(?:with|without|inherited)\s+sharing/],
  scope:{1:"keyword"}},p,b,o,r,{match:/\b(switch\s+on|as\s+user|as\s+system)\b/,
  relevance:8,scope:"keyword"},E,l,{variants:[{
  match:[/\bfor\b/,/\s*\(/,/\w+/,/\s+/,/\w+/,/\s+:/,/(?=\s*\[)/],scope:{
  1:"keyword",3:"type"}},{
  match:[/\bfor\b/,/\s*\(/,/\w+/,/\s+/,/\w+/,/\s+:/,/\s*/,/\w+/],scope:{
  1:"keyword",3:"type"}}],contains:[r,o,u]},e.APOS_STRING_MODE,A,{
  begin:["{",/\$[a-zA-Z]+]/,".",/\w+/],end:"}",scope:{2:"built_in",4:"property"}
  },n,a,c,{match:/(?<!\.)\bId\b/,scope:"type",relevance:8},u]}}})()
  ;hljs.registerLanguage("apex",e)})();