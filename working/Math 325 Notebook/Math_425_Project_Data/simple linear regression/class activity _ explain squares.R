View(cars)
?cars

sum(1:6)


x = c(5, 15, 2, 29, 35, 24, 25, 39)
sum(x)
sum( (1:6)^2 )

x = c(5, 15, 2, 29, 35, 24, 25, 39)
sum(x^2)
sum(x)^2

plot(dist ~ speed, data = cars, col = "firebrick", pch = 16)
carslm <- lm(dist ~ speed, data = cars)
abline(carslm$coefficients[1], carslm$coefficients[2], col = "gray")
abline(mean(cars$dist), 0, lty = 2, col = "gray")
legend(5, 110, legend = c(expression(hat(Y)), expression(bar(Y))),
       lty = c(1, 2), cex = 0.8, bty = "n", col = "gray", text.col = "gray")

carslm
mean(cars$dist)

cars.SSE = sum(carslm$res^2)
round(cars.SSE,2) == round(sum((cars$dist - carslm$fit)^2),2)
cars.SSTO = sum((cars$dist - mean(cars$dist))^2)
cars.SSE
cars.SSTO
cars.SSR = sum((carslm$fit - mean(cars$dist))^2)
cars.SSR
cars.R2 = cars.SSR/cars.SSTO
cars.R2
sqrt(cars.R2)


x = c(5, 15, 2, 29, 35, 24, 25, 39)
var(x)
sum((x-mean(x))^2)/(length(x)-1)
