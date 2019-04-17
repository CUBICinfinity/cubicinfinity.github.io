library(car)
library(tidyverse)

plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")

# ggplot(Orange, aes(x=age, y=circumference)) + 
#   geom_point(color="orangered") +
#   labs(title="Growth of Orange Trees", x="Age of Tree in Days", y="Circumference of Tree (mm)") + 
#   theme_bw()
square_lm <- lm(circumference^2 ~ age, data=Orange)
curve(sqrt(-5005.48+23.4*x), add = TRUE, col = "blue", lty = 2)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")

o_lm <- lm(sqrt(circumference) ~ age, data=Orange)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x)^2, add = TRUE, col = "blue", lty = 2)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")

o_lm <- lm(log(circumference) ~ age, data=Orange)
curve(exp(coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE, col = "blue", lty = 2)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm(1/(circumference) ~ age, data=Orange)
curve(1/(coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE, col = "blue", lty = 2)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm((circumference) ~ age, data=Orange)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE, col = "blue", lty = 2)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm((circumference)^(0.4) ~ age, data=Orange)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x)^(1/0.4), add = TRUE, col = "blue", lty = 2)

######
sub_o <- filter(Orange, age < 1000)

# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
square_lm <- lm(circumference^2 ~ age, data=sub_o)
curve(sqrt(-5005.48+23.4*x), add = TRUE)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm(sqrt(circumference) ~ age, data=sub_o)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x)^2, add = TRUE)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm(log(circumference) ~ age, data=sub_o)
curve(exp(coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")
o_lm <- lm(1/(circumference) ~ age, data=sub_o)
curve(1/(coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")

o_lm <- lm((circumference) ~ age, data=sub_o)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x), add = TRUE)


# plot(circumference ~ age, data=Orange, pch=16, col="orangered", main="Growth of Orange Trees", xlab="Age of Tree in Days", ylab="Circumference of Tree (mm)")

o_lm <- lm((circumference)^(0.4) ~ age, data=sub_o)
curve((coef(o_lm)[1]+coef(o_lm)[2]*x)^(1/0.4), add = TRUE)

