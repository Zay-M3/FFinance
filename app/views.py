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

# Añadir diccionarios de tickers populares 
def get_popular_tickers():
    """Obtener una lista más amplia de tickers populares más allá del S&P 500"""
    common_stocks = [
        # Tecnología
        {"symbol": "AAPL", "name": "Apple Inc."},
        {"symbol": "MSFT", "name": "Microsoft Corporation"},
        {"symbol": "GOOGL", "name": "Alphabet Inc. (Google)"},
        {"symbol": "AMZN", "name": "Amazon.com Inc."},
        {"symbol": "META", "name": "Meta Platforms (Facebook)"},
        {"symbol": "TSLA", "name": "Tesla Inc."},
        {"symbol": "NVDA", "name": "NVIDIA Corporation"},
        {"symbol": "AMD", "name": "Advanced Micro Devices"},
        {"symbol": "INTC", "name": "Intel Corporation"},
        {"symbol": "CRM", "name": "Salesforce Inc."},
        {"symbol": "ADBE", "name": "Adobe Inc."},
        
        # Finanzas
        {"symbol": "JPM", "name": "JPMorgan Chase & Co."},
        {"symbol": "BAC", "name": "Bank of America Corp."},
        {"symbol": "WFC", "name": "Wells Fargo & Co."},
        {"symbol": "GS", "name": "Goldman Sachs Group Inc."},
        {"symbol": "V", "name": "Visa Inc."},
        {"symbol": "MA", "name": "Mastercard Inc."},
        
        # Consumo
        {"symbol": "PG", "name": "Procter & Gamble Co."},
        {"symbol": "KO", "name": "The Coca-Cola Co."},
        {"symbol": "PEP", "name": "PepsiCo Inc."},
        {"symbol": "WMT", "name": "Walmart Inc."},
        {"symbol": "MCD", "name": "McDonald's Corp."},
        {"symbol": "SBUX", "name": "Starbucks Corp."},
        {"symbol": "NKE", "name": "Nike Inc."},
        {"symbol": "DIS", "name": "The Walt Disney Co."},
        {"symbol": "NFLX", "name": "Netflix Inc."},
        
        # Salud
        {"symbol": "JNJ", "name": "Johnson & Johnson"},
        {"symbol": "PFE", "name": "Pfizer Inc."},
        {"symbol": "MRNA", "name": "Moderna Inc."},
        {"symbol": "UNH", "name": "UnitedHealth Group Inc."},
        
        # Energía
        {"symbol": "XOM", "name": "Exxon Mobil Corp."},
        {"symbol": "CVX", "name": "Chevron Corp."},
        
        # Criptomonedas
        {"symbol": "BTC-USD", "name": "Bitcoin USD"},
        {"symbol": "ETH-USD", "name": "Ethereum USD"},
        {"symbol": "DOGE-USD", "name": "Dogecoin USD"},
        {"symbol": "SOL-USD", "name": "Solana USD"},
        
        # Índices
        {"symbol": "^GSPC", "name": "S&P 500"},
        {"symbol": "^DJI", "name": "Dow Jones Industrial Average"},
        {"symbol": "^IXIC", "name": "NASDAQ Composite"},
        {"symbol": "^FTSE", "name": "FTSE 100 (Londres)"},
        {"symbol": "^N225", "name": "Nikkei 225 (Tokio)"},
        {"symbol": "^HSI", "name": "Hang Seng (Hong Kong)"},
        {"symbol": "^GDAXI", "name": "DAX (Alemania)"},
        {"symbol": "^FCHI", "name": "CAC 40 (Francia)"},
        {"symbol": "^IBEX", "name": "IBEX 35 (España)"},
        {"symbol": "^STOXX50E", "name": "EURO STOXX 50"},
        
        # Tecnología adicional
        {"symbol": "TWTR", "name": "Twitter Inc."},
        {"symbol": "UBER", "name": "Uber Technologies Inc."},
        {"symbol": "LYFT", "name": "Lyft Inc."},
        {"symbol": "SNAP", "name": "Snap Inc."},
        {"symbol": "SPOT", "name": "Spotify Technology S.A."},
        {"symbol": "ZM", "name": "Zoom Video Communications"},
        {"symbol": "PYPL", "name": "PayPal Holdings Inc."},
        
        # Retail y Consumo adicional
        {"symbol": "TGT", "name": "Target Corporation"},
        {"symbol": "COST", "name": "Costco Wholesale Corp."},
        {"symbol": "HD", "name": "Home Depot Inc."},
        {"symbol": "LOW", "name": "Lowe's Companies Inc."},
        {"symbol": "LULU", "name": "Lululemon Athletica Inc."},
        {"symbol": "NKE", "name": "Nike Inc."},
        {"symbol": "SBUX", "name": "Starbucks Corp."},
        
        # Automotriz
        {"symbol": "F", "name": "Ford Motor Company"},
        {"symbol": "GM", "name": "General Motors Company"},
        {"symbol": "TM", "name": "Toyota Motor Corp."},
        {"symbol": "HMC", "name": "Honda Motor Co., Ltd."},
        {"symbol": "VWAGY", "name": "Volkswagen AG"},
        {"symbol": "BMW.DE", "name": "Bayerische Motoren Werke AG"},
        
        # Entretenimiento
        {"symbol": "DIS", "name": "The Walt Disney Company"},
        {"symbol": "NFLX", "name": "Netflix Inc."},
        {"symbol": "CMCSA", "name": "Comcast Corporation"},
        {"symbol": "SONY", "name": "Sony Group Corporation"},
    ]
    
    # Podríamos añadir más categorías según sea necesario
    
    return common_stocks

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
    diference = 0  # Inicializar diference por defecto
    longBusinessSummaryActive = "NA"  # Inicializar por defecto
    
    stop = False
    if (btn):
        try:
            prices = getInformation.fast_info["last_price"]
            logNameA = getInformation.info.get("longName", "Nofound")
            simmbolA = getInformation.info.get("symbol", "Nofound")
            longBusinessSummaryActive = "NA"
            if (prices > objetive):
                stop = True
                diference = objetive-prices
            else:
                diference = objetive - prices
        except Exception as e:
            print(f"Error en seePrice (btn): {e}")
            
    if (active):
        try:
            prices = getInformation.info.get("currentPrice", 0)
            print(f"{logNameA, prices}")
            logNameA = getInformation.info.get("longName", "Nofound")
            simmbolA = getInformation.info.get("symbol", "Nofound")
            longBusinessSummaryActive = getInformation.info.get("longBusinessSummary", "NA")
            
            if (prices > objetive):
                stop = True
                diference = objetive-prices
            else:
                diference = objetive - prices
        except Exception as e:
            print(f"Error en seePrice (active): {e}")

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
        # Obtener lista de tickers populares en lugar de solo S&P 500
        tickers_list = get_popular_tickers()
        
        try:
            # Añadir S&P 500 si es posible obtenerlos
            tables = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
            df = tables[0]
            
            # Convertir a conjunto para evitar duplicados
            existing_symbols = {t["symbol"] for t in tickers_list}
            
            # Añadir símbolos del S&P 500 que no estén ya en la lista
            for _, row in df.iterrows():
                symbol = str(row['Symbol'])
                if symbol not in existing_symbols:
                    tickers_list.append({'symbol': symbol, 'name': row['Security']})
                    existing_symbols.add(symbol)
                    
        except Exception as e:
            print(f"Error al obtener S&P 500: {e}")
            # Si hay error, continuamos con la lista de tickers populares
        
        # Ordenar alfabéticamente por símbolo
        tickers_list.sort(key=lambda x: x["symbol"])

        # Valores por defecto para la carga inicial
        return render(request, self.template_name, {
            'longNameActive': '',
            'simbolActive': '',
            'diferenceActive': 0,
            'priceActive': 0,
            'objetiveActive': 0,
            'passKey': False,
            'infoCompany': '',
            'tickers': tickers_list,
        })
    
    def post(self, request, *args, **kwargs):
        # Obtener lista de tickers para poblar el select incluso tras POST
        tickers_list = get_popular_tickers()
        try:
            # Añadir S&P 500 si es posible obtenerlos
            tables = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
            df = tables[0]
            
            # Convertir a conjunto para evitar duplicados
            existing_symbols = {t["symbol"] for t in tickers_list}
            
            # Añadir símbolos del S&P 500 que no estén ya en la lista
            for _, row in df.iterrows():
                symbol = str(row['Symbol'])
                if symbol not in existing_symbols:
                    tickers_list.append({'symbol': symbol, 'name': row['Security']})
                    existing_symbols.add(symbol)
        except Exception as e:
            print(f"Error al obtener S&P 500: {e}")
            # Si hay error, continuamos con la lista ya poblada
        
        # Ordenar alfabéticamente por símbolo
        tickers_list.sort(key=lambda x: x["symbol"])
        formsActive = actives_ffinance(request.POST)

        print(formsActive.is_valid())
        print("No entro")
        if formsActive.is_valid():
            
            activeObjetive = formsActive.cleaned_data['objetiveActive']
            activeSimbol = formsActive.cleaned_data['simbolActive']            # Inicializar todas las variables con valores predeterminados antes del bloque try
            longNameActive = 'No found'
            simbolActive = 'No found'
            diferenceActive = 'No found'
            priceActivo = 0
            objetiveActive = 0
            passKey = False
            infoCompany = 'No found'
            
            try:
                if("USD" in activeSimbol):
                    activeProf = False
                    btnProf = True
                else: 
                    activeProf = True
                    btnProf = False

                getInformationActive = yh.Ticker(activeSimbol) 
                if (activeSimbol == "Select your active"):
                    # Valores ya inicializados, no necesitamos hacer nada aquí
                    pass
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
                print(f"Error al obtener datos de YFinance: {e}")
                # No necesitamos inicializar variables aquí ya que lo hicimos al principio

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
            'tickers': tickers_list,
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
 
@csrf_exempt
def list_tickers(request):
    """Devuelve hasta 10 símbolos/nombres que coincidan con q"""
    q = request.GET.get('q', '').strip().lower()
    try:
        tables = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
        df = tables[0]
        results = []
        for _, row in df.iterrows():
            sym = str(row['Symbol'])
            name = str(row['Security'])
            text = f"{sym} {name}".lower()
            if q and q not in text:
                continue
            results.append({'symbol': sym, 'name': name})
            if len(results) >= 10:
                break
        return JsonResponse({'tickers': results})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)







