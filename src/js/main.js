
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

  var mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i,
  supportTouch = ("ontouchstart" in window), checkTouch, displayTouch, supportPointerEvents;
  
  var supportOnlyTouch = supportTouch && mobileRegex.test(navigator.userAgent);

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

  checkTouch = function(){

    displayTouch.textContent = "Support Touch: " + supportTouch + " , Support Pointer Events: " + supportPointerEvents + " , supports only Touch: " + supportOnlyTouch;

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
    var tmp = getDataAttribute(e.target, "data-type");
    //var tmpValue = spinnerHorizonInput.value;
    if(tmp === "add"){
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

  checkTouch();
})();
