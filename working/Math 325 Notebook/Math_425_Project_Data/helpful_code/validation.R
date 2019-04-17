library(mosaic)

# How to validate a model (by hand)

set.seed(42)
train_rows <- sample(1:nrow(Utilities), 60)
train <- Utilities[train_rows, ]
test <- Utilities[-train_rows, ]

elec_lm <- lm(elecbill ~ kwh + temp + I(temp^2) + year, data = train) # This is the model I'm validating

summary(elec_lm)


predicted <- predict(elec_lm, newdata = test)

ybar <- mean(test$elecbill)
y_i <- test$elecbill

SSE <- sum((y_i - predicted)^2) # squared residuals
SSTO <- sum((y_i - ybar)^2) # Deviation from average Y

(R2_adj <- 1 - (nrow(Utilities) - 1)/(nrow(Utilities) - 5)*(SSE/SSTO))
