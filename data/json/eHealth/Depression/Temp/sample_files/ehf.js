function setOpacity(id,level) {	element = document.getElementById(id);
	element.style.opacity = level;
	element.style.MozOpacity = level;
	element.style.KhtmlOpacity = level;
	element.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

function fadeIn(id){
	element = document.getElementById(id);
	for (i = 0; i <= 1; i = i + 0.03) {
		setTimeout("setOpacity('"+id+"',"+i+")", i * 1000);
	}
}

function fadeOut(id) {
	element = document.getElementById(id);
	for (i = 0; i <= 1; i = i + 0.03) {
		setTimeout("setOpacity('"+id+"'," + (1 - i) + ")", i * 1000);
	}
}

/*Functions for the category pages*/
function show_hide_img(forum_id){
	var plus_img = document.getElementById('plus_img_'+forum_id);
	if(plus_img.style.display=="none"){
		plus_img.style.display=""
	}else{
		plus_img.style.display="none"
	}
	var minus_img = document.getElementById('minus_img_'+forum_id);
	if(minus_img.style.display=="none"){
		minus_img.style.display=""
	}else{
		minus_img.style.display="none"
	}
}

function show_hide(id, forum_id) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		if (document.getElementById(id).style.display == "none"){
			document.getElementById(id).style.display = '';
		} else {
			document.getElementById(id).style.display = 'none';
		}
	} else {
		if (document.layers) {
			if (document.id.display == "none"){document.id.display = '';}
			else {document.id.display = 'none';}
		} else {
			if (document.all.id.style.visibility == "none"){document.all.id.style.display = '';}
			else {document.all.id.style.display = 'none';}
		}
	}
	show_hide_img(forum_id);
}

//this switches expand collapse icons
function filter(imagename,objectsrc){
	if (document.images){
		document.images[imagename].src=eval(objectsrc+".src");
	}
}

/*Functions for the category pages*/
//Resize images in the post content
function resizeImgs(maxHeight, maxWidth){
	var total_posts_obj = document.getElementById('hf_total_posts');
	if(total_posts_obj){
		var total_posts = total_posts_obj.value;
		for (var i = 0; i < total_posts; i++) {
			var post_text_container_id = i+'_post';
			var post_text_container_obj = document.getElementById(post_text_container_id);
			if(post_text_container_obj){
				var img = document.getElementById(post_text_container_id).getElementsByTagName('img');
				for (var j = 0; j < img.length; j++) {
					if (img[j].width > maxWidth){
						img[j].width = maxWidth;
					}
				}
			}
		}
	}
}

//Check if cookies are enabled or disabled
function check_cookie() {
	var c="cookietestwithjs=valid";
	document.cookie=c;
	if(document.cookie.indexOf(c)==-1){
		cookies_are_disabled = true;
	} else {
		cookies_are_disabled = false;
	}
	return cookies_are_disabled;
}
//Functions for setting and getting cookies
function set_cookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		//expires = expires * 1000 * 60 * 60 * 24;//Days
		expires = expires * 1000;//Seconds
	}
	var expires_date = new Date( today.getTime() + (expires) );
//	alert(expires_date);
	document.cookie = name + "=" +escape( value ) + ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + ( ( path ) ? ";path=" + path : "" ) + ( ( domain ) ? ";domain=" + domain : "" ) +( ( secure ) ? ";secure" : "" );
}

function get_cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');
//		alert(a_temp_cookie);

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


/*Scripts for the side poll*/
//AJAX AJAX POST REQUEST
function surveys_makePostAjaxRequest(url, params, callback_function, return_xml) {
	var http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { }
		}
   }
	if (!http_request) {
		alert('Unfortunatelly you browser doesn\'t support this feature.Try another browser please');
		return false;
	}
	http_request.open('POST', url, true);
	//Send the proper header information along with the request
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// http_request.setRequestHeader("Content-length", params.length);
	// http_request.setRequestHeader("Connection", "close");
	http_request.onreadystatechange = function() {
	   if (http_request.readyState == 4) {
		   if (http_request.status == 200) {
			   if (return_xml) {
				   eval(callback_function + '(http_request.responseXML)');
			   } else {
				   eval(callback_function + '(http_request.responseText)');
			   }
		   } else {
			   //alert('There was a problem with the request.(Code: ' + http_request.status + ')');
		   }
	   }
   }
   http_request.send(params);
}
//END AJAX POST REQUEST

function show_side_survey(ad_position_id, f_id){
	if(!ad_position_id){
		var ad_position_id = 0;
	}
	if(!f_id){
		var f_id = 0;
	}
	var url = "poll_display.php";
	var params = "ad_pos_id="+ad_position_id+"&f_id="+f_id;
	document.write('<div id="side_survey_box"></div>');
	surveys_makePostAjaxRequest(url, params, 'show_side_survey_handler', false);
}

function show_side_survey_handler(data){
	if(data){
		var surv_div = document.getElementById('side_survey_box');
		if(surv_div){
			surv_div.innerHTML = data;
		}
	}
}

function validate_vote(){
	var question_type = document.getElementById('question_type').value;
	if(question_type==0){
		//Single choice question
		var answer_id = document.getElementById('selected_answer').value;
		if(!answer_id){
			alert('Please select an answer');
			return false;
		}
	}else if(question_type==1){
		var one_answer_selected = false;
		//Multiple choice question
		var answer_ids_obj = document.getElementById('answer_ids');
		if(answer_ids_obj){
			var answer_ids = document.getElementById('answer_ids').value;
			if(answer_ids.length>0){
				var answer_ids_array = answer_ids.split(",");
				for(i=0; i<answer_ids_array.length-1;i++){
					var answer_name = "answer_"+answer_ids_array[i];
					var answer_selected = document.getElementById(answer_name).checked;
					if(answer_selected){
						one_answer_selected = true;
						break;
					}
				}
			}
		}
		if(one_answer_selected == false){
			alert('Please select at least one answer');
		}
		return one_answer_selected;
	}
	return true;
}

function survey_vote(survey_id){
	if(validate_vote()){
		var question_id = 1;
		var answer_id = document.getElementById('selected_answer').value;
		var quickpoll = 0;
		//Ehealth user id
		var e_uid = 0;
		var side_e_uid_obj = document.getElementById('side_e_uid');
		if(side_e_uid_obj){
			e_uid = side_e_uid_obj.value;
		}
		//Ad position id
		var e_ad_pos_id = 0;
		var side_e_ad_pos_id_obj = document.getElementById('side_e_ad_pos_id');
		if(side_e_ad_pos_id_obj){
			e_ad_pos_id = side_e_ad_pos_id_obj.value;
		}
		var url = "../surveys/poll_vote.php";
		var params =
		"survey="+survey_id+
		"&question_id="+question_id+
		"&answer="+answer_id+
		"&quickpoll="+quickpoll+
		"&e_uid="+e_uid+
		"&e_ad_pos_id="+e_ad_pos_id
		;
		var question_type = document.getElementById('question_type').value;
		if(question_type==1){
			//Multiple choices poll
			params += "&selected_answers="+register_mulitple_answers();
		}
		surveys_makePostAjaxRequest(url, params, 'survey_vote_handler', false);
	}
}

function survey_vote_handler(data){
	//Redirect to the thank you for voting page
	//document.location.href="poll_display.php?mode=thanks";
	var side_survey_box = document.getElementById('side_survey_box');
	if(side_survey_box){
		side_survey_box.innerHTML =			
			'<script type="text/javascript">'+
			'var _gaq = _gaq || [];'+
			'_gaq.push([\'_setAccount\', \'UA-258123-4\']);'+
			'_gaq.push([\'_setDomainName\', \'none\']);'+
			'_gaq.push([\'_trackPageview\']);'+
			'(function() {'+
			'var ga = document.createElement(\'script\'); ga.type = \'text/javascript\'; ga.async = true;'+
			'ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';'+
			'var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(ga, s);'+
			'})();'+
			'</script>'+
			'<div class="survey_thank_you">'+
			'	Thank you for voting'+
			'</div>		';
	}
}

function register_answer(radio_btn){
	if(radio_btn){
		var answer = radio_btn.value;
		if(answer){
			document.getElementById('selected_answer').value = answer;
		}
	}
}

function register_mulitple_answers(){
	var selected_answeres = "";
	var answer_ids_obj = document.getElementById('answer_ids');
	if(answer_ids_obj){
		var answer_ids = document.getElementById('answer_ids').value;
		if(answer_ids.length>0){
			var answer_ids_array = answer_ids.split(",");
			for(i=0; i<answer_ids_array.length-1;i++){
				var answer_name = "answer_"+answer_ids_array[i];
				var answer_selected = document.getElementById(answer_name).checked;
				if(answer_selected){
					selected_answeres = selected_answeres+"1";
				} else {
					selected_answeres = selected_answeres+"0";
				}
			}
		}
	}
	return selected_answeres;
}
/*END - Scripts for the side poll*/

