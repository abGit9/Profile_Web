
var landscape;
var width_landscape;
var height_landscape;



function find_landscape(){
	landscape =  document.getElementById('landscape');
}


function retrieve_landscape_width_height(){
	width_landscape = landscape.getBoundingClientRect().width;
	height_landscape = landscape.getBoundingClientRect().height;
	console.log('#########width_landscape:'+width_landscape);
}


function set_ground(){
	var ground = document.getElementById('ground');	
	ground.style.width = width_landscape+ 'px';
	ground.style.height = height_landscape * 0.4 +'px';
	ground.style.top = height_landscape * 0.6 + 'px';

}





function set_mountains(){
	var mountains = document.getElementsByClassName('mountains');
	mountains[0].style.height = .70 * height_landscape + 'px';
	mountains[0].style.width = 'auto';
	mountains[0].style.top =.15 * height_landscape + 'px';


	mountains[1].style.height = 1.2* height_landscape + 'px';
	mountains[1].style.width = 'auto';
	mountains[1].style.left = height_landscape +'px';
	mountains[1].style.top = 0+'px';

	mountains[2].style.height = 1.2* height_landscape+'px';
	mountains[2].style.width = 'auto';
	mountains[2].style.left = width_landscape -(height_landscape *0.70)+ 'px';
	mountains[2].style.top = -40 +'px';	
}



var trees_height= [60,70,80,50,75,60,55,65,75,50,75,60];
var trees_top;
var trees_left;

function set_Trees(){

	var trees = document.getElementsByClassName('trees');
	trees_top = [height_landscape * 0.65,height_landscape * 0.50 ,height_landscape*0.6,height_landscape *0.45,
	height_landscape *0.5,height_landscape *0.75 ,height_landscape *0.4,height_landscape *0.45,height_landscape *0.65,height_landscape * 0.70 ,height_landscape*0.6,height_landscape *0.6 ];



	trees_left = [width_landscape * 0.05,width_landscape *0.1,width_landscape * 0.15 ,width_landscape*0.25,width_landscape *0.28,width_landscape *0.3,width_landscape *0.55,width_landscape * 0.62,width_landscape *0.65,width_landscape *0.75,width_landscape*0.8,width_landscape *0.9 ];
	
	console.log('trees length:'+trees.length);
	for(var i =0 ;i<trees.length;i++){
		trees[i].style.height = trees_height[i]+'px';
		trees[i].style.width = 'auto';
		trees[i].style.top = trees_top[i] +'px';
		trees[i].style.left = trees_left[i] +'px';
	}

	for(var i = 0 ; i < trees.length; i++){
		var height = trees[i].getBoundingClientRect().height;

		trees_skewXY.push(0);		
		trees_skewXY_dir.push(true);		
	}
	
}
var trees_skewXY_left = [-9,-10,-10,-9,-10,-9,-7,-10,-9,-10,-7,-10];
//var trees_skewXY_right = [9,10,10,9,10,9,7,10,9,10,7,10];
//var trees_skewXY_right = [5,4,5,5,5,4,5,5,4,5,5,4];
//var trees_skewXY_left = [-5,-5,-4,-5,-4,-5,-5,-4,-5,-4,-5,-5];
//var trees_skewXY_left = [0,0,0,0,0,0,0,0,0,0,0,0];
var trees_skewXY_right = [0,0,0,0,0,0,0,0,0,0,0,0];
var trees_skewXY = [];
var trees_skewXY_delta = [0.10,0.15,0.12,0.13,0.14,0.15,0.13,0.12,0.15,0.13,0.14,0.12];

var trees_skewXY_dir =[];
function update_trees_windy(){
	var trees = document.getElementsByClassName('trees');
	for(var i = 0; i < trees.length; i++){
		trees_skewXY[i] = trees_skewXY_dir[i]?
		Math.min(trees_skewXY_right[i],trees_skewXY[i]+trees_skewXY_delta[i]):
		Math.max(trees_skewXY_left[i],trees_skewXY[i]-trees_skewXY_delta[i])	
		//var state = 'skew('+trees_skewXY[i]+'deg,'+trees_skewXY[i]+'deg)';	
		//var state = 'skew('+trees_skewXY[i]+'deg)';		
		var state = 'skew('+0+'deg,'+trees_skewXY[i]+'deg)';	
		//console.log(i+'   trees state:'+state);
		set_transform_state(trees[i],state);
		if(trees_skewXY[i] == trees_skewXY_right[i] )trees_skewXY_dir[i] =false;
		if(trees_skewXY[i] == trees_skewXY_left[i] )trees_skewXY_dir[i] =true;
	}

}


