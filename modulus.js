/*
TODO:
Improve printing with align results
*/

/*
Optional TODO:
Draw loops on repeated digit.
Sanitize inputs (good practice for when it matters)
Make including zero in the circle an option
Expand supported values, for example, base 1
Add support for decimal points in inputs.
Identify earlier repeat point for graphing purposes only.
*/

// Next time I work on a large JS project I should use OOP.
var remainders = [];
var repeatStart = 0;

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
  // With type="number" no known NaN values exist, but the check is
  // still performed.
  var valid = true;
  var guarantee = true;

  var num = document.getElementById("numerator").value;
  if (isNaN(num) || num == 0) {
    valid = false;
    document.getElementById("numerator").style.borderColor = "red";
  } else if (num < 0) {
    guarantee = false;
    document.getElementById("numerator").style.borderColor = "yellow";
  } else {
    document.getElementById("numerator").style.removeProperty('border');
  }

  var den = document.getElementById("denominator").value;
  if (isNaN(den) || den == 0) {
    valid = false;
    document.getElementById("denominator").style.borderColor = "red";
  } else if (den < 0) {
    guarantee = false;
    document.getElementById("denominator").style.borderColor = "yellow";
  } else {
    document.getElementById("denominator").style.removeProperty('border');
  }

  var base = document.getElementById("base").value;
  if (isNaN(base) || (base < 2 & base > -2)) {
    valid = false;
    document.getElementById("base").style.borderColor = "red";
  } else if (base < -1) {
    document.getElementById("base").style.borderColor = "yellow";
    guarantee = false;
  } else {
    document.getElementById("base").style.removeProperty('border');
  }

  var precision = document.getElementById("precision").value;
  var limitPrecision = document.getElementById("limitPrecision").checked;
  if (limitPrecision == true & isNaN(precision)) {
    valid = false;
    document.getElementById("precision").style.borderColor = "red";
  } else {
    document.getElementById("precision").style.removeProperty('border');
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

  return [valid, guarantee];
}

// Generalized function to enable/disable a field using one or more checkboxes
// (That "one or more" feature was added later.)
checkField = function(checkIds, fieldId, checkToEnable = true) {
  if (typeof(checkIds) != "object") {
    checkIds = [checkIds];
  }
  var allChecked = true;
  for (id of checkIds) {
    if (document.getElementById(id).checked == false) {
      allChecked = false;
      break;
    }
  }
  if (allChecked == checkToEnable) {
    // activate field
    document.getElementById(fieldId).disabled = false;
  } else {
    // deactivate field
    document.getElementById(fieldId).disabled = true;
  }
}

// Generalized function to show/hide an element using a checkbox
showHideElement = function(checkId, elementId, checkToShow = true, 
                           showType = "block") {
  if (document.getElementById(checkId).checked == checkToShow) {
    // activate field
    document.getElementById(elementId).style.display = showType;
  } else {
    // deactivate field
    document.getElementById(elementId).style.display = "none";
  }
}

