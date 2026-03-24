#include<conio.h>
#include<stdio.h>

int binarySearch(int arr[], int low, int high, int num);


void main(){
    int arr[10]= {-100, -90, 80, 70, -1, -5, 0, 3000, 3000, 3000};
    int i, num=3000, low = 0, high = 9;
    int index = binarySearch(arr, low, high, num);

    printf("The index of %d is %d", num, index);
}

int binarySearch(int arr[10], int low, int high, int num){
    if(low > high){
        return -1;
    }
    int mid = (low + high) / 2;
    if(arr[mid] == num){
        return mid;
    }
    else if(arr[mid] > num){
        return binarySearch(arr, low, mid - 1, num);
    }
    else{
        return binarySearch(arr, mid + 1, high, num);
    }
}