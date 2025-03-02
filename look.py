import yfinance as yh
import time
import requests  


def seePrice(objetive, btn, active, getInformation):
    stop = False
    if (btn):
        prices = getInformation.fast_info["lastPrice"]
        if (prices > objetive):
            print('Logrado')
            print(getInformation.fast_info["lastPrice"])
            print(f"Precio de Bitcoin en Binance: {data['price']}")
            stop = True
        else:
            diference = objetive - prices
            print(f'Diferencia para alcanzar el objetivo {diference}')
            print(f'Precio actual {prices}')
            
            print(f'Objetivo {objetive}')
    if (active):
        prices = getInformation.info["currentPrice"]
        if (prices > objetive):
            print('Logrado')
            print(getInformation.info['currentPrice'])
            stop = True
        else:
            nameCompany = getInformation.info['longName']
            print(f'Nombre de la empresa {nameCompany}')
            print("Estado Aun no")
            diference = objetive - prices
            print(f'Diferencia para alcanzar el objetivo {diference}')
            print(f'Precio actual {prices}')
            print(f'Objetivo {objetive}')
    return stop

activeBuy = "BTC-USD"

objetive = 97000

if("USD" in activeBuy):
    activeProf = False
    btnProf = True
else: 
    activeProf = True
    btnProf = False

url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"


while(True):
    response = requests.get(url)
    data = response.json()
    getInformationActive = yh.Ticker(activeBuy) 
    lastStop = seePrice(objetive, btnProf, activeProf, getInformationActive)
    print(f"Precio de Bitcoin en Binance: {data['price']}")
    if (lastStop != False):
        break
    time.sleep(5)
    


            