// onclick "Compute"
compute = function() {
  // Enforces only integers. I may provide support for floats later.
  var valid = validate();
  if (valid[0] == false) {
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

  // Convert if Not show remainders in base 
  var rPrint = values.map(function(row){return row[1]});
  if (modBase10 == false) {
    for (i = 0; i < rPrint.length; i++) {
      rPrint[i] = 
        ("[" + convertToBase(rPrint[i], base) + "]").replaceAll(",", " ");
    }
  }
 
 // These lines were added later to assign values for the plot.
  var i = 0;
  while (i < values.length & i < numB.length - 1) {
    if (values[i][0] == 0) {
      i++;
    } else {
      break;
    }
  }
  remainders = values.slice(i).map(function(row){return row[1]});
  if (matchIndex === null) {
    repeatStart = null;
  } else {
    repeatStart = matchIndex + numB.length - i;
  }

  // -- Displays --

  // Details message
  var computeMessage = "";
  if (valid[1] == false) {
    computeMessage += 
      "Warning: Untested/unsupported values used. Results are not guaranteed.</br></br>";
  }
  computeMessage += num + "/" + den + " appears as [" + numB + "]/[" + denB + 
    "] in base " + base + ".";
  computeMessage = computeMessage.replaceAll(",", " ");
  if (exactAnswer == false) {
    computeMessage += 
      "</br></br>The results have been truncated by \"Max precision\".";
  }
  document.getElementById("computeMessage").innerHTML = computeMessage;

  var alignValues = document.getElementById("alignValues").checked;

  // Format results
  var qString = "";
  var mString = "";
  var valueStart = false;
  
  var valuesSource = 

  pad = function() {
    if (alignValues == true) {
      var spacing = String(rPrint[i]).length - String(values[i][0]).length;
      if (spacing > 0) {
        qString += "&nbsp;".repeat(spacing);
      } else if (spacing < 0) {
        mString += "&nbsp;".repeat(-spacing);
      }
    }
  }

  if (alignValues == true) {
    qString += "<b>Quotient: &nbsp;&nbsp;</b>";
    mString += "<b>Remainders: </b>";
  }

  for (i = 0; i < values.length; i++) {
    if (i == numB.length) {
      if (qString.length == 0) {
        qString += "0 ";
        mString += rPrint[i-1] + " ";
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
      pad();
      qString += values[i][0] + " ";
      mString += rPrint[i] + " ";
    }
  }

  if (alignValues == true) {
    document.getElementById("resultAligned").style.display = "block";
    document.getElementById("resultBars").style.display = "none";
    document.getElementById("resultAligned").innerHTML = 
      "The \"Align values\" feature is not fully developed.</br>" + 
      qString + "</br>" + mString;
  } else {
    document.getElementById("resultAligned").style.display = "none";
    document.getElementById("resultBars").style.display = "block";
    // Update results bars
    document.getElementById("quotientBar").innerHTML = qString;
    document.getElementById("modulationBar").innerHTML = mString;
  }

  // Show debug info
  var debug = false;
  if (debug == true) {
    document.getElementById("debug").innerHTML = "Debug info"
    debugDiv = "";
    debugMod = "";
    for (value of values) {
      var spacing = String(value[1]).length - String(value[0]).length;
      if (spacing > 0) {
        debugDiv += "&nbsp;".repeat(spacing);
      } else if (spacing < 0) {
        debugMod += "&nbsp;".repeat(-spacing);
      }
      debugDiv += value[0] + " ";
      debugMod += value[1] + " ";
    }
    document.getElementById("debugOutput").innerHTML = debugDiv + "</br>" + 
      debugMod + "</br> matchIndex = " + matchIndex +
      "</br> remainders = " + remainders +
      "</br> repeatStart = " + repeatStart;
  }

  // Update plot
  if (document.getElementById("includePlot").checked == true) {
    draw();
  }
}

drawGradientLine = function(context, start, stop, color1, color2) {
  var grd = context.createLinearGradient(start[0], start[1], stop[0], stop[1]);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);
  context.strokeStyle = grd;
  context.beginPath();
  context.moveTo(start[0], start[1]);
  context.lineTo(stop[0], stop[1]);
  context.stroke();
}

// onclick Update
draw = function() {
  var plot = document.getElementById("plot");
  var ctx = plot.getContext("2d");
  var res = document.getElementById("resolution").value;
  var den = Math.abs(document.getElementById("denominator").value);
 
  plot.width = String(res);
  plot.height = String(res);
  
  // Draw background
  var backgroundColor = document.getElementById("backgroundColor").value;
  if (backgroundColor != "" & 
      document.getElementById("enableBackground").checked == true) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, res, res);
  }

  // Determine coordinates
  var points = [];
  var displace = true;
  if (den % 2 == 0 & displace == true) {
    var disp = 0;
  } else if (den == 1) {
    var disp = 5 / 12 * res;
  } else {
    var disp = 5 / 24 * res * (1 + Math.sin(
      Math.PI / 2 - 2 * Math.PI * Math.floor(den / 2) / den));
  }
  if (den > 500) {
    var squishFactor = 17 / 36 + den / (den ** (1 + 1 / (0.5 * Math.sqrt(den))) * 36);
  } else if (den > 62) {
    var squishFactor = 10 / 22 + den / (den ** (1 + 80 / den) * 22);
  } else if (den > 7) {
    var squishFactor = 5 / 12 + den / (den ** (1 + 10 / den) * 12);
  } else {
    var squishFactor = 5 / 12;
  }
  if (document.getElementById("showDigits").checked == true) {
    // Determine font size. fSize is also called when filling text.
    if (den > 4) {
      var fSize = Math.sqrt(res / den / 60) * 30;
    } else {
      var fSize = den * (res / den) / 15;
    }
    if (den > 99) {
      var pvDisplacement = Math.log10(den / 20) * fSize / 3;
    } else {
      var pvDisplacement = 0;
    }
  } else {
    var pvDisplacement = 0;
  }
  for (i = 0; i < den; i++) {
    var x = res / 2 + squishFactor * res * 
      Math.cos(Math.PI / 2 - (i / den) * Math.PI * 2);
    var y = disp + res / 2 - squishFactor * res * 
      Math.sin(Math.PI / 2 - (i / den) * Math.PI * 2);
    points[i] = [x + pvDisplacement, y];
  }

  // Determine thickness (point size)
  if (den < 11) {
    var radius = 10 * Math.sqrt(10 / den) * (res / 600);
  } else {
    var radius = 10 * (10 / den) * (res / 600);
  }

  // Draw points
  var pointColor = document.getElementById("pointColor").value;
  if (pointColor != "" & 
      document.getElementById("enablePoints").checked == true) {
    ctx.fillStyle = pointColor;
    for (i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i][0], points[i][1], radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  if (den != 1) {
    ctx.lineWidth = radius / 3;
    ctx.lineCap = "round";
    // Draw initial lines
    if (repeatStart === null) {
      var stopping = remainders.length - 1;
    } else {
      var stopping = repeatStart;
    }
    try {
      ctx.strokeStyle = document.getElementById("lineColor1").value;
      if (document.getElementById("enableLine1").checked == true) {
        var color1 = document.getElementById("lineColor1").value;
        var badGradient = false;
        try {
          ctx.strokeStyle = document.getElementById("gradientColor1").value;
        }
        catch {
          badGradient = true;
        }
        if (document.getElementById("enableGradient1").checked == true & 
          stopping > 0 & badGradient == false) {
          // Using gradients
          var color2 = document.getElementById("gradientColor1").value;
          for (i = 0; i < stopping; i++) {
            drawGradientLine(
              ctx, 
              points[remainders[i]], 
              points[remainders[i + 1]], 
              color1, 
              color2);
            /*
            var grd = ctx.createLinearGradient(
              points[remainders[i]][0], 
              points[remainders[i]][1],
              points[remainders[i + 1]][0], 
              points[remainders[i + 1]][1]);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.strokeStyle = grd;
            ctx.beginPath();
            ctx.moveTo(
              points[remainders[i]][0], 
              points[remainders[i]][1]);
            ctx.lineTo(
              points[remainders[i + 1]][0], 
              points[remainders[i + 1]][1]);
            ctx.stroke();
            */
          }
        } else {
          // Not using gradients
          ctx.strokeStyle = color1;
          ctx.beginPath();
          ctx.moveTo(points[remainders[0]][0], points[remainders[0]][1]);
          for (i = 1; i <= stopping; i++) {
            ctx.lineTo(points[remainders[i]][0], points[remainders[i]][1]);
          }
          ctx.stroke();
        }
      }
    }
    catch {} // Do nothing. Skipped initial line
    
    try {
      ctx.strokeStyle = document.getElementById("lineColor2").value;
      if (repeatStart !== null) {
        // Draw repeating lines
        var color1 = document.getElementById("lineColor2").value;
        var badGradient = false;
        try {
          ctx.strokeStyle = document.getElementById("gradientColor2").value;
        }
        catch {
          badGradient = true;
        }
        if (document.getElementById("enableGradient2").checked == true & 
            remainders.length > 1 & badGradient == false) {
          // Using gradients
          var color2 = document.getElementById("gradientColor2").value;
          for (i = repeatStart; i < remainders.length - 1; i++) {
            var grd = ctx.createLinearGradient(
              points[remainders[i]][0], 
              points[remainders[i]][1],
              points[remainders[i + 1]][0], 
              points[remainders[i + 1]][1]);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.strokeStyle = grd;
            ctx.beginPath();
            ctx.moveTo(points[remainders[i]][0], points[remainders[i]][1]);
            ctx.lineTo(points[remainders[i + 1]][0], points[remainders[i + 1]][1]);
            ctx.stroke();
          }
          var grd = ctx.createLinearGradient(
            points[remainders[remainders.length - 1]][0], 
            points[remainders[remainders.length - 1]][1],
            points[remainders[repeatStart]][0], 
            points[remainders[repeatStart]][1]);
          grd.addColorStop(0, color1);
          grd.addColorStop(1, color2);
          ctx.strokeStyle = grd;
          ctx.beginPath();
          ctx.moveTo(
            points[remainders[remainders.length - 1]][0], 
            points[remainders[remainders.length - 1]][1]);
          ctx.lineTo(
            points[remainders[repeatStart]][0], 
            points[remainders[repeatStart]][1]);
          ctx.stroke();
        } else {
          // Not using gradients
          ctx.strokeStyle = color1;
          ctx.beginPath();
          ctx.moveTo(points[remainders[repeatStart]][0], 
                     points[remainders[repeatStart]][1]);
          for (i = repeatStart; i < remainders.length; i++) {
            ctx.lineTo(points[remainders[i]][0], points[remainders[i]][1]);
          }
          ctx.lineTo(points[remainders[repeatStart]][0], 
                     points[remainders[repeatStart]][1]);
          ctx.stroke();
        }
      }
    }
    catch {} // Do nothing. Skipped repeating lines
  }
  
  // Draw digits
  if (document.getElementById("showDigits").checked == true) {
    ctx.fillStyle = document.getElementById("digitsColor").value;
    ctx.font = fSize + "px Inconsolata";
    if (den == 1) {
      ctx.fillText(0, res / 2 - fSize / 3, res / 2 - 2 / 3 * fSize - radius);
    } else {
      if (den > 500) {
        var squishFactor = 17 / 36 + den / (den ** (1 + 1 / Math.sqrt(den)) * 36);
      } else if (den > 35) {
        var squishFactor = 17 / 36 + den / (den ** 1.3 * 36);
      } else {
        var squishFactor = (17 / 36 + den / (den ** (1 + 6 / den) * 36));
      }
      for (i = 0; i < den; i++) {
        var x = res / 2 + squishFactor * res * 
          Math.cos(Math.PI / 2 - (i / den) * Math.PI * 2);
        var y = disp + res / 2 - squishFactor * res * 
          Math.sin(Math.PI / 2 - (i / den) * Math.PI * 2);
        ctx.fillText(i, x - fSize / 3 , y + fSize / 3);
      }
    }
  }
}