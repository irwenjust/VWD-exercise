var mySquareObj=function(){
	this.x;
	this.y;
	this.isLive;	
	this.len;     //Length of square
	this.color;
	this.toDownSpeed;		//Row speed
	this.toVSpeed;			//Column speed
}
var jump_count=0;
var judge_outline=0;
mySquareObj.prototype.init=function(){
	this.isLive=true;
	this.x=0;
	this.y=0;
	this.len=40;
	this.toDownSpeed=0;
	this.toVSpeed=0;
	this.color=squareColor[0];
}
mySquareObj.prototype.jump=function(){
	if(this.isLive){
		this.toDownSpeed=-15;
		this.toVSpeed=1;
		//alert(jump_count);
		if(this.x+this.len>canWidth){
			this.x=canWidth-this.len;
		}		
	 }
}
mySquareObj.prototype.toDown=function(){
	if(this.isLive){
		this.toDownSpeed+=9.8*1*0.06;
		this.y+=this.toDownSpeed;
		this.x+=this.toVSpeed;
		if(this.y+this.len>canHeight){
			this.isLive=false;
		}	
	}
}
mySquareObj.prototype.draw=function(){
	if(this.isLive){
		var now=Date.now();
		if(now-changeColorTime>1000){
			changeColorindex=(++changeColorindex)%changeTimeArrays.length;
			var strColor=""+squareColor[Math.floor(Math.random()*squareColor.length)];
			$("#colorChangeTime_div").css("color",strColor);
			$("#colorChangeTime_div").html(""+changeTimeArrays[changeColorindex]);
			if(changeColorindex==10){
				$("#colorChangeTime_div").css("font-size",colorChangeTimeW*0.15+"px");
				this.color=strColor;
			}else{
				$("#colorChangeTime_div").css("font-size",colorChangeTimeW*0.3+"px");
			}
			changeColorTime=now;
		}
		ctx2.fillStyle=this.color+"";
		//ctx2.rotate(45);
		ctx2.rect(this.x,this.y,this.len,this.len);
		ctx2.fill();
		ctx2.lineWidth=3;
		ctx2.radiusX=3;
		
		ctx2.strokeStyle="#ffffff";
		ctx2.stroke();
		if(this.x<-80||this.y<-60){
			this.isLive=false;
			judge_outline=1;
		}
	}else{
		restartInit();
	}
	this.toDown();
}
function restartInit(){
			AnimPX=new Array();
			AnimPY=new Array();
			changeColorindex=0;
			jump_count=0;
			$("#colorChangeTime_div").hide();
			beginAnim.init();
			beginGame=false;
			gameOver=true;
			lastTime=Date.now();
			$("#game_title").html("square&nbsp;J&nbsp;ump");
			$("#score").hide();
			$("#game_title").slideDown(500);
			$("#login_btn").delay(500).slideToggle(500);
			$("#login_btn").html("Try again");
			$("#state").show();
			$("#state").delay(500).slideDown(500);
			if(judge_outline==0) $("#state").html("Game over, score："+Math.floor(score));
			else $("#state").html("Outline, score："+Math.floor(score));
			judge_outline=0;
}
