(function(){
  "use strict";

  var d = document,
  $, 
  btnHorizonSubtract, btnHorizonAdd, 
  spinnerHorizonInput, changeHorizonSpinner, eventType;

  var btnVerticalAdd, btnVerticalSubtract,
  spinnerVerticalInput, changeVerticalSpinner;

  var btnPasswordSwitch, revealPassword, passwordInput;

  eventType = Modernizr.touch ? "touchstart" : "click";

  $ = function(selector){
    return d.querySelector(selector);
  };

  //password switcher
  btnPasswordSwitch = $(".js-password-switch");
  passwordInput = $(".js-password-input");

  //vertical 
  btnVerticalAdd = $(".js-btn-vertical-add");
  btnVerticalSubtract = $(".js-btn-vertical-subtract");
  spinnerVerticalInput = $(".js-spinner-input-vertical");

  //horizontal
  btnHorizonSubtract = $(".js-spinner-horizontal-subtract");
  btnHorizonAdd = $(".js-spinner-horizontal-add");
  spinnerHorizonInput = $(".js-spinner-input-horizontal");

  //password switcher
  revealPassword = function(e){
    e.preventDefault();

    if(btnPasswordSwitch.classList.contains("is-active")){

      passwordInput.setAttribute("type", "password");
    } else {
       passwordInput.setAttribute("type", "text");
    }

    btnPasswordSwitch.classList.toggle("is-active");

   

  };

  //vertical
  changeVerticalSpinner = function(e){

    e.preventDefault();
    var tmp = e.target.dataset.type;
    var tmpValue = spinnerVerticalInput.value;
    if(tmp == "add"){
     
      spinnerVerticalInput.value++;
    } else {
      
      if(spinnerVerticalInput.value > 0) {
        spinnerVerticalInput.value--;
      }
    }

  };

  //horizontal
  changeHorizonSpinner = function(e){
    e.preventDefault();
    var tmp = e.target.dataset.type;
    var tmpValue = spinnerHorizonInput.value;
    if(tmp == "add"){
     
      spinnerHorizonInput.value++;
    } else {
      if(spinnerHorizonInput.value > 0){
        spinnerHorizonInput.value--; 
      }

    }
   
  };

  //password button
  btnPasswordSwitch.addEventListener(eventType, revealPassword, false);
 
  //vertical
  btnVerticalAdd.addEventListener(eventType, changeVerticalSpinner, false);
  btnVerticalSubtract.addEventListener(eventType, changeVerticalSpinner, false);

  //horizontal
  btnHorizonSubtract.addEventListener(eventType, changeHorizonSpinner, false);
  btnHorizonAdd.addEventListener(eventType, changeHorizonSpinner, false);

})();

/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-flexbox-csscolumns-history-inlinesvg-svg-svgclippaths-touch-webgl-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_pointerevents-css_regions-svg_filters
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.flexbox=function(){return H("flexWrap")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.history=function(){return!!a.history&&!!history.pushState},r.csscolumns=function(){return H("columnCount")},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),Modernizr.addTest("pointerevents",function(){var a=document.createElement("x"),b=document.documentElement,c=window.getComputedStyle,d;return"pointerEvents"in a.style?(a.style.pointerEvents="auto",a.style.pointerEvents="x",b.appendChild(a),d=c&&c(a,"").pointerEvents==="auto",b.removeChild(a),!!d):!1}),Modernizr.addTest("regions",function(){var a=Modernizr.prefixed("flowFrom"),b=Modernizr.prefixed("flowInto");if(!a||!b)return!1;var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("div"),f="modernizr_flow_for_regions_check";d.innerText="M",c.style.cssText="top: 150px; left: 150px; padding: 0px;",e.style.cssText="width: 50px; height: 50px; padding: 42px;",e.style[a]=f,c.appendChild(d),c.appendChild(e),document.documentElement.appendChild(c);var g,h,i=d.getBoundingClientRect();return d.style[b]=f,g=d.getBoundingClientRect(),h=g.left-i.left,document.documentElement.removeChild(c),d=e=c=undefined,h==42}),Modernizr.addTest("svgfilters",function(){var a=!1;try{a=typeof SVGFEColorMatrixElement!==undefined&&SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE==2}catch(b){}return a});