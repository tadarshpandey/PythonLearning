# Take input from user
a = float(input("Enter side a: "))
b = float(input("Enter side b: "))
c = float(input("Enter side c: "))

# Check for valid triangle
if (a + b > c) and (b + c > a) and (c + a > b):
    print("The sides form a valid triangle.")
else:
    print("The sides do NOT form a valid triangle.")
