var teamGroupData3 = [];

function skipRegular(){
	$('.regularLink').parent('li').addClass('active');
	var regularHtml = 	 '	<div class="regularTag">										'
						+'		<div class="line clearfix clientHeight2">									'
						+'			<div class="fl l_right1">								'
//						+'				<div class="leftBox relative">							'
						+'					<div class="title">GCO China:Regular work Top ranking</div>						'
						+'					<div class="chartB RChart1"></div>						'
//						+'				</div>							'
						+'			</div>								'
						+'			<div class="fr l_left1">								'
						+'				<div class="title">GCO China:Regular work service type trend</div>							'
						+'				<div class="chartB RChart2 w100"></div>							'
						+'			</div>								'
						+'		</div>	'
						
						
						+'		<div class="GCO-Team">'
						+'			<div class="line line2 clearfix clientHeight1">									'
						+'				<div class="fl l_left">								'
						+'					<div class="title">Training workload & employee</div>						'
						+'					<div class="training chartB w100 RChart3"></div>						'
						+'				</div>								'
						+'				<div class="fl l_center">								'
						+'					<div class="title">Top Item breakdown</div>							'
						+'					<div class="trainingTop chartB w100 RChart4"></div>							'
						+'				</div>								'
						+'				<div class="fl l_right">								'
						+'					<div class="title">Top Item breakdown</div>							'
						+'					<div class="trainingTop chartB w100 RChart5"></div>							'
						+'				</div>								'
						+'			</div>									'
						+'		</div>										'
						
						
						+'		<div class="groupChart3">'
						+'			<div class="line clearfix">									'
						+'				<div class="l_all">								'
						+'					<div class="title">Training workload & employee</div>						'
						+'					<div class="training chartB w100 RChart3"></div>						'
						+'				</div>								'
						+'			</div>									'
						+'		</div>										'
						
						
						+'	</div>';
						
	
	
	
	
	$('.content').html(regularHtml)
//	setHeight('height',$('.content .regularTag .line .chartB'),$('.content .regularTag .line .l_right'),4/5,0);
	$('.content .clientHeight1').css('height',cHeight+'px');
	$('.content .clientHeight2').css('height',cHeight2+'px');
		
	if(saveLocal){
		
		var ED = [];
		if(saveSession){
			ED = JSON.parse(saveSession);
		}else{
			ED = JSON.parse(saveLocal);	
		}
		
		//////////////////////////////////////////////////////////////////////////
		//新增
		var RD1 = getSingleBarChartData(ED.excelTag1,false,'workload',ED.ServiceType,ED.EmployeeNO,ED.PchartValue)//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项,计算求和项
		var GCORData1 = getGCOData(RD1.children);
		//排序
		GCORData1 = sortData(GCORData1);
//		console.log(GCORData1)
		DrawOVBar(GCORData1,'RChart1',IndiGcoBar,{'tooltip':'false','legend':{'left':'10','top':'middle','orient':'vertical'},'trigger':'xAxis','grid':{x:220,x2:60,y:40,y2:40},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}}});
		var RD2 = getMoreBarChartData(ED.excelTag1,false,ED.Month,ED.ServiceType,ED.EmployeeNO,ED.PchartValue,ED.Stand,ED.StandY);
		var GCORData2 = getBLGCOLessData(RD2);
		//排序
		GCORData2 = sortData(GCORData2);
		
		DrawOVBar(GCORData2,'RChart2',IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:100,y2:40},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'interval':'auto'}});

		//三组图 9个
		var RD3 = getMoreBarChartData(ED.excelTag1,ED.Team,ED.Month,ED.ServiceType,ED.EmployeeNO,ED.PchartValue,ED.Stand,ED.StandY,ED.ServiceType,ED.ServiceTypeShow,ED.ServiceItem);
		
		//第三组图
		teamGroupData3 = teamChart3(ED.excelTag1,ED.ServiceItem,ED.Team,ED.TeamChildren,ED.EmployeeNO,ED.PchartValue,'false');
			
	}else{
		layer.alert('请上传表格');
	}
}

