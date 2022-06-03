/*!
  Highlight.js v11.5.0 (git: 7629b44b5d)
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
	/*! `apex` grammar compiled for Highlight.js 11.5.0 */
(()=>{var e=(()=>{"use strict";return e=>{
	const s=e.regex,t="[a-zA-Z][a-zA-Z_0-9]*",a={scope:"number",variants:[{
	match:/\b[0-9]+(?:\.[0-9]+)?/},{match:/\s(?:[0-9,]+)?\.[0-9]+/}],relevance:0
	},c={
	match:s.either(/-/,/~/,/\*/,/\*=/,/\/=/,/%/,/\.\.\./,/\.\./,/\+/,/<</,/>>/,/>=/,/<=/,/\s<\s/,/\s>\s/,/\^/,/\^=/,/!=/,/!/,/==/,/&&/,/&/,/\|\|/,/\|/,/\?:/,/=/,/=>/),
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
	}],contains:[r,o,e.APOS_STRING_MODE],relevance:0},d={
	begin:/\[[\s\n]*(?=SELECT)/,end:/\]/,scope:"subst",relevance:10,contains:[{
	begin:s.concat(/\b/,s.either("ABOVE_OR_BELOW","ABOVE","ACTIVE","ADVANCED","ALL",/ALL\s+FIELDS/,"AND","ANY","ARRAY","AS","ASC","BY","CATEGORY","CONTAINS","COUNT","COUNT_DISTINCT","SUM","MAX","MIN","HOUR_IN_DAY","CONVERTCURRENCY","CUBE","DATA","DESC","DIVISION","END","EXCLUDES","FIELDS","FIND","FIRST","FOR","FROM",/GROUP\s+BY/,"HAVING","INCLUDES","LAST","LAST_90_DAYS","LAST_MONTH","LAST_N_DAYS","LAST_WEEK","LAST","LIKE","LIMIT","NETWORK","NEXT_90_DAYS","NEXT_MONTH","NEXT_N_DAYS","NEXT_WEEK","NULLS","OFFSET","ON","OR",/ORDER\s+BY/,"REFERENCE","RETURNING","ROLLUP","ROWS","SEARCH","SECURITY_ENFORCED","SELECT","SNIPPET","SORT","THIS_MONTH","THIS_WEEK","TODAY","TOLABEL","TOMORROW","TRACKING","TYPEOF","UPDATE",/USING\s+SCOPE/,"VIEW","VIEWSTAT","VIEWSTATE","WHERE","WITH","YESTERDAY","USER_MODE"),/\b/),
	scope:"keyword"},{match:/(\bIN\b|<|<=|>|>=|\bNOT\s+IN\b|=|!\s*=|:{1})/,
	scope:"literal",relevance:0},{match:/(?<=\bFROM\b\s+)\w+/,scope:"type",
	relevance:0},{match:/\b[a-zA-Z][a-zA-Z_0-9]*\b/,scope:"property"},a,A],
	illegal:"::"};return{name:"Apex",aliases:["apex","lightning"],
	case_insensitive:!0,disableAutodetect:!1,ignoreIllegals:!1,keywords:{
	$pattern:"[A-Za-z][0-9A-Za-z$_]*",
	keyword:["abstract","AccessLevel","USER_MODE","break","catch","continue","default","do","else","execute","exports","extends|6","finally","finish","for","get","put","set","global","if","implements","new","newMap|10","old|10","oldMap|10","override","private","protected","public","return","start","static","throws","throw","testmethod|10","try","virtual","webservice","when","while"],
	"variable.language":["final","instanceof","super","this","transient"],
	built_in:["trigger|10","class","interface","insert","update","upsert|8","delete","undelete","merge","schedulable|10","batchable|10","queueable|10","comparable|10","callable|10"],
	type:["anytype","blob|0","boolean|0","byte|0","currency|0","date|0","datetime|0","decimal|0","double|0","enum|0","float|0","integer|0","long|0","object","pagereference|10","selectoption|10","short|0","sobject|10","string|0","time|0","void|0","float|0"],
	literal:["false","true","null"]},
	illegal:["</","<#","<]","<div>","\x3c!--","!DOCTYPE",/<iframe\b/,/\n#/,/\nimport \.[a-zA-Z]+\./,/\nimport [\w]+/,/\ninclude </,/\nuse\s+</,/\b(const|var)\s+\w+\s*=/,/\bstruct\b/,"System.log","console.log",/\bfor\s+\w+\s+IN\s+/,/\bif\s+\w+\s+IN\s+/,/\bend\s+if\b/,/\bend\s+select\b/,/\b(int|var)\s+\w+\s+=/,/\b(int[0-9]+|bool)\b/,/\b\$/,"::=",/\s#[a-zA-Z]/,/\s_[a-zA-Z]/,/\s\$[a-zA-Z]/,"#if","%if","%endif","#endif",/\w::\w/,/RETURNING\s+\*/,/\bint\b/,/import\s+\w+\s+=\s+require\("\w+"\)/,"/^include\b/",/\buse\s+strict\b/,/\w+\s+=\s+"\S*";/,/\/include\//,/\Anamespace\b/,/\bend\.\n/,/\bend\n/,'"""',/"\w+"/],
	contains:[i,[{match:[/\b(?<=enum|\bnew)/,/\s+/,t,/\s*(?=[{()])/],scope:{3:"type"
	},contains:[r,o,E]},{match:[/\bclass/,/\s+/,t],scope:{1:"keyword",
	3:"title.class"}},{match:[/(?<=public)/,/\s+/,t,/(?=\s*\()/],scope:{
	3:"constructor"}},{begin:[/\btrigger/,/\s+/,t,/\s+/,"on",/\s+/,t],end:"{",
	scope:{1:"keyword",3:"title.class",7:"type"},contains:[r,o,{
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
	1:"keyword",3:"type"}}],contains:[r,o,d]},e.APOS_STRING_MODE,A,n,a,c,{
	match:/(?<!\.)\bId\b/,scope:"type",relevance:8},d]}}})()
	;hljs.registerLanguage("apex",e)})();