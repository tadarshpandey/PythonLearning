'''
series sum of
 sum = 1 + 1/2 + 1/3 + 1/4 + ..... + 1/n'''

n = int(input("Enter n: "))
s = 0
for i in range(1, n+1):
    s += 1/i
print("Sum =", s)
