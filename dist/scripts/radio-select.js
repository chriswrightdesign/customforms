(function(){
    var d = document,
    $ = function(selector){
        return d.querySelector(selector);
    }
    var selectButton = $('.js-select-toggle'),
        selectDropdown = $('.js-select-dropdown');

    var selectToggle = function(){
        selectDropdown.classList.toggle('is-active');
        selectDropdown.children[1].focus();
    }
    var selectClose = function(e){
        //e.preventDefault();
        setButtonText(e.target.dataset.name);
       // selectDropdown.classList.remove('is-active');
    }
    var setButtonText = function(selectTitle){
        selectButton.textContent = selectTitle;
    }
    selectDropdown.addEventListener('click', selectClose, false);
    selectButton.addEventListener('click', selectToggle, false);

   //spacebar on the button ( works )

})();