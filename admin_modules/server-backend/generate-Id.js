// count number length
const numDigitsCount = num => (Math.log10((num ^ (num >> 31)) - (num >> 31)) | 0) + 1;

// inscrease string value
const increaseString = c => String.fromCharCode(c.charCodeAt(0) + 1);

// adding 0 in front of a string
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

// A 0 0 1
// A 0 0 2
// ...
// A 0 0 9
// A 0 1 0
// A 0 1 1
// ...
// A 0 9 9 
// A A 0 0
// A A 0 1
// ...
// A B 0 1
// ...
// A C 0 1
// ...
// A D 0 1
module.exports = (prevObjId) => {
  // regex pattern 
  let regexNumber = /\d+/g;
  let regexString = /\D+/g;

  let number = regexNumber.exec(prevObjId);
  
  //
  let realNumLength = number[0].length; // 4
  let currNumLength = numDigitsCount(parseInt(number[0])); // 1
  let icrNumLength = numDigitsCount(parseInt(number[0]) + 1); // 2

  console.log(realNumLength, currNumLength, icrNumLength,(parseInt(number[0]) + 1).pad(realNumLength));

  if((icrNumLength == currNumLength) || (icrNumLength > currNumLength && icrNumLength < realNumLength) ) {
    return prevObjId.replace(number[0],(parseInt(number[0]) + 1).pad(realNumLength));
  } else if(icrNumLength > realNumLength) {
    let string = regexString.exec(prevObjId)[0];
    console.log(string);
    let i = string.length;
    let temp = "";
    while (i--) {
      let char = string.charAt(i);
      // console.log(char);
      temp = char + temp;// BCDZZZ -> DZZZ -> EZZZ
      if(char != 'Z') { // move to next character
         // update lastChar:
        let newChar = increaseString(char); // E
        // get new string:
        let newString = newChar + temp.slice(1); // AZ
        // merge => create new objid
        prevObjId = prevObjId.replace(temp,newString);
        return prevObjId.replace(number[0],(0).pad(realNumLength));
      }
    }    
    return null;
  }
};