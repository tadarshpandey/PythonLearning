base = int(input("Enter the base number: "))
exponent = int(input("Enter the exponent: "))

result = 1  # Initialize result to 1

for i in range(exponent):
    result *= base  # Multiply base exponent times

print(f"{base} raised to the power {exponent} is {result}")


# Alternative using while loop 
# base = int(input("Enter the base number: "))
# exponent = int(input("Enter the exponent: "))

# result = 1
# i = 1

# while i <= exponent:
#     result *= base
#     i += 1

# print(f"{base} raised to the power {exponent} is {result}")
