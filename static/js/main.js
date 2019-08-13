//注册按钮
function toRegister() {
    window.location.href = "http://open.birdbot.cn/toregister.do";
//	window.location.href = "http://open.birdbot.cn/FAQAccount/toRegister.do;
}
//登录按钮
function toLogin() {
    window.location.href = "http://open.birdbot.cn/";
}

$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() >100){
			$('.goto').show()
		}else{
			$('.goto').hide()
		}
	})
	
	$('.goto').click(function(){
		  $('html,body').animate({scrollTop:0}, 500);
	})
})
