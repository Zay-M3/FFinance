// Debug script for FFinance charts
console.log('Chart debug script loaded');

// Verify eCharts is available
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for eCharts...');
    
    if (typeof echarts === 'undefined') {
        console.error('eCharts library not found! Charts will not work.');
    } else {
        console.log('eCharts library found. Version:', echarts.version);
    }
    
    // Check for chart containers
    const mainChartContainer = document.getElementById('chart');
    const historyChartContainer = document.getElementById('chart2');
    
    console.log('Main chart container exists:', !!mainChartContainer);
    console.log('History chart container exists:', !!historyChartContainer);
    
    // Listen for chart initialization
    window.addEventListener('charts-initialized', function(e) {
        console.log('Charts initialization event received:', e.detail);
    });
});

// Override chart creation function to add logging
const originalCreateStockChart = window.createStockChart;
window.createStockChart = function(container, options = {}) {
    console.log(`Creating chart in container '${container}' with options:`, options);
    try {
        const result = originalCreateStockChart(container, options);
        console.log(`Chart creation ${result ? 'successful' : 'failed'} for ${container}`);
        return result;
    } catch (error) {
        console.error('Error creating chart:', error);
        return null;
    }
};

// Trigger an event when charts are initialized
const originalInitializeCharts = window.initializeCharts;
window.initializeCharts = function() {
    console.log('Initializing charts...');
    try {
        originalInitializeCharts();
        
        // Dispatch event to signal chart initialization
        window.dispatchEvent(new CustomEvent('charts-initialized', { 
            detail: { success: true, timestamp: new Date().toISOString() } 
        }));
        
        console.log('Charts initialization completed');
    } catch (error) {
        console.error('Error during chart initialization:', error);
        
        // Dispatch event to signal chart initialization failure
        window.dispatchEvent(new CustomEvent('charts-initialized', { 
            detail: { success: false, error: error.message, timestamp: new Date().toISOString() } 
        }));
    }
};
