'''
check if the year is leap year or not 
'''

year  = int(input("Enter a year: "))

if year % 400 == 0:
    print("Leap Year")

elif (year % 100 != 0) & (year % 4 == 0):
    print("Leap Year")

else:
    print("Not a Leap Year")