/*Jumpbox scripts*/
function jump_to_url(jump_box){
	if(jump_box){
		var selected_value = jump_box.options[jump_box.selectedIndex].value;
		if(isPosInteger(selected_value) || selected_value==-1){
			if(selected_value!=-1){
				document.getElementById('jumpbox').submit();
			}
		}else{
			document.location.href = selected_value;
		}
	}
}
/*END - Jumpbox scripts*/

/* User profile pages */
function add_onmouse_over_event_to_all_child_elements(parent_node, element_id){
	var all_child_nodes = parent_node.childNodes;
	for (i=0;i<all_child_nodes.length; i++){
		all_child_nodes[i].onmouseover  = function f(){
			document.getElementById(element_id).style.display="";
		}
		all_child_nodes[i].onmouseout = function f1(){
			document.getElementById(element_id).style.display="";
		}
	}
}

function discard_show_popup(){
	if(alertTimerId){
		clearTimeout (alertTimerId);
	}
}
function show_short_user_profile(a,b) {

}
function main_show_short_user_profile(user_id, x, y){
	$('short_user_profile').hide();
	if(user_id){
		var url = 'generate_short_user_profile.php';
		var params = '?user_id=' + user_id;
		url = url+params;
		mouseX = x;
		mouseY = y;
		new Ajax.Request(url, {
		  method: 'get',
		  onSuccess: function(transport) {
			$('short_user_profile').style.top = mouseY+"px";
			$('short_user_profile').style.left = mouseX+"px";
			$('short_user_profile').update(transport.responseText);
			add_onmouse_over_event_to_all_child_elements($('short_user_profile'), 'short_user_profile');
			document.getElementById('short_user_profile').style.display="block";
		  }
		});
	}
}
function findPosX(obj) {
	var curleft = 0;
	if(obj.offsetParent)
		while(1) {
			curleft += obj.offsetLeft;
			if(!obj.offsetParent) break;
			obj = obj.offsetParent;
		}
	else if(obj.x)
		curleft += obj.x;
	return curleft;
}
function findPosY(obj) {
	var curtop = 0;
	if(obj.offsetParent)
		while(1) {
			curtop += obj.offsetTop;
			if(!obj.offsetParent) break;
			obj = obj.offsetParent;
		}
		else if(obj.y)
		curtop += obj.y;
	return curtop;
}
function show_user_profile_under_image(avatar){
	var avatar_relation = avatar.getAttribute('rel');
	var avatar_data = avatar_relation.split("_");
	var user_id = avatar_data[1];
	if(!user_profile_popup_opened || (user_id_profile_popup_opened != user_id)){
		if(user_id>0){
			var the_image = avatar;
			if(the_image){
				var x = findPosX(the_image);
				var y = findPosY(the_image);
				y+=10;
				var image_height = the_image.height;
				if(image_height){
					y = y + image_height;
				}
			}
			main_show_short_user_profile(user_id, x, y)
			user_profile_popup_opened = true;
			user_id_profile_popup_opened = user_id;
		}
	} else {
		user_profile_popup_opened = false;
		user_id_profile_popup_opened = 0;
		document.getElementById('short_user_profile').style.display="none";
	}
}
function close_user_profile(popup_obj){
	popup_obj.style.display="none";
	user_profile_popup_opened = false;
}

function attach_event_listeners(avatar){
	avatar.onclick  = function f(){
		show_user_profile_under_image(avatar);
	};

	avatar.onmouseout  = function f1(){
		discard_show_popup();
	};
}

function append_user_details_to_all_avatars(){
	var all_avatars = getElementsByClassName("avatar_image", null);
	if(all_avatars){
		for(var i=0,j=all_avatars.length; i<j; i++){
			if(all_avatars[i]){
				attach_event_listeners(all_avatars[i]);
			}
		}
	}
}
function getElementsByClassName(classname, node)  {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className)) a.push(els[i]);
	return a;
}
function show_report_note_menu(e, user_note_id) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	document.getElementById('selected_user_note_id').value=user_note_id;
	show_and_postion_report_div(posx, posy);
}

function show_and_postion_report_div(x, y) {
	x+=-20;
	y+=-60;
	var report_div = document.getElementById('report_note');
	if(report_div) {
		report_div.style.top = y+"px";
		report_div.style.left = x+"px";
		add_onmouse_over_event_to_all_child_elements(report_div, 'report_note')
		report_div.style.display="";
		report_div.className = "report_user_note_box_visible";
	}
}
function hide_report_div() {
	var report_div = document.getElementById('report_note');
	if(report_div){
		report_div.style.display="none";
	}
}

function report_user_note(note_complaint_type_id) {
	var selected_user_note_id = document.getElementById('selected_user_note_id').value;
	var reporter_user_id = document.getElementById('reporter_user_id').value;
	if(selected_user_note_id && reporter_user_id) {
		var url = "thanking/report_user_note.php";
		var params = "user_note_id="+selected_user_note_id+
			"&reporter_user_id="+reporter_user_id+
			"&note_complaint_type_id="+note_complaint_type_id;
		makePostAjaxRequest(url, params, 'report_user_note_handler', false);
		hide_report_div();
		document.getElementById("r_"+selected_user_note_id).innerHTML = '<img src="images/loading1-0.gif" alt="loading..." align="center">';
	}
}

function report_user_note_handler(resultText){
	var selected_user_note_id = document.getElementById('selected_user_note_id').value;
	document.getElementById("r_"+selected_user_note_id).innerHTML = '<span class="reported_user_note">Reported</span>';
}

function show_all_forums(url){
	var win = window.open(url, "","location=0, status=0,scrollbars=1, toolbar=0, directories=0, resizable=0, titlebar=0, menubar=0, width=790, height=400, top=100, left=200");
	win.focus();
}

function validate_appointment_form(form) {
	if (
			trim_str(form.name.value) == "" ||
			trim_str(form.phone.value) == "" ||
			trim_str(form.email.value) == "" ||
			(
				!form.insurance[0].checked &&
				!form.insurance[1].checked
			) ||
			trim_str(form.provider.value) == "" ||
			trim_str(form.reason.value) == "" ||
			(
				!form.new_patient[0].checked &&
				!form.new_patient[1].checked
			) ||
			trim_str(form.date.value) == "" ||
			trim_str(form.time.value) == "" ||
			trim_str(form.entered_security_code.value) == ""
		) {
		alert("Please fill the required fields");
		return false;
	}
	return true;


}

function trim_str(str) {
	if(str){
		var	str = str.replace(/^\s\s*/, ''),ws = /\s/,i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	} else {
		return "";
	}
}

function show_hide_object(id, show_hide){
	var object = document.getElementById(id);
	if(object){
	   if(show_hide){
			object.style.display="";
	   }else{
			object.style.display="none";
	   }
	}
}
// functions from ajax.js
function makeHttpRequest(url, callback_function, return_xml){
	var http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {
		alert('Unfortunatelly you browser doesn\'t support this feature.Try another browser please');
		return false;
	}
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				if (return_xml) {
					eval(callback_function + '(http_request.responseXML)');
				} else {
					eval(callback_function + '(http_request.responseText)');
				}
			} else {}
		}
	}
	http_request.open('POST', url, true);
	http_request.send(null);
}
function makePostAjaxRequest(url, params, callback_function, return_xml) {
	var http_request = false;
	if (window.XMLHttpRequest) {
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) { http_request.overrideMimeType('text/xml'); }
	} else if (window.ActiveXObject) { // IE
		try { http_request = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e) {
			try { http_request = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) {}
		}
	}
	if (!http_request) {
		alert('Unfortunatelly you browser doesn\'t support this feature.Try another browser please');
		return false;
	}
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// http_request.setRequestHeader("Content-length", params.length);
	// http_request.setRequestHeader("Connection", "close");

	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				if (return_xml) {
					eval(callback_function + '(http_request.responseXML)');
				} else {
					eval(callback_function + '(http_request.responseText)');
				}
			} else {
				alert('There was a problem with the request.(Code: ' + http_request.status + ')');
			}
		}
	}
	http_request.send(params);
}
// end functions from ajax.js
// testimonials functions
function start_testimonials() {
	if (total_testimonials > 1) {
		swith_testimonials();
	} else {
		if (typeof(testimonials_el) != undefined && testimonials_el != null) {
			testimonials_el.innerHTML = '<span class="testimonial_quotes">"' + testimonials[0]['text'] + '" - </span><span class="testimonial_by">' + testimonials[0]['name'] + '</span>';
		}
	}
}
function swith_testimonials() {
	if (typeof(testimonials_el) != undefined && testimonials_el != null) {
		testimonials_el.innerHTML = '<span class="testimonial_quotes">"' + testimonials[tcnt]['text'] + '" - </span><span class="testimonial_by">' + testimonials[tcnt]['name'] + '</span>';
		tcnt++;
		if (tcnt > (total_testimonials -1)) tcnt = 0;
		setTimeout('swith_testimonials()', delay);
	}
}
// end testimonials functions
// gs.js
function gs_style(){
//	var f = document.getElementById('searchbox_018324609363426854129:foame-13mwe');
	var f = document.getElementById('searchbox_005802980324540134825:6-ibvjaheta');
	if (f) {
		var q = f.q;
		//Search textbbox
		if (q) {
			q.style.border = '2px solid #A8C4E0';
			q.style.height = '18px';
//			q.style.width = '200px';
			q.style.fontSize = '12px';
			q.style.verticalAlign = 'middle';
			var mouse_over = function() {
				q.style.border = '2px solid #FFC40C';
			}
			var mouse_out = function() {
				q.style.border = '2px solid #A8C4E0';
			}
			q.onmouseover = mouse_over;
			q.onmouseout = mouse_out;
		};
		//Search button
		var sa = f.sa;
		if(sa){
			sa.className = 'search_button';
			var mouse_over = function() {
				sa.className = 'search_button_over';
			}
			var mouse_out = function() {
				sa.className = 'search_button';
			}
			sa.onmouseover = mouse_over;
			sa.onmouseout = mouse_out;
		}
	}
}
// end gs.js


