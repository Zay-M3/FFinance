from django.shortcuts import render
from django.views import View
from .forms import actives_ffinance
import yfinance as yh
import requests  
from dataclasses import dataclass
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd

# Create your views here.

@dataclass
class activeParametres:
    logNameActive : str
    priceActive : float
    objetive : int
    diference : float
    simbolActive : str
    passkey : bool
    informationActive : str

def seePrice(objetive, btn, active, getInformation):
    logNameA = "Nofound"
    simmbolA = "Nofound"
    prices = 0
    
    stop = False
    if (btn):
        prices = getInformation.fast_info["last_price"]
        logNameA = getInformation.info["longName"]
        simmbolA = getInformation.info["symbol"]
        longBusinessSummaryActive = "NA"
        if (prices > objetive):
            stop = True
            diference = objetive-prices
        else:
            diference = objetive - prices
            
    if (active):
        prices = getInformation.info["currentPrice"]
        print(f"{logNameA, prices}")
        logNameA = getInformation.info["longName"]
        simmbolA = getInformation.info["symbol"]
        longBusinessSummaryActive = getInformation.info["longBusinessSummary"]
        
        if (prices > objetive):
            stop = True
            diference = objetive-prices
        else:
            diference = objetive - prices

    return activeParametres(logNameActive=logNameA,
                            priceActive=prices, 
                            objetive=objetive,
                            diference=diference,
                            simbolActive=simmbolA,
                            passkey=stop,
                            informationActive=longBusinessSummaryActive)

class Home(View):
    template_name = 'home.html'

    def get(self, request):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        formsActive = actives_ffinance(request.POST)

        print(formsActive.is_valid())
        print("No entro")
        if formsActive.is_valid():
            
            activeObjetive = formsActive.cleaned_data['objetiveActive']
            activeSimbol = formsActive.cleaned_data['simbolActive']
            try:
                if("USD" in activeSimbol):
                    activeProf = False
                    btnProf = True
                else: 
                    activeProf = True
                    btnProf = False

                getInformationActive = yh.Ticker(activeSimbol) 
                if (activeSimbol == "Select your active"):
                    longNameActive = 'No found'
                    simbolActive = 'No found'
                    diferenceActive = 'No found'
                    priceActivo = 0
                    objetiveActive = 0
                    passKey = False
                    infoCompany = 'No found' 
                else:
                    activeShow = seePrice(activeObjetive, btnProf, activeProf, getInformationActive)
                    longNameActive = activeShow.logNameActive
                    simbolActive = activeShow.simbolActive
                    diferenceActive = activeShow.diference
                    priceActivo = activeShow.priceActive
                    objetiveActive = activeShow.objetive
                    passKey = activeShow.passkey
                    infoCompany = activeShow.informationActive
                
            except Exception as e:
                print(e) 

        else : 
            longNameActive = 'No found'
            simbolActive = 'No found'
            diferenceActive = 'No found'
            priceActivo = 0
            objetiveActive = 0
            passKey = False
            infoCompany = 'No found'           

        return render(request, self.template_name, {
            'longNameActive' : longNameActive,
            'simbolActive' : simbolActive,
            'diferenceActive' : diferenceActive,
            'priceActive' : priceActivo,
            'objetiveActive' : objetiveActive,
            'passKey' : passKey,
            'infoCompany' : infoCompany,
        })
    
@csrf_exempt
def get_char(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body) 
            simbol_active = data.get("simbolActive") 
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
    else:
        simbol_active = "Default" 
    try:
        active_data = yh.Ticker(simbol_active)
        history = active_data.history(period="5d")

        if history.empty:
            return JsonResponse({"error": "No se encontraron datos para el símbolo especificado"}, status=404)
        
        prices = history["Close"].tolist()
        dates = [date.strftime('%d') for date in history.index]

        chart = {
            'tooltip': {
                'trigger':"axis",
                'axisPointer': {
                'type': "cross",
                'label': {
                    'backgroundColor': "#6a7985"
                }
                }
            },
            'legend': {
                'data': [simbol_active, "Union Ads","Video Ads"]
            },

            'toolbox': {
                'feature': {
                'saveAsImage': {}
                }
            },
            'grid': {
                #'left': '3%',
                #'right': '4%',
                #'bottom': '1%',
                'containLabel': 'true'
            },
            'xAxis': {
                'type': "category",
                'boundaryGap': 'false',
                'data': dates
            },
            'yAxis': {
                'type': "value"
            },
            'series': [
                {
                'name': simbol_active,
                'type': 'line',
                'stack': 'Total',
                'color': "green",
                'areaStyle': {},
                'emphasis': {
                    'focus': 'series'
                },
                'data': prices
                },
            ]
        }
        return JsonResponse(chart)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

      
      
        
@csrf_exempt
def get_char2(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body) 
            simbol_active = data.get("simbolActive") 
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
    else:
        simbol_active = "Default" 
    try:
        active_data = yh.Ticker(simbol_active)
        history = active_data.history(period="1mo")

        if history.empty:
            return JsonResponse({"error": "No se encontraron datos para el símbolo especificado"}, status=404)
        
        prices = history["Close"].tolist()
        dates = [date.strftime('%d') for date in history.index]

        chart = {
            'tooltip': {
                'trigger':"axis",
                'axisPointer': {
                'type': "cross",
                'label': {
                    'backgroundColor': "#6a7985"
                }
                }
            },
            'legend': {
                'data': [simbol_active, "Union Ads","Video Ads"]
            },

            'toolbox': {
                'feature': {
                'saveAsImage': {}
                }
            },
            'grid': {
                #'left': '3%',
                #'right': '4%',
                #'bottom': '1%',
                'containLabel': 'true'
            },
            'xAxis': {
                'type': "category",
                'boundaryGap': 'false',
                'data': dates
            },
            'yAxis': {
                'type': "value"
            },
            'series': [
                {
                'name': simbol_active,
                'type': 'bar',
                'stack': 'Total',
                'color': "green",
                'areaStyle': {},
                'emphasis': {
                    'focus': 'series'
                },
                'data': prices
                },
            ]
        }
        return JsonResponse(chart)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
 
#fugaz one






    
