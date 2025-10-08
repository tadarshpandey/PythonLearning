# Taking input from the user
num = int(input("Enter a number to print its multiplication table: "))

# Loop from 1 to 10 to print table
for i in range(1, 11):
    print(f"{num} x {i} = {num * i}")
