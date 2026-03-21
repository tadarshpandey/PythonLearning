import java.util.Scanner;

// Abstract Class
abstract class Payment {
    double amount;

    // Constructor
    Payment(double amount) {
        this.amount = amount;
    }

    // Common method
    void displayReceipt() {
        System.out.println("Payment processed for: $" + amount);
    }

    // Abstract method
    abstract void processPayment();
}

// Subclass 1: Credit Card
class CreditCardPayment extends Payment {
    String cardNumber;

    CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }

    @Override
    void processPayment() {
        System.out.println("Validating Credit Card: " + cardNumber);
        System.out.println("Charging credit line...");
    }
}

// Subclass 2: PayPal
class PayPalPayment extends Payment {
    String email;

    PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }

    @Override
    void processPayment() {
        System.out.println("Redirecting to PayPal for user: " + email);
        System.out.println("Verifying digital wallet balance...");
    }
}

// Main Class
public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter Payment Amount: ");
        double amount = sc.nextDouble();
        sc.nextLine();  // Consume leftover newline

        System.out.println("Select Payment Method:");
        System.out.println("1. Credit Card");
        System.out.println("2. PayPal");
        int choice = sc.nextInt();
        sc.nextLine();  // Consume newline

        Payment payment;

        if (choice == 1) {
            System.out.println("Enter Credit Card Number: ");
            String cardNumber = sc.nextLine();
            payment = new CreditCardPayment(amount, cardNumber);

        } else if (choice == 2) {
            System.out.println("Enter PayPal Email: ");
            String email = sc.nextLine();
            payment = new PayPalPayment(amount, email);

        } else {
            System.out.println("Invalid Payment Method Selected!");
            sc.close();
            return;
        }

        System.out.println("\nProcessing Payment...\n");
        payment.processPayment();
        payment.displayReceipt();

        sc.close();
    }
}
