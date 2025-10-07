# Program 2: Convert Decimal to Binary, Octal, and Hexadecimal using manual logic

decimal = int(input("Enter a decimal number: "))

# Binary conversion
n = decimal
binary = ""
while n > 0:
    remainder = n % 2
    binary = str(remainder) + binary
    n = n // 2

# Octal conversion
n = decimal
octal = ""
while n > 0:
    remainder = n % 8
    octal = str(remainder) + octal
    n = n // 8

# Hexadecimal conversion
n = decimal
hexadecimal = ""
hex_digits = "0123456789ABCDEF"
while n > 0:
    remainder = n % 16
    hexadecimal = hex_digits[remainder] + hexadecimal
    n = n // 16

print("The decimal value of", decimal, "is:")
print("Binary:", binary)
print("Octal:", octal)
print("Hexadecimal:", hexadecimal)
