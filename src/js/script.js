import { getData } from "./test-api";
import { addEgg, removeEgg, windColor, humidColor } from "./utils";
import { Fuzzificate, Interference} from "./process"

// Containers
const addEggBtn = document.getElementById('add-egg');
const rmEggBtn = document.getElementById('remove-egg');
const effectArea = document.getElementById('effect-area');
const tempp = document.getElementById('temp');
const humidp = document.getElementById('humid');
const spacep = document.getElementById('space');

let currentTemp = 0;
let currentHumid = 0;

function fuzzyLogicTemp(tempVal, spaceVal){
    // Temp Fuzz
    const temp = new Fuzzificate();
    temp.addFuzz('Cold Temp', [16, 16, 30]);
    temp.addFuzz('Low Temp', [16, 25, 34]);
    temp.addFuzz("Optimal Temp", [30, 34, 38]);
    temp.addFuzz("High Temp", [34, 42, 50]);
    temp.addFuzz("Critical Temp", [38, 50, 50]);
    temp.calculateFuzz(tempVal);
    // console.log(temp.getFuzzVal());

    // Room size
    const size = new Fuzzificate();
    size.addFuzz('Small',[0, 0, 3]);
    size.addFuzz('Medium', [3, 5, 7]);
    size.addFuzz('Large', [7, 10, 10]);
    size.calculateFuzz(spaceVal);
    // console.log(size.getFuzzVal());

    // Consquent
    const consequent = new Fuzzificate();
    consequent.addFuzz('High Heating', [0, 0, 3]);
    consequent.addFuzz('Low Heating', [0, 3, 5]);
    consequent.addFuzz('No Action', [3, 5, 7]);
    consequent.addFuzz('Low Cooling', [5, 7, 10]);
    consequent.addFuzz('High Cooling', [7, 10, 10]);

    const control = new Interference();
    control.addRule('High Heating', [temp.getVal('Cold Temp'), size.getVal('Small')]);
    control.addRule('High Heating', [temp.getVal('Cold Temp'), size.getVal('Medium')]);
    control.addRule('High Heating', [temp.getVal('Cold Temp'), size.getVal('Large')]);

    control.addRule('Low Heating', [temp.getVal('Low Temp'), size.getVal('Small')]);
    control.addRule('Low Heating', [temp.getVal('Low Temp'), size.getVal('Medium')]);
    control.addRule('Low Heating', [temp.getVal('Low Temp'), size.getVal('Large')]);

    control.addRule('No Action', [temp.getVal('Optimal Temp'), size.getVal('Small')]);
    control.addRule('No Action', [temp.getVal('Optimal Temp'), size.getVal('Medium')]);
    control.addRule('No Action', [temp.getVal('Optimal Temp'), size.getVal('Large')]);

    control.addRule('Low Cooling', [temp.getVal('High Temp'), size.getVal('Small')]);
    control.addRule('Low Cooling', [temp.getVal('High Temp'), size.getVal('Medium')]);
    control.addRule('Low Cooling', [temp.getVal('High Temp'), size.getVal('Large')]);

    control.addRule('High Cooling', [temp.getVal('Critical Temp'), size.getVal('Small')]);
    control.addRule('High Cooling', [temp.getVal('Critical Temp'), size.getVal('Medium')]);
    control.addRule('High Cooling', [temp.getVal('Critical Temp'), size.getVal('Large')]);

    const crisp = consequent.defuzz(control);
    //console.log(crisp);
    return crisp;
}

