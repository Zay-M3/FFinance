// ffinance-ui.js - Mejoras de UI/UX para FFinance

// Configuración de elementos UI mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    initTooltips();
    
    // Inicialización de elementos interactivos
    updateResultCardDesign();
    setupPriceRangeInputs();
    setupSuggestPriceButton();
    setupShareButton();
    setupCelebrateButton();
    
    // Inicializar la funcionalidad específica de la tarjeta de resultados
    initializeResultCardFunctionality();
    
    // Inicializar gráficos
    initializeCharts();
    setupCardHeights();
      // Configurar funcionamiento de pantalla completa para las tarjetas
    setupFullscreenCards();
    
    // Actualizar la visualización de objetivos de precio
    updatePriceObjectiveDisplay();
});

// Inicializar tooltips de Bootstrap
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Actualizar el diseño de la tarjeta de resultados
function updateResultCardDesign() {
    // Añadir clase a la tarjeta de resultados
    const resultCard = document.querySelector('.finance-card');
    if (resultCard) {
        resultCard.classList.add('result-card');
    }
    
    // Mejora visual para resultados
    const resultRows = document.querySelectorAll('.result-row');
    resultRows.forEach(row => {
        row.style.marginBottom = '12px';
        row.style.padding = '8px';
        row.style.borderRadius = '6px';
        row.style.backgroundColor = 'rgba(0,0,0,0.02)';
        row.style.transition = 'all 0.2s ease';
        
        // Añadir efecto hover
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0,0,0,0.04)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(0,0,0,0.02)';
        });
    });
}

// Configurar los inputs de rango de precio
function setupPriceRangeInputs() {
    // Mejorar la apariencia del slider
    const priceSlider = document.getElementById('customRange1');
    if (priceSlider) {
        // Aplicar estilos iniciales para el slider
        updateSliderStyle(priceSlider);
        
        // Actualizar estilo cuando el valor cambia
        priceSlider.addEventListener('input', function() {
            updateSliderStyle(this);
        });
    }
    
    // Actualizar formato de precio cuando cambia el input
    const priceInput = document.getElementById('myInput');
    if (priceInput) {
        priceInput.addEventListener('blur', function() {
            formatCurrencyInput(this);
        });
    }
}

// Actualizar el estilo del slider
function updateSliderStyle(slider) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;
    
    // Crear un degradado para visualizar mejor el valor
    slider.style.background = `linear-gradient(to right, 
        var(--primary-color) 0%, 
        var(--primary-color) ${percentage}%, 
        #e0e0e0 ${percentage}%, 
        #e0e0e0 100%)`;
}

// Formatear input como moneda
function formatCurrencyInput(input) {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
        // Si el valor es grande, formatear con separadores de miles
        if (value >= 1000) {
            const formatter = new Intl.NumberFormat('es-ES');
            input.value = formatter.format(value);
            // Restaurar valor numérico al enfocar
            input.addEventListener('focus', function() {
                this.value = this.value.replace(/\./g, '');
            }, { once: true });
        }
    }
}

