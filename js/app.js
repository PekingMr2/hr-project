
//$('.header li a').click(function(){
//	$(this).parents('li').addClass("active").siblings('li').removeClass('active');
//	var liIndex = $(this).parent().parent().index();
//	
//})
$('.header li').hover(function(){
		var that = $(this);
		if(!that.hasClass('active')){
			that.children('a').css('color','#333');
		}
	},function(){
		$(this).children('a').css('color','#fff');
})
var cHeight = $(document.body).height()-60-20;
var cHeight2 = $(document.body).height()-60 - 140 - 20;
//var documentHeight = document.body.clientHeight;

//var Month = 12;//选择了几个月 根据select判断

//localStorage
var saveLocal = localStorage.getItem('ExcelData');
//sessionStorage
var saveSession = sessionStorage.getItem('sessionExcelData');

///////////
//根据宽度设置高度
function setHeight(n,x,z,r,y){//x需要设置的元素 r比例  y减去或者加上多少  n样式  z相对宽度元素
	x.css(n,z.width()*r-y+'px');
}

//数组对象 克隆

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
}
//数组去重
Array.prototype.unique3 = function(){
 	var res = [];
 	var json = {};
 	for(var i = 0; i < this.length; i++){
  		if(!json[this[i]]){
   			res.push(this[i]);
   			json[this[i]] = 1;
  		}
 	}
 	return res;
}

//数组去重 去空格 不区分大小写
Array.prototype.unique4 = function(){
 	var res = [];
 	var json = {};
 	for(var i = 0; i < this.length; i++){
  		if(!json[this[i].replace(/\s/g,'').toLowerCase()]){
   			res.push(this[i]);
   			json[this[i].replace(/\s/g,'').toLowerCase()] = 1;
  		}
 	}
 	return res;
}

//如果满足需求 就根据用户需求 排序
function sortArrByClient(item){
	var requirement = ['BG','Cross BG','Pan GCO Cross BG','GCO Global','GCO China'];
	var sameItem = [];
	var result = [];
	requirement.forEach(function(require){
		item.forEach(function(singleItem){
			if(require.replace(/\s/g,'').toLowerCase() == singleItem.replace(/\s/g,'').toLowerCase()){
				sameItem.push(singleItem)
			}
		})
	})
	result = sameItem.concat(item);
	result = _.uniq(result,false);
	return result;
}

function sortObjectByClient(item){
	var requirement = ['BG','Cross BG','Pan GCO Cross BG','GCO Global','GCO China'];
	var sameItem = [];
	var result = [];
	requirement.forEach(function(require){
		item.forEach(function(singleItem){
			if(require.replace(/\s/g,'').toLowerCase() == singleItem.name.replace(/\s/g,'').toLowerCase()){
				sameItem.push(singleItem)
			}
		})
	})
	result = sameItem.concat(item);
	result = _.uniq(result,function(obj){
		return obj.name
	});
	return result;
}
	
function countNum(x,y,z){
	var All = []
	for(var etn=0;etn<x.length;etn++){
		var EachTeamNum = 0;
		for(var tn=0;tn<y.length;tn++){
			if(x[etn]==y[tn][z]){
				EachTeamNum++;
			}
		}
		All.push(EachTeamNum);
	}
	return All;
}	
function countTime(x,y,z,ED){
	var All = []
	for(var etn=0;etn<x.length;etn++){
		var EachTeamNum = 0;
		for(var tn=0;tn<y.length;tn++){
			if(x[etn]==y[tn][z]){
				if(!isNaN(parseFloat(y[tn][ED.PchartValue]))){
					EachTeamNum+=parseFloat(y[tn][ED.PchartValue]);
				}
			}
		}
		All.push(EachTeamNum);
	}
	return All;
}	
	


