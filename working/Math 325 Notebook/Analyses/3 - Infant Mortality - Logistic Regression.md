---
title: "Simple Logistic Regression"
output:
  html_document:
    theme: lumen
    highlight: zenburn
    code_folding: hide
    keep_md: true
---


<center>

## Introduction
</center>
<div style="padding-left:50px;padding-right:50px;">
**This data table includes the infant mortality rates and GDP for most countries from 1998. It is the 'UN' data frame from the United Nations website included in the 'car' library. </br>
The infant mortality rate (IMR) is the number of children who die in their first year out of every 1,000 live births.</br>
The GDP indicates the GDP per capita, measured in USD.**


```r
datatable(un1, options=list(lengthMenu = c(3,15,45,207)))
```

<!--html_preserve--><div id="htmlwidget-e050276ee5e2bd4ded06" style="width:100%;height:auto;" class="datatables html-widget"></div>
<script type="application/json" data-for="htmlwidget-e050276ee5e2bd4ded06">{"x":{"filter":"none","data":[["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207"],["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Antigua","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Dem Rep of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Gaza Strip","Georgia","Germany","Ghana","Greece","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Dem Peoples Rep","Korea, Republic of","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Kitts","Saint Lucia","Samoa","San Marino","Sao Tome","Saudi Arabia","Senegal","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands","Western Sahara","Yemen","Yugoslavia","Zambia","Zimbabwe"],[154,32,44,11,null,124,24,22,25,6,6,33,14,18,78,9,15,7,30,84,104,66,13,56,42,9,16,97,114,102,58,6,41,96,115,13,38,24,82,90,26,12,10,9,7,9,89,7,106,null,34,135,46,54,39,107,98,12,107,20,5,7,22,10,85,122,37,23,6,73,8,14,8,10,40,124,132,58,82,35,5,14,5,72,48,39,95,6,7,7,86,12,4,30,34,65,65,22,9,14,39,86,16,29,72,153,56,null,13,6,8,23,77,142,11,49,149,8,26,7,92,15,31,20,26,null,52,51,110,78,60,82,6,10,18,7,44,114,77,2,5,25,74,25,21,61,39,45,35,13,8,9,17,7,24,19,125,25,18,58,null,51,23,62,12,169,5,12,7,23,112,48,7,15,19,71,24,65,5,5,33,56,80,30,86,3,14,37,44,57,null,113,18,15,6,7,17,43,38,21,37,12,64,80,19,103,68],[2848,863,1531,null,null,355,6966,8055,354,20046,29006,321,12545,9073,280,7173,994,26582,2569,391,166,909,271,3640,4510,16683,1518,165,205,130,627,18943,994,379,187,4736,582,2215,367,1008,5432,2696,4014,1983,11459,4450,117,33191,893,2831,1508,null,1565,973,1660,388,96,2433,96,2593,24453,26444,23530,19766,5007,321,null,343,29632,397,8684,2485,9145,null,1392,442,131,726,386,697,22898,4325,26217,365,1019,1544,11308,17419,16738,19121,736,1779,41718,1228,995,330,654,271,9736,15757,331,359,1764,3114,486,1124,5498,42416,1595,35109,null,1660,215,142,4313,1079,223,8793,1649,12717,401,3508,2700,2104,383,26470,388,1265,77,2399,2059,203,25635,9039,19450,16866,464,207,587,null,33734,6232,504,6417,2934,1083,1860,2497,1093,3058,10428,12213,14013,11854,1570,2451,238,4819,3183,1106,19121,49,6583,572,7272,293,25581,3266,9652,686,119,3230,14111,716,2305,36,967,1389,26253,42416,3573,122,139,2896,322,1787,4083,2030,2814,321,null,305,694,17690,18913,26037,5602,435,1289,3496,270,null,null,732,1487,382,786]],"container":"<table class=\"display\">\n  <thead>\n    <tr>\n      <th> <\/th>\n      <th>Country<\/th>\n      <th>Infant_Mortality_Rate<\/th>\n      <th>GDP<\/th>\n    <\/tr>\n  <\/thead>\n<\/table>","options":{"lengthMenu":[3,15,45,207],"columnDefs":[{"className":"dt-right","targets":[2,3]},{"orderable":false,"targets":0}],"order":[],"autoWidth":false,"orderClasses":false}},"evals":[],"jsHooks":[]}</script><!--/html_preserve-->
</br>
**The purpose of this analysis is to determine if the GDP can be used to predict if a country has a high IMR, which will be defined as an IMR of 20 or higher. (Although many in the US would consider 8 to be high, that is relative. The median in this dataset is 30.)**



