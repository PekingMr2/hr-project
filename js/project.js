//106 253 304行 取消注释 后 排序


function skipProject(){
	$('.projectLink').parent('li').addClass('active');
	var projectHtml = 
						 '	<div class="projectTag clearfix">											'
						+'		<div class="line clearfix clientHeight2" style="margin-bottom:1%;">									'
						+'			<div class="fl l_right B1">								'
//						+'				<div class="leftBox relative">							'
						+'					<div class="title">GCO China： Project work type</div>						'
						+'					<div class="chartB PChart1"></div>						'
//						+'				</div>							'
						+'			</div>								'
						+'			<div class="fr l_left B2">								'
						+'				<div class="title">Team：  Project work type</div>							'
						+'				<div class="chartB PChart2 w100 clearfix">'
//						+'					<div class="fl sectionChart"></div>'
//						+'					<div class="fl sectionChart"></div>'
//						+'					<div class="fl sectionChart"></div>'
						+'				</div>							'
						+'			</div>								'
						+'		</div>	'
						+'	 <div class="clientHeight1">'
						+'		<div class="fl c_left">										'
						+'			<div class="leftBox relative">									'
						+'				<div class="title">Project: workload (hr)</div>								'
						+'				<div class="project workload" style="width:100%;"></div>								'
						+'				<div class="barTitle">								'
						+'					<ul class="clearfix">							'
//						+'						<li class="fl">						'
//						+'							<span class="colorBlock cb1"></span>					'
//						+'							<span>BG</span>					'
//						+'						</li>						'
//						+'						<li class="fl">						'
//						+'							<span class="colorBlock cb2"></span>					'
//						+'							<span>Cross-BG</span>					'
//						+'						</li>						'
//						+'						<li class="fl">						'
//						+'							<span class="colorBlock cb3"></span>					'
//						+'							<span>GCO internal</span>					'
//						+'						</li>						'
//						+'						<li class="fl">						'
//						+'							<span class="colorBlock cb4"></span>					'
//						+'							<span>Global</span>					'
//						+'						</li>						'
						+'					</ul>							'
						+'				</div>								'
						+'			</div>									'
						+'			<div class="leftBox relative">									'
						+'				<div class="title">Project: employee invovled</div>								'
						+'				<div class="project invovled" style="width:100%;"></div>								'
						+'				<div class="barTitle">								'
						+'					<ul class="clearfix">							'
						+'						<li class="fl">						'
						+'							<span class="colorBlock cb1"></span>					'
						+'							<span>BG</span>					'
						+'						</li>						'
						+'						<li class="fl">						'
						+'							<span class="colorBlock cb2"></span>					'
						+'							<span>Cross-BG</span>					'
						+'						</li>						'
						+'						<li class="fl">						'
						+'							<span class="colorBlock cb3"></span>					'
						+'							<span>GCO internal</span>					'
						+'						</li>						'
						+'						<li class="fl">						'
						+'							<span class="colorBlock cb4"></span>					'
						+'							<span>Global</span>					'
						+'						</li>						'
						+'					</ul>							'
						+'				</div>								'
						+'			</div>									'
						+'		</div>										'
						+'		<div class="fr c_right relative">										'
						+'			<div class="title tSpecial">Project distibution map: complexity vs people involved</div>									'
						+'			<div class="ScaChart"></div>									'
						+'		</div>										'
						+'	 </div>											'
						+'	</div>'

	
	
	
	$('.content').html(projectHtml)
	
		$('.content .clientHeight1').css('height',cHeight+'px');
		$('.content .clientHeight2').css('height',cHeight2+'px');
//		setHeight('height',$('.content .projectTag .chartB'),$('.content .projectTag .chartB'),5/5,0);
//		setHeight('height',$('.content .projectTag .c_right'),$('.content .projectTag .c_right'),1,0);
//		$('.content .projectTag .c_left').css('height',$('.content .projectTag .c_right').height())
		//project chart1
		if(saveLocal){
			var ED = [];
			if(saveSession){
				ED = JSON.parse(saveSession);
			}else{
				ED = JSON.parse(saveLocal);	
			}
		
			//////////////////////////////////////////////////
			//新增
			var TotalProjectwidth = _.pluck(ED.excelTag2,ED.Projectwidth);
			TotalProjectwidth = _.uniq(TotalProjectwidth,false);
			$('.barTitle ul').html('')
			TotalProjectwidth = sortArrByClient(TotalProjectwidth);
			TotalProjectwidth.forEach(function(item,i){
				$('.barTitle ul').append(
					 '	<li class="fl">						'
					+'		<span class="colorBlock" style="background:'+ ED.PchartColor[i] +';"></span>					'
					+'		<span>'+ item +'</span>					'
					+'	</li>						'
				);
				PScatterOptions.series.push(
					{
			            name: item,
			            type: 'scatter',
			            itemStyle: {
						    normal: {
//						        opacity: 0.8,
//						        shadowBlur: 2,
//						        shadowOffsetX: 0,
//						        shadowOffsetY: 0,
//						        shadowColor: 'rgba(0, 0, 0, 0.5)',
//						        borderColor:'#222'
						    }
						},
						symbolSize: function (data) {
				            return Math.sqrt(data[2])+10;
					    },
			            data: []
			        }
				)
			})
			PScatterOptions.legend.data = TotalProjectwidth;
			////////////////project chart1柱状图///////////////////////
			var thatPchartData = fileImport.mergeObj(clone(ED.excelTag2),ED.PchartValue,ED.PchartAxis).sort(fileImport.objSort(ED.PchartValue));
			var thatPchartData2 = fileImport.mergeObj(clone(ED.excelTag2),ED.PchartValue,ED.EmployeeNO).sort(fileImport.objSort(ED.PchartValue));
			var PNumArr =[];//employee 数量
			var pEmp2 = clone(ED.excelTag2);
			for(var pNum=0;pNum<thatPchartData.length;pNum++){
				var EmpArr= [];
				
				for(var ar=0;ar<pEmp2.length;ar++){
					if(thatPchartData[pNum][ED.PchartAxis]==pEmp2[ar][ED.ProjectNO]){
						EmpArr.push(pEmp2[ar][ED.EmployeeNO]);	
					}
				}
				PNumArr.push(EmpArr.unique3().length);
			}
			var pcData = clone(thatPchartData);
//			var pct = ED.PWorkloadC;//chart1,2颜色数组
			var myPC1 = echarts.init(document.getElementsByClassName('workload')[0], "macarons");
			var myPC2 = echarts.init(document.getElementsByClassName('invovled')[0], "macarons");
			var myPC3 = echarts.init(document.getElementsByClassName('ScaChart')[0], "macarons");//project scatter
			if(pcData&&pcData.length>0){
				POpetions1.series[0].data = [];
				POpetions2.series[0].data = [];
				POpetions1.xAxis.data = [];
				var PchartColor = [];
				for(var i=0;i<pcData.length;i++){
					POpetions1.xAxis.data.push(pcData[i][ED.PchartAxis]);
					POpetions1.series[0].data.push(pcData[i][ED.PchartValue]);//chart1 value
					POpetions2.series[0].data.push(PNumArr[i]);//chart2 value
					//设置chart1,2各个柱状颜色
					var clonePcData = clone(thatPchartData);
					for(var j=0;j<TotalProjectwidth.length;j++){
						if(pcData[i][ED.Projectwidth] == TotalProjectwidth[j]){
							PchartColor.push(ED.PchartColor[j]);
						}
						
					}
					
					var PSData = [];
					
					TotalProjectwidth.forEach(function(item,j){
						if(clonePcData[i][ED.Projectwidth]==item){
//							var bgarr = [];
//							bgarr.push(clonePcData[i].empNum);
//							bgarr.push((clonePcData[i][ED.PchartValue]/clonePcData[i].empNum).toFixed(2));
//							bgarr.push(PNumArr[i]);
//							bgarr.push(clonePcData[i][ED.ProjectNO]);
//							bgarr.push(clonePcData[i].empNum);
//							bgarr.push(clonePcData[i][ED.ProductName]);
//console.log(PNumArr[i])
							var bgarr = [
								clonePcData[i].empNum,
								(clonePcData[i][ED.PchartValue]/clonePcData[i].empNum).toFixed(2),
								clonePcData[i][ED.PchartValue],
								clonePcData[i][ED.ProjectNO],
								clonePcData[i][ED.PchartValue],
								clonePcData[i][ED.ProductName]
							]
							PScatterOptions.series[j].data.push(bgarr);
						}
					})
					
				}
				POpetions1.label = POpetions2.label = {
					normal:{
						show:true,
						position:'top',
						formatter:"{c}"
					}
				}
				POpetions1.series[0].itemStyle.normal.color = POpetions2.series[0].itemStyle.normal.color = function(params){
					var colorArr = PchartColor;
					return colorArr[params.dataIndex];
				}
				POpetions1.tooltip.formatter = function(params){
					 return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                + pcData[params[0].dataIndex][ED.ProductName] + '</div>'
			                + 'NO : '+ pcData[params[0].dataIndex][ED.ProjectNO] + '<br>'
			                + 'Workload : ' + pcData[params[0].dataIndex][ED.PchartValue] + '<br>'
			                + 'Projectwidth : ' + pcData[params[0].dataIndex][ED.Projectwidth] + '<br>'
				}
				POpetions2.xAxis.data = POpetions1.xAxis.data;
				POpetions2.tooltip.formatter = function(params){
					 return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                + pcData[params[0].dataIndex][ED.ProductName] + '</div>'
			                + 'NO : '+ pcData[params[0].dataIndex][ED.ProjectNO] + '<br>'
			                + 'Employee : ' + PNumArr[params[0].dataIndex] + '<br>'
			                + 'Projectwidth : ' + pcData[params[0].dataIndex][ED.Projectwidth] + '<br>'
				}
				PScatterOptions.tooltip.formatter = function(params){
					return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                + params['data'][5] + '</div>'
			                + 'NO : '+ params['data'][3] + '<br>'
			                + 'Avg : '+ params['data'][1] + '<br>'
			                + 'Employee : ' + params['data'][0] + '<br>'
			                + 'Workload : ' + params['data'][4] + '<br>'
			                + 'Projectwidth : ' + params.seriesName + '<br>'
				}
				//把颜色data插入到图表中
				POpetions2.grid = POpetions1.grid={
					top:60,
					bottom:40,
					left:80,
					right:80
				};
//				console.log(PScatterOptions)
				POpetions1.yAxis.nameGap = 60
				POpetions2.yAxis.nameGap = 60
				myPC1.setOption(POpetions1);//POpetions1
				myPC2.setOption(POpetions2);//POpetions2
				myPC3.setOption(PScatterOptions);//POpetions3
			}
			
			/////////////////////////////////////////////////////////////////
			//新增
			var PC1 = getBarChartData(ED.excelTag2,false,ED.ProjectType,ED.Projectwidth,ED.EmployeeNO,ED.PchartValue,'Project')//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项,计算求和项
			var PChartData1 = getGCOData(PC1);
			PChartData1 = sortObjectByClient(PChartData1);
			DrawOVBar(PChartData1,'PChart1',IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':5,'orient':'horizontal','reg':'true'},'trigger':'xAxis','grid':{x:50,x2:20,y:80,y2:70},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':0,'reg':'true'}});

			var PC2 = getBarChartData2(ED.excelTag2,ED.Team,ED.ProjectType,ED.Projectwidth,ED.EmployeeNO,ED.PchartValue,'Project')
			
			
			/////////////////////////////////////////////////////////////////
			
		}else{
			layer.alert('请上传表格');
		}
}
//getBarChartData(clone(ED.excelTag1),groupChart,xAxisParam,legendData,uniqItem，sumParam,Pro)//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项，计算就和项,Pro仅适用于excel tab project
function getBarChartData2(param1,groupChart,xAxisParam,legendData,uniqItem,sumParam,Pro){
	var d = param1;
	var xAxis = _.pluck(d, xAxisParam)
	xAxis = _.uniq(xAxis, false)
	xAxis = _.sortBy(xAxis,function(item){
		return item
	})
	var teamList = _.pluck(d, groupChart)
	teamList = _.uniq(teamList, false)
	
	$('.content .projectTag .PChart2').html('');
	
	var teamAndChildrenList = _.map(teamList, function(team,index){
		var children = [];
		var childrenAndData = _.filter(d, function(item){
			return item[groupChart] == team
		})
		var PClass = 'PChart'+team;
		
		$('.content .projectTag .PChart2').append(
			'<div class="fl sectionChart '+ PClass +'"></div>'
		)
		
		$('.B1').css('height',$('.B2').height());
		
		//每个横坐标总的数据
		var xAxisTotal = _.map(xAxis,function(x){
			var xData = _.filter(childrenAndData,function(cad){
				return cad[xAxisParam] == x
			})
			xData = _.pluck(xData,sumParam)
			return _.reduce(xData,function(memo,num){
				return parseFloat(((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
			})
		})
		////////////
		children = _.pluck(childrenAndData, legendData)
		children = _.uniq(children, false)
		children = sortArrByClient(children);
		children = _.map(children, function(c){
			var childData = _.filter(childrenAndData, function(cd){ 
				return cd[legendData] == c
			})
			
			var stat = _.map(xAxis, function(xItem){
				var xData = _.filter(childData, function(d){
					return d[xAxisParam] == xItem;
				})
//				var countData = _.uniq(xData, false, function(x){
//					return x[uniqItem]
//				})
				

				var sumData = _.pluck(xData, sumParam)
				//console.log(sumData)
				var sum = _.reduce(sumData, function(memo, num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				});
				
				//console.log('-------------', c, '--', xItem, countData.length, sum||0, xData)
				return {
//						time:xItem,
//					count: countData.length,
					sum: parseFloat((parseFloat(sum  || 0)).toFixed(1))
				}
			})
			var sumData = _.pluck(stat, 'sum');
			var ratio = _.map(xAxisTotal,function(a,b){
				return (sumData[b]/a*100)?((sumData[b]/a*100).toFixed(1)+'%'):''
			})
			return {
				name: c||Pro,
				//data: childData,
//				stat: stat,
//				count: _.pluck(stat, 'count'),
				sum:sumData,
				ratio:ratio,
				xTotal:xAxisTotal,
				xAxis:xAxis,
			}
		})
		var PCData = getGCOData(children);
		DrawOVBar(PCData,PClass,IndiGcoBar,{'tooltip':'false','legend':{'show':true,'left':'center','top':10,'orient':'horizontal'},'trigger':'xAxis','grid':{x:45,x2:5,y:30,y2:75},'nm':{'xname':team,'xnameGap':50,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':0,'reg':'true'}});
//		return {
//			name: team,
//			children: children,
//			
//		}
	})
//	return teamAndChildrenList
}