//////////////////////////////////////////////
/////////////////125行//////////////////////////////
//////////////////////////////////////////////
//文件上传
var fileImport = {
	btn:$('#fileImport'),
	Month:'Year Month',
	title1:[],//excel tag1头部 暂Hour未用
	title2:[],//excel tag1头部 暂Hour未用
	excelTag1:[],//excel tag1的数据 
	excelTag2:[],//excel tag2的数据
	excelAll:[],//两个标签所有数据
	PlanedNum:0,//用于饼图
	AdHocNum:0,//用于饼图
	projectNum:0,//用于饼图
	ovdr:[],//首页饼图数据 根据worktype不同 得regular workload 
	ovdp:0,//首页饼图数据 根据worktype不同 得project workload 
	totalRegular:0,//Regular总工Hour
	totalProject:0,//project总工Hour
	fileName:'',
	ProductName:'Project项目名称',
	chart2Title:[],
	chart2Data:[],
	chart3Title:[],
	chart3Data:[],
	chart3AllData:[],
	Pchart1Data:[],
	Pchart2Data:[],
	Pchart3Data:[],
	PWorkloadC:[{'title':'BG','color':'#00B7EE'},
				{'title':'Cross-BG','color':'#556FB5'},
				{'title':'GCO internal','color':'#00A1E9'},
				{'title':'Global','color':'#0000FF'}],
	PchartColor:['#44ACE0','#F6A645','#45CBDD','#EFD748','#7878D6','#E87870','#C1E1FB','#2B98F0'],
	PchartAxis:'ProjectNo项目编码',//project chart1 横坐标
	PchartValue:'Deliveryworkload递交结果的工作时',//用于图标y轴 及 排序
	Team:'Team团队',
	TeamChildren:'GCO-2 Team（GCO-2团队）',
	TeamArr:[],
	TeamSel:'',
	TeamTraining:'Training',
	EmployeeNO:'EmployeeID员工编号',
	WorkType:'WorkType工作种类',
	ProjectType:'ProjectType项目种类',
	Projectwidth:'Projectwidth项目覆盖宽度',
	ProjectNO:'ProjectNo项目编码',	
	ServiceCategory:'Service Category服务分类',
	ServiceType:'Service Type',
	ServiceTypeShow:'Business service',
	Stand:'GCO standard service',
	StandY:'Yes',
	StandN:'No',
	Name:'Name中文姓名',
	Fte:'FTE',
	TeamCee:'CEE',
	TeamSMS:'SMS',
	OVWorkType:['Planned','Ad-hoc'],
	PchartData:[],//project chart1,2 数据集合 按照workload从大到小排序后
	RchartData:[],//regular chart1,2数据集合 从大到小排序
	ServiceItem:'ServiceItem服务项目',//用于regular chart 筛选 及横坐标
	SubServiceitem:'SubServiceitem服务项目细分',
	TrainingData:[],//training data
	CEEData:[],//CEE data
	SMSData:[],//SMS data
//	FTEData:[],//FTE data
	itemsTraining:[],//用于regular 饼图item
	itemsCEE:[],//用于regular 饼图item
	itemsSMS:[],//用于regular 饼图item
	IchartBarData:[],//individual bar data 根据person员
	monthNum:12,
	importE:function(){
		
		var that = this;
		that.btn.change(function(e){
			
			layer.msg('Loading', {
			  	icon: 16,
//			  	content:'<div><i class="layui-icon" style="font-size: 30px; color: #1E9FFF;">&#xe63d;</i> Loading</div>',
			  	shade: 0.3 //0.1透明度的白色背景
			});
			var filect = this.files[0];
			that.handleDrop(filect,e);
		})
	},
	handleDrop:function(f,ev){//获取文件
		var that = this;
		var result;
	    var reader = new FileReader(),
	    name = f.name;
	    reader.onload = function (e) {
	    	that.fileName = f.name;
	        that.excelTag1 = that.getExcelData(e,0);
	        that.excelTag2 = that.getExcelData(e,1);
			var TExcel1 = clone(that.excelTag1);
			var TExcel2 = clone(that.excelTag2);
			var cloneExl1 = clone(that.excelTag1);
			that.excelAll = $.merge(cloneExl1,that.excelTag2);//两个标签所有数据 未做处理
//	        that.calculateTag(TExcel1,TExcel2);//单个数据处理
	        //把数据存储在本地
	        localStorage.setItem('ExcelData',  JSON.stringify(that));
	        sessionStorage.removeItem('sessionExcelData');
	        saveSession = sessionStorage.getItem('sessionExcelData');
	        saveLocal = localStorage.getItem('ExcelData');
	        layer.closeAll();
	        //数据存储完成
//	        that.graphing();//绘图
			if(window.location.hash==''){
				window.location.hash='#overview';
			}
			$('.TotalInfoModule .DInfoBox.SearchBox .StartTime button').html('');
			$('.TotalInfoModule .DInfoBox.SearchBox .EndTime button').html('');
			$('.TotalInfoModule .DInfoBox.SearchBox .TeamSelect button').html('');
//			searchData();
			refreshTotalAndFilter();
			skipPage();
			ev.target.value='';
		};
		reader.readAsBinaryString(f);
	},
	getExcelData:function(e,x){//上传
		var that = this;
		var data = e.target.result,
			workbook = XLSX.read(data, { type: 'binary' }),
			sheetName = workbook.SheetNames[x],
			sheet = workbook.Sheets[sheetName],
			arrAll = [],//保存所有数据	
			objAll = [];//保存所有数据对象
	   	for (var row = 1; ; row++) {
			if (sheet['A' + row] == null) {
				break;
			}
			var arrRow = [];//保存每一行数据 数组
			var objRow = {};//保存每一行数据 对象
			for (var col = 65; col <= 85; col++) {
				var c = String.fromCharCode(col);// get 'A', 'B', 'C' ...
				var key = '' + c + row;
				
				//对象
				var titleKey = '' + c + 1;
				//保存excel头部 
//				if(row>1){
					if(sheet[titleKey]){
						var tk = sheet[titleKey]['w'];
						if (sheet[key]) {
  							objRow[tk] = sheet[key]['w'];
						}else{
							objRow[tk] = null;
						}
					}
//				}
			}
			objAll.push(objRow);
		}
		objAll.shift();//去除第一个空数组
	   	return objAll;
	},
	calculateTag:function(){//tag2数据处理Project
		var that = this;
		
	},
	calculateEach:function(){//数据计算
		var that = this;
	},
	mergeObj:function(arr,a,b){//合并对象 a相加  b不变
		var tb = [];
		var narr = [];
//		var emp = 0;
		if(arr.length>0){
			for (var i = 0; i < arr.length; i++) {
			    var n = tb.indexOf(arr[i][b]);
			    if (n==-1) {
			        tb.push(arr[i][b]);
			        if(isNaN(parseFloat(arr[i][a]))){//防止有未填写项
			        	arr[i][a] = 0;
			        }else{
						var obj = arr[i];
			        	obj[a] = parseFloat(arr[i][a]);
			        	obj['empNum'] = (obj['empNum']>0?obj['empNum']:1);
			        }
			        narr.push(obj);
			    } else {
			    	if(isNaN(parseFloat(arr[i][a]))){//防止有未填写项
	//		    		narr[n][a]+=0;//////////////////////////////////////////
			       	}else{
			       		narr[n][a]+=parseFloat(arr[i][a]);
			       		narr[n]['empNum']+=1;
			       	}
			    }
			}
//			narr[n][a] = parseInt(narr[n][a]);
		}
		return narr;
	},
	objSort:function(x){//按照对象一个属性值排序 x为排序的key
		return function (object1, object2) { 
			var value1 = object1[x]; 
			var value2 = object2[x]; 
			if (value2 < value1) { 
				return -1; 
			}else if (value2 > value1) { 
				return 1; 
			} else { 
				return 0; 
			} 
		} 
	},
	objUpSort:function(x){//按照对象一个属性值排序 x为排序的key
		return function (object1, object2) { 
			var value1 = object1[x]; 
			var value2 = object2[x]; 
			if (value2 > value1) { 
				return -1; 
			}else if (value2 < value1) { 
				return 1; 
			} else { 
				return 0; 
			} 
		} 
	}	
}

fileImport.importE();













var winSearch = window.location.search;


function skipPage(){
	
	if(window.location.hash==''){
		window.location.hash='#overview';
	}
	if(saveLocal){
		if(window.sessionStorage&&saveSession){
			$('.fileName').html(JSON.parse(saveSession).fileName).attr('title',JSON.parse(saveSession).fileName);
		}else{
			$('.fileName').html(JSON.parse(saveLocal).fileName).attr('title',JSON.parse(saveLocal).fileName);
		}
	}else{
//		alert('请上传表格')
//		return
	}
	var sli = $('.header .hpadd');
	sli.removeClass('active');
	if(window.location.hash=='#project'){
		sli.eq(2).children('a').addClass('active');
		skipProject();
	}else if(window.location.hash=='#regular'){
		sli.eq(1).children('a').addClass('active');
		skipRegular();
	}else if(window.location.hash=='#individual'){
		sli.eq(3).children('a').addClass('active');
		skipIndividual();
	}else if(window.location.hash=='#overview'){
		sli.eq(0).children('a').addClass('active');
		skipOverview();
	}
}

