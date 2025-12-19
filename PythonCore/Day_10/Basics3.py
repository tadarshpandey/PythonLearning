# Introduction to lists in python
# Indexing of list starts from 0 or zero

# let's take random example of list with the shopping lists
shoppingLists = ["peas", "banana", "apple", "cauliflower"]
print(f"priting the first list: {shoppingLists}")

# Lists are mutable meaning we can change the values of list
# we do changing in list using indexing
# like for adding item we use append function
shoppingLists.append("mango")
print(shoppingLists)

# updating items of list using indexing
# here changing first elements item "peas" to "potato"
shoppingLists[0] = "potato"
print(shoppingLists)

# how do we delete items from lists
# using indexes and del function
del shoppingLists[2] # like this we can delete item at index 2 i.e. "apple"
print(shoppingLists)

# how to get the Length of lists
# using len() function
print(f"Length of shoppingLists is: {len(shoppingLists)}") # this gets to the length of list

# joining two lists
vegetables = ["carrot", "broccoli", "spinach"]
allItems = shoppingLists + vegetables
print(f"All items in shoppingLists and vegetables are: {allItems}")

# maximum and minimum item in list
numbers = [10, 5, 30, 25, 50, 15]
print(f"Maximum number in numbers list is: {max(numbers)}")
print(f"Minimum number in numbers list is: {min(numbers)}")



# print(f"Checking that max() & min() function work for string type of lists")
# print(f"Maximum string in shoppingLists is: {max(shoppingLists)}")
# print(f"Minimum string in shoppingLists is: {min(shoppingLists)}")
"""
max() / min() on strings → lexicographical order

Based on character ASCII/Unicode values

NOT word meaning

NOT string length (unless you specify key=len)

"""