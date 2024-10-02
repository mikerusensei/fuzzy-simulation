async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}const t=new class{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let[n,i,a]=this.fuzz[t].range,d=this.memberTriangle(e,n,i,a);this.fuzzVal.push(d)}return this.fuzzVal}memberTriangle(e,t,n,i){return e<t||e>i?0:e==n?1:e>=t&&e<n?(e-t)/(n-t):e>n&&e<=i?(i-e)/(i-n):void 0}getFuzzVal(){return this.fuzzVal}getFuzz(){return this.fuzz}};t.addFuzz("Cold Temp",[16,16,30]),t.addFuzz("Low Temp",[16,25,34]),t.addFuzz("Optimal Temp",[30,34,38]),t.addFuzz("High Temp",[34,42,50]),t.addFuzz("Critical Temp",[38,50,50]);const n=t.calculateFuzz(30);console.log("Temp Fuzz Value: ",n);const i=new class{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,condition:t})}getRules(){return this.rules}};i.addRule("Cold Temp",["Increase Heater Temp",1]),i.addRule("Low Temp",["Turn Heater On",2]),i.addRule("Optimal Temp",["Turn off Devices",3]),i.addRule("High Temp",["Turn Aircondition On",4]),i.addRule("Critical Temp",["Increase Aircondition Temp",5]),new class{application(e,t){let n=[];for(let i in e)n.push({name:t[i].name,value:e[i]});return n}}().application(n,i.getRules()),console.log("Temp Defuzz: ",new class{defuzzificate(e){let t=0,a=0,d=[];for(let t in e)d.push({name:i[t].condition[0],weight:i[t].condition[1]});for(let e in n){let i=n[e];t+=i*d[e].weight,a+=i}return 0===a?0:t/a}}().defuzzificate(n,i.getRules())),humidFuzz.addFuzz("Poor Low",[40,40,60]),humidFuzz.addFuzz("Fair Low",[50,60,70]),humidFuzz.addFuzz("Optimal",[60,70,80]),humidFuzz.addFuzz("Fair High",[70,80,90]),humidFuzz.addFuzz("Poor High",[80,100,100]);const a=document.getElementById("egg-area"),d=document.getElementById("add-egg"),u=document.getElementById("remove-egg"),l=document.getElementById("effect-area");async function m(){let t=document.getElementById("temp-input"),n=document.getElementById("humid-input"),i=await e();console.log(i),t.value=i.main.temp,n.value=i.main.humidity}document.getElementById("temp-input"),document.getElementById("humid-input"),d.addEventListener("click",function(){if(a.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",a.appendChild(e)}else window.alert("Reached Limit")}),u.addEventListener("click",function(){if(0==a.childElementCount)window.alert("The area is empty!");else{let e=a.lastElementChild;a.removeChild(e)}}),m(),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),l.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.ff999f3b.js.map