var num_stars = 35;
var star_width_height =7;
var star_classes = ['stars_0','stars_1','stars_2'];
var stars_dir = [true,true, true];
var stars_rates = [0.005,0.002,0.0008];

function set_stars(){

	var height_range = 0.5 * height_landscape;
	var width_range = width_landscape;		
	
	for(var i = 0; i < num_stars; i++ ){

		var child = document.createElement("DIV");
		child.style.width = star_width_height +'px';
		child.style.height = star_width_height +'px';		
		child.style.top = height_range * Math.random()+ 'px';
		child.style.left =  width_range * Math.random()+ 'px';
		child.className = star_classes[i%star_classes.length];
		child.style.opacity = '0.0';		
		landscape.insertBefore(child, landscape.childNodes[0]);	
	}	

}

function update_stars(){
	for(var i = 0 ; i < star_classes.length; i++)update_stars_class(i);	
}

function update_stars_class(stars_idx){
	stars = document.getElementsByClassName('stars_'+stars_idx);	
	var opacity = stars_dir[stars_idx]?
	Math.min(1.0,parseFloat(stars[stars_idx].style.opacity)+stars_rates[stars_idx]):
	Math.max(0.0,parseFloat(stars[stars_idx].style.opacity)-stars_rates[stars_idx]);

	for(var i = 0 ; i<stars.length; i++){		
		stars[i].style.opacity = opacity.toString();		
	}	
	if(opacity == 1.0)stars_dir[stars_idx] = false;
	if(opacity == 0.0)stars_dir[stars_idx] = true;	
}


function set_transform_state(icon,stateValue){
	icon.style.webkitTransform = stateValue;				
	icon.style.MozTransform = stateValue;
	icon.style.msTransform = stateValue;
	icon.style.OTransform = stateValue;
	icon.style.transform = stateValue;	
}



function update_birds(){
	update_birds_rotation();
	update_birds_horizontal_location();	
}


function update_birds_rotation(){

	var birds = document.getElementsByClassName('birds');

	for(var i = 0 ; i < birds.length; i++){
		
		birds_rotateY_curr[i] = birds_dir_rotation[i]?
		Math.max(birds_rotateY_end[i],birds_rotateY_curr[i] - birds_rotate_y_delta[i]):
		Math.min(birds_rotateY_start[i],birds_rotateY_curr[i] + birds_rotate_y_delta[i]);


		if(birds_rotateY_curr[i] == birds_rotateY_end[i])birds_dir_rotation[i]=false;
		if(birds_rotateY_curr[i] == birds_rotateY_start[i])birds_dir_rotation[i]= true;
		var stateValue = 'rotateY('+birds_rotateY_curr[i]+'deg)';
		
		set_transform_state(birds[i],stateValue);
	}

}




function update_birds_horizontal_location(){

	var birds = document.getElementsByClassName('birds');
	
	for(var i = 0 ; i < birds.length; i++){
		
		birds_loc_left[i] = birds_dir_horizontal[i]?
		Math.min(width_landscape,birds_loc_left[i] +birds_horizontal_delta[i]):
		Math.max(-birds_width[i],birds_loc_left[i] -birds_horizontal_delta[i]);

		birds[i].style.left = birds_loc_left[i]+'px';
		
		if(birds_dir_horizontal[i] && birds_loc_left[i] == width_landscape)
			birds_loc_left[i] = -birds_width[i];			
		if(!birds_dir_horizontal[i] && birds_loc_left[i] == -birds_width[i])
			birds_loc_left[i] = width_landscape+birds_width[i];
		

	}

}
var birds_dir_rotation = [true,true,true,true,true,true,true,true,true,true,true,true];
var birds_width= [25,25,25,25,25,25,25,25,25,25,25,25];
var birds_dir_horizontal = [true,false,true,false,true,false,true,false,true,false,true,false];
var birds_rotate_y_delta =[1.4,1.0,1.2,1.5,0.9,1.4,1.0,1.2,1.5,0.9,0.9,1.4];
//var birds_rotate_x_delta =[2.4,3.0,1.2,1.5,0.9];
var birds_rotateY_curr =[];
var birds_rotateY_start =[];
var birds_rotateY_end = [];
var birds_loc_left =[];
var birds_loc_top =[75,50,25,20,70,10,30,60,5,40,15,55];
//var birds_horizontal_delta =[0.5,0.45,0.4,0.55,0.3];
var birds_horizontal_delta =[1.5,1.9,1.6,0.9,1.2,1.0,1.5,2.3,1.0,0.9,0.8,1.1];

