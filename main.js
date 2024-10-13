console.log("PLATTAN")

let imageHeight = 0;
let imageWidth = 0;

// Small image data
let imageData;
let pixels;

const CANVAS_HEIGHT = 500;
let canvas_width = 0;
let heightToWidthRatio = 0;

let pearlCountHeight = 0;
let pearlCountWidth = 0;

let pearlRadius;


const imageSelector = document.getElementById('image-selector');
const smallImage = document.getElementById('small-image');

const input1 = document.getElementById('input1');
const value = document.querySelector("#value");
input1.addEventListener("input", (event) => {
    value.textContent = event.target.value;
    processImage();
  });


// Example to draw shapes on the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// IMAGE DATA




imageSelector.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        smallImage.src = e.target.result;
        processImage()
    };

    if (file) {
        reader.readAsDataURL(file);
        
    }
});

async function loadImage(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const imgURL = URL.createObjectURL(blob);

        smallImage.src = imgURL;
        smallImage.onload = function() {
            processImage();
        }
    } catch (error) {
        console.error('Error loading image:', error);

    }
}
// loadImage("/roosevelt.jpeg")
loadImage("/checker.jpeg")



function processImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log('smallImage = ', smallImage)
    imageWidth = smallImage.width;
    imageHeight = smallImage.height;

    heightToWidthRatio =  imageWidth / imageHeight;
    console.log("heightToWidthRatio = ", heightToWidthRatio)



    canvas_width = CANVAS_HEIGHT * heightToWidthRatio;

    // Draw the image onto the canvas to access pixel data
    canvas.width = canvas_width;
    canvas.height = CANVAS_HEIGHT;
    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
    ctx.drawImage(smallImage, 0, 0, canvas_width, CANVAS_HEIGHT);

    



    pearlCountHeight = input1.value;
    pearlCountWidth = Math.floor(pearlCountHeight * heightToWidthRatio);
    
    console.log("pearlCountHeight = ", pearlCountHeight);
    console.log("pearlCountWidth = ", pearlCountWidth);

    // pearlRadius = Math.floor(CANVAS_HEIGHT / pearlCountHeight)
    pearlRadius = 0.5 * CANVAS_HEIGHT / pearlCountHeight;
    
    for (let wi = 0; wi < pearlCountWidth; wi++){
        for (let hi = 0; hi < pearlCountHeight; hi++){

            let xx = pearlRadius + pearlRadius*2 * wi;
            let yy = pearlRadius + pearlRadius*2 * hi;

            // "rgb(155, 0, 102)"
            let color = getImagePixelAt(xx, yy);

            drawCircle(xx, yy, pearlRadius, color);
            // drawCircleFixed()

        }
    }


    // drawSquare()
    // drawCircleFixed()
}

//** Returns average color for the passed pearl location */
function setColor(_xx, _yy){

    
    // pixel
    let colorObject = getImagePixelAt(_xx, _yy);

    let r = Math.random()*255;
    let g = Math.random()*255;
    let b = Math.random()*255;

    return `rgb(${r}, ${g}, ${b})`;
}

/** Pixel coordinates */
function getImagePixelAt(_x, _y){
    
    imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    pixels = imageData.data;
    // console.log("imageData.colorSpace = ", imageData.colorSpace)


    // number of bytes from beginning of file
    let ri = 4 * imageWidth * _y + 4 * _x;
    let gi = ri + 1;
    let bi = ri + 2;

    // Convert from decimal
    ri = Math.floor(ri/10);
    gi = Math.floor(gi/10);
    bi = Math.floor(bi/10);

    let _r = pixels[ri];
    let _g = pixels[gi];
    let _b = pixels[bi];

    console.log();
    console.log("_x, _y = ", _x, _y)
    console.log("ri, gi, bi = ", ri, gi, bi)
    console.log("_r, _g, _b = ", _r, _g, _b)


    // // // Loop through each pixel (4 values per pixel: R, G, B, A)
    // let pixelCount = 0;
    // for (let i = 0; i < pixels.length; i += 4) {
    //     const r = pixels[i];     // Red
    //     const g = pixels[i + 1]; // Green
    //     const b = pixels[i + 2]; // Blue
    //     const a = pixels[i + 3]; // Alpha

    //     // You can now manipulate or process the pixel data
    //     // console.log(`Pixel ${i / 4}: R=${r}, G=${g}, B=${b}, A=${a}`);
    //     pixelCount++;
    // }

    // return {_r, _g, _b};
    return `rgb(${_r}, ${_g}, ${_b})`;

}

function drawCircle(_x, _y, _r, _color){
    // Example shape (rectangle)
    
    // ctx.fillRect(50, 50, 80, 80);
    // let _x = 20;
    // let _y = 20;
    let radius = 10;
    let startAngle = 0;
    let endAngle = 2*Math.PI;
    let counterclockwise = true;

    ctx.beginPath();
    ctx.arc(_x, _y, _r, startAngle, endAngle, counterclockwise);
    ctx.fillStyle = _color;
    ctx.fill();
    // ctx.stroke();
}

function drawCircleFixed(){
    // Example shape (rectangle)
    
    // ctx.fillRect(50, 50, 80, 80);
    let x = 20;
    let y = 20;
    let radius = 10;
    let startAngle = 0;
    let endAngle = 2*Math.PI;
    let counterclockwise = true;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fillStyle = 'red';
    ctx.fill();
    // ctx.stroke();
}


function drawSquare(){
    // Example shape (rectangle)
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 80, 80);

}



// draw()
// processImage()

