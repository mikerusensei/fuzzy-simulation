export class Fuzzificate{
    constructor(){
        this.fuzz = [];
        this.fuzzVal = [];
    }
    
    addFuzz(name, range){
        this.fuzz.push({name, range});
    }

    calculateFuzz(temp){
        for (const key in this.fuzz){
            const range = this.fuzz[key].range
            const [minRange, peakRange, maxRange] = range;
            // console.log("min", minRange, "peak", peakRange, "max", maxRange, "TEMP: ", temp)
            let value = this.memberTriangle(temp, minRange, peakRange, maxRange);
            // console.log("Value: ", value);
            this.fuzzVal.push(value);
        }
        return this.fuzzVal;
    }
    
    memberTriangle(temp, minRange, peakRange, maxRange){
        if (temp < minRange || temp > maxRange){
            return 0;
        } else if (temp === minRange || temp === peakRange || temp === maxRange){
            return 1;
        } else if (temp >= minRange && temp <= peakRange){
            let numerator = temp - minRange;
            let denominator = peakRange - minRange;
            let answer = numerator / denominator;
            return answer;
        } else if (temp > peakRange && temp <= maxRange){
            let numerator = maxRange - temp;
            let denominator = maxRange - peakRange;
            let answer = numerator / denominator;
            return answer;
        }
    }
    getVal(name){
        for (let i = 0; i < this.fuzz.length; i++){
            if (this.fuzz[i].name == name){
                return this.fuzzVal[i];
            }
        }
    }
    
    defuzz(control){
        let numerator = 0;
        let denominator = 0;
        
        for (const key in control.rules){
            const rule = control.rules[key];
            const max = Math.max(rule.rules[0], rule.rules[1]);
            // console.log('Max: ', max)
            for (const index in this.fuzz){
                if(this.fuzz[index].name === rule.name){
                    const cValue = this.fuzz[index].range[1];
                    // console.log("Cvalue: ", cValue);

                    numerator += max * cValue;
                    denominator += max;
                    break;
                }
            }
        }
        
        if (denominator === 0){
            return 0;
        }else{
            return numerator / denominator;
        }
    }
    getFuzzVal(){
        return this.fuzzVal;
    }
}

export class Interference{
    constructor(){
        this.rules = [];
    }
    addRule(name, rule){
        this.rules.push({name: name, rules: rule})
    }
    getRules(){
        return this.rules;
    }
}