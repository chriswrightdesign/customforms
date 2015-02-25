(function(){

  "use strict";

  var d = document, 
      qs, qa,
      getStyle,
      displayWidth, 
      reportWidth,
      displayCharacters,
      reportCharacters,
      getPositionY,
      getCharactersPerLine,
      setCharacterPerLine,
      controlInputs,
      inputFontSize,
      controlPanel, 
      controlPanelBtn, 
      toggleControlPanel,
      adjustable, 
      adjustMeasure,
      stage, 
      selectType,
      testCPL,
      init,
      throttleIt;

      getStyle = function(el, styleProperty) {
        var value = el.currentStyle ? el.currentStyle[styleProperty] : d.defaultView.getComputedStyle(el,null).getPropertyValue(styleProperty);
        return value;
      };
    
      qs = function(selector) {
        return d.querySelector(selector);
      };
      qa = function(selector) {
        return d.querySelectorAll(selector);
      };

      adjustable = qa(".js-adjustable");
      controlInputs = qa(".js-controls");
      displayCharacters = qs(".js-report-cpl");
      displayWidth = qs(".js-report-width");
      stage = qs(".js-stage");
      controlPanel = qs(".js-control-panel");
      controlPanelBtn = qs(".js-toggle-control");
      inputFontSize = qs(".js-font-size");

      //based on Remy Sharps debounce
      throttleIt = function(func, delay) {

        var timer = null;

        return function(){

          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function(){
            func.apply(context, args);
          }, delay);
        };
      };
      
      getPositionY = function(elem) {

       return elem.getBoundingClientRect().top;

      };

      adjustMeasure = function(e) {
        
        //better way to do this would be to create an array from the classlist
        if(e.target.classList.contains("js-stage-width")) {
          stage.style.maxWidth = Math.round(e.target.value) + "px";
          
          reportWidth();
          var unitSize = inputFontSize.value.toString();
          unitSize += "em";
          reportCharacters("font-size", unitSize );

        } else if (e.target.classList.contains("js-font-size")) {
            for (var i = 0, lenFont = adjustable.length; i < lenFont; i++) {
              if(adjustable[i].classList.contains("is-selected")) {
                var unitSize = inputFontSize.value.toString();
                
                unitSize += "em";
                adjustable[i].style.fontSize =  unitSize;
                //only report if it's a paragraph
                if(adjustable[i].nodeName === "P") {
                  reportCharacters("font-size", unitSize);
                }
              }
            }
        } else if (e.target.classList.contains("js-line-height")){
          for (var j = 0, lenLine = adjustable.length; j < lenLine; j++) {
              if(adjustable[j].classList.contains("is-selected")) {
              
               adjustable[j].style.lineHeight =  e.target.value;
                
              }
            }

        }  
      };

      //reports the characters to display
      reportCharacters = function(styleProperty, unitSize){

        styleProperty = styleProperty || false;
        unitSize = unitSize || false;
        
        var paragraphTest = d.querySelector("p.js-adjustable");
        var chars = paragraphTest.textContent.split("");
        var displayNum = testCPL(chars, styleProperty, unitSize);
        setCharacterPerLine(displayNum);
      
      };
      testCPL = function(charArray, styleProperty, unitSize) {
        
        var avgCPL;
        var tmpParagraph = d.createElement("p");
        tmpParagraph.className = "js-duplicate";

        switch(styleProperty) {
          case "font-size":
            tmpParagraph.style.fontSize = unitSize;
            break;
          default:
            break;
        }

        for (var j = 0, charlen = charArray.length; j < charlen; j++) {
          
           var charSpan = d.createElement("span");
           charSpan.className = "js-char-temp";
           var charText = d.createTextNode(charArray[j].toString());
           charSpan.appendChild(charText);
           tmpParagraph.appendChild(charSpan);
           
        }
        stage.appendChild(tmpParagraph);

        avgCPL = getCharactersPerLine(".js-char-temp", 5);
        stage.removeChild(stage.lastElementChild);
        return avgCPL;
        
        
      };
      getCharactersPerLine = function(className, countInstances) {
        var charHeights = qa(className);
        var savePos = [];
        var lineCharCount = [];
        var counter = 0;
        var totalCount = 0;
        var checkPos = Math.round(getPositionY(charHeights[0]));

        for (var i = 0, len = charHeights.length; i < len; i++) {

           if( checkPos !==  Math.round( getPositionY(charHeights[i]))){
            checkPos = Math.round( getPositionY(charHeights[i]) );
            savePos.push( Math.round( getPositionY(charHeights[i]) ));
            lineCharCount.push(counter);
            counter = 0;
           }
           counter++;
           
        }

        for (var j = 0; j < countInstances; j++){
          totalCount += parseInt(lineCharCount[j], 10);
        }
        totalCount = totalCount / countInstances;

        //create an average of lineChar counts
        return totalCount;
       

      };
      setCharacterPerLine = function(numCPL){

        displayCharacters.textContent = "Approx. CPL: " + Math.round(numCPL);

      };
      reportWidth = function(){

        displayWidth.textContent = parseInt(getStyle(stage, "max-width"), 10) + "px";

      };
      selectType = function(e) {
        e.target.classList.toggle("is-selected");
      };
      toggleControlPanel = function(e){
        e.preventDefault();
        controlPanel.classList.toggle("is-active");
      };

      init = function(){
        for (var i = 0, len = controlInputs.length; i < len; i++){
          controlInputs[i].addEventListener("change", adjustMeasure, false);
          controlInputs[i].addEventListener("input", adjustMeasure, false);
        }
        for (var j = 0, adjlen = adjustable.length; j < adjlen; j++){
          adjustable[j].addEventListener("click", selectType, false);
        }
        controlPanelBtn.addEventListener("click", toggleControlPanel, false);
        reportWidth();
       reportCharacters();
      };
      init();
      
})();