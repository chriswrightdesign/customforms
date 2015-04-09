
(function(){
  "use strict";

  var d = document, $, init;

  var btnSpinnerSubtract,
      btnSpinnerAdd,
      spinnerInput,
      changeSpinner;

  //feature support
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

  //js hooks
  btnSpinnerSubtract = $(".js-spinner-horizontal-subtract");
  btnSpinnerAdd = $(".js-spinner-horizontal-add");
  spinnerInput = $(".js-spinner-input-horizontal");

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
  //refactor this
  changeSpinner = function(e){
    e.preventDefault();
    var tmp = getDataAttribute(e.target, "data-type");
    if(tmp === "add"){
     spinnerInput.value++;
    } else {
        if(spinnerInput.value > 0){
          spinnerInput.value--;
        }
      }
  };
  init = function(){
    //add click events, if other input types are available, enhance to those
    btnSpinnerSubtract.addEventListener('click', changeSpinner, false);
    btnSpinnerAdd.addEventListener('click', changeSpinner, false);
    if(supportsTouch) {
      btnSpinnerSubtract.addEventListener('touchend', removeClickDelay, false);
      btnSpinnerAdd.addEventListener('touchend', removeClickDelay, false);
    }
    if(supportsPointer) {
      btnSpinnerSubtract.addEventListener('pointerup', removeClickDelay, false);
      btnSpinnerAdd.addEventListener('pointerup', removeClickDelay, false);
    }
  };
  init();

})();
