# 1. Create a list of names and print the second item.

'''

nameList = ["adarsh", "alok", "bagha", "nattu"]

print(f"Second item for the list is: {nameList[1]}")

'''

# 2. Create a list of sports and then replace the second item with another sport.
'''
sportsList = ["kabaddi", "cricket", "hockey"]

sportsList[1] = "basketball"

print(f"list of sports: {(sportsList)}")

'''

# 3. Create a list containing numbers and delete the fifth number from the array.

'''
numbersList = [2,44,5,6,7,8,9,10,11]

del numbersList[4]

print(f"deleted fifth element from the list: {numbersList}")

'''


# 4. Create two lists of numbers and merge them.

'''
num1= [1,3,5]
num2= [2,4,6]

num3= num1 + num2
print(f"first list: {num1}")
print(f"second list: {num2}")
print(f"merged two list are (in sorted form): {sorted(num3)}")

'''

# 5. Create a list of numbers and find the length, minimum, and maximum.

'''
numbersList = [22, 33, 44, 5, 11, 2, 1, 8]

print(f"numbers list: {numbersList}")

print(f"length of the list: {len(numbersList)}")
print(f"minimum value from the list: {min(numbersList)}")
print(f"maximum value from list: {max(numbersList)}")

'''


# 6. Create a dictionary of students and scores and print out a student’s score.

'''
students = {"student1" : 56, "student2" : 49, "student3" : 78}
print(f"student1 marks is: {students["student1"]}")

'''

# 7. Create a dictionary with the key being names and values being ages and then delete the second key/value pair.
'''

dictionary = {"ADARSH": 22, "ALOK": 17, "AMAN": 23}

print(f" dictionary before deletion: {dictionary}")

keyList = list(dictionary.keys()) # variable keyList creates & stores LIST of keys of dictionary DICTIONARY
keyNeedToDel = keyList[1] # gets that key of second key/value pair needs to be deleted
del dictionary[keyNeedToDel] # that got key is passed with dictionary for deletion

print(f" dictionary after deletion of second member: {dictionary}")
'''

# 8. Create a dictionary of names and ages and then print out all the keys and values

# 9. Create a tuple of your favorite movies

# 10. Create a tuple and print all the items from the first to third index.