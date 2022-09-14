var numbers = [];

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");


document.getElementById("btnGenerate").onclick = generateRandom;
document.getElementById("btnSort").onclick = bubbleSort;

var height = c.height;
var width = c.width;

var collumnAmount = 50;
var collumnGap = 2;
var sortingSpeed = 50;

var slider = document.getElementById("sliderSpeed");
slider.oninput = function() {
    sortingSpeed = slider.value;
}

var inputAmountBox = document.getElementById("inputAmount");
inputAmountBox.oninput = function() {
    collumnAmount = inputAmountBox.value;
}

function generateRandom() { 
    numbers = [];
    
    for(let i = 0; i<collumnAmount; i++) {
        numbers[i] = Math.floor(Math.random() * height + 1);
    }

    drawCollumns();
}

function drawCollumns() {
    context.clearRect(0, 0, width, height);

    for(let i = 0; i<collumnAmount; i++) {
        context.fillRect((width / collumnAmount) * i, height-numbers[i], width/collumnAmount - collumnGap, numbers[i]);
        context.stroke();
    }
}

function waitMs(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(''), ms);
    })
}

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function bubbleSort() {
    if(numbers.length < 1) {
        return;
    } 
    
    for (let i = 0; i < collumnAmount-1; i++) {
        for (let j = 0; j < collumnAmount-i-1; j++) {
                    if (numbers[j] > numbers[j+1]) {  
                    swap(numbers,j,j+1);  
            } 
            
            await waitMs(100 / sortingSpeed);
            drawCollumns();
        }
    }
}