function fuzzyLogicHumid(humidVal, spaceVal){
    // Humid Fuzz
    const humid = new Fuzzificate();
    humid.addFuzz('Very High', [40, 40, 60]);
    humid.addFuzz('Poor High', [50, 60, 70]);
    humid.addFuzz('Optimal', [60, 70, 80]);
    humid.addFuzz('Poor Low', [70, 80, 90]);
    humid.addFuzz('Very Low', [80, 100, 100]);
    humid.calculateFuzz(humidVal);

    // Room size
    const size = new Fuzzificate();
    size.addFuzz('Small',[0, 0, 3]);
    size.addFuzz('Medium', [3, 5, 7]);
    size.addFuzz('Large', [7, 10, 10]);
    size.calculateFuzz(spaceVal);

    const humidConsequent = new Fuzzificate();
    humidConsequent.addFuzz('High Dehumidification', [0, 0, 3]);
    humidConsequent.addFuzz('Low Dehumidification', [0, 3, 5]);
    humidConsequent.addFuzz('No Action', [3, 5, 7]);
    humidConsequent.addFuzz('Low Humidification', [5, 7, 10]);
    humidConsequent.addFuzz('High Humidification', [7, 10, 10]);

    const humidControl = new Interference();
    humidControl.addRule('High Dehumidification', [humid.getVal('Very High'), size.getVal('Small')]);
    humidControl.addRule('High Dehumidification', [humid.getVal('Very High'), size.getVal('Medium')]);
    humidControl.addRule('High Dehumidification', [humid.getVal('Very High'), size.getVal('Large')]);

    humidControl.addRule('Low Dehumidification', [humid.getVal('Poor Low'), size.getVal('Small')]);
    humidControl.addRule('Low Dehumidification', [humid.getVal('Poor Low'), size.getVal('Medium')]);
    humidControl.addRule('Low Dehumidification', [humid.getVal('Poor Low'), size.getVal('Large')]);

    humidControl.addRule('No Action', [humid.getVal('Optimal'), size.getVal('Small')]);
    humidControl.addRule('No Action', [humid.getVal('Optimal'), size.getVal('Medium')]);
    humidControl.addRule('No Action', [humid.getVal('Optimal'), size.getVal('Large')]);

    humidControl.addRule('Low Humidification', [humid.getVal('Poor Low'), size.getVal('Small')]);
    humidControl.addRule('Low Humidification', [humid.getVal('Poor Low'), size.getVal('Medium')]);
    humidControl.addRule('Low Humidification', [humid.getVal('Poor Low'), size.getVal('Large')]);

    humidControl.addRule('High Humidification', [humid.getVal('Very Low'), size.getVal('Small')]);
    humidControl.addRule('High Humidification', [humid.getVal('Very Low'), size.getVal('Medium')]);
    humidControl.addRule('High Humidification', [humid.getVal('Very Low'), size.getVal('Large')]);

    const humidOut = humidConsequent.defuzz(humidControl);
    //console.log(humidOut);
    return humidOut;
}

async function initialize(){
    await setData(tempp, "temp");
    await setData(humidp, 'humid');
    await setData(spacep, 'space');

    const tempInp = document.getElementById('temp-input');
    const humidInp = document.getElementById('humid-input');
    const spaceInp = document.getElementById('space-input');

    const tempValue = parseFloat(tempInp.value);
    const humidValue = parseFloat(humidInp.value);
    const spaceValue = parseFloat(spaceInp.value);

    currentTemp = tempValue;
    currentHumid = humidValue;

    //loopInf();
    setInterval(loopInf, 1500);  

    setInterval(function(){createWind(currentTemp);}, 1000);
    setInterval(function(){createHumid(currentHumid)}, 1000);
}

