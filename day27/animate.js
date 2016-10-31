function getStyle(obj,attr){
				var value;
			   if(obj.currentStyle){
				    value=obj.currentStyle[attr]; 
				 }else{
				   value=window.getComputedStyle(obj,false)[attr];
				 }
				 //console.log(value);
				 if(attr=="opacity"){
					 value= Math.round(value*100);
				 }else{
					 value= parseInt(value);
				 }
				 if(isNaN(value)){
					 value=0;
				 }
				 return value;
}
function parabola(div1,div2,step,span){
				// 设定a的值
				var a= 0.003;
				// 设定b的值
				//计算目标点的相对坐标
				var rp={
					x:div2.offsetLeft-div1.offsetLeft,
					y:div2.offsetTop-div1.offsetTop
				}
				// console.log("div1.left,div1.top:"+ div1.offsetLeft+" "+div1.offsetTop);
				// console.log("div2.left,div2.top:"+ div2.offsetLeft+" "+div2.offsetTop);
				// console.log(rp.x+" "+rp.y);
				var b= (rp.y-a*rp.x*rp.x)/rp.x;
				//console.log(b);
				//运动
				//保存div1的初始坐标
				var center={
					x:div1.offsetLeft,
					y:div1.offsetTop
				}
				//var step =5;
				var offsetx=0;
				var count= Math.floor(rp.x/step);
				var subWidth= (div1.offsetWidth/count);
				var subHeight=(div1.offsetHeight/count);
				
				console.log(div1.offsetWidth+" "+count)
				console.log("宽高变化量："+subWidth+" "+subHeight);
				
				var timer= setInterval(function(){
					offsetx = offsetx+step;
					div1.style.left= center.x+ offsetx+"px";
					div1.style.top= center.y + (a*offsetx*offsetx+b*offsetx)+"px";

					div1.style.width= div1.offsetWidth- subWidth+"px";
					div1.style.height= div1.offsetHeight-subHeight+"px";
					
					console.log("width:"+div1.offsetWidth+" "+ subWidth);
					console.log("height:"+div1.offsetHeight+" "+subHeight);
					console.log(div1.style.width+" "+div1.style.height);
					
					if(offsetx>=rp.x){
						div1.style.left=div2.offsetLeft+"px";
						div1.style.top= div2.offsetTop+"px";
						clearInterval(timer);
					}
				},span);
				
}
function move(obj,attr,target,span){
	clearInterval(obj.timer);
	// console.log(span);
	if(!span){
		span=10;
	}
	obj.timer=setInterval(function(){
		var icur= getStyle(obj,attr);
		// console.log(icur);
		var step= (target-icur)/10;
		step= step>0? Math.ceil(step):Math.floor(step);
		
		console.log(icur+" "+step);
		if(icur!=target){
			if(attr=="opacity"){
				obj.style[attr]= (icur+ step)/100 ;
				obj.style.filter= "alpha(opacity="+(icur+step)+")";
				// console.log(obj.style[attr]);
			}else{
				obj.style[attr]= icur+ step +"px";
			}
			//console.log(obj.style[attr]);
		}else{
			clearInterval(obj.timer);
		}
	},span);
	
}
function move2(obj,attr,target,fn,span){
	clearInterval(obj.timer);
	// console.log(span);
	if(!span){
		span=10;
	}
	obj.timer=setInterval(function(){
		var icur= getStyle(obj,attr);
		// console.log(icur);
		var step= (target-icur)/10;
		step= step>0? Math.ceil(step):Math.floor(step);
		
		console.log(icur+" "+step);
		if(icur!=target){
			if(attr=="opacity"){
				obj.style[attr]= (icur+ step)/100 ;
				// console.log(obj.style[attr]);
			}else{
				obj.style[attr]= icur+ step +"px";
			}
			//console.log(obj.style[attr]);
		}else{
			clearInterval(obj.timer);
      if(fn){
				fn();
			}
			
		}
	},span);
	
}
//{left:500,top:500,width:500}
function move3(obj,json,fn,span){
	clearInterval(obj.timer);
	// console.log(span);
	if(!span){
		span=10;
	}
	//var flag;
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in json){
			var target=json[attr];
			var icur= getStyle(obj,attr);
			// console.log(icur);
			var step= (target-icur)/10;
			step= step>0? Math.ceil(step):Math.floor(step);
			
			//console.log(attr+":"+icur+" "+step);
			if(icur!=target){
				flag=false;
				if(attr=="opacity"){
					obj.style[attr]= (icur+ step)/100 ;
					// console.log(obj.style[attr]);
				}else{
					obj.style[attr]= icur+ step +"px";
				}
				//console.log(obj.style[attr]);
			}
			
		}
		if(flag){//当flag=true ，表示所有的属性都已经到达目标值
				clearInterval(obj.timer);
				if(fn){
					//console.log("animate.js this:"+this)
					fn();
				}
		}
	},span);
	
}

function moveUni(obj,attr,target,span){
	clearInterval(obj.timer);
	// console.log(span);
	if(!span){
		span=10;
	}
	obj.timer=setInterval(function(){
		var icur= getStyle(obj,attr);
		var step=10;
		
		console.log(icur+" "+step);
		if(icur<target){
			if(attr=="opacity"){
				obj.style[attr]= (icur+ step)/100 ;
			}else{
				obj.style[attr]= icur+ step +"px";
			}
		}else{
			clearInterval(obj.timer);
		}
	},span);
	
}