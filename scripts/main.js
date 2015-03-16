
(function(){
  "use strict";

  var d = document,
  $, eventType, prefixed, getDataAttribute;
  var btnHorizonSubtract, btnHorizonAdd, 
  spinnerHorizonInput, changeHorizonSpinner;

  var btnVerticalAdd, btnVerticalSubtract,
  spinnerVerticalInput, changeVerticalSpinner;

  var btnPasswordSwitch, revealPassword, passwordInput;
  var vendorPrefixes = ["", "webkit", "moz", "MS", "ms", "o"];

  var selectFull, selectFullItem, fullScreenSelect, selectFullIntercept, syncSelectOption,
  selectItem, selectFullWrapper, toggleSelectWrapper, createInterceptSelect;

  var eventTypes = [];

  //there's no reliable way to detect, so we use a combination of feature detection and UA sniffing
  var mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i, 
  supportTouch = ("ontouchstart" in window), 
  checkTouch, displayTouch, 
  supportPointerEvents;
  var supportOnlyTouch = supportTouch && mobileRegex.test(navigator.userAgent);

  var reportTouch, reportPointers, reportOnlyTouch;

  eventType = supportTouch ? "touchstart" : "click";
  
  $ = function(selector){
    return d.querySelector(selector);
  };

  //prefixed adapted from Hammer.js
  prefixed = function(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < vendorPrefixes.length) {
        prefix = vendorPrefixes[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
  };

  supportPointerEvents = prefixed(window, "PointerEvent") !== undefined;

  displayTouch = $(".js-displaytouch");

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

  //fullscreen select
  selectFull = $(".js-select-full");
  selectItem = $(".js-select-item");

  
  reportTouch = $(".js-touch-support");
  reportOnlyTouch = $(".js-touch-only");
  reportPointers = $(".js-pointer-support");

  
  toggleSelectWrapper = function(){

    classie.toggle(selectFullWrapper, "is-visible");
    classie.toggle(selectFullWrapper, "is-hidden");

  };
  syncSelectOption = function(e){

    var tempNum = getDataAttribute(e.target, "data-value");
    console.log(tempNum);
    //var tempNum = e.target.classList[1]; //may be a problem in ie9
    tempNum = parseInt(tempNum, 10);
    tempNum = tempNum;
    var textValue = e.target.textContent;
    selectItem.options[tempNum].selected = true;
    selectFullItem.textContent = e.target.textContent;
  
  
  };
  fullScreenSelect = function(e){
    e.preventDefault();
    toggleSelectWrapper();
  };
  createInterceptSelect = function(){

    var div = document.createElement("div");
    div.id = "intercept";
    div.className = "select-full-wrapper js-select-full-wrapper is-hidden";
    div.addEventListener("click", toggleSelectWrapper, false);
    
    var ul = document.createElement("ul");
    ul.className = "select-full-list";
    for (var i = 0, len = selectItem.children.length; i < len; i++){

      var li = document.createElement("li");
      li.textContent = selectItem.children[i].value;
      //changing this to setAttribute so we don't have to rely on classList
      li.setAttribute("data-value", i);
      li.addEventListener("click", syncSelectOption, false);
      ul.appendChild(li);
      

    }
    div.appendChild(ul);
    document.body.appendChild(div);

    selectFullWrapper = document.getElementById("intercept");


  };
  selectFullIntercept = function(){

    var a = document.createElement('a');
    a.className = "select-full-item js-select-full-item";
    a.textContent = "Select option";
    a.setAttribute('href', '#');
    selectFull.insertBefore(a, selectFull.firstChild);
    selectFullItem = $(".js-select-full-item");
    createInterceptSelect();
  };
  
  selectFullIntercept();
  checkTouch = function(){

    reportTouch.textContent = supportTouch;
    reportPointers.textContent = supportPointerEvents;
    reportOnlyTouch.textContent = supportOnlyTouch;

    if(!supportTouch && !supportPointerEvents) {
    
      eventTypes.push("click");
    
    } else if (supportOnlyTouch) {
    
      eventTypes.push("touchstart");
    
    } else if (supportPointerEvents){
      
      eventTypes.push("PointerDown");
      eventTypes.push("click");
    }
  };

  getDataAttribute = function(el, attr){

    var hasGetAttr = (el.getAttribute && el.getAttribute(attr)) || null;
    if(!hasGetAttr) {
        var attrs = el.attributes;
        for(var i = 0, len = attrs.length; i < len; i++){
            if(attrs[i].nodeName === attr) {
                hasGetAttr = attrs[i].nodeValue;
            }
        }
    }
    return hasGetAttr;

  };

  //password switcher
  revealPassword = function(e){
    e.preventDefault();

    if(classie.has(btnPasswordSwitch, "is-active")){
      passwordInput.setAttribute("type", "password");
    } else {
       passwordInput.setAttribute("type", "text");
    }
    classie.toggle(btnPasswordSwitch, "is-active");
  };

  //vertical
  changeVerticalSpinner = function(e){
    e.preventDefault();
    var tmp = getDataAttribute(e.target, "data-type");
    //var tmpValue = spinnerVerticalInput.value;
    if(tmp === "add"){
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
    console.log("event: " + e);
    
    
    //var tmpValue = spinnerHorizonInput.value;
    
      
      var tmp = getDataAttribute(e.target, "data-type");
      if(tmp === "add"){
        spinnerHorizonInput.value++;
      
      } else {
      
        if(spinnerHorizonInput.value > 0){
          spinnerHorizonInput.value--; 
        }
      }

    
    
  };

  checkTouch();

  for (var k = 0, evlen = eventTypes.length; k < evlen; k++){

      //password button
      btnPasswordSwitch.addEventListener(eventTypes[k], revealPassword, false);
 
      //vertical
      btnVerticalAdd.addEventListener(eventTypes[k], changeVerticalSpinner, false);
      btnVerticalSubtract.addEventListener(eventTypes[k], changeVerticalSpinner, false);

      //horizontal
      btnHorizonSubtract.addEventListener(eventTypes[k], changeHorizonSpinner, false);
      btnHorizonAdd.addEventListener(eventTypes[k], changeHorizonSpinner, false);

      selectFull.addEventListener(eventTypes[k], fullScreenSelect, false);

      

  }

  
  

 
})();

/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-flexbox-csscolumns-history-inlinesvg-svg-svgclippaths-touch-webgl-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_pointerevents-css_regions-svg_filters
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.flexbox=function(){return H("flexWrap")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.history=function(){return!!a.history&&!!history.pushState},r.csscolumns=function(){return H("columnCount")},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),Modernizr.addTest("pointerevents",function(){var a=document.createElement("x"),b=document.documentElement,c=window.getComputedStyle,d;return"pointerEvents"in a.style?(a.style.pointerEvents="auto",a.style.pointerEvents="x",b.appendChild(a),d=c&&c(a,"").pointerEvents==="auto",b.removeChild(a),!!d):!1}),Modernizr.addTest("regions",function(){var a=Modernizr.prefixed("flowFrom"),b=Modernizr.prefixed("flowInto");if(!a||!b)return!1;var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("div"),f="modernizr_flow_for_regions_check";d.innerText="M",c.style.cssText="top: 150px; left: 150px; padding: 0px;",e.style.cssText="width: 50px; height: 50px; padding: 42px;",e.style[a]=f,c.appendChild(d),c.appendChild(e),document.documentElement.appendChild(c);var g,h,i=d.getBoundingClientRect();return d.style[b]=f,g=d.getBoundingClientRect(),h=g.left-i.left,document.documentElement.removeChild(c),d=e=c=undefined,h==42}),Modernizr.addTest("svgfilters",function(){var a=!1;try{a=typeof SVGFEColorMatrixElement!==undefined&&SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE==2}catch(b){}return a});
!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
  WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
    var target = this;

    registry.unshift([target, type, listener, function (event) {
      event.currentTarget = target;
      event.preventDefault = function () { event.returnValue = false };
      event.stopPropagation = function () { event.cancelBubble = true };
      event.target = event.srcElement || target;

      listener.call(target, event);
    }]);

    this.attachEvent("on" + type, registry[0][3]);
  };

  WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
    for (var index = 0, register; register = registry[index]; ++index) {
      if (register[0] == this && register[1] == type && register[2] == listener) {
        return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
      }
    }
  };

  WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
    return this.fireEvent("on" + eventObject.type, eventObject);
  };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
/*!
* classie v1.0.1
* class helper functions
* from bonzo https://github.com/ded/bonzo
* MIT license
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/
/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */
( function( window ) {
"use strict";
// class helper functions from bonzo https://github.com/ded/bonzo
function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;
if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}
function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}
var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};
// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}
})( window );

if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function() {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    
    Object.defineProperty(Element.prototype, "textContent", { 
      get: function() {
        return innerText.get.call(this);
      },
      set: function(s) {
        return innerText.set.call(this, s);
      }
    });
  })();
} 