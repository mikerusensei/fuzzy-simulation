from refactor import Fuzzificate, Rule, Interference, Defuzzificate

if __name__ == '__main__':
    fuzz = Fuzzificate()

    # temp.add_fuzz("Cold Temp", [26, 26, 32])
    # temp.add_fuzz("Low Temp", [26, 32, 38])
    # temp.add_fuzz("Optimal", [32, 38, 44])
    # temp.add_fuzz("High Temp", [38, 44, 50])
    # temp.add_fuzz("Critical Temp", [44, 44, 50])

    # temp.add_fuzz("Cold Temp", [26, 32])
    # temp.add_fuzz("Low Temp", [26, 38])
    # temp.add_fuzz("Optimal", [32, 44])
    # temp.add_fuzz("High Temp", [38, 50])
    # temp.add_fuzz("Critical Temp", [44, 50])

    # fuzz.add_fuzz("Cold Temp", [16, 16, 30])
    # fuzz.add_fuzz("Low Temp", [16, 25, 34])
    # fuzz.add_fuzz("Optimal Temp", [30, 34, 38])
    # fuzz.add_fuzz("High Temp", [34, 42, 50])
    # fuzz.add_fuzz("Critical Temp", [38, 50, 50])

    fuzz.add_fuzz("Cold Temp", [20, 20, 30])
    fuzz.add_fuzz("Low Temp", [20, 25, 30])
    fuzz.add_fuzz("Optimal Temp", [30, 35, 40])
    fuzz.add_fuzz("High Temp", [40, 45, 50])
    fuzz.add_fuzz("Critical Temp", [40, 50, 50])


    rules = Rule()

    rules.add_rule("Cold Temp", ["Increase Heater Temp", 2])
    rules.add_rule("Low Temp", ["Turn Heater On", 1])
    rules.add_rule("Optimal", ["Turn off Devices", 0])
    rules.add_rule("High Temp", ["Turn Aircondition On", -1])
    rules.add_rule("Critical Temp", ["Increase Aircondition Temp", -2])

    interference = Interference(fuzz, rules)

    temperature = 30
    fuzzy_value = interference.application(temperature)
    control = Defuzzificate(rules, fuzzy_value)
    crisp = control.defuzzificate()
    print(crisp)
    