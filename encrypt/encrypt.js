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

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }

  // Bind event
  (function() {
    var urlField = document.getElementById('url');
    var dataField = document.getElementById('data');
    var outputField = document.getElementById('output');
    document.getElementById('get').onclick =
    document.getElementById('post').onclick = function(e) {
      e.preventDefault();
      doCORSRequest({
        method: this.id === 'post' ? 'POST' : 'GET',
        url: urlField.value,
        data: dataField.value
      }, function printResult(result) {
        outputField.value = result;
      });
    };
  })();
  if (typeof console === 'object') {
    console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
    console.log('cors_api_url = "http://localhost:8080/"');
  }