//////排序
function sortData(data){
	var sortList = ['business service','project','business meeting','travel','management','GCO meeting'];
	var result = [];
//	console.log(data)
	var emptyItem = [];
	var hasItem = [];
	for(var sl=0;sl<sortList.length;sl++){		
		for(var tt=0;tt<data.length;tt++){
			var contrast = data[tt].name.toLowerCase().replace(/\s/g,'');
			if(contrast == sortList[sl].toLowerCase().replace(/\s/g,'')){
				hasItem.push(data[tt]);
//				break;
			}else{
				emptyItem.push(data[tt]);
			}
		}
	}
	result = hasItem.concat(emptyItem);
	result = _.uniq(result,false);
	//////排序结束
	return result;
}


function teamChart3(dataParams,ServiceItem,Team,TeamChildren,EmployeeNO,PchartValue,CChartIndex){
	var d = dataParams;
	var teamList = _.pluck(d, Team)
	teamList = _.uniq(teamList, false)

	$('.groupChart3').html('')
	var teamAndChildrenList = _.map(teamList, function(team,teamIndex){
		
		var children = [];
		var childrenAndData = _.filter(d, function(item){
			return item[Team] == team
		})
		
		
		//////////////
		var xAxis = _.pluck(childrenAndData, ServiceItem)
		xAxis = _.uniq(xAxis,false)
//		xAxis = _.uniq(xAxis,function(item){
//			return item.replace(' ','').toLowerCase();
//		})
		
		xAxis = _.uniq(xAxis,function(item){
			return item.replace(/\s/g,'').toLowerCase();
		})
//		xAxis = xAxis.unique4();
//		console.log(xAxis)
		//////////////
		var teamTotalNum = _.map(xAxis,function(item){
			var sData = _.filter(childrenAndData,function(s){
				return s[ServiceItem].replace(/\s/g,'').toLowerCase() == item.replace(/\s/g,'').toLowerCase();
			})
			sDataCount = _.pluck(sData,EmployeeNO)
			sDataCount = _.uniq(sDataCount,false);
			sDataCount = sDataCount.length;
//			console.log(sDataCount)
			sDataSum = _.pluck(sData,PchartValue)
			sDataSum = _.reduce(sDataSum,function(memo,sum){
				return (memo?parseFloat(memo):0) + (sum?parseFloat(sum):0)
			})
			return {
				xAxisName:item,
				workloadNum:parseFloat(parseFloat(sDataSum).toFixed(1)),
				employeeNum:parseFloat(sDataCount)
			}
		})

		//根据workload排序
		teamTotalNum = _.sortBy(teamTotalNum,function(item){
			return -item.workloadNum
		})
//		console.log(teamTotalNum)
		xAxis = _.map(teamTotalNum,function(item){
			return item.xAxisName
		})
//		console.log(xAxis)

		children = _.pluck(childrenAndData, TeamChildren)
		children = _.uniq(children, false)
		var groupChart1 = 'GC1'+team;
		var groupChart2 = 'GC2'+team;
		$('.groupChart3').append(
			 '			<div class="line clearfix clientHeight1">									'
			+'				<div class="l_all">								'
			+'					<div class="title">'+ team +' workload & employee</div>						'
			+'					<div class="training chartB w100 relative">'
			+'						<div class="RChart12 '+ groupChart1 +'"></div>'
			+'						<div class="RChart13 '+ groupChart2 +'"></div>'
			+'						<button class="btn btn-info chartChange ">all</button>'
			+'					</div>						'
			+'				</div>								'
			+'			</div>									'
		)
//		setHeight('height',$('.content .groupChart3 .chartB'),$('.content .groupChart3 .chartB'),1/3,0);
		$('.content .groupChart3 .clientHeight1').css('height',cHeight+'px');
		
		children = _.map(children, function(c,index){
			var childData = _.filter(childrenAndData, function(cd){ 
				return cd[TeamChildren] == c
			})
			
			var stat = _.map(xAxis, function(xItem,index){
				var xData = _.filter(childData, function(d){
					return d[ServiceItem].replace(/\s/g,'').toLowerCase() == xItem.replace(/\s/g,'').toLowerCase();
				})
				var countData = _.uniq(xData, false, function(x){
					return x[EmployeeNO]
				})
//				console.log(countData)
				var sumData = _.pluck(xData, PchartValue)
				//console.log(sumData)
				var sum = _.reduce(sumData, function(memo, num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				});
				
				//console.log('-------------', c, '--', xItem, countData.length, sum||0, xData)
				return {
					count: countData.length||'',
					sum: sum?parseFloat(parseFloat(sum).toFixed(1)):'',
					wxTotal:parseFloat(teamTotalNum[index].workloadNum),
					exTotal:parseFloat(teamTotalNum[index].employeeNum),
					countRatio:!isNaN((countData.length||0)/(teamTotalNum[index].employeeNum)*100)?(((countData.length||0)/(teamTotalNum[index].employeeNum)*100)?(((countData.length||0)/(teamTotalNum[index].employeeNum)*100).toFixed(1)+'%'):''):'',
					sumRatio:!isNaN((sum?parseFloat(sum):0)/(teamTotalNum[index].workloadNum)*100)?(((sum?parseFloat(sum):0)/(teamTotalNum[index].workloadNum)*100)?(((sum?parseFloat(sum):0)/(teamTotalNum[index].workloadNum)*100).toFixed(1)+'%'):''):''
				}
			})
//			console.log(stat)
			return {
				name: c,
				//data: childData,
				stat: stat,
				count: _.pluck(stat, 'count'),
				sum: _.pluck(stat, 'sum'),
//				sumRatio:_.pluck(stat,'sumRatio'),
//				countRatio:_.pluck(stat,'countRatio'),
				sumRatio:0,
				countRatio:0,
				wxTotal:_.pluck(stat,'wxTotal'),
				exTotal:_.pluck(stat,'exTotal'),
			}
		})
		var groupData3_1 = getBLGCOLessData(children);
		var GD3 = getGroupData3(children,'sum','sumRatio',xAxis,'wxTotal');
		var GD4 = getGroupData3(children,'count','countRatio',xAxis,'exTotal');
		DrawOVBar(GD3,groupChart1,IndiGcoBar,{'tooltip':'true','seriesData':'true','legend':{'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:60,y2:40},'nm':{'yname':'Workload','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});
		DrawOVBar(GD4,groupChart2,IndiGcoBar,{'tooltip':'true','legend':{'show':true,'left':'center','top':'top','orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:20,y2:40},'nm':{'yname':'employee','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});

		return {
			data1:{
				d:GD3,
				c:groupChart1
			},
			data2:{
				d:GD4,
				c:groupChart2
			}
		}
	})
	return teamAndChildrenList
	
	
	
}



$('body').on('click','.content .regularTag .line .l_all .chartChange',function(){
	$(this).toggleClass('all');
//	var ED = [];
	if(saveSession){
		ED = JSON.parse(saveSession);
	}else{
		ED = JSON.parse(saveLocal);	
	}
	var index = $(this).parents('.line').index();
	var data2 = clone(teamGroupData3[index].data2.d[teamGroupData3[index].data2.d.length-1]);
	var data1 = clone(teamGroupData3[index].data1.d[teamGroupData3[index].data1.d.length-1]);
//	var data1 = teamGroupData3[index].data1.d;
//	var data2 = teamGroupData3[index].data2.d;
	
	data1.type = data2.type = 'bar';
	if($(this).hasClass('all')){
		DrawOVBar([data1],teamGroupData3[index].data1.c,IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:60,y2:40},'nm':{'yname':'Workload','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});
		DrawOVBar([data2],teamGroupData3[index].data2.c,IndiGcoBar,{'tooltip':'false','legend':{'show':true,'left':'center','top':'top','orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:20,y2:40},'nm':{'yname':'employee','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});
	}else{
		DrawOVBar(teamGroupData3[index].data1.d,teamGroupData3[index].data1.c,IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:60,y2:40},'nm':{'yname':'Workload','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});
		DrawOVBar(teamGroupData3[index].data2.d,teamGroupData3[index].data2.c,IndiGcoBar,{'tooltip':'false','legend':{'show':true,'left':'center','top':'top','orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:20,y2:40},'nm':{'yname':'employee','ynameGap':50,'ynameLocation':'middle',nameRotate:90,'ynameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'0','interval':'auto','reg':'false'}});
	}
})
