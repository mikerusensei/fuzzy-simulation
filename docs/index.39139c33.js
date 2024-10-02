async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}function t(e){if(e<16||e<30)return"blue";if(e<34)return`rgba(173, 216, 230, ${(e-30)/4})`;if(e<38)return"lightblue";if(e<42)return`rgba(144, 238, 144, ${(e-38)/4})`;if(e<50)return"green";if(e<50)return"orange";else return"red"}class a{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let[a,l,n]=this.fuzz[t].range,i=this.memberTriangle(e,a,l,n);this.fuzzVal.push(i)}return this.fuzzVal}memberTriangle(e,t,a,l){return e<t||e>l?0:e===t||e===a||e===l?1:e>=t&&e<=a?(e-t)/(a-t):e>a&&e<=l?(l-e)/(l-a):void 0}getVal(e){for(let t=0;t<this.fuzz.length;t++)if(this.fuzz[t].name==e)return this.fuzzVal[t]}defuzz(e){let t=0,a=0;for(let l in e.rules){let n=e.rules[l],i=Math.max(n.rules[0],n.rules[1]);for(let e in this.fuzz)if(this.fuzz[e].name===n.name){t+=i*this.fuzz[e].range[1],a+=i;break}}return 0===a?0:t/a}getFuzzVal(){return this.fuzzVal}}class l{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,rules:t})}getRules(){return this.rules}}const n=document.getElementById("add-egg"),i=document.getElementById("remove-egg"),d=document.getElementById("effect-area"),o=document.getElementById("temp"),u=document.getElementById("humid"),r=document.getElementById("space");let m=0;async function g(){await c(o,"temp"),await c(u,"humid"),await c(r,"space");let e=document.getElementById("temp-input"),a=document.getElementById("space-input"),l=parseFloat(e.value);parseFloat(a.value),m=l,setInterval(s,1500),setInterval(function(){(function(e){let a=document.createElement("div"),l=`
        <svg width="50px" height="50px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="wind" transform="translate(-2 -2)">
                    <path id="primary" d="M3,7h7a2,2,0,0,0,0-4" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-2" data-name="primary" d="M16,21a3,3,0,0,0,0-6H3" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <line id="primary-3" data-name="primary" x2="7" transform="translate(3 19)" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-4" data-name="primary" d="M3,11H17.5a3.5,3.5,0,1,0,0-7" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </g>
            </svg>
    `;a.innerHTML=l,a.classList.add("wind-img"),a.style.top=`${45*Math.random()}vh`,a.style.animationDuration=`${5*Math.random()+2}s`,d.appendChild(a),a.addEventListener("animationend",()=>{a.remove()})})(m)},1e3)}function s(){let e,t;let n=document.getElementById("temp-input"),i=document.getElementById("space-input"),d=parseFloat(n.value),o=parseFloat(i.value),u=function(e,t){let n=new a;n.addFuzz("Cold Temp",[16,16,30]),n.addFuzz("Low Temp",[16,25,34]),n.addFuzz("Optimal Temp",[30,34,38]),n.addFuzz("High Temp",[34,42,50]),n.addFuzz("Critical Temp",[38,50,50]),n.calculateFuzz(e);let i=new a;i.addFuzz("Small",[0,0,3]),i.addFuzz("Medium",[3,5,7]),i.addFuzz("Large",[7,10,10]),i.calculateFuzz(t);let d=new a;d.addFuzz("High Heating",[0,0,3]),d.addFuzz("Low Heating",[0,3,5]),d.addFuzz("No Action",[3,5,7]),d.addFuzz("Low Cooling",[5,7,10]),d.addFuzz("High Cooling",[7,10,10]);let o=new l;o.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Small")]),o.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Medium")]),o.addRule("High Heating",[n.getVal("Cold Temp"),i.getVal("Large")]),o.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Small")]),o.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Medium")]),o.addRule("Low Heating",[n.getVal("Low Temp"),i.getVal("Large")]),o.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Small")]),o.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Medium")]),o.addRule("No Action",[n.getVal("Optimal Temp"),i.getVal("Large")]),o.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Small")]),o.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Medium")]),o.addRule("Low Cooling",[n.getVal("High Temp"),i.getVal("Large")]),o.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Small")]),o.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Medium")]),o.addRule("High Cooling",[n.getVal("Critical Temp"),i.getVal("Large")]);let u=d.defuzz(o);return console.log(u),u}(d,o);o<=3?(e=.3,t=.3):o<=7?(e=.1,t=.1):(e=.05,t=.05),console.log("Crisp value:",u),m=d-.1;let r=[{action:"High Heating",min:0,max:3,adjustment:t},{action:"Low Heating",min:0,max:5,adjustment:t},{action:"No Action",min:3,max:7,adjustment:0},{action:"Low Cooling",min:5,max:10,adjustment:-e},{action:"High Cooling",min:7,max:10,adjustment:-e}];for(let e in r)if(u>=r[e].min&&u<=r[e].max){console.log("Action:",r[e].action),console.log("Adjusted Temperature:",m+=r[e].adjustment);break}n.value=m}async function c(t,a){let l=document.createElement("input");if("temp"===a){let t=await e();console.log(t),l.id="temp-input",l.setAttribute("value",t.main.temp)}else if("humid"===a){let t=await e();console.log(t),l.id="humid-input",l.setAttribute("value",t.main.humidity)}else l.id="space-input",l.setAttribute("value",2);t.appendChild(l)}n.addEventListener("click",function(){let e=document.getElementById("egg-area");if(e.childElementCount<5){let t=document.createElement("img");t.setAttribute("class","egg-image"),t.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1727227065/fuzzy/ozea2mvwcncfzvwvebku.png",e.appendChild(t)}else window.alert("Reached Limit")}),i.addEventListener("click",function(){let e=document.getElementById("egg-area");if(0==e.childElementCount)window.alert("The area is empty!");else{let t=e.lastElementChild;e.removeChild(t)}}),g();
//# sourceMappingURL=index.39139c33.js.map
