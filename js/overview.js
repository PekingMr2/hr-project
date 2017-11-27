



function skipOverview(){
$('.overviewLink').parent('li').addClass('active');
	
	
var overviewHtml = 
'<div class="overviewTag">'
+'	<div class="clearfix clientHeight2" style="margin-bottom:1%;">'
+'		<div class="fl bgf workloadAll w40">'
+'			<div class="title">GCO China: workload allocation</div>'
+'			<div class="OVchart1"></div>'
+'		</div>'
+'		<div class="fl bgf workloadAll w60">'
+'			<div class="title">GCO China: workload trend</div>'
+'			<div class="OVchart2"></div>'
+'		</div>'
+'	</div>'
+'	<div class="clearfix clientHeight1" style="margin-bottom:1%;">'
+'		<div class="fl bgf workloadAll w40">'
+'			<div class="title">By Team workload allocation</div>'
+'			<div class="OVchart3"></div>'
+'		</div>'
+'		<div class="fl bgf workloadAll w60">'
+'			<div class="title">By Team workload trend</div>'
+'			<div class="OVchart4">'
//+'				<div class="OVchart5"></div>'
//+'				<div class="OVchart6"></div>'
//+'				<div class="OVchart7"></div>'
+'			</div>'
+'		</div>'
+'	</div>'
+'</div>'
	
	

	
	
	$('.content').html(overviewHtml);
		//首页
		//workload高度
//		setHeight('height',$('.content .workloadAll'),$('.content .workloadAll'),1,0);
		$('.content .clientHeight1').css('height',cHeight+'px');
		$('.content .clientHeight2').css('height',cHeight2+'px');
		
		//RvsP高度
//		$('.content .RvsP').css('height',$('.content .workloadAll').css('height'));
//		setHeight('height',$('.content #chart1，.content .chartBox'),$('.content #chart1'),1,0);
//		setHeight('height',$('.content .OVchart'),$('.content .OVchart'),1,($('.content .OVchart').width())/4);
	
//		$('.content .OVBox2 .RvsP').css('height','auto');
//		$('.content .OVBox2 .workloadAll').css('height',$('.content .OVBox2 .RvsP').css('height'));
	
		$('.StartTime .dropdown-menu').html('<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >--</a></li>');
		$('.EndTime .dropdown-menu').html('<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >--</a></li>');
//		$('.TeamSelect .dropdown-menu').html('<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >请选择团队</a></li>');
			
		if(saveLocal){
			var ED = [];
			if(saveSession){
				ED = JSON.parse(saveSession)				
			}else{
				ED = JSON.parse(saveLocal);	
			}
		
			//overview 数据
			var OVDataR = clone(ED.excelTag1);
			var OVDataP = clone(ED.excelTag2);
			var thatOvdp = 0;
			for(var ovdp=0;ovdp<OVDataP.length;ovdp++){
				if(!isNaN(parseFloat(OVDataP[ovdp][ED.PchartValue])))
				thatOvdp += parseFloat(OVDataP[ovdp][ED.PchartValue]);
			}
			var Ovdr = fileImport.mergeObj(OVDataR,ED.PchartValue,ED.WorkType);
			
//			console.log(Ovdr)
		
			//overview
			var xlsAllData = clone(ED.excelAll);
			var OVChartR = clone(Ovdr);
			var OVPieData = [];//饼图数据
			for(var or=0;or<OVChartR.length;or++){
				OVPieData.push(
					{'name':OVChartR[or][ED.WorkType],'value':OVChartR[or][ED.PchartValue].toFixed(1)}
				)
			}
			OVPieData.push({'name':'Project','value':Math.round(thatOvdp).toFixed(1)});
			//饼图
			function DrawPie(d,c,p){
				var myRC = echarts.init(document.getElementsByClassName(c)[0], "macarons");
				var OVPieLegend = [];
				for(var i=0;i<d.length;i++){
					OVPieLegend.push(d[i].name);
				}
				p.series[0].data = d;
				p.series[0].radius = '60%';
				p.series[0].center = ['50%', '55%'],
				p.legend.data = OVPieLegend;
//				p.tooltip.formatter = function(params){
//					return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
//		                + 'GCO China' + '</div>'
//		                + params.name + ' : ' + Math.round(params.value) + '<br>'
//				}
				myRC.setOption(p);
			}



			///////////////////////////////////////////////////////////////////////////////
			//新增
////////////第二图
			var CD2 = getBarChartData(ED.excelAll,false,ED.Month,ED.WorkType,ED.EmployeeNO,ED.PchartValue,'Project')//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项,计算求和项
			//整理数据
			var GCOData2 = getGCOData(CD2);
			DrawOVBar(GCOData2,'OVchart2',IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':60,'orient':'horizontal'},'trigger':'xAxis','grid':{x:60,x2:40,y:120,y2:60},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'interval':'auto'}});
			///第三图
			var CD3 = getBarChartData(ED.excelAll,false,ED.Team,ED.WorkType,ED.EmployeeNO,ED.PchartValue,'Project')//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项,计算求和项
			var GCOData3 = getGCOData(CD3);
			DrawOVBar(GCOData3,'OVchart3',IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':60,'orient':'horizontal'},'trigger':'xAxis','grid':{x:60,x2:40,y:150,y2:60},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}}});
///////////////////////////////////////////////////////////////////
			//第四图
			
			var CD4 = getBarChartData(ED.excelAll,ED.Team,ED.Month,ED.WorkType,ED.EmployeeNO,ED.PchartValue,'Project')//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项,计算求和项
			$('.OVchart4').html('');
			CD4.forEach(function(p,i){
				var cla = 'OVChart5'+i
				$('.OVchart4').append('<div class="'+ cla +' GCOChart"></div>');
				$('.OVchart4 .GCOChart').css('height',1/(CD4.length)*100+'%');
				var GCOData = getGCOData(CD4[i].children);
				if(i<=0){
					DrawOVBar(GCOData,cla,IndiGcoBar,{'tooltip':'false','legend':{'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:60,y2:20},'nm':{'yname':CD4[i].name,'ynameGap':50,'ynameLocation':'middle','ynameTextStyle':{'fontSize':'18','fontWeight':'bold'},'nameRotate':90},'axis':{'interval':'auto'}});
				}else{
					DrawOVBar(GCOData,cla,IndiGcoBar,{'tooltip':'false','legend':{'show':true,'left':'center','top':0,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:25,y2:35},'nm':{'yname':CD4[i].name,'ynameGap':50,'ynameLocation':'middle','ynameTextStyle':{'fontSize':'18','fontWeight':'bold'},'nameRotate':90},'axis':{'interval':'auto'}});
				}
			})

			function getBarData(x,y,z,a,b,c){//x:具体搜索项(多少列)  y:搜索范围     z:team
				for(var i=0;i<x.length;i++){
					var ptd = [];
					for(var j=0;j<PType.length;j++){
						if(PBXData.length<PType.length){
							PBXData.push(PType[j][ED.ProjectType])
						}
						var PTNum = 0;
						for(var e=0;e<pdata.length;e++){
							if(PWidth[i][ED.Projectwidth]==pdata[e][ED.Projectwidth]){
								if(PType[j][ED.ProjectType]==pdata[e][ED.ProjectType]){
									if(!isNaN(parseFloat(pdata[e][ED.PchartValue]))){
										PTNum+=parseFloat(pdata[e][ED.PchartValue]);
									}
								}
							}
						}
						ptd.push(Math.round(PTNum));
					}
					PBSeriesData.push(
						{
				            name: PWidth[u][ED.Projectwidth],
				            type: 'bar',
				            stack: '总量',
				            label: {
				                normal: {
				                    show: true,
	//			                    position: 'inside',
									textStyle: {
								        color: '#000'
									}
				                }
				            },
				            data: ptd
				        }
					)
				}
			}
			
			
			
			DrawPie(OVPieData,'OVchart1',PPieOptions1);
			
		}else{
			layer.alert('请上传表格');
		}
}



if(saveLocal){
	skipPage();
}else{
	autoLoadingExcel();
}

