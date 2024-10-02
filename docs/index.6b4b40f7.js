async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}class t{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let[a,l,n]=this.fuzz[t].range;console.log("min",a,"peak",l,"max",n,"TEMP: ",e);let i=this.memberTriangle(e,a,l,n);console.log("Value: ",i),this.fuzzVal.push(i)}return this.fuzzVal}memberTriangle(e,t,a,l){return e<t||e>l?0:e===t||e===a||e===l?1:e>=t&&e<=a?(e-t)/(a-t):e>a&&e<=l?(l-e)/(l-a):void 0}getVal(e){for(let t=0;t<this.fuzz.length;t++)if(this.fuzz[t].name==e)return this.fuzzVal[t]}defuzz(e){let t=0,a=0;for(let l in e.rules){let n=e.rules[l],i=Math.max(n.rules[0],n.rules[1]);for(let e in console.log("Max: ",i),this.fuzz)if(this.fuzz[e].name===n.name){let l=this.fuzz[e].range[1];console.log("Cvalue: ",l),t+=i*l,a+=i;break}}return 0===a?0:t/a}getFuzzVal(){return this.fuzzVal}}class a{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,rules:t})}getRules(){return this.rules}}const l=document.getElementById("add-egg"),n=document.getElementById("remove-egg"),i=document.getElementById("effect-area"),d=document.getElementById("temp"),u=document.getElementById("humid"),o=document.getElementById("space");async function g(){await r(d,"temp"),await r(u,"humid"),await r(o,"space");let e=document.getElementById("temp-input"),t=document.getElementById("space-input"),a=parseFloat(e.value);parseFloat(t.value),m(a,i)}function m(e,t){e<30?t.style.backgroundColor="blue":e<34?t.style.backgroundColor="lightblue":e<38?t.style.backgroundColor="#f5f5f5":e<50?t.style.backgroundColor="orange":e>=50&&(t.style.backgroundColor="red")}async function r(t,a){let l=document.createElement("input");if("temp"===a){let t=await e();console.log(t),l.id="temp-input",l.setAttribute("value",t.main.temp)}else if("humid"===a){let t=await e();console.log(t),l.id="humid-input",l.setAttribute("value",t.main.humidity)}else l.id="space-input",l.setAttribute("value",2);t.appendChild(l)}l.addEventListener("click",function(){let e=document.getElementById("egg-area");if(e.childElementCount<5){let t=document.createElement("img");t.setAttribute("class","egg-image"),t.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",e.appendChild(t)}else window.alert("Reached Limit")}),n.addEventListener("click",function(){if(0==eggArea.childElementCount)window.alert("The area is empty!");else{let e=eggArea.lastElementChild;eggArea.removeChild(e)}}),g(),setInterval(function(){let e=document.getElementById("temp-input"),l=document.getElementById("space-input"),n=parseFloat(e.value);(function(e,l){let n=new t;n.addFuzz("Cold Temp",[16,16,30]),n.addFuzz("Low Temp",[16,25,34]),n.addFuzz("Optimal Temp",[30,34,38]),n.addFuzz("High Temp",[34,42,50]),n.addFuzz("Critical Temp",[38,50,50]),n.calculateFuzz(e),console.log(n.getFuzzVal());let i=new t;i.addFuzz("Small",[0,0,3]),i.addFuzz("Medium",[3,5,7]),i.addFuzz("Large",[7,10,10]),i.calculateFuzz(l),console.log(i.getFuzzVal());let d=new t;d.addFuzz("High Heating",[0,0,3]),d.addFuzz("Low Heating",[0,3,5]),d.addFuzz("No Action",[3,5,7]),d.addFuzz("Low Cooling",[5,7,10]),d.addFuzz("High Cooling",[7,10,10]);let u=new a;u.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Small")]),u.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Medium")]),u.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Large")]),u.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Small")]),u.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Medium")]),u.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Large")]),u.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Small")]),u.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Medium")]),u.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Large")]),u.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Small")]),u.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Medium")]),u.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Large")]),u.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Small")]),u.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Medium")]),u.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Large")]),console.log(d.defuzz(u))})(n,parseFloat(l.value)),m(n,i)},1e3),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${45*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),i.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.6b4b40f7.js.map
