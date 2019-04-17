plot(elecbill ~ kwh, data = Utilities, xlab = "Kilowatt Hours or Electricity Used (kwh)", ylab = "Total Electric Bill in USD (elecbill)", main = "Monthly Electric Usage for a Minnesota Residence (Utilities)", pch = 16, col = "gray70")
uLM <- lm(elecbill ~ kwh, data = Utilities)
abline(uLM$coefficients[1], uLM$coefficients[2], col = "gray")

summary(uLM)


highTemp <- c(9,26,34,35,36,26,0,28,37,19,17,39)

annualMonday <- c("January 15th, 2007", "January 14th, 2008", "January 12th, 2009", "January 11th, 2010", "January 17th, 2011", "January 16th, 2012", "January 14th, 2013", "January 16th, 2014", "January 12th, 2015", "January 11th, 2016", "January 16th, 2017", "January 15th, 2018")

yearlyTemps <- data.frame(annualMonday, highTemp)

library(tidyverse)
library(mosaic)

ggplot(data=yearlyTemps, aes(y=highTemp, x=annualMonday)) +
  geom_point() +
  geom_line(aes(group = 1))

#If I was to make any guess based on this one, I would say 29.

setwd("C:/Users/Jim/Desktop/MATH 325/Math 325 Notebook")
monday <- read.csv("Data/Monday14thTemp.csv")
mondayLM <- lm(MondayHigh ~ SaturdayHigh, data = monday)
summary(mondayLM)
plot(MondayHigh ~ SaturdayHigh, data = monday, main = "Relation between Saturday and Proceeding Monday High Temperatures for Each Year \nUsing the Monday Closest to the 14th of January", ylab = "High Tempurature on Proceeding Monday (F)", xlab = "High Tempurature on Saturday (F)", pch = 16, col = "gray50")
abline(mondayLM$coefficients[1], mondayLM$coefficients[2])
predict.lm(mondayLM, data.frame(SaturdayHigh = 28))
