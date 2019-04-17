
my_lm <- lm(mpg ~ wt, data = mtcars)

predict.lm(my_lm, data.frame(wt = 2.7))

22.85505 - 21

(SSE <- sum(my_lm$res^2))
(SSR <- sum((my_lm$fit - mean(mtcars$mpg))^2))
(SSTO <- SSE + SSR)
(R2 <- SSR / SSTO)
sqrt(R2)

SSTO = sum((cars$dist - mean(cars$dist))^2)

yval = c(3.78, 6.08, 6.65, 9.25, 9.92)
res = c(-0.266, 0.489, -0.486, 0.569, -0.306)

SSTO = sum((yval - mean(yval))^2)
SSTO
SSR = sum((yval-res - mean(yval))^2)


?mtcars
my_lm 

# the fastest way:

y <- c(3.78, 6.08, 6.65, 9.25, 9.92)

SSTO <- sum( (y - mean(y))^2 )

res <- c(-0.266, 0.489, -0.486, 0.569, -0.306)

SSE <- sum(res^2)

R2 = 1 - SSE/SSTO


# quick trick

mt.lm <- lm(disp ~ wt, data=mtcars)

summary(mt.lm)


# last one

mt.lm <- lm(mpg ~ wt, data=mtcars) #perform the regression

predict(mt.lm, data.frame(wt=2.7)) #get predicted value for Nissan Sentra

# 1 
# 22.85505   note: just copy this value or use [[1]]

(myresidual <- 21 - 22.85505) #calculate difference between Y and Y-hat