'''
Check Strong number means 
sum of factorial digits is equal to number itself
num = 145
1! + 4! + 5! = 145
'''

num = int(input("Enter a number: "))
temp = num
sum_factorial = 0
while temp > 0:
    digit = temp % 10
    factorial = 1
    for i in range(1, digit + 1):
        factorial *= i
    sum_factorial += factorial
    temp //= 10
if sum_factorial == num:
    print(f"{num} is a Strong number")
else:
    print(f"{num} is not a Strong number")