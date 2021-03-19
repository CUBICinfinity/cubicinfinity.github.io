/* TODO:
Support for decimal points in inputs
Possibly identify earlier repeat point for graphing purposes only.
*/ 

valueMatch = function (a1, a2) {
  if (a1[0] == a2[0] & a1[1] == a2[1]) {
    return true; 
  } else {
    return false;
  }
}

findMatch = function (aList, aTarget) {
  for (i = 0; i < aList.length; i++) {
    if (valueMatch(aList[i], aTarget)) {
      // Index of match
      return i;
    }
  }
  // No match
  return null;
}

convertToBase = function (value, base) {
  var valueB = [];
  var valueTemp = value;
  var degree = 0;
  do  {
    valueB.unshift(valueTemp % base ** (degree + 1) / base ** degree);
    valueTemp -= valueB[0] * base ** degree;
    degree++;
  } 
  while (base ** degree <= value);
  return valueB;
}

// Use only integers. I may provide support for floats later.
var num = 12713;
var den = 12011;
var base = 8;
var maxPrecision = 12011;
var modBase10 = true;

var numB = convertToBase(num, base);
var denB = convertToBase(den, base);

document.write("Computing " + num + "/" + den + " in base 10,</br>");
document.write("which appears as [" + numB + "]/[" + denB + "] in base " + 
  base + ".</br></br>");

var mod = 0;
var degree = 0;
var newNum = 0;
var div = 0;
var values = [];

for (newDigit of numB) {
  newNum = mod * base ** (degree + 1) + newDigit * base ** degree;
  div = Math.trunc(newNum / den);
  mod = newNum % den;
  values.push([div, mod]);
}

var stop = false;
var shiftCount = 0;
while (! stop) {
  if (values[0][0] == 0) {
    values.shift();
    shiftCount++;
  } else {
    stop = true;
  }
}

stop = false;
var matchIndex = null;
while (! stop) {
  newNum = mod * base ** (degree + 1);
  div = Math.trunc(newNum / den);
  mod = newNum % den;
  matchIndex = findMatch(values.slice(numB.length), [div, mod]);
  if (mod != 0 & matchIndex === null) {
    values.push([div, mod]);
  } else {
    stop = true;
  }
  if (values.length - numB.length >= maxPrecision) {
    stop = true;
  }
}

if (modBase10 == false) {
  for (i = 0; i < values.length; i++) {
    values[i][1] = convertToBase(values[i][1], base);
  }
}

for (i = 0; i < values.length; i++) {
  if (matchIndex !== null & i == matchIndex + numB.length) {
    document.write("-start of repeating values-</br>")
  }
  document.write(values[i] + "</br>");
  if (i + 1 == numB.length - shiftCount) {
    document.write("-floating point-</br>")
  }
}