// Configurar el botón de sugerir precio
function setupSuggestPriceButton() {
    const suggestButton = document.getElementById('suggestPrice');
    if (suggestButton) {
        suggestButton.addEventListener('click', function() {
            const symbol = document.getElementById('select').value;
            if (symbol === 'Select your active') {
                showToast('Por favor, selecciona un activo primero', 'warning');
                return;
            }
            
            // Simular carga
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Calculando...';
            this.disabled = true;
            
            // Simular proceso de sugerencia (en una aplicación real, esto haría una llamada al backend)
            setTimeout(() => {
                // Generar un precio sugerido basado en el símbolo
                let suggestedPrice = 0;
                
                if (symbol.includes('BTC')) {
                    suggestedPrice = Math.floor(30000 + Math.random() * 5000);
                } else if (symbol.includes('ETH')) {
                    suggestedPrice = Math.floor(2000 + Math.random() * 500);
                } else if (['AAPL', 'MSFT', 'GOOG', 'AMZN', 'META'].includes(symbol)) {
                    suggestedPrice = Math.floor(100 + Math.random() * 200);
                } else if (symbol === 'TSLA') {
                    suggestedPrice = Math.floor(150 + Math.random() * 100);
                } else {
                    suggestedPrice = Math.floor(10 + Math.random() * 90);
                }
                
                // Actualizar el input y el slider
                document.getElementById('myInput').value = suggestedPrice;
                updateRangeFromInput(suggestedPrice);
                
                // Restaurar el botón
                this.innerHTML = '<i class="fas fa-magic me-1"></i>Sugerir';
                this.disabled = false;
                
                // Mostrar toast de confirmación
                showToast(`Precio sugerido para ${symbol}: $${suggestedPrice}`, 'success');
            }, 1000);
        });
    }
}

// Configurar botón para compartir análisis
function setupShareButton() {
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            // Obtener datos del análisis
            const symbol = document.getElementById('nameOfsimbol')?.textContent || 'Activo';
            const name = document.getElementById('longNameActive')?.textContent || 'Análisis';
            const currentPrice = document.getElementById('priceActive')?.textContent || '0';
            const targetPrice = document.getElementById('objetiveActive')?.textContent || '0';
            
            // Crear objeto con datos para compartir
            const shareData = {
                title: `Análisis FFinance: ${symbol}`,
                text: `Mi análisis de ${name} (${symbol}): Precio actual $${currentPrice}, Objetivo $${targetPrice}. #FFinance #Inversiones`,
                url: window.location.href
            };
            
            // Intentar usar la API de compartir si está disponible
            if (navigator.share && isMobileDevice()) {
                navigator.share(shareData)
                    .then(() => showToast('¡Compartido con éxito!', 'success'))
                    .catch(err => {
                        console.log('Error al compartir:', err);
                        showShareModal(shareData); // Fallback a modal
                    });
            } else {
                // Usar modal en escritorio o si la API no está disponible
                showShareModal(shareData);
            }
        });
    }
}

