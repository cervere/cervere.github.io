$(document).ready(function(){ 
  (function() {
    var printResult = function(result) {
      $('#categoryform').trigger("reset");
      $('#thoughtoractionform').trigger("reset");
      $('#contentform').trigger("reset");
      location.reload();
    };
    document.getElementById('submitthought').onclick = function(e) {      
      e.preventDefault();
      options = webdevencrypt.getOptions(encrypt=false)
      doCORSRequest(options, printResult);
    };
    document.getElementById('submitencryptedthought').onclick = function(e) {      
      e.preventDefault();
      options = webdevencrypt.getOptions(encrypt=true)
      doCORSRequest(options, printResult);
    };
  
  })();  
  $("#booking").hide();
  $("#newcategorydiv").hide();
    $("#categoryform input" ).change(function() {
    var val = $("input[name=category]:checked", "#categoryform").val();  
  if(val != undefined) {
     if (val == "Other") {
       $("#newcategorydiv").show();
     } else {
       $("#newcategorydiv").hide();
     }
   }
   });
});
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
    },
    getOptions: function(encrypt){
        var sheets_url = 'https://script.google.com/macros/s/AKfycbzZZz38fjoE0B80D_hQiMc14D2c_Ju1sIQlQjGFJAYPcepjVfVx/exec'        
        var category = $("input[name=category]:checked", "#categoryform").val();  
        if (category == "Other") {
           category = $("#newcategory").val();
         } 
        if(category == undefined) {
          category = 'Miscellaneous'
        }
        var thought_or_action = $("input[name=thoughtoraction]:checked", "#thoughtoractionform").val();  
        var subcategory = $("#subcategory").val();
        var content = $("#content").val();
        var passcode = document.getElementById('passcode').value;
        if (passcode == '') {
          passcode = 'default';
        }
        if (encrypt) {
            content = webdevencrypt.encryptCodes(content,passcode);
        }
        options = {
            method: 'GET',
            url: sheets_url+'?'+'thought_or_action='+thought_or_action+'&category='+category+'&subcategory='+subcategory+'&content='+content,
            data: ''
          }
        return options
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


