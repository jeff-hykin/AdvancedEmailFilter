"use strict";

var filterActions = require('../js/filter_class.js');
var {remote} = require('electron');
var fs = require('fs');
var filterSync = require('../js/filterSync.js')

var $ = require('jQuery');
var filters;

$(document).ready(function () {
    $('.modal').modal();
    //$('.modal-trigger').leanModal();
    $('select').material_select();

    //Show filters
    filters = filterActions.readFilters();
    for(let ind in filters){
        $('#filter-list').prepend(filters[ind].itemHTML());
    }
    
});

function toggleEnable(name) {
    //Get name
    var allFilters = remote.getGlobal('data').filters;
    var email = remote.getGlobal('auth').email;
    var globalFilters = allFilters[email];

    var enabled;
    //find filter with name
    for(let fInd in filters){
        if(filters[fInd] === name){
            enabled = filters[fInd].enabled;
            filters[fInd].enabled = !enabled;
        }
    }

    if(enabled){
        $(`#${name}-enabled`).addClass('hide');
        $(`#${name}-disabled`).removeClass('hide');
    } else {
        $(`#${name}-enabled`).removeClass('hide');
        $(`#${name}-disabled`).addClass('hide');
    }

    globalFilters[name]["enabled"] = !enabled;
    
    filterSync.save_data(remote.getGlobal('data'), 'filters.json');
}

//saves form when user presses submit
function saveForm(){
    var select1 = document.getElementById("newIn");
    var select2 = document.getElementById("event");
    var select3 = document.getElementById("doWhat");
    var select4 = document.getElementById("toWhere");
    var search1 = select1.options[select1.selectedIndex].text; 
    var search2 = [select2.options[select2.selectedIndex].text, $('[name="word"]').val()];
    var doWhat = select3.options[select3.selectedIndex].text;
    var toWhere = select4.options[select4.selectedIndex].text;
    var word = $('[name="word"]').val();
    var name = $('[name="filter-name"]').val();
    
    console.log(search1);
    console.log(search2);
    console.log(doWhat);
    console.log(toWhere);
    var filter = new filterActions.FilterClass(name, search1, search2, doWhat, toWhere);
    $('#filter-list').prepend(filter.itemHTML());
    if (name) {
        if (Object.keys(remote.getGlobal('data').filters).indexOf(name) == -1 ) {
            filterSync.add_data(name, search1, search2, doWhat, toWhere); // action, resultLabel
            filterSync.save_data(remote.getGlobal('data').filters, 'filters.js');
        }
        else {
            // Show an error letting user know name already exists
        }
    } else {
        // Show an error letting user know name is required
    }
    searchInbox([search1,search2]);//sends the now formatted search form to the function in search.js
}