//Font size picker scripts
var min=8;
var max=18;
function increaseFontSize() {
	var p = document.getElementsByClassName('KonaBody');
   for(i=0;i<p.length;i++) {
	  if(p[i].style.fontSize) {
		 var s = parseInt(p[i].style.fontSize.replace("px",""));
	  } else {
		 var s = 12;
	  }
	  if(s!=max) {
		 s += 1;
	  }
	  p[i].style.fontSize = s+"px"
   }
}
function decreaseFontSize() {
   var p = document.getElementsByClassName('KonaBody');
   for(i=0;i<p.length;i++) {
	  if(p[i].style.fontSize) {
		 var s = parseInt(p[i].style.fontSize.replace("px",""));
	  } else {
		 var s = 12;
	  }
	  if(s!=min) {
		 s -= 1;
	  }
	  p[i].style.fontSize = s+"px"
   }
}
//END - Font size picker scripts

function focusOnElement(element_id){
	document.getElementById(element_id).focus();
}

//LOAD ALL THE OTHER JAVASCRIPTS AFTER THE PAGE IS LOADED
function load_js_file(filename, is_file, content){
	var js_container = document.getElementById('script_loader');
	if(js_container) {
		if(is_file) {
			var fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
			js_container.appendChild(fileref);
		} else {
			var div_element=document.createElement('div');
			div_element.innerHTML = "<script type=\"text/javascript\">"+content+"</script>";


/*			var fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.innerHTML = content;*/
			js_container.appendChild(div_element);
		}
	}
}

function load_js_file_in_head(filename, is_file, content){
	var js_container = document.getElementsByTagName("head")[0];
	//var js_container = document.getElementById('script_loader');
//	alert(js_container);
	if(js_container) {
		if(is_file) {
			var fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
			js_container.appendChild(fileref);
		} else {
			/*var div_element=document.createElement('div');
			div_element.innerHTML = "<script type=\"text/javascript\">"+content+"</script>";*/


			var fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.innerHTML = content;
			js_container.appendChild(fileref);
		}
	}
}


//LOAD ALL THE OTHER JAVASCRIPTS AFTER THE PAGE IS LOADED
function load_javascripts(){
	// load_js_file(sweb_root+'/health/javascripts/quant.js', true, '');
	// load_js_file('', false, '_qacct="p-37u88hl2kI7Pw";quantserve();');
	//load_js_file(sweb_root+'/health/javascripts/urchin.js', true, '');
	load_js_file('', false, '_udn = "none";_uacct = "UA-258123-4";urchinTracker();');
//	populate_ad_positions();
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
	window.onload = func;
  } else {
	window.onload = function() {
	  if (oldonload) {
		oldonload();
	  }
	  func();
	}
  }
}
//END - LOAD ALL THE OTHER JAVASCRIPTS AFTER THE PAGE IS LOADED
function move_ads() {
	// Ads serving...
	$("div.banner").each(function()
	{
	  var id = $(this).attr('id').replace(/eh_tmp_/, '');
	  var pos = $("#" + id).position();

	  if (pos)
	  {
		// Show the banner directly over the placeholder
		$(this).css(
		{
		  "left": pos.left +"px",
		  "top":  pos.top  +"px",
		  "display":""
		});
		$("#" + id).height($(this).height() + 5);
		$("#" + id).width($(this).width());
	  }
	});

	// Repositioning the ads divs
	$(window).scroll(function()
	{
	  $("div.banner").each(function()
	  {
		var id = $(this).attr('id').replace(/eh_tmp_/, '');
		var pos = $("#" + id).position();

		if (pos)
		{
		  // Show the banner directly over the placeholder
		  $(this).css(
		  {
			"left": pos.left +"px",
			"top":  pos.top  +"px",
			"display":""
		  });
		}
	  });
	});
}
function report_problem(web_root, entry_id) {
	var cur_url = document.location.href;
	window.open(web_root+"health/report_problem.php?cur_url="+cur_url+"&entry_id="+entry_id,"","menubar=0,resizable=1,width=520,height=300");

}
function uniqid (prefix, more_entropy) {
	// *     example 1: uniqid();
	// *     returns 1: 'a30285b160c14'
	// *     example 2: uniqid('foo');
	// *     returns 2: 'fooa30285b1cd361'
	// *     example 3: uniqid('bar', true);
	// *     returns 3: 'bara20285b23dfd1.31879087'

	if (typeof prefix == 'undefined') {
		prefix = "";
	}

	var retId;
	var formatSeed = function (seed, reqWidth) {
		seed = parseInt(seed,10).toString(16); // to hex str
		if (reqWidth < seed.length) { // so long we split
			return seed.slice(seed.length - reqWidth);
		}
		if (reqWidth > seed.length) { // so short we pad
			return Array(1 + (reqWidth - seed.length)).join('0')+seed;
		}
		return seed;
	};

	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	// END REDUNDANT
	if (!this.php_js.uniqidSeed) { // init seed with big random int
		this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
	}
	this.php_js.uniqidSeed++;

	retId  = prefix; // start with prefix, add current milliseconds hex string
	retId += formatSeed(parseInt(new Date().getTime()/1000,10),8);
	retId += formatSeed(this.php_js.uniqidSeed,5); // add seed hex string

	if (more_entropy) {
		// for more entropy we add a float lower to 10
		retId += (Math.random()*10).toFixed(8).toString();
	}

	return retId;
}

