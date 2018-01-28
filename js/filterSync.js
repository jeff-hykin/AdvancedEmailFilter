var fs = require('fs');
var { remote } = require('electron');
module.exports = {

    file_exists (filename) {
        return fs.existsSync(filename);
    },

    add_filter (name, search1, search2, action, resultLabel) {
        // make sure email has been set
        this.add_email();
        const email = remote.getGlobal('auth').email;
        remote.getGlobal('data').filters[email][name] = {
            "search1": search1,
            "search2": search2,
            "action": action,
            "resultLabel": resultLabel,
            "enabled": true
        }; // Add new entry
        console.log(remote.getGlobal('data').filters)
        // This will need updated to support windows/packaging
    },

    remove_filter (name) {
        // Make sure email has been set
        this.add_email();
        const email = remote.getGlobal('auth').email;
        if (Object.keys(remote.getGlobal('data').filters[email]).indexOf(name) > -1) {
            console.log('t');
            remote.getGlobal('data').filters[email][name] = undefined; // Delete key
            this.save_data(remote.getGlobal('data').filters, 'filters.json'); // Save changes
            remote.getGlobal('data').filters = this.load_data('filters.json');
        }
    },

    save_data (data, filename) {
        fs.writeFileSync(filename, JSON.stringify(data)); // Save new data in file
    },

    load_data (filename) {
        if (this.file_exists(filename)) {
            return JSON.parse(fs.readFileSync(filename));
        } else {
            return {};
        }
    },

    add_email () {
        const email = remote.getGlobal('auth').email;
        if (remote.getGlobal('data').filters[email] == undefined)
            remote.getGlobal('data').filters[email] = {};
    }
}