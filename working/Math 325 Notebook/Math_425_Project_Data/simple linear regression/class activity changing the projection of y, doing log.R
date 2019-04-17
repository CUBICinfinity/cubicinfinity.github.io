
?islands
View(islands)

hist(islands)
hist(log(islands))

gas_line <- lm(gasbill ~ temp, data = Utilities)
lmgas <- lm(log(gasbill) ~ temp, data = Utilities)

plot(gasbill ~ temp, data = Utilities)
curve(exp(lmgas$coefficients[1]+lmgas$coefficients[2]*x), add= TRUE, col = "skyblue", lwd=2)
abline(gas_line$coefficients[1], gas_line$coefficients[2])