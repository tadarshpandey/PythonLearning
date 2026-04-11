#include<stdio.h>
#define MAX 5
int stack[MAX];

int top =-1;
void push(){
    if (top == MAX -1){
        printf("Stack is overflow");
    }
    else{
        top=top+1;
        printf("Enter an element:\n");
        scanf(" %d", &stack[top]);

    }
}

void pop(){
    if(top == -1){
        printf("Stack is underflow");

    }
    else{
        printf("the deleted or popped element is %d\n", stack[top]);
        top = top-1;        
    }
}

void display(){
    if(top == -1){
        printf("stack is empty");
    }
    else{
        int i;
        printf("the elements left in the stack are:\n");
        for(i=top; i>=0; i--){
            printf("%d\n", stack[i]);
        }
    }
}

void main(){
    int c;
    while(1){
        printf("\nEnter choices \n1.Push\n2.Pop\n3.Display\n");
        scanf("%d", &c);
        switch(c){
            case 1: push();
                    break;
            case 2: pop();
                    break;
            case 3: display();
                    break;
            default: printf("Invalid Input");
        }
    }
}