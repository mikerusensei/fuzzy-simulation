class Fuzzificate{
    constructor(){
        this.fuzz = [];
    }
    
    addFuzz(name, range){
        this.fuzz.push({name, range});
    }
    
    memberTriangle(temp, minRange, peakRange, maxRange){
        if (temp < minRange || temp >= maxRange){
            return 0;
        } else if (temp == peakRange){
            return 1;
        } else if (temp >= minRange && temp < peakRange){
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
    
    coldTemp(temp){
        let [minRange, peakRange, maxRange] = this.getRange('Cold Temp');
        return this.memberTriangle(temp, minRange, peakRange, maxRange);
    }
    
    lowTemp(temp){
        let [minRange, peakRange, maxRange] = this.getRange('Low Temp');
        return this.memberTriangle(temp, minRange, peakRange, maxRange);
    }
    
    optimalTemp(temp){
        let [minRange, peakRange, maxRange] = this.getRange('Optimal Temp');
        return this.memberTriangle(temp, minRange, peakRange, maxRange);
    }
    
    highTemp(temp){
        let [minRange, peakRange, maxRange] = this.getRange('High Temp');
        return this.memberTriangle(temp, minRange, peakRange, maxRange);
    }
    
    criticalTemp(temp){
        let [minRange, peakRange, maxRange] = this.getRange('Critical Temp');
        return this.memberTriangle(temp, minRange, peakRange, maxRange);
    }
    
    getRange(name){
        let fuzzLength = this.fuzz.length;
        for (let i = 0; i < fuzzLength; i++){
            if (this.fuzz[i].name === name){
                return this.fuzz[i].range;
            }
            
        }
    }
    
    getFuzz(){
        return this.fuzz
    }
}

class Rule{
    constructor(){
        this.rules = [];
    }
    addRule(name, condition){
        this.rules.push({name, condition});
    }
    getRules(name){
        let rulesLength = this.rules.length;
        for (let i = 0; i < rulesLength; i++){
            if (this.rules[i].name === name){
                return this.rules[i].condition;
            }
            
        }
    }
}

class Interference{
    constructor(fuzz, rules){
        this.fuzz = fuzz;
        this.rules = rules
    }
    
    application(temp){
        const coldTemp = this.fuzz.coldTemp(temp);
        const lowTemp = this.fuzz.lowTemp(temp);
        const optimalTemp = this.fuzz.optimalTemp(temp);
        const highTemp = this.fuzz.highTemp(temp);
        const criticalTemp = this.fuzz.criticalTemp(temp);
        
        const settings = {
            [this.rules.getRules('Cold Temp')[0]]: coldTemp,
            [this.rules.getRules('Low Temp')[0]]: lowTemp,
            [this.rules.getRules('Optimal Temp')[0]]: optimalTemp,
            [this.rules.getRules('High Temp')[0]]: highTemp,
            [this.rules.getRules('Critical Temp')[0]]: criticalTemp,
        };
                
        return settings;
    }
}

class Defuzzificate{
    constructor(fuzzyValue, rules){
        this.fuzzyValue = fuzzyValue;
        this.rules = rules;
        this.numerator = 0;
        this.denominator = 0;
    }
    
    defuzzificate(){
        const weights = {
            [this.rules.getRules('Cold Temp')[0]]: this.rules.getRules('Cold Temp')[1],
            [this.rules.getRules('Low Temp')[0]]: this.rules.getRules('Low Temp')[1],
            [this.rules.getRules('Optimal Temp')[0]]: this.rules.getRules('Optimal Temp')[1],
            [this.rules.getRules('High Temp')[0]]: this.rules.getRules('High Temp')[1],
            [this.rules.getRules('Critical Temp')[0]]: this.rules.getRules('Critical Temp')[1],
        };
        
        for (const key in this.fuzzyValue) {
            const membershipValue = this.fuzzyValue[key]; // Get the fuzzy membership value
            const weight = weights[key]; // Get the weight for the fuzzy set

            // Accumulate the weighted numerator and the total weight denominator
            this.numerator += membershipValue * weight;
            this.denominator += membershipValue;
        }

        if (this.denominator === 0) return 0; // Avoid division by zero
        return this.numerator / this.denominator; // Return the defuzzified value
        
        
    }
}

const fuzz = new Fuzzificate();
fuzz.addFuzz('Cold Temp', [16, 16, 30]);
fuzz.addFuzz('Low Temp', [16, 25, 34]);
fuzz.addFuzz("Optimal Temp", [30, 34, 38]);
fuzz.addFuzz("High Temp", [34, 42, 50]);
fuzz.addFuzz("Critical Temp", [38, 50, 50]);

const rules = new Rule();
rules.addRule("Cold Temp", ["Increase Heater Temp", 2]);
rules.addRule("Low Temp", ["Turn Heater On", 1]);
rules.addRule("Optimal Temp", ["Turn off Devices", 0]);
rules.addRule("High Temp", ["Turn Aircondition On", -1]);
rules.addRule("Critical Temp", ["Increase Aircondition Temp", -2]);

const interference = new Interference(fuzz, rules);

const temperature = 29;

const fuzzyValue = interference.application(temperature);

const defuzz = new Defuzzificate(fuzzyValue, rules);
const defuzzValue = defuzz.defuzzificate();
console.log(defuzzValue);
