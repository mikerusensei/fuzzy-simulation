async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}class t{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t});let i=this.fuzz.length;for(let e=0;e<i;e++){let[t,i,n]=this.fuzz[e],l=this.memberTriangle(temp,t,i,n);this.fuzzVal.push(l)}}memberTriangle(e,t,i,n){return e<t||e>=n?0:e==i?1:e>=t&&e<i?(e-t)/(i-t):e>i&&e<=n?(n-e)/(n-i):void 0}getRange(e){let t=this.fuzz.length;for(let i=0;i<t;i++)if(this.fuzz[i].name===e)return this.fuzz[i].range}getFuzzVal(){return this.fuzzVal}getFuzz(){return this.fuzz}}class i{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,condition:t})}getRules(e){let t=this.rules.length;for(let i=0;i<t;i++)if(this.rules[i].name===e)return this.rules[i].condition}}class n{constructor(e,t){this.fuzz=e,this.rules=t}application(e){let t={};this.fuzz.getFuzz();let i=this.fuzz.getFuzzVal();for(let e=0;e<i.length;e++)t[e]=i[e];return t}}class l{constructor(e,t){this.fuzzyValue=e,this.rules=t,this.numerator=0,this.denominator=0}defuzzificate(){let e={[this.rules.getRules("Cold Temp")[0]]:this.rules.getRules("Cold Temp")[1],[this.rules.getRules("Low Temp")[0]]:this.rules.getRules("Low Temp")[1],[this.rules.getRules("Optimal Temp")[0]]:this.rules.getRules("Optimal Temp")[1],[this.rules.getRules("High Temp")[0]]:this.rules.getRules("High Temp")[1],[this.rules.getRules("Critical Temp")[0]]:this.rules.getRules("Critical Temp")[1]};for(let t in this.fuzzyValue){let i=this.fuzzyValue[t],n=e[t];this.numerator+=i*n,this.denominator+=i}return 0===this.denominator?0:this.numerator/this.denominator}}const a=new t;a.addFuzz("Cold Temp",[16,16,30]),a.addFuzz("Low Temp",[16,25,34]),a.addFuzz("Optimal Temp",[30,34,38]),a.addFuzz("High Temp",[34,42,50]),a.addFuzz("Critical Temp",[38,50,50]);const s=new i;s.addRule("Cold Temp",["Increase Heater Temp",2]),s.addRule("Low Temp",["Turn Heater On",1]),s.addRule("Optimal Temp",["Turn off Devices",0]),s.addRule("High Temp",["Turn Aircondition On",-1]),s.addRule("Critical Temp",["Increase Aircondition Temp",-2]),console.log(new l(new n(a,s).application(29),s).defuzzificate());const u=document.getElementById("egg-area"),d=document.getElementById("add-egg"),r=document.getElementById("remove-egg"),m=document.getElementById("effect-area"),o=document.getElementById("temp-input");d.addEventListener("click",function(){if(u.childElementCount<5){let e=document.createElement("img");e.setAttribute("class","egg-image"),e.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1726847381/fuzzy/gsyhtwsjhw0h9p5c0rks.png",u.appendChild(e)}else window.alert("Reached Limit")}),r.addEventListener("click",function(){if(0==u.childElementCount)window.alert("The area is empty!");else{let e=u.lastElementChild;u.removeChild(e)}}),g();const c=new t;c.addFuzz("Cold Temp",[16,16,30]),c.addFuzz("Low Temp",[16,25,34]),c.addFuzz("Optimal Temp",[30,34,38]),c.addFuzz("High Temp",[34,42,50]),c.addFuzz("Critical Temp",[38,50,50]);const h=new i;h.addRule("Cold Temp",["Increase Heater Temp",2]),h.addRule("Low Temp",["Turn Heater On",1]),h.addRule("Optimal Temp",["Turn off Devices",0]),h.addRule("High Temp",["Turn Aircondition On",-1]),h.addRule("Critical Temp",["Increase Aircondition Temp",-2]);const p=new n(c,h),z=o.value;async function g(){let t=document.getElementById("temp-input"),i=document.getElementById("humid-input"),n=await e();console.log(n),t.value=n.main.temp,i.value=n.main.humidity}console.log(new l(p.application(z),h).defuzzificate()),setInterval(function(){let e=document.createElement("div"),t=document.createElement("img");t.src="assets/wind.svg",e.classList.add("wind-img"),e.style.top=`${50*Math.random()}vh`,e.style.animationDuration=`${5*Math.random()+2}s`,e.appendChild(t),m.appendChild(e),e.addEventListener("animationend",()=>{e.remove()})},1e3);
//# sourceMappingURL=index.a8609fb2.js.map
