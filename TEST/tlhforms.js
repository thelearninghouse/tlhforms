/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// let baseEmailURL = 'http://www.xverify.com/services/emails/process/'
// let basePhoneURL = 'http://www.xverify.com/services/phone/process/'
// let domain = window.location.hostname == 'localhost' ? 'online.aurora.edu' : window.location.hostname
// let dataURL = `?type=json&apikey=learninghouse&domain=${domain}`
// let emailURL = baseEmailURL + dataURL
// let phoneURL = basePhoneURL + dataURL

module.exports = {
  uppercaseFirstWord: function(str, force) {
    str = force ? str.toLowerCase() : str;
    return str.replace(/(\b)([a-zA-Z])/,
      function(firstLetter) {
        return firstLetter.toUpperCase();
      });
  },

  addPhoneValidator: function(phoneURL) {
    window.Parsley.addAsyncValidator('phonevalidator', function (xhr, instance) {
      let phoneResponse = xhr.responseJSON.phone
      return phoneResponse.error == 0
    }, phoneURL);
  },

  addEmailValidator: function(emailURL) {
    window.Parsley.addAsyncValidator('emailvalidator', function (xhr, instance) {
      let emailResponse = xhr.responseJSON.email
      return emailResponse.error == 0
    }, emailURL);
  },

  addZipValidator: function(cityInput, stateInput) {
    window.Parsley.addAsyncValidator('zipvalidator', function (xhr) {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText)
        cityInput.val(response['places'][0]['place name'])
        stateInput.val(response['places'][0]['state'])
        return true
      } else {
        return false
      }
    })
  },

  addPhoneAttributes: function(FORM) {
    FORM
      .find('.phone')
      .attr('data-parsley-remote', '')
      .attr('data-parsley-remote-validator', 'phonevalidator')
      .attr('data-parsley-remote-options', '{ "type": "GET", "dataType": "jsonp"}')
  },

  addEmailAttributes: function(FORM) {
    FORM
      .find('.email')
      .attr('data-parsley-remote', '')
      .attr('data-parsley-remote-validator', 'emailvalidator')
      .attr('data-parsley-remote-options', '{ "type": "GET", "dataType": "jsonp"}')
  },

  addZipAttributes: function(FORM) {
    FORM
      .find('.zip')
      .attr('data-parsley-remote', 'http://api.zippopotam.us/us/{value}')
      .attr('data-parsley-remote-validator', 'zipvalidator')
  },

  validatedField: function(FORM, fieldInstance, options) {
    function uppercaseFirstWord(str, force) {
      str = force ? str.toLowerCase() : str;
      return str.replace(/(\b)([a-zA-Z])/,
        function(firstLetter) {
          return firstLetter.toUpperCase();
        });
    }
    let idName = fieldInstance.$element.attr('aria-describedby')
    let validationResponse = `#${idName}`
    let arrErrorMsg = fieldInstance.getErrorsMessages();
    let fieldLabel = uppercaseFirstWord(fieldInstance.$element.prev('label').text(),true)

    if (fieldInstance.validationResult === true && $(validationResponse).html() == '') {
      // Valid field on first attempt so no functionality needed so on to next field
    } else if (fieldInstance.validationResult === true && $(validationResponse).html() != '') {
      options.onNextClicked.call(null, this)

      fieldInstance.$element.attr("aria-invalid", "false");
      $(validationResponse).html(`${fieldLabel} field is now valid`)

      setTimeout(function(){
        $(validationResponse).removeClass('active')
      }, 1800);
    } else {
      $(validationResponse)
        .html(arrErrorMsg[0])
        .addClass('active')

      fieldInstance.$element.attr("aria-invalid", "true");
    }

  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

let step1,
    step2,
    step1GroupName,
    step2GroupName

function handleTransitionFocus(step1, step2) {
  step1.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function(e) {

          if (step2.hasClass('show')) {
              step2.find('input, select').first().focus()
          } else {
              step1.find('input, select').first().focus()
          }
      });
}

function toggleToBlock2(step1, step2) {
  step1.addClass('hidden')
  step2.addClass('show')
  handleTransitionFocus(step1, step2)
}

function toggleToBlock1(step1, step2) {
  step1.removeClass('hidden')
  step2.removeClass('show')
  handleTransitionFocus(step1, step2)
}