function randomToN(maxVal,floatVal) {
   var randVal = Math.random()*maxVal;
   return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

function generate_unique_visitor_id(){
	var prefix = randomToN(10000);
	var unique_id = uniqid(prefix, true);
	return unique_id;
}

function get_unique_visitor_id(){
	var unique_visitor_id = "";
	//Check to see if the unique visitor id cookie is present or expired
	var val = get_cookie("ehf_unvis");
	if(val){ unique_visitor_id = val;
	}else{ unique_visitor_id = generate_unique_visitor_id(); }
	return unique_visitor_id;
}

function set_unique_visitor_cookie(unique_visitor_id){
	cookie_name = "ehf_unvis";
	//Insert the cookie for tracking unique visitors
	set_cookie( cookie_name, unique_visitor_id, '1800', "/");
}


function store_tracking_data_in_cookie(user_id, category_id, forum_id, tracking_topic_id) {
	if(forum_id){
		//alert(forum_id);
		var forum_cookie_name = "ehf_ft";
		var fc_data = get_cookie( forum_cookie_name );
		var fc_string = "";
		//if the cookie already exists
		if(fc_data){
			//Check if forum alred added
			if(fc_data.indexOf("|"+forum_id+"|")==-1){
				//Split the string
				//fc_string = fc_data.split('|');
				fc_string +=fc_data+forum_id+"|";
			}else{
				fc_string =fc_data;
			}
		}else{
			fc_string = "|"+forum_id+"|";
		}
		set_cookie( forum_cookie_name, fc_string, 180000000000, "/");
	}
}


function record_unique_visit(category_id, forum_id, meta_update_script_path, user_id, premium, tracking_url, tracking_topic_id){
	return false;
	if(!check_cookie()){
		var unique_number = new Date().getTime();
		var uv_id = get_unique_visitor_id();

		var url = meta_update_script_path+"unique_visits_daily.php";
		var params = "c="+category_id+"&f="+forum_id+"&un="+unique_number+"&u="+user_id+"&p="+premium+"&turl="+tracking_url+"&t="+tracking_topic_id+"&uv_id="+uv_id;

//		makePostAjaxRequest(url, params, 'record_unique_visit_handler', false);

		var i=new Image();
//		i.src=meta_update_script_path+"unique_visits_daily.php?c="+category_id+"&f="+forum_id+"&un="+unique_number+"&u="+user_id+"&p="+premium+"&turl="+tracking_url+"&t="+tracking_topic_id+"&uv_id="+uv_id;
		i.src = url+"?"+params;
//		alert(i.src);
		set_unique_visitor_cookie(uv_id);

		//This funct is here because the parent function is called from every footer
		store_tracking_data_in_cookie(user_id, category_id, forum_id, tracking_topic_id);
	}
}
function record_unique_visit_handler(data) {

}

function record_tag_page_pageviews(meta_update_script_path, tp_item_id, tp_page_type){
	return false;
	if(!check_cookie()){
		var unique_number = new Date().getTime();
		var url = meta_update_script_path+"tag_pages_insert_pageviews.php";
		var params = "tp_item_id="+tp_item_id+"&tp_page_type="+tp_page_type+"&un="+unique_number;

//		makePostAjaxRequest(url, params, 'record_tag_page_pageviews_handler', false);

		var i=new Image();
//		i.src=meta_update_script_path+"tag_pages_insert_pageviews.php?tp_item_id="+tp_item_id+"&tp_page_type="+tp_page_type;
		i.src = url+"?"+params;
	}
}

function record_tag_page_pageviews_handler(data) {

}

/* Modified To support Opera */
function bookmark(title,url){
	//alert(window.opera);
if (window.sidebar) {
	// firefox
	window.sidebar.addPanel(title, url, "");
} else if(window.opera && window.print){ // opera
	alert("Your browser does not support dynamic bookmarking.");
/*    var elem = document.createElement('a');
	elem.setAttribute('href',url);
	elem.setAttribute('title',title);
	elem.setAttribute('rel','sidebar');
	elem.click();*/
}
else if(document.all) {
	// ie
	window.external.AddFavorite(url, title);
}else {
	alert("Your browser does not support dynamic bookmarking.");
}
}

function textarea_char_counter(field, countfield, maxlimit) {
	if (field.value.length > maxlimit) field.value = field.value.substring(0, maxlimit);
	else countfield.innerHTML = (maxlimit - field.value.length)+' characters left';
}
/*GET search engine keyword*/
// Configuration:
Hilite = {
	onload: true,
	debug_referrer: ''
};
Hilite.search_engines = [
	['bing\\.', 'q'],                               // Bing
	['google\\.', 'q'],                             // Google
	['search\\.yahoo\\.', 'p'],                     // Yahoo
	['search\\.msn\\.', 'q'],                       // MSN
	['search\\.live\\.', 'query'],                  // MSN Live
	['search\\.aol\\.', 'userQuery'],               // AOL
	['ask\\.com', 'q'],                             // Ask.com
	['altavista\\.', 'q'],                          // AltaVista
	['feedster\\.', 'q'],                           // Feedster
	['search\\.lycos\\.', 'q'],                     // Lycos
	['alltheweb\\.', 'q'],                          // AllTheWeb
	['technorati\\.com/search/([^\\?/]+)', 1],      // Technorati
	['dogpile\\.com/info\\.dogpl/search/web/([^\\?/]+)', 1, true] // DogPile
];

Hilite.decodeReferrer = function(referrer) {
	var query = null;
	var regex = new RegExp('');
	for (var i = 0; i < Hilite.search_engines.length; i ++) {
		var se = Hilite.search_engines[i];
		regex.compile('^http://(www\\.)?' + se[0], 'i');
		var match = referrer.match(regex);
		if (match) {
			var result;
			if (isNaN(se[1])) {
				result = Hilite.decodeReferrerQS(referrer, se[1]);
			} else {
				result = match[se[1] + 1];
			}
			if (result) {
				result = decodeURIComponent(result);
				// XXX: DogPile's URI requires decoding twice.
				if (se.length > 2 && se[2])
					result = decodeURIComponent(result);
				result = result.replace(/\'|"/g, '');
				result = result.split(/[\s,\+\.]+/);
				return result;
			}
			break;
		}
	}
	return null;
};
Hilite.decodeReferrerQS = function(referrer, match) {
	var idx = referrer.indexOf('?');
	var idx2;
	if (idx >= 0) {
		var qs = new String(referrer.substring(idx + 1));
		idx  = 0;
		idx2 = 0;
		while ((idx >= 0) && ((idx2 = qs.indexOf('=', idx)) >= 0)) {
			var key, val;
			key = qs.substring(idx, idx2);
			idx = qs.indexOf('&', idx2) + 1;
			if (key == match) {
				if (idx <= 0) {
					return qs.substring(idx2+1);
				} else {
					return qs.substring(idx2+1, idx - 1);
				}
			}
		}
	}
	return null;
};
Hilite.hilite = function() {
	var q = Hilite.debug_referrer ? Hilite.debug_referrer : document.referrer;
//    q = "http://google.com?q=kweyword";
	q = Hilite.decodeReferrer(q);
	//q = new Array("keyword");
	if(q){
		//var f = document.getElementById('searchbox_018324609363426854129:foame-13mwe');
	var f = document.getElementById('searchbox_005802980324540134825:6-ibvjaheta');
		if (f) {
			var q_e = f.q;
			if(q_e){
				var qv = q.join(" ");
				q_e.value=qv;
				var cont = document.getElementById('se_cont');
				if(cont){
					cont.style.display="";
					var s_kwrd = document.getElementById('se_kwrd');
					s_kwrd.innerHTML=qv;
				}
		//Populate the keyword and display the search popup at the bottom
				var sb = document.getElementById('search_box');
				if(sb){
			var sb_sk = document.getElementById('sb_search_keyword');
			if(sb_sk){
			sb_sk.innerHTML=qv;
			// sb_sk.href="http://ehealthforum.com/health/gsearch.php?cx=005802980324540134825%3A6-ibvjaheta&cof=FORID%3A11&ie=UTF-8&client=ib_cse&channel=EHF_CSE&q="+qv+"&sa.x=42&sa.y=25#221";
			sb_sk.href="http://ehealthforum.com/health/gsearch.php?cx=005802980324540134825%3A6-ibvjaheta&cof=FORID%3A11&ie=UTF-8&client=ib_cse&channel=EHF_CSE&sa=Search&q="+qv;
			
			sb.style.display="";
			}
				}
			}
		}
	}
};
if (Hilite.onload) {
	if (window.attachEvent) {
		window.attachEvent('onload', Hilite.hilite);
	} else if (window.addEventListener) {
		window.addEventListener('load', Hilite.hilite, false);
	} else {
		var __onload = window.onload;
		window.onload = function() {
			Hilite.hilite();
			__onload();
		};
	}
}
/*END GET search engine keyword*/



/*Make post usefull scripts*/
function make_post_useful(yes, post_id){
	if(yes){
	document.getElementById("up_make_"+post_id).style.display="none";
	document.getElementById("up_done_"+post_id).style.display="";
	} else {
	document.getElementById("up_make_"+post_id).style.display="";
	document.getElementById("up_done_"+post_id).style.display="none";
	}
}

function make_post_useful_handler(yes, topic_id, post_id) {
	if(topic_id) {
	var url = "/health/helpful_topic.php";
	var params = "topic_id="+topic_id
		+"&make_usefull="+yes
		+"&post_id="+post_id;
	makePostAjaxRequest(url, params, 'make_post_useful_feedback', false);
	document.getElementById("up_make_"+post_id).style.display="none";
	document.getElementById("up_done_"+post_id).style.display="none";
	document.getElementById("up_working_"+post_id).style.display="";

	document.getElementById("up_working_"+post_id).innerHTML = '<img src="images/loading1-0.gif" alt="loading..." align="center">';
	}
}

function make_post_useful_feedback(data){
	if(data){
	var json_array = eval( "(" + data + ")" );
	if(json_array){
		var post_id = json_array['post_id'];
		var yes = json_array['make_usefull'];

		document.getElementById("up_working_"+post_id).style.display="none";
		if(yes==1){	make_post_useful(1, post_id);
		}else{ make_post_useful(0, post_id);
		}
	}
	}
}
/*END - Make post usefull scripts*/


//VALIDATION JAVASCRIPTS
function validateField(field_id, msg_box_id){
	var validated = false;
	var first_value = document.getElementById(field_id).value;
	if(first_value.length == 0){
		show_hide_object(msg_box_id, true);
		validated = false;
	}else{
		show_hide_object(msg_box_id, false);
		validated = true;
	}
	return validated;
}

function isPosInteger(s){
	var i;
	for (i = 0; i < s.length; i++){
		// Check that current character is number.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9"))) return false;
	}
	// All characters are numbers.
	return true;
}


function is_email_valid(field_id, msg_box_id, focus){
	var validated = false;
	var fieldValidated = validateField(field_id, msg_box_id);
	if(fieldValidated){
		var validRegExp = /^.+@.+\..+$/;
		var strEmail = document.getElementById(field_id).value;
		if (strEmail.search(validRegExp) == -1){
		show_hide_object(msg_box_id, true);
		if(focus) {
		focusOnElement(field_id);
		}
		validated = false;
		}else{
		show_hide_object(msg_box_id, false);
		validated = true;
		}
   }
   return validated;
}

function val_validate_dropdown(id, forbiden_value){
	var obj = document.getElementById(id);
	var current_value = obj.options[obj.selectedIndex].value;
	if(current_value != forbiden_value){
	return true;
	}else{
	return false;
	}
}

function is_email_text_valid(email_text){
	var validated = false;
	var validRegExp = /^.+@.+\..+$/;
	var strEmail = email_text;
	if (strEmail.search(validRegExp) == -1){
	validated = false;
	}else{
	validated = true;
	}
	return validated;
}

function val_getValue(id){
	var obj = document.getElementById(id);
	if(obj){
	return trim_str(obj.value);
	}else{
	return null;
	}
}
function val_reset(msg_box_id){
	var msg_box = document.getElementById(msg_box_id);
	if(msg_box){
	msg_box.innerHTML = "";
	msg_box.style.display="none";
	}
}

function val_show_err_msg(msg, msg_box_id, focus){
	var msg_box = document.getElementById(msg_box_id);
	if(msg_box && msg){
	var val_msg_cont = '<a id="val_msg_focus" name="val_msg_focus" ></a>';
	val_msg_cont += "<ul>";
	if(msg.length){
		for (var key = 0; key < msg.length; key++) {
		if(msg[key]){
			var value = msg[key];
			if(trim_str(value)){
			val_msg_cont += "<li>"+msg[key]+"</li>";
			}
		}
		}
	}
	val_msg_cont += "</ul>";
	msg_box.innerHTML=val_msg_cont;
	msg_box.style.display="";
	if(focus){
//	    document.getElementById('val_msg_focus').focus();
		document.location.href="#val_msg_focus";
	}

	//alert(msg_box.style.display);
	}
}

function is_chbx_checked(id) {
	var obj = document.getElementById(id);
	if(obj){
	if (obj.checked) {
		return true;
	}else{
		return false;
	}
	} else {
	return false;
	}
}

function val_reset_psw_form(msg_box_id){
	var valid = true;
	var val_msg=new Array();
	val_reset(msg_box_id);

	var password = val_getValue('password');
	var new_password = val_getValue('new_password');
	if(password=="" || new_password == ""){
	val_msg.push("The passwords cannot be empty");
	valid=false;
	}
	if(password != new_password){
	val_msg.push("The two passwords are not the same.");
	valid=false;
	}
	if(!valid){
	val_show_err_msg(val_msg, msg_box_id, 0);
	}
	return valid;
}

function val_show_error_msgs(msg_box_id, error_array_encoded, focus){
	var err_array = eval(error_array_encoded);
	if(err_array){
	val_show_err_msg(err_array, msg_box_id, focus);
	}
}


//END VALIDATION JAVASCRIPTS

function lr_pop_box(token,api_key,show_welcome_text){
	var cval = parseInt(get_cookie("_ehflr"));if (!cval) cval = 0;
	if (cval != 3) {return false;} //Changed to 3
	jQuery.get("/health/load_box.php?token="+token+"&mode=login_register&show_welcome_text="+show_welcome_text ,function(data){
		_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Popup Rendered']);
		$("#lr_modal_box").html(data);



		$("#lr_modal_box").dialog (  {
			title: "Create an account",
			position: ['center',150],
			// position: {my: "center", at: "center", of: window},
			width: 710,
			modal: true,
			create: function (event) { $(event.target).parent().css('position', 'fixed') },
			open: function(){
				$(".action_form input").focus(function(){
					$(this).parent().find("label").css("opacity","0.3");
				});
				$(".action_form input").keypress(function(){
					$(this).parent().find("label").css("display","none");
				});
				$(".action_form input").blur(function(){
					if ($(this).val() == "") {
						$(this).parent().find("label").css("opacity","1");
						$(this).parent().find("label").css("display","inline");
					} else {
						$(this).parent().find("label").css("display","none");
					}
				});
				$("#continue_btn").click(function(){
					_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Continue Button  Clicked']);
					// validate fields
					if ($("#register_email").val() == "") {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email Address missing']);
						$("#val_lr_msg_box").html("Please enter your email address.");
						$("#val_lr_msg_box").css("display","block");
						$("#register_email").focus();
					} else if (!is_email_text_valid($("#register_email").val())) {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email Address invalid']);
						$("#val_lr_msg_box").html("Please enter a valid email address.");
						$("#val_lr_msg_box").css("display","block");
						$("#register_email").focus();
					} else if ($("#register_username").val() == "") {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Display Name missing']);
						$("#val_lr_msg_box").html("Please enter your display name.");
						$("#val_lr_msg_box").css("display","block");
						$("#register_username").focus();
					} else if ($("#register_password").val() == "") {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Password missing']);
						$("#val_lr_msg_box").html("Please enter a password.");
						$("#val_lr_msg_box").css("display","block");
						$("#register_password").focus();
					} else if (!$("#register_agree_to_terms").is(':checked')) {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Checkbox Not Checked']);
						$("#val_lr_msg_box").html("You must agree to the Terms of Use and Privacy Policy and be above 18 years of age to create an account.");
						$("#val_lr_msg_box").css("display","block");
						$("#register_agree_to_terms").focus();
					} else {
						$("#val_lr_msg_box").html("");
						$("#val_lr_msg_box").css("display","none");
						$("#welcome_text").css("display","none");
						$("#login_form").css("display","none");
						$("#register_step_1").css("display","none");
						$("#register_step_2").css("display","block");
						$("#register_form").css("padding-left","0");
						$("#register_form").css("margin","auto");
						$("#register_form").css("float","none");
					}

					var puzzle_options = {
						lang: 'en',
						size: 'standard'
					};

/*					function createPuzzle () {
						if (typeof(ACPuzzle)  == "undefined"){
						setTimeout("createPuzzle()", 200);
						} else {
						ACPuzzle.create(api_key, 'test_puzzle2', puzzle_options);
						}
					}
					createPuzzle();*/

				});
				$("#register_btn").click(function(){
					_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Captcha Attempted']);
					// check if captcha was entered.
					if ($("#entered_security_code").val() == "") {
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Captcha Failed']);
						$("#val_lr_msg_box").html("Please enter the code from the image.");
						$("#val_lr_msg_box").css("display","block");
						$("#entered_security_code").focus();
					} else {
						jQuery.post("/health/join_action.php", $("#register_form").serialize(), function(data){
							var obj = jQuery.parseJSON(data);
							if (obj['error']==0) {
								//$("#lr_modal_box").dialog("close");
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Successful registration']);
								location.reload();
							} else {
								if (obj['goto_step1']) {
									$("#register_form").css("padding-left","");
									$("#register_form").css("margin","");
									$("#register_form").css("float","");
									$("#register_step_2").css("display","none");
									$("#register_step_1").css("display","block");
									$("#login_form").css("display","block");
								}
								$("#val_lr_msg_box").html(obj['error_message']);
								$("#val_lr_msg_box").css("display","block");
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email or Display Name Already Exist or Captcha Failed']);
								//ACPuzzle.reload();
								
								//Reload the captcha
							    var img = document.getElementById("sec_code_img");
							    img.src += "&"+new Date().getTime();
								//END - Reload the captcha
							}
						});
					}
				});
				$("#close_btn").click(function(){
					$("#lr_modal_box").dialog("close");
				});

				$("#login_btn").click(function(){
					_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'User login attempt']);
					if ( $("#login_username").val() =="" ){
						$("#val_lr_msg_box").html("Please enter your email address.");
						$("#val_lr_msg_box").css("display","block");
						$("#login_username").focus();
					} else if ( $("#login_password").val() =="" ){
						$("#val_lr_msg_box").html("Please enter your password.");
						$("#val_lr_msg_box").css("display","block");
						$("#login_pass").focus();
					} else {
						jQuery.post("/health/join_action.php", $("#login_form").serialize(), function(data){
							var obj = jQuery.parseJSON(data);
							if (obj['error']==0) {
								//$("#lr_modal_box").dialog("close");
								//http://ehealthforum.com/expert-system
								if(obj['redirect_expert']){
									document.location.href='http://ehealthforum.com/expert-system';
								}else{
									location.reload();	
								}								
							} else {
								$("#val_lr_msg_box").html(obj['error_message']);
								$("#val_lr_msg_box").css("display","block");
							}
						});
					}
				});

				var all_login_inputs = $('#login_form input');
				var all_register_inputs = $('#register_form input');
				$('.go_next').bind('keyup', function(event) {
					if(event.keyCode==13){
						event.preventDefault();
						if ($(this).val()==""){
							$(this).parent().find("label").css("opacity","1");
							$(this).parent().find("label").css("display","inline");
						}
						if ($(this).hasClass("login_go_next")) {
							var next_el_id = all_login_inputs.index(this)+1;
							$("#login_form input:eq(" + next_el_id + ")").focus();
						} else {
							var next_el_id = all_register_inputs.index(this)+1;
							$("#register_form input:eq(" + next_el_id + ")").focus();
						}
					}
				});
				$('.go_action').bind('keyup', function(event) {
					if(event.keyCode==13){
						event.preventDefault();
						if ($(this).hasClass("go_login_action")) {
							$("#login_btn").click();
						} else {
							$("#register_btn").click();
						}

					}
				});

			},
			close: function(event, ui) {
				// track close
				_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Popup closed']);
			}
		});
	});
	return false;
}
function count_new_topic_chars(el_id,location) {
	if($("#"+el_id).val().length > 160) {
		return true;
	}
	return true;
}
function ga_event_track(category,name,value){
	_gaq.push(['_trackEvent', category, name, value]);
	return;
}

