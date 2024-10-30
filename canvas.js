

/* 
	IMAGE DATA
*/
const smallImageElement = document.getElementById('small-image');
let fullSizeImageElement = document.getElementById("original-image");
let originalCanvas = document.getElementById('original-image-canvas');
let originalContext = originalCanvas.getContext("2d");

// Imagedata object
let imageData;
// Raw data as buffer
let pixels;

export function setPixels(_UInt8Array){
	pixels = _UInt8Array;
}


/* 
	IMAGE SIZES
*/
// Actual image
let fullImageHeight = 0;
let fullImageWidth = 0;
let heightToWidthRatio = 0;

// Canvas-rendered image
let BEAD_CANVAS_HEIGHT = 500;
let bead_canvas_width = 0;
let imageToCanvasHeightRatio = 0; 


/* 
	PEARL DATA
*/
let pearlCountHeight = 0;
let pearlCountWidth = 0;
let beadRadius;



/* 
	OUTPUT CANVAS
*/
const beadCanvas = document.getElementById('canvas');
const beadContext = beadCanvas.getContext('2d');




function init_canvas(){
	// console.log("HELLO FROM CANVAS.js");

	/* 
		Original Image + It's Canvas for data access
	*/



	// fullSizeImageElement = new Image();
	// fullSizeImageElement.src = smallImageElement.src;
    console.log('fullSizeImageElement = ', fullSizeImageElement)
    console.log('fullSizeImageElement.height = ', fullSizeImageElement.height)
    console.log('fullSizeImageElement.width = ', fullSizeImageElement.width)
    console.log("");
    console.log('smallImageElement = ', smallImageElement)
    fullImageWidth = fullSizeImageElement.width;
    fullImageHeight = fullSizeImageElement.height;
	console.log('fullImageWidth = ', fullImageWidth)
	console.log('fullImageHeight = ', fullImageHeight)

    // DEV 2024-10-28
    originalCanvas = document.getElementById('original-image-canvas');
    originalContext = originalCanvas.getContext("2d");

	// Draw the image onto the canvas
	originalCanvas.width = fullImageWidth;
    originalCanvas.height = fullImageHeight;  
    originalContext.drawImage(smallImageElement, 0, 0);

    // Access raw pixel data
    imageData = originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
    pixels = imageData.data;
	console.log('pixels.length = ', pixels.length)
	console.log('pixels.length / 4 = ', pixels.length / 4)


	/* 
		Output canvas with circles
	*/
	
    beadContext.clearRect(0, 0, beadCanvas.width, beadCanvas.height);


    heightToWidthRatio =  fullImageWidth / fullImageHeight;
    console.log("heightToWidthRatio = ", heightToWidthRatio)

	// CANVAS_HEIGHT = imageHeight;
    bead_canvas_width = BEAD_CANVAS_HEIGHT * heightToWidthRatio;


	imageToCanvasHeightRatio = BEAD_CANVAS_HEIGHT / fullImageHeight;
	console.log("imageToCanvasHeightRatio = ", imageToCanvasHeightRatio)


    // Set canvas size + 2 for a 1px border
    beadCanvas.width = bead_canvas_width + 2;
    beadCanvas.height = BEAD_CANVAS_HEIGHT + 2;
    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
    // ctx.drawImage(imageElement, 1, 1, canvas_width, CANVAS_HEIGHT);


	/* 
		Pearl Info
	*/

	
    pearlCountHeight = input1.value;
    pearlCountWidth = Math.floor(pearlCountHeight * heightToWidthRatio);
    
    console.log("pearlCountHeight = ", pearlCountHeight);
    console.log("pearlCountWidth = ", pearlCountWidth);

    // pearlRadius = Math.floor(CANVAS_HEIGHT / pearlCountHeight)
    beadRadius = 0.5 * fullImageHeight / pearlCountHeight;
	console.log("pearlRadius = ", beadRadius);
	
}



