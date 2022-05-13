var in_progress = false;
var timer;

var base_width;
var base_height;

var scalable_containers;

//x and y scale 
x_curr = [];
y_curr = [];

x_end = [];
y_end = [];

x_delta = [];
y_delta = [];

var rate_x_scale_open_px = 0.01;
var rate_y_scale_open_px = 0.01;

var timing_interval =  1;

var width_dir_array;
var height_dir_array;

var ref_diff;


var current_Target;

function calculate_open_container_scaling_differences(idx){	
	ref_diff =  Math.max( 1.5 - x_curr[idx],1.5 - y_curr[idx]);
}


function set_up_container_shifting(){
	console.log('set_up_container_shifting');
	find_scalable_group();
	position_scalable_containers();
	retrieve_base_height_width();	
	initialize_progress_data();		
	set_click_listeners();	
}

function find_scalable_group(){
	scalable_containers = document.getElementsByClassName('scalable_container');
}

function position_scalable_containers(){

	for(var i = 0 ; i <scalable_containers.length; i++){
		scalable_containers[i].style.width = window.innerWidth * 0.5 +'px';
		scalable_containers[i].style.height = window.innerHeight * 0.5+'px';
	}
	
	scalable_containers[1].style.left = window.innerWidth * 0.5+'px';
	scalable_containers[2].style.top =  window.innerHeight * 0.5 + 'px';
	scalable_containers[3].style.left =  window.innerWidth * 0.5 +'px';
	scalable_containers[3].style.top =  window.innerHeight * 0.5+'px';

}

function start_timer(){
	timer = window.setInterval(set_curr_scales, timing_interval);
	in_progress = true;
}
function stop_timer(){
	window.clearInterval(timer);	
	in_progress = false;	
}

function print_values(){

	for(var i = 0; i < scalable_containers.length; i++){
		console.log('-------------------------------i:'+i);
		console.log('x_curr'+x_curr[i]);
		console.log('y_curr'+y_curr[i]);
		console.log('x_end'+x_end[i]);
		console.log('y_end'+y_end[i]);
		console.log('x_delta'+x_delta[i]);
		console.log('y_delta'+y_delta[i]);	
	}


}

function print_element_values(idx){
	console.log('---------------------idx values:'+idx);
	console.log('left:'+scalable_containers[idx].style.left);
	console.log('right:'+scalable_containers[idx].style.right);
	console.log('top:'+scalable_containers[idx].style.top);
	console.log('bottom:'+scalable_containers[idx].style.bottom);
	console.log('width:'+scalable_containers[idx].style.width);
	console.log('height:'+scalable_containers[idx].style.height);

}
function initialize_progress_data(){

	for(var i = 0; i < scalable_containers.length; i++){
		x_curr.push(1.0);
		y_curr.push(1.0);
		x_end.push(1.0);
		y_end.push(1.0);
		x_delta.push(0.0);
		y_delta.push(0.0);	
	}
}
function retrieve_base_height_width(){
	var rect_main_0 =  scalable_containers[0].getBoundingClientRect();
	base_width = rect_main_0.width;
	base_height = rect_main_0.height;
	console.log('base_width:'+base_width);
	console.log('base_height:'+base_height);
}


		
function update_scale_container(container,scale){

	container.style.webkitTransform = scale;			
	container.style.MozTransform = scale;
	container.style.msTransform = scale;
	container.style.OTransform = scale;
	container.style.transform = scale;	

}
function expand_main_0(){
	calculate_open_container_scaling_differences(0);
	set_end_values_and_rates(0, 1.5, 1.5);
	set_end_values_and_rates(1, 0.5, 0.5);
	set_end_values_and_rates(2, 1.5, 0.5);
	set_end_values_and_rates(3, 0.5, 1.5);	
	if(!in_progress)start_timer();
}
function expand_main_1(){
	calculate_open_container_scaling_differences(1);
	set_end_values_and_rates(0, 0.5, 1.5);
	set_end_values_and_rates(1, 1.5, 1.5);
	set_end_values_and_rates(2, 0.5, 0.5);
	set_end_values_and_rates(3, 1.5, 0.5);	
	if(!in_progress)start_timer();
}
function expand_main_2(){
	calculate_open_container_scaling_differences(2);
	set_end_values_and_rates(0, 1.5, 0.5);
	set_end_values_and_rates(1, 0.5, 1.5);
	set_end_values_and_rates(2, 1.5, 1.5);
	set_end_values_and_rates(3, 0.5, 0.5);	
	if(!in_progress)start_timer();
}
function expand_main_3(){
	calculate_open_container_scaling_differences(3);
	set_end_values_and_rates(0, 0.5, 0.5);
	set_end_values_and_rates(1, 1.5, 0.5);
	set_end_values_and_rates(2, 0.5, 1.5);
	set_end_values_and_rates(3, 1.5, 1.5);	
	if(!in_progress)start_timer();
}



function set_end_values_and_rates(idx, x, y){

	x_end[idx] = x;
	y_end[idx] = y;
	
	var x_diff = x_end[idx] - x_curr[idx];
	var y_diff = y_end[idx] - y_curr[idx];
	x_delta[idx] = x_diff === 0 ? 0: x_diff/Math.abs(ref_diff)*rate_x_scale_open_px;
	y_delta[idx] = y_diff === 0 ? 0: y_diff/Math.abs(ref_diff)*rate_y_scale_open_px;
	
	
}
function update_curr_values(idx){	
	if(x_curr[idx] === x_end[idx] && y_curr[idx] === y_end[idx])	
		return true;	

	x_curr[idx] += x_delta[idx];
	y_curr[idx] += y_delta[idx];

	x_curr[idx] = x_delta[idx] >= 0?Math.min(x_curr[idx],x_end[idx])
		:Math.max(x_curr[idx],x_end[idx]);

	y_curr[idx] = y_delta[idx] >= 0?Math.min(y_curr[idx],y_end[idx])
		:Math.max(y_curr[idx],y_end[idx]);


	return false;
}

function set_curr_scales(){
	console.log('****set_curr_scales');
	var done = true;		
	for(var i = 0 ; i < scalable_containers.length; i++){
		if(!update_curr_values(i))done = false;
		else continue;		
		update_scale_container(scalable_containers[i],'scale('+ x_curr[i]+','+y_curr[i]+')');	
		print_element_values(i);	
	}

	if(done)stop_timer();
	//STOP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!	
	
}


function set_click_listeners(){

		scalable_containers[0].onmouseover  = function(e){						
			if( e.currentTarget.id === current_Target)return;
			current_Target =  e.currentTarget.id;			
			if(in_progress)	stop_timer();			
			expand_main_0();			
		}
		scalable_containers[1].onmouseover  = function(e){			
			if( e.currentTarget.id === current_Target)return;			
			current_Target=  e.currentTarget.id;
			if(in_progress)	stop_timer();			
			expand_main_1();					
		}
		scalable_containers[2].onmouseover  = function(e){			
			if( e.currentTarget.id === current_Target)return;
			current_Target =  e.currentTarget.id;
			if(in_progress)	stop_timer();			
			expand_main_2();		
		}
		scalable_containers[3].onmouseover  = function(e){						
			if( e.currentTarget.id === current_Target)return;
			current_Target =  e.currentTarget.id;
			if(in_progress)stop_timer();			
			expand_main_3();					
		}
}



