#include <stdio.h>
#include <stdlib.h>

/* Definition of a singly linked list node */
struct Node {
    int data;              // stores node value
    struct Node* next;     // pointer to next node
};

/* createNode:
   Allocates memory for a new node, initializes data and next pointer.
   Returns pointer to the new node (or NULL if allocation fails). */
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        /* allocation failed */
        return NULL;
    }
    newNode->data = data;
    newNode->next = NULL;  // new node is a tail by default
    return newNode;
}

/* insertAtBeginning:
   Inserts a new node with given data at the head of the list.
   Steps:
   - Create new node.
   - Point newNode->next to current head.
   - Update head to new node. */
void insertAtBeginning(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    if (newNode == NULL) return;   // allocation safety
    newNode->next = *head;         // link new node to previous head
    *head = newNode;               // update head to new node
}

/* insertAtEnd:
   Appends a new node with given data at the tail of the list.
   Steps:
   - Create new node.
   - If list empty, head becomes new node.
   - Otherwise traverse to last node and set its next to new node. */
void insertAtEnd(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    if (newNode == NULL) return;   // allocation safety

    if (*head == NULL) {
        *head = newNode;           // empty list: new node is head
        return;
    }
    struct Node* temp = *head;
    while (temp->next != NULL) {   // traverse to last node
        temp = temp->next;
    }
    temp->next = newNode;          // link last node to new node
}

/* display:
   Prints list elements from head to tail in format: val -> val -> ... -> NULL
   Traverses nodes using next pointers until NULL is reached. */
void display(struct Node* head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;        // move to next node
    }
    printf("NULL\n");
}

/* freeList:
   Frees all nodes to avoid memory leaks.
   Iteratively saves next pointer, frees current node, moves to next. */
void freeList(struct Node* head) {
    while (head != NULL) {
        struct Node* temp = head;
        head = head->next;        // advance before freeing
        free(temp);               // free current node
    }
}

int main(){
    struct Node* head = NULL;
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtBeginning(&head, 5);
    
    display(head);
    
    freeList(head);
    return 0;
}