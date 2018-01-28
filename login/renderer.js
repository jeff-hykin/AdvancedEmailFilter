"use strict";
var Imap = require('imap'),
    inspect = require('util').inspect,
    {remote} = require('electron');

var $ = require('jQuery');

//submits form on enter key press
$(document).ready(function() {
    $('.modal').modal();
    $(document).on('keydown keyup', event => {
        if(event.keyCode == 13) {
            $('#login-btn').click();
        }
    });
});

//function call on form submit
function connectIMAP() {
    var email = $('[name="email"]').val();
    var password = $('[name="password"]').val();
    
    if(email == '' || password == ''){
        $('#err-inf').text('Username or password field is empty');
    } else {
        $('#err-inf').text('');
        var imap = new Imap({
            user: email,
            password: password,
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });

        remote.getGlobal('auth').email = email; // Update global email reference
        remote.getGlobal('auth').password = password; // Update global password reference
        // remote.getGlobal('auth').password will get password

        //opens filters if the credentials work
        imap.once('ready', function() {
            location.href = "../filter/index.html";
        });

        imap.once('error', function(err) {
            if(/Failure/.test(err)) {
                var errMsg = String(err).replace(/^Error: (.+)(?= \(Failure)[\s\S]+/,"$1")
                $('#con-err-msg').text(errMsg);
                $('#connection-error-mod').modal('open');
                console.log('IMAP error');
            }
            console.log(err);
        });
        
        imap.once('end', function() {
            console.log('Connection ended');
        });
        
        imap.connect();
    }
}
