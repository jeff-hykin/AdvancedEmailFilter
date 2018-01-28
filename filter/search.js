"use strict";
var Imap = require('imap'),
    inspect = require('util').inspect;
//this is the function called once a search criteria(crit) is made
function searchInbox(crit) {
    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }
    //init imap
    var imap = new Imap({
        user: remote.getGlobal('auth').email,
        password: remote.getGlobal('auth').password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });
    //start parsing thru everything
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) throw err;
            imap.search(crit, function (err, results) { //seach call
                if (err) throw err;
                var f = imap.fetch(results, { bodies: '' }); //grabbing the results
                f.on('message', function (msg, seqno) {
                    console.log('Message #%d', seqno);
                    msg.on('body', function (stream, info) {
                        var buffer = '';
                        stream.on('data', function (chunk) {
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', function () {
                            var header = Imap.parseHeader(buffer);//TODO modify/filter the emails instead of displaying them
                            console.log(header.from);
                            console.log(header.to);
                            console.log(header.subject);
                        });
                    });
                    msg.once('end', function () {
                        console.log('--End--');
                    });
                });
                f.once('error', function (err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function () {
                    console.log('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    });
    imap.once('error', function (err) {
        console.log(err);
    });

    imap.once('end', function () {
        console.log('Connection ended');
    });

    imap.connect();
}

