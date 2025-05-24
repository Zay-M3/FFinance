/* Funciones específicas para la interfaz de FFinance */

// Función para crear un gráfico de línea SOLO para pruebas o demos
// NO USAR en producción para la gráfica principal de activos reales
function createStockChart(container, options = {}) {
    // Opciones por defecto
    const defaults = {
        showVolume: false,
        period: '1m',
        animate: true,
        colors: {
            primary: '#2e7d32',
            secondary: '#90caf9',
            success: '#4caf50',
            danger: '#f44336',
            warning: '#ff9800'
        },
        useRealData: false  // Por defecto, solo mock. Cambia a true SOLO si pasas los datos reales manualmente
    };
    
    // Fusionar opciones
    const settings = { ...defaults, ...options };
    
    // Verificar que el contenedor existe
    const chartContainer = document.getElementById(container);
    if (!chartContainer) {
        console.error(`Contenedor de gráfico #${container} no encontrado`);
        return null;
    }
    
    // Si no hay datos reales, generar datos de prueba
    let data = [];
    if (!settings.useRealData) {
        data = generateMockStockData(settings.period);
    } else if (settings.data) {
        data = settings.data;
    } else {
        // Si se indica useRealData pero no se pasan datos, no hacer nada
        console.warn('No se pasaron datos reales a createStockChart');
        return null;
    }
      // Inicializar eCharts
    const myChart = echarts.init(chartContainer);
    
    // Opciones básicas para el gráfico de línea
    const chartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function(params) {
                const date = params[0].axisValue;
                const price = params[0].data;
                return `Fecha: ${date}<br>Precio: $${price.toFixed(2)}`;
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                color: '#666',
                formatter: function(value) {
                    // Formato corto para las fechas
                    return value.substring(5);
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '${value}'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            }
        },
        series: [
            {
                name: 'Precio',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: settings.colors.primary
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: settings.colors.primary + '50' // Color con transparencia
                        },
                        {
                            offset: 1,
                            color: settings.colors.primary + '10'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                }
            }
        ]
    };
    
    // Si se debe mostrar el volumen, agregarlo como una serie adicional
    if (settings.showVolume) {
        chartOptions.series.push({
            name: 'Volumen',
            type: 'bar',
            data: volumes,
            xAxisIndex: 0,
            yAxisIndex: 1,
            itemStyle: {
                color: settings.colors.secondary + '70'
            }
        });
        
        // Agregar un segundo eje Y para el volumen
        chartOptions.yAxis = [
            chartOptions.yAxis,
            {
                type: 'value',
                name: 'Volumen',
                position: 'right',
                axisLabel: {
                    formatter: function(value) {
                        return formatLargeNumber(value);
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ];
    }
    
    // Mostrar el gráfico
    myChart.setOption(chartOptions);
    
    // Manejar resize
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    return {
        update: function(newData) {
            const newDates = newData.map(item => item.date);
            const newPrices = newData.map(item => item.price);
            const newVolumes = newData.map(item => item.volume);
            
            // Actualizar datos de la serie
            chartOptions.xAxis.data = newDates;
            chartOptions.series[0].data = newPrices;
            
            if (settings.showVolume && chartOptions.series.length > 1) {
                chartOptions.series[1].data = newVolumes;
            }
            
            myChart.setOption(chartOptions);
        },
        resize: function() {
            myChart.resize();
        },
        destroy: function() {
            myChart.dispose();
        },
        toggleVolumeView: function(show) {
            if (show && chartOptions.series.length === 1) {
                // Agregar serie de volumen
                chartOptions.series.push({
                    name: 'Volumen',
                    type: 'bar',
                    data: volumes,
                    itemStyle: {
                        color: settings.colors.secondary + '70'
                    }
                });
                
                // Agregar eje Y para volumen
                if (!Array.isArray(chartOptions.yAxis)) {
                    chartOptions.yAxis = [
                        chartOptions.yAxis,
                        {
                            type: 'value',
                            name: 'Volumen',
                            position: 'right',
                            axisLabel: {
                                formatter: function(value) {
                                    return formatLargeNumber(value);
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ];
                }
            } else if (!show && chartOptions.series.length > 1) {
                // Quitar serie de volumen
                chartOptions.series.pop();
                
                // Restaurar eje Y único
                if (Array.isArray(chartOptions.yAxis)) {
                    chartOptions.yAxis = chartOptions.yAxis[0];
                }
            }
            
            myChart.setOption(chartOptions);
        }
    };
}

// Función para generar datos simulados de acciones
function generateMockStockData(period, daily = false) {
    const now = new Date();
    const data = [];
    let points = 30;
    let startPrice = 100 + Math.random() * 50;
    let volatility = 0.02;
    
    switch(period) {
        case '1m':
            points = daily ? 30 : 4;
            break;
        case '3m':
            points = daily ? 90 : 12;
            break;
        case '6m':
            points = daily ? 180 : 24;
            break;
        case '1y':
            points = daily ? 365 : 52;
            volatility = 0.03;
            break;
        case '5y':
            points = daily ? 1825 : 60;
            volatility = 0.05;
            break;
    }
    
    for (let i = 0; i < points; i++) {
        const date = new Date();
        
        if (daily) {
            // Para datos diarios, retroceder en días
            date.setDate(now.getDate() - (points - i));
        } else {
            // Para datos mensuales, retroceder en semanas o meses
            if (period === '1m' || period === '3m' || period === '6m') {
                date.setDate(now.getDate() - ((points - i) * 7)); // Semanal
            } else {
                date.setMonth(now.getMonth() - (points - i)); // Mensual
            }
        }
        
        // Simular cambios en el precio según volatilidad
        const change = (Math.random() - 0.5) * volatility * startPrice;
        startPrice += change;
        
        // Asegurar que el precio nunca sea negativo
        if (startPrice < 1) startPrice = 1 + Math.random() * 5;
        
        // Simular volumen con variación aleatoria
        const baseVolume = Math.floor(Math.random() * 1000000 + 500000);
        const volumeVariation = Math.random() * 0.5 + 0.75; // 0.75 - 1.25
        
        data.push({
            date: date.toISOString().split('T')[0],
            price: startPrice,
            volume: Math.floor(baseVolume * volumeVariation)
        });
    }
    
    return data;
}

// Función para formatear números grandes (miles, millones)
function formatLargeNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

// Función para simular la carga de datos reales de una API
function fetchStockData(symbol, period = '1m', callback) {
    // Simular una llamada a una API
    console.log(`Obteniendo datos para ${symbol} con período ${period}`);
    
    // Retraso simulado
    setTimeout(() => {
        // Datos simulados para demostración
        const data = generateMockStockData(period);
        
        if (callback && typeof callback === 'function') {
            callback(data);
        }
        
        return data;
    }, 500);
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createStockChart,
        formatLargeNumber,
        formatPercentage,
        fetchStockData,
        generateMockStockData
    };
}

// NOTA: Este archivo es solo para pruebas/demos. Para datos reales, usa scripts.js y la función initChart().
