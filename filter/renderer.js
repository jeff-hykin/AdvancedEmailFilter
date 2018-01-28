"use strict";

var filterActions = require('../js/filter_class.js');
var {remote} = require('electron');

var $ = require('jQuery');

$(document).ready(function () {
    $('.modal').modal();
    //$('.modal-trigger').leanModal();
    $('select').material_select();

    //Show filters
    let filters = filterActions.readFilters();
    for(let filter in filters){
        $('#filter-list').prepend(filter.itemHTML);
    }
    
});

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
    console.log(search1);
    console.log(search2);
    console.log(doWhat);
    console.log(toWhere);
    searchInbox([search1,search2]);//sends the now formatted search form to the function in search.js
}