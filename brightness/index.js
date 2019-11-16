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

const mesopCheck = document.getElementById("mesopic-box");
mesopCheck.onclick = (e) => {
    // autoSetup();
    updateVals();
}

const beamCheck = document.getElementById("beam-box");
beamCheck.onclick = (e) => {
    // console.log(e.target.checked);
    autoSetup();
    updateVals();
}

const autoCalc = document.getElementById("auto-box");
autoCalc.onclick = (e) => {
    // console.log(e.target.checked);
    autoSetup();
    updateVals();
}

function lerp(val1, val2, ratio) {
    const boundedRatio = Math.min(1, Math.max(0, ratio));
    return (1 - boundedRatio) * val1 + boundedRatio * val2;
}

function boundedRatio(min, max, val) {
    if (max === min)
        return 0;
    const ratio = (val - min) / (max - min);
    return Math.min(1, Math.max(0, ratio));
}

const constants = {
    photopicLum: 613,
    scotopicLum: 1700,
    mesopEnd: closestVal(photopTable, 532) * 350,
    mesopBlueSteps: {
        '0': 0.13,
        '0.01': 0.42,
        '0.1': 0.70,
        '0.98': 0.98,
        '1': 1.00
    },
    mesopRedSteps: {
        '0': 0.00,
        '0.01': 0.34,
        '0.1': 0.68,
        '0.98': 0.98,
        '1': 1
    },
    mesopBlueWave: 440,
    mesopRedWave: 650,
    getWeight: function (stepTable, ratio) {
        let minVal = 0, maxVal = 0;
        const sortedKeys = Object.keys(stepTable).sort((a, b) => Number(a) - Number(b));
        let lastKey = sortedKeys[0];
        let startKey = sortedKeys[0];
        let endKey = sortedKeys[0];
        for (let i = 0; i < sortedKeys.length; i++) {
            if (ratio >= Number(lastKey) && ratio <= Number(sortedKeys[i])) {
                minVal = stepTable[lastKey];
                maxVal = stepTable[sortedKeys[i]];
                endKey = sortedKeys[i];
                break;
            } else
                lastKey = sortedKeys[i];
        }
        const newRatio = boundedRatio(Number(lastKey), Number(endKey), ratio);
        // console.log(lerp(minVal, maxVal, newRatio), minVal, maxVal, lastKey, endKey, ratio, newRatio)

        return lerp(minVal, maxVal, newRatio);
    },
    getRBWeight: function (wavelength, ratio) {
        const rgRatio = boundedRatio(this.mesopBlueWave, this.mesopRedWave, wavelength);
        return lerp(this.getWeight(this.mesopBlueSteps, ratio), this.getWeight(this.mesopRedSteps, ratio), rgRatio);
    },
    getMesopWeight: function (wavelength, power) {
        const brightness = closestVal(photopTable, wavelength) * power;
        const ratio = boundedRatio(1, this.mesopEnd, brightness);
        return this.getRBWeight(wavelength, ratio);
    }
}

function closestVal(table, wavelength) {
    let closest = null;
    for (const key in table) {
        if (!closest || Math.abs(wavelength - Number(key)) < Math.abs(wavelength - closest))
            closest = Number(key);
    }

    return closest ? table[closest] : 0;
}

function autoSetup() {
    if (autoCalc.checked)
        power2.setAttribute('disabled', '')
    else {
        power2.removeAttribute('disabled')
        power2.value = Math.round(power2.value);
    }

    if (!beamCheck.checked)
        mesopCheck.setAttribute('disabled', '')
    else
        mesopCheck.removeAttribute('disabled');
}

function calcBrightness(wavelength, mw) {
    let brightness = closestVal(photopTable, wavelength) * Number(mw);

    if (beamCheck.checked) {
        brightness /= Math.pow(wavelength, 4);
    }

    if (beamCheck.checked && mesopCheck.checked) {
        const photop = closestVal(photopTable, wavelength) * Number(mw) * constants.photopicLum;
        const scotop = closestVal(scotopTable, wavelength) * Number(mw) * constants.scotopicLum;
        const weight = constants.getMesopWeight(wavelength, Number(mw));
        // console.log(wavelength, closestVal(photopTable, wavelength), closestVal(scotopTable, wavelength), weight)
        brightness = lerp(scotop, photop, weight);
        brightness /= Math.pow(wavelength, 4)
    }

    return brightness;
}

function matchBrightness(brightness, wavelength) {
    const higherBright = brightness * Math.pow(wavelength, 4);
    const factor = (mesopCheck.checked) ? 1 / 100 : 10;
    let out = higherBright * factor / 10;

    // console.log(out, higherBright)
    for (let attempts = 0, lastDiff = 0, overShootProtection = 1; attempts < 100; attempts++) {
        const newBright = calcBrightness(wavelength, out) * Math.pow(wavelength, 4);
        const newDiff = higherBright - newBright;

        if (out < 0)
            out = 0;
        if (attempts > 0 && (newDiff >= 0) !== (lastDiff >= 0)) {
            if (Math.abs(newDiff) > Math.abs(lastDiff))
                overShootProtection *= Math.abs(lastDiff) / Math.abs(newDiff);
            overShootProtection /= 4;
        }
        out += newDiff * overShootProtection * factor;

        lastDiff = newDiff;
        lastOut = out;
        // console.log(out, newDiff, overShootProtection, attempts)

        if (Math.abs(newDiff) < (1 / factor) / 90)
            break;
    }
    return out;
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

    // let laserEff1 = closestVal(photopTable, laserWave1) * Number(power1.value);
    let laserEff1 = calcBrightness(laserWave1, power1.value)
    // if (beamCheck.checked)
    //     laserEff1 *= Math.pow(laserWave2 / laserWave1, 4);

    if (autoCalc.checked) {
        // power2.value = Math.round(laserEff1 / closestVal(photopTable, laserWave2));
        if (beamCheck.checked)
            power2.value = matchBrightness(laserEff1, laserWave2);
        else
            power2.value = laserEff1 / closestVal(photopTable, laserWave2);
        // console.log(laserEff1, laserWave2)
    }

    // let laserEff2 = closestVal(photopTable, laserWave2) * Number(power2.value);
    let laserEff2 = calcBrightness(laserWave2, power2.value);
    // console.log(calcBrightness(laserWave1, power1.value), calcBrightness(laserWave2, power2.value), laserEff1/ laserEff2, power2.value, power1.value, laserWave2, laserWave1)
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
    autoSetup();
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

autoSetup();
updateVals();