// Mostrar modal para compartir (fallback)
function showShareModal(shareData) {
    // Crear modal de bootstrap
    const modalHTML = `
    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="shareModalLabel">Compartir análisis</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Copia este texto para compartir tu análisis:</p>
                    <textarea class="form-control mb-3" rows="4" id="shareText">${shareData.text}</textarea>
                    
                    <div class="d-flex justify-content-center gap-3">
                        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-twitter me-2"></i>Twitter
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-facebook me-2"></i>Facebook
                        </a>
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text)}" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-whatsapp me-2"></i>WhatsApp
                        </a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="copyShareText">
                        <i class="fas fa-copy me-2"></i>Copiar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Añadir modal al DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Mostrar modal
    const shareModal = new bootstrap.Modal(document.getElementById('shareModal'));
    shareModal.show();
    
    // Configurar botón para copiar
    document.getElementById('copyShareText').addEventListener('click', function() {
        const shareText = document.getElementById('shareText');
        shareText.select();
        navigator.clipboard.writeText(shareText.value)
            .then(() => {
                this.innerHTML = '<i class="fas fa-check me-2"></i>Copiado';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy me-2"></i>Copiar';
                }, 2000);
            })
            .catch(err => console.error('Error al copiar: ', err));
    });
    
    // Eliminar modal al cerrarlo
    document.getElementById('shareModal').addEventListener('hidden.bs.modal', function() {
        modalContainer.remove();
    });
}

// Configurar botón para celebrar cuando se alcanza un objetivo
function setupCelebrateButton() {
    const celebrateButton = document.getElementById('celebrateButton');
    if (celebrateButton) {
        celebrateButton.addEventListener('click', function() {
            // Mostrar animación de confeti
            showConfetti();
            
            // Mostrar toast de celebración
            showToast('¡Felicidades por alcanzar tu objetivo!', 'success');
            
            // Actualizar la interfaz
            const achievementCard = this.closest('.achievement-card');
            if (achievementCard) {
                achievementCard.classList.add('achievement-celebration');
                setTimeout(() => {
                    achievementCard.classList.remove('achievement-celebration');
                }, 3000);
            }
        });
    }
}

// Mostrar una celebración cuando se alcanza el objetivo
function celebrateAchievement() {
    // Crear una notificación toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    toastContainer.style.zIndex = '1050';
    
    const toastHTML = `
        <div class="toast bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas fa-trophy text-warning me-2"></i>
                <strong class="me-auto">¡Felicidades!</strong>
                <small>Ahora mismo</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <p>Has alcanzado tu objetivo de precio. ¡Bien hecho!</p>
                <div class="mt-2 pt-2 border-top">
                    <button type="button" class="btn btn-sm btn-light" id="setNewObjective">Definir nuevo objetivo</button>
                    <button type="button" class="btn btn-sm btn-outline-light" data-bs-dismiss="toast">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    // Inicializar y mostrar el toast
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, { autohide: false });
    toast.show();
    
    // Manejar el botón de nuevo objetivo
    const setNewObjectiveBtn = document.getElementById('setNewObjective');
    if (setNewObjectiveBtn) {
        setNewObjectiveBtn.addEventListener('click', function() {
            toast.hide();
            // Aquí iría el código para abrir el modal de definir objetivo
            const infoModal = document.getElementById('infoModal');
            if (infoModal) {
                const bsModal = new bootstrap.Modal(infoModal);
                bsModal.show();
            }
        });
    }
    
    // Eliminar el toast cuando se cierre
    toastElement.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toastContainer);
    });
    
    // Confeti (podría agregarse una biblioteca de confeti)
    console.log('🎉 ¡Celebración por alcanzar el objetivo!');
}

// Animación de confeti para celebración
function showConfetti() {
    // Crear instancia de confeti con canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    // Configurar confeti (usando una versión simplificada sin dependencias externas)
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Colores para el confeti
    const colors = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c', '#1abc9c'];
    const pieces = [];
    const numberOfPieces = 200;
    
    // Crear piezas de confeti
    for (let i = 0; i < numberOfPieces; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            width: Math.random() * 10 + 5,
            height: Math.random() * 4 + 2,
            velocity: {
                x: Math.random() * 6 - 3,
                y: Math.random() * 3 + 2
            },
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    // Animación de confeti
    let completed = false;
    const update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let completedCount = 0;
        for (let i = 0; i < pieces.length; i++) {
            const piece = pieces[i];
            
            ctx.save();
            ctx.translate(piece.x + piece.width / 2, piece.y + piece.height / 2);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            ctx.restore();
            
            piece.x += piece.velocity.x;
            piece.y += piece.velocity.y;
            piece.rotation += piece.rotationSpeed;
            
            // Ajustar velocidad por gravedad y resistencia del aire
            piece.velocity.y += 0.1;
            piece.velocity.x *= 0.99;
            
            // Verificar si la pieza está fuera de la pantalla
            if (piece.y > canvas.height) {
                completedCount++;
            }
        }
        
        // Verificar si todas las piezas han caído
        if (completedCount === pieces.length) {
            completed = true;
        }
        
        // Continuar la animación o eliminar el canvas
        if (!completed) {
            requestAnimationFrame(update);
        } else {
            document.body.removeChild(canvas);
        }
    };
    
    update();
}

// Inicializar funcionalidad específica para la tarjeta de resultados
function initializeResultCardFunctionality() {
    // Verificar si estamos en la página de resultados
    if (document.querySelector('.result-card')) {
        // Añadir efectos visuales a las tarjetas de precio
        const priceCards = document.querySelectorAll('.price-card');
        priceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            });
        });
        
        // Animar la barra de progreso al cargar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            // Guardar el ancho final
            const finalWidth = progressBar.style.width;
            // Iniciar desde 0
            progressBar.style.width = '0%';
            // Animar hasta el ancho final
            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease-in-out';
                progressBar.style.width = finalWidth;
            }, 300);
        }
    }
}