function feedback_modal_box_pop(){
	jQuery.get("/health/load_feedback_box.php" ,function(data){

		jQuery("#feedback_modal_box").html(data);
		jQuery("#feedback_modal_box").dialog({
			title: "User feedback",
			position: ['center',150],
			width: 600,
			modal: true,
			open: function(){

				jQuery("#close_btn").click(function(){jQuery("#feedback_modal_box").dialog("close");});

				jQuery("#feedback_comment").click(function(){
				jQuery("#feedback_label_comment").hide();
				});

				jQuery("#feedback_submit_btn").click(function(){
				if ( jQuery("#feedback_comment").val() =="" ){
					jQuery("#val_feedback_msg_box").html("Please enter your feedback.");
					jQuery("#val_feedback_msg_box").css("display","block");
				}else{
					jQuery.post("/health/save_feedback.php", jQuery("#feedback_form").serialize(), function(data){

					//jQuery("#feedback_modal_box").dialog("close");
					var obj = jQuery.parseJSON(data);
					if (obj['error']==0) {
						jQuery("#val_feedback_msg_box_success").html("Thank you for your feedback.");
						jQuery("#val_feedback_msg_box_success").css("display","block");
						jQuery("#val_feedback_msg_box").css("display","none");
						//alert(data);
					} else {
						jQuery("#val_feedback_msg_box").html(obj['error_message']);
						jQuery("#val_feedback_msg_box").css("display","block");
					}
					});
				}

				});


			},
			close: function(event, ui) {

			}
		});
	});
	return false;
}

