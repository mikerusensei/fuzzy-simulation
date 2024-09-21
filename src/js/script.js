const eggArea = document.getElementById('egg-area');
const addEggBtn = document.getElementById('add-egg');
const rmEggBtn = document.getElementById('remove-egg');
const effectArea = document.getElementById('effect-area');

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