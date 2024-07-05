rows = document.querySelectorAll(".row");
buffers = document.querySelectorAll(".buffer");

// Initialization
// Loop over rows
starts = Array(rows.length).fill(0);
loops = Array(rows.length).fill(0);
speeds = Array(rows.length).fill(0);
for(var i = 0; i < rows.length; i++){
    // Set start and loop points
    starts[i] = parseFloat(rows[i].dataset.start);
    loops[i] = parseFloat(rows[i].dataset.loop);
    speeds[i] = parseFloat(rows[i].dataset.speed);

    // Loop over images
    images = rows[i].querySelectorAll(".image");
    numim = images.length;
    // Add copies
    for(var j = 0; j < numim; j++){
        rows[i].appendChild(images[j].cloneNode(true));
    }
    for(var j = 0; j < numim; j++){
        rows[i].appendChild(images[j].cloneNode(true));
    }
}

// Set initial margin
for(var i = 0; i < rows.length; i++){
    buffers[i].style.marginLeft = starts[i] + "vw";
}

// Rotate each row
function rotate(rate){
    for(var i = 0; i < rows.length; i++){
        // Calculate start value and increment
        current = parseFloat(buffers[i].style.marginLeft.slice(0, -2));
        add = speeds[i] / rate;

        // Force loop
        finish = current + add;
        start = starts[i];
        loop = loops[i];
        if(finish > start + loop){
            finish -= loop;
        }
        if(finish < start - loop){
            finish += loop;
        }

        // Set new value
        buffers[i].style.marginLeft = finish + "vw";
    }
}

// Rotation
setInterval(function(){rotate(60)}, 1000/60);

function setSwap(j){
    rows[j].addEventListener('mouseover', () => {
        speeds[j] *= -0.5;
    });
      
    rows[j].addEventListener('mouseout', () => {
        speeds[j] *= -2;
    });
}

// Reversal on hover
for(var i = 0; i < rows.length; i++){
    setSwap(i);
};