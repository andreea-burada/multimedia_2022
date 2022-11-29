function loadImage() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var image = new Image(width, height);
    image.src = "./Penguins.jpg";

    var mX = null;
    var mY = null;

    image.onload = function() {
        window.addEventListener("mousemove", mousemove);
        drawImage(image);
    };
    
    function drawImage(image) {
        var noise = 100;
        var radius = 75;
        context.drawImage(image, 0, 0);
        var imageData = context.getImageData(0, 0, width, height);
        var pixels = imageData.data;
    
        let notOnImage = false;
        if ((mX === null || mY === null) || (mX > width || mY > height)) {
            notOnImage = true;
        }
    
        for(let i = 0; i < height; i++)
            for(let j = 0; j < width; j++)
            {
                var pos = (i * width + j) * 4;
                var distance = Math.sqrt((i - mY) * (i - mY) + (j - mX) * (j - mX));
                
                if (notOnImage == true || distance > radius)
                {
                    var avg = (pixels[pos] + pixels[pos + 1] + pixels[pos + 2]) / 3;
                    pixels[pos] = avg;
                    pixels[pos + 1] = avg;
                    pixels[pos + 2] = avg;
                }
                else
                {
                    pixels[pos + 3] *= Math.random() * noise;
                }
            }
        context.putImageData(imageData, 0, 0);
    };

    const mousemove = function (event) {
        mX = event.offsetX;
        mY = event.offsetY;
        drawImage(image);
    };
}






