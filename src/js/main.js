(function(){
  "use strict";
  var d = document,
  $, 
  btnSubtract, btnAdd, 
  spinnerInput, changeSpinner, eventType;

  eventType = Modernizr.touch ? "touchstart" : "click";

  $ = function(selector){
    return d.querySelector(selector);
  };
  btnSubtract = $(".js-spinner-horizontal-subtract");
  btnAdd = $(".js-spinner-horizontal-add");
  spinnerInput = $(".js-spinner-input-horizontal");

  changeSpinner = function(e){
    e.preventDefault();
    var tmp = e.target.dataset.type;
    var tmpValue = spinnerInput.value;
    if(tmp == "add"){
      console.log("Adding");
      spinnerInput.value++;
    } else {
      if(spinnerInput.value > 0){
        spinnerInput.value--; 
      }

    }
   
  };
 
  btnSubtract.addEventListener(eventType, changeSpinner, false);
  btnAdd.addEventListener(eventType, changeSpinner, false);

})();