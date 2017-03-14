import {
    uppercaseFirstWord,
    validatedField,
    addPhoneValidator,
    addEmailValidator,
    addZipValidator,
    addPhoneAttributes,
    addEmailAttributes,
    addZipAttributes
} from './helpers.js'

import {
  initializeStepformFunctionality
} from './stepform'


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
            initializeStepformFunctionality(FORM, settings)
            // stepformFunctionality(settings.step1Selector, settings.step2Selector)
            // setGroupAttributes()
        }

        if (settings.verifyPhone) {
            addPhoneValidator(phoneURL)
            addPhoneAttributes(FORM)
        }

        if (settings.verifyEmail) {
            addEmailValidator(emailURL)
            addEmailAttributes(FORM)
        }

        if (settings.verifyZip) {
            addZipValidator(cityInput, stateInput)
            addZipAttributes(FORM)
        }

        FORM.parsley()
            .on('field:validated', (fieldInstance) => {
                validatedField(FORM, fieldInstance, options)
            })
            .on('field:ajaxoptions', (parsleyInstance) => {
                console.log(parsleyInstance);

            })

    };
}(jQuery));

// $('.requestinfo').validateForm({verifyPhone: false, verifyEmail: false});