function set_birds(){
	var birds =  document.getElementsByClassName('birds');
	birds_loc_left.length =  birds.length;
	birds_rotateY_curr.length =  birds.length;
	birds_rotateY_start.length =  birds.length;
	birds_rotateY_end.length =  birds.length;

	for(var i = 0 ; i < birds.length; i++){
		birds[i].style.width = birds_width[i]+'px';
		birds[i].style.height = 'auto';	
		if(!birds_dir_horizontal[i]){
			set_transform_state(birds[i],'rotateY(180deg)');	
			birds_loc_left[i] = width_landscape;
			birds_rotateY_curr[i] = 180;
			birds_rotateY_start[i] = 180;
			birds_rotateY_end[i] = 130;
		}else {
			birds_loc_left[i] = -birds_width[i];
			birds_rotateY_curr[i] = 0;
			birds_rotateY_start[i] = 0;
			birds_rotateY_end[i] = -50;
		}	
		birds[i].style.left = birds_loc_left[i] +'px';
		birds[i].style.top = birds_loc_top[i] +'px';	
		birds[i].style.transformOrigin = '90% 0% 0';			
	}
}




function update_anim_frame(){
	update_stars();
	update_birds();
	update_trees_windy();
	if(class_displayed != null)update_attr_display();	
}

var display_attr_freq_adj = 100;
var display_attr_count ;
function update_attr_display(){

	if(++display_attr_count%display_attr_freq_adj != 0 )return;
	else if(class_displayed == 'birds')update_bird_display_attr();
	else if(class_displayed == 'trees')update_trees_display_attr();

}

var currentTarget;
function set_mouse_commands(){
	var birds = document.getElementsByClassName('birds');
	var trees = document.getElementsByClassName('trees');	

	for(var i = 0  ; i<birds.length; i++){
		birds[i].onmouseover  = function(e){
			mouse_over_display_attr(e.currentTarget);				
		};
	}
	for(var i = 0  ; i<trees.length; i++){
		trees[i].onmouseover  = function(e){
			mouse_over_display_attr(e.currentTarget);			
		};
	}

	
	document.getElementById('content_container_2').onclick = function(){
		click_disapper_display_attr();
	};
	
}

function mouse_over_display_attr(new_target){
	if(currentTarget != null)
		currentTarget.style.background ='transparent';
	currentTarget = new_target;
	currentTarget.style.background = '#CCBFBFBF';	
	idx_display = parseInt(new_target.id);
	class_displayed = new_target.className;	
	display_attr_count = -1;	
}


function click_disapper_display_attr(){
	currentTarget.style.background = 'transparent';
	currentTarget = null;
	class_displayed = null;
	attr_val_array.length = 0;
	display_attr_count = -1;
	idx_display = -1;
	update_element_attributes_display();
}



var idx_display = -1; 
var class_displayed ='' ;


function update_bird_display_attr(){
	
	var birds = document.getElementsByClassName('birds');
	attr_val_array.length = 0;
	attr_val_array.push('Element:'+birds[idx_display].id);
	attr_val_array.push('left:'+birds[idx_display].style.left);	
	attr_val_array.push('top:'+birds[idx_display].style.top);
	attr_val_array.push('rotateY:'+Math.round(birds_rotateY_curr[idx_display]*100)/100+' deg');
	
	update_element_attributes_display();
}
function update_trees_display_attr(){
	
	var trees = document.getElementsByClassName('trees');
	attr_val_array.length = 0;
	attr_val_array.push('Element:'+trees[idx_display].id);
	attr_val_array.push('skewY:'+Math.round(trees_skewXY[idx_display]*100)/100+' deg');		
	
	update_element_attributes_display();
}


var attr_val_array =[];
var attribute_val_display=  document.getElementById('attribute_val_display');


function update_element_attributes_display(){	
	
	for(var i =0; i <attribute_val_display.children.length; i++){

		if(i < attr_val_array.length){
			attribute_val_display.children[i].innerHTML  = attr_val_array[i];
			attribute_val_display.children[i].style.flex = '1';
		}else{
			attribute_val_display.children[i].innerHTML  = '';
			attribute_val_display.children[i].style.flex = '0';
		}
		
	}
}


var interval = 10;
function start_landscape_anim(){
	window.setInterval(update_anim_frame,interval);
}


function set_up_custom_landscape(){
	find_landscape();
	retrieve_landscape_width_height();
	set_ground();
	set_mountains();
	set_Trees();
	set_stars();
	set_birds();	
	set_mouse_commands();
	start_landscape_anim();
}





