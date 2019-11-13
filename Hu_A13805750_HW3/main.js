let typs = ['black_coal','distillate','gas_ccgt','hydro','pumps','wind','exports'];

let colrs = ["#121212", "#C74523", "#FDB462", "#4582B4", "#88AFD0", "#437607", "#977AB1"];

let time = timeArr(1571579700*1000,1572183000*1000,30);

let stack = {
    chart:{
        type:'area',
        height:300,
        backgroundColor:"#ece9e6",
        animation:false,
    },
    title:{
        text:'Generation and Loads',
        align:'left'
    },
    subtitle:{
        text:'MW',
        align:'left'
    },
    xAxis:{
        tickPositions: [47, 95, 143, 191, 239, 287, 335],
        events: {
                        setExtremes: syncExtremes
                    },
        labels: {
            formatter: function () {

                tot = time[this.value].toDateString().slice(0,10);
                week = tot.slice(0,4);
                month = tot.slice(4,11);
                return week+"\n"+month;
                    }
                },
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
    },
    legend:{
        enabled:false,
    },
    tooltip: {
        enabled:true,
        crosshairs:true,
        shared:true,
        positioner:function(){
            return{
                x:this.chart.chartWidth - this.label.width,
                y:10
            };
        },
        borderWidth:0,
        backgroundColor:'white',
        pointFormat:'{point.y}',
        headerFormat:'',
        shadow:false,
        formatter:function(){
            //data = this.points[0].series.chart.series[0].data;
            var data = [];
            var sum = 0;
            $.each(this.points, function(i, point){
                var val = point.y;
                data.push(val);
                sum = sum+val;
            });
            //data = JSON.stringify(data);
            sender = $("#tooltip");
            sender.on("change", function(){
                    sender.val(data);
                }).triggerHandler('change');

            idx = this.points[0].x
            return_month = time[idx].toDateString().slice(0,10).slice(4,11);
            return_time = time[idx].toTimeString().slice(0,12);
            return_time_a = return_time.slice(0,5);
            return_time_b = return_time.slice(-3);
            return_time = return_time_a + " "+ return_time_b;
            return_x = return_month+", "+return_time;
            return return_x+' | Total: '+sum.toFixed() + ' MW';
        }
    },
    plotOptions: {
        area: {
            stacking: 'normal'
            }
        },
};

