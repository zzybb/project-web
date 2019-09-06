function keySend(event) {
	if (event.keyCode == 13) {
		startAnalysis();
	}
}

function fakeClick(obj) {
   var ev = document.createEvent("MouseEvents");
   ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
     var urlObject = window.URL || window.webkitURL || window;
     var export_blob = new Blob([data]);
     var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
     save_link.href = urlObject.createObjectURL(export_blob);
     save_link.download = name;
     fakeClick(save_link);
}

function exec1(command) {
    var ws = new ActiveXObject("WScript.Shell");
    ws.run(command);
}


function startAnalysis() {// 开始分析
    var content = $("#input_sec2_1").val().trim();
    exportRaw('template.txt', content);
    exec1("activate zzy");
    exec1("");

}