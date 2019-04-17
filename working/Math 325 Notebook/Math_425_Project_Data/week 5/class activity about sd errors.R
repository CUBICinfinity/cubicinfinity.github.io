summary(lm(dist ~ speed, data=cars))


summary(mylm) # from classact-regression diag # t value comes from dividing estimate by the standard error.
confint(mylm) # the 95% confidence interval



## class activity about t distributions

curve(dt(x, 3), from=-4, to=4, lwd=2)
curve(dnorm(x), add=TRUE, col="gray")
abline(h=0, v=c(-1,1), col=c("gray","orange","orange"), lwd=c(1,2,2))

pt(-1, 3)*2


pt(-2.991, 48)*2


qt(1-0.05/2, 48) #alpha of 0.05

qt(1-.1/2, 13) #alpha of 0.1




cars.lm <- lm(dist ~ speed, data=cars)
summary(cars.lm)
confint(cars.lm)

pt(-2.601, 48)*2
pt(-9.464,48)*2

#confint(time_lm)

-17.5791 + c(-1,1) * qt(1-0.05/2, 48) * 6.7584
3.9324 + c(-1,1) * qt(1-0.05/2, 48) * 0.4155





mylm <- lm( ~ , data = )
plot()
abline(mylm)

summary(mylm)

intercept <- -23.3670
slope <- 8.5621
intercept_se <-
slope_se <- 0.4379
df <- 397
  
# confint for intercept
intercept + c(-1,1) * qt(1-0.05/2, df) * intercept_se

# confint for slope
slope + c(-1,1) * qt(1-0.05/2, df) * slope_se

#but consider
confint(mylm)


int_t <- (intercept-)/intercept_se
pt(-int_t, df)*2

slope_t <- (slope-)/slope_se
pt(-slope_t, df)*2


qt(1-0.05/2, df) #alpha 0.05
