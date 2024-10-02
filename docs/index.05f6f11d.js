async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}class t{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let a=this.fuzz[t].range;console.log("Range: ",a);let[l,n,i]=a,d=this.memberTriangle(e,l,n,i);console.log("Value: ",d),this.fuzzVal.push(d)}return this.fuzzVal}memberTriangle(e,t,a,l){return e<t||e>l?0:e===t||e===a||e===l?1:e>=t&&e<=a?(e-t)/(a-t):e>a&&e<=l?(l-e)/(l-a):void 0}getVal(e){for(let t=0;t<this.fuzz.length;t++)if(this.fuzz[t].name==e)return this.fuzzVal[t]}defuzz(e){let t=0,a=0;for(let l in e.rules){let n=e.rules[l],i=Math.max(n.rules[0],n.rules[1]);for(let e in console.log("Max: ",i),this.fuzz)if(this.fuzz[e].name===n.name){let l=this.fuzz[e].range[1];console.log("Cvalue: ",l),t+=i*l,a+=i;break}}return 0===a?0:t/a}getFuzzVal(){return this.fuzzVal}}const a=document.getElementById("egg-area"),l=document.getElementById("add-egg"),n=document.getElementById("remove-egg"),i=document.getElementById("effect-area"),d=document.getElementById("temp-input");document.getElementById("humid-input");const u=document.getElementById("space-input");z();const o=parseFloat(d.value),g=parseFloat(u.value),m=new t;m.addFuzz("Cold Temp",[16,16,30]),m.addFuzz("Low Temp",[16,25,34]),m.addFuzz("Optimal Temp",[30,34,38]),m.addFuzz("High Temp",[34,42,50]),m.addFuzz("Critical Temp",[38,50,50]),console.log(m.calculateFuzz(o));const s=new t;s.addFuzz("Small",[0,0,3]),s.addFuzz("Medium",[3,5,7]),s.addFuzz("Large",[7,10,10]),console.log(s.calculateFuzz(g));const r=new t;r.addFuzz("High Heating",[0,0,3]),r.addFuzz("Low Heating",[0,3,5]),r.addFuzz("No Action",[3,5,7]),r.addFuzz("Low Cooling",[5,7,10]),r.addFuzz("High Cooling",[7,10,10]);const c=new class{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,rules:t})}getRules(){return this.rules}};async function z(){let t=document.getElementById("temp-input"),a=document.getElementById("humid-input"),l=await e();t.value=l.main.temp,a.value=l.main.humidity}c.addRule("High Heating",[m.getVal("Cold Temp"),s.getVal("Small")]),c.addRule("High Heating",[m.getVal("Cold Temp"),s.getVal("Medium")]),c.addRule("High Heating",[m.getVal("Cold Temp"),s.getVal("Large")]),c.addRule("Low Heating",[m.getVal("Low Temp"),s.getVal("Small")]),c.addRule("Low Heating",[m.getVal("Low Temp"),s.getVal("Medium")]),c.addRule("Low Heating",[m.getVal("Low Temp"),s.getVal("Large")]),c.addRule("No Action",[m.getVal("Optimal Temp"),s.getVal("Small")]),c.addRule("No Action",[m.getVal("Optimal Temp"),s.getVal("Medium")]),c.addRule("No Action",[m.getVal("Optimal Temp"),s.getVal("Large")]),c.addRule("Low Cooling",[m.getVal("High Temp"),s.getVal("Small")]),c.addRule("Low Cooling",[m.getVal("High Temp"),s.getVal("Medium")]),c.addRule("Low Cooling",[m.getVal("High Temp"),s.getVal("Large")]),c.addRule("High Cooling",[m.getVal("Critical Temp"),s.getVal("Small")]),c.addRule("High Cooling",[m.getVal("Critical Temp"),s.getVal("Medium")]),c.addRule("High Cooling",[m.getVal("Critical Temp"),s.getVal("Large")]),console.log("Crisp: ",r.defuzz(c)),l.addEventListener("click",function(){if(a.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",a.appendChild(e)}else window.alert("Reached Limit")}),n.addEventListener("click",function(){if(0==a.childElementCount)window.alert("The area is empty!");else{let e=a.lastElementChild;a.removeChild(e)}}),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),i.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.05f6f11d.js.map
