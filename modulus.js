/* TODO:
Support for decimal points in inputs
Possibly identify earlier repeat point for graphing purposes only.
*/ 

valueMatch = function(a1, a2) {
  if (a1[0] == a2[0] & a1[1] == a2[1]) {
    return true; 
  } else {
    return false;
  }
}

findMatch = function(aList, aTarget) {
  for (i = 0; i < aList.length; i++) {
    if (valueMatch(aList[i], aTarget)) {
      // Index of match
      return i;
    }
  }
  // No match
  return null;
}

convertToBase = function(value, base) {
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

validate = function() {
  var valid = true;
  if (isNaN(document.getElementById("numerator").value)) {
    valid = false;
    // higlight field
  }
  if (isNaN(document.getElementById("denominator").value)) {
    valid = false;
    // higlight field
  }
  if (isNaN(document.getElementById("base").value)) {
    valid = false;
    // higlight field
  }
  if (document.getElementById("limitPrecision").checked == true &
      isNaN(document.getElementById("precision").value)) {
    valid = false;
    // higlight field
  }
  document.getElementById("numerator").value = 
    Math.round(document.getElementById("numerator").value);
  document.getElementById("denominator").value = 
    Math.round(document.getElementById("denominator").value);
  document.getElementById("base").value = 
    Math.round(document.getElementById("base").value);
  document.getElementById("precision").value = 
    Math.round(document.getElementById("precision").value);
}

// TODO: implement this with `checkField(limitPrecision, precision);`
checkField = function(checkId, fieldId, checkToEnable = true) {
  if (document.getElementById(checkId).checked == checkToEnable) {
    // activate field
  } else {
    // deactivate field
  }
}

compute = function() {
  if (validate() == false) {
    return
  }
  // Use only integers. I may provide support for floats later.
  var num = document.getElementById("numerator").value;
  var den = document.getElementById("denominator").value;
  var base = document.getElementById("base").value;

  if (document.getElementById("limitPrecision").checked == true) {
    var maxPrecision = document.getElementById("precision").value;
  } else {
    var maxPrecision = null;
  }

  //var repeatOnly = document.getElementById("repeatOnly").checked; 
  var modBase10 = document.getElementById("modBase10").checked;

  var numB = convertToBase(num, base);
  var denB = convertToBase(den, base);

  document.getElementById("computeMessage").innerHTML = num + "/" + den + 
    " appears as [" + numB + "]/[" + denB + "] in base " + base + ".";

  var mod = 0;
  var newNum = 0;
  var div = 0;
  var values = [];

  for (newDigit of numB) {
    newNum = mod * base + newDigit;
    div = Math.trunc(newNum / den);
    mod = newNum % den;
    values.push([div, mod]);
  }

  var stop = false;
  var shiftCount = 0;
  while (! stop) {
    if (values.length == 0) {
      stop = true;
    } else if (values[0][0] == 0) {
      values.shift();
      shiftCount++;
    } else {
      stop = true;
    }
  }

  stop = false;
  var matchIndex = null;
  while (! stop) {
    newNum = mod * base;
    div = Math.trunc(newNum / den);
    mod = newNum % den;
    matchIndex = findMatch(values.slice(numB.length - shiftCount), [div, mod]);
    if (mod != 0 & matchIndex === null) {
      values.push([div, mod]);
    } else {
      stop = true;
    }
    if (maxPrecision !== null & values.length - numB.length >= maxPrecision) {
      stop = true;
    }
  }

  if (modBase10 == false) {
    for (i = 0; i < values.length; i++) {
      values[i][1] = "[" + convertToBase(values[i][1], base) + "]";
    }
  }

  var qString = "";
  var mString = "";
  for (i = 0; i < values.length; i++) {
    if (i == numB.length - shiftCount) {
      qString += ". ";
      mString += "| ";
    }
    if (matchIndex !== null & i + 1 == matchIndex + numB.length) {
      qString += "R> ";
      mString += "R> ";
    }
    qString += values[i][0] + " ";
    mString += values[i][1] + " ";
  }
  document.getElementById("quotientBar").innerHTML = qString;
  document.getElementById("modulationBar").innerHTML = mString;
}
