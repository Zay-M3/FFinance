//for the graphi for echearts

    const getOptionChart = async(url) => {
        const activeRoll = document.getElementById('nameOfsimbol').textContent
        try{
            const response = await fetch(url, {
                method : 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({simbolActive : activeRoll})
            })
            
            return await response.json()
        } catch (ex) {
            console.log(ex);
            
        }
    }

    const initChart = async() => {

        try{
            
            const url1 = "http://127.0.0.1:8000/get_char/"
            const url2 = "http://127.0.0.1:8000/get_char2/"
            
            const chartData = await getOptionChart(url1);
            const chartData2 = await getOptionChart(url2);

            const myChart = echarts.init(document.getElementById('chart'));
            const myChart2 = echarts.init(document.getElementById('chart2'))

            myChart.setOption(chartData)
            myChart.resize()
            myChart2.setOption(chartData2)
            myChart2.resize()
        } catch (ex){
            console.log(ex);
        }
        
    }

    window.addEventListener("load", async() => {
        initChart()
    })