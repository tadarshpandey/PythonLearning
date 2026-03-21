import java.util.Scanner;


public class Program2 {
    public static void main(String[] args){
        int a, b;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the two integer values: ");
        a = sc.nextInt();
        b = sc.nextInt();
        System.out.println("two values are:" + a + "and" + b);
        System.out.println("Addition of two numbers:"+( a + b));
        //System.out.println(a+-+b);
        System.out.println("Substraction of two numbers:" + (a - b));
        sc.close();
    }
}

