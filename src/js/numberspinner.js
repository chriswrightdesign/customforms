  //gets the input by element Id, gets min, max, and step from the markup. Gets the subtract and add buttons either by optional classnames, or by the next or last element sibling.
var NumberSpinner = function(elemId, subtractClassName, addClassName) {
  'use strict';
  var spinnerInput = document.getElementById(elemId);
  var btnSubtract = document.querySelector(addClassName) || spinnerInput.previousElementSibling;
  var btnAdd = document.querySelector(subtractClassName) || spinnerInput.nextElementSibling;
  var minLimit, maxLimit, step;

  function init(){
    minLimit = makeNumber(getAttribute(spinnerInput, 'min')) || 0,
    maxLimit = makeNumber(getAttribute(spinnerInput, 'max')) || false,
    step = makeNumber(getAttribute(spinnerInput, 'step') || '1');

    btnSubtract.addEventListener('click', changeSpinner, false);
    btnAdd.addEventListener('click', changeSpinner, false);
    btnSubtract.addEventListener('keyup', keySpinner, false);
    btnAdd.addEventListener('keyup', keySpinner, false);
    if(supportsTouch()) {
      btnSubtract.addEventListener('touchend', removeClickDelay, false);
      btnAdd.addEventListener('touchend', removeClickDelay, false);
    }
    if(supportsPointer()) {
      btnSubtract.addEventListener('pointerup', removeClickDelay, false);
      btnAdd.addEventListener('pointerup', removeClickDelay, false);
    }
  }
  function removeClickDelay(e) {
    e.preventDefault();
    e.target.click();
  }
  function makeNumber(inputString){
    return parseInt(inputString, 10);
  }
  function update(direction){
    var num = makeNumber(spinnerInput.value);
    if(direction === 'add'){
      spinnerInput.value = ((num + step) <= maxLimit) ? (num + step) : spinnerInput.value;
    } else if(direction === 'subtract') {
      spinnerInput.value = ((num - step) >= minLimit) ? (num - step) : spinnerInput.value;
    }
  }
  function getAttribute(el, attr){
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
  }
  /* Touch and Pointer support */
  function supportsTouch(){
    return ('ontouchstart' in window);
  }
  function supportsPointer(){
    return ('pointerdown' in window);
  }
  /* Keyboard support */
  function keySpinner(e){
    switch(e.keyCode){
      case 40:
      case 37: // Down, Left
        update('subtract');
        btnSubtract.focus();
        break;
      case 38:
      case 39: // Top, Right
        update('add');
        btnAdd.focus();
        break;
    }
  }
  function changeSpinner(e) {
    e.preventDefault();
    var increment = getAttribute(e.target, 'data-type');
    update(increment);
  }
  init();
};