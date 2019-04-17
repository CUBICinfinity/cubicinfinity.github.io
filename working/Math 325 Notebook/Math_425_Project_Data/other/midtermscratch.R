plot(rate ~ slim, data=Highway1, xlab="Speed Limit", ylab="Accident Rate per Million Vehicle Miles", main="1973 Minnesota Highway Accident Records")
mylm <- lm(1/sqrt(rate) ~ slim, data=Highway1)
summary(mylm)
mylm <- lm(log(rate) ~ slim, data=Highway1)

mylm <- lm(exercise ~ age, data = Blackmore)
plot(mylm, which = 1)
qqPlot(mylm)

mylm <- lm(dist ~ speed, data = cars)

mylm <- lm(IQbio ~ IQfoster, data = Burt)
summary(mylm)
plot(IQbio ~ IQfoster, data = Burt)

cars.lm <- lm(speed ~ dist, data=cars)
predict(cars.lm, data.frame(dist = 20))

mylm <- lm(circumference ~ age, data = Orange)
plot(mylm, which  = 1)
qqPlot(mylm)
plot(mylm$res)

mylm <- lm(kwh ~ ccf, data = Utilities)
summary(mylm)

air.lm <- lm(Ozone ~ Wind, data=airquality)

mylm <- lm(weight ~ height, data=Davis)

data <- filter(KidsFeet, sex == 'B')
mylm <- lm(width ~ length, data = data)
predict(mylm, data.frame(length = 25), interval = "prediction")

