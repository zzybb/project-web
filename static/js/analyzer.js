var swFlag = 0;
function replaced(){// 更换分词示例
	switch (swFlag) {
	case 0:
		swFlag +=1;
		$('#input_sec1').val('作为我国北斗卫星导航系统“三步走”发展战略的第三步，北斗三号计划由24颗MEO卫星（中地球轨道卫星）、3颗GEO（地球同步轨道）卫星和3颗IGSO（倾斜地球同步轨道卫星）组成，总共30颗。')
		$('#btn').click()
		break;
	case 1:
		swFlag +=1;
		$('#input_sec1').val('世界上总有一些无良的商家，缺斤少两，偷梁换柱，让我们拿到商品时尴尬到无所适从。')
		$('#btn').click()
		break;

	default:
		swFlag =0;
		$('#input_sec1').val('夏天来临，皮肤在强烈紫外线的照射下，晒伤不可避免，因此，晒后及时修复显得尤为重要，否则可能会造成长期伤害。专家表示，选择晒后护肤品要慎重，芦荟凝胶是最安全，有效的一种选择，晒伤严重者，还请及时就医。')
		$('#btn').click()
		break;
	}
}
function clearWord(){// 清空分词示例
	$('#input_sec1').val(' ')
	$("#mCSB_1_container").html("");
	$("#mCSB_2_container").html("");
    $("#mCSB_3_container").html("");
    $("#mCSB_4_container").html("");
    $("#mCSB_5_container").html("");
}

function startAnalysis(){// 开始分析
	var content = $("#input_sec1").val().trim();
	if(content==""){
		$("#mCSB_1_container").html("");
		$("#mCSB_2_container").html("");
        $("#mCSB_3_container").html("");
        $("#mCSB_4_container").html("");
        $("#mCSB_5_container").html("");
		return;
	}
	if(content.length>110){
		content = content.substring(0,120);
	}
	content = content.replace(/[ ]/g,""); //去除字符中的空格
	var params = {
			text:content
	}
	
	$("#btn").button("loading");
	
	//分词
	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/tokenize",
		data : params,
        dataType: 'json',
		success : function(data) {
			if(data.state==1){
                data = data.result
				fxResult = "";
				for (var i = 0; i < data.length; i++) {
					result =data[i]
					result = result.replace(/(^\s*)|(\s*$)/g, "");
					if(result=="")continue;
					if(i%2==0){
						fxResult+="<span class=\"txt_bor normal\" >"+result+"</span>"
					}else{
						fxResult+="<span class=\"txt_bor stress\" >"+result+"</span>"
					}
				}
				$("#mCSB_1_container").html(fxResult);
				$('#btn').button('reset')
			}
			
		},
		error : function(request) {
			$("#mCSB_1_container").html("抱歉，分词时发生了一点小意外，请稍后再试！");
			$('#btn').button('reset')
		}
	});


	//词云分析
	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/word_count",
		data : params,
        dataType : "json",
		success : function(data) {
            if(data.state==1){
                data = data.result;
                $("#mCSB_2_container").html("");
                $("#mCSB_2_container").jQCloud(data);
            }
		},
		error : function(request) {
			$("#mCSB_2_container").html("抱歉，词云分析时发生了一点小意外，请稍后再试！");
			$('#btn').button('reset')
		}
	});


	//主题识别
	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/text_topic",
		data : params,
        dataType: 'json',
		success : function(data) {
			if(data.state==1){
                data = data.result;
				fxResult = "";
				for (var i = 0; i < data.length; i++) {
					_= data[i][0];
                    _ += " (" + String(data[i][1]) + ")";
                    fxResult += '<span class="txt_bor normal">' + _ + '</span>';
				}
				$("#mCSB_3_container").html(fxResult);
				$('#btn').button('reset')
			}
			
		},
		error : function(request) {
			$("#mCSB_3_container").html("抱歉，主题识别时发生了一点小意外，请稍后再试！");
			$('#btn').button('reset')
		}
	});


	//敏感词过滤

	var params = {
			'text':content,
	}

	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/sensitive",
		data : params,
        dataType: 'json',
		success : function(data) {
			if(data.result.spam==0){
				fxResult = "<span class=\"txt_bor normal\" >通过</span>";
			}else{
				fxResult = "<span class=\"txt_bor stress\" >不通过</span><p>(内容涉嫌违禁，建议进行人工复审)</p>"
			}
			$("#mCSB_4_container").html(fxResult);
			$('#btn').button('reset')
		
			
		},
		error : function(request) {
			$("#mCSB_4_container").html("抱歉，过滤时发生了一点小意外，请稍后再试！");
			$('#btn').button('reset')
		}
	});


	//情感分类

	var params = {
			'text':content,
	}

	$.ajax({
		type : "POST",
		url : "http://api.birdbot.cn:8864/sentiment",
		data : params,
        dataType: 'json',
		success : function(data) {
            if(data.state==1){
                data = data.result;
                data = '<span class="txt_bor normal">' + data + '</span>';
                data += "<p><strong>说明：</strong>大于0.75可以认为是正向情感，小于0.25可以认为是负向情感，其余区间可以认为是中性情感或模糊情感。</p>";
                $("#mCSB_5_container").html(data);
                $('#btn').button('reset')
			}
		},
		error : function(request) {
			$("#mCSB_5_container").html("抱歉，情感识别时发生了一点小意外，请稍后再试！");
			$('#btn').button('reset')
		}
	});

}

function keySend(event) {
	if (event.keyCode == 13) {
		startAnalysis();
	}
}

