a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

# Find GCD using loop
if a > b:
    smaller = b
else:
    smaller = a

for i in range(1, smaller + 1):
    if (a % i == 0) and (b % i == 0):
        gcd = i  # largest i that divides both

# LCM formula
lcm = (a * b) // gcd

print(f"GCD of {a} and {b} is: {gcd}")
print(f"LCM of {a} and {b} is: {lcm}")

#  ALrernative
# a = int(input("Enter first number: "))
# b = int(input("Enter second number: "))

# # Euclidean algorithm for GCD
# x, y = a, b
# while y != 0:
#     x, y = y, x % y

# gcd = x
# lcm = (a * b) // gcd

# print(f"GCD of {a} and {b} is: {gcd}")
# print(f"LCM of {a} and {b} is: {lcm}")
