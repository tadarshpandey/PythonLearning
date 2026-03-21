

import java.util.Scanner;


public class Person {
    // private variables = hidden data
    private String name;
    private int age;

    // setter for Name
    public void setName(String newName){
        this.name = newName; // this logic line is for setter of variable(data)
    }

    // getter for name
    public String getname(){
        return name; // this logic line is for getter of variable(data)
    }

    // setter for Age (with a little logic)
    public void setAge(int newAge){
        if(newAge > 0){
            this.age = newAge;
        }
        else {
            System.out.println("Please enter a valid age!");
        }
    }
    
    // getter for Age
    public int getAge(){
        return age;
    }

    public static void main(String[] args) {
        Person p1 = new Person();

        Scanner sc = new Scanner(System.in);

        String name;
        int age;
        System.out.println("Enter your name: ");
        name = sc.nextLine();
        System.out.println("Enter your age: ");
        age = sc.nextInt();

        //p1.name = "Aman"; this will throw an error because 'name' is private variable

        p1.setName(name);
        p1.setAge(age);

        System.out.println("Name: " + p1.getname()); // getting the value 
        System.out.println("Age: "+ p1.getAge()); // getting the value

        sc.close();
    }

}
