let matrix = [];
let inputs = [];
let n = 3
let m = 4
let noSol = false;
let output = false;
//let refreshMatrix = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(178, 237, 194)

  button = createButton("Submit");
  button.position(width/2-25, 235);
  button.mousePressed(display);
  
  if(n < m && !n == null && !m == null) {
    calculateMatrix()
  }
  
  inputDisplay()
  matrixInput()
}


function calculateMatrix(){

  // for (let i = 0; i < n; i++) {
  //   matrix.push(new Array());
  //   for (let j = 0; j < m; j++) {
  //     matrix[i].push(round(random(1,255)));
  //   }
  //   console.log(matrix[i]);

  // }

  for(let i = 0; i < n; i++){
    for(let j = 0; j < m-1; j++){
      if(i == j){
        isolateVar(matrix[i],j)
      }
    }
  }

  for(let i = 0; i < n; i++){
    matrix[i] = divideArray(matrix[i],matrix[i][i])
  }
}


function isolateVar(n,c){

  for(let i = 0; i < matrix.length; i++){

    if(matrix[i] != n){

      let tempR1 = multiplyArray(n,matrix[i][c]);
     // console.log(tempR1,n,c,matrix[i][c])
      let tempR2 = multiplyArray(matrix[i],-n[c]);
      //console.log(tempR2)
      let output = addArrays(tempR1,tempR2);

    for(let j = 0; j < output.length; j++){
      if(isNaN(output[j])){
        output[j] = 0;
      }
    }

      matrix[i] = output;

    }
  }

  //console.log(matrix);

  // tempR1 = multiplyArray(r3,r1[2]);
  // tempR2 = multiplyArray(r1,-r3[2]);

  // r1 = addArrays(tempR1,tempR2);
}


function multiplyArray(arr,mult){
  let ans = [];
  for(let i = 0; i < arr.length; i++){
    ans[i] = arr[i] * mult;
  }

  return ans;
}


function addArrays(arr1,arr2){
  let ans = [];
  for(let i = 0; i < arr1.length; i++){
    ans[i] = arr1[i] + arr2[i];
  }

  return ans;
}


function divideArray(arr1,div){
  let ans = [];
  for(let i = 0; i < arr1.length; i++){
    ans[i] = arr1[i] / div;
  }
  return ans;
}


function menuPage(){
  // background(178, 237, 194)
  textSize(40)
  textAlign(CENTER,CENTER)
  text("Matrix Calculator", width/2, 50)
  
  if(output) outputDisplay()
  else {
    rowSelector(width/3,200)
    columnSelector(width/3*2,200)
  }
}


function rowSelector(x,y){
  textSize(30)
  text('Rows: '+n,x,y-50)

  strokeWeight(2)
  rect(x-60,y,40,40)
  rect(x+20,y,40,40)

  text('-',x-40,y+20)
  text('+',x+40,y+20)
  // if(hitRect(x-60,y,40,40)) n--;
  // else if(hitRect(x+20,y,40,40)) n++;
}


function columnSelector(x,y){
  textSize(30)
  text('Columns: '+m,x,y-50)

  strokeWeight(2)
  rect(x-60,y,40,40)
  rect(x+20,y,40,40)

  text('-',x-40,y+20)
  text('+',x+40,y+20)
}


function inRect(x,y,w,h){
  if(mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h){
    return true;
  } else {
    return false;
  }
}


function mousePressed(){
  if(inRect(width/3-60,200,40,40) && n > 1){
    removeInputs();
    n--;
    //refreshMatrix = true;
    
  } else if(inRect(width/3+20,200,40,40)){
    n++;
    //refreshMatrix = true;
  } else if(inRect(width/3*2-60,200,40,40) && m > n + 1){
    removeInputs();
    m--;
    //refreshMatrix = true;
  } else if(inRect(width/3*2+20,200,40,40)){ 
    m++;
    //refreshMatrix = true;
  }
  background(178, 237, 194)
  //console.log(matrix)
  inputDisplay()
  matrixInput();
  
}


function matrixInput(){

  //if(refreshMatrix){
    //inputs[n] = []
    //inputs[m] = []
    for(let row = 0; row < n; row++){
      inputs.push([])
      for(let col = 0; col < m; col++){
        inputs[row].push(createInput('0'))
        inputs[row][col].position(width/2-100+col*50,300+row*50);   
      }
    }
  textSize(10 + n * 50)
  text('[',width/2-150,300 + n * 20)
  text(']',width/2 - 120 + m * 60,300 + n * 20)
  //   refreshMatrix = false;
    
  // }

}


function removeInputs(){
  inputs.forEach((row) =>{
    row.forEach((input) =>{
      input.remove()
    });  
  });
  inputs = [];
}


function inputDisplay(){
  textSize(30)
    if(n === null || m === null) {
      text('Please select a number of rows and columns', width/2,100);
    } else if(n >= m) {
      text('Number of Rows must be less than Number of Columns', width/2,100);
      rowSelector(width/3,200)
      columnSelector(width/3*2,200)
    }  else if(isNaN(n) || isNaN(m) || n != round(n) || m != round(m)) {
      text('Please enter an integer', width/2,100)
    } else {
      menuPage()
    } 
}


function display() {
  let noSol = false;
  button.remove();
  //aI,bI, cI are the names of my input box yours are inputs[row][col].value

  
  for(let row = 0; row < n; row++){
    matrix.push(new Array())
    
    for(let col = 0; col < m; col++){
      
      let val = int(inputs[row][col].value());
      
      if (float(val) == val) {
        
        matrix[row].push(float(val))
        
      } else {
        text('Please enter an integer', width/2,100)
         noSol = true;
      }
    }
  }

  if(!noSol) calculateMatrix();

  console.log(matrix)
  output = true;
}


function outputDisplay(){
  for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
      textSize(20)
      text(round(matrix[i][j],3), width/2-80+j*50,260 + n * 75+i*50);
    }
  }
  textSize(10 + n * 50)
  text('[',width/2-150,300 + n * 75)
  text(']',width/2 - 120 + m * 60,300 + n * 75)
}