/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	$(document).ready(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});

	var start = document.getElementById("index_date_from").flatpickr({
	  minDate: new Date() });
	var end = document.getElementById("index_date_to").flatpickr({
	  minDate: new Date() });
	start.config.onChange = function (dateObj) {
	  return end.set("minDate", dateObj.fp_incr(1));
	};
	end.config.onChange = function (dateObj) {
	  return start.set("maxDate", dateObj.fp_incr(-1));
	};

	document.getElementById('submitIndexSearch').addEventListener('click', function () {
	  var location = document.getElementById('location').value;
	  var starting_date = document.getElementById('index_date_from').value;
	  var ending_date = document.getElementById('index_date_to').value;
	  if (location === '' || starting_date === '' || ending_date === '') {
	    var error = document.getElementById('searchError');
	    var button = document.getElementById('submitIndexSearch');
	    error.classList.toggle('hiddenError');
	    button.setAttribute('disabled', true);
	    setTimeout(function () {
	      error.classList.toggle('hiddenError');
	      button.removeAttribute('disabled');
	    }, 2000);
	  } else {
	    var locationNew = "/events?location=" + location + "&starting_date=" + starting_date + "&ending_date=" + ending_date;
	    window.location = locationNew;
	  }
	});

	document.getElementById('location').addEventListener('keypress', function (e) {
	  if (e.key == "Enter") {
	    var location = document.getElementById('location').value;
	    var starting_date = document.getElementById('index_date_from').value;
	    var ending_date = document.getElementById('index_date_to').value;
	    if (location === '' || starting_date === '' || ending_date === '') {
	      var error = document.getElementById('searchError');
	      var button = document.getElementById('submitIndexSearch');
	      error.classList.toggle('hiddenError');
	      button.setAttribute('disabled', true);
	      setTimeout(function () {
	        error.classList.toggle('hiddenError');
	        button.removeAttribute('disabled');
	      }, 2000);
	    } else {
	      var locationNew = "/events?location=" + location + "&starting_date=" + starting_date + "&ending_date=" + ending_date;
	      window.location = locationNew;
	    }
	  }
	});

/***/ }
/******/ ]);