async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}class t{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let[a,l,i]=this.fuzz[t].range;console.log("min",a,"peak",l,"max",i,"TEMP: ",e);let n=this.memberTriangle(e,a,l,i);console.log("Value: ",n),this.fuzzVal.push(n)}return this.fuzzVal}memberTriangle(e,t,a,l){return e<t||e>l?0:e===t||e===a||e===l?1:e>=t&&e<=a?(e-t)/(a-t):e>a&&e<=l?(l-e)/(l-a):void 0}getVal(e){for(let t=0;t<this.fuzz.length;t++)if(this.fuzz[t].name==e)return this.fuzzVal[t]}defuzz(e){let t=0,a=0;for(let l in e.rules){let i=e.rules[l],n=Math.max(i.rules[0],i.rules[1]);for(let e in console.log("Max: ",n),this.fuzz)if(this.fuzz[e].name===i.name){let l=this.fuzz[e].range[1];console.log("Cvalue: ",l),t+=n*l,a+=n;break}}return 0===a?0:t/a}getFuzzVal(){return this.fuzzVal}}class a{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,rules:t})}getRules(){return this.rules}}const l=document.getElementById("egg-area"),i=document.getElementById("add-egg"),n=document.getElementById("remove-egg"),d=document.getElementById("effect-area"),u=document.getElementById("temp"),o=document.getElementById("humid"),g=document.getElementById("space");async function m(){await s(u,"temp"),await s(o,"humid"),await s(g,"space");let e=document.getElementById("temp-input"),l=document.getElementById("space-input");!function(e,l){let i=new t;i.addFuzz("Cold Temp",[16,16,30]),i.addFuzz("Low Temp",[16,25,34]),i.addFuzz("Optimal Temp",[30,34,38]),i.addFuzz("High Temp",[34,42,50]),i.addFuzz("Critical Temp",[38,50,50]),i.calculateFuzz(e),console.log(i.getFuzzVal());let n=new t;n.addFuzz("Small",[0,0,3]),n.addFuzz("Medium",[3,5,7]),n.addFuzz("Large",[7,10,10]),n.calculateFuzz(l),console.log(n.getFuzzVal());let d=new t;d.addFuzz("High Heating",[0,0,3]),d.addFuzz("Low Heating",[0,3,5]),d.addFuzz("No Action",[3,5,7]),d.addFuzz("Low Cooling",[5,7,10]),d.addFuzz("High Cooling",[7,10,10]);let u=new a;u.addRule("High Heating",[i.getVal("Cold Temp"),n.getVal("Small")]),u.addRule("High Heating",[i.getVal("Cold Temp"),n.getVal("Medium")]),u.addRule("High Heating",[i.getVal("Cold Temp"),n.getVal("Large")]),u.addRule("Low Heating",[i.getVal("Low Temp"),n.getVal("Small")]),u.addRule("Low Heating",[i.getVal("Low Temp"),n.getVal("Medium")]),u.addRule("Low Heating",[i.getVal("Low Temp"),n.getVal("Large")]),u.addRule("No Action",[i.getVal("Optimal Temp"),n.getVal("Small")]),u.addRule("No Action",[i.getVal("Optimal Temp"),n.getVal("Medium")]),u.addRule("No Action",[i.getVal("Optimal Temp"),n.getVal("Large")]),u.addRule("Low Cooling",[i.getVal("High Temp"),n.getVal("Small")]),u.addRule("Low Cooling",[i.getVal("High Temp"),n.getVal("Medium")]),u.addRule("Low Cooling",[i.getVal("High Temp"),n.getVal("Large")]),u.addRule("High Cooling",[i.getVal("Critical Temp"),n.getVal("Small")]),u.addRule("High Cooling",[i.getVal("Critical Temp"),n.getVal("Medium")]),u.addRule("High Cooling",[i.getVal("Critical Temp"),n.getVal("Large")]),console.log(d.defuzz(u))}(parseFloat(e.value),parseFloat(l.value))}async function s(t,a){let l=document.createElement("input");if("temp"===a){let t=await e();console.log(t),l.id="temp-input",l.setAttribute("value",t.main.temp)}else if("humid"===a){let t=await e();console.log(t),l.id="humid-input",l.setAttribute("value",t.main.humidity)}else l.id="space-input",l.setAttribute("value",2);t.appendChild(l)}i.addEventListener("click",function(){if(l.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",l.appendChild(e)}else window.alert("Reached Limit")}),n.addEventListener("click",function(){if(0==l.childElementCount)window.alert("The area is empty!");else{let e=l.lastElementChild;l.removeChild(e)}}),m(),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),d.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.4f3fea3e.js.map