function processImage() {

	// image + canvas setup
	init_canvas();

	

    
	// wi/hi = width/height index
	// Draw each pearl
	let beadIndex = 0;
    for (let hi = 0; hi < pearlCountHeight; hi++){
        for (let wi = 0; wi < pearlCountWidth; wi++){

			

			// Center location of specific bead
            let xx = beadRadius + beadRadius*2 * wi;
            let yy = beadRadius + beadRadius*2 * hi;

			// Grab the pixel value at the center of bead
            // returns "rgb(r, g, b)", e.g. "rgb(155, 0, 102)"
            let color = getImagePixelAt(xx, yy);
			// setTimeout(() => {
			// 	drawCircle(xx, yy, pearlRadius, color);
			// }, 10*pearlIndex);

			drawCircle(xx, yy, beadRadius, color);
			drawCircle(xx, yy, beadRadius/2, "rgba(255, 255, 255, 255)");

			// highlight  center point
			// drawSquareXY(xx*imageToCanvasHeightRatio, yy*imageToCanvasHeightRatio)

            // drawCircleFixed()
			beadIndex++;
        }
    }


    // drawSquare()
    // drawCircleFixed()
}

function getPearlBoundingBox(_hi, _wi){

	return {
		// x_min = Math.floor(_wi)
	}
}



/** Pixel coordinates at x-y coordinate of original image */
function getImagePixelAt(doub_x, doub_y){
	
	// lock to specific integer pixel
	let _x = Math.floor(doub_x);
	let _y = Math.floor(doub_y);

	// "The ImageData interface represents the underlying pixel data of an area of a <canvas> element."
    // imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    // pixels = imageData.data;
    // console.log("imageData.colorSpace = ", imageData.colorSpace)


    // number of bytes from beginning of file
	const index = 4 * fullImageWidth * _y + 4 * _x;
    let ri = index + 0;
    let gi = index + 1;
    let bi = index + 2;
	let ai = index + 3;

    // Convert from decimal
    // ri = Math.floor(ri/10);
    // gi = Math.floor(gi/10);
    // bi = Math.floor(bi/10);

    let _r = pixels[ri];
    let _g = pixels[gi];
    let _b = pixels[bi];
	let _a = pixels[ai];

    // console.log();
    // console.log("_x, _y = ", _x, _y)
    // console.log("ri, gi, bi, ai = ", ri, gi, bi, ai)
    // console.log("_r, _g, _b, _a = ", _r, _g, _b, _a)


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
    return `rgba(${_r}, ${_g}, ${_b}, ${_a})`;

}

/** Draws circle using image dimensions. Function will scale to canvas dimensions when rendering! */
function drawCircle(img_x, img_y, img_r, _color){
    // Example shape (rectangle)

	let canv_x = img_x * imageToCanvasHeightRatio;
	let canv_y = img_y * imageToCanvasHeightRatio;
    let canv_r = img_r * imageToCanvasHeightRatio;
    // ctx.fillRect(50, 50, 80, 80);
    // let _x = 20;
    // let _y = 20;
    // let radius = 10;
    let startAngle = 0;
    let endAngle = 2*Math.PI;
    let counterclockwise = true;

    beadContext.beginPath();
    beadContext.arc(canv_x, canv_y, canv_r, startAngle, endAngle, counterclockwise);
    beadContext.fillStyle = _color;
    beadContext.fill();
    // ctx.stroke();
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






function drawSquareXY(x, y){
    // Example shape (rectangle)
    beadContext.fillStyle = 'blue';
    beadContext.fillRect(x, y, 1, 1);

}
function drawSquare(){
    // Example shape (rectangle)
    beadContext.fillStyle = 'blue';
    beadContext.fillRect(50, 50, 80, 80);

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

    beadContext.beginPath();
    beadContext.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    beadContext.fillStyle = 'red';
    beadContext.fill();
    // ctx.stroke();
}



export {
	init_canvas,
	processImage,
	fullImageHeight as smallImageHeight,
	fullImageWidth as smallImageWidth,
}
