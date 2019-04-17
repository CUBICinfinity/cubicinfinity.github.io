X <- c(1, 4,  7,   8,  10, 20)

Y <- c(3, 5, 18, 13, 12,   1)



w <- c(1, .5, .2, 1, 1, .1)

mylm <- lm(Y ~ X, weights=w)

plot(Y ~ X, pch=21, bg=rgb(1-w,1-w,1-w), col="orange")

abline(mylm)


w <- c(0.75, 0.875, 0.5, 0.75, 0.8, 0.25)

mylm <- lm(Y ~ X, weights=w)

plot(Y ~ X, pch=21, bg=rgb(1-w,1-w,1-w), col="orange")

abline(mylm)



w <- c(0.2, 0.2, 0.9, 0.9, 0.9, 0.9)

mylm <- lm(Y ~ X, weights=w)

plot(Y ~ X, pch=21, bg=rgb(1-w,1-w,1-w), col="orange")

abline(mylm)
