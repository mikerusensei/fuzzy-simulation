async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=undefined");return await e.json()}const t=document.getElementById("egg-area"),n=document.getElementById("add-egg"),a=document.getElementById("remove-egg"),i=document.getElementById("effect-area");async function d(){let t=document.getElementById("temp-input"),n=document.getElementById("humid-input"),a=await e();console.log(a),t.value=a.main.temp,n.value=a.main.humidity}document.getElementById("temp-input"),n.addEventListener("click",function(){if(t.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",t.appendChild(e)}else window.alert("Reached Limit")}),a.addEventListener("click",function(){if(0==t.childElementCount)window.alert("The area is empty!");else{let e=t.lastElementChild;t.removeChild(e)}}),d(),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),i.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.f9b8abc2.js.map
