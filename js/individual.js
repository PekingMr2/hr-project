//80行

function skipIndividual(){
	$('.individualLink').parent('li').addClass('active');
	var individualHtml = '	<div class="individualTag clearfix">														'
						+'		<div class="line clearfix clientHeight2">													'
						+'			<div class="fl section relative">												'
						+'				<div class="title tSpecial">GCO China：Top 20% Individual Workload breakdown</div>											'
						+'				<div class="IChart1 w100"></div>											'
						+'			</div>												'
						+'			<div class="fr section relative">												'
						+'				<div class="title tSpecial">GCO China：Bottom 20% Individual Workload breakdown</div>								'
						+'				<div class="IChart2 w100"></div>								'
						+'			</div>										'
						+'		</div>											'
						
						+'		<div class="line lineTeam">													'
						+'			<div class="sectionTeam relative">												'
						+'				<div class="title">GCO China：</div>											'
						+'				<div class="IChart1 w100"></div>											'
						+'			</div>												'
						+'		</div>											'
						
						+'	</div>	';
						
	$('.content').html(individualHtml)
	
//	setHeight('height',$('.content .individualTag .line .section'),$('.content .individualTag .line .section'),3/5,0);
	$('.content .clientHeight1').css('height',cHeight+'px');	
	$('.content .clientHeight2').css('height',cHeight2+'px');	
	
	if(saveLocal){
		var ED = [];
		if(saveSession){
			ED = JSON.parse(saveSession);
		}else{
			ED = JSON.parse(saveLocal);	
		}
		
		///////////////////////////////////////////////////////////////////
		//新增
		//所有数据 按名字分组 并去重
		var NameData = _.pluck(ED.excelAll,ED.EmployeeNO);
		NameData = _.uniq(NameData,false);
//		var chineseName = [];
//		for(var i=0;i<NameData.length;i++){
//			for(var j=0;j<ED.excelAll.length;j++){
//				if(ED.excelAll[j][ED.EmployeeNO]==NameData[i]){
//					chineseName.push(ED.excelAll[j][ED.Name]);
//					break;
//				}
//			}
//		}
//		console.log(chineseName)
		//worktype
//		var worktypeData1 = _.pluck(ED.excelTag1,ED.WorkType);
//		worktypeData1 = _.uniq(worktypeData1,false);
//		var worktypeData2 = _.pluck(ED.excelTag2,ED.ProjectType);
//		worktypeData2 = _.uniq(worktypeData2,false);

		var serviceTypeData1 = _.pluck(ED.excelTag1,ED.ServiceType);
		serviceTypeData1 = _.uniq(serviceTypeData1,false);
		var STData2 = _.map(ED.excelTag2,function(item){
			item['Service Type'] = 'Project';
			return item
		})
		serviceTypeData2 = ['Project'];
		
		//所传数据的所有月份
		var TotalTime = _.pluck(ED.excelAll,ED.Month);
		TotalTime = _.uniq(TotalTime,false);
		TotalTime = _.sortBy(TotalTime,function(time){
			time = new Date(time).getTime();
			return time
		})
		//所选数据的月份数
//		var AllSelMonth = monthDiff(new Date(TotalTime[0]),new Date(TotalTime[TotalTime.length-1]))
		var AllSelMonth = monthDiff(getDateForStringDate(TotalTime[0]),getDateForStringDate(TotalTime[TotalTime.length-1]))
		
		//合并regular和project的worktype
		var serviceTypeData = serviceTypeData1.concat(serviceTypeData2);
//		serviceTypeData = sortTopOrBottomByClient(serviceTypeData);
		var excelAll = ED.excelTag1.concat(STData2);
		
		var NameAndUniqData = _.map(NameData,function(item){
			var EachNameData = _.filter(excelAll,function(en){
				return en[ED.EmployeeNO] == item
			})
//			console.log(EachNameData)
			var EachNameNum = _.pluck(EachNameData,ED.PchartValue);
			EachNameNum= _.reduce(EachNameNum,function(memo,num){
				return parseFloat(((memo ?parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
			})
			return {
				name:EachNameData[0][ED.Name],
				data:EachNameData,
				total:EachNameNum
			}
		})
		var sortData = _.sortBy(NameAndUniqData,function(item){
			return -item.total
		});
		var topData = _.first(sortData,20);
		var bottomData = _.last(sortData,20);
		
		var topName = [];
		var bottomName = [];
		
		var TopData = _.map(serviceTypeData,function(item){
			var allTopData = _.map(topData,function(obj){
				var TopChartData = _.filter(obj.data,function(topParam){
//					return (item == topParam[ED.WorkType])||(item == topParam[ED.ProjectType]);
					return item == topParam[ED.ServiceType];
				})
				TopChartData = _.pluck(TopChartData,ED.PchartValue);
				TopChartData = _.reduce(TopChartData,function(memo,num){
					return parseFloat(((memo ?parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
				})
				if(topName.length<topData.length){
					topName.push(obj.name)
				}
				return TopChartData||0
			})
			var topRatio = _.map(allTopData,function(item,i){
				return parseFloat((parseFloat(item)/topData[i].total*100).toFixed(1))||0
			})
			return {
				ratio:topRatio,
				name:item,
				data:allTopData,
				xTotal:topData,
				type: 'bar',
	            stack: '总量',
	            barMaxWidth:'60%',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside',
	                    formatter:function(ab){
	                    	return topRatio[ab.dataIndex]?(topRatio[ab.dataIndex]+'%'):''
	                    }
	                }
	            }
			}
		})
		var TopXTotalData = _.map(topData,function(item){
			return parseFloat(item.total)
		})
		TopData.push(
			{
				name:'Total',
				data:TopXTotalData,
				type: 'line',
//		        stack: '总量',
//		        showSymbol:false,
				symbolSize:1,
				hoverAnimation:false,
		        label: {
		            normal: {
		                show: true,
	                    position: 'top',
						textStyle: {
					        color: '#000'
						},
		            }
		        },
		        lineStyle:{
		        	normal:{
		        		opacity:0
		        	}
		        }
			}
		)
		var maxNum = parseInt(topData[0].total+topData[0].total/10);
		TopAndBottomBarChart(TopData,topName,serviceTypeData,'IChart1',maxNum);
		var BottomData = _.map(serviceTypeData,function(item){
			var allBottomData = _.map(bottomData,function(obj){
				var BottomChartData = _.filter(obj.data,function(bottomParam){
//					return (item == bottomParam[ED.WorkType])||(item == bottomParam[ED.ProjectType]);
					return item == bottomParam[ED.ServiceType];
				})
				BottomChartData = _.pluck(BottomChartData,ED.PchartValue);
				BottomChartData = _.reduce(BottomChartData,function(memo,num){
					return parseFloat(((memo ?parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
				})
				if(bottomName.length<bottomData.length){
					bottomName.push(obj.name)
				}
				return BottomChartData||0
			})
			var bottomRatio = _.map(allBottomData,function(item,i){
				return parseFloat((parseFloat(item)/bottomData[i].total*100).toFixed(1))||0
			})
			return {
				ratio:bottomRatio,
				name:item,
				data:allBottomData,
//				xTotal:bottomData,
				type: 'bar',
				barMaxWidth:'60%',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside',
	                    formatter:function(ab){
	                    	return bottomRatio[ab.dataIndex]?(bottomRatio[ab.dataIndex]+'%'):''
	                    }
	                }
	            }
			}
		})
		var BottomXTotalData = _.map(bottomData,function(item){
			return parseFloat(item.total)
		})
		BottomData.push(
			{
				name:'Total',
				data:BottomXTotalData,
				type: 'line',
//		        stack: '总量',
//		        showSymbol:false,
				symbolSize:1,
				hoverAnimation:false,
		        label: {
		            normal: {
		                show: true,
	                    position: 'top',
						textStyle: {
					        color: '#000'
						},
		            }
		        },
		        lineStyle:{
		        	normal:{
		        		opacity:0
		        	}
		        }
			}
		)
		TopAndBottomBarChart(BottomData,bottomName,serviceTypeData,'IChart2',maxNum);
		
		
		
		//3,4,5图
		var teamGroup = _.pluck(excelAll,ED.Team);
		teamGroup = _.uniq(teamGroup,false);
		$('.lineTeam').html('');
		var teamData = _.map(teamGroup,function(team){
			var eachTeamData = _.filter(excelAll,function(item){
				return item[ED.Team] == team
			})
			
			var className = 'IChart'+team;
			$('.lineTeam').append(
				 '			<div class="sectionTeam relative clientHeight1">			'
				+'				<div class="title">'+ team +': Individual FTE utilization</div>			'
				+'				<div class="w100 IChart '+ className +'"></div>		'
				+'			</div>		'
			)
			
//			setHeight('height',$('.content .individualTag .line .sectionTeam'),$('.content .individualTag .line .sectionTeam'),1/4,0);
			$('.content .individualTag .line .clientHeight1').css('height',cHeight+'px');
			
			var NameData = _.pluck(eachTeamData,ED.EmployeeNO);
			NameData = _.uniq(NameData,false);
			
			var xAxisData = [];
			
			var NameAndUniqData2 = _.map(NameData,function(item){
				var EachNameData = _.filter(eachTeamData,function(en){
					return en[ED.EmployeeNO] == item
				})
	//			console.log(EachNameData)
				var EachNameNum = _.pluck(EachNameData,ED.PchartValue);
				EachNameNum= _.reduce(EachNameNum,function(memo,num){
					return parseFloat(((memo ?parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
				})
				return {
					name:EachNameData[0][ED.Name],
					data:EachNameData,
					total:EachNameNum,
					totalFTE:EachNameNum/(8*21.5*AllSelMonth),
				}
			})
			var sortData = _.sortBy(NameAndUniqData2,function(item){
				return -item.totalFTE
			});
			var TData = _.map(serviceTypeData,function(item,index){
				var allTopData = _.map(sortData,function(obj){
					var TopChartData = _.filter(obj.data,function(topParam){
//						return (item == topParam[ED.WorkType])||(item == topParam[ED.ProjectType]);
						return item == topParam[ED.ServiceType];
					})
					TopChartData = _.pluck(TopChartData,ED.PchartValue);
					TopChartData = _.reduce(TopChartData,function(memo,num){
						return parseFloat(((memo ?parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
					})
					
					if(xAxisData.length<sortData.length){
						xAxisData.push(obj.name)
					}
					var reData = TopChartData/(8*21.5*AllSelMonth);
					return TopChartData?((    (reData>1)?(reData.toFixed(3)):(reData.toFixed(5))         )||0):0
				})
				var xTotalData = [];
				var topRatio = _.map(allTopData,function(item,i){
					xTotalData.push((sortData[i].totalFTE>1)?(sortData[i].totalFTE.toFixed(3)):(sortData[i].totalFTE.toFixed(5)));
					
					return parseFloat((parseFloat(item)/sortData[i].totalFTE*100).toFixed(1))||0
				})
				return {
					ratio:topRatio,
					name:item,
					xTotal:xTotalData,
					data:allTopData,
					type: 'bar',
		            stack: '总量',
		            barMaxWidth:'60%',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'inside',
		                    formatter:function(ab){
		                    	return topRatio[ab.dataIndex]?(topRatio[ab.dataIndex]+'%'):''
		                    }
		                }
		            }
				}
			})
			if(TData.length>0){
				TData.push(
					{
						name:'Total',
						data:TData[0].xTotal,
						type: 'line',
		//		        stack: '总量',
		//		        showSymbol:false,
						symbolSize:1,
						hoverAnimation:false,
				        label: {
				            normal: {
				                show: true,
			                    position: 'top',
								textStyle: {
							        color: '#000'
								},
				            }
				        },
				        lineStyle:{
				        	normal:{
				        		opacity:0
				        	}
				        }
					}
				)
			}
			TopAndBottomBarChart(TData,xAxisData,serviceTypeData,className);
		})
	}else{
		layer.alert('请上传表格');
	}
}

function TopAndBottomBarChart(seriesData,xAxisData,legendData,c,maxNum){
	var chart = echarts.init(document.getElementsByClassName(c)[0], "macarons");
	var option = {
			tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	    	top:10,
	        data: legendData
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '7%',
	        top:90,
	        containLabel: true
	    },
	    dataZoom: [
	        {
	            type: 'inside'
	        }
	    ],
	    yAxis:  {
	        type: 'value',
	        max:maxNum||null
	    },
	    xAxis: {
	        type: 'category',
	        data: xAxisData,
	        axisLabel:{
	        	rotate:30,
	        	interval:0,
	        	fontSize:10
	        }
	    },
	    series: seriesData
	}
	chart.setOption(option);
}
