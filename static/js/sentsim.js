var swFlag = 0;
function replaced(){// 更换示例
    switch (swFlag) {
    case 0:
        swFlag +=1;
        $('#input_sec2_1').val('广州有多少个客运站')
        $('#input_sec2_2').val('深圳有多少个客运站')
        $('#btn').click()
        break;
    case 1:
        swFlag +=1;
        $('#input_sec2_1').val('广州有多少个客运站')
        $('#input_sec2_2').val('深圳客运站的数目')
        $('#btn').click()
        break;

    default:
        swFlag =0;
        $('#input_sec2_1').val('广州有多少个客运站')
        $('#input_sec2_2').val('广州客运站的数目')
        $('#btn').click()
        break;
    }
}

function clearWord(flag){// 清空示例
    $("#input_sec2_"+flag).html("");
    $("#result").html("");
}

function SentSim(){
    var content1 = $("#input_sec2_1").val().trim();
    var content2 = $("#input_sec2_2").val().trim();
    if(content1=="" |content2==""){
        $("#result").html("");
        return;
    }
    if(content1.length>30){
        content1 = content1.substring(0,30);
    }
    if(content2.length>30){
        content2 = content2.substring(0,30);
    }
    var params = {
            'sent1':content1,
            'sent2':content2
    }

    $("#btn").button("loading");

    // 语义相似度
    $.ajax({
        type : "POST",
        url : "http://api.birdbot.cn:8864/sent_sim",
        data : params,
        dataType: 'json',
        success : function(data) {
            if(data.state==1){
                data = data.result;
                $("#result").html('<center>'+data+'</center>');
                $('#btn').button('reset')
            }

        },
        error : function(request) {
            $("#result").html("抱歉，计算语义相似度时发生了一点小意外，请稍后再试！");
            $('#btn').button('reset')
        }
    });

}

function keySend(event) {
    if (event.keyCode == 13) {
        SentSim();
    }
}