let price = {
    chart:{
        type:'line',
        height:300,
        backgroundColor:"#ece9e6",
        animation:false,
    },
    title:{
        text:'price',
        align:'left'
    },
    subtitle:{
        text:'$/MWh',
        align:'left'
    },
    xAxis:{
        visible:false,
        events: {
                        setExtremes: syncExtremes
                    },
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    legend:{
        enabled:false,
    },
    tooltip: {
        enabled:true,
        crosshairs:true,
        shared:true,
        positioner:function(){
            return{
                x:this.chart.chartWidth - this.label.width,
                y:10
            };
        },
        borderWidth:0,
        backgroundColor:'white',
        pointFormat:'{point.y}',
        headerFormat:'',
        shadow:false,
        formatter:function(){
            //data = this.points[0].series.chart.series[0].data;
            var data = [];
            $.each(this.points, function(i, point){
                var val = point.y;
                data.push(val);
            });
            //data = JSON.stringify(data);
            sender = $("#tooltip_price");
            sender.triggerHandler("change");
            sender.on("change", function(){
                    sender.val(data);
                }).triggerHandler('change');
            idx = this.points[0].x

            return_month = time[idx].toDateString().slice(0,10).slice(4,11);
            return_time = time[idx].toTimeString().slice(0,12);
            return_time_a = return_time.slice(0,5);
            return_time_b = return_time.slice(-3);
            return_time = return_time_a + " "+ return_time_b;
            return_x = return_month+", "+return_time;
            return return_x+' | $'+this.points[0].y.toFixed(2)
        }
    },
};

let temperature = {
    chart:{
        type:'line',
        height:300,
        backgroundColor:"#ece9e6",
        animation:false,
    },
    title:{
        text:'temperature',
        align:"left"
    },
    subtitle:{
        text:'ºF',
        align:'left'
    },
    xAxis:{
        visible:false,
        events: {
                        setExtremes: syncExtremes
                    },
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    legend:{
        enabled:false,
    },
    tooltip: {
        crosshairs:true,
        shared:true,
        positioner:function(){
            return{
                x:this.chart.chartWidth - this.label.width,
                y:10
            };
        },
        borderWidth:0,
        backgroundColor:'white',
        pointFormat:'{point.y}',
        headerFormat:'',
        shadow:false,
        formatter:function(){
            //data = this.points[0].series.chart.series[0].data;
            var data = [];
            $.each(this.points, function(i, point){
                var val = point.y;
                data.push(val);
            });
            idx = this.points[0].x
            return_month = time[idx].toDateString().slice(0,10).slice(4,11);
            return_time = time[idx].toTimeString().slice(0,12);
            return_time_a = return_time.slice(0,5);
            return_time_b = return_time.slice(-3);
            return_time = return_time_a + " "+ return_time_b;
            return_x = return_month+", "+return_time;
            return return_x+' | Av '+this.points[0].y.toFixed()+'ºF'
            }
        },
    };

let pie = {
    chart:{
        type:'pie',
        animation:false,
        backgroundColor:"#ece9e6",
    },
    title:{
        text:''
    },
    tooltip: {
        enabled:false,
    },
    plotOptions: {
        animation:false,
    },

    series: [{}],
};

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function plotStackData() {
    fetchJSONFile('assets/springfield_converted.json', function(data){
        // do something with your data
        time = timeArr(1571579700*1000,1572183000*1000,30);

        var seriesData = data.slice(0,7).map(function(elm) {
            var obj = {};

            var start = new Date(parseInt(elm['history']['start'])*1000);
            var end = new Date(parseInt(elm['history']['last'])*1000);
            var data_interval = parseInt(elm['history']['interval']);
            var date_time = timeArr(start,end,data_interval);

            var data_dict = {};
            date_time.forEach(function(key,i){
                    data_dict[key] = elm['history']['data'][i];
            });

            var t;
            var result = new Array();
            for (t of time){
                result.push(data_dict[t]);
            };

            /*
            if (elm['fuel_tech'] == 'exports' || elm['fuel_tech'] == 'pumps'){
                obj['name'] = elm['fuel_tech'];
                obj['data'] = elm['history']['data'].map(function(el) { return -el; }).slice(0,297);
            } else{
                obj['name'] = elm['fuel_tech'];
                obj['data'] = elm['history']['data'].map(function(el) { return el; }).slice(0,297);
            }
            *////////////////

            obj['data'] = result;
            obj['name'] = elm['fuel_tech'];
            return obj;
        });
        //seriesData = seriesData.slice(0,7);
        seriesData[4]['data'] = seriesData[4]['data'].map(function(el) { return -el; });
        seriesData[6]['data'] = seriesData[6]['data'].map(function(el) { return -el; });
        seriesData.forEach(function(datum,i){
            datum['color'] = colrs[i];
        });
        stack['series'] = seriesData;
        //stack['xAxis']['categories'] = time;
        Highcharts.chart('stack',stack);

    })
}

function plotPriceData() {
    fetchJSONFile('assets/springfield_converted.json', function(data){
        // do something with your data
        var seriesData = {};
        seriesData['name'] = data[8]['type'];
        seriesData['data'] = data[8]['history']['data'];
        seriesData['step'] = true;
        seriesData['color'] = 'red';
        price['series'] = [seriesData];
        Highcharts.chart('price',price);
    })
}

/*
function plotPriceData() {
    fetchJSONFile('springfield_converted.json', function(data){
        // do something with your data
        time = timeArr(1571579700*1000,1572183000*1000,30);

        var start = new Date(parseInt(data[8]['history']['start'])*1000);
        var end = new Date(parseInt(data[8]['history']['last'])*1000);
        var data_interval = parseInt(data[8]['history']['interval']);
        var date_time = timeArr(start+1500,end,data_interval);

        var data_dict = {};
        date_time.forEach(function(key,i){
                data_dict[key] = data[8]['history']['data'][i];
        });

        var t;
        var result = new Array();
        for (t of time){
            result.push(data_dict[t]);
        };


        var seriesData = {};
        seriesData['data'] = result;
        seriesData['name'] = data[8]['type'];
        seriesData['step'] = true;
        seriesData['color'] = 'red';
        price['series'] = [seriesData];
        console.log(data);
        console.log(seriesData);
        Highcharts.chart('price',price);
    })
}

*/


function plotTempData() {
    fetchJSONFile('assets/springfield_converted.json', function(data){
        // do something with your data
        var seriesData = {};
        seriesData['name'] = data[10]['type'];
        seriesData['data'] = data[10]['history']['data'];
        seriesData['color'] = 'red';
        temperature['series'] = [seriesData];
        Highcharts.chart('temperature',temperature);
    })
}

function plotPieData() {
    var listener = $("#tooltip");
    var pie_listener = $("#topie_change");
    var bar_listener = $("#tobar_change");
    var chart = Highcharts.chart('pie',pie);
    var now_type = 'pie';
    listener.change(function(){
        data = listener.val();
        //[black_coal,distillate,gas_ccgt,hydro,pumps,wind,exports,rooftop_solar]
        if (data != "no_data"){
            data = data.split(",").map(Number);
            if (now_type == 'pie'){
                var seriesData = {};
                var sum = 0;
                seriesData['type'] = 'pie';
                seriesData['innerSize'] = '60%';
                seriesData['name'] = 'percentage';
                seriesData['data'] = [];
                $.each(typs,function(i,ty){
                    if (ty == 'pumps' || ty == 'exports'){return;}
                    j = {};
                    j['name'] = ty;
                    j['y'] = data[i];
                    j['color'] = colrs[i];
                    seriesData['data'].push(j);
                    sum = sum + data[i];
                });
                chart.update({
                    chart:{
                        type:'pie',
                        animation:false
                    },
                    title:{
                        text:sum.toFixed()+' MW',
                        align: 'center',
                        verticalAlign: 'middle',
                    },
                    tooltip:{
                        enabled:false,
                    },
                    plotOptions:{
                        animation:false,
                        series:{
                            dataLabels:{
                                enabled:false,
                            }
                        }
                    },
                    series:[seriesData],
                });
            } else if (now_type == 'bar') {
                var seriesData = {};
                seriesData['type'] = 'bar';
                seriesData['data'] = [];
                sum = 0;
                $.each(["black_coal", "distillate", "gas_ccgt", "hydro", "pumps", "wind", "exports"],function(i,ty){
                    if (ty == 'pumps' || ty == 'exports'){return;}
                    j = {};
                    j['name'] = ty;
                    j['y'] = data[i];
                    j['color'] = colrs[i];
                    seriesData['data'].push(j);
                    sum += data[i];
                });
                $.each(seriesData['data'],function(j,d){
                    seriesData['data'][j]['y'] = (seriesData['data'][j]['y'] / sum)*100;
                });

                chart.update({
                    chart:{
                        type:'bar',
                        animation:false
                    },
                    title:{
                        text:'',
                        align: 'center',
                        verticalAlign: 'middle',
                    },
                    xAxis:{
                        categories:['black_coal','distillate','gas_ccgt','hydro','wind'],
                    },
                    tooltip:{
                        enabled:false,
                    },
                    legend:{
                        enabled:false,
                    },
                    plotOptions:{
                        series:{
                            dataLabels:{
                                enabled:true,
                                formatter:function(){return (this.y.toFixed(2)).toString() + ' %'}
                            }
                        }
                    },
                    series:[seriesData]
                });
            } else {
                console.log("not pie nor bar!");
            }
        }
    });
    pie_button = document.getElementById("topie_change");
    bar_button = document.getElementById("tobar_change");

    pie_listener.click(function(){
            now_type = 'pie';
            pie_button.innerHTML = '<i class="fas fa-chart-pie fa-lg"></i>';
            bar_button.innerHTML = '<i class="fas fa-chart-bar fa-lg"></i>'
            pie_button.style.boxShadow = '10px 10px 50px grey inset';
            bar_button.style.boxShadow = '';
            listener.trigger("change");
        });
    bar_listener.click(function(){
            now_type = 'bar';
            pie_button.innerHTML = '<i class="fas fa-chart-pie fa-lg"></i>'
            bar_button.innerHTML = '<i class="fas fa-chart-bar fa-lg"></i>';
            bar_button.style.boxShadow = '10px 10px 50px grey inset';
            pie_button.style.boxShadow = '';
            listener.trigger("change");
        });

}

function fillData(){
    var listener = $("#tooltip");
    var price_listener = $("#tooltip_price");
    listener.change(function(){
        data = listener.val();

        if (data != "no_data"){
            data = data.split(",").map(Number);
            srcs = [data[0],data[1],data[2],data[3],data[5]];
            lods = [data[4],data[6]];
            sum = data.reduce((a,b)=>a+b,0);

            src_sum = srcs.reduce((a,b)=>a+b,0).toFixed();
            lod_sum = lods.reduce((a,b)=>a+b,0).toFixed(2);
            renew_percent_sum = 0;
            $.each(typs,function(i,typ){
                if (data[i] != 0) {
                    $("#"+typ).children()[1].textContent = data[i];
                    perct = ((data[i] / sum)*100).toFixed(2);
                    $("#"+typ).children()[2].textContent = perct.toString()+" %";
                } else {
                    $("#"+typ).children()[1].textContent = '-';
                    $("#"+typ).children()[2].textContent = '-';
                }
                if (typ == 'hydro' || typ == 'wind'){
                    renew_percent_sum += parseFloat(perct);
                }
            });
            renew_percent_sum = renew_percent_sum.toFixed(2).toString() + " %";
            $("#sources").children()[1].textContent = src_sum;
            $("#loads").children()[1].textContent = lod_sum;
            $("#net").children()[1].textContent = parseInt(src_sum) + parseInt(lod_sum);
            $("#renew").children()[2].textContent = renew_percent_sum;
        }
    });

    price_listener.change(function(){
        data = price_listener.val();
        if (data != "no_data"){
            $("#sources").children()[3].textContent = data;
        }
    });
}

function timeArr(start,end,step){
    var result = new Array();
    var time = new Date(start);
    while (time <= end){
        result.push(time);
        time = new Date(time.valueOf() + 1000 * 60 * step);
    }
    return result;
}
