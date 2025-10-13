# check pallindrome number means a number and its reverse both are same

# reverse number without converting into strinng
def ReverseNumber(n):
    reverse = 0 
    while n > 0:
        reverse = reverse * 10 + n % 10
        n = n // 10
    return reverse  # Move return outside the loop


number = int(input("Enter to check it is pallindrome or not: "))
print(f"Reversed number is : {ReverseNumber(number)}")

if number == ReverseNumber(number):
    print(f"Number is pallindrome")
else:
    print(f"Number is NOT pallindrome")