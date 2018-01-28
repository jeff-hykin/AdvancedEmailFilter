"use strict";

var FilterClass = require('../js/filter_class.js');
var {remote} = require('electron');

var $ = require('jQuery');

$(document).ready(function () {
    $('.modal').modal();
    //$('.modal-trigger').leanModal();
    $('select').material_select();
    
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
    searchInbox([search1,search2]);
}
function timer_for(time_amount){
    return new Promise(resolve => 
    {
        setTimeout(()=>{ resolve(null) }, time_amount)
    })
}

async function GetData() {
    while (true)
    {
        await timer_for(100)
    }
}

GetData()