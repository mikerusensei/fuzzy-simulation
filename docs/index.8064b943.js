async function e(){let e=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.86535&lon=120.9571&units=metric&appid=969982c8fe8fc533e9318777138063db");return await e.json()}function t(e){return e<30?"blue":e<34?"lightblue":e<38?"green":e<50?"orange":"red"}class a{constructor(){this.fuzz=[],this.fuzzVal=[]}addFuzz(e,t){this.fuzz.push({name:e,range:t})}calculateFuzz(e){for(let t in this.fuzz){let[a,i,l]=this.fuzz[t].range,n=this.memberTriangle(e,a,i,l);this.fuzzVal.push(n)}return this.fuzzVal}memberTriangle(e,t,a,i){return e<t||e>i?0:e===t||e===a||e===i?1:e>=t&&e<=a?(e-t)/(a-t):e>a&&e<=i?(i-e)/(i-a):void 0}getVal(e){for(let t=0;t<this.fuzz.length;t++)if(this.fuzz[t].name==e)return this.fuzzVal[t]}defuzz(e){let t=0,a=0;for(let i in e.rules){let l=e.rules[i],n=Math.max(l.rules[0],l.rules[1]);for(let e in this.fuzz)if(this.fuzz[e].name===l.name){t+=n*this.fuzz[e].range[1],a+=n;break}}return 0===a?0:t/a}getFuzzVal(){return this.fuzzVal}}class i{constructor(){this.rules=[]}addRule(e,t){this.rules.push({name:e,rules:t})}getRules(){return this.rules}}const l=document.getElementById("add-egg"),n=document.getElementById("remove-egg"),d=document.getElementById("effect-area"),o=document.getElementById("temp"),u=document.getElementById("humid"),c=document.getElementById("space");let m=0,r=0;async function g(){await h(o,"temp"),await h(u,"humid"),await h(c,"space");let e=document.getElementById("temp-input"),a=document.getElementById("humid-input"),i=document.getElementById("space-input"),l=parseFloat(e.value),n=parseFloat(a.value);parseFloat(i.value),m=l,r=n,setInterval(s,1500),setInterval(function(){(function(e){let a=document.createElement("div"),i=`
        <svg width="50px" height="50px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="wind" transform="translate(-2 -2)">
                    <path id="primary" d="M3,7h7a2,2,0,0,0,0-4" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-2" data-name="primary" d="M16,21a3,3,0,0,0,0-6H3" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <line id="primary-3" data-name="primary" x2="7" transform="translate(3 19)" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="primary-4" data-name="primary" d="M3,11H17.5a3.5,3.5,0,1,0,0-7" fill="none" stroke="${t(e)}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </g>
            </svg>
    `;a.innerHTML=i,a.classList.add("wind-img"),a.style.top=`${45*Math.random()}vh`,a.style.animationDuration=`${5*Math.random()+2}s`,d.appendChild(a),a.addEventListener("animationend",()=>{a.remove()})})(m)},1e3),setInterval(function(){(function(e){let t=document.createElement("div"),a=`
        <?xml version="1.0" encoding="iso-8859-1"?>
        <!--Uploaded to SVGRepo https://www.svgrepo.com-->
        <!--License: Apache. Made by Carbon Design: https://github.com/carbon-design-system/carbon-->
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <path stroke=${e<60?"blue":e<70?"lightblue":e<80?"green":e<90?"orange":"red"} id="humid_1_" d="M31,26.36c-0.898,0-1.645-0.656-2.138-1.09c-0.539-0.474-1.036-0.91-1.612-0.91
            c-0.602,0-1.149,0.481-1.633,0.906C25.054,25.76,24.37,26.36,23.5,26.36c-0.873,0-1.558-0.603-2.107-1.086
            c-0.496-0.435-1.043-0.914-1.643-0.914c-0.602,0-1.149,0.481-1.633,0.906C17.554,25.761,16.871,26.36,16,26.36
            c-0.872,0-1.556-0.601-2.105-1.084c-0.497-0.436-1.044-0.916-1.645-0.916s-1.147,0.48-1.63,0.904
            C10.056,25.76,9.372,26.36,8.5,26.36s-1.556-0.601-2.105-1.084C5.897,24.841,5.351,24.36,4.75,24.36s-1.147,0.48-1.63,0.904
            C2.556,25.76,1.872,26.36,1,26.36v-0.72c0.601,0,1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084
            C7.353,25.159,7.899,25.64,8.5,25.64s1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084
            C14.852,25.16,15.399,25.64,16,25.64c0.6,0,1.146-0.479,1.628-0.902c0.564-0.495,1.249-1.098,2.122-1.098
            c0.87,0,1.554,0.6,2.104,1.082c0.497,0.437,1.045,0.918,1.646,0.918c0.6,0,1.146-0.479,1.628-0.902
            c0.564-0.495,1.249-1.098,2.122-1.098c0.848,0,1.502,0.576,2.028,1.038c0.496,0.437,1.095,0.962,1.722,0.962V26.36z M31,20.36
            c-0.898,0-1.645-0.656-2.138-1.09c-0.539-0.474-1.036-0.91-1.612-0.91c-0.602,0-1.149,0.481-1.633,0.906
            C25.054,19.76,24.37,20.36,23.5,20.36c-0.873,0-1.558-0.603-2.107-1.086c-0.496-0.435-1.043-0.914-1.643-0.914
            c-0.602,0-1.149,0.481-1.633,0.906C17.554,19.761,16.871,20.36,16,20.36c-0.872,0-1.556-0.601-2.105-1.084
            c-0.497-0.436-1.044-0.916-1.645-0.916s-1.147,0.48-1.63,0.904C10.056,19.76,9.372,20.36,8.5,20.36s-1.556-0.601-2.105-1.084
            C5.897,18.841,5.351,18.36,4.75,18.36s-1.147,0.48-1.63,0.904C2.556,19.76,1.872,20.36,1,20.36v-0.72c0.601,0,1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084C7.353,19.159,7.899,19.64,8.5,19.64s1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.084C14.852,19.16,15.399,19.64,16,19.64c0.6,0,1.146-0.479,1.628-0.902
            c0.564-0.495,1.249-1.098,2.122-1.098c0.87,0,1.554,0.6,2.104,1.082c0.497,0.437,1.045,0.918,1.646,0.918
            c0.6,0,1.146-0.479,1.628-0.902c0.564-0.495,1.249-1.098,2.122-1.098c0.848,0,1.502,0.576,2.028,1.038
            c0.496,0.437,1.095,0.962,1.722,0.962V20.36z M31,14.36c-0.898,0-1.645-0.656-2.138-1.089c-0.539-0.474-1.036-0.911-1.612-0.911
            c-0.602,0-1.149,0.481-1.633,0.906C25.054,13.76,24.37,14.36,23.5,14.36c-0.873,0-1.558-0.602-2.107-1.085
            c-0.496-0.435-1.043-0.915-1.643-0.915c-0.602,0-1.149,0.481-1.633,0.906C17.554,13.76,16.871,14.36,16,14.36
            c-0.872,0-1.556-0.601-2.105-1.083c-0.497-0.437-1.044-0.917-1.645-0.917s-1.147,0.48-1.63,0.904
            c-0.564,0.495-1.248,1.096-2.12,1.096s-1.556-0.601-2.105-1.083C5.897,12.84,5.351,12.36,4.75,12.36s-1.147,0.48-1.63,0.904
            C2.556,13.759,1.872,14.36,1,14.36v-0.72c0.601,0,1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096
            s1.556,0.601,2.105,1.083C7.353,13.16,7.899,13.64,8.5,13.64s1.147-0.48,1.63-0.904c0.564-0.495,1.248-1.096,2.12-1.096
            s1.556,0.601,2.105,1.083C14.853,13.16,15.399,13.64,16,13.64c0.6,0,1.146-0.479,1.628-0.903c0.564-0.496,1.249-1.097,2.122-1.097
            c0.87,0,1.554,0.6,2.104,1.081c0.497,0.438,1.045,0.919,1.646,0.919c0.6,0,1.146-0.479,1.628-0.903
            c0.564-0.496,1.249-1.097,2.122-1.097c0.848,0,1.502,0.576,2.028,1.038c0.496,0.436,1.095,0.962,1.722,0.962V14.36z M31,8.36
            c-0.898,0-1.645-0.656-2.138-1.089C28.323,6.797,27.826,6.36,27.25,6.36c-0.602,0-1.149,0.481-1.633,0.906
            C25.054,7.76,24.37,8.36,23.5,8.36c-0.873,0-1.558-0.602-2.107-1.085C20.896,6.839,20.35,6.36,19.75,6.36
            c-0.602,0-1.149,0.481-1.633,0.906C17.554,7.76,16.871,8.36,16,8.36c-0.872,0-1.556-0.601-2.105-1.083
            C13.397,6.84,12.851,6.36,12.25,6.36s-1.147,0.48-1.63,0.904C10.056,7.759,9.372,8.36,8.5,8.36S6.944,7.759,6.395,7.277
            C5.897,6.84,5.351,6.36,4.75,6.36S3.603,6.84,3.12,7.264C2.556,7.759,1.872,8.36,1,8.36V7.64c0.601,0,1.147-0.48,1.63-0.904
            C3.194,6.241,3.878,5.64,4.75,5.64s1.556,0.601,2.105,1.083C7.353,7.16,7.899,7.64,8.5,7.64s1.147-0.48,1.63-0.904
            c0.564-0.495,1.248-1.096,2.12-1.096s1.556,0.601,2.105,1.083C14.853,7.16,15.399,7.64,16,7.64c0.6,0,1.146-0.479,1.628-0.903
            c0.564-0.496,1.249-1.097,2.122-1.097c0.87,0,1.554,0.6,2.104,1.081C22.351,7.159,22.898,7.64,23.5,7.64
            c0.6,0,1.146-0.479,1.628-0.903c0.564-0.496,1.249-1.097,2.122-1.097c0.848,0,1.502,0.576,2.028,1.038
            C29.774,7.114,30.373,7.64,31,7.64V8.36z"/>
        <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"/>
        </svg>
    `;t.innerHTML=a,t.classList.add("humid-img"),t.style.top=`${45*Math.random()}vh`,t.style.animationDuration=`${5*Math.random()+2}s`,d.appendChild(t),t.addEventListener("animationend",()=>{t.remove()})})(n)},1e3)}function s(){let e,t;let l=document.getElementById("temp-input"),n=document.getElementById("humid-input"),d=document.getElementById("space-input"),o=parseFloat(l.value),u=parseFloat(n.value),c=parseFloat(d.value),g=function(e,t){let l=new a;l.addFuzz("Cold Temp",[16,16,30]),l.addFuzz("Low Temp",[16,25,34]),l.addFuzz("Optimal Temp",[30,34,38]),l.addFuzz("High Temp",[34,42,50]),l.addFuzz("Critical Temp",[38,50,50]),l.calculateFuzz(e);let n=new a;n.addFuzz("Small",[0,0,3]),n.addFuzz("Medium",[3,5,7]),n.addFuzz("Large",[7,10,10]),n.calculateFuzz(t);let d=new a;d.addFuzz("High Heating",[0,0,3]),d.addFuzz("Low Heating",[0,3,5]),d.addFuzz("No Action",[3,5,7]),d.addFuzz("Low Cooling",[5,7,10]),d.addFuzz("High Cooling",[7,10,10]);let o=new i;o.addRule("High Heating",[l.getVal("Cold Temp"),n.getVal("Small")]),o.addRule("High Heating",[l.getVal("Cold Temp"),n.getVal("Medium")]),o.addRule("High Heating",[l.getVal("Cold Temp"),n.getVal("Large")]),o.addRule("Low Heating",[l.getVal("Low Temp"),n.getVal("Small")]),o.addRule("Low Heating",[l.getVal("Low Temp"),n.getVal("Medium")]),o.addRule("Low Heating",[l.getVal("Low Temp"),n.getVal("Large")]),o.addRule("No Action",[l.getVal("Optimal Temp"),n.getVal("Small")]),o.addRule("No Action",[l.getVal("Optimal Temp"),n.getVal("Medium")]),o.addRule("No Action",[l.getVal("Optimal Temp"),n.getVal("Large")]),o.addRule("Low Cooling",[l.getVal("High Temp"),n.getVal("Small")]),o.addRule("Low Cooling",[l.getVal("High Temp"),n.getVal("Medium")]),o.addRule("Low Cooling",[l.getVal("High Temp"),n.getVal("Large")]),o.addRule("High Cooling",[l.getVal("Critical Temp"),n.getVal("Small")]),o.addRule("High Cooling",[l.getVal("Critical Temp"),n.getVal("Medium")]),o.addRule("High Cooling",[l.getVal("Critical Temp"),n.getVal("Large")]);let u=d.defuzz(o);return console.log(u),u}(o,c),s=function(e,t){let l=new a;l.addFuzz("Very High",[40,40,60]),l.addFuzz("Poor High",[50,60,70]),l.addFuzz("Optimal",[60,70,80]),l.addFuzz("Poor Low",[70,80,90]),l.addFuzz("Very Low",[80,90,90]),l.calculateFuzz(e);let n=new a;n.addFuzz("Small",[0,0,3]),n.addFuzz("Medium",[3,5,7]),n.addFuzz("Large",[7,10,10]),n.calculateFuzz(t);let d=new a;d.addFuzz("High Dehumidification",[0,0,3]),d.addFuzz("Low Dehumidification",[0,3,5]),d.addFuzz("No Action",[3,5,7]),d.addFuzz("Low Humidification",[5,7,10]),d.addFuzz("High Humidification",[7,10,10]);let o=new i;return o.addRule("High Dehumidification",[l.getVal("Very High"),n.getVal("Small")]),o.addRule("High Dehumidification",[l.getVal("Very High"),n.getVal("Medium")]),o.addRule("High Dehumidification",[l.getVal("Very High"),n.getVal("Large")]),o.addRule("Low Dehumidification",[l.getVal("Poor Low"),n.getVal("Small")]),o.addRule("Low Dehumidification",[l.getVal("Poor Low"),n.getVal("Medium")]),o.addRule("Low Dehumidification",[l.getVal("Poor Low"),n.getVal("Large")]),o.addRule("No Action",[l.getVal("Optimal"),n.getVal("Small")]),o.addRule("No Action",[l.getVal("Optimal"),n.getVal("Medium")]),o.addRule("No Action",[l.getVal("Optimal"),n.getVal("Large")]),o.addRule("Low Humidification",[l.getVal("Poor Low"),n.getVal("Small")]),o.addRule("Low Humidification",[l.getVal("Poor Low"),n.getVal("Medium")]),o.addRule("Low Humidification",[l.getVal("Poor Low"),n.getVal("Large")]),o.addRule("High Humidification",[l.getVal("Very Low"),n.getVal("Small")]),o.addRule("High Humidification",[l.getVal("Very Low"),n.getVal("Medium")]),o.addRule("High Humidification",[l.getVal("Very Low"),n.getVal("Large")]),d.defuzz(o)}(u,c);c<=3?(e=.3,t=.3):c<=7?(e=.1,t=.1):(e=.05,t=.05),console.log("Crisp value:",g),m=o-.1,r=u-.1;let h=[{action:"High Heating",min:0,max:3,adjustment:3*t},{action:"Low Heating",min:0,max:5,adjustment:t},{action:"No Action",min:3,max:7,adjustment:0},{action:"Low Cooling",min:5,max:10,adjustment:-e},{action:"High Cooling",min:7,max:10,adjustment:-(3*e)}],p=[{action:"High Dehumidification",min:0,max:3,adjustment:3*t},{action:"Low Dehumidification",min:0,max:5,adjustment:t},{action:"No Action",min:3,max:7,adjustment:0},{action:"Low Humidification",min:5,max:10,adjustment:-e},{action:"High Humidification",min:7,max:10,adjustment:-(3*e)}];for(let e in h)if(g>=h[e].min&&g<=h[e].max){console.log("Action:",h[e].action),console.log("Adjusted Temperature:",m+=h[e].adjustment);break}for(let e in p)if(s>=p[e].min&&s<=p[e].max){console.log("Action:",p[e].action),console.log("Adjusted Humid:",r+=p[e].adjustment);break}l.value=Math.round(100*m)/100,n.value=Math.round(100*r)/100}async function h(t,a){let i=document.createElement("input");if("temp"===a){let t=await e();console.log(t),i.id="temp-input",i.setAttribute("value",t.main.temp)}else if("humid"===a){let t=await e();console.log(t),i.id="humid-input",i.setAttribute("value",t.main.humidity)}else i.id="space-input",i.setAttribute("value",2);t.appendChild(i)}l.addEventListener("click",function(){let e=document.getElementById("egg-area");if(e.childElementCount<5){let t=document.createElement("img");t.setAttribute("class","egg-image"),t.src="https://res.cloudinary.com/dzmhkee5i/image/upload/v1727227065/fuzzy/ozea2mvwcncfzvwvebku.png",e.appendChild(t)}else window.alert("Reached Limit")}),n.addEventListener("click",function(){let e=document.getElementById("egg-area");if(0==e.childElementCount)window.alert("The area is empty!");else{let t=e.lastElementChild;e.removeChild(t)}}),g();
//# sourceMappingURL=index.8064b943.js.map
