//values = [10, 20, 30,...]
//to modify the values from a chart

function getMaxFromValues(values){
    max=values[0];
    for(i=0;i<values.length;i++){
        if(max < values[i]){
            max=values[i];
        }
    }
    return max;
}

function makeChart(cx, cy, rad, values){
    //create the title for the chart
    ctx.font = "40px serif";
   
    //the gradient
    gradient= ctx.createRadialGradient(75, 50, 5, 50, 60, 100);
    //gradient= ctx.createRadialGradient(70, 15, 30, 25, 25, 70);
    gradient.addColorStop(0, "pink");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(1, "pink");
    //the style
    ctx.fillStyle = gradient;

    ctx.fillText("Pie Chart", cx-100, 45);
    sum=0;
    for(i=0;i<values.length;i++){
        sum+=values[i];
    }
    startAngle=0;
    endAngle=0;

    for(i=0;i<values.length;i++){
        //we need a buffer to have the slices
        ctx.beginPath();
        startAngle=endAngle;
        red = Math.random() * 255;
        blue = Math.random() * 255;
        green = Math.random() * 255;
        colors[i] = "rgb( " + red + ", " + green + ", " + blue + " )";
        //we test to see if it generates random colors
        console.log(colors[i]); 
        pieSlice= values[i]/ sum;
        endAngle= startAngle + pieSlice *2 * Math.PI;
        ctx.arc(cx, cy, rad, startAngle, endAngle);
        ctx.lineTo(cx, cy);
        ctx.fillStyle=colors[i];
        ctx.fill();
        ctx.closePath();
    }

    
}

function loadPage(){
    values=[10, 20, 30, 40, 50, 60];
    colors=new Array();
    ul = document.getElementById('myul');
    max = getMaxFromValues(values);

    for(i=0;i<values.length;i++){
        //first li is the js variable, 'li' is the html variable
        li = document.createElement('li');
        label = document.createElement('label');
        input = document.createElement('input');

        //link html label to the input
        label.setAttribute('for', 'id'+i);
        label.textContent= 'Value ' + i;
        // . setAttribute=type of the attribute and the value
        input.setAttribute('id','id' + i);
        input.setAttribute('type','range');
        input.setAttribute('max', max);
        input.value=values[i];

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);

    }
    //drawing the pie chart
    canva=document.getElementById('myCanva');
    ctx=canva.getContext('2d');

    cx = canva.width/2;
    cy=canva.height/2;
    const margin = 30;
    rad = cx<cy ? cx-margin:cy-margin;
    makeChart(cx, cy, rad, values);
        
}