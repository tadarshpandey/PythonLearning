#include<stdio.h>
#define MAX 100
int queue[MAX];
int front = -1, rear = -1;

void enqueue(){
    if (rear == MAX -1){
        printf("Queue is overflow");
    }
    else{
        
        if (front == -1){
            front = 0;
        }
        rear = rear + 1;
        printf("Enter an element:\n");
        scanf("%d", &queue[rear]);
    }
}

void dequeue(){
    if(front==-1 || front > rear){
        printf("Queue is underflow\n");
    }
    else{
        printf("The deleted element is %d\n", queue[front]);
        front = front + 1;
    }   
}

void display(){
    if (rear < front || front == -1){
        printf("Queue is empty\n");
        
    }
    else{
        int i;
        printf("Thhe elements left in queue are: \n");
        for(i = front; i<=rear; i++){
            printf("%d\n", queue[i]);
        }
    }
}

void main(){
    int choice;
    while(1){
        printf("\nEnter choices \n1.Enqueue\n2.Dequeue\n3.Display\n");
        scanf("%d", &choice);
        switch(choice){
            case 1: enqueue();
                    break;
            case 2: dequeue();
                    break;
            case 3: display();
                    break;
            default: printf("Invalid Input");
        }
    }
}