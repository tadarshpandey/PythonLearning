#include<stdio.h>

void main(){
    int i, j, a[100], n, temp;
    printf("Enter the size of the array:\n");
    scanf("%d", &n);
    printf("Enter the elements of the array:\n");
    for(i=0; i<n; i++){
        scanf("%d", &a[i]);
    }
    printf("The elements of the array before sorting are:\n");
    for(i=0; i<n; i++){
        printf("%d\t", a[i]);
    }
    printf("\n");
    for(i=0; i<n-1; i++){
        for(j=0; j<n-1-i; j++){
            if(a[j] > a[j+1]){
                temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    printf("The elements of the array after sorting are:\n");
    for(i=0; i<n; i++){
        printf("%d\t", a[i]);
    }
}

