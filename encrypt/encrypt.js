var webdevencrypt = {
    setEncrypt: function(source,destination,passcode) {
        document.getElementById(destination).innerText = this.encryptCodes(document.getElementById(source).value,document.getElementById(passcode).value);
    },
    setDecrypt: function(source,destination,passcode) {
                document.getElementById(destination).innerText = this.decryptCodes(document.getElementById(source).value,document.getElementById(passcode).value);
    },
    encryptCodes: function(content,passcode) {
        var result = []; var passLen = passcode.length ;
        for(var i = 0  ; i < content.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
            result.push(calAscii);
        }
        return JSON.stringify(result) ;
    },
    decryptCodes: function(content,passcode) {
        var result = [];var str = '';
        var codeArr = JSON.parse(content);
        var passLen = passcode.length ;
        for(var i = 0  ; i < codeArr.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (codeArr[i]-passcode.charCodeAt(passOffset));
            result.push(calAscii) ;
        }
        for(var i = 0 ; i < result.length ; i++) {
            var ch = String.fromCharCode(result[i]); str += ch ;
        }
        return str ;
    }
}

