
//#chart2
var RegularBreakdown = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
    	bottom:'20%',
    	left:'20%',
    	orient:'vertical',
        data: []
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '50%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: []
    },
    series: []
};


//#chart3
var projectBreakdown = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
    	bottom:'20%',
    	left:'20%',
    	orient:'vertical',
        data: []
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '50%',
        containLabel: true
    },
    yAxis:  {
        type: 'value'
    },
    xAxis: {
        type: 'category',
        data: []
    },
    series: []
};


//project chart1

var POpetions1 = {
	    title: {
//	        text: 'workload',
//	        top:'50%'
	    },
	    xAxis: {
	        data: [],
	        axisLabel: {
	            textStyle: {
	                color: '#9B9B9B'
	            },
	            rotate:45,
	            interval:0
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
//	            show: false
	        },
	        z: 10
	    },
	    yAxis: {
	    	name:'workload',
	        axisLine: {
//	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#999'
	            }
	        },
	        nameLocation:'middle',
	        nameGap:25,
	        nameTextStyle:{
	        	fontSize:16
	        }
	    },
	    dataZoom: [
	        {
	            type: 'inside'
	        }
	    ],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        formatter:function(params){}
	    },
	    series: [
	        {
	        	name:'workload',
	            type: 'bar',
	            data: [],
	            itemStyle:{
	            	normal:{
	            		color:function(){}
	            	}
	            },
	            markLine : {
            		data : [
            		    {type : 'average', name: '平均值'}
            		],
            		label:{
            			normal:{
            				formatter:"AVG "+"{c}"
            			}
            		}
            	}
	        }
	    ]
	}

