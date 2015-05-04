
(function(){
  "use strict";

  var d = document,
  $, getDataAttribute;

  var btnPasswordSwitch, revealPassword, passwordInput;

 var supportsTextContent = ('textContent' in document.body),
  supportsTouch = ('ontouchstart' in window),
  supportsPointer = ('pointerdown' in window);
  //touch or pointer supported
  var removeClickDelay, getDataAttribute;

  $ = function(selector){
    return d.querySelector(selector);
  };
  removeClickDelay = function(e) {
    e.preventDefault();
    e.target.click();
  };
  //password switcher
  btnPasswordSwitch = $(".js-password-switch");
  passwordInput = $(".js-password-input");

  //password switcher
  revealPassword = function(e){
    e.preventDefault();

    if(btnPasswordSwitch.classList.has("is-active")){
      passwordInput.setAttribute("type", "password");
    } else {
       passwordInput.setAttribute("type", "text");
    }
    btnPasswordSwitch.classList.toggle("is-active");
  };

  btnPasswordSwitch.addEventListener("click", revealPassword, false);
  if(supportsTouch){
    btnPasswordSwitch.addEventListener("touchend", removeClickDelay, false);
  }
  if(supportsPointer){
     btnPasswordSwitch.addEventListener("pointerup", removeClickDelay, false);
  }

})();
