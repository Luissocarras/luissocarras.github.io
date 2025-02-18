/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//the function sorts all var in the array from smallest to largest and updates the array and bubble counter
async function bubbleSort(array){ 
for(let i = 0; i < array.length - 1; i++){ // runs throught the array 
for(let j = array.length - 1; j > 1; j-- ){ // starts at the end of the array compares the two elements to each other when it updates it moves backwards
if(array[j].value < array[j-1].value){//this is the current value it is less than j-1 it swaps the larger element whichs ends up at the end of the array
swap(array, j, j - 1); // this does the swaping if false it won't run
updateCounter(bubbleCounter); // updates the moveCount so we can see how many swaps are happaning 
await sleep(); // pauses so we can see what is going on 
      }  
    }
  }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){ // quickSort function that contains the nessary parameters
if(right - left < 0){  // base case tells when to stop sorting
return;

}
var index = await partition(array, left, right); // stores the partition for the index
if(left < index - 1){
    await quickSort(array, left, index - 1);
}
if(right > index){
    await quickSort(array, index, right);
}


}
 

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; // creates var called pivot and finds the middle index of the array and divides by 2 
    while(left < right){
     while(array[left].value < pivot){ //checks to see if the left is less than right
         left++;
     }
     while(array[right].value > pivot){ // checks to make sure if the right is greater than the pivot value
        right--;
     }
     if(left < right){ // checks to make sure if the right is greater than the left value
         swap(array, left, right);
            updateCounter(quickCounter);
     await sleep();

     }

    }
    return left + 1;
}

// TODO 1: Implement swapfunction swap(array, i, j){  
function swap(array, i, j){
var og = array[i];  //stroes array[i] in a temp variable
array[i] = array[j]; // value j is stored in the index
array[j] = og; // temp (array[i]) is stored in array[j]
drawSwap(array, i, j); // the swap that is seen visually 

}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}