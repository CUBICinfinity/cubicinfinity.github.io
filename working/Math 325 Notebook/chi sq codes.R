apply(<table>, c(<1>, ..., <P>), sum)  # Create summaries

apply(<table>, c(<1>, ..., <P>), sum)/sum(<table>)  # Show it as a proportion


glasses <- cbind( Males = c(Glasses = 5, Contacts = 12, None = 18), Females = c(Glasses = 4, Contacts = 14, None = 22))

glasses # view it

barplot(glasses, beside=TRUE, legend.text=TRUE, args.legend=list(x="topleft",bty="n"))

chis.glasses <- chisq.test(glasses)

chis.glasses$expected  # check requirement

chis.glasses # view details

chis.glasses$residuals  # note the no values are large in magnitude

###
education <- cbind( `United States` = c(Engineering = 61941, `Natural Science` = 111158, `Social Science` = 182166), `Western Europe` = c(Engineering = 158931, `Natural Science` = 140126, `Social Science` = 116353), Asia = c(280772, 242879, 236018))

education  # view

barplot(education, beside=T, legend.text=T, args.legen=list(x="topleft", bty="n"), main = "College Degrees Awarded by Region")

#test taking note: watch the wording, 5 or more "expected," not "observed"