// Inicializar gráficos cuando se cargue la página
function initializeCharts() {
    // Verificar que echarts esté disponible
    if (typeof echarts === 'undefined') {
        console.error('Error: echarts library not loaded. Charts will not be displayed.');
        return;
    }
    
    // Inicializar el gráfico principal si existe el contenedor
    if (document.getElementById('chart')) {
        setupMainChart();
    }
    
    // Inicializar el gráfico de historial si existe el contenedor
    if (document.getElementById('chart2')) {
        setupHistoryChart();
    }
}

// Configurar el gráfico principal
function setupMainChart() {
    try {
        console.log("Inicializando gráfico principal...");
        // Verificar que el elemento existe
        if (!document.getElementById('chart')) {
            console.error("No se encontró el elemento con id 'chart'");
            return;
        }
        
        // Verificar que echarts esté disponible
        if (typeof echarts === 'undefined') {
            console.error("La biblioteca eCharts no está disponible");
            return;
        }
        
        // Verificar si tenemos el símbolo activo
        const symbolElement = document.getElementById('nameOfsimbol');
        const hasActiveSymbol = symbolElement && 
                               symbolElement.textContent && 
                               !symbolElement.textContent.includes('Selecciona un activo');
                               
        console.log("¿Hay símbolo activo?", hasActiveSymbol);
        
        // Crear gráfico de precios principal usando datos reales
        const mainChart = createStockChart('chart', {
            period: '1m',
            animate: true,
            useRealData: true // Usar datos reales de la API
        });
        
        if (!mainChart) {
            console.error('Error: No se pudo crear el gráfico principal');
            return;
        }
        
        // Manejar cambio entre precio y volumen
        const viewPriceBtn = document.getElementById('viewPrice');
        const viewVolumeBtn = document.getElementById('viewVolume');
        
        if (viewPriceBtn && viewVolumeBtn) {
            viewPriceBtn.addEventListener('click', function() {
                this.classList.add('active');
                viewVolumeBtn.classList.remove('active');
                
                // Cambiar vista a solo precio
                mainChart.toggleVolumeView(false);
            });
            
            viewVolumeBtn.addEventListener('click', function() {
                this.classList.add('active');
                viewPriceBtn.classList.remove('active');
                
                // Cambiar vista a incluir volumen
                mainChart.toggleVolumeView(true);
            });
        }
        
        // Actualizar hora de última actualización cada minuto
        setInterval(function() {
            updateLastUpdateTime();
        }, 60000);
    } catch (error) {
        console.error('Error al configurar el gráfico principal:', error);
        
        // Mostrar mensaje en el contenedor del gráfico
        const chartNoData = document.getElementById('chartNoData');
        if (chartNoData) {
            chartNoData.classList.remove('d-none');
            chartNoData.querySelector('h5').textContent = 'Error al cargar el gráfico';
            chartNoData.querySelector('p').textContent = 'Intenta recargar la página';
        }
    }
}

