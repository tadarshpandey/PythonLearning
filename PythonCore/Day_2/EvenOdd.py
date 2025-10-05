def checkEvenOdd(number):
    if number % 2 == 0:
        return "Number is EVEN"
    else:
        return "Number is ODD"
    
num = int(input("Enter a number: "))
print(checkEvenOdd(num))