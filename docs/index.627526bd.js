async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}const t=document.getElementById("egg-area"),n=document.getElementById("add-egg"),a=document.getElementById("remove-egg"),d=document.getElementById("effect-area");async function i(){let t=document.getElementById("temp-input"),n=document.getElementById("humid-input"),a=await e();console.log(a),t.value=a.main.temp,n.value=a.main.humidity}document.getElementById("temp-input"),document.getElementById("humid-input"),document.getElementById("space-input"),i(),n.addEventListener("click",function(){if(t.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",t.appendChild(e)}else window.alert("Reached Limit")}),a.addEventListener("click",function(){if(0==t.childElementCount)window.alert("The area is empty!");else{let e=t.lastElementChild;t.removeChild(e)}}),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),d.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.627526bd.js.map