function gsb_check(){
	var f = document.getElementById('searchbox_005802980324540134825:6-ibvjaheta');	
	if (f) {

		var q_e = f.q;					    		
		if(q_e){
			var q_v = q_e.value;					    			
			if(q_v==""  || q_v =='Specify search criteria!'){
				q_e.value = "Specify search criteria!";
				return false;
			}
		}
	}

	return true;
}

function gsb_click(){
	var f = document.getElementById('searchbox_005802980324540134825:6-ibvjaheta');
	if (f) {
		var q_e = f.q;					    		
		if(q_e){
			var q_v = q_e.value;					    			
			if(q_v=="Specify search criteria!"){
				q_e.value = "";					    				
			}
		}
	}							
}


/*GENERAL OVERLAY SCRIPTS*/
function hiv_overlay_hide(){
	jQuery("#overlay_bg").remove();
	jQuery("#overlay_cont").remove();
}

function hiv_popup_redirect(){
	_gaq.push(['_trackEvent', 'Interstitital', 'HIV Center', 'HIV Forum']);
	document.location.href='http://ehealthforum.com/healthcenter/hiv/hiv_virus-e133.html';
}


function anxiety_popup_redirect(){
	_gaq.push(['_trackEvent', 'Interstitital', 'Anxiety Center', 'Anxiety and Stress Forum']);
	document.location.href='http://ehealthforum.com/healthcenter/anxiety/anxiety_disorders-e77.html';
}


function generate_overlay(class_bg, title, data, redirect_function){
	jQuery("body").append(
	'<div id="overlay_cont" class="'+class_bg+'"><img onclick="hiv_overlay_hide();" class="overlay_close_img" src="/images/close_btn.png">'+
	'<div class="overlay_data_cont" onClick="'+redirect_function+'">'+
	'<div class="overlay_title">'+title+'</div>'+
	'<hr class="hr">'+
	data +
	'</div></div><div id="overlay_bg"></div>');
}

function hiv_overlay_show(forum_id){
	var cookie_name = "op_"+forum_id;

	var alredy_displayed = get_cookie(cookie_name);

	// alredy_displayed = 0;

	//FORUM ID: 39 - HIV FORUM -htttp://ehealthforum.com/health/hiv_symptoms.html
	//FORUM ID: 14 - Anxiety and Stress Forum  - http://202.eh/health/stress_question.html
	if(!alredy_displayed && alredy_displayed!='null'){
		// alert(cookie_name);
		if(forum_id==39){
			// set_cookie( cookie_name, "1", '180000000000', "/");
			set_cookie( cookie_name, "1", '', "/"); //Expires at end of session

			var title = "Visit the HIV Health Center!";
			var data = 		
			'<ul>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>What is HIV?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>What causes HIV?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>HIV symptoms?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>How is HIV diagnosed?</li>'+ 
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>HIV treatment options?</li>'+ 
			'</ul>';
	
			var redirect_function = "hiv_popup_redirect();";

			var overlay_html = generate_overlay("HIV_popup", title, data, redirect_function);
			jQuery("body").append(overlay_html);
			/*
			jQuery("body").append(
			'<div id="overlay_cont"><img onclick="hiv_overlay_hide();" class="overlay_close_img" src="/images/close_btn.png">'+
			'<div class="overlay_data_cont" onClick="hiv_popup_redirect();">'+
			'<div class="overlay_title">Visit the HIV Health Center!</div>'+
			'<ul>'+
			'<li>What is HIV?</li>'+
			'<li>What causes HIV?</li>'+
			'<li>HIV symptoms?</li>'+
			'<li>How is HIV diagnosed?</li>'+ 
			'<li>HIV treatment options?</li>'+ 
			'</ul>'+
			'</div></div><div id="overlay_bg"></div>');
			*/
		}else if (forum_id==14 && !alredy_displayed){
			//FORUM ID: 14 - Anxiety and Stress Forum  - http://202.eh/health/stress_question.html
			set_cookie( cookie_name, "1", '', "/"); //Expires at end of session

			var title = "Visit the Anxiety Health Center!";
			var data = 		
			'<ul>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>What is Anxiety?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>What causes Anxiety?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>Anxiety symptoms?</li>'+
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>How is Anxiety diagnosed?</li>'+ 
			'<li><img src="/images/anxiety_popup_arroy.png" class="arroy"/>Anxiety treatment options?</li>'+ 
			'</ul>';
	
			var redirect_function = "anxiety_popup_redirect();";

			var overlay_html = generate_overlay("anxiety_popup", title, data, redirect_function);
			jQuery("body").append(overlay_html);		
		}
	}
}
/*END GENERAL OVERLAY SCRIPTS*/

