const dailyDistance = document.getElementById('distance');
const fuel = document.getElementById('fuel');
const electricity = document.getElementById('electricity');
let fuelType;
let charging;
const chart = document.querySelector('.chart');
const btnCalculation = document.querySelector('.btn-calculation');

btnCalculation.addEventListener('click', function(){
    if (dailyDistance.value && fuel.value && electricity.value) {
        fuelType = document.querySelector('input[name="fuel"]:checked');
        charging = document.querySelector('input[name="charging"]:checked');
        resultFind();
    }
})

function resultFind(){
    let fuelRate = (parseFloat(dailyDistance.value) * parseFloat(fuel.value) * parseFloat(fuelType.value))/100;
    let electricityRate = (parseFloat(dailyDistance.value) * parseFloat(electricity.value) * parseFloat(charging.value))/100;
    fuelRate = roundUp(fuelRate, 1);
    let fuelRate7 = roundUp((fuelRate * 7), 1);
    let fuelRate30 = roundUp((fuelRate * 30), 1);
    electricityRate = roundUp(electricityRate, 1);
    let electricityRate7 = roundUp((electricityRate * 7), 1);
    let electricityRate30 = roundUp((electricityRate * 30), 1);
    chart.classList.add('active');
    createcharts(fuelRate, fuelRate7, fuelRate30, electricityRate, electricityRate7, electricityRate30);
}

function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}

// Создание графиков

function createcharts(fuelRate, fuelRate7, fuelRate30, electricityRate, electricityRate7, electricityRate30) {

    document.getElementById('fuelTitle').innerHTML = `(Вид топлива: ${fuelType.getAttribute('data-type')})`;
    document.getElementById('electricityTitle').innerHTML = `(Тип зарядки: ${charging.getAttribute('data-type')})`;

    var chartFuel = new CanvasJS.Chart("chartContainerFuel",
    {
        animationEnabled: true,
        dataPointMaxWidth: 120,
        axisX: {
            labelFontSize: 14,
            labelFontColor: "#787878",
            lineColor: "#e5e5e5",
            tickLength: 0,
        },
        axisY: {
            labelFontSize: 14,
            labelFontColor: "#787878",
            valueFormatString: "#",
            gridColor: "rgba(0,0,0,0)",
            lineColor: "#e5e5e5",
            tickLength: 0,
        },
        data: [
            {
                toolTipContent: "<b>{label}</b>: {y} BYN",
                indexLabelFontSize: 16,
                indexLabelFontFamily: "montserrat",
                indexLabelFontWeight: "bold",
                type: "column",
                color: "#3e88a6",
                dataPoints: [

                    { y: fuelRate, label: "Дневной", indexLabel: `${fuelRate} BYN` },
                    { y: fuelRate7, label: "Недельный", indexLabel: `${fuelRate7} BYN` },
                    { y: fuelRate30, label: "Месячный", indexLabel: `${fuelRate30} BYN` },
                ]
            }
        ]
    }
    );

    chartFuel.render();

    var chartElectro = new CanvasJS.Chart("chartContainerElectro",
        {
            animationEnabled: true,
            dataPointMaxWidth: 120,
            axisX: {
                labelFontSize: 14,
                labelFontColor: "#787878",
                lineColor: "#e5e5e5",
                tickLength: 0,
            },
            axisY: {
                labelFontSize: 14,
                labelFontColor: "#787878",
                valueFormatString: "#",
                gridColor: "rgba(0,0,0,0)",
                lineColor: "#e5e5e5",
                tickLength: 0,
            },
            data: [
                {
                    toolTipContent: "<b>{label}</b>: {y} BYN",
                    indexLabelFontSize: 16,
                    indexLabelFontFamily: "montserrat",
                    indexLabelFontWeight: "bold",
                    type: "column",
                    color: "#3e88a6",
                    dataPoints: [

                        { y: electricityRate, label: "Дневной", indexLabel: `${electricityRate} BYN` },
                        { y: electricityRate7, label: "Недельный", indexLabel: `${electricityRate7} BYN` },
                        { y: electricityRate30, label: "Месячный", indexLabel: `${electricityRate30} BYN` },
                    ]
                }
            ]
        });

        chartElectro.render();
}