a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
c = int(input("Enter third number: "))

if a >= b and a >= c:
    print(f"Largest number is: {a}")

elif b >= a and b >= c:
    print(f"Largest number is: {b}")

else:
    print(f"Largest number is: {c}")
