//initialise with the id
//TODO: Add keyboard support to both input and button
function PasswordSwitcher(elemId) {
  'use strict';
  //password switcher
  var passwordInput = document.getElementById(elemId);
  //this requires that your button is directly after your input
  var btnPasswordSwitch = passwordInput.nextElementSibling;

  function init(){
    btnPasswordSwitch.addEventListener('click', togglePasswordReveal, false);
    btnPasswordSwitch.addEventListener('keyup', keyBack, false);
    passwordInput.addEventListener('keyup', keyReveal, false);
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
  //if the user wants to change their password,
  //after it has been revealed
  //let them focus back on the input
  function keyReveal(e){
    switch(e.keyCode){
      case 40:
      case 38:
        revealPassword();
        break;
    }
  }
  function keyBack(e){
    switch(e.keyCode){
      case 37:
        passwordInput.focus();
        break;

    }

  }
  function revealPassword(){
    (btnPasswordSwitch.classList.contains('is-active')) ? passwordInput.setAttribute('type', 'password') :  passwordInput.setAttribute('type', 'text');
    btnPasswordSwitch.classList.toggle('is-active');
  }
  function togglePasswordReveal(){
     e.preventDefault();


  }
  init();
};