<center>
## Analysis
</center>


**A logistic regression has been performed here:**


$$
P(Y_i = 1|\, x_i) = \frac{e^{\beta_0 + \beta_1 x_i}}{1+e^{\beta_0 + \beta_1 x_i}} = \pi_i
$$

**
The coefficients of interest are $\beta_0$ and $\beta_1$.</br>$e^{\beta_0}$ is the abstract probability at GDP (or $x_i$) = 0.</br>
$e^{\beta_1}$ is the factor by which the probability of having a high IMR changes with each one dollar increase in GDP.
**
</br></br>
**
A P-value of 0.05 or less will be considered significant for the $\beta_0$ and $\beta_1$ values.
**


$$
H_0 : \beta_0 = 0
$$
$$
H_a : \beta_0 \ne 0
$$

$$
H_0 : \beta_1 = 0
$$

$$
H_a : \beta_1 \ne 0
$$
</br>
**
In the summary table below, "(Intercept), Estimate" is the value $\beta_0$ and "GDP, Estimate" is the $\beta_1$ value:
**

<center>

```r
un.glm <- glm(Infant_Mortality_Rate > 19 ~ GDP, data=un1, family=binomial)
pander(summary(un.glm))
```


-----------------------------------------------------------------
     &nbsp;         Estimate    Std. Error   z value   Pr(>|z|)  
----------------- ------------ ------------ --------- -----------
 **(Intercept)**     2.071        0.2779      7.454    9.05e-14  

     **GDP**       -0.0003477    6.14e-05    -5.663    1.486e-08 
-----------------------------------------------------------------


(Dispersion parameter for  binomial  family taken to be  1 )


-------------------- ---------------------------
   Null deviance:     255.0  on 192  degrees of 
                               freedom          

 Residual deviance:   153.8  on 191  degrees of 
                               freedom          
-------------------- ---------------------------
</center>
</br>
**Because has few repeated values, a Hosmer-Lemeshow Goodness of Fit Test can be used to show if this regresion model is appropriate:**

<center>

```r
pander(hoslem.test(un.glm$y, un.glm$fitted, g=6))
```


-------------------------------
 Test statistic   df   P value 
---------------- ---- ---------
     9.175        4    0.05687 
-------------------------------

Table: Hosmer and Lemeshow goodness of fit (GOF) test: `un.glm$y, un.glm$fitted`
</center>
**The P-value is above 0.05, so it is appropriate**
</br></br>
**This graph shows the observed relationship:**

<center>

```r
plot(Infant_Mortality_Rate > 19 ~ GDP, data=un1, ylab="Probability of IMR being above 2%", main="High Infant Mortality Rates by Country with Respect to GDP", xlab="GDP per Capita", cex=1.6, lwd=2, col="#111111")
curve(exp(2.0713127-0.0003477*x)/(1+exp(2.0713127-0.0003477*x)), col="#700077", lwd=2, add=TRUE)
```

![](MyLogisticRegression__files/figure-html/unnamed-chunk-5-1.png)<!-- -->
</center>
</br>
**This is the completed regression model:**
$$
P(Y_i = 1|\, x_i) = \frac{e^{2.0713127 -0.0003477 x_i}}{1+e^{2.0713127 -0.0003477 x_i}} = \pi_i, \text{ where } x_i = GDP
$$
<center>

## Interpretation

</center>

**
It can be concluded that countries with a lower GDP are more likely to have an infant mortality rate above 2%. The probability of having a high IMR changes by factor of $e^{−0.0003477}=0.9996524$ for each one USD increase in GDP per capita. This table shows the some specific levels:
**
</div></div>
<div style="padding-left:400px;padding-right:400px;">
|GDP     |Probability |
|---|---|
|0     |89% |
|968   |85% |
|1,970 |80% |
|2,798 |75% |
|**5,957** |**50%** |
|9,117 |25% |
|12,276  |10% |
|14,426  |5%  |
|19,173 |1% |

</div>
