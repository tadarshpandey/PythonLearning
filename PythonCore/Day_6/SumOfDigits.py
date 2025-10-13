# program to print sum of its digit of given number
def sum_of_digits(n):
    total = 0
    while n > 0:
        total += n % 10
        n = n // 10
    return total

number = int(input("Enter any number of which you want their digits sum: "))
print(sum_of_digits(number))