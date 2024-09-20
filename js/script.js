import { getData } from './test-api.js';

const eggArea = document.getElementById('egg-area');
const addEggBtn = document.getElementById('add-egg');
const rmEggBtn = document.getElementById('remove-egg');

addEggBtn.addEventListener('click', addEgg);
rmEggBtn.addEventListener('click', removeEgg);
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

async function setData(){
    const tempInput = document.getElementById('temp-input');
    const humidInput = document.getElementById('humid-input');
    const data = await getData();

    console.log(data);
    tempInput.value = data.main.temp;
    humidInput.value = data.main.humidity;
}