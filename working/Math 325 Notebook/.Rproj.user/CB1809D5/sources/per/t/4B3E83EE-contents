library(car)

data <- Orange
y_var <- data$circumference
x_var <- data$age
  
mylm <- lm(y_var ~ x_var, data = data)
summary(mylm)

plot(y_var ~ x_var, data = data)
abline(mylm)

plot(mylm, which = 1)
qqPlot(mylm)
plot(mylm$residuals)

predict.lm(mylm, data.frame(wt = 2))


(SSE <- sum(mylm$res^2))
(SSE <- sum( (y_var - mylm$fit)^2 ) )

(SSR <- sum((mylm$fit - mean(y_var))^2))

(SSTO <- SSE + SSR)
(SSTO <- sum( (y_var - mean(y_var))^2 ))

(R2 <- SSR / SSTO)
(R2 <- 1 - (SSE/SSTO))
sqrt(R2)

MSE <- SSE/(length(x_var) - 2) # Make sure correct DF
sqrt(MSE) # equals the residual standard error

# Reassign if needed
data <- Orange
y_var <- data$circumference
x_var <- data$age

###TRANSFORM

mybox <- (boxCox(mylm))
(lambda <- mybox$x[which.max(mybox$y)]) # You may manually assign lambda if you like.

tlm <- lm(y_var^lambda ~ x_var, data = data)
plot(y_var ~ x_var, data = data)
abline(mylm)
curve((tlm$coef[1] + tlm$coef[2] * x)^lambda^(-1), add = TRUE, lwd = 2, col = "blue2")

# fittness of transformed model
plot(tlm, which = 1)
qqPlot(tlm)

# to plot in the transformed space:
plot(y_var^lambda ~ x_var)
curve((mylm$coef[1] + mylm$coef[2] * x)^lambda, add = T)
abline(tlm, col = "blue2", lwd = 2)

# Equation examples:
# $$
#   \hat{Y}_i' = 5.3408 + 0.0055 X_i
# $$
# $$
# \hat{Y}_i = (5.3408 + 0.0055 X_i)^2 # with lambda = 0.5
# $$
# $$
#   \underbrace{Y_i}_\text{Height 18} = \beta_0 + \beta_1 \underbrace{X_i}_\text{Height 2} + \epsilon_i \quad \text{where } \epsilon_i \sim N(0, \sigma^2)
# $$

# CONFIDENCE and PREDICTION Intervals
a_lm <- lm(y_var ~ x_var, data = data)
summary(a_lm)

df <- 48

intercept <- -17.5791 
slope <- 3.9324

intercept_se <- 6.7584
slope_se <- 0.4155

null_b0 <- -10
null_b1 <- 0
alpha <- 0.5

# Find P-value
pt((intercept - null_b0) / intercept_se, df)*2 # two-tailed
pt((slope - null_b1) / slope_se, df)*2

qt(1 - alpha/2, df) # t-value

confint(a_lm) # confinterval THIS IS MORE ACCURATE
# by hand:
intercept_se + c(-1,1) * qt(1 - alpha/2, df) * intercept_se
slope_se + c(-1,1) * qt(1 - alpha/2, df) * slope_se

predict(a_lm, data.frame(Length = x_value), interval = "predict") #predcition interval