/* Viewtopic Scripts */
function show_reply_form(post_id,web_root,sweb_root, user_id, topic_id){
	var qr_form_html = "";
	if(user_id){
		qr_form_html ='<form id="qr_form_'+post_id+'" method="post" action="'+web_root+'health/posting.php" accept-charset="UTF-8">';
	}else{
		qr_form_html ='<form id="qr_form_'+post_id+'" method="post" action="'+web_root+'health/login.php" accept-charset="UTF-8">';
	}
	qr_form_html +=
	'<input type="hidden" name="reply_to_topic_id" value="'+topic_id+'" />'+
	'<input type="hidden" name="t" value="'+topic_id+'" />'+
	'<input name="do_action" type="hidden" value="post_topic_reply" />'+
	'<input type="hidden" name="mode" value="reply" />'+
	'<input type="hidden" name="post" value="submit" />'+
	'<input type="hidden" name="notify" value="checked">'+
	'<input type="hidden" name="reply_to_post_id" value="'+post_id+'">'+

	'<div class="vt_label" style="padding-left: 12px;"><span class="box_uick_reply_msg_box icon icon-discussions" style="vertical-align:middle;"></span> Reply</div>'+
	'<div class="vt_message" style="overflow:hidden;padding-left:2px">'+
	'    <div class="quick_reply_box_inner">'+
	'	<textarea name="message" id="message" class="quick_reply_msg_box"  rows="7" cols="60"></textarea>'+
	'	<div class="vt_buttons"><div name="vt_reply_img" class="vt_reply_img">'+
	'<a rel="nofollow" href="javascript: post_reply(\''+post_id+'\');"><span class="btn-post-a-reply-orange vt_quick_reply_btn" id="btn_submit"></span></a>'+
	'</div></div>'+
	'    </div>'+
	'</div>'+
	'<div class="vt_line_div"><div style="padding-left: 10px;"></div></div>'+
	'</form>';
	var obj = document.getElementById('qr_cont_'+post_id);	
	if(obj){
		obj.innerHTML = qr_form_html;
		obj.style.display="";
	}
}
function post_reply(post_id){
	document.getElementById('qr_form_'+post_id).submit();
}


function vt_validate_quick_reply(){
	var msg_box_id = "val_msg_box";
	var valid = true;
	var val_msg=new Array();
	val_reset(msg_box_id);

	var message = val_getValue('message');
	if(!message){
		val_msg.push("You must enter a message in order to reply.");
		valid=false;
	}

	if(!valid){
		val_show_err_msg(val_msg, msg_box_id, 0);
	}
	return valid;
}

//Check to see if the post contains bad words
function vt_qr_validate_form(web_root){
	var form_valid = vt_validate_quick_reply();
	if(form_valid){
		var post_message_obj = document.getElementById("message");
		var post_message = post_message_obj.value;
		var url = web_root+"health/check_if_post_text_is_valid.php";
		var params = "post_text="+post_message + "&topic_reply=1";
		makePostAjaxRequest(url, params, 'vt_qr_check_if_post_text_valid_handler', false);
	}
}
function vt_qr_check_if_post_text_valid_handler(data){
	if(data=="bad"){
		var confirmed = confirm("WARNING: Our system detects censored words in your text.  If you choose to post out of compliance with the website terms of use, your post will be reported and you take the risk of getting banned.");
		if(confirmed){
			vt_qr_submit_form();
		}
	} else {
		vt_qr_submit_form();
	}
}
function vt_qr_submit_form(){
	document.getElementById('btn_submit').disabled = true;
	var form = document.getElementById("frm_quick_reply_submit");
	form.submit();
}
function vt_qr_submit_advanced_form(){
	var form = document.getElementById("frm_advanced_mode");
	form.message.value = document.getElementById("message").value;
	form.submit();
}
//END - Check to see if the post contains bad words

function vt_render_share_this(){
	var msie6 = jQuery.browser.msie && jQuery.browser.version < 7;
	if (!msie6) {
		var top = jQuery('#share_content').offset().top - parseFloat(jQuery('#share_content').css('margin-top').replace(/auto/, 0));
		var window_width = jQuery(window).width();
		if (window_width < 1200) {
			jQuery('#share_box_inline').css("display","block");
			jQuery('#share_box').css("display","none");
		} else {
			jQuery('#share_box_inline').css("display","none");
			jQuery('#share_box').css("display","block");
		}
		jQuery('#share_box').addClass("blue_rounded_box");
		jQuery('#share_box_inline').addClass("blue_rounded_box");
		jQuery(window).scroll(function () {
			var window_width = jQuery(window).width();
			if (window_width < 1200) {
				// show inline, small resolution
				jQuery('#share_box').css("display","none");
				jQuery('#share_box_inline').css("display","block");
			} else {
				// show scrollabal box on the side
				jQuery('#share_box_inline').css("display","none");
				jQuery('#share_box').css("display","block");

				// what the y position of the scroll is
				var y = jQuery(this).scrollTop();

				// whether that's below the form
				if (y >= top-20) {
					jQuery('#share_box').css("position","fixed");
					jQuery('#share_box').css("top","20px");
					jQuery('#share_box').css("left","50%");
					jQuery('#share_box').css("margin-left","-568px");
				} else {
					jQuery('#share_box').css("position","absolute");
					jQuery('#share_box').css("top","-36px");
					jQuery('#share_box').css("left","0");
					jQuery('#share_box').css("margin-left","-100px");
				}
			}
		});
		jQuery(window).resize(function () {
			var window_width = jQuery(window).width();
			if (window_width < 1200) {
				// show inline, small resolution
				jQuery('#share_box').css("display","none");
				jQuery('#share_box_inline').css("display","block");
			} else {
				jQuery('#share_box_inline').css("display","none");
				jQuery('#share_box').css("display","block");
			}
		});
	} else {
		// IE is evil
		jQuery('#share_box').css("display","none");
		jQuery('#share_box_inline').css("display","block");
		jQuery('#share_box_inline').addClass("blue_rounded_box");
	}		
}

