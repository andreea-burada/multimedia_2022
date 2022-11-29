function loadImage() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var image = new Image(width, height);
    image.src = "./Penguins.jpg";
    //image.crossOrigin = "Anonymous";

    var mX = 0;
    var mY = 0;

    image.onload = function() {
        window.addEventListener("mousemove", (event) => {
            mX = event.clientX;
            mY = event.clientY;
        });
        drawImage(image, context, height, width, mX, mY);
    };
    

}

function drawImage(image, context, height, width, mX, mY) {
    context.drawImage(image, 0, 0);
    var imageData = context.getImageData(0, 0, width, height);
    var pixels = imageData.data;
    for(let i = 0; i < height; i++)
        for(let j = 0; j < width; j++)
        {
            var pixel1 = pixels[(i+j)*4];
            var pixel2 = pixels[(i+j)*4 + 1];
            var pixel3 = pixels[(i+j)*4 + 2];
            var pixel4 = pixels[(i+j)*4 + 3];
            var distance = Math.sqrt((i - mY)*(i - mY) + (j - mX)*(j - mX));
            if (distance > 100)
            {
                var avg = (pixel1 + pixel2 + pixel3) / 3;
                pixel1 = avg;
                pixel2 = avg;
                pixel3 = avg;
            }
            else
            {
                pixel4 = pixel4 + 100;
            }
        }
    context.putImageData(imageData, 0, 0);
}




