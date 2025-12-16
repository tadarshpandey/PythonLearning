# basic code in python

# Variables and Multiple Assignments

# age = 20
# print(f"Age: {age}, he is years old")

# name, age = "anshu", 22
# print(f"Name: {name}, Age: {age}")

# slicing

# sent = "i am coding a python program"

# print(f"{sent[2:8]}") 

# '''
# in slicing it includes the start index but excludes the end index
# so in the above code it will include index 2 to 7 only'''


# Placeholders in strings
# sentence = "%s is %d years old"

# print(f"{sentence %("anshu", 21)}")

# format strings
sentence = "{} is {} years old"

while True:
    
    # below the logic follow sentence vraiable constant value 
    # withthe format spcae free for custom input
    name = input("Enter your name: ")
    age = int(input("Enter your age: "))

    print(f"{sentence.format(name, age)}")       

    choice = int(input("to continue press 1 else 0: "))

    # below if-else used to control the flow of loop
    if choice == 0:
        print("Program terminated")
        break
    elif choice == 1:
        continue
    else:
        print(f"Wrong choice program terminated")
        break