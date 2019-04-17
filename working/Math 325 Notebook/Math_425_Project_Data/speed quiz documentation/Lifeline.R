library(car)

data <- 
y <- 
x <- 
  
mylm <- lm(y ~ x, data = data)
summary(mylm)

plot(y ~ x, data = data)
abline(mylm)

plot(mylm, which = 1)
qqPlot(mylm)
plot(mylm$residuals)

predict.lm(mylm, data.frame(wt = 2))


(SSE <- sum(mylm$res^2))
(SSE <- sum( (data$y - mylm$fit)^2 ) )

(SSR <- sum((mylm$fit - mean(data$y))^2))

(SSTO <- SSE + SSR)
(SSTO <- sum( (data$y - mean(data$y))^2 ))

(R2 <- SSR / SSTO)
(R2 <- 1 - (SSE/SSTO))
sqrt(R2)

MSE <- SSE/(length(data$x) - 2) # Make sure correct DF
sqrt(MSE) # equals the residual standard error

mybox <- (boxCox(mylm))
(lambda <- mybox$x[which.max(mybox$y)])

tlm <- lm(y^lambda ~ x, data = data)
curve()

# Example:
# $$
#   \hat{Y}_i' = 5.3408 + 0.0055 X_i
# $$
# $$
# \hat{Y}_i = (5.3408 + 0.0055 X_i)^2
# $$
