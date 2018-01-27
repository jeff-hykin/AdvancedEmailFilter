var login = require('./imap-login.js');
var prompt = require('prompt');
var schema = {
    properties: {
      email: {
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

prompt.get(schema, function (err, result) {
  // 
  // Log the results. 
  // 
    let imap = login.create_imap(result.email, result.password, 'imap.gmail.com', 933);
    login.get_three_emails(imap);
});