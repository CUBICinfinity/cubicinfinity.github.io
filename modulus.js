/*------------------------------------------------------------------------------
TODO:
Improve printing with align results

Optional TODO:
Make Compute and Update buttons "tabbable"
Draw loops on repeated digits
Sanitize inputs &/| escape outputs (a good practice, even if not necessary here)

Unlikely TODO:
Make including zero in the circle an option
Expand on supported values; perhaps include base 1.
Add support for decimal points in inputs.
Identify earlier repeat point, for graphing purposes only.

Other comments:

Use statistics to get the draw() math right in future. This would be more 
reproducable and result in simpler formulas.

Next time I work on a large JS project I should use OOP; it will help with 
organizational issues.
------------------------------------------------------------------------------*/

var remainders = [];
var repeatStart = 0;
var den = 0;
var plotReady = false;

// Compare the values of two length 2 arrays
function valueMatch(a1, a2) {
  if (a1[0] == a2[0] && a1[1] == a2[1]) {
    return true;
  } else {
    return false;
  }
}

// Return index of first matching row in 2 column array
// `aList` is 2d array, `aTarget` is 1d array
function findMatch(aList, aTarget) {
  for (var i = 0; i < aList.length; i++) {
    if (valueMatch(aList[i], aTarget)) {
      // Index of match
      return i;
    }
  }
  // No match
  return null;
}