function setGroupAttributes(step1, step2) {
  step1.find('input, select').attr('data-parsley-group', step1GroupName)
  step2.find('input, select').attr('data-parsley-group', step2GroupName)
}

module.exports = {
  initializeStepformFunctionality(FORM, settings) {
    const NextButton = FORM.find(settings.nextButton)
    const PreviousButton = FORM.find(settings.previousButton)
    const SubmitButton = FORM.find('.submit')

    step1 = FORM.find(settings.step1Selector)
    step2 = FORM.find(settings.step2Selector)
    step1GroupName = settings.step1Selector.slice(1)
    step2GroupName = settings.step2Selector.slice(1)

    setGroupAttributes(step1, step2)

    PreviousButton.keyup(function(e) {
        if (e.which == 13) {
            PreviousButton.click();
        }
    })

    NextButton.keyup(function(e) {
        if (e.which == 13 || e.which == 27) {
            NextButton.click();
        }
    })

    // PreviousButton.click(toggleToBlock1(step1, step2))
    PreviousButton.click(function(clickEvent) {
      toggleToBlock1(step1, step2)
    })

    NextButton.click(function(clickEvent) {
        if ($('.stepform .requestinfo').parsley().validate({
                group: step1GroupName
            })) {
            toggleToBlock2(step1, step2)
        }
    });
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__helpers_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stepform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stepform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stepform__);





(function($) {
  let step1,
      step2,
      step1GroupName,
      step2GroupName

  function addValidationResponses(fields) {
    fields.each(function(index, value) {
      // console.log($(this))
      let id = $(this).attr('aria-describedby')
      let validationResponseElement = `<span id=${id} class="validationResponse test" aria-live="assertive" role="alert">Working</span>`

      $(this).after(validationResponseElement)
    })
  }

  // const NextButton = $('.next')
  // const PreviousButton = $('.previous')
  // const SubmitButton = $('.requestinfo .submit')

  // PreviousButton.keyup(function(e) {
  //     if (e.which == 13) {
  //         PreviousButton.click();
  //     }
  // })
  //
  // NextButton.keyup(function(e) {
  //     if (e.which == 13 || e.which == 27) {
  //         NextButton.click();
  //     }
  // })
  //
  //
  // PreviousButton.click(toggleToBlock1)
  //
  // NextButton.click(function(clickEvent) {
  //     if ($('.stepform .requestinfo').parsley().validate({
  //             group: step1GroupName
  //         })) {
  //         toggleToBlock2()
  //     }
  // });


    let baseEmailURL = 'http://www.xverify.com/services/emails/process/'
    let basePhoneURL = 'http://www.xverify.com/services/phone/process/'
    let domain = window.location.hostname == 'localhost' ? 'online.aurora.edu' : window.location.hostname
    let dataURL = `?type=json&apikey=learninghouse&domain=${domain}`
    let emailURL = baseEmailURL + dataURL
    let phoneURL = basePhoneURL + dataURL

    $.fn.validateForm = function(options) {
        const FORM = this
        let cityInput = FORM.find('input#city')
        let stateInput = FORM.find('input#state')
        let fields = FORM.find('input:not(:hidden), select')

        addValidationResponses(fields)

        var settings = $.extend({
            stepform: false,
            step1Selector: '.block1',
            step2Selector: '.block2',
            nextButton: '.next',
            previousButton: '.previous',
            verifyPhone: true,
            verifyEmail: true,
            verifyZip: true,
            onNextClicked: $.noop
        }, options);


        if (settings.stepform) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__stepform__["initializeStepformFunctionality"])(FORM, settings)
            // stepformFunctionality(settings.step1Selector, settings.step2Selector)
            // setGroupAttributes()
        }

        if (settings.verifyPhone) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addPhoneValidator"])(phoneURL)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addPhoneAttributes"])(FORM)
        }

        if (settings.verifyEmail) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addEmailValidator"])(emailURL)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addEmailAttributes"])(FORM)
        }

        if (settings.verifyZip) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addZipValidator"])(cityInput, stateInput)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["addZipAttributes"])(FORM)
        }

        FORM.parsley()
            .on('field:validated', (fieldInstance) => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_js__["validatedField"])(FORM, fieldInstance, options)
            })
            .on('field:ajaxoptions', (parsleyInstance) => {
                console.log(parsleyInstance);

            })

    };
}(jQuery));

// $('.requestinfo').validateForm({verifyPhone: false, verifyEmail: false});


/***/ })
/******/ ]);