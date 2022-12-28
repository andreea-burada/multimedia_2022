var mX = null;
var mY = null;

window.onload = function(){
    let canvas=document.getElementById("canvas");
    console.log(canvas);
    let context=canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    let img=new Image();
    img.src="./Penguins.jpg";

    img.onload=function(){
        document.addEventListener("mousemove", mousemove);
        modifyImage(mX, mY);
    };

    function modifyImage(x, y)
    {
        var noise = 10;
        console.log('X ' + x);
        console.log('Y ' + y);
        context.drawImage(img, 0, 0, width, height);
        var imageData = context.getImageData(0, 0, width, height);
        var pixels = imageData.data;

        let notOnImage = false;
        if (x === null || y === null) {
            notOnImage = true;
        }
        else if (x > width || y > height)
        {
            notOnImage = true;
        }

        for(let i = 0; i < height; i++)
        {
            for(let j = 0; j < width; j++)
            {
                var pos = (i * 4) * width + j * 4;
                var distance;
                if (notOnImage == true)
                    distance = 0;
                else
                    distance = Math.sqrt((i - y) * (i - y) + (j - x) * (j - x));
                if (notOnImage == true || distance > 100)
                {
                    var avg = (pixels[pos] + pixels[pos + 1] + pixels[pos + 2]) / 3;
                    pixels[pos] = avg;
                    pixels[pos + 1] = avg;
                    pixels[pos + 2] = avg;
                }
                else
                {
                    // pixels[pos] += noise;
                    // pixels[pos + 1] *= noise;
                    // pixels[pos + 2] *= noise;
                    pixels[pos + 3] *= Math.random() * noise;
                }
            }
        
        }
        context.putImageData(imageData, 0, 0);
    };
    
    const mousemove = function (event) {
        mX = event.clientX;
        mY = event.clientY;
        modifyImage(mX, mY);
    };
};