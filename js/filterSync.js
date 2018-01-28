var os = require('os');
var fs = require('fs');
var { remote } = require('electron');
module.exports = {

    filter_file_exists () {
        return os.path.isfile('filters.json')
    },

    add_data (name, filters) {
        const email = remote.getGlobal('auth').email;
        remote.getGlobal('data').filters[email][name] = filters; // Add new entry
        // This will need updated to support windows/packaging
    },

    save_data (data, filename) {
        fs.writeFileSync('filters.json', JSON.stringify(data)); // Save new data in file
    },

    load_data (filename) {
        if (filter_file_exists()) {
            return JSON.parse(fs.readFileSync(filename));
        } 
    },

    add_email () {
        const email = remote.getGlobal('auth').email;
        if (remote.getGlobal('data').filters[email] == undefined)
            remote.getGlobal('data').filters[email] = {};
    }
}