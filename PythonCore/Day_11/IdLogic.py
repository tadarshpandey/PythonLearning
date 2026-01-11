idConst = "26MCAB" # Constant part of the ID
def generateId(userId):
    studentId = idConst + f"{userId:04d}"
    return studentId

if __name__ == "__main__":
    # Test the ID generation
    for i in range(1, 20):
        print(generateId(i))