import { getData } from "./test-api";
import { Fuzzificate, Rule, Interference, Defuzzificate} from "./process"

const eggArea = document.getElementById('egg-area');
const addEggBtn = document.getElementById('add-egg');
const rmEggBtn = document.getElementById('remove-egg');
const effectArea = document.getElementById('effect-area');
const tempVal = document.getElementById('temp-input');

addEggBtn.addEventListener('click', addEgg);
rmEggBtn.addEventListener('click', removeEgg);

const fuzz = new Fuzzificate();
fuzz.addFuzz('Cold Temp', [16, 16, 30]);
fuzz.addFuzz('Low Temp', [16, 25, 34]);
fuzz.addFuzz("Optimal Temp", [30, 34, 38]);
fuzz.addFuzz("High Temp", [34, 42, 50]);
fuzz.addFuzz("Critical Temp", [38, 50, 50]);

const rule = new Rule();
rule.addRule("Cold Temp", ["Increase Heater Temp", 2]);
rule.addRule("Low Temp", ["Turn Heater On", 1]);
rule.addRule("Optimal Temp", ["Turn off Devices", 0]);
rule.addRule("High Temp", ["Turn Aircondition On", -1]);
rule.addRule("Critical Temp", ["Increase Aircondition Temp", -2]);

const interference = new Interference(fuzz, rule);

const temp = tempVal.value;
const fuzzyVal = interference.application(temp)

const defuzz = new Defuzzificate(fuzzyVal, rule);
const defuzVal = defuzz.defuzzificate();

setData();

function addEgg(){
    let eggLimit = 5;

    if (eggArea.childElementCount < eggLimit){
        const imageContainer = document.createElement('img');

        imageContainer.setAttribute('class', 'egg-image');
        imageContainer.src = "https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png";

        eggArea.appendChild(imageContainer);
    }else {
        window.alert('Reached Limit')
    }
}

function removeEgg(){
    if (eggArea.childElementCount == 0){
        window.alert('The area is empty!');
    }else {
        const lastChild = eggArea.lastElementChild;
        eggArea.removeChild(lastChild);
    }
}

function createWind(){
    const container = document.createElement('div');
    const wind = document.createElement('img');
    
    wind.src = "assets/wind.svg"
    container.classList.add('wind-img');

    container.style.top = `${Math.random() * 50}vh`;
    container.style.animationDuration = `${Math.random() * 5 + 2}s`;
    container.appendChild(wind);
    effectArea.appendChild(container);

    container.addEventListener('animationend', () => {
        container.remove();
    });
}

async function setData(){
    const tempInput = document.getElementById('temp-input');
    const humidInput = document.getElementById('humid-input');
    const data = await getData();

    console.log(data);
    tempInput.value = data.main.temp;
    humidInput.value = data.main.humidity;
}

setInterval(createWind,1000);