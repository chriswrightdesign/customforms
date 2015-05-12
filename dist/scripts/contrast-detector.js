var ContrastDetector = function(elemTest, expected) {
    //does not detect apple invert colours

    var colorCheck = trimWhiteSpace(expected), //something like #fff;
    expectedType, computedColor,
    checkElement = document.querySelector(elemTest);

    function getColor(){
        computedColor = trimWhiteSpace(window.getComputedStyle(checkElement).getPropertyValue("background-color"));

    };
    function checkExpectedType(expectedColor){
        if(expectedColor.charAt(0) === "#"){
            if(expectedColor.length === 7){
                return "HexLong";
            } else if(expectedColor.length === 4){
                return "HexShort";
            }
        } else if (expectedColor.charAt(0) === "r" && expectedColor.charAt(3) === "("){
            return "RGB";
        } else if (expectedColor.charAt(0) === "r" && expectedColor.charAt(3) === "a"){
            return "RGBA";
        } else {
            //it's a color;
            return "word";
        }

        //checks to see what format the expected color is, then returns type
        //RGB: - if string starts with rgb
        //RGBA: - if string starts with rgba

        //HEX: short - if string starts with # and has 3 characters after
        //HEX: long - if string starts with # and has 6 characters after
        //if it's none of these they probably passed in an actual color like 'red';

    }
    function expandHexValue(hexExpected){
        //if the hex value is 4 characters long, we want to split it
        //and double each of the last 3 characters
        var newString = "#";
        //start at 1, since we already know 0 is #
        for (var i = 1, len = hexExpected.length; i < len; i++){
            newString += (hexExpected.charAt(i) + hexExpected.charAt(i));
        }
        console.log(newString);
        return newString;
    }
    function trimWhiteSpace(theString){
        return theString.replace(/\s+/g, '');
    }
    function convertToHexValue(theColor){
        console.log(theColor);
        var hexChars = '0123456789ABCDEF';
        var rgb = theColor.match(/\d+/g);
        var r = parseInt(rgb[0]).toString(16);
        var g = parseInt(rgb[1]).toString(16);
        var b = parseInt(rgb[2]).toString(16);
        var hex = '#' + r + g + b;
        computedColor = hex;
    };
    function compareColors(detectedColor, expectedColor){
        console.log("inside compare colors");
        console.log("Detected color is: " + detectedColor);
        console.log("Expected color is: " + expectedColor);

        if(detectedColor !== expectedColor){
            console.log("The color you expected was: " + expectedColor + " but what we saw was: "+ detectedColor);
            document.body.classList.add('high-contrast');
        } else {
            console.log("Found a match");
        }
    };
    function init(){

         expectedType = checkExpectedType(expected);

         if(expectedType === "HexShort"){
            expected = expandHexValue(expected);
            convertToHexValue(computedColor);
         }

         getColor();
         if(expectedType !== "RGB" || expectedType !== "RGBA"){

         }
         compareColors(computedColor, expected);
    }
    init();

};