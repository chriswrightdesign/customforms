(function(){
  "use strict";

  var d = document, $, init;

  var btnSubtract,
      btnAdd,
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
  btnAdd = $(".js-btn-vertical-add");
  btnSubtract = $(".js-btn-vertical-subtract");
  spinnerInput = $(".js-spinner-input-vertical");

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
    btnSubtract.addEventListener('click', changeSpinner, false);
    btnAdd.addEventListener('click', changeSpinner, false);
    if(supportsTouch) {
      btnSubtract.addEventListener('touchend', removeClickDelay, false);
      btnAdd.addEventListener('touchend', removeClickDelay, false);
    }
    if(supportsPointer) {
      btnSubtract.addEventListener('pointerup', removeClickDelay, false);
      btnAdd.addEventListener('pointerup', removeClickDelay, false);
    }
  };
  init();

})();