// Convert a base-10 number to another base
function convertToBase(value, base) {
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
function validateNumbers() {
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
  if (isNaN(base) || (base < 2 && base > -2)) {
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
  if (limitPrecision == true && isNaN(precision)) {
    valid = false;
    document.getElementById("precision").style.borderColor = "red";
  } else if (precision < 1) {
    document.getElementById("precision").style.borderColor = "yellow";
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

function validateAppearance() {
  var valid = true;

  var res = document.getElementById("resolution").value;
  if (isNaN(res) || res < 1) {
    valid = false;
    document.getElementById("resolution").style.borderColor = "red";
  } else {
    document.getElementById("resolution").style.removeProperty('border');
  }

  return valid;
}

// Generalized function to enable/disable a field using one or more checkboxes
// (That "one or more" feature was added later.)
function checkField(checkIds, fieldId, checkToEnable = true) {
  if (typeof(checkIds) != "object") {
    checkIds = [checkIds];
  }
  var allChecked = true;
  for (var id of checkIds) {
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
function showHideElement(checkId, elementId, checkToShow = true, 
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
function compute() {
  // Enforces only integers. I may provide support for floats later.
  var valid = validateNumbers();
  if (valid[0] == false) {
    return;
  }

  // Test replaceAll
  try {
    "cut".replaceAll("u", "a");
  }
  catch {
    document.getElementById("debug").innerHTML = 
      "`String.replaceAll` doesn't appear to be supported by this browser." +
      "<br/> See <a href = https://caniuse.com/?search=replaceall> " +
      "https://caniuse.com/?search=replaceall to learn about updates.</a>";
    return;
  }
  document.getElementById("debug").innerHTML = "";

  // Unhide plot
  document.getElementById("plot").style.display = "block";
  
  // Copy values from form
  var num = document.getElementById("numerator").value;
  den = document.getElementById("denominator").value;
  var base = document.getElementById("base").value;
  var maxPrecision = null;
  if (document.getElementById("limitPrecision").checked == true) {
    maxPrecision = document.getElementById("precision").value;
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
  for (var newDigit of numB) {
    newNum = mod * base + newDigit;
    div = Math.trunc(newNum / den);
    mod = newNum % den;
    values.push([div, mod]);
  }
  
  // Continued long division after no more digits from initial numerator
  var stop = false;
  var exactAnswer = true;
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
    if (! (values.length >= numB.length && mod == 0 && div == 0) && 
        matchIndex === null) {
      values.push([div, mod]);
    } else {
      stop = true;
    }
    // Stop if precision limit is met
    if (maxPrecision !== null && values.length - numB.length >= maxPrecision) {
      exactAnswer = false;
      stop = true;
    }
  }

  // Convert if Not show remainders in base 
  var rPrint = values.map(function(row){ return row[1]; });
  if (modBase10 == false) {
    for (i = 0; i < rPrint.length; i++) {
      rPrint[i] = 
        ("[" + convertToBase(rPrint[i], base) + "]").replaceAll(",", " ");
    }
  }
 
 // These lines were added later to assign values for the plot.
  var i = 0;
  while (i < values.length && i < numB.length - 1) {
    if (values[i][0] == 0) {
      i++;
    } else {
      break;
    }
  }
  remainders = values.slice(i).map(function(row){ return row[1]; });
  if (matchIndex === null) {
    repeatStart = null;
  } else {
    repeatStart = matchIndex + numB.length - i;
  }
  
  // Displays
  displayOutputs(valid, exactAnswer, values, matchIndex, rPrint, 
    num, den, numB, denB, base);

  plotReady = true;

  // Update plot
  if (document.getElementById("includePlot").checked == true) {
    draw();
  }
}

function displayOutputs(valid, exactAnswer, values, matchIndex, rPrint, 
  num, den, numB, denB, base) {
  // Details message
  var computeMessage = "";
  if (valid[1] == false) {
    computeMessage += 
      "Warning: Untested/unsupported values used. " +
      "Results are not guaranteed.</br></br>";
  }
  computeMessage += num + "/" + den + " appears as [" + numB + "]/[" + denB + 
    "] in base " + base + ".";
  computeMessage = computeMessage.replaceAll(",", " ");
  if (exactAnswer == false) {
    computeMessage += "</br></br>" + 
    "Warning: The results have been truncated by \"Max precision\".";
  }
  document.getElementById("computeMessage").innerHTML = computeMessage;

  if (document.getElementById("displayValues").checked == true) {
    var alignValues = document.getElementById("alignValues").checked;
    var qString = "";
    var mString = "";
    var valueStart = false;
    var spacing;
    
    // Format results

    if (alignValues == true) {
      qString += "<b>Quotient: &nbsp;&nbsp;</b>";
      mString += "<b>Remainders: </b>";
    }

    for (var i = 0; i < values.length; i++) {
      if (i == numB.length) {
        if (qString.length == 0) {
          qString += "0 ";
          mString += rPrint[i-1] + " ";
        }
        qString += ". ";
        mString += "| ";
      }
      if (matchIndex !== null && i == matchIndex + numB.length) {
        qString += "R> ";
        mString += "R> ";
      }
      // Excludes leading zeros and uninteresting remainders
      if (i >= numB.length || values[i][0] != 0) {
        valueStart = true;
      }
      if (valueStart == true) {
        if (alignValues == true) {
          spacing = String(rPrint[i]).length - String(values[i][0]).length;
          if (spacing > 0) {
            qString += "&nbsp;".repeat(spacing);
          } else if (spacing < 0) {
            mString += "&nbsp;".repeat(-spacing);
          }
        }
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

  } else {
    // Hide values
    document.getElementById("resultBars").style.display = "none";
    document.getElementById("resultAligned").style.display = "none";
  }
}

// Test input colors
function validateColor(context, color) {
  // validateNumbers() may also work better with try..catch statements.
  try {
    context.createLinearGradient(0, 0, 1, 1).addColorStop(0, color);
  }
  catch {
    return false;
  }
  return true;
}

function drawGradientLine(context, start, stop, color1, color2) {
  var grd = context.createLinearGradient(start[0], start[1], stop[0], stop[1]);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);
  context.strokeStyle = grd;
  context.beginPath();
  context.moveTo(start[0], start[1]);
  context.lineTo(stop[0], stop[1]);
  context.stroke();
}

// onclick Update. Also executed after compute()
function draw() {
  if (plotReady == false) {
    compute();
    return;
  }
  if (validateAppearance() == false) {
    return;
  }

  var plot = document.getElementById("plot");
  var ctx = plot.getContext("2d");
  var res = document.getElementById("resolution").value;
  var absDen = Math.abs(den);
 
  plot.width = String(res);
  plot.height = String(res);
  
  // Draw background
  if (document.getElementById("enableBackground").checked == true &&
      validateColor(ctx, document.getElementById("backgroundColor").value) == 
      true) {
    ctx.fillStyle = document.getElementById("backgroundColor").value;
    ctx.fillRect(0, 0, res, res);
  }

  // Determine coordinates..

  var points = [];
  var displace = true;
  var disp; // vertical point displacement

  if (absDen % 2 == 0 && displace == true) {
    // No adjustment for even numbered denominators
    disp = 0;
  } else if (absDen == 1) {
    disp = 5 / 12 * res;
  } else {
    disp = 5 / 24 * res * (1 + Math.sin(
      Math.PI / 2 - 2 * Math.PI * Math.floor(absDen / 2) / absDen));
  }
  
  var fSize;
  var pvDisplacement = 0; // "Place value displacement"
  if (document.getElementById("showDigits").checked == true) {
    // Determine font size. fSize is also called when filling text.
    if (absDen > 4) {
      fSize = Math.sqrt(res / absDen / 60) * 30;
    } else {
      fSize = absDen * (res / absDen) / 15;
    }
    if (absDen > 99) {
      // Shift circle of points to the right when digits are longer on the left.
      pvDisplacement = Math.log10(absDen / 20) * fSize / 3;
    }
  }
  
  var squishFactor;
  if (absDen > 500) {
    squishFactor = 17 / 36 + absDen / 
      (absDen ** (1 + 1 / (0.5 * Math.sqrt(absDen))) * 36);
  } else if (absDen > 62) {
    squishFactor = 10 / 22 + absDen / (absDen ** (1 + 80 / absDen) * 22);
  } else if (absDen > 7) {
    squishFactor = 5 / 12 + absDen / (absDen ** (1 + 10 / absDen) * 12);
  } else {
    squishFactor = 5 / 12;
  }
  
  var x;
  var y;
  for (var i = 0; i < absDen; i++) {
    x = res / 2 + squishFactor * res * 
      Math.cos(Math.PI / 2 - (i / absDen) * Math.PI * 2);
    y = disp + res / 2 - squishFactor * res * 
      Math.sin(Math.PI / 2 - (i / absDen) * Math.PI * 2);
    points[i] = [x + pvDisplacement, y];
  }

  // Determine brush thickness (point size)
  var radius;
  if (absDen < 11) {
    radius = 10 * Math.sqrt(10 / absDen) * (res / 600);
  } else {
    radius = 10 * (10 / absDen) * (res / 600);
  }

  // Draw points
  if (document.getElementById("enablePoints").checked == true && 
      validateColor(ctx, document.getElementById("pointColor").value) == 
      true) {
    ctx.fillStyle = document.getElementById("pointColor").value;
    for (i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i][0], points[i][1], radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  // Draw digits
  var digitSquishFactor = squishFactor;
  if (document.getElementById("showDigits").checked == true &&
      validateColor(ctx, document.getElementById("digitsColor").value) == 
      true) {
    ctx.fillStyle = document.getElementById("digitsColor").value;
    ctx.font = fSize + "px Inconsolata";
    if (absDen == 1) {
      ctx.fillText(0, res / 2 - fSize / 3, res / 2 - 2 / 3 * fSize - radius);
    } else {
      if (absDen > 500) {
        digitSquishFactor = 17 / 36 + absDen / 
          (absDen ** (1 + 1 / Math.sqrt(absDen)) * 36);
      } else if (absDen > 35) {
        digitSquishFactor = 17 / 36 + absDen / (absDen ** 1.3 * 36);
      } else {
        digitSquishFactor = 17 / 36 + absDen / 
          (absDen ** (1 + 6 / absDen) * 36);
      }
      for (i = 0; i < absDen; i++) {
        x = res / 2 + digitSquishFactor * res * 
          Math.cos(Math.PI / 2 - (i / absDen) * Math.PI * 2);
        y = disp + res / 2 - digitSquishFactor * res * 
          Math.sin(Math.PI / 2 - (i / absDen) * Math.PI * 2);
        ctx.fillText(i, x - fSize / 3 , y + fSize / 3);
      }
    }
  }

  // Don't draw lines for only one point.
  if (absDen == 1) {
   return;
  }

  // Draw lines...

  // Line style
  ctx.lineWidth = radius / 3;
  ctx.lineCap = "round";
  
  // Variables to use
  var stopping;
  if (repeatStart === null) {
    stopping = remainders.length - 1;
  } else {
    stopping = repeatStart;
  }
  var color1 = "";
  var color2 = "";

  // Validate initial line inputs
  var validColor = 
    validateColor(ctx, document.getElementById("lineColor1").value);
  var validGradient = 
    validateColor(ctx, document.getElementById("gradientColor1").value);

  // Draw initial lines
  if (document.getElementById("enableLine1").checked == true &&
      validColor == true) {
    color1 = document.getElementById("lineColor1").value;
    if (document.getElementById("enableGradient1").checked == true && 
        stopping > 0 && validGradient == true) {
      // Using gradients
      color2 = document.getElementById("gradientColor1").value;
      for (i = 0; i < stopping; i++) {
        drawGradientLine(ctx, points[Math.abs(remainders[i])], 
          points[Math.abs(remainders[i + 1])], color1, color2);
      }
    } else {
      // Not using gradients
      ctx.strokeStyle = color1;
      ctx.beginPath();
      ctx.moveTo(points[Math.abs(remainders[0])][0], 
                 points[Math.abs(remainders[0])][1]);
      for (i = 1; i <= stopping; i++) {
        ctx.lineTo(points[Math.abs(remainders[i])][0], 
                   points[Math.abs(remainders[i])][1]);
      }
      ctx.stroke();
    }
  }
    
  // Validate repeating line inputs
  validColor = 
    validateColor(ctx, document.getElementById("lineColor2").value);
  validGradient = 
    validateColor(ctx, document.getElementById("gradientColor2").value);

  // Draw repeating lines
  if (repeatStart !== null && validColor == true) {
    color1 = document.getElementById("lineColor2").value;
    if (document.getElementById("enableGradient2").checked == true && 
        remainders.length > 1 && validGradient == true) {
      // Using gradients
      color2 = document.getElementById("gradientColor2").value;
      for (i = repeatStart; i < remainders.length - 1; i++) {
        drawGradientLine(ctx, points[Math.abs(remainders[i])], 
          points[Math.abs(remainders[i + 1])], color1, color2);
      }
      drawGradientLine(ctx, 
        points[Math.abs(remainders[remainders.length - 1])], 
        points[Math.abs(remainders[repeatStart])], color1, color2);
    } else {
      // Not using gradients
      ctx.strokeStyle = color1;
      ctx.beginPath();
      ctx.moveTo(points[Math.abs(remainders[repeatStart])][0], 
                 points[Math.abs(remainders[repeatStart])][1]);
      for (i = repeatStart; i < remainders.length; i++) {
        ctx.lineTo(points[Math.abs(remainders[i])][0], 
                   points[Math.abs(remainders[i])][1]);
      }
      ctx.lineTo(points[Math.abs(remainders[repeatStart])][0], 
                 points[Math.abs(remainders[repeatStart])][1]);
      ctx.stroke();
    }
  }
}