function loopInf(){
    const tempInp = document.getElementById('temp-input');
    const humidInp = document.getElementById('humid-input');
    const spaceInp = document.getElementById('space-input');

    const tempValue = parseFloat(tempInp.value);
    const humidValue = parseFloat(humidInp.value);
    const spaceValue = parseFloat(spaceInp.value);

    const tempCrisp = fuzzyLogicTemp(tempValue, spaceValue);
    const humidCrisp = fuzzyLogicHumid(humidValue, spaceValue);

    const naturaHeat = 0.1;
    const naturalHumid = 0.1;

    let coolingRate;
    let heatingRate;
    let humidRate;
    let dehumidRate;

    if (spaceValue <= 3){
        coolingRate = 0.3;
        heatingRate = 0.3;
        humidRate = 0.3;
        dehumidRate = 0.3;
    }else if (spaceValue <= 7){
        coolingRate = 0.1;
        heatingRate = 0.1;
        humidRate = 0.1;
        dehumidRate = 0.1;
    }else{
        coolingRate = 0.05;
        heatingRate = 0.05;
        humidRate = 0.05;
        dehumidRate = 0.05;
    }

    //console.log('tempCrisp value:', tempCrisp);
    //console.log('humidCrisp value:', humidCrisp);

    currentTemp = tempValue - naturaHeat;
    currentHumid = humidValue - naturalHumid;

    // Actions and their corresponding temperature adjustment
    const tempData = [
        {action: "High Heating", min: 0, max: 3, adjustment: heatingRate * 3},
        {action: "Low Heating", min: 0, max: 5, adjustment: heatingRate},   
        {action: "No Action", min: 3, max: 7, adjustment: 0},     
        {action: "Low Cooling", min: 5, max: 10, adjustment: -coolingRate},  
        {action: "High Cooling", min: 7, max: 10, adjustment: -coolingRate * 3}  
    ];

    const humidData = [
        {action: "High Dehumidification", min: 0, max: 3, adjustment: dehumidRate * 3},
        {action: "Low Dehumidification", min: 0, max: 5, adjustment: dehumidRate}, 
        {action: "No Action", min: 3, max: 7, adjustment: 0},      
        {action: "Low Humidification", min: 5, max: 10, adjustment: -humidRate},
        {action: "High Humidification", min: 7, max: 10, adjustment: -humidRate* 3}
    ];

    for (const key in tempData){
        if (tempCrisp >= tempData[key].min && tempCrisp <= tempData[key].max){
            //console.log('Action:', tempData[key].action);
            
            currentTemp += tempData[key].adjustment;
            
            //console.log('Adjusted Temperature:', currentTemp);
            break; 
        }
    }

    for (const key in humidData){
        if (humidCrisp >= humidData[key].min && humidCrisp <= humidData[key].max){
            //console.log('Action:', humidData[key].action);
            
            currentHumid += humidData[key].adjustment;
            
            //console.log('Adjusted Humid:', currentHumid);
            break; 
        }
    }

    tempInp.value = Math.round(currentTemp * 100)/ 100;
    humidInp.value = Math.round(currentHumid * 100)/ 100;
}

function createWind(tempValue){
    const container = document.createElement('div');
    const modifiedSGV = `
        <svg width="50px" height="50px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="wind" transform="translate(-2 -2)">
                    <path id="primary" d="M3,7h7a2,2,0,0,0,0-4" fill="none" stroke="${windColor(tempValue)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-2" data-name="primary" d="M16,21a3,3,0,0,0,0-6H3" fill="none" stroke="${windColor(tempValue)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <line id="primary-3" data-name="primary" x2="7" transform="translate(3 19)" fill="none" stroke="${windColor(tempValue)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-4" data-name="primary" d="M3,11H17.5a3.5,3.5,0,1,0,0-7" fill="none" stroke="${windColor(tempValue)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </g>
            </svg>
    `;
    container.innerHTML = modifiedSGV;
    container.classList.add('wind-img');

    container.style.top = `${Math.random() * 45}vh`;
    container.style.animationDuration = `${Math.random() * 5 + 2}s`;
    // container.appendChild(wind);
    effectArea.appendChild(container);

    container.addEventListener('animationend', () => {
        container.remove();
    });
}

