"use strict";

var FilterClass = require('../js/filter_class.js');
var {remote} = require('electron');

var $ = require('jQuery');

$(document).ready(function () {
    $('.modal').modal();
    //$('.modal-trigger').leanModal();
    $('select').material_select();
    
});


console.log('test');
console.log(remote.getGlobal('auth').email);
console.log('test2');


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