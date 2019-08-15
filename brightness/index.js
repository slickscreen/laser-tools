const laser1 = document.getElementById("laser1");
const laser2 = document.getElementById("laser2");
laser1.style.height = "50px";
laser1.style.backgroundColor = "black";
laser2.style.height = "50px";
laser2.style.backgroundColor = "black";

const input1 = document.getElementById("input1");
input1.onchange = onChange;
const input2 = document.getElementById("input2");
input2.onchange = onChange;

const power1 = document.getElementById("power1");
power1.onchange = onChange;
const power2 = document.getElementById("power2");
power2.onchange = onChange;

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");

const beamCheck = document.getElementById("beam-box");
beamCheck.onclick = (e) => {
    // console.log(e.target.checked);
    updateVals();
}

function closestVal(wavelength) {
    let closest = null;
    for (const key in lumenTable) {
        if (!closest || Math.abs(wavelength - Number(key)) < Math.abs(wavelength - closest))
            closest = Number(key);
    }

    return closest ? lumenTable[closest] : 0;
}

function updateVals() {
    let laserWave1 = Number(input1.value);
    let laserWave2 = Number(input2.value);

    const color1 = wavelengthToColor(laserWave1)[0];
    const color2 = wavelengthToColor(laserWave2)[0];
    laser1.style.backgroundColor = color1;
    laser2.style.backgroundColor = color2;
    text1.style.borderColor = color1;
    text2.style.borderColor = color2;

    let laserEff1 = closestVal(laserWave1) * Number(power1.value);
    let laserEff2 = closestVal(laserWave2) * Number(power2.value);

    if (beamCheck.checked)
        laserEff1 *= Math.pow(laserWave2 / laserWave1, 4);

    const largest = Math.max(laserEff1, laserEff2);

    const ratio1 = laserEff1 / largest;
    const ratio2 = laserEff2 / largest;

    laser1.style.height = `${ratio1 * 100}%`;
    laser2.style.height = `${ratio2 * 100}%`;
    // console.log(laserEff1, laserEff2, inputWaves);

    text1.innerHTML = `${Number(ratio1 / ratio2).toFixed(2)}x`;
    text2.innerHTML = `${Number(ratio2 / ratio1).toFixed(2)}x`;
}

function onChange(e) {
    updateVals();
}

// Found on slack
function wavelengthToColor(wavelength) {
    var r,
        g,
        b,
        alpha,
        colorSpace,
        wl = wavelength,
        gamma = 1;


    let R, G, B;
    if (wl >= 380 && wl < 440) {
        R = -1 * (wl - 440) / (440 - 380);
        G = 0;
        B = 1;
    } else if (wl >= 440 && wl < 490) {
        R = 0;
        G = (wl - 440) / (490 - 440);
        B = 1;
    } else if (wl >= 490 && wl < 510) {
        R = 0;
        G = 1;
        B = -1 * (wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
        R = (wl - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (wl >= 580 && wl < 645) {
        R = 1;
        G = -1 * (wl - 645) / (645 - 580);
        B = 0.0;
    } else if (wl >= 645 && wl <= 780) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        R = 0;
        G = 0;
        B = 0;
    }

    // intensty is lower at the edges of the visible spectrum.
    if (wl > 780 || wl < 380) {
        alpha = 0;
    } else if (wl > 700) {
        alpha = (780 - wl) / (780 - 700);
    } else if (wl < 420) {
        alpha = (wl - 380) / (420 - 380);
    } else {
        alpha = 1;
    }

    colorSpace = ["rgba(" + (R * 100) + "%," + (G * 100) + "%," + (B * 100) + "%, " + alpha + ")", R, G, B, alpha]

    // colorSpace is an array with 5 elements.
    // The first element is the complete code as a string.  
    // Use colorSpace[0] as is to display the desired color.  
    // use the last four elements alone or together to access each of the individual r, g, b and a channels.  

    return colorSpace;
}

updateVals();
