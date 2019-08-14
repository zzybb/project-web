
function startAnalysis(){// 开始创作
	
	var stype = $("#stype").val().trim();
	var count = $("#count").val().trim();
	var params = {
			num_chars:stype,
			num_sents:count
	}
	$("#btn").button("loading");
	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/get_shi",
		data : params,
        dataType: 'json',
		success : function(data) {
			if(data.state==1){
                data = data.result;
				shis = "";
				for (var i = 0; i < data.length; i++) {
					shis += data[i]+"<br />";
				}
				
				$("#result").html(shis);
			}
			$('#btn').button('reset')
		},
		error : function(request) {
			$("#result").html("抱歉，创作时发生了一点小意外，请稍候再试！");
			$('#btn').button('reset')
		}
	});
}


