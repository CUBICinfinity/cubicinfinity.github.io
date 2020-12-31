# -*- coding: utf-8 -*-
"""
Created on Sun Oct 11 14:07:58 2020

@author: Jim
"""

import re

text = []

#megalist = "[\w\x{00C0}-\x{00D6}\x{00D8}-\x{00F6}\x{00F8}-\x{024F}\x{1E02}\x{"\
#    "1E03}\x{1E0A}\x{1E0B}\x{1E1E}-\x{1E41}\x{1E56}\x{1E57}\x{1E60}\x{1E61}\x{1E6"\
#    "A}\x{1E6B}\x{1E80}-\x{1E85}\x{1E9B}\x{1EF2}\x{1EF3}\x{0259}\x{027C}\x{0292}"\
#    "\x{0360}-\x{0373}\x{0376}-\x{037D}\x{037F}\x{0384}-\x{0386}\x{0388}-\x{03FF}"\
#    "\x{1F00}-\x{1FFF}\x{0400}-\x{0481}\x{0483}-\x{0487}\x{048A}-\x{04FF}\x{FB00}"\
#    "-\x{FB4F}\x{2C60}-\x{2C7F}\x{A720}-\x{A7FF}\x{AB30}-\x{AB6F}\x{0250}-\x{02AF"\
#    "}\x{1D00}-\x{1D7F}\x{1D80}-\x{1DBF}\x{0300}-\x{036F}\x{1AB0}-\x{1AFF}\x{FE20"\
#    "}-\x{FE2F}\x{1DC0}-\x{1DFF}\x{2C00}-\x{2C5F}\x{0500}-\x{052F}\x{2DE0}-\x{2DF"\
#    "F}\x{A640}-\x{A69F}\x{1C80}-\x{1C8F}\x{0530}-\x{058F}]"

with open('filepath.txt', 'r') as f:
    for line in f:
        line = re.split("[, \\'\\-_\\.:?!()@#$%^&\\*\\+=`~\\[\\]\\\\\\/\\\"\\<\\>\\{\\}]{2,}|"\
                        "((?<=[a-zA-Z])[, \\/\\._]|([, \\/\\._](?=[a-zA-Z])))", line)
        line = [word for word in line if word != None]
        line = [word.rstrip() for word in line if re.search("\w", word)]
        count = len(line)
        text.append(line)

text