//求和
function getSum(x,y){//x数组 y求和的对象
	var TotalNum = 0;
	for(var i=0;i<x.length;i++){
		if(!isNaN(parseFloat(x[i][y]))){
			TotalNum+=parseFloat(x[i][y]);
		}
	}
	return TotalNum;
}


//getBarChartData(clone(ED.excelTag1),groupChart,xAxisParam,legendData,uniqItem，sumParam,Pro)//总数据，大的分组数据(类)，横坐标,legend数据列表，去重项，计算就和项,Pro仅适用于excel tab project
function getBarChartData(param1,groupChart,xAxisParam,legendData,uniqItem,sumParam,Pro){
	var d = param1;
	var xAxis = _.pluck(d, xAxisParam)
	xAxis = _.uniq(xAxis, false)
	xAxis = _.sortBy(xAxis,function(item){
		return item
	})
	if(groupChart){
		var teamList = _.pluck(d, groupChart)
		teamList = _.uniq(teamList, false)
		
		var allLegendData = _.pluck(d,legendData);
		allLegendData = _.uniq(allLegendData,false);
//		allLegendData = _.without(allLegendData,undefined)
//		console.log(allLegendData)
		
		var teamAndChildrenList = _.map(teamList, function(team){
			var children = [];
			var childrenAndData = _.filter(d, function(item){
				return item[groupChart] == team
			})
			//每个横坐标总的数据
			var xAxisTotal = _.map(xAxis,function(x){
				var xData = _.filter(childrenAndData,function(cad){
					return cad[xAxisParam] == x
				})
				xData = _.pluck(xData,sumParam)
				return _.reduce(xData,function(memo,num){
					return parseFloat(((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))||0
				})
			})
			
			////////////
//			children = _.pluck(childrenAndData, legendData);
//			children = _.uniq(children, false);
//			console.log(children)
			
			children = _.map(allLegendData, function(c){
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
					return  (sumData[b]/a*100)?((sumData[b]/a*100).toFixed(1)+'%'):''
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
			
			return {
				name: team,
				children: children,
				
			}
		})
		return teamAndChildrenList
	}else{
		
		//每个横坐标总的数据
		var xAxisTotal = _.map(xAxis,function(x){
			var xData = _.filter(d,function(cad){
				return cad[xAxisParam] == x
			})
			xData = _.pluck(xData,sumParam)
			return _.reduce(xData,function(memo,num){
				return parseFloat(((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
			})
		})
//		console.log(xAxisTotal)
		var children = [];
		children = _.pluck(d, legendData)
		children = _.uniq(children, false)
		children = _.map(children, function(c){
			var childData = _.filter(d, function(cd){ 
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
				var sum = _.reduce(sumData, function(memo, num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				});
				return {
//					count: countData.length,
					sum: parseFloat((parseFloat(sum || 0)).toFixed(1))
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
				xAxis:xAxis,
				sum: sumData,
				xTotal:xAxisTotal,
				ratio:ratio
			}
		})
		return children
	}
}

//单个叠堆
function getSingleBarChartData(param1,groupChart,xAxisParam,legendData,uniqItem,sumParam,Pro){
	var d = param1;
	var xAxis = [xAxisParam];
	if(groupChart){
		var teamList = _.pluck(d, groupChart)
		teamList = _.uniq(teamList, false)
		
		var teamAndChildrenList = _.map(teamList, function(team){
			var children = [];
			var childrenAndData = _.filter(d, function(item){
				return item[groupChart] == team
			})
			////////////
			children = _.pluck(childrenAndData, legendData)
			children = _.uniq(children, false)
			children = _.map(children, function(c){
				var childData = _.filter(childrenAndData, function(cd){ 
					return cd[legendData] == c
				})
				

				var sumData = _.pluck(childrenAndData, sumParam)
				var sum = _.reduce(sumData, function(memo, num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				});
				var stat = [{
					sum: parseFloat((sum  || 0).toFixed(1))
				}]
				var sumData = _.pluck(stat, 'sum');
				var ratioNum= _.pluck(childData,sumParam);
				ratioNum = _.reduce(ratioNum,function(memo,num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				})
				var ratio = (ratioNum/sumData*100)?((ratioNum/sumData*100).toFixed(1)+'%'):'';
				return {
					name: c||Pro,
					sum:sumData,
					ratio:ratio,
//					xTotal:childData,
					xTotal:[parseFloat(ratioNum.toFixed(1))],
					xAxis:xAxis,
				}
			})
			return {
				name: xAxisParam,
				children: children,
				
			}
		})
		return teamAndChildrenList
	}else{
		var children = [];
		children = _.pluck(d, legendData)
		children = _.uniq(children, false)
		children = _.map(children, function(c){
			var childData = _.filter(d, function(cd){ 
				return cd[legendData] == c
			})

			var sumData = _.pluck(childData, sumParam)
			var sum = _.reduce(sumData, function(memo, num){
				return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
			});
			var stat = [{
				sum: (parseFloat(sum  || 0))?(parseFloat((parseFloat(sum  || 0)).toFixed(1))):0
			}]
			var sumData = _.pluck(stat, 'sum');
			var ratioNum= _.pluck(d,sumParam);
			ratioNum = _.reduce(ratioNum, function(memo, num){
				return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
			});
			var ratio = (sum/ratioNum*100)?((sum/ratioNum*100).toFixed(1)+'%'):'';
			return {
				name: c||Pro,
				sum:sumData,
				ratio:[ratio],
//				xTotal:childData,
				xTotal:[parseFloat(ratioNum.toFixed(1))],
				xAxis:xAxis,
			}
		})
		return {
			name: xAxisParam,
			children: children,
			
		}
	}
}

//多个堆叠+line
function getMoreBarChartData(param1,groupChart,xAxisParam,legendData,uniqItem,sumParam,StandName,StandType,serviceType,selectService,SubServiceitem){
	var d = param1;
	var xAxis = _.pluck(d, xAxisParam);
	xAxis = _.uniq(xAxis, false)
	xAxis = _.sortBy(xAxis,function(item){
		return item
	})
	if(groupChart){
		var teamList = _.pluck(d, groupChart)
		teamList = _.uniq(teamList, false)
		$('.GCO-Team').html('')
		var teamAndChildrenList = _.map(teamList, function(team,i){
			var class1 = 'RChart1'+team+i;		
			var class2 = 'RChart2'+team+i;		
			var class3 = 'RChart3'+team+i;		
					
			$('.GCO-Team').append(
						 '		<div style="background:#fff;margin-bottom:1%;" class="clientHeight1 relative">									'	
						+'			<div class="title">'+ team +'</div>									'
						+'			<div class="line line2 clearfix">									'
						+'				<div class="fl l_left">								'
						+'					<div class="title">'+ team +' : Regular work Service type</div>						'
						+'					<div class="training chartB w100 RChart3 '+ class1 +'"></div>						'
						+'				</div>								'
						+'				<div class="fl l_center">								'
						+'					<div class="title">Regular work service type trend</div>							'
						+'					<div class="trainingTop chartB w100 RChart4 '+ class2 +'"></div>							'
						+'				</div>								'
						+'				<div class="fl l_right">								'
						+'					<div class="title">Biz service breakdown</div>							'
						+'					<div class="trainingTop chartB w100 RChart5 '+ class3 +'"></div>							'
						+'				</div>								'
						+'			</div>	'							
						+'		</div>	'							
			)
//			setHeight('height',$('.content .regularTag .line2 .chartB'),$('.content .regularTag .line .l_right'),5/6,0);
			$('.content .GCO-Team .clientHeight1').css('height',cHeight+'px');

			var children = [];
			var childrenAndData = _.filter(d, function(item){
				return item[groupChart] == team
			})

			//每个左侧堆叠
			var barData = getSingleBarChartData(childrenAndData,false,'workload',legendData,uniqItem,sumParam)
			//每个饼图
			var pieData = getSinglePieData(childrenAndData,false,serviceType,selectService,SubServiceitem,sumParam)
			//每个横坐标总的数据
			var xAxisTotal = _.map(xAxis,function(x){
				var xData = _.filter(childrenAndData,function(cad){
					return cad[xAxisParam] == x
				})
				xData = _.pluck(xData,sumParam)
//				xData = _.map(xData,function(item){
//					return parseFloat(item)
//				})
				return _.reduce(xData,function(memo,num){
					return parseFloat(((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
				},0)
			})
			////////////
			children = _.pluck(childrenAndData, legendData)
			children = _.uniq(children, false)
			
			children = _.map(children, function(c){
				var childData = _.filter(childrenAndData, function(cd){ 
					return cd[legendData] == c
				})
				
				var stat = _.map(xAxis, function(xItem){
					var xData = _.filter(childData, function(d){
						return d[xAxisParam] == xItem;
					})
					var lineData = _.where(xData,{Stand:StandType});
					var sumData = _.pluck(xData, sumParam)
					//console.log(sumData)
					var sum = _.reduce(sumData, function(memo, num){
						return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
					});
					return {
						lineData:parseFloat((parseFloat(lineData||0)).toFixed(1)),
//						time:xItem,
	//					count: countData.length,
						sum: parseFloat((parseFloat(sum  || 0)).toFixed(1))
					}
				})
					
				var sumData = _.pluck(stat, 'sum');
				var ratio = _.map(xAxisTotal,function(a,b){
					return (sumData[b]/a*100)?((sumData[b]/a*100).toFixed(1)+'%'):''
				})
				
				
				var requirement = {}
				requirement[StandName] = StandType;
				var lineData = _.where(childData,requirement);
	//			lineData = _.filter(lineData,xAxisParam);
	//			console.log(lineData)
	//			lineData = _.countBy(lineData,xAxisParam);
				var lineAllData = _.map(xAxis,function(param){
					var nld =  _.filter(lineData,function(item){
						return item[xAxisParam] == param
					})
					nld = _.pluck(nld,sumParam);
					nld = _.reduce(nld,function(memo,num){
						return ((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1)
					},0)
					return nld
				})
				return {
					lineName:StandName,
					name: c||Pro,
					//data: childData,
	//				stat: stat,
	//				count: _.pluck(stat, 'count'),
					sum:sumData,
					ratio:ratio,
					lineData:lineAllData,
					xTotal:xAxisTotal,
					xAxis:xAxis,
				}
			})
			
			//调整数据 画图
			var setBarData = getGCOData(barData.children);
//			console.log(setBarData)
			setBarData = sortData(setBarData);
			DrawOVBar(setBarData,class1,IndiGcoBar,{'tooltip':'false','legend':{'left':'10','top':'middle','orient':'vertical'},'trigger':'xAxis','grid':{x:210,x2:20,y:40,y2:40},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}}});
			
			var setAllBarData = getBLGCOLessData(children);
			setAllBarData = sortData(setAllBarData);
			DrawOVBar(setAllBarData,class2,IndiGcoBar,{'tooltip':'false','legend':{'show':false,'left':'center','top':20,'orient':'horizontal'},'trigger':'xAxis','grid':{x:80,x2:40,y:80,y2:40},'nm':{'xname':'','nameGap':30,'xnameLocation':'middle','xnameTextStyle':{'fontSize':'18','fontWeight':'bold'}},'axis':{'rotate':'20','interval':0}});
			DrawPie(pieData,class3,{text:''})
			
			
//			return [barData,{
//				name: team,
//				children: children,
//				
//			},pieData]
		})
//		return teamAndChildrenList
	}else{
		//每个横坐标总的数据
		var xAxisTotal = _.map(xAxis,function(x){
			var xData = _.filter(d,function(cad){
				return cad[xAxisParam] == x
			})
			xData = _.pluck(xData,sumParam)
			return _.reduce(xData,function(memo,num){
				return parseFloat(((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1))
			})
		})
		
		var children = [];
		children = _.pluck(d, legendData)
		children = _.uniq(children, false)
		children = _.map(children, function(c){
			var childData = _.filter(d, function(cd){ 
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
				var sum = _.reduce(sumData, function(memo, num){
					return (memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)
				});
				return {
					lineData:parseFloat((lineData||0).toFixed(1)),
//					count: countData.length,
					sum: parseFloat((parseFloat(sum  || 0)).toFixed(1))
				}
			})
			var sumData = _.pluck(stat, 'sum');
			var ratio = _.map(xAxisTotal,function(a,b){
//				return (sumData[b]/a*100).toFixed(1)+'%'
				return (sumData[b]/a*100)?((sumData[b]/a*100).toFixed(1)+'%'):''
			})
			
			
			
			var requirement = {}
			requirement[StandName] = StandType;
			var lineData = _.where(d,requirement);
//			lineData = _.filter(lineData,xAxisParam);
//			console.log(lineData)
//			lineData = _.countBy(lineData,xAxisParam);
			var lineAllData = _.map(xAxis,function(param){
				var nld =  _.filter(lineData,function(item){
					return item[xAxisParam] == param
				})
				nld = _.pluck(nld,sumParam);
				nld = _.reduce(nld,function(memo,num){
					return ((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1)
				},0)
				return nld
			})
			return {
				lineName:StandName,
				name: c||Pro,
				//data: childData,
//				stat: stat,
//				count: _.pluck(stat, 'count'),
				xAxis:xAxis,
				sum: sumData,
				lineData:lineAllData,
				xTotal:xAxisTotal,
				ratio:ratio
			}
		})
		return children
	}
}

//获取所有饼图数据
function getAllPieData(d,groupChart,serviceType,selectService,SubServiceitem,sumParam){
	var teamList = _.pluck(d, groupChart);
	teamList = _.uniq(teamList, false);
	
	var allData = _.map(teamList,function(item){
		var teamData = _.filter(d,function(obj){
			return obj[groupChart]==item
		})
		var obj = {}
		obj[serviceType] = selectService;
		teamData = _.where(teamData,obj);
		var st = _.pluck(teamData,SubServiceitem);
		st = _.uniq(st,false);

		var serviceData = _.map(st,function(item){
			var sd = _.filter(teamData,function(obj){
				return obj[SubServiceitem] == item
			})
			sd = _.pluck(sd,sumParam);
			return {
				value:	_.reduce(sd,function(memo,num){
					return ((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1)
				}),
				name:item
			}
		})
		return {
			legend:st,
			data:serviceData
		}
	})
	return allData
}

//获取单个饼图数据
function getSinglePieData(d,groupChart,serviceType,selectService,SubServiceitem,sumParam){
	var obj = {}
//	console.log(d)
	obj[serviceType] = selectService.toLowerCase();
	var teamData = _.filter(d,function(item){
		return item[serviceType].toLowerCase()==selectService.toLowerCase();
	});
//	console.log(teamData)
	var st = _.pluck(teamData,SubServiceitem);
//	console.log(st)
	st = _.uniq(st,false);
//	console.log(st)
	var serviceData = _.map(st,function(item){
		var sd = _.filter(teamData,function(obj){
			return obj[SubServiceitem] == item
		})
		sd = _.pluck(sd,sumParam);
		return {
			value:	_.reduce(sd,function(memo,num){
				return ((memo ? parseFloat(memo) : 0) + (num ? parseFloat(num) : 0)).toFixed(1)
			}),
			name:item||'Null'
		}
	})
	serviceData = _.sortBy(serviceData,function(item){
		return -parseFloat(item.value)
	})
	//饼图 top5
	var STop = 5;
	if(serviceData.length>STop){
		var serviceDataTop = _.first(serviceData,STop);
		var serviceDataOthers = _.last(serviceData,serviceData.length-STop);
		var others = _.pluck(serviceDataOthers,'value');
		others = _.reduce(others,function(memo,num){
			return parseFloat(memo)+parseFloat(num)
		})
		serviceDataTop.push({
			name:'others',
			value:parseFloat(parseFloat(others).toFixed(1))
		})
		serviceData = serviceDataTop;
	}
	var legendData = _.pluck(serviceData,'name');
	return {
		legend:legendData,
		data:serviceData
	}
}


//饼图
function DrawPie(d,className,params){
	var chart = echarts.init(document.getElementsByClassName(className)[0], "macarons");
	var options = {
		title : {
	        text: params.text||'',
	        subtext: params.subtext||'',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'horizontal',
	        left: 'center',
	        data: d.legend,
	        top:10,
	        textStyle:{
	        	fontSize:10,
	        },
	        formatter:function(item){
	        	var isTrue = 0
	        	if(item){
	        		isTrue = item.indexOf('/');
	        	}
	        	return (isTrue>0)?(item.replace('/','/\n')):item
	        }
	    },
	    series : [
	        {
	            name: params.seriesName||'',
	            type: 'pie',
	            radius : '50%',
	            center: ['50%', '55%'],
	            data:d.data,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            label:{
	            	normal:{
	            		formatter:"{d}%"
	            	}
	            }
	        }
	    ]
	}
	chart.setOption(options);
}

//转化成GCO图表数据
function getGCOData(gcod){
	var gd = _.map(gcod,function(item){
		return {
			xAxis:item.xAxis,
			name:item.name,
			data:item.sum,
			type: 'bar',
	        stack: '总量',
	        ratio:item.ratio,
	        barMaxWidth:100,
	        label: {
	            normal: {
	                show: true,
//                    position: 'inside',
					textStyle: {
				        color: '#000'
					},
					formatter:function(obj){
						return item.ratio[obj.dataIndex]
					}
	            }
	        }
		}
	})
	if(gcod.length>0){
		gd.push(
			{
				name:'Total',
				data:gcod[0].xTotal,
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
	return gd
}

//regular第三组图数据
function getGroupData3(gcod,param,param1,xAxis,xParam){
//	console.log(gcod)
	var gd = _.map(gcod,function(item){
		return {
			xAxis:xAxis,
			name:item.name,
			data:item[param],
			type: 'bar',
	        stack: '总量',
//	        ratio:item[param],
	        barMaxWidth:100,
	        label: {
	            normal: {
	                show: true,
	//			                    position: 'inside',
					textStyle: {
				        color: '#000'
					},
					formatter:function(obj){
//						console.log(obj)
						return item[param1][obj.dataIndex]
					}
	            }
	        }
		}
	})
	gd.push(
		{
			name:'Total',
			data:gcod[0][xParam],
			type: 'line',
//		        stack: '总量',
//		        showSymbol:false,
			symbolSize:1,
			hoverAnimation:false,
			xAxis:xAxis,
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
	return gd
}


//转化成GCO图表数据+line 少图
function getBLGCOLessData(gcod){
	var gd = _.map(gcod,function(item,i){
		return {
			xAxis:item.xAxis,
			name:item.name,
			data:item.sum,
			type: 'bar',
	        stack: '总量',
	        ratio:item.ratio,
	        barMaxWidth:100,
	        label: {
	            normal: {
	                show: true,
//			                    position: 'inside',
					textStyle: {
				        color: '#000'
					},
					formatter:function(obj){
						return item.ratio[obj.dataIndex]
					}
	            }
	        }
		}
	})
	if(gcod.length>0){
		gd.push(
			{
				name:gcod[0].lineName,
				data:gcod[0].lineData,
				type: 'line',
			},
			{
				name:'Total',
				data:gcod[0].xTotal,
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
	return gd
}
	
//转化成GCO图表数据+line 多图
function getBLGCOData(gcod){
	var allData = _.map(gcod,function(sgcod,t){
		var gd = _.map(sgcod.children,function(item,i){
//			console.log(item)
			return {
				xAxis:item.xAxis,
				name:item.name,
				data:item.sum,
				type: 'bar',
		        stack: '总量',
		        ratio:item.ratio,
		        barMaxWidth:100,
		        label: {
		            normal: {
		                show: true,
		//			                    position: 'inside',
						textStyle: {
					        color: '#000'
						},
						formatter:function(obj){
							return item.ratio[obj.dataIndex]
						}
		            }
		        }
			}
		})
		if(gcod.length>0){
			gd.push(
				{
					name:gcod[0].lineName,
					data:gcod[0].lineData,
					type: 'line',
				}
			)
		}
		return gd
	})
	return allData
}

//替换字符串 str是目标字符串 reallyDo是替换谁 replaceWith是替换成什么。
function replaceString(str,reallyDo,replaceWith) { 
	var e=new RegExp(reallyDo,"g"); 
	words = str.replace(e, replaceWith); 
	return words; 
} 


function DrawOVBar(d,c,p,xA,nm){//l:legend d:series data
//	var yMax = Math.ceil(Math.max.apply(null,d[d.length-1]['data'])*10/9);
	var yMax = null;
	if(d.length>0){
		var chartBar = echarts.init(document.getElementsByClassName(c)[0], "macarons");
		//清空数据
		p.legend.data = [];
		p.legend.show = !xA.legend.show;
		p.legend.left = xA.legend.left;
		p.legend.top = xA.legend.top;
		p.legend.bottom = xA.legend.bottom;
		p.legend.orient = xA.legend.orient;
		p.xAxis.axisLabel.interval = 'auto';
		p.xAxis.axisLabel.rotate = 0;
		if(xA.trigger == 'yAxis'){
			p.yAxis.data = d[0].xAxis;
			p.yAxis.type = 'category';
			p.xAxis.type = 'value';
			p.yAxis.axisLabel = {show:false};
			p.xAxis.max=yMax;
			p.yAxis.max=null;
		}else if(xA.trigger == 'xAxis'){
			p.yAxis={
				type:'value',
				max:yMax
			}
			p.xAxis.data = d[0].xAxis;
			p.xAxis.type = 'category';
//			p.yAxis.axisLabel = {show:true};
			p.xAxis.max=null;
			if(xA.axis){
				p.xAxis.axisLabel.interval = xA.axis.interval;
				if(d[0].xAxis.length>5){
					p.xAxis.axisLabel.rotate = xA.axis.rotate;
				}
				if(xA.axis.reg=='true'){
					p.xAxis.axisLabel.formatter = function(item){
						var isTrue = 0;
						var isNullTrue = 0;
						if(item){
			        		isTrue = item.indexOf('+');
			        		isNullTrue = item.indexOf(' ');
						}
						
//						var newString = replaceString(item,' ','\n')
						var newString = item.replace(/\s/g,'\n');
//			        	return (isTrue>0)?(item.replace('+','\n+')):(isNullTrue?(item.replace(' ','\n')):item)
			        	return newString
			        }
				}else{
					p.xAxis.axisLabel.formatter = function(item){
						return item
					}
				}
			}
		}else{
			console.log('trigger参数有误')
		}
		p.grid=xA.grid;
		p.series = d;
		if(xA.seriesData){
			for(var nn=0;nn<p.series.length-1;nn++){
//				console.log(p.series[nn].label.normal)
				p.series[nn].label.normal.show = false;
			}
		}
//		if(xA.seriesData){
//			p.series[0].label.normal.show = false
//		}
		p.xAxis.name = xA.nm.xname||'';
		p.yAxis.name = xA.nm.yname||'';
		p.xAxis.nameLocation = xA.nm.xnameLocation||'';
		p.yAxis.nameLocation = xA.nm.ynameLocation||'';
		p.xAxis.nameGap = xA.nm.xnameGap||'';
		p.yAxis.nameGap = xA.nm.ynameGap||'';
		p.xAxis.nameTextStyle = xA.nm.xnameTextStyle||'';
		p.yAxis.nameTextStyle = xA.nm.ynameTextStyle||'';
		p.yAxis.nameRotate = xA.nm.nameRotate||'';
		
		for(var i=0;i<d.length-1;i++){
			p.legend.data.push(d[i].name);
		}
		if(d.length==1){
			p.legend.data = [d[0].name]
		}
		if(xA.tooltip){
			p.tooltip.formatter = function(params){
				var pop = '';
//				console.log(params)
				var totalNum = params[params.length-1].value;
				for (var i=0;i<params.length-1;i++) {
					if(params[i].seriesType=='line'){
						pop += (!(params[i].seriesName)?params[i].name:(params[i].seriesName + ' : '+ Math.round(params[i].value) + '<br>'))
					}else{
						pop += (!(params[i].seriesName)?params[i].name:(params[i].seriesName + ' : '+ Math.round(params[i].value) + '/' + (isNaN((params[i].value/totalNum*100).toFixed(1))?0:(params[i].value/totalNum*100).toFixed(1)) + '%' + '<br>'))
					}
				}
				pop += (!(params[params.length-1].seriesName)?params[params.length-1].name:params[params.length-1].seriesName + ' : '+ (isNaN(Math.round(params[params.length-1].value))?0:(Math.round(params[params.length-1].value))) + '<br>')
				return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
		                + params[0].name + '</div>'
		                +pop;
			}
		}
//					console.log(p)
		chartBar.setOption(p);
	}else{
		$('.'+c).append('<div style="text-align:center;font-size:16px; position:absolute;top:50%;width:100%;color:#ddd;">无数据</div>')
	}
}




//////////////////自动加载excel///////////////

var wb;
var autoExcelTag1 = [];
var autoExcelTag2 = [];
var autoExcelAll = [];
var autoUrl = "./file/test.xlsx";
var fileName = 'test.xlsx';
var EDf = fileImport;
function fetchAB(url, cb) {
    var xhr = new XMLHttpRequest;
    xhr.open('get', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = cb;
    xhr.send();
};

function autoLoadingExcel() {//导入
    if (autoUrl) {
        fetchAB(autoUrl, function () {
            if (this.status == 200) {
                wb = XLSX.read(btoa(fixdata(this.response)), {//手动转化
                    type: 'base64'
                });
                autoExcelTag1 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                autoExcelTag2 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]);
//              document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
				autoExcelAll = $.merge(clone(autoExcelTag1),clone(autoExcelTag2));
				console.log(autoExcelTag1)
				var EDf = fileImport;
            	EDf.excelAll = clone(autoExcelAll);
				EDf.excelTag1 = clone(autoExcelTag1);
				EDf.excelTag2 = clone(autoExcelTag2);
				var autoMonthArr = fileImport.mergeObj(clone(autoExcelAll),EDf.PchartValue,EDf.Month);
				EDf.monthNum = autoMonthArr.length;
				EDf.fileName = fileName;
				var TeamArr = _.pluck(autoExcelAll,EDf.Team);
				TeamArr = _.uniq(TeamArr,false);
				EDf.TeamArr = TeamArr;
				localStorage.setItem('ExcelData',  JSON.stringify(EDf));
//				sessionStorage.setItem('sessionExcelData',  JSON.stringify(EDf));
				sessionStorage.removeItem('sessionExcelData');
				saveSession = localStorage.getItem('sessionExcelData');
				saveLocal = localStorage.getItem('ExcelData');
				refreshTotalAndFilter();
				skipPage();
            }
        });
    }
}
function fixdata(data) { 
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}



$('.autoLoading').click(function(){
//	localStorage.removeItem('ExcelData');
	autoLoadingExcel();
	
})


	
function searchData(){
	//开始日期
	var STime = $('.TotalInfoModule .DInfoBox.SearchBox .StartTime button').text();
	//结束日期
	var ETime = $('.TotalInfoModule .DInfoBox.SearchBox .EndTime button').text();
	//所选择团队
	var selT = $('.TotalInfoModule .DInfoBox.SearchBox .TeamSelect button').text();
	
	var st = STime.split("/");
	var et = ETime.split("/");
	
	var localData = JSON.parse(saveLocal);
	var startTime = new Date(st[0],st[1]).getTime();
	var endTime = new Date(et[0],et[1]).getTime();
	var selExcelAll = _.filter(localData.excelAll,function(filter){
		var selTime = filter[localData.Month].split("/");
		var currentTime = new Date(selTime[0],selTime[1]).getTime();
		return (currentTime>=startTime)&&(currentTime<=endTime);
	})
	console.log(localData.excelTag1)
	var selExcelTag1 = _.filter(localData.excelTag1,function(filter){
		var selTime = filter[localData.Month].split("/");
		var currentTime = new Date(selTime[0],selTime[1]).getTime();
		return (currentTime>=startTime)&&(currentTime<=endTime);
	})
	var selExcelTag2 = _.filter(localData.excelTag2,function(filter){
		var selTime = filter[localData.Month].split("/");
		var currentTime = new Date(selTime[0],selTime[1]).getTime();
		return (currentTime>=startTime)&&(currentTime<=endTime);
	})
	var currentTeam = _.indexOf(localData.TeamArr,selT);
	if(currentTeam>-1){
		selExcelAll = _.filter(selExcelAll,function(filter){
			return filter[localData.Team] == localData['TeamArr'][currentTeam]
		})
		selExcelTag1 = _.filter(selExcelTag1,function(filter){
			return filter[localData.Team] == localData['TeamArr'][currentTeam]
		})
		selExcelTag2 = _.filter(selExcelTag2,function(filter){
			return filter[localData.Team] == localData['TeamArr'][currentTeam]
		})
	}
	var sessionData = clone(localData);
	
	sessionData.TeamSel = selT;
	sessionData.StartTime = STime;
	sessionData.EndTime = ETime;
	sessionData.excelAll = selExcelAll;
	sessionData.excelTag1 = selExcelTag1;
	sessionData.excelTag2 = selExcelTag2;
	sessionStorage.setItem('sessionExcelData',JSON.stringify(sessionData));
	saveSession = sessionStorage.getItem('sessionExcelData');
	refreshTotalAndFilter();
	skipPage();
}

//Hour间节点内 月份
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() - 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
//日期分割
function getDateForStringDate(strDate){
	//切割年月日与Hour分秒称为数组
	var s = strDate.split(" "); 
	var s1 = s[0].split("/"); 
	if(s.length==1){
		var s2 = ['08','00','00'];		
	}else if(s.length==2){
		var s2 = s[1].split(':');
	}
	if(s1.length==2){
		s1.push('01');
	}
	return new Date(s1[0],s1[1]-1,s1[2],s2[0],s2[1],s2[2]);
}

//bootstrap
$('[data-toggle="tooltip"]').tooltip();

$(window).bind('hashchange', function() {
   	skipPage();
});


function refreshTotalAndFilter(){
	if(saveLocal){
		var ED = [];
		if(saveSession){
			ED = JSON.parse(saveSession)				
		}else{
			ED = JSON.parse(saveLocal);	
		}
		var searchDate = [];
		
		
		$('.SearchBox .dropdown-menu').on('click','a',function(){
			$(this).parents('.dropdown-menu').siblings('button').html($(this).text());
		})
		
		var TotalData = JSON.parse(saveLocal);
		
//		sessionStorage.setItem('sessionExcelData',  saveLocal);
//		saveSession = sessionStorage.getItem('sessionExcelData');
		
		//总的team数
		var TotalTeam = _.pluck(TotalData.excelAll,ED.Team);
		TotalTeam = _.uniq(TotalTeam,false);
		
		//计算所有的Hour间节点
		var TotalTime = _.pluck(TotalData.excelAll,ED.Month);
		TotalTime = _.uniq(TotalTime,false);
		TotalTime = _.sortBy(TotalTime,function(time){
			time = new Date(time).getTime();
			return time
		})
		
		var ST = '',ET = '',TeamS = '';
		if(ED.EndTime){
			ST = ED.StartTime;
			ET = ED.EndTime;
			TeamS = ED.TeamSel;
		}else{
			ST = TotalTime[0];
			ET = TotalTime[TotalTime.length-1];
			TeamS = 'All Team';
		}
		$('.TotalInfoModule .DInfoBox.SearchBox .StartTime button').html(ST)
		$('.TotalInfoModule .DInfoBox.SearchBox .EndTime button').html(ET)
		$('.TotalInfoModule .DInfoBox.SearchBox .TeamSelect button').html(TeamS)
		
		$('.searchT button').click(function(e){
			var thisParent = $(this).parent();
			thisParent.find('.dropdown-menu').html('');
			if(!thisParent.hasClass('open')){
				var sibTime = thisParent.siblings('.dropdown').find('button').text();
				var index = sibTime?(_.indexOf(TotalTime,sibTime)):-1;
				if(thisParent.hasClass('StartTime')){
					if(index>=0){
						var currentTime = _.initial(TotalTime,TotalTime.length-index-1)
						currentTime.forEach(function(item){
							thisParent.find('.dropdown-menu').append(
								'<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >'+ item +'</a></li>'
							)
						})
					}else{
						TotalTime.forEach(function(item){
							thisParent.find('.dropdown-menu').append(
								'<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >'+ item +'</a></li>'
							)
						})
					}
				}else if(thisParent.hasClass('EndTime')){
					if(index>=0){
						var currentTime = _.last(TotalTime,TotalTime.length-index);
						currentTime.forEach(function(item){
							thisParent.find('.dropdown-menu').append(
								'<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >'+ item +'</a></li>'
							)
						})
					}else{
						TotalTime.forEach(function(item){
							thisParent.find('.dropdown-menu').append(
								'<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" >'+ item +'</a></li>'
							)
						})
					}
				}else{
					return 
				}
			}else{
				return 
			}
		})
		
		//计算总数
		var TotalEmployee = fileImport.mergeObj(clone(ED.excelAll),ED.PchartValue,ED.EmployeeNO);
		
		//各teamperson数
		var EachTeamNumArr = countNum(TotalTeam,TotalEmployee,ED.Team);
		//各team工Hour
		var EachTeamTimeArr = countTime(TotalTeam,clone(ED.excelAll),ED.Team,ED);
		//清空数据
		$('.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamNum tbody,.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamTime tbody,.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamNum tbody,.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamIndiv tbody').html('')
		$('.TotalInfoModule .DInfoBox .searchB .dropdown-menu').html(
			 '	<li role="presentation">'
			+'		<a role="menuitem" tabindex="-1" href="javascript:void(0)" >All Team</a>'
			+'	</li>'
		)
		TotalTeam.forEach(function(item,i){
			$('.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamNum tbody').append(
				 '		<tr>'
				+'			<td>'+ item +'</td>'
				+'			<td><span class="">'+ EachTeamNumArr[i] +'</span> person</td>'
				+'		</tr>'
			);
			$('.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamTime tbody').append(
				 '		<tr>'
				+'			<td>'+ item +'</td>'
				+'			<td><span class="">'+ EachTeamTimeArr[i].toFixed(1) +'</span> Hour</td>'
				+'		</tr>'
			);
			$('.TotalInfoModule .EachModule .DInfoBox .DInfo .Dbox .TeamIndiv tbody').append(
				 '		<tr>'
				+'			<td>'+ item +'</td>'
				+'			<td>'
				+'				<span class="">'+
					(isNaN((EachTeamTimeArr[i]/EachTeamNumArr[i]).toFixed(1))?0:(EachTeamTimeArr[i]/EachTeamNumArr[i]).toFixed(1))
				+'				</span> hour/person</td>'
				+'		</tr>'
			);
			$('.TotalInfoModule .DInfoBox .searchB .dropdown-menu').append(
			 	 '	<li role="presentation">'
				+'		<a role="menuitem" tabindex="-1" href="javascript:void(0)" >'+ item +'</a>'
				+'	</li>'
			)
		})

		//总person数
		$('.EmployeeNum').html(TotalEmployee.length);
		
		
		//总工Hour
		var TotalT = 0;
		var countTT = clone(ED.excelAll);
		for(var tt=0;tt<countTT.length;tt++){
			if(!isNaN(parseFloat(countTT[tt][ED.PchartValue]))){
				TotalT+=parseFloat(countTT[tt][ED.PchartValue]);
			}
		}
		$('.TotalTimeNum').html(TotalT.toFixed(1))
	
		//individual数据
		$('.TotalIndividualNum').html((TotalT/TotalEmployee.length).toFixed(1));
		
//		$('.TotalInfoModule .moduleSearch').css('height',$('.TotalInfoModule .EachModule').eq(0).height())
	}else{
//		alert('请上传表格')
	}
}


//统计--帅选
//$('.TotalInfoModule').load('./views/tAndf.html',function(){
//	refreshTotalAndFilter();
//})


$('.TotalInfoModule').html(
	'<ul class="clearfix">'+
	'	<li class="EachModule fl">'+
	'		<div class="DInfoBox">'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<div class="DNum"><span class="EmployeeNum">0</span> person</div>'+
	'					<div class="DType">employee</div>'+
	'				</div>'+
	'			</div>'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<table class="TeamNum">'+
	'						<tbody>'+
	'						</tbody>'+
	'					</table>'+
	'				</div>'+
	'			</div>'+
	'		</div>'+
	'	</li>'+
	'	<li class="EachModule fl">'+
	'		<div class="DInfoBox">'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<div class="DNum"><span class="TotalTimeNum">0</span> Hour</div>'+
	'					<div class="DType">workload</div>'+
	'				</div>'+
	'			</div>'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<table class="TeamTime">'+
	'						<tbody>'+
	'						</tbody>'+
	'					</table>'+
	'				</div>'+
	'			</div>'+
	'		</div>'+
	'	</li>'+
	'	<li class="EachModule fl">'+
	'		<div class="DInfoBox">'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<div class="DNum"><span class="TotalIndividualNum">0</span> hour/person</div>'+
	'					<div class="DType">individual</div>'+
	'				</div>'+
	'			</div>'+
	'			<div class="DInfo">'+
	'				<div class="Dbox">'+
	'					<table class="TeamIndiv">'+
	'						<tbody>'+
	'						</tbody>'+
	'					</table>'+
	'				</div>'+
	'			</div>'+
	'		</div>'+
	'	</li>'+
	'</ul>'+
	'	<div class="moduleSearch">'+
	'		<div class="DInfoBox SearchBox">'+
	'			<div class="searchT">'+
	'				<div class="dropdown StartTime">'+
	'					<button type="button" class="btn dropdown-toggle" id="dropdownMenu1" '+
	'							data-toggle="dropdown">'+
	'						 --'+
	'					</button>'+
	'					<span class="caret"></span>'+
	'					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">'+
	'					</ul>'+
	'				</div>'+
	'				<div class="wd">至</div>'+
	'				<div class="dropdown EndTime">'+
	'					<button type="button" class="btn dropdown-toggle" id="dropdownMenu2" '+
	'							data-toggle="dropdown">'+
	'						 --'+
	'					</button>'+
	'					<span class="caret"></span>'+
	'					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">'+
	'					</ul>'+
	'				</div>'+
	'			</div>'+
	'			<div class="searchB">'+
	'				<div class="dropdown TeamSelect">'+
	'					<button type="button" class="btn dropdown-toggle" id="dropdownMenu3" '+
	'							data-toggle="dropdown">'+
	'						 All Team'+
	'					</button>'+
	'					<span class="caret"></span>'+
	'					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">'+
	'					</ul>'+
	'				</div>'+
	'				<button type="button" class="btn btn-info searchBtn" onclick="searchData()">查询</button>'+
	'			</div>'+
	'		</div>'+
	'	</div>'
)
refreshTotalAndFilter();
