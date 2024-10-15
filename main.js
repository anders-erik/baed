import * as canv from "./canvas.js";

// loaded image
let imgURL = "";
let imgUint8Array;

// canv.init_canvas();


const imageSelector = document.getElementById('image-selector');
const smallImage = document.getElementById('small-image');

const input1 = document.getElementById('input1');
const value = document.querySelector("#value");

const runBtn = document.getElementById("run");
runBtn.addEventListener("click", () => {
    canv.processImage()
})

/** Update the user change size. Add small delay to prevent app freezing */
input1.addEventListener("input", (event) => {
    value.textContent = event.target.value;

    // let sizeTimeout = setTimeout(() => {
        
    // }, 300);
    canv.processImage();
  });


/** 
 * Fetch an arbitrary file.
 * Also used for automatic loading a default file for dev/showcase
 */
async function loadImage(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        // const imageArrayBuffer = await blob.arrayBuffer();
        // let imgUint8Array = new Uint8Array(imageArrayBuffer);
        // canv.setPixels(imgUint8Array);
        imgURL = URL.createObjectURL(blob);

        
        smallImage.src = imgURL;
        smallImage.onload = function() {
            canv.processImage();
        }

    } catch (error) {
        console.error('Error loading image:', error);
    }
}
// loadImage("/images/roosevelt.jpeg")
// loadImage("/images/roosevelt.webp")
loadImage("/images/teddy-head-shot.webp")
// loadImage("/images/checker.jpeg")
// loadImage("/images/gradient.jpg")
// loadImage("/images/pika.webp")
// loadImage("/images/pika_1.webp")



/** 
 * When a local file has beeen selected, this callback function calls the canvas renderer function.
 */
imageSelector.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file); 
    }
    else {
        console.error("Failed to read selected file!");
    }
    // When sucessfully read file as URL, set the image src then call the pearl rendering function
    reader.onload = function (e) {
        smallImage.src = e.target.result;
        canv.processImage()
    };

    
});





// draw()
// canv.processImage()

