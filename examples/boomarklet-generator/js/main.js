var editor1 = CodeMirror.fromTextArea(document.getElementById("code1"), {
    lineNumbers: true,
    matchBrackets: true,
    lineWrapping: true,
    extraKeys: {
        "Enter": "newlineAndIndentContinueComment"
    }
});
$('input').on("keyup", function () {
    var text = $(this).val();
    $('a#bookmarklet').text(text);
});
$('a#bookmarklet').on('mousedown', function () {
    var str = 'try{\n' + editor1.getValue() + '\n}catch(e){alert(e);}'; 
    var packer = new Packer;
    var packed = packer.pack(str); 
    var bookmarklet = "javascript:" + encodeURI(packed) + ";void(0);";
    $('a#bookmarklet').attr('href', bookmarklet);
});

window.addEventListener("error", function(e) { alert(e.message); }, true);