function vt_prep_pop_box(topic_id, forum_id, capcha_api_key, sid){
	jQuery(".pop-it").each(function(){
		$(this).click(function(){
			var post_id = $(this).attr("id").replace("post","");
			jQuery.get("/health/load_box.php?p=" + post_id +"&token="+get_cookie("phpbb2mysql_sid")+"&mode=register&topic_id="+topic_id+"&forum_id="+forum_id+"&do_action=post_usefull&make_usefull=1" ,function(data){
				_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Popup Rendered']);
				jQuery("#modal_box").html(data);
				jQuery("#modal_box").dialog({
					title: "Create an account",
					position: ['center',150],
					width: 710,
					modal: true,
					open: function(){
						$(".action_form input").focus(function(){
							$(this).parent().find("label").css("opacity","0.3");
						});
						$(".action_form input").keypress(function(){
							$(this).parent().find("label").css("display","none");
						});
						$(".action_form input").blur(function(){
							if ($(this).val() == "") {
								$(this).parent().find("label").css("opacity","1");
								$(this).parent().find("label").css("display","inline");
							} else {
								$(this).parent().find("label").css("display","none");
							}
						});
						$("#continue_btn").click(function(){
							_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Continue Button  Clicked']);
							// validate fields
							if ($("#register_email").val() == "") {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email Address missing']);
								$("#val_lr_msg_box").html("Please enter your email address.");
								$("#val_lr_msg_box").css("display","block");
								$("#register_email").focus();
							} else if (!is_email_text_valid($("#register_email").val())) {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email Address invalid']);
								$("#val_lr_msg_box").html("Please enter a valid email address.");
								$("#val_lr_msg_box").css("display","block");
								$("#register_email").focus();
							} else if ($("#register_username").val() == "") {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Display Name missing']);
								$("#val_lr_msg_box").html("Please enter your display name.");
								$("#val_lr_msg_box").css("display","block");
								$("#register_username").focus();
							} else if ($("#register_password").val() == "") {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Password missing']);
								$("#val_lr_msg_box").html("Please enter a password.");
								$("#val_lr_msg_box").css("display","block");
								$("#register_password").focus();
							} else if (!$("#register_agree_to_terms").is(':checked')) {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Checkbox Not Checked']);
								$("#val_lr_msg_box").html("You must agree to the Terms of Use and Privacy Policy and be above 18 years of age to create an account.");
								$("#val_lr_msg_box").css("display","block");
								$("#register_agree_to_terms").focus();
							} else {
								$("#val_lr_msg_box").html("");
								$("#val_lr_msg_box").css("display","none");
								$("#login_form").css("display","none");
								$("#register_step_1").css("display","none");
								$("#register_step_2").css("display","block");
								$("#register_form").css("padding-left","0");
								$("#register_form").css("margin","auto");
								$("#register_form").css("float","none");
							}
							
							var puzzle_options = {
								lang: 'en',
								size: 'standard'
							};

							/*function createPuzzle () {
								if (typeof(ACPuzzle)  == "undefined"){
									setTimeout("createPuzzle()", 200);
								} else {
									ACPuzzle.create(capcha_api_key, 'test_puzzle2', puzzle_options);
								}
							}
							createPuzzle();*/						

						});
						$("#register_btn").click(function(){
							_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Captcha Attempted']);
							// check if captcha was entered.
							if ($("#entered_security_code").val() == "") {
								_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Captcha Failed']);
								$("#val_lr_msg_box").html("Please enter the code from the image.");
								$("#val_lr_msg_box").css("display","block");
								$("#entered_security_code").focus();
							} else {
								jQuery.post("/health/join_action.php", $("#register_form").serialize(), function(data){
									var obj = jQuery.parseJSON(data);
									if (obj['error']==0) {
										//$("#modal_box").dialog("close");
										_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Successful registration']);
										location.reload();
									} else {
										if (obj['goto_step1']) {
											$("#register_form").css("padding-left","");
											$("#register_form").css("margin","");
											$("#register_form").css("float","");
											$("#register_step_2").css("display","none");
											$("#register_step_1").css("display","block");
											$("#login_form").css("display","block");
										}
										$("#val_lr_msg_box").html(obj['error_message']);
										$("#val_lr_msg_box").css("display","block");
										_gaq.push(['_trackEvent', 'LR Popup Registration', 'Error', 'Email or Display Name Already Exist or Captcha Failed']);
										// ACPuzzle.reload();		

										//Reload the captcha
									    var img = document.getElementById("sec_code_img");
									    img.src += "&"+new Date().getTime();
										//END - Reload the captcha
									}
								});
							}
						});
						$("#close_btn").click(function(){
							$("#modal_box").dialog("close");
						});

						$("#login_btn").click(function(){
							_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'User login attempt']);
							if ( $("#login_username").val() =="" ){
								$("#val_lr_msg_box").html("Please enter your email address.");
								$("#val_lr_msg_box").css("display","block");
								$("#login_username").focus();
							} else if ( $("#login_password").val() =="" ){
								$("#val_lr_msg_box").html("Please enter your password.");
								$("#val_lr_msg_box").css("display","block");
								$("#login_pass").focus();
							} else {
								jQuery.post("/health/join_action.php", $("#login_form").serialize(), function(data){
									var obj = jQuery.parseJSON(data);
									if (obj['error']==0) {
										//$("#modal_box").dialog("close");
										location.reload();
									} else {
										$("#val_lr_msg_box").html(obj['error_message']);
										$("#val_lr_msg_box").css("display","block");
									}
								});
							}
						});

						var all_login_inputs = $('#login_form input');
						var all_register_inputs = $('#register_form input');
						$('.go_next').bind('keyup', function(event) {
							if(event.keyCode==13){
								event.preventDefault();
								if ($(this).val()==""){
									$(this).parent().find("label").css("opacity","1");
									$(this).parent().find("label").css("display","inline");
								}
								if ($(this).hasClass("login_go_next")) {
									var next_el_id = all_login_inputs.index(this)+1;
									$("#login_form input:eq(" + next_el_id + ")").focus();
								} else {
									var next_el_id = all_register_inputs.index(this)+1;
									$("#register_form input:eq(" + next_el_id + ")").focus();
								}
							}
						});
						$('.go_action').bind('keyup', function(event) {
							if(event.keyCode==13){
								event.preventDefault();
								if ($(this).hasClass("go_login_action")) {
									$("#login_btn").click();
								} else {
									$("#register_btn").click();
								}
								
							}
						});

					},
					close: function(event, ui) {
						// track close
						_gaq.push(['_trackEvent', 'LR Popup Registration', 'Event', 'Popup closed']);
					}
				});
			});
			return false;
		});
	});
}

/* END - Viewtopic Scripts */


function validate_newsletter_component(){
	var the_msg = "Enter your email address";
	jQuery("#daily_newsletter_email").focus(function(){
		if (jQuery("#daily_newsletter_email").val() == the_msg) {
			jQuery("#daily_newsletter_email").val("");
		}
		jQuery("#daily_newsletter_email").css("color","#000");
	});
	jQuery("#daily_newsletter_email").blur(function(){
		if (jQuery("#daily_newsletter_email").val() == "") {
			jQuery("#daily_newsletter_email").val(the_msg);
			jQuery("#daily_newsletter_email").css("color","#888");
		}
	});
	jQuery("#daily_newsletter_button").click(function(){
		jQuery("#newsletter_errors ").css("display","none");
		var the_email = jQuery("#daily_newsletter_email").val();
		if (!is_email_text_valid(the_email)) {
			jQuery("#newsletter_errors").html("<span style='color:red;'>Please enter valid email address.</span>");
			jQuery("#newsletter_errors").css("display","block");
			return false;
		}
		jQuery("#newsletter_form").css("display","none");
		jQuery("#newsletter_loading").css("display","block");
		jQuery.get("/health/subscribe_for_daily_newsletter.php?email="+the_email.replace('+', '%2B')+"&token="+get_cookie("phpbb2mysql_sid"), function(data){
			var return_data = eval( "(" + data + ")" );
			if (return_data['error']) {
				jQuery("#newsletter_errors").html(return_data['msg']);
				jQuery("#newsletter_errors").css("display","block");
				jQuery("#newsletter_form").css("display","block");
				jQuery("#newsletter_loading").css("display","none");
			} else {
				jQuery("#newsletter_form").css("display","none");
				jQuery("#newsletter_loading").css("display","none");
				jQuery("#newsletter_errors").html("Congratulations, you have subscribed for the FREE weekly health tips email.");
				jQuery("#newsletter_errors").css("display","block");
			}
		});
	});		
}
		
function unwatch_loggedin_user_from_forum(forum_id){
	// $web_root.'health/watch_forum_handler.php?forum_id='.$forum_id.'&mode=watch&ret_url='.urlencode($w_forum_url);
	jQuery.get("/health/watch_forum_handler.php?forum_id="+forum_id+"&mode=unwatch&ajax=1" ,function(data){
		var return_data = eval( "(" + data + ")" );
		if(return_data){
			if (return_data['error']) {
				alert(return_data['error_msg']);
			}else{
				// alert("ok");
				$("#unwatch_link_"+forum_id).hide();
				$("#watch_link_"+forum_id).show();
			}			
		}
	});
	return false;
}

function render_external_doctors_box(forum_id, page_type){
	var debug = false;
	// List of forums to display the external doctors box
	var show_on_forums=new Array(); 

	show_on_forums[172]=1;
	show_on_forums[54]=1;
	show_on_forums[232]=1;
	show_on_forums[259]=1;
	show_on_forums[23]=1;
	show_on_forums[30]=1;
	show_on_forums[42]=1;
	show_on_forums[174]=1;
	show_on_forums[59]=1;
	show_on_forums[115]=1;
	show_on_forums[280]=1;
	show_on_forums[281]=1;
	show_on_forums[282]=1;
	show_on_forums[283]=1;
	// show_on_forums[247]=1;
	// show_on_forums[245]=1;
	// show_on_forums[194]=1;
	// show_on_forums[51]=1;
	// show_on_forums[114]=1;
	// show_on_forums[92]=1;

	var show_on_healthcenters = new Array();
	// show_on_healthcenters[12] = 1;
	// show_on_healthcenters[8591] = 1;
	show_on_healthcenters[399] = 1;

	if(show_on_forums[forum_id] || ( page_type == 'healthcenter_page' && show_on_healthcenters[forum_id]) ){
		if(debug) {console.log("Showing external doctor for forum: "+forum_id);}
		document.write('<div id="external_doctors_box">&nbsp;</div>');
		$.ajaxSetup ({cache: false});
		var ajax_load = "<img src='images/loading.gif' alt='loading...' />";
		$("#external_doctors_box").html(ajax_load);
		var loadUrl = "/external_doctors_box_component_handler.php?forum_id="+forum_id+"&page_type="+page_type;
		$("#external_doctors_box").html(ajax_load).load(loadUrl);
	}else{
		if (debug) {console.log("External doctors will not be displayed for this forum: "+forum_id);}
	}
}


function is_mobile() {
	var nav = navigator.userAgent||navigator.vendor||window.opera;
	var ok = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(nav)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(nav.substr(0,4));

	if(!ok){
		var nav = navigator.userAgent||navigator.vendor||window.opera;
		//Test some oher user agents
		ok = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav);
	}

	if(ok){
		// console.log("Mobile device detected");	
	}
	return ok; 
}

function from_mobile(){
	var from_mobile = get_cookie("from_mobile");
	if(from_mobile){
		return true;
	}
	return false;
}

function js_redirect(url) {
	var isSSL = "https:" == document.location.protocol;
	if (isSSL) {
		url = url.replace('http:','https:');
		if (url.indexOf('https://m.') != 0) {
			url = url.replace('https://','https://m.');
		}
	}
	document.location.href = url;
}