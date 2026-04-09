#include<conio.h>
#include<stdio.h>

int main(){
    int arr[5] = {12,14,11,2,3};

    printf("Original array: ");
    for(int i = 0 ; i < 5; i++){
        printf("%d ", arr[i]);
    }
    printf("\nArray after adding 5: ");
    for(int i = 0 ; i < 5; i++){
        arr[i] = arr[i] + 5;
    }
    for(int i = 0 ; i < 5; i++){
        printf("%d ", arr[i]);
    }
    return 0;
}