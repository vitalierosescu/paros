import $ from 'jquery';
import * as jqueryMask from 'jquery-mask-plugin';
import * as jqueryValidation from 'jquery-validation';

import jqueryNiceSelect from '../jquery.nice-select';

const contact = () => {
  $('.field').on('focusin', function () {
    $(this).siblings('.field_label').removeClass('large');
  });
  $('.field').on('focusout', function () {
    if ($(this).val().length === 0) {
      $(this).siblings('.field_label').addClass('large');
    }
  });

  // Learn more at https://jqueryvalidation.org/
  // Options at https://jqueryvalidation.org/validate/
  // Methods at https://jqueryvalidation.org/category/methods/
  $('#contact-form').validate({
    rules: {
      projectPriority: {
        required: true,
      },
    },
    email: {
      required: true,
      email: true,
    },

    errorPlacement: function (error, element) {
      error.appendTo(element.closest('.field_wrap'));
    },

    messages: {
      name: 'Laat uw naam achter, zo maken we het persoonlijker.',
      email: 'Gelieve uw email in te vullen.',
      phone: 'Graag uw telefoonnummer achterlaten voor vlotte communicatie.',
    },
  });

  //Mascara para campos
  $(() => {
    $('.phone').mask('(00) 00000-0000');
  });

  //Nice Select
  $(() => {
    if ($('select')) {
      $('select').niceSelect();
    }
  });

  $(function () {
    $(document).on('submit', 'form', function () {
      $('html,body').animate({ scrollTop: 0 }, 1000);
    });

    // when the form is submitted
    $('form').submit(() => {
      // wait 1000ms (so we have time to see the success wrapper show)
      setTimeout(() => {
        // click our .form-success-trigger
        // this class has an Interaction on it that runs our Lottie icon animation
        $('.form_sucess_trigger').click();
      }, 1000);
      // NICE!!!!!!!!
    });
  });
};

export default contact;
