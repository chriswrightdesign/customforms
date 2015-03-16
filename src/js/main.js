
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
    classie.toggle(selectFullWrapper, "is-hidden")

  };
  syncSelectOption = function(e){

    
    var tempNum = e.target.classList[1]; //may be a problem in ie9
    tempNum = parseInt(tempNum, 10);
    tempNum = tempNum - 1;
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
      li.className = selectItem.children[i].value.toString();
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
