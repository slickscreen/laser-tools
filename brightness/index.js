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

// http://www.cvrl.org/lumindex.htm
const lumenTable = {
    390: 0.000414616,
    391: 0.000502833,
    392: 0.000608499,
    393: 0.000734444,
    394: 0.000883739,
    395: 0.00105965,
    396: 0.00126553,
    397: 0.00150475,
    398: 0.00178049,
    399: 0.00209557,
    400: 0.00245219,
    401: 0.00285222,
    402: 0.00329912,
    403: 0.00379747,
    404: 0.00435277,
    405: 0.00497172,
    406: 0.00566101,
    407: 0.00642161,
    408: 0.00725031,
    409: 0.00814017,
    410: 0.00907986,
    411: 0.0100561,
    412: 0.0110646,
    413: 0.0121052,
    414: 0.0131801,
    415: 0.0142938,
    416: 0.01545,
    417: 0.0166409,
    418: 0.017853,
    419: 0.0190702,
    420: 0.0202737,
    421: 0.0214481,
    422: 0.0226004,
    423: 0.0237479,
    424: 0.0249125,
    425: 0.0261211,
    426: 0.0273992,
    427: 0.0287499,
    428: 0.0301691,
    429: 0.0316514,
    430: 0.0331904,
    431: 0.0347791,
    432: 0.0364149,
    433: 0.0380957,
    434: 0.0398184,
    435: 0.0415794,
    436: 0.043371,
    437: 0.0451718,
    438: 0.0469542,
    439: 0.0486872,
    440: 0.0503366,
    441: 0.0518761,
    442: 0.0533222,
    443: 0.054706,
    444: 0.0560634,
    445: 0.0574339,
    446: 0.0588511,
    447: 0.0603081,
    448: 0.0617864,
    449: 0.0632657,
    450: 0.0647235,
    451: 0.0661475,
    452: 0.0675726,
    453: 0.0690493,
    454: 0.0706328,
    455: 0.0723834,
    456: 0.0743596,
    457: 0.0765938,
    458: 0.0791144,
    459: 0.0819535,
    460: 0.0851482,
    461: 0.0887266,
    462: 0.0926601,
    463: 0.0968972,
    464: 0.101375,
    465: 0.106014,
    466: 0.110738,
    467: 0.115511,
    468: 0.120312,
    469: 0.125116,
    470: 0.129896,
    471: 0.13463,
    472: 0.139331,
    473: 0.144023,
    474: 0.148737,
    475: 0.153507,
    476: 0.158364,
    477: 0.16332,
    478: 0.168376,
    479: 0.173537,
    480: 0.178805,
    481: 0.184182,
    482: 0.189656,
    483: 0.19521,
    484: 0.200826,
    485: 0.206483,
    486: 0.212183,
    487: 0.218028,
    488: 0.224159,
    489: 0.23073,
    490: 0.237916,
    491: 0.245871,
    492: 0.254602,
    493: 0.264076,
    494: 0.274249,
    495: 0.285068,
    496: 0.296484,
    497: 0.308501,
    498: 0.321139,
    499: 0.334418,
    500: 0.348354,
    501: 0.36296,
    502: 0.378228,
    503: 0.394136,
    504: 0.410658,
    505: 0.42776,
    506: 0.445399,
    507: 0.46354,
    508: 0.482138,
    509: 0.501143,
    510: 0.520497,
    511: 0.540139,
    512: 0.560021,
    513: 0.580097,
    514: 0.600317,
    515: 0.620626,
    516: 0.64094,
    517: 0.661077,
    518: 0.680813,
    519: 0.699904,
    520: 0.718089,
    521: 0.735159,
    522: 0.751182,
    523: 0.766314,
    524: 0.780735,
    525: 0.794645,
    526: 0.808207,
    527: 0.821382,
    528: 0.83407,
    529: 0.846171,
    530: 0.85758,
    531: 0.868241,
    532: 0.878306,
    533: 0.887991,
    534: 0.897521,
    535: 0.907135,
    536: 0.916995,
    537: 0.926929,
    538: 0.936673,
    539: 0.945948,
    540: 0.954468,
    541: 0.961983,
    542: 0.968439,
    543: 0.973829,
    544: 0.978152,
    545: 0.981411,
    546: 0.983667,
    547: 0.985208,
    548: 0.986381,
    549: 0.987536,
    550: 0.989023,
    551: 0.991081,
    552: 0.993491,
    553: 0.995917,
    554: 0.998021,
    555: 0.999461,
    556: 0.999993,
    557: 0.999756,
    558: 0.998984,
    559: 0.997912,
    560: 0.996774,
    561: 0.995736,
    562: 0.994711,
    563: 0.993553,
    564: 0.992116,
    565: 0.990255,
    566: 0.98786,
    567: 0.984932,
    568: 0.981504,
    569: 0.977603,
    570: 0.973261,
    571: 0.968476,
    572: 0.963137,
    573: 0.957106,
    574: 0.950254,
    575: 0.942457,
    576: 0.93369,
    577: 0.924289,
    578: 0.914671,
    579: 0.905233,
    580: 0.896361,
    581: 0.888307,
    582: 0.880846,
    583: 0.873645,
    584: 0.866376,
    585: 0.85872,
    586: 0.85043,
    587: 0.841505,
    588: 0.832011,
    589: 0.822015,
    590: 0.811587,
    591: 0.800787,
    592: 0.789652,
    593: 0.778205,
    594: 0.766473,
    595: 0.754479,
    596: 0.742247,
    597: 0.729823,
    598: 0.717252,
    599: 0.704582,
    600: 0.691855,
    601: 0.679101,
    602: 0.666285,
    603: 0.653359,
    604: 0.640281,
    605: 0.627007,
    606: 0.613515,
    607: 0.599849,
    608: 0.586068,
    609: 0.572226,
    610: 0.558375,
    611: 0.544554,
    612: 0.530767,
    613: 0.517013,
    614: 0.503289,
    615: 0.489595,
    616: 0.475944,
    617: 0.462396,
    618: 0.449015,
    619: 0.435862,
    620: 0.42299,
    621: 0.410415,
    622: 0.398036,
    623: 0.38573,
    624: 0.373391,
    625: 0.360924,
    626: 0.348286,
    627: 0.33557,
    628: 0.322896,
    629: 0.31037,
    630: 0.298086,
    631: 0.286116,
    632: 0.274482,
    633: 0.263195,
    634: 0.252263,
    635: 0.24169,
    636: 0.231481,
    637: 0.221638,
    638: 0.212162,
    639: 0.203054,
    640: 0.194312,
    641: 0.185923,
    642: 0.177827,
    643: 0.169965,
    644: 0.162284,
    645: 0.15474,
    646: 0.147308,
    647: 0.140017,
    648: 0.132901,
    649: 0.125991,
    650: 0.119312,
    651: 0.112882,
    652: 0.106711,
    653: 0.100805,
    654: 0.0951665,
    655: 0.0897959,
    656: 0.0846904,
    657: 0.0798401,
    658: 0.0752337,
    659: 0.0708606,
    660: 0.0667104,
    661: 0.0627736,
    662: 0.0590418,
    663: 0.055507,
    664: 0.0521614,
    665: 0.048997,
    666: 0.0460058,
    667: 0.0431788,
    668: 0.0405075,
    669: 0.0379838,
    670: 0.0355998,
    671: 0.0333486,
    672: 0.0312233,
    673: 0.0292178,
    674: 0.027326,
    675: 0.0255422,
    676: 0.0238612,
    677: 0.0222786,
    678: 0.0207902,
    679: 0.0193919,
    680: 0.0180794,
    681: 0.0168482,
    682: 0.0156919,
    683: 0.0146045,
    684: 0.0135806,
    685: 0.0126157,
    686: 0.011707,
    687: 0.0108561,
    688: 0.0100648,
    689: 0.00933338,
    690: 0.00866128,
    691: 0.00804605,
    692: 0.00748113,
    693: 0.00695999,
    694: 0.00647707,
    695: 0.00602768,
    696: 0.00560817,
    697: 0.00521669,
    698: 0.00485179,
    699: 0.00451201,
    700: 0.00419594,
    701: 0.00390206,
    702: 0.00362837,
    703: 0.00337301,
    704: 0.00313432,
    705: 0.00291086,
    706: 0.00270153,
    707: 0.0025058,
    708: 0.00232323,
    709: 0.00215333,
    710: 0.00199556,
    711: 0.00184932,
    712: 0.00171398,
    713: 0.0015889,
    714: 0.00147345,
    715: 0.00136702,
    716: 0.00126895,
    717: 0.00117842,
    718: 0.00109464,
    719: 0.00101694,
    720: 0.000944727,
    721: 0.000877517,
    722: 0.000815044,
    723: 0.000757076,
    724: 0.000703376,
    725: 0.000653705,
    726: 0.000607805,
    727: 0.000565344,
    728: 0.000526005,
    729: 0.000489506,
    730: 0.000455597,
    731: 0.000424055,
    732: 0.000394686,
    733: 0.000367318,
    734: 0.000341794,
    735: 0.000317974,
    736: 0.000295744,
    737: 0.000275056,
    738: 0.000255864,
    739: 0.000238114,
    740: 0.000221745,
    741: 0.000206671,
    742: 0.000192747,
    743: 0.000179831,
    744: 0.000167802,
    745: 0.000156557,
    746: 0.000146017,
    747: 0.000136153,
    748: 0.000126945,
    749: 0.000118367,
    750: 0.000110393,
    751: 0.000102991,
    752: 0.0000961184,
    753: 0.0000897332,
    754: 0.0000837969,
    755: 0.0000782744,
    756: 0.0000731331,
    757: 0.0000683414,
    758: 0.0000638704,
    759: 0.0000596939,
    760: 0.0000557886,
    761: 0.0000521351,
    762: 0.0000487218,
    763: 0.0000455385,
    764: 0.0000425744,
    765: 0.0000398188,
    766: 0.0000372588,
    767: 0.0000348747,
    768: 0.0000326477,
    769: 0.0000305614,
    770: 0.0000286018,
    771: 0.0000267584,
    772: 0.0000250294,
    773: 0.0000234137,
    774: 0.0000219091,
    775: 0.0000205126,
    776: 0.000019219,
    777: 0.000018018,
    778: 0.000016899,
    779: 0.0000158531,
    780: 0.0000148724,
    781: 0.0000139509,
    782: 0.0000130853,
    783: 0.0000122733,
    784: 0.0000115123,
    785: 0.0000108,
    786: 0.0000101336,
    787: 0.00000950992,
    788: 0.00000892563,
    789: 0.00000837785,
    790: 0.00000786392,
    791: 0.00000738154,
    792: 0.0000069291,
    793: 0.00000650514,
    794: 0.00000610822,
    795: 0.00000573694,
    796: 0.00000538983,
    797: 0.00000506527,
    798: 0.00000476167,
    799: 0.00000447756,
    800: 0.0000042116,
    801: 0.00000396246,
    802: 0.00000372867,
    803: 0.00000350888,
    804: 0.00000330187,
    805: 0.00000310656,
    806: 0.00000292212,
    807: 0.00000274821,
    808: 0.00000258456,
    809: 0.00000243087,
    810: 0.00000228679,
    811: 0.00000215191,
    812: 0.00000202566,
    813: 0.00000190746,
    814: 0.00000179679,
    815: 0.00000169315,
    816: 0.00000159603,
    817: 0.0000015049,
    818: 0.00000141925,
    819: 0.0000013386,
    820: 0.00000126256,
    821: 0.00000119077,
    822: 0.00000112303,
    823: 0.00000105915,
    824: 9.98951e-7,
    825: 9.42251e-7,
    826: 8.8888e-7,
    827: 8.38669e-7,
    828: 7.91454e-7,
    829: 7.47077e-7,
    830: 7.05386e-7,
};

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

    laser1.style.backgroundColor = wavelengthToColor(laserWave1)[0];
    laser2.style.backgroundColor = wavelengthToColor(laserWave2)[0];

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