text = input("Enter a String: ")

# convert to lower case to handle both cases
text = text.lower()

# initialize counters
vowels = 0
consonants = 0

# define vowels
vowel_set = "aeiou"

# loop through each character 
for char in text:
    if char.isalpha():  # Check if it's a letter
        if char in vowel_set:
            vowels += 1
        else:
            consonants += 1

# Display the results
print("Number of vowels:", vowels)
print("Number of consonants:", consonants)