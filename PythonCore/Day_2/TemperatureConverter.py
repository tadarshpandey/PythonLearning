'''
temperature converter from celsius to farenhite and vice versa
'''

def celsius_to_farenhite(celsius):
    '''convert celsius to farenhite'''
    farenhite = (celsius * 9/5) + 32
    return farenhite

def farenhite_to_celsius(farenhite):
    '''convert farenhite to celsius'''
    celsius = (farenhite -32) * 5/9
    return celsius

temp_celsius = float(input("Enter temperature in celsius: "))
print("Temperature in farenhite:", celsius_to_farenhite(temp_celsius))

temp_farenhite = float(input("Enter temperature in farenhite: "))
print("Temperature in celsius:", farenhite_to_celsius(temp_farenhite))