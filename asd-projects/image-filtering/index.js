// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
return applyFilter
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(){
return applyFilter
}
function runIt(){

}
// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function
var x = 50;
var y = 15;
var result1 = Math.max(x, 30);
var result2 = Math.max(y, 30);

// TODO 3: Create reddify function
function reddify(red = 200){
  
}

// TODO 6: Create more filter functions
function applyFilterNoBackground(){
  
}

// CHALLENGE code goes below here

$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Apply filters
  applyFilter(reddify);
  applyFilter(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  // Loop through each row of the image
  for (let i = 0; i < image.length; i++) {
    // Loop through each pixel in the row
    for (let j = 0; j < image[i].length; j++) {
      // Step 1: Get the RGB string from the image
      const rgbString = image[i][j];
      
      // Step 2: Convert the string to an array of numbers
      const rgbNumbers = rgbStringToArray(rgbString);
      
      // Step 3: Apply the filter function to modify the RGB values
      filterFunction(rgbNumbers);
      
      // Step 4: Convert the modified array back to a string
      const newRgbString = rgbArrayToString(rgbNumbers);
      
      // Step 5: Update the image with the new RGB string
      image[i][j] = newRgbString;
    }
  }
}

// TODO 3: Create reddify function
function reddify(rgbNumbers) {
  // Set red value to 200
  rgbNumbers[RED] = 200;
}

// TODO 5: Create the keepInBounds function
function keepInBounds(value) {
  // Keep the value between 0 and 255
  return Math.max(0, Math.min(255, value));
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbNumbers) {
  // Decrease blue value by 50 and keep in bounds
  rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE] - 50);
}

function increaseGreenByBlue(rgbNumbers) {
  // Add blue value to green value and keep in bounds
  const greenValue = rgbNumbers[GREEN];
  const blueValue = rgbNumbers[BLUE];
  rgbNumbers[GREEN] = keepInBounds(greenValue + blueValue);
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  // Get background color from top-left pixel
  const backgroundColor = image[0][0];
  
  // Loop through each row of the image
  for (let i = 0; i < image.length; i++) {
    // Loop through each pixel in the row
    for (let j = 0; j < image[i].length; j++) {
      // Step 1: Compare current pixel to background
      if (image[i][j] !== backgroundColor) {
        // Step 2: Get the RGB string from the image
        const rgbString = image[i][j];
        
        // Step 3: Convert the string to an array of numbers
        const rgbNumbers = rgbStringToArray(rgbString);
        
        // Step 4: Apply the filter function to modify the RGB values
        filterFunction(rgbNumbers);
        
        // Step 5: Convert the modified array back to a string
        const newRgbString = rgbArrayToString(rgbNumbers);
        
        // Step 6: Update the image with the new RGB string
        image[i][j] = newRgbString;
      }
    }
  }
}