// Configurar el gráfico de historial
function setupHistoryChart() {
    try {
        // Crear gráfico de historial
        const historyChart = createStockChart('chart2', {
            period: '1m',
            animate: true,
            colors: {
                primary: '#3f51b5', // Color diferente al gráfico principal
                secondary: '#9c27b0',
                success: '#4caf50',
                danger: '#f44336',
                warning: '#ff9800'
            }
        });
        
        if (!historyChart) {
            console.error('Error: No se pudo crear el gráfico de historial');
            return;
        }
        
        // Configurar cambio entre vista diaria y mensual
        const viewDailyBtn = document.getElementById('viewDaily');
        const viewMonthlyBtn = document.getElementById('viewMonthly');
        
        if (viewDailyBtn && viewMonthlyBtn) {
            viewDailyBtn.addEventListener('click', function() {
                this.classList.add('active');
                viewMonthlyBtn.classList.remove('active');
                
                // Actualizar con datos diarios
                const data = generateMockStockData('1m', true); // daily=true
                historyChart.update(data);
            });
            
            viewMonthlyBtn.addEventListener('click', function() {
                this.classList.add('active');
                viewDailyBtn.classList.remove('active');
                
                // Actualizar con datos mensuales
                const data = generateMockStockData('1m', false); // daily=false
                historyChart.update(data);
            });
        }
        
        // Configurar botones de período
        const periodButtons = document.querySelectorAll('.btn[data-period]');
        
        if (periodButtons.length > 0) {
            periodButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    periodButtons.forEach(btn => btn.classList.remove('active'));
                    // Añadir clase active al botón actual
                    this.classList.add('active');
                    
                    // Obtener el período seleccionado
                    const period = this.getAttribute('data-period');
                    
                    // Actualizar el texto del período si existe el elemento
                    const periodDisplay = document.getElementById('historyPeriodDisplay');
                    if (periodDisplay) {
                        periodDisplay.textContent = this.textContent;
                    }
                    
                    // Actualizar los indicadores del historial
                    updateHistoryIndicators(period);
                    
                    // Actualizar el gráfico con nuevos datos según el período
                    const data = generateMockStockData(period, viewDailyBtn.classList.contains('active'));
                    historyChart.update(data);
                });
            });
        }
    } catch (error) {
        console.error('Error al configurar el gráfico de historial:', error);
        
        // Mostrar mensaje en el contenedor del gráfico
        const chartOverlay = document.getElementById('chartOverlay');
        if (chartOverlay) {
            chartOverlay.classList.remove('d-none');
            chartOverlay.querySelector('h5').textContent = 'Error al cargar el gráfico de historial';
            chartOverlay.querySelector('p').textContent = 'Intenta recargar la página';
        }
    }
}

// Actualizar los indicadores del historial según el período
function updateHistoryIndicators(period) {
    // Datos simulados para cada período
    const periodData = {
        '1m': { 
            change: '+5.2%', 
            trend: 'Alcista', 
            trendIcon: 'fa-arrow-up',
            trendClass: 'text-success',
            volatility: 'Media'
        },
        '3m': { 
            change: '+12.8%', 
            trend: 'Alcista', 
            trendIcon: 'fa-arrow-up',
            trendClass: 'text-success',
            volatility: 'Alta'
        },
        '6m': { 
            change: '+8.4%', 
            trend: 'Alcista', 
            trendIcon: 'fa-arrow-up',
            trendClass: 'text-success',
            volatility: 'Media'
        },
        '1y': { 
            change: '-3.6%', 
            trend: 'Bajista', 
            trendIcon: 'fa-arrow-down',
            trendClass: 'text-danger',
            volatility: 'Baja'
        },
        '5y': { 
            change: '+45.7%', 
            trend: 'Alcista', 
            trendIcon: 'fa-arrow-up',
            trendClass: 'text-success',
            volatility: 'Alta'
        }
    };
    
    // Obtener los datos del período actual o usar los de 1 mes por defecto
    const data = periodData[period] || periodData['1m'];
    
    // Actualizar los elementos si existen
    const trendIndicator = document.getElementById('trendIndicator');
    const periodChange = document.getElementById('periodChange');
    const volatilityLevel = document.getElementById('volatilityLevel');
    
    if (trendIndicator) {
        trendIndicator.innerHTML = `<i class="fas ${data.trendIcon} ${data.trendClass}"></i> ${data.trend}`;
    }
    
    if (periodChange) {
        periodChange.textContent = data.change;
        periodChange.className = data.change.startsWith('+') 
            ? 'fw-bold text-success' 
            : 'fw-bold text-danger';
    }
    
    if (volatilityLevel) {
        volatilityLevel.textContent = data.volatility;
    }
}

