# ===============================
# User Management System (In-Memory)
# ===============================

users = []
next_user_id = 1


# ---------- Utility Functions ----------

def is_valid_email(email, users, current_user_id=None):
    if "@" not in email or not email.strip():
        return False
    for user in users:
        if user["email"] == email and user["user_id"] != current_user_id:
            return False
    return True


def get_valid_positive_int(prompt):
    value = input(prompt).strip()
    if not value.isdigit():
        return None
    value = int(value)
    if value <= 0:
        return None
    return value


def find_user_by_id(users, user_id):
    for user in users:
        if user["user_id"] == user_id:
            return user
    return None


def display_user(user):
    print("-" * 40)
    print(f"ID   : {user['user_id']}")
    print(f"Name : {user['name']}")
    print(f"Email: {user['email']}")
    print(f"Age  : {user['age']}")
    print("-" * 40)


# ---------- Core Operations ----------

def add_user(users):
    global next_user_id

    name = input("Enter name: ").strip()
    if not name:
        print("Error: Name cannot be empty")
        return

    email = input("Enter email: ").strip()
    if not is_valid_email(email, users):
        print("Error: Invalid or duplicate email")
        return

    age = get_valid_positive_int("Enter age: ")
    if age is None:
        print("Error: Age must be a number greater than 0")
        return

    user = {
        "user_id": next_user_id,
        "name": name,
        "email": email,
        "age": age
    }

    users.append(user)
    next_user_id += 1
    print("User added successfully")


def view_all_users(users):
    if not users:
        print("No users found")
        return

    for user in users:
        display_user(user)


def search_user_by_id(users):
    if not users:
        print("No users found")
        return

    user_id = get_valid_positive_int("Enter user ID: ")
    if user_id is None:
        print("Invalid ID")
        return

    user = find_user_by_id(users, user_id)
    if user:
        display_user(user)
    else:
        print("User not found")


def update_user(users):
    if not users:
        print("No users found")
        return

    user_id = get_valid_positive_int("Enter user ID to update: ")
    if user_id is None:
        print("Invalid ID")
        return

    user = find_user_by_id(users, user_id)
    if not user:
        print("User not found")
        return

    print("Press Enter to keep existing value")

    name = input(f"Name [{user['name']}]: ").strip()
    if name:
        user["name"] = name

    email = input(f"Email [{user['email']}]: ").strip()
    if email:
        if not is_valid_email(email, users, user_id):
            print("Error: Invalid or duplicate email")
            return
        user["email"] = email

    age_input = input(f"Age [{user['age']}]: ").strip()
    if age_input:
        if not age_input.isdigit() or int(age_input) <= 0:
            print("Error: Age must be a number greater than 0")
            return
        user["age"] = int(age_input)

    print("User updated successfully")


def delete_user(users):
    if not users:
        print("No users found")
        return

    user_id = get_valid_positive_int("Enter user ID to delete: ")
    if user_id is None:
        print("Invalid ID")
        return

    user = find_user_by_id(users, user_id)
    if not user:
        print("User not found")
        return

    confirm = input("Are you sure you want to delete this user? (y/n): ").lower()
    if confirm == "y":
        users.remove(user)
        print("User deleted successfully")
    else:
        print("Deletion cancelled")


# ---------- Menu ----------

def show_menu():
    print("""
1. Add User
2. View All Users
3. Search User by ID
4. Update User
5. Delete User
6. Exit
""")


def main():
    while True:
        show_menu()
        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_user(users)
        elif choice == "2":
            view_all_users(users)
        elif choice == "3":
            search_user_by_id(users)
        elif choice == "4":
            update_user(users)
        elif choice == "5":
            delete_user(users)
        elif choice == "6":
            print("Program terminated")
            break
        else:
            print("Invalid choice")


# ---------- Program Start ----------

if __name__ == "__main__":
    main()
