# First run the initial test and gain the test statistic:
myTest <- t.test(extra ~ group, data = sleep, mu = 0)
observedTestStat <- myTest$statistic

# Now we run the permutation for a distribution of test statistics
N <- 50000
permutedTestStats <- rep(NA, N)
for (i in 1:N){
  permutedData <- sample(sleep$group)
  permutedTest <- t.test(extra ~ permutedData, data = sleep, mu = 0)
  permutedTestStats[i] <- permutedTest$statistic
}

# Now we create a histogram of that distribution
hist(permutedTestStats, col = "skyblue", breaks=5000)
abline(v = observedTestStat, col = "red", lwd = 3)

#Greater-Than p-value: Not the correct one in this case
sum(permutedTestStats >= observedTestStat)/N

# Less-Than p-value: This is the corret one
sum(permutedTestStats <= observedTestStat)/N

# Two-Sided p-value
2*sum(permutedTestStats <= observedTestStat)/N

