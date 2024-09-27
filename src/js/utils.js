export function addEgg(){
    const eggArea = document.getElementById('egg-area');
    let eggLimit = 10;

    if (eggArea.childElementCount < eggLimit){
        const divContainer = document.createElement('div');
        const imageContainer = document.createElement('img');
        const timer = document.createElement('p');

        divContainer.setAttribute('class', 'egg-timer-container');
        timer.setAttribute('class', 'timer');
        imageContainer.setAttribute('class', 'egg-image');
        imageContainer.src = "https://res.cloudinary.com/dzmhkee5i/image/upload/v1727227065/fuzzy/ozea2mvwcncfzvwvebku.png";
        
        divContainer.appendChild(imageContainer);
        divContainer.appendChild(timer);
        
        eggArea.appendChild(divContainer);

        let hatchingTime = 5 * 60;

        const interval = setInterval(function(){
            const minutes = Math.floor(hatchingTime / 60);
            const seconds = hatchingTime % 60;
            if (hatchingTime <= 0){
                clearInterval(interval);
                imageContainer.src = "https://res.cloudinary.com/dzmhkee5i/image/upload/v1727460193/fuzzy/z0k3fozpasouayxrxy9u.png";
            }

            timer.innerHTML = `${minutes}:${seconds}`;

            hatchingTime--;
        }, 1000)
    }else {
        window.alert('Reached Limit')
    }
}

export function removeEgg(){
    const eggArea = document.getElementById('egg-area');
    if (eggArea.childElementCount == 0){
        window.alert('The area is empty!');
    }else {
        const lastChild = eggArea.lastElementChild;
        eggArea.removeChild(lastChild);
    }
}

export function windColor(tempValue){
    if (tempValue < 30) {
        return "blue";
    } else if (tempValue < 34) {
        return "lightblue";
    } else if (tempValue < 38) {
        return "#BAD8EB";
    } else if (tempValue < 50) {
        return "orange";
    } else {
        return "red";
    }
}

export function humidColor(humidValue){
    if (humidValue < 60) {
        return "blue";
    } else if (humidValue < 70) {
        return "lightblue";
    } else if (humidValue < 80) {
        return "#BAD8EB";
    } else if (humidValue < 90) {
        return "orange";
    } else {
        return "red";
    }
}