//project chart2
var POpetions2 = {
    title: {
//      text: 'invoved employee#',
//	    top:'50%'
    },
    xAxis: {
        data: [],
        axisLabel: {
            textStyle: {
                color: '#9B9B9B'
            },
            rotate:45,
            interval:0
        },
        axisTick: {
            show: false
        },
        axisLine: {
            
        },
        z: 10
    },
    yAxis: {
    	name:'invoved employee#',
        axisLine: {
            
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        },
        nameLocation:'middle',
        nameGap:25,
        nameTextStyle:{
        	fontSize:16
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    series: [
        {
        	name:'workload',
            type: 'bar',
            data: [],
            itemStyle:{
            	normal:{
            		color:function(){}
            	}
            },
            markLine : {
        		data : [
        		    {type : 'average', name: '平均值'}
        		],
        		label:{
        			normal:{
        				formatter:"AVG "+"{c}"
        			}
        		}
        	}
        }
    ]
}

//project scatter

var PScatterOptions = {
//  backgroundColor: '#404a59',
//  color: [
//      '#00B7EE', '#556FB5', '#00A1E9','#0000FF'
//  ],
    legend: {
        y: 'top',
        top:10,
        data: [],
        textStyle: {
//          color: '#fff',
            fontSize: 14
        }
    },
    grid: {
        x: 70,
        x2: 40,
        y: 70,
        y2: 70
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {}
    },
    xAxis: {
        type: 'value',
        name: 'Employee#',
//      nameGap: 16,
        nameTextStyle: {
//          color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
		nameLocation:'middle',
		nameGap:25
    },
    yAxis: {
        type: 'value',
        name: 'Avg working hr / employee',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
//          color: '#fff',
            fontSize: 16
        },
        nameLocation:'middle',
        nameGap:35,
//      axisLine: {
//          lineStyle: {
//              color: '#eee'
//          }
//      },
		splitLine: {
            lineStyle: {
                type: 'dashed'
            }
       	}
    },
//  visualMap: [
//      {
//      	show:false,
//          left: 'right',
//          top: '10%',
//          dimension: 2,
//          min: 0,
//          max: 250,
//          itemWidth: 30,
//          itemHeight: 120,
//          calculable: true,
//          precision: 0.1,
//          text: ['圆形大小：PM2.5'],
//          textGap: 30,
//          textStyle: {
//              color: '#fff'
//          },
//          inRange: {
//              symbolSize: [15, 300]
//          },
//          outOfRange: {
//              symbolSize: [15, 300],
////              color: ['rgba(255,255,255,.2)']
//          }
//      }
//  ],
    series: []
};
//regular RChart1
var ROpetions1 = {
    xAxis: {
        data: [],
        axisLabel: {
        	show:false,
            textStyle: {
                color: '#9B9B9B'
            },
//          rotate:45,
            interval:'auto',
            formatter:function(val){
            	var total = ROpetions1.series[0].data.length;
            	var len = total/4
            	if(val.length>len){
            		val = val.substring(0,len)+'...';
            	}
			    return val;
			}
        },
        axisTick: {
            show: false
        },
        axisLine: {
            
        },
        z: 10
    },
    yAxis: {
    	name:'Workload',
        axisLine: {
//          show:false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
        	show:false,
            textStyle: {
                color: '#999'
            }
        },
        nameLocation:'middle',
        nameGap:15,
        nameTextStyle:{
        	fontSize:14
        }
    },
    grid: {
        x: '5%',
        x2: '5%',
        y: '5%',
        y2: '1%'
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    label:{ 
		normal:{ 
			show: true, 
			position: 'top'
		}
	},
    series: [
        {
        	name:'workload',
            type: 'bar',
            data: [],
            itemStyle:{
            	normal:{
            		color:'#00B7EE'
            	}
            },
//          markLine : {
//      		data : [
//      		    {type : 'average', name: '平均值'}
//      		],
//      		label:{
//      			normal:{
//      				formatter:"AVG "+"{c}"
//      			}
//      		}
//      	}
        }
    ]
}	
//Rchart2
var ROpetions2 = {
    xAxis: {
        data: [],
        axisLabel: {
            textStyle: {
                color: '#9B9B9B'
            },
//          rotate:45,
            interval:0,
            showMaxLabel:true,
            formatter:function(val,a){
            	var result = val.substring(0,3)+'...';
			    return result;
			}
        },
        axisTick: {
            show: false
        },
        axisLine: {
            
        },
        z: 10
    },
    yAxis: {
    	name:'Employee',
        axisLine: {
//          show:false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
        	show:false,
            textStyle: {
                color: '#999',
            },
            formatter: '{value} %',
        },
        nameLocation:'middle',
        nameGap:15,
        nameTextStyle:{
        	fontSize:14
        },
    },
    grid: {
        x: '5%',
        x2: '5%',
        y: '5%',
        y2: '30%'
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    label:{ 
		normal:{ 
			show: true, 
			position: 'top'
		}
	},
    series: [
        {
        	name:'workload',
            type: 'bar',
            data: [],
            itemStyle:{
            	normal:{
            		color:'#00B7EE'
            	}
            },
//          markLine : {
//      		data : [
//      		    {type : 'average', name: '平均值'}
//      		],
//      		label:{
//      			normal:{
//      				formatter:"AVG "+"{c}"
//      			}
//      		}
//      	}
        }
    ]
}	

var PPieOptions1 = {
	title : {
        text: '',
        x:'center',
        textStyle:{
        	fontSize:12
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        left: 'center',
        top:'20',
        data: []
    },
// 	yAxis:{
// 		axisTick:{
// 			show:true
// 		}
// 	},
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
                normal : {
					label : {
					position : 'inner',
					formatter : function (params){return (params.percent - 0) + '%';},
						textStyle: {
					        color: '#000'
					}
					},
					labelLine : {
						show : false
					}
				}
            }
        }
    ],
//  color:['#00B7EE','#556FB5','#ddd','#6493CE','#9EC5EC']
}

//
var IndiGcoBar = {
//	color:['#49aec0','#db577a','#fff0cf','#fe5a27','#3d5cff'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
    	top:5,
    	orient:'horizontal',
        data: [],
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    grid: {
        x: '5%',
        x2: '5%',
        y: '20%',
        y2: '5%',
        containLabel: true
    },
    yAxis:  {
        type: 'value'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLabel:{
        	rotate:0,
//      	formatter:function(item){
//				var isTrue = 0
//	        	if(item){
//	        		isTrue = item.indexOf(' ');
//	        	}
//	        },
//	        	return (isTrue>0)?(item.replace(' ','\n')):item
        }
    },
    series: []
};

//笛卡尔

var data = [[0,0,5],[1,4,5],[2,4,3],[1,2,3]];
data = data.map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});

var heatMapOption = {
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
       	x:30,
       	x2:70,
        y: 120,
        y2:100
    },
    xAxis: {
        type: 'category',
        data: [],
        splitArea: {
            show: true
        },
        axisLabel:{
        	rotate:45,
        	interval:0
        }
    },
    yAxis: {
        type: 'category',
        data: [],
        splitArea: {
            show: true
        },
        position:'right'
    },
    visualMap: {
        min:0,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 50,
        color:['#0d47a1','#bbdefb']
        
    },
    dataZoom: [
        {
            type: 'inside',
            orient:'vertical'
        }
    ],
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: [],
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};
