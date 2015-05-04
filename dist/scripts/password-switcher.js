//initialise with the id
function PasswordSwitcher(elemId) {
  'use strict';
  //password switcher
  var passwordInput = document.getElementById(elemId);
  //this requires that your button is directly after your input
  var btnPasswordSwitch = passwordInput.nextElementSibling;

  function init(){
    btnPasswordSwitch.addEventListener('click', togglePasswordReveal, false);
    if(supportsTouch){
      btnPasswordSwitch.addEventListener('touchend', removeClickDelay, false);
    }
    if(supportsPointer){
      btnPasswordSwitch.addEventListener('pointerup', removeClickDelay, false);
    }
  }
  function removeClickDelay(e){
      e.preventDefault();
      e.target.click();
  }
  function supportsTouch(){
     return ('ontouchstart' in window);
  }
  function supportsPointer(){
    return ('pointerdown' in window);
  }
  function togglePasswordReveal(e){
     e.preventDefault();
    (btnPasswordSwitch.classList.contains('is-active')) ? passwordInput.setAttribute('type', 'password') :  passwordInput.setAttribute('type', 'text');
    btnPasswordSwitch.classList.toggle('is-active');
  }
  init();
};

