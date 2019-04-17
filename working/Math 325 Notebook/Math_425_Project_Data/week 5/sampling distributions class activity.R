N <- 512  
storage <- rep(NA, N)
storage

for (i in 1:N){
  storage[i] <- 2*i
  cat("i =", i, " and 5*i =", 5*i, " was saved in storage[", i, "]\n")
}

storage

k <- 500

b_0s <- rep(NA, k)
b_1s <- rep(NA, k)

n <- 40

# library(tidyverse)
# tibble(rep(rep(NA, 6), 6))

for (a in c(1/sqrt(2),1,sqrt(2),2,sqrt(8))){
  for (b in c(45,60,90,150,270)){
    for (i in 1:k){
      Xi <- rep(seq(30, b, length.out=n/2), each=2) #n must be even.
      Yi <- 2.5 + 3*Xi + rnorm(n, 0, a)
  
      test.lm <- lm(Yi ~ Xi)
      b_0s[i] <- coef(test.lm)[1]
      b_1s[i] <- coef(test.lm)[2]
    }
    print(paste0("range/variance = ", b/(a^2)))
    print(paste0("intercept_sd = ", sd(b_0s)))
    print(paste0("slope_sd = ", sd(b_1s)))
  }
}


hist(b_0s)
hist(b_1s)

mean(b_0s)
mean(b_1s)

sd(b_0s)
sd(b_1s)
