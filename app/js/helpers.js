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
