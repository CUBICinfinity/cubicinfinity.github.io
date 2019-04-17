# wordj

plot(wordj==1 ~ age, data=GSS2012, pch=16)

fam.glm <- glm(wordj==1 ~ age + as.factor(sex) + age:as.factor(sex), data=GSS2012, family=binomial)
summary(fam.glm)

curve(exp(-0.092471-0.029766*x)/(1+exp(-0.092471-0.029766*x)), add=TRUE, col='skyblue4', lwd=2)
curve(exp(-0.092471-0.730426+(-0.029766+0.012918)*x)/(1+exp(-0.092471-0.730426+(-0.029766+0.012918)*x)), add=TRUE, col='firebrick', lwd=2)

table(subset(GSS2012, wordj==0 | wordj==1)$age)

hoslem.test(fam.glm$y, fam.glm$fitted)


