//for the graphi for echearts

    const getOptionChart = async(url) => {
        // Obtener símbolo activo desde el selector de activos
        const inputEl = document.getElementById('symbolInput');
        const activeRoll = inputEl ? inputEl.value.trim() : '';

        if (!activeRoll) {
            console.warn('No se seleccionó un activo válido.');
            // Mostrar mensaje de no data
            const chartNoData = document.getElementById('chartNoData');
            if (chartNoData) chartNoData.classList.remove('d-none');
            return null;
        }
        try {
            console.log(`Enviando petición a ${url} con símbolo: ${activeRoll}`);
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ simbolActive: activeRoll })
            });
            if (!response.ok) throw new Error(`Error en la respuesta del backend: ${response.statusText}`);
            const data = await response.json();
            console.log('Datos recibidos del backend:', data);
            return data;
        } catch (ex) {
            console.error('Error en getOptionChart:', ex);
            const chartNoData = document.getElementById('chartNoData');
            if (chartNoData) chartNoData.classList.remove('d-none');
            return null;
        }
    }

    const initChart = async() => {

        try{
            const baseUrl = window.location.origin;
            const url1 = `${baseUrl}/get_char/`;
            const url2 = `${baseUrl}/get_char2/`;

            console.log('Inicializando gráficas...');
            const chartData = await getOptionChart(url1);
            const chartData2 = await getOptionChart(url2);

            if (!chartData) {
                console.warn('No se recibieron datos para la gráfica principal.');
            }
            if (!chartData2) {
                console.warn('No se recibieron datos para la gráfica histórica.');
            }

            const chartDiv = document.getElementById('chart');
            const chartNoData = document.getElementById('chartNoData');
            if (!chartDiv) {
                console.error('No se encontró el contenedor de la gráfica principal.');
                return;
            }

            if (!chartData || !chartData.series || chartData.series.length === 0) {
                console.warn('No se recibieron datos válidos para la gráfica principal.');
                if (chartNoData) chartNoData.classList.remove('d-none');
                chartDiv.innerHTML = '';
                return;
            } else {
                if (chartNoData) chartNoData.classList.add('d-none');
            }

            console.log('Inicializando gráfica principal con datos:', chartData);
            // Limpiar el div antes de inicializar
            chartDiv.innerHTML = '';
            const myChart = echarts.init(chartDiv);
            
            // Estilos personalizados para la gráfica principal
            chartData.color = [getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#2e7d32'];
            chartData.grid = { top: '12%', left: '6%', right: '6%', bottom: '12%' };
            chartData.tooltip = { trigger: 'axis', backgroundColor: 'rgba(0, 0, 0, 0.7)', textStyle: { color: '#fff' } };
            if (chartData.xAxis && typeof chartData.xAxis === 'object') {
                chartData.xAxis.axisLine = { lineStyle: { color: '#888' } };
                chartData.xAxis.axisLabel = { color: '#666' };
            }
            if (chartData.yAxis && typeof chartData.yAxis === 'object') {
                chartData.yAxis.axisLine = { lineStyle: { color: '#888' } };
                chartData.yAxis.axisLabel = { color: '#666' };
            }
            chartData.series = chartData.series.map(serie => ({
                ...serie,
                smooth: true,
                showSymbol: false,
                lineStyle: { width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(46,125,50,0.4)' },
                        { offset: 1, color: 'rgba(46,125,50,0.1)' }
                    ])
                }
            }));
            // DataZoom y estilo de ejes
            chartData.dataZoom = [
                { type: 'inside', xAxisIndex: 0, start: 60, end: 100 },
                { type: 'slider', xAxisIndex: 0, bottom: '3%', height: '10%', start: 60, end: 100 }
            ];
            chartData.xAxis.boundaryGap = false;
            chartData.yAxis.splitLine = { lineStyle: { type: 'dashed', color: '#eee' } };
            chartData.tooltip.axisPointer = { type: 'cross', lineStyle: { color: '#aaa', width: 1, type: 'dashed' } };
            
            myChart.setOption(chartData);
            myChart.resize();

            // Para el chart2 (histórico)
            const chart2Div = document.getElementById('chart2');
            if (chart2Div && chartData2 && chartData2.series && chartData2.series.length > 0) {
                console.log('Inicializando gráfica histórica con datos:', chartData2);
                chart2Div.innerHTML = '';
                const myChart2 = echarts.init(chart2Div);
                
                // Estilos personalizados para la gráfica histórica
                // Convertir a línea suave con degradado y DataZoom
                const secColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#424242';
                chartData2.color = [secColor];
                chartData2.grid = { top: '12%', left: '6%', right: '6%', bottom: '12%' };
                chartData2.tooltip = { trigger: 'axis', backgroundColor: 'rgba(0, 0, 0, 0.7)', textStyle: { color: '#fff' } };
                chartData2.xAxis.boundaryGap = false;
                chartData2.xAxis.axisLine = { lineStyle: { color: '#888' } };
                chartData2.xAxis.axisLabel = { color: '#666' };
                chartData2.yAxis.splitLine = { lineStyle: { type: 'dashed', color: '#f0f0f0' } };
                chartData2.yAxis.axisLine = { lineStyle: { color: '#888' } };
                chartData2.yAxis.axisLabel = { color: '#666' };
                chartData2.series = chartData2.series.map(serie => ({
                    ...serie,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { width: 2, color: secColor },
                    areaStyle: { color: secColor, opacity: 0.2 },
                    emphasis: { focus: 'series' }
                }));
                chartData2.dataZoom = [
                    { type: 'inside', xAxisIndex: 0, start: 60, end: 100 },
                    { type: 'slider', xAxisIndex: 0, bottom: '3%', height: '10%', start: 60, end: 100 }
                ];
                
                myChart2.setOption(chartData2);
                myChart2.resize();
                // Ocultar overlay de historial si existe
                const historyOverlay = document.getElementById('chartOverlay');
                if (historyOverlay) historyOverlay.classList.add('d-none');
            }
        } catch (ex){
            console.error('Error en initChart:', ex);
            const chartNoData = document.getElementById('chartNoData');
            if (chartNoData) chartNoData.classList.remove('d-none');
        }
        
    }

    window.addEventListener("load", async() => {
        initChart()
        
        // Inicializar el header fijo
        initStickyHeader();
        
        // Configurar el botón de más información
        setupInfoModal();
    })

    // Función para hacer el header fijo durante scroll
    function initStickyHeader() {
        const header = document.querySelector('header');
        
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('header-sticky');
                header.classList.add('header-shadow');
            } else {
                header.classList.remove('header-sticky');
                header.classList.remove('header-shadow');
            }
        });
    }

    // Función para configurar el modal de información
    function setupInfoModal() {
        const btnMoreInfo = document.getElementById('btnMoreInfo');
        
        if (!btnMoreInfo) return;
        
        btnMoreInfo.addEventListener('click', function() {
            // Obtener información del activo actual
            const inputEl = document.getElementById('symbolInput');
            const activeSymbol = inputEl ? inputEl.value.trim() : '';
            
            if (!activeSymbol) {
                showToast('Por favor, selecciona un activo primero');
                return;
            }
            
            // Actualizar el modal con la información del activo
            document.getElementById('modalActiveSymbol').textContent = activeSymbol;
            
            // Si hay más información disponible, actualizar los campos
            const activeName = document.getElementById('longNameActive');
            if (activeName) {
                document.getElementById('modalActiveName').textContent = activeName.textContent;
            }
            
            const activePrice = document.getElementById('priceActive');
            if (activePrice) {
                document.getElementById('modalActivePrice').textContent = '$' + activePrice.textContent;
            }
            
            const activeObjective = document.getElementById('objetiveActive');
            if (activeObjective) {
                document.getElementById('modalActiveObjective').textContent = '$' + activeObjective.textContent;
            }
            
            const activeDifference = document.getElementById('diferenceActive');
            if (activeDifference) {
                const differenceValue = parseFloat(activeDifference.textContent);
                const differenceElement = document.getElementById('modalActiveDifference');
                const alertElement = document.getElementById('modalAlertDifference');
                
                differenceElement.textContent = `Diferencia con objetivo: $${Math.abs(differenceValue).toFixed(2)}`;
                
                if (differenceValue < 0) {
                    alertElement.className = 'alert alert-danger';
                    differenceElement.innerHTML += ' <i class="fas fa-arrow-down"></i> (Por encima del objetivo)';
                } else {
                    alertElement.className = 'alert alert-success';
                    differenceElement.innerHTML += ' <i class="fas fa-arrow-up"></i> (Por debajo del objetivo)';
                }
            }
            
            const activeDescription = document.getElementById('infoCompany');
            if (activeDescription) {
                document.getElementById('modalActiveDescription').textContent = activeDescription.textContent;
            }
            
            // Mostrar el modal
            const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
            infoModal.show();
            
            // Crear mini gráfico en el modal
            createModalMiniChart(activeSymbol);
        });
    }

    // Función para crear un mini gráfico en el modal
    async function createModalMiniChart(symbol) {
        const chartContainer = document.getElementById('modalMiniChart');
        
        if (!chartContainer) return;
        
        try {
            const baseUrl = window.location.origin;
            const url = `${baseUrl}/get_char/`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ simbolActive: symbol })
            });
            
            const chartData = await response.json();
            
            // Simplificar la configuración para el mini gráfico
            const miniChartConfig = {
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: 10,
                    right: 10,
                    bottom: 20,
                    left: 30
                },
                xAxis: chartData.xAxis,
                yAxis: chartData.yAxis,
                series: chartData.series
            };
            
            const miniChart = echarts.init(chartContainer);
            miniChart.setOption(miniChartConfig);
            miniChart.resize();
            
            // Generar algunos datos históricos aleatorios para mostrar
            generateHistoricalData(symbol);
            
        } catch (error) {
            console.error('Error creando el mini gráfico:', error);
            chartContainer.innerHTML = '<div class="alert alert-warning">No se pudo cargar el gráfico</div>';
        }
    }

    // Función para generar datos históricos para mostrar
    function generateHistoricalData(symbol) {
        const historicalContainer = document.getElementById('modalHistoricalData');
        
        if (!historicalContainer) return;
        
        // Limpiar contenedor
        historicalContainer.innerHTML = '';
        
        // Fechas para el histórico (últimos 5 días)
        const dates = [];
        for (let i = 5; i >= 1; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toLocaleDateString());
        }
        
        // Generar algunos valores aleatorios basados en el precio actual
        const basePrice = document.getElementById('priceActive') ? 
            parseFloat(document.getElementById('priceActive').textContent) : 100;
        
        dates.forEach(date => {
            // Variación aleatoria entre -2% y +2%
            const variation = (Math.random() * 4 - 2) / 100;
            const price = basePrice * (1 + variation);
            const isPositive = variation >= 0;
            
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <span>${date}</span>
                <span>$${price.toFixed(2)} 
                    <i class="fas fa-${isPositive ? 'arrow-up text-success' : 'arrow-down text-danger'}"></i>
                </span>
            `;
            
            historicalContainer.appendChild(item);
        });
    }

    // Función para mostrar notificaciones toast
    function showToast(message, type = 'warning') {
        // Crear contenedor para toasts si no existe
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Crear el toast
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="fas fa-info-circle me-2 text-${type}"></i>
                    <strong class="me-auto">FFinance</strong>
                    <small>Ahora</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
        
        toast.show();
        
        // Eliminar el toast del DOM después de que se oculte
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }

    // Función para restringir acceso a URLs
    function restrictUrlAccess() {
        // Si la URL no es la raíz, redirigir
        if (window.location.pathname !== '/' && window.location.pathname !== '') {
            window.location.href = '/';
        }
    }

    // Llamar a la restricción de URL al cargar y al cambiar la historia del navegador
    window.addEventListener('load', restrictUrlAccess);
    window.addEventListener('popstate', restrictUrlAccess);
    
    // Configurar botones interactivos
    document.addEventListener('DOMContentLoaded', function() {
        setupShareButton();
        setupCelebrateButton();
        setupQuickPriceButtons();
    });
    
    // Configuración del botón de compartir
    function setupShareButton() {
        const shareButton = document.getElementById('shareButton');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                const symbol = document.getElementById('nameOfsimbol') ? 
                    document.getElementById('nameOfsimbol').textContent : '';
                const price = document.getElementById('priceActive') ? 
                    document.getElementById('priceActive').textContent : '';
                const objective = document.getElementById('objetiveActive') ? 
                    document.getElementById('objetiveActive').textContent : '';
                
                // Crear el texto para compartir
                const shareText = `¡Estoy siguiendo ${symbol} en FFinance! Precio actual: $${price}, Objetivo: $${objective}`;
                
                // Simulamos la funcionalidad de compartir
                // Creamos un elemento de texto temporal
                const textarea = document.createElement('textarea');
                textarea.value = shareText;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    showToast('¡Copiado al portapapeles! Ya puedes compartirlo.', 'success');
                } catch (err) {
                    console.error('No se pudo copiar el texto:', err);
                    showToast('No se pudo copiar al portapapeles', 'danger');
                }
                
                document.body.removeChild(textarea);
            });
        }
    }
    
    // Configuración del botón de celebrar
    function setupCelebrateButton() {
        const celebrateButton = document.getElementById('celebrateButton');
        if (celebrateButton) {
            celebrateButton.addEventListener('click', function() {
                // Crear elementos de confeti
                for (let i = 0; i < 100; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                    document.body.appendChild(confetti);
                    
                    // Eliminar después de la animación
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
                
                showToast('¡Felicidades por alcanzar tu objetivo!', 'success');
            });
        }
    }
    
    // Configuración de los botones de precio rápido
    function setupQuickPriceButtons() {
        const quickPriceButtons = document.querySelectorAll('.quick-price');
        quickPriceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                if (value) {
                    const inputField = document.getElementById('myInput');
                    if (inputField) {
                        inputField.value = value;
                        // Si existe la función de actualización del slider, usarla
                        if (typeof updateRangeFromInput === 'function') {
                            updateRangeFromInput(value);
                        }
                        showToast(`Precio objetivo establecido en $${value}`, 'info');
                    }
                }
            });
        });
    }