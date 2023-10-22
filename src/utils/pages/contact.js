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

  /**
   * Form Validation
   */
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
      message: 'Laat een opmerking achter.',
    },
  });

  /**
   * Format the phone number while typing
   */
  $(() => {
    var options = {
      onKeyPress: function (cep, e, field, options) {
        var masks = ['000 00 00 00 00', '000 000 00 000'];
        var mask = e.currentTarget.value.length > 13 ? masks[0] : masks[1];
        $('.phone').mask(mask, options);
      },
    };

    $('.phone').mask('000', options);
  });

  /**
   * Nicely styled select field
   */
  $(() => {
    if ($('select')) {
      $('select').niceSelect();
    }
  });

  $(function () {
    $(document).on('submit', 'form', function () {
      $('html,body').animate({ scrollTop: 0 }, 1000);
    });

    /**
     * Submit form
     */
    $('form').submit(() => {
      setTimeout(() => {
        $('.form_sucess_trigger').click();
      }, 1000);
    });
  });
};

export default contact;
