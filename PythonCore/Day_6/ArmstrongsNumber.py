# code to print Armstrong numbers in a given range

start = int(input("Enter start of range: "))
end = int(input("Enter end of range: "))

print(f"Armstrong numbers between {start} and {end}:")
for num in range(start, end + 1):
    digits = [int(d) for d in str(num)]
    power = len(digits)
    if sum(d ** power for d in digits) == num:
        print(num)