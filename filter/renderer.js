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

