(function(){
  "use strict";

  var d = document,
  $, 
  btnHorizonSubtract, btnHorizonAdd, 
  spinnerHorizonInput, changeHorizonSpinner, eventType;

  var btnVerticalAdd, btnVerticalSubtract,
  spinnerVerticalInput, changeVerticalSpinner;

  eventType = Modernizr.touch ? "touchstart" : "click";

  $ = function(selector){
    return d.querySelector(selector);
  };

  //vertical 
  btnVerticalAdd = $(".js-btn-vertical-add");
  btnVerticalSubtract = $(".js-btn-vertical-subtract");
  spinnerVerticalInput = $(".js-spinner-input-vertical");

  //horizontal
  btnHorizonSubtract = $(".js-spinner-horizontal-subtract");
  btnHorizonAdd = $(".js-spinner-horizontal-add");
  spinnerHorizonInput = $(".js-spinner-input-horizontal");

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
 
  //vertical
  btnVerticalAdd.addEventListener(eventType, changeVerticalSpinner, false);
  btnVerticalSubtract.addEventListener(eventType, changeVerticalSpinner, false);

  //horizontal
  btnHorizonSubtract.addEventListener(eventType, changeHorizonSpinner, false);
  btnHorizonAdd.addEventListener(eventType, changeHorizonSpinner, false);

})();
