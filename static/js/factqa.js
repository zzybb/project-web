var swFlag = 0;
function replaced(){// 更换分词示例
	switch (swFlag) {
	case 0:
		swFlag +=1;
		$('#input_sec2_1').val('丹霞山有多高')
		//$("#content-1").html("<textarea class=\"txt\" id=\"input_sec2_1\" onkeydown=\"keySend(event);\">丹霞山有多高</textarea>");
		break;
	case 1:
		swFlag +=1;
		$('#input_sec2_1').val('世界上最高的山')
		//$("#content-1").html("<textarea class=\"txt\" id=\"input_sec2_1\" onkeydown=\"keySend(event);\">世界上最高的山</textarea>");
		break;
	case 2:
		swFlag +=1;
		$('#input_sec2_1').val('辛亥革命是哪一年')
		//$("#content-1").html("<textarea class=\"txt\" id=\"input_sec2_1\" onkeydown=\"keySend(event);\">辛亥革命是哪一年</textarea>");
		break;

	default:
		swFlag =0;
		$('#input_sec2_1').val('中国第一个皇帝是谁')
		//$("#content-1").html("<textarea class=\"txt\" id=\"input_sec2_1\" onkeydown=\"keySend(event);\">中国第一个皇帝是谁</textarea>");
		break;
	}
	startAnalysis();
}
function clearWord(){// 清空分词示例
	$('#input_sec2_1').val(' ')
	//$("#content-1").html("<textarea class=\"txt\" id=\"input_sec2_1\" onkeydown=\"keySend(event);\"></textarea>");
}

function startAnalysis(){// 开始分析
	var content = $("#input_sec2_1").val().trim();
	if(content=="" || content.length>60){
		$("#result").html("");
		return;
	}
//	content = content.replace(/[ ]/g,""); //去除字符算中的空格
	var params = {
			question:content
	}
	
	$("#btn").button("loading");
	
	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/factqa",
		data : params,
        dataType: 'json',
		success : function(data) {
			if(data.state==1){
                data = data.result;
				results = data.result
				evidences = data.evidences
				answer = "";
				for (var i = 0; i < results.length; i++) {
					answer +="<font color=\"#2c2c2\">top"+(i+1)+"）</font> "+results[i][0]+"&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				zjs= "";
				for (var i = 0; i < evidences.length; i++) {
					zjs +=(i+1)+"）"+evidences[i]+"<p>&nbsp;</p>";
				}
				$("#answer").html(answer);
				$("#result").html(zjs);
			}
			$('#btn').button('reset')
		},
		error : function(request) {
			$("#answer").html("");
			$("#result").html("抱歉，没找到相关答案！");
			$('#btn').button('reset')
		}
	});
}

function keySend(event) {
	if (event.keyCode == 13) {
		startAnalysis();
	}
}







