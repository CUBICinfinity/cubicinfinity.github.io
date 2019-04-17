# -*- coding: utf-8 -*-
"""
Created on Tue Jan 29 22:21:09 2019

@author: Jim
"""

## Preparing tests...

import random as rand
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report


rand.seed()

def get_results(predicted_targets, test_targets):
    results = pd.DataFrame({'predicted' : predicted_targets, 
                            'actual' : test_targets})
    return results


def display_confusion_matrix(results):
    confusion = pd.crosstab(results['predicted'], results['actual'])
    print("\nConfusion Matrix:")
    print(confusion)
    print()


def do_knn(attributes, targets, test_size, k, seed = None):
    train_data, test_data, train_target, test_target = train_test_split(
            attributes, targets, test_size = test_size, random_state = seed)
    
    classifier = KNeighborsClassifier(n_neighbors = k)
    classifier.fit(train_data, train_target)
    predictions = classifier.predict(test_data)
    
    display_confusion_matrix(get_results(predictions, test_target))
    
    print(classification_report(test_target, predictions))


def generate_cluster(n, target, w_shift = 0):
    data = -1
    
    for i in range(n):
        # Using this article to help me generate random directions: 
        # http://mathworld.wolfram.com/HyperspherePointPicking.html
        x1 = 2
        x2 = 0
        x3 = 2
        x4 = 0
        
        while x1**2 + x2**2 >= 1:
            x1 = rand.uniform(-1, 1)
            x2 = rand.uniform(-1, 1)
            
        while x3**2 + x4**2 >= 1:
            x3 = rand.uniform(-1, 1)
            x4 = rand.uniform(-1, 1)
       
        radius = rand.normalvariate(0, 1)
    
        w = x1 * radius + w_shift
        x = x2 * radius
        y = x3 * np.sqrt((1 - x1**2 - x2**2)/(x3**2 + x4**2)) * radius
        z = x4 * np.sqrt((1 - x1**2 - x2**2)/(x3**2 + x4**2)) * radius
      
        if type(data) == np.ndarray:
            data = np.append(data, [[w, x, y, z, target]], axis = 0)
        else:
            data = np.array([[w, x, y, z, target]])

#        Something I was trying        
#        data = np.append(data, np.full((n, 1), target), axis = 1)
     
        ## This reveals something beautiful
        #total = 0
        #for row in data:
        #    total += np.sqrt(sum(row**2))
        #print(total/n)
        
    return(data)


data_025 = np.append(generate_cluster(100, 'A'), generate_cluster(100, 'B', 0.25))
data_025 = np.reshape(data_025, (-1,5))
do_knn(data_025[...,:4], data_025[...,4], 0.25, 4)

data_050 = np.append(generate_cluster(100, 'A'), generate_cluster(100, 'B', 0.5))
data_050 = np.reshape(data_050, (-1,5))
do_knn(data_050[...,:4], data_050[...,4], 0.25, 4)

data_100 = np.append(generate_cluster(100, 'A'), generate_cluster(100, 'B', 1))
data_100 = np.reshape(data_100, (-1,5))
do_knn(data_100[...,:4], data_100[...,4], 0.25, 4)

data_200 = np.append(generate_cluster(100, 'A'), generate_cluster(100, 'B', 2))
data_200 = np.reshape(data_200, (-1,5))
do_knn(data_200[...,:4], data_200[...,4], 0.25, 4)