function createHumid(humidValue){
    const container = document.createElement('div');
    //console.log("humid color", humidColor(humidValue));
    //console.log("Humid Value", humidValue);
    const modifiedSGV = `
        <?xml version="1.0" encoding="iso-8859-1"?>
        <!--Uploaded to SVGRepo https://www.svgrepo.com-->
        <!--License: Apache. Made by Carbon Design: https://github.com/carbon-design-system/carbon-->
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <path stroke="${humidColor(humidValue)}" id="humid_1_" d="M31,26.36c-0.898,0-1.645-0.656-2.138-1.09c-0.539-0.474-1.036-0.91-1.612-0.91
            c-0.602,0-1.149,0.481-1.633,0.906C25.054,25.76,24.37,26.36,23.5,26.36c-0.873,0-1.558-0.603-2.107-1.086
            c-0.496-0.435-1.043-0.914-1.643-0.914c-0.602,0-1.149,0.481-1.633,0.906C17.554,25.761,16.871,26.36,16,26.36
            c-0.872,0-1.556-0.601-2.105-1.084c-0.497-0.436-1.044-0.916-1.645-0.916s-1.147,0.48-1.63,0.904
            C10.056,25.76,9.372,26.36,8.5,26.36s-1.556-0.601-2.105-1.084C5.897,24.841,5.351,24.36,4.75,24.36s-1.147,0.48-1.63,0.904
            C2.556,25.76,1.872,26.36,1,26.36v-0.72c0.601,0,1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084
            C7.353,25.159,7.899,25.64,8.5,25.64s1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084
            C14.852,25.16,15.399,25.64,16,25.64c0.6,0,1.146-0.479,1.628-0.902c0.564-0.495,1.249-1.098,2.122-1.098
            c0.87,0,1.554,0.6,2.104,1.082c0.497,0.437,1.045,0.918,1.646,0.918c0.6,0,1.146-0.479,1.628-0.902
            c0.564-0.495,1.249-1.098,2.122-1.098c0.848,0,1.502,0.576,2.028,1.038c0.496,0.437,1.095,0.962,1.722,0.962V26.36z M31,20.36
            c-0.898,0-1.645-0.656-2.138-1.09c-0.539-0.474-1.036-0.91-1.612-0.91c-0.602,0-1.149,0.481-1.633,0.906
            C25.054,19.76,24.37,20.36,23.5,20.36c-0.873,0-1.558-0.603-2.107-1.086c-0.496-0.435-1.043-0.914-1.643-0.914
            c-0.602,0-1.149,0.481-1.633,0.906C17.554,19.761,16.871,20.36,16,20.36c-0.872,0-1.556-0.601-2.105-1.084
            c-0.497-0.436-1.044-0.916-1.645-0.916s-1.147,0.48-1.63,0.904C10.056,19.76,9.372,20.36,8.5,20.36s-1.556-0.601-2.105-1.084
            C5.897,18.841,5.351,18.36,4.75,18.36s-1.147,0.48-1.63,0.904C2.556,19.76,1.872,20.36,1,20.36v-0.72c0.601,0,1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084C7.353,19.159,7.899,19.64,8.5,19.64s1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084C14.852,19.16,15.399,19.64,16,19.64c0.6,0,1.146-0.479,1.628-0.902
            c0.564-0.495,1.249-1.098,2.122-1.098c0.87,0,1.554,0.6,2.104,1.082c0.497,0.437,1.045,0.918,1.646,0.918
            c0.6,0,1.146-0.479,1.628-0.902c0.564-0.495,1.249-1.098,2.122-1.098c0.848,0,1.502,0.576,2.028,1.038
            c0.496,0.437,1.095,0.962,1.722,0.962V20.36z M31,14.36c-0.898,0-1.645-0.656-2.138-1.089c-0.539-0.474-1.036-0.911-1.612-0.911
            c-0.602,0-1.149,0.481-1.633,0.906C25.054,13.76,24.37,14.36,23.5,14.36c-0.873,0-1.558-0.602-2.107-1.085
            c-0.496-0.435-1.043-0.915-1.643-0.915c-0.602,0-1.149,0.481-1.633,0.906C17.554,13.76,16.871,14.36,16,14.36
            c-0.872,0-1.556-0.601-2.105-1.083c-0.497-0.437-1.044-0.917-1.645-0.917s-1.147,0.48-1.63,0.904
            c-0.564,0.495-1.248,1.096-2.12,1.096s-1.556-0.601-2.105-1.083C5.897,12.84,5.351,12.36,4.75,12.36s-1.147,0.48-1.63,0.904
            C2.556,13.759,1.872,14.36,1,14.36v-0.72c0.601,0,1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096
            s1.556,0.601,2.105,1.083C7.353,13.16,7.899,13.64,8.5,13.64s1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096
            s1.556,0.601,2.105,1.083C14.853,13.16,15.399,13.64,16,13.64c0.6,0,1.146-0.479,1.628-0.903c0.564-0.496,1.249-1.097,2.122-1.097
            c0.87,0,1.554,0.6,2.104,1.081c0.497,0.438,1.045,0.919,1.646,0.919c0.6,0,1.146-0.479,1.628-0.903
            c0.564-0.496,1.249-1.097,2.122-1.097c0.848,0,1.502,0.576,2.028,1.038c0.496,0.436,1.095,0.962,1.722,0.962V14.36z M31,8.36
            c-0.898,0-1.645-0.656-2.138-1.089C28.323,6.797,27.826,6.36,27.25,6.36c-0.602,0-1.149,0.481-1.633,0.906
            C25.054,7.76,24.37,8.36,23.5,8.36c-0.873,0-1.558-0.602-2.107-1.085C20.896,6.839,20.35,6.36,19.75,6.36
            c-0.602,0-1.149,0.481-1.633,0.906C17.554,7.76,16.871,8.36,16,8.36c-0.872,0-1.556-0.601-2.105-1.083
            C13.397,6.84,12.851,6.36,12.25,6.36s-1.147,0.48-1.63,0.904C10.056,7.759,9.372,8.36,8.5,8.36S6.944,7.759,6.395,7.277
            C5.897,6.84,5.351,6.36,4.75,6.36S3.603,6.84,3.12,7.264C2.556,7.759,1.872,8.36,1,8.36V7.64c0.601,0,1.147-0.48,1.63-0.904
            C3.194,6.241,3.878,5.64,4.75,5.64s1.556,0.601,2.105,1.083C7.353,7.16,7.899,7.64,8.5,7.64s1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.083C14.853,7.16,15.399,7.64,16,7.64c0.6,0,1.146-0.479,1.628-0.903
            c0.564-0.496,1.249-1.097,2.122-1.097c0.87,0,1.554,0.6,2.104,1.081C22.351,7.159,22.898,7.64,23.5,7.64
            c0.6,0,1.146-0.479,1.628-0.903c0.564-0.496,1.249-1.097,2.122-1.097c0.848,0,1.502,0.576,2.028,1.038
            C29.774,7.114,30.373,7.64,31,7.64V8.36z"/>
        <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"/>
        </svg>
    `;
    container.innerHTML = modifiedSGV;
    container.classList.add('humid-img');

    container.style.top = `${Math.random() * 45}vh`;
    container.style.animationDuration = `${Math.random() * 5 + 2}s`;
    // container.appendChild(wind);
    effectArea.appendChild(container);

    container.addEventListener('animationend', () => {
        container.remove();
    });

}
async function setData(root, kind){
    const inputElement = document.createElement('input');

    if (kind === "temp"){
        const data = await getData();
        //console.log(data);
        inputElement.id = 'temp-input';
        inputElement.setAttribute('value', data.main.temp);
    }else if (kind === 'humid'){
        const data = await getData();
        //console.log(data);
        inputElement.id = 'humid-input';
        inputElement.setAttribute('value', data.main.humidity);
    }else{
        inputElement.id = 'space-input';
        inputElement.setAttribute('value', 2);
    }

    root.appendChild(inputElement);
}

// Event Listeners
addEggBtn.addEventListener('click', addEgg);
rmEggBtn.addEventListener('click', removeEgg);

// Calls
initialize();