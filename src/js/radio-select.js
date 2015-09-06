(function(){
    var d = document,
    $ = function(selector){
        return d.querySelector(selector);
    }

    var selectButton = $('.js-select-toggle'),
        selectDropdown = $('.js-select-dropdown'),
        selectChildren = selectDropdown.children,
        selectOptions = [],
        currentlySelectedOption = 1;

    var init = function(){
        //save all the inputs to memory
        for (var i = 0, len = selectDropdown.children.length; i < len; i++){
            if(selectDropdown.children[i].nodeName == "INPUT"){
                selectOptions.push(selectDropdown.children[i]);
            }
        }
    }
    var checkSelected = function(){
        for (var i = 0, len = selectOptions.length; i < len; i++){
            if(selectOptions[i].checked){
                console.log(selectOptions[i].dataset.name + " was selected");
                currentlySelectedOption = (i + 1);
            }
        }
    }

    var selectToggle = function(){
        checkSelected();
        selectDropdown.classList.toggle('is-active');
        selectButton.classList.toggle('is-active');
        selectDropdown.children[currentlySelectedOption].focus();
    }

    var closeDropdown = function(){
        selectDropdown.classList.remove('is-active');
    }
    var handleKeys = function(e){
        switch(e.keyCode){
            case 13:
            case 32:
            case 9:
                closeDropdown();
                selectButton.focus();


            break;
            case 40:
            case 37: // Down, Left

                //focus the next one
                break;
            case 38:
            case 39:

                //focus the previous one
                 // Top, Right
            break;
        }

        //e.preventDefault();
    }
    var handleClick = function(e){
        console.log(e);
        //e.preventDefault();
        //updateButtonText(e.target.dataset.name);
       // closeDropdown();
        //selectButton.focus();
    }
    var handleChange = function(e){
        updateButtonText(e.target.dataset.name);

        //when a change occurs update which is currently selected
    }
    var updateButtonText = function(selectTitle){
        selectButton.textContent = selectTitle;
    }

    init();
     for (var i = 0, len = selectOptions.length; i < len; i++){
           selectOptions[i].addEventListener('keydown', handleKeys, false);
           // selectOptions[i].addEventListener('click', handleClick, false);
           selectOptions[i].addEventListener('change', handleChange, false);

    }
    selectButton.addEventListener('click', selectToggle, false);


   //1. spacebar on the button ( works )
   //2. tab should close it
   //
   //3. not having JS should mean the dropdown is always open /
   //potentially JS is inserting the component
   //4. clicking clicking off the select should automatically close it
   //

})();