from module import Fuzzificate, Rule, Interference, Defuzzificate

if __name__ == '__main__':
    temp = Fuzzificate()

    temp.add_fuzz("Cold Temp", [20, 25])
    temp.add_fuzz("Low Temp", [25, 30])
    temp.add_fuzz("Optimal", [30, 38])
    temp.add_fuzz("High Temp", [38, 42])
    temp.add_fuzz("Critical Temp", [42, 45])

    rules = Rule()

    rules.add_rule("Cold Temp", "Increase Heater Temp")
    rules.add_rule("Low Temp", "Turn Heater On")
    rules.add_rule("Optimal", "Turn off devices")
    rules.add_rule("High Temp", "Turn Aircondition On")
    rules.add_rule("Critical Temp", "Increase Aircondition Temp")

    interference = Interference(temp, rules)

    temperature = 26
    crisp = interference.application(temperature)
    print(crisp)
