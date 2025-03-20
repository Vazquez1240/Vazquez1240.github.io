import{r as M,B as xe,o as q,l as re,u as L,v as we,Z as Q,h as V,g as X,y as k,$ as Te,a0 as Ce,a1 as G,a2 as $,w as S,a3 as N,a4 as J,a5 as Ee,C as He,a6 as Se,a7 as Le,a8 as We,c as R,a9 as Pe,aa as Me,ab as ke,ac as ze,ad as Re,x as qe,ae as $e,n as Oe,af as Ae,k as ue}from"./index.1cf488ee.js";import{d as ee}from"./axios.b375b2b4.js";function De(){const e=M(!xe.value);return e.value===!1&&q(()=>{e.value=!0}),e}const ce=typeof ResizeObserver!="undefined",te=ce===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var Fe=re({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:i}){let n=null,t,o={width:-1,height:-1};function c(r){r===!0||e.debounce===0||e.debounce==="0"?a():n===null&&(n=setTimeout(a,e.debounce))}function a(){if(n!==null&&(clearTimeout(n),n=null),t){const{offsetWidth:r,offsetHeight:s}=t;(r!==o.width||s!==o.height)&&(o={width:r,height:s},i("resize",o))}}const{proxy:u}=X();if(u.trigger=c,ce===!0){let r;const s=h=>{t=u.$el.parentNode,t?(r=new ResizeObserver(c),r.observe(t),a()):h!==!0&&Q(()=>{s(!0)})};return q(()=>{s()}),L(()=>{n!==null&&clearTimeout(n),r!==void 0&&(r.disconnect!==void 0?r.disconnect():t&&r.unobserve(t))}),we}else{let h=function(){n!==null&&(clearTimeout(n),n=null),s!==void 0&&(s.removeEventListener!==void 0&&s.removeEventListener("resize",c,k.passive),s=void 0)},p=function(){h(),t&&t.contentDocument&&(s=t.contentDocument.defaultView,s.addEventListener("resize",c,k.passive),a())};const r=De();let s;return q(()=>{Q(()=>{t=u.$el,t&&p()})}),L(h),()=>{if(r.value===!0)return V("object",{style:te.style,tabindex:-1,type:"text/html",data:te.url,"aria-hidden":"true",onLoad:p})}}}});function I(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Te.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const Be={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function je({showing:e,avoidEmit:i,configureAnchorEl:n}){const{props:t,proxy:o,emit:c}=X(),a=M(null);let u=null;function r(l){return a.value===null?!1:l===void 0||l.touches===void 0||l.touches.length<=1}const s={};n===void 0&&(Object.assign(s,{hide(l){o.hide(l)},toggle(l){o.toggle(l),l.qAnchorHandled=!0},toggleKey(l){Ce(l,13)===!0&&s.toggle(l)},contextClick(l){o.hide(l),G(l),Q(()=>{o.show(l),l.qAnchorHandled=!0})},prevent:G,mobileTouch(l){if(s.mobileCleanup(l),r(l)!==!0)return;o.hide(l),a.value.classList.add("non-selectable");const d=l.target;$(s,"anchor",[[d,"touchmove","mobileCleanup","passive"],[d,"touchend","mobileCleanup","passive"],[d,"touchcancel","mobileCleanup","passive"],[a.value,"contextmenu","prevent","notPassive"]]),u=setTimeout(()=>{u=null,o.show(l),l.qAnchorHandled=!0},300)},mobileCleanup(l){a.value.classList.remove("non-selectable"),u!==null&&(clearTimeout(u),u=null),e.value===!0&&l!==void 0&&I()}}),n=function(l=t.contextMenu){if(t.noParentEvent===!0||a.value===null)return;let d;l===!0?o.$q.platform.is.mobile===!0?d=[[a.value,"touchstart","mobileTouch","passive"]]:d=[[a.value,"mousedown","hide","passive"],[a.value,"contextmenu","contextClick","notPassive"]]:d=[[a.value,"click","toggle","passive"],[a.value,"keyup","toggleKey","passive"]],$(s,"anchor",d)});function h(){N(s,"anchor")}function p(l){for(a.value=l;a.value.classList.contains("q-anchor--skip");)a.value=a.value.parentNode;n()}function x(){if(t.target===!1||t.target===""||o.$el.parentNode===null)a.value=null;else if(t.target===!0)p(o.$el.parentNode);else{let l=t.target;if(typeof t.target=="string")try{l=document.querySelector(t.target)}catch{l=void 0}l!=null?(a.value=l.$el||l,n()):(a.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return S(()=>t.contextMenu,l=>{a.value!==null&&(h(),n(l))}),S(()=>t.target,()=>{a.value!==null&&h(),x()}),S(()=>t.noParentEvent,l=>{a.value!==null&&(l===!0?h():n())}),q(()=>{x(),i!==!0&&t.modelValue===!0&&a.value===null&&c("update:modelValue",!1)}),L(()=>{u!==null&&clearTimeout(u),h()}),{anchorEl:a,canShow:r,anchorEvents:s}}function Qe(e,i){const n=M(null);let t;function o(u,r){const s=`${r!==void 0?"add":"remove"}EventListener`,h=r!==void 0?r:t;u!==window&&u[s]("scroll",h,k.passive),window[s]("scroll",h,k.passive),t=r}function c(){n.value!==null&&(o(n.value),n.value=null)}const a=S(()=>e.noParentEvent,()=>{n.value!==null&&(c(),i())});return L(a),{localScrollTarget:n,unconfigureScrollTarget:c,changeScrollEvent:o}}const{notPassiveCapture:O}=k,E=[];function A(e){const i=e.target;if(i===void 0||i.nodeType===8||i.classList.contains("no-pointer-events")===!0)return;let n=J.length-1;for(;n>=0;){const t=J[n].$;if(t.type.name==="QTooltip"){n--;continue}if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;n--}for(let t=E.length-1;t>=0;t--){const o=E[t];if((o.anchorEl.value===null||o.anchorEl.value.contains(i)===!1)&&(i===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(i)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function Ve(e){E.push(e),E.length===1&&(document.addEventListener("mousedown",A,O),document.addEventListener("touchstart",A,O))}function ie(e){const i=E.findIndex(n=>n===e);i>-1&&(E.splice(i,1),E.length===0&&(document.removeEventListener("mousedown",A,O),document.removeEventListener("touchstart",A,O)))}let ne,oe;function ae(e){const i=e.split(" ");return i.length!==2?!1:["top","center","bottom"].includes(i[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(i[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Ne(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const K={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{K[`${e}#ltr`]=e,K[`${e}#rtl`]=e});function le(e,i){const n=e.split(" ");return{vertical:n[0],horizontal:K[`${n[1]}#${i===!0?"rtl":"ltr"}`]}}function Ie(e,i){let{top:n,left:t,right:o,bottom:c,width:a,height:u}=e.getBoundingClientRect();return i!==void 0&&(n-=i[1],t-=i[0],c+=i[1],o+=i[0],a+=i[0],u+=i[1]),{top:n,bottom:c,height:u,left:t,right:o,width:a,middle:t+(o-t)/2,center:n+(c-n)/2}}function Ke(e,i,n){let{top:t,left:o}=e.getBoundingClientRect();return t+=i.top,o+=i.left,n!==void 0&&(t+=n[1],o+=n[0]),{top:t,bottom:t+1,height:1,left:o,right:o+1,width:1,middle:o,center:t}}function Xe(e,i){return{top:0,center:i/2,bottom:i,left:0,middle:e/2,right:e}}function se(e,i,n,t){return{top:e[n.vertical]-i[t.vertical],left:e[n.horizontal]-i[t.horizontal]}}function de(e,i=0){if(e.targetEl===null||e.anchorEl===null||i>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{de(e,i+1)},10);return}const{targetEl:n,offset:t,anchorEl:o,anchorOrigin:c,selfOrigin:a,absoluteOffset:u,fit:r,cover:s,maxHeight:h,maxWidth:p}=e;if(Ee.is.ios===!0&&window.visualViewport!==void 0){const H=document.body.style,{offsetLeft:g,offsetTop:b}=window.visualViewport;g!==ne&&(H.setProperty("--q-pe-left",g+"px"),ne=g),b!==oe&&(H.setProperty("--q-pe-top",b+"px"),oe=b)}const{scrollLeft:x,scrollTop:l}=n,d=u===void 0?Ie(o,s===!0?[0,0]:t):Ke(o,u,t);Object.assign(n.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:p||"100vw",maxHeight:h||"100vh",visibility:"visible"});const{offsetWidth:w,offsetHeight:W}=n,{elWidth:D,elHeight:z}=r===!0||s===!0?{elWidth:Math.max(d.width,w),elHeight:s===!0?Math.max(d.height,W):W}:{elWidth:w,elHeight:W};let v={maxWidth:p,maxHeight:h};(r===!0||s===!0)&&(v.minWidth=d.width+"px",s===!0&&(v.minHeight=d.height+"px")),Object.assign(n.style,v);const T=Xe(D,z);let f=se(d,T,c,a);if(u===void 0||t===void 0)j(f,d,T,c,a);else{const{top:H,left:g}=f;j(f,d,T,c,a);let b=!1;if(f.top!==H){b=!0;const y=2*t[1];d.center=d.top-=y,d.bottom-=y+2}if(f.left!==g){b=!0;const y=2*t[0];d.middle=d.left-=y,d.right-=y+2}b===!0&&(f=se(d,T,c,a),j(f,d,T,c,a))}v={top:f.top+"px",left:f.left+"px"},f.maxHeight!==void 0&&(v.maxHeight=f.maxHeight+"px",d.height>f.maxHeight&&(v.minHeight=v.maxHeight)),f.maxWidth!==void 0&&(v.maxWidth=f.maxWidth+"px",d.width>f.maxWidth&&(v.minWidth=v.maxWidth)),Object.assign(n.style,v),n.scrollTop!==l&&(n.scrollTop=l),n.scrollLeft!==x&&(n.scrollLeft=x)}function j(e,i,n,t,o){const c=n.bottom,a=n.right,u=He(),r=window.innerHeight-u,s=document.body.clientWidth;if(e.top<0||e.top+c>r)if(o.vertical==="center")e.top=i[t.vertical]>r/2?Math.max(0,r-c):0,e.maxHeight=Math.min(c,r);else if(i[t.vertical]>r/2){const h=Math.min(r,t.vertical==="center"?i.center:t.vertical===o.vertical?i.bottom:i.top);e.maxHeight=Math.min(c,h),e.top=Math.max(0,h-c)}else e.top=Math.max(0,t.vertical==="center"?i.center:t.vertical===o.vertical?i.top:i.bottom),e.maxHeight=Math.min(c,r-e.top);if(e.left<0||e.left+a>s)if(e.maxWidth=Math.min(a,s),o.horizontal==="middle")e.left=i[t.horizontal]>s/2?Math.max(0,s-a):0;else if(i[t.horizontal]>s/2){const h=Math.min(s,t.horizontal==="middle"?i.middle:t.horizontal===o.horizontal?i.right:i.left);e.maxWidth=Math.min(a,h),e.left=Math.max(0,h-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?i.middle:t.horizontal===o.horizontal?i.left:i.right),e.maxWidth=Math.min(a,s-e.left)}var Ue=re({name:"QTooltip",inheritAttrs:!1,props:{...Be,...Se,...Le,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ae},self:{type:String,default:"top middle",validator:ae},offset:{type:Array,default:()=>[14,14],validator:Ne},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...We],setup(e,{slots:i,emit:n,attrs:t}){let o,c;const a=X(),{proxy:{$q:u}}=a,r=M(null),s=M(!1),h=R(()=>le(e.anchor,u.lang.rtl)),p=R(()=>le(e.self,u.lang.rtl)),x=R(()=>e.persistent!==!0),{registerTick:l,removeTick:d}=Pe(),{registerTimeout:w}=Me(),{transitionProps:W,transitionStyle:D}=ke(e),{localScrollTarget:z,changeScrollEvent:v,unconfigureScrollTarget:T}=Qe(e,U),{anchorEl:f,canShow:H,anchorEvents:g}=je({showing:s,configureAnchorEl:pe}),{show:b,hide:y}=ze({showing:s,canShow:H,handleShow:he,handleHide:me,hideOnRouteChange:x,processOnMount:!0});Object.assign(g,{delayShow:ve,delayHide:ge});const{showPortal:Y,hidePortal:_,renderPortal:fe}=Re(a,r,ye,"tooltip");if(u.platform.is.mobile===!0){const m={anchorEl:f,innerRef:r,onClickOutside(C){return y(C),C.target.classList.contains("q-dialog__backdrop")&&Ae(C),!0}},B=R(()=>e.modelValue===null&&e.persistent!==!0&&s.value===!0);S(B,C=>{(C===!0?Ve:ie)(m)}),L(()=>{ie(m)})}function he(m){Y(),l(()=>{c=new MutationObserver(()=>P()),c.observe(r.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),P(),U()}),o===void 0&&(o=S(()=>u.screen.width+"|"+u.screen.height+"|"+e.self+"|"+e.anchor+"|"+u.lang.rtl,P)),w(()=>{Y(!0),n("show",m)},e.transitionDuration)}function me(m){d(),_(),F(),w(()=>{_(!0),n("hide",m)},e.transitionDuration)}function F(){c!==void 0&&(c.disconnect(),c=void 0),o!==void 0&&(o(),o=void 0),T(),N(g,"tooltipTemp")}function P(){de({targetEl:r.value,offset:e.offset,anchorEl:f.value,anchorOrigin:h.value,selfOrigin:p.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ve(m){if(u.platform.is.mobile===!0){I(),document.body.classList.add("non-selectable");const B=f.value,C=["touchmove","touchcancel","touchend","click"].map(Z=>[B,Z,"delayHide","passiveCapture"]);$(g,"tooltipTemp",C)}w(()=>{b(m)},e.delay)}function ge(m){u.platform.is.mobile===!0&&(N(g,"tooltipTemp"),I(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),w(()=>{y(m)},e.hideDelay)}function pe(){if(e.noParentEvent===!0||f.value===null)return;const m=u.platform.is.mobile===!0?[[f.value,"touchstart","delayShow","passive"]]:[[f.value,"mouseenter","delayShow","passive"],[f.value,"mouseleave","delayHide","passive"]];$(g,"anchor",m)}function U(){if(f.value!==null||e.scrollTarget!==void 0){z.value=qe(f.value,e.scrollTarget);const m=e.noParentEvent===!0?P:y;v(z.value,m)}}function be(){return s.value===!0?V("div",{...t,ref:r,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,D.value],role:"tooltip"},Oe(i.default)):null}function ye(){return V($e,W.value,be)}return L(F),Object.assign(a.proxy,{updatePosition:P}),fe}});const Ze=ue({id:"loadingmaps",state:()=>({mouseBehavior:["normal","arbol-decisiones"],data:[],currentPage:1,showOverlay:!1,showOverlayBusqueda:!1,loading:!1,maximoCapas:!1,nuevasCapas:[],inicioCapas:5}),actions:{setShowOverlayBusqueda(e){this.showOverlayBusqueda=e},async obtenerCapasInicial(){try{for(this.loading=!0;this.currentPage<=4;){const e=await ee.get(`?page=${this.currentPage}`);this.data=this.data.concat(...e.data.datasets),this.currentPage++}this.loading=!1}catch(e){console.log(e)}},async obtenerMasCapas(){const e=this.inicioCapas+2;for(this.loading=!0;this.inicioCapas<e;)try{const i=await ee.get(`?page=${this.inicioCapas}`);this.nuevasCapas=this.data.concat(i.data.datasets),this.inicioCapas++,this.currentPage=e}catch{this.maximoCapas=!0;break}this.loading=!1}}}),Ge=ue({id:"dialogoBuscadorLugar",state:()=>({showDialogo:!1,direccion:""}),actions:{setShowDialogo(e){this.showDialogo=e},setDireccion(e){this.direccion=e}}});export{Ze as L,Fe as Q,Ue as a,Ne as b,Qe as c,Ge as d,je as e,Ve as f,I as g,le as p,ie as r,de as s,Be as u,ae as v};