// Actualizar la hora de última actualización
function updateLastUpdateTime() {
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        lastUpdate.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Configurar funcionamiento de pantalla completa para las tarjetas
function setupFullscreenCards() {
    // Tarjeta de gráfico principal
    const toggleMainFullscreen = document.getElementById('toggleFullscreen');
    if (toggleMainFullscreen) {
        toggleMainFullscreen.addEventListener('click', function() {
            const chartCard = document.querySelector('.chart-main-card');
            toggleFullscreen(chartCard, this);
        });
    }
    
    // Tarjeta de historial
    const toggleHistoryFullscreen = document.getElementById('toggleHistoryFullscreen');
    if (toggleHistoryFullscreen) {
        toggleHistoryFullscreen.addEventListener('click', function() {
            const historyCard = document.querySelector('.history-card');
            toggleFullscreen(historyCard, this);
        });
    }
}

// Función genérica para alternar pantalla completa
function toggleFullscreen(element, button) {
    if (!element) return;
    
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
            button.innerHTML = '<i class="fas fa-expand"></i>';
        }).catch(err => {
            console.error(`Error al salir de pantalla completa: ${err.message}`);
        });
    } else {
        element.requestFullscreen().then(() => {
            button.innerHTML = '<i class="fas fa-compress"></i>';
        }).catch(err => {
            console.error(`Error al entrar en pantalla completa: ${err.message}`);
        });
    }
}

// Calcular la diferencia y el porcentaje adecuadamente
function updatePriceObjectiveDisplay() {
    const priceActiveElem = document.getElementById('priceActive');
    const objetiveActiveElem = document.getElementById('objetiveActive');
    const diferenceDisplayElem = document.getElementById('diferenceDisplay');
    const progressBarElem = document.querySelector('.progress-bar');
    
    if (priceActiveElem && objetiveActiveElem && diferenceDisplayElem) {
        const priceActive = parseFloat(priceActiveElem.textContent);
        const objetiveActive = parseFloat(objetiveActiveElem.textContent);
        
        if (!isNaN(priceActive) && !isNaN(objetiveActive) && objetiveActive > 0) {
            // Calcular la diferencia
            const difference = Math.abs(priceActive - objetiveActive).toFixed(2);
            
            // Calcular el porcentaje
            const percentage = (priceActive / objetiveActive * 100).toFixed(0);
            
            // Verificar si se ha alcanzado el objetivo
            const isAchieved = priceActive >= objetiveActive;
            
            // Actualizar el texto
            if (isAchieved) {
                diferenceDisplayElem.innerHTML = `
                    <i class="fas fa-trophy text-warning"></i> Objetivo alcanzado: +${difference}$ 
                    <small>(${percentage}%)</small>
                `;
                
                // Mostrar una celebración si se ha superado por primera vez
                if (!diferenceDisplayElem.dataset.celebrated && priceActive > objetiveActive) {
                    celebrateAchievement();
                    diferenceDisplayElem.dataset.celebrated = 'true';
                }
            } else {
                diferenceDisplayElem.innerHTML = `
                    <i class="fas fa-arrow-down text-danger"></i> -${difference}$ 
                    <small>(${percentage}%)</small>
                `;
                delete diferenceDisplayElem.dataset.celebrated;
            }
            
            // Actualizar la barra de progreso
            if (progressBarElem) {
                progressBarElem.style.width = `${Math.min(percentage, 100)}%`;
                progressBarElem.setAttribute('aria-valuenow', Math.min(percentage, 100));
                
                // Cambiar el color de la barra si se ha alcanzado el objetivo
                if (isAchieved) {
                    progressBarElem.classList.remove('bg-primary');
                    progressBarElem.classList.add('bg-success');
                } else {
                    progressBarElem.classList.remove('bg-success');
                    progressBarElem.classList.add('bg-primary');
                }
            }
        }
    }
}
