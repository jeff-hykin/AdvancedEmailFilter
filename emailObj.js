/**
 * Creates an email sync object from the async email object given from Imap
 */

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'FAMEtestFAME@gmail.com',
  password: 'justanotherpassword',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

//for reference, remove later
function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

class emailObj {
    
    constructor(emailIndex) {
        this.subject = null;
        this.date = null;
        this.from = null;
        this.to = null;
        this.cc = [];
        this.body = null;
        this.index = emailIndex;

        var f = imap.fetch(emailIndex, { struct: true, bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)' });
        f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                var buffer = '';
                stream.on('data', function(chunk) {
                  buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                    var header = Imap.parseHeader(buffer);
                    this.from = header.from;
                    this.to = header.to;
                    this.subject = header.subject;
                    console.log(this.to);
                    console.log(this.from);
                    console.log(this.subject);
                });
            });
            msg.on('attributes', function(attrs){
                this.date = attrs.date;
                console.log(this.date);
                console.log(inspect(attrs.struct));
                
            });
            console.log('Message #%d', seqno);
            f.once('end', function() {
            });
        });
        var b = imap.fetch(emailIndex, { bodies: 1 });
        b.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                var buffer = '';
                stream.on('data', function(chunk) {
                  buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                    console.log(buffer);
                });
            });
            console.log('Message #%d', seqno);
            b.once('end', function() {
            });
        });
    }
    //object properties:

    
}


imap.once('ready', function(){          //TEMPORARY this js is optimized for the imap to have already been initialized

    imap.openBox('INBOX', true, function(err, box) {
        if (err) throw err;
        e = new emailObj(box.messages.total);
        e.date
        imap.end();
    });
});



imap.once('error', function(err) {
    console.log(err);
});
  
imap.once('end', function() {
    console.log('Connection ended');
});
  
imap.connect();
  