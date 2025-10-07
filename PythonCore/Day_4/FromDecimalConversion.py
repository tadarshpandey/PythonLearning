# Program 1: Convert Decimal to Binary, Octal, and Hexadecimal using built-in functions

decimal = int(input("Enter a decimal number: "))

print("The decimal value of", decimal, "is:")
print("Binary:", bin(decimal)[2:])
print("Octal:", oct(decimal)[2:])
print("Hexadecimal:", hex(decimal)[2:])
