# reverse number without converting into strinng
def ReverseNumber(n):
    reverse = 0 
    while n > 0:
        reverse = reverse * 10 + n % 10
        n = n // 10

    return reverse

print(ReverseNumber(1234))