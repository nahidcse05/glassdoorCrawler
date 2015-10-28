function show_hide_login_menu(){
	jQuery("#head_login_box_error_box").html("");
	jQuery("#head_login_box_error_box").hide();	
	
	var lb = document.getElementById("head_login_box");
	if(lb){
	  if(lb.style.display=="none"){
		lb.style.display="";
		jQuery("#login_txtbox").focus();
	  } else { lb.style.display="none"; }
	}
}

function login_menu_click(){	
	_gaq.push(['_trackEvent', 'Login - Navbar', 'Click']);
	jQuery('#head_login_box_form input[name="token"]').val(get_cookie("phpbb2mysql_sid"));
	jQuery.post("/health/login_nav_box_handler.php", jQuery("#head_login_box_form").serialize(), function(data){
	var obj = jQuery.parseJSON(data);
	if (obj['error']==0) {
		//user logged in successfuly
		_gaq.push(['_trackEvent', 'Login - Navbar', 'Successful']);
		
		if (obj['redirect']) {
			//John Ayres
			// alert("dadas");
			document.location.href = "http://ehealthforum.com/"+obj['redirect'];
		}else{
			/*Check if on the registration page*/
			if( window.location.href.indexOf( 'health/profile.php?mode=register' ) != -1 ) {
				window.location.href="/";
			}else{
				location.reload();
			}			
		}
	} else {
		//Error while user logges in
		_gaq.push(['_trackEvent','Login - Navbar', 'Login Error']); 
		//_gaq.push(['_trackEvent', 'Login - Navbar', 'Bad Login']);
		//if (obj['bad_password']==1) {
		//	_gaq.push(['_trackEvent', 'Login - Navbar', 'Bad Password']);
		//}
		//alert(obj['error_message']);
		jQuery("#head_login_box_error_box").html(obj['error_message']);
		jQuery("#head_login_box_error_box").show();
		jQuery("#login_txtbox").focus();
		if(obj['redirect']) {
			window.location.replace(obj['redirect']);
		}
	}	
	});
	return false;
}

function login_popup_forgot_pass_click(){
	_gaq.push(['_trackEvent', 'Login - Navbar', 'Forgot Password Link']);
}
function login_popup_register_click(){
	//alert("registerc");
	_gaq.push(['_trackEvent', 'Login - Navbar', 'Register Link']);
}

