var Imap = require('imap'),
    inspect = require('util').inspect;

module.exports = {
    /**
     * 
     * @param {string}  email 
     * @param {string}  password 
     * @param {string}  host 
     * @param {int}     port 
     * @description Creates an imap connection object and returns it
     * @returns {object} new Imap
     */
    create_imap: function (email, password, host, port) { 
        var imap = new Imap({
            user: email,
            password: password,
            host: host,
            port: port,
            tls: true,
            connTimeout: 20000
        });
        return imap;
    },

    /**
     * Retrieve three emails from an imap
     * @param {*} imapConnection 
     */
    get_three_emails: function (imapConnection) {
        imapConnection.once('ready', function() {
            openInbox(function(err, box) {
            if (err) throw err;
            var f = imapConnection.seq.fetch('1:3', {
                bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                struct: true
            });
            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function(stream, info) {
                var buffer = '';
                stream.on('data', function(chunk) {
                    buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                    console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                });
                });
                msg.once('attributes', function(attrs) {
                console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function() {
                console.log(prefix + 'Finished');
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
                imapConnection.end();
            });
            });
        }); 
        
        imapConnection.once('error', function(err) {
            console.log(err);
        });
        
        imapConnection.once('end', function() {
            console.log('Connection ended');
        });
        
        imapConnection.connect();      
    }

}

/**
 * 
 * @param {function} cb Callback function 
 */
function openInbox (cb) {
    imap.openBox('INBOX', true, cb);
}

