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
