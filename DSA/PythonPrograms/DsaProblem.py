arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

n = len(arr)

for i in range(n):
    mid_idx = i
    for j in range(i + 1, n):
        if arr[j] < arr[mid_idx]:
            mid_idx = j
    arr[i], arr[mid_idx] = arr[mid_idx], arr[i]

print(arr)

result = 0

for i in range(0, n, 2):
    result += arr[i]

print(result)

