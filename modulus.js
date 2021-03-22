/* Possible TODO:
Add support for decimal points in inputs.
Identify earlier repeat point for graphing purposes only.
*/ 

// Compare the values of two length 2 arrays
valueMatch = function(a1, a2) {
  if (a1[0] == a2[0] & a1[1] == a2[1]) {
    return true; 
  } else {
    return false;
  }
}

// Return index of first matching row in 2 column array
// `aList` is 2d array, `aTarget` is 1d array
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

// Convert a base-10 number to another base
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

// Validate and modify form values
validate = function() {
  // With number input type this currently never returns false.
  var valid = true;
  if (isNaN(document.getElementById("numerator").value)) {
    valid = false;
    document.getElementById("numerator").style.borderColor = "red";
  }
  if (isNaN(document.getElementById("denominator").value)) {
    valid = false;
    document.getElementById("denominator").style.borderColor = "red";
  }
  if (isNaN(document.getElementById("base").value)) {
    valid = false;
    document.getElementById("base").style.borderColor = "red";
  }
  if (document.getElementById("limitPrecision").checked == true &
      isNaN(document.getElementById("precision").value)) {
    valid = false;
    document.getElementById("precision").style.borderColor = "red";
  }

  // Round values
  document.getElementById("numerator").value = 
    Math.round(document.getElementById("numerator").value);
  document.getElementById("denominator").value = 
    Math.round(document.getElementById("denominator").value);
  document.getElementById("base").value = 
    Math.round(document.getElementById("base").value);
  document.getElementById("precision").value = 
    Math.round(document.getElementById("precision").value);

  return valid;
}

// Generalized function to enable/disable a field using a checkbox
checkField = function(checkId, fieldId, checkToEnable = true) {
  if (document.getElementById(checkId).checked == checkToEnable) {
    // activate field
    document.getElementById(fieldId).disabled = false;
  } else {
    // deactivate field
    document.getElementById(fieldId).disabled = true;
  }
}

// onclick "Compute"
compute = function() {
  // Enforces only integers. I may provide support for floats later.
  if (validate() == false) {
    return
  }
  
  // Copy values from form
  var num = document.getElementById("numerator").value;
  var den = document.getElementById("denominator").value;
  var base = document.getElementById("base").value;
  if (document.getElementById("limitPrecision").checked == true) {
    var maxPrecision = document.getElementById("precision").value;
  } else {
    var maxPrecision = null;
  }
  var modBase10 = document.getElementById("modBase10").checked;

  // Create arrays of "digits" in `base`
  var numB = convertToBase(num, base);
  var denB = convertToBase(den, base);

  // Intermediate numerator
  var newNum = 0;
  // Divisor
  var div = 0;
  // Remainder
  var mod = 0;
  // Storage of divisor digits and remainder sequence
  var values = [];

  // Initial long division
  for (newDigit of numB) {
    newNum = mod * base + newDigit;
    div = Math.trunc(newNum / den);
    mod = newNum % den;
    values.push([div, mod]);
  }
  
  // Continued long division after no more digits from initial numerator
  stop = false;
  exactAnswer = true;
  // `matchIndex` is the location after the floating point where digits repeat.
  var matchIndex = null;
  while (! stop) {
    newNum = mod * base;
    div = Math.trunc(newNum / den);
    mod = newNum % den;
    if (values.length > numB.length) {
      // Look for matching div and mod after floating point
      matchIndex = findMatch(values.slice(numB.length), [div, mod]);
    }
    // Stop if repeating sequence has been identified or solution is round
    if (! (values.length >= numB.length & mod == 0 & div == 0) & 
        matchIndex === null) {
      values.push([div, mod]);
    } else {
      stop = true;
    }
    // Stop if precision limit is met
    if (maxPrecision !== null & values.length - numB.length >= maxPrecision) {
      exactAnswer = false;
      stop = true;
    }
  }

  // Convert if Not show remainders in base 10
  if (modBase10 == false) {
    for (i = 0; i < values.length; i++) {
      values[i][1] = 
        ("[" + convertToBase(values[i][1], base) + "]").replaceAll(",", " ");
    }
  }

  // -- Displays --

  // Details message
  computeMessage = num + "/" + den + " appears as [" + numB + "]/[" + denB + 
    "] in base " + base + ".";
  computeMessage = computeMessage.replaceAll(",", " ");
  if (exactAnswer == false) {
    computeMessage += 
      "</br></br>Warning: The results have been truncated by maxPrecision.";
  }
  document.getElementById("computeMessage").innerHTML = computeMessage;

  // Format results
  var qString = "";
  var mString = "";
  valueStart = false;
  for (i = 0; i < values.length; i++) {
    if (i == numB.length) {
      if (qString.length == 0) {
        qString += "0 ";
      }
      qString += ". ";
      mString += "| ";
    }
    if (matchIndex !== null & i == matchIndex + numB.length) {
      qString += "R> ";
      mString += "R> ";
    }
    // Excludes leading zeros and uninteresting remainders
    if (i >= numB.length || values[i][0] != 0) {
      valueStart = true;
    }
    if (valueStart == true) {
      qString += values[i][0] + " ";
      mString += values[i][1] + " ";
    }
  }

  // Update results bars
  document.getElementById("quotientBar").innerHTML = qString;
  document.getElementById("modulationBar").innerHTML = mString;

  // Show debug info
  debug = false;
  if (debug == true) {
    document.getElementById("debug").innerHTML = "Debug info"
    debugDiv = "";
    debugMod = "";
    for (value of values) {
      // This spacing could be made a feature for displaying the normal results.
      spacing = String(value[1]).length - String(value[0]).length;
      if (spacing > 0) {
        debugDiv += "&nbsp;".repeat(spacing);
      } else if (spacing < 0) {
        debugMod += "&nbsp;".repeat(-spacing);
      }
      debugDiv += value[0] + " ";
      debugMod += value[1] + " ";
    }
    document.getElementById("debugOutput").innerHTML = debugDiv + "</br>" + 
      debugMod + "</br> matchIndex = " + matchIndex;
  }
}
