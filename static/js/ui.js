var hris = (function (h, $) {

  h.ui = {
    init: function (options) {

      var defaults = {
        'dateFormat': 'DD/MM/YYYY',
        'timeFormat': 'HH:mm',
        'datetimeFormat': 'DD/MM/YYYY HH:mm',
        'stepMinute': 15,
        'datetimePickerConfig': {
          icons: {
            time: 'fas fa-clock',
            date: 'fas fa-calendar',
            up: 'fas fa-arrow-up',
            down: 'fas fa-arrow-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-calendar-check-o',
            clear: 'fas fa-trash',
            close: 'fas fa-times'
          }
        },
        'tinyConfig': {
          entity_encoding: 'raw',
          statusbar: false,
          menubar: false,
          plugins: "link lists",
          style_formats: [
            {title: 'Text', block: 'p'},
            {title: 'Heading', block: 'h2'},
            {title: 'Subheading', block: 'h3'}
          ],
          toolbar: "styleselect | bold italic blockquote | bullist numlist | link",
          height: 300
        },
        'timepickerConfig': {
          timeFormat: 'HH:mm:ss',
          dynamic: false,
          dropdown: true,
          scrollbar: true
        }
      };

      h.ui.options = $.extend(true, defaults, options);
      h.ui.initWidgets(window.document);


      $('button[data-toggle="collapse"]').on('click', function (e) {
        e.preventDefault();
      })
    },
    initWidgets: function (el) {
      h.ui.initWYSIWYG(el);
      h.ui.initSelects(el)
      h.ui.initTime(el);
    },

    initWYSIWYG: function (el) {
      var $textarea = $(el).find('textarea').not('.no-widget-init');
      $textarea.filter('form.wysiwyg textarea').tinymce(h.ui.options.tinyConfig)
    },

    initSelects: function (el) {
      var $selects = $(el).find('select').not('.no-widget-init select').not('.no-widget-init');
      $selects.filter('.form-stacked select').css('width', '100%').select2({width: 'resolve', theme: 'classic'});

      $(el).find('select.select2').each(function (i, e) {
        var opts = {}
        if ($(e).data('ajax-url')) {
          opts = {
            ajax: {
              url: $(e).data('ajax-url'),
              dataType: 'json',
              data: function (params) {
                return {
                  q: params.term,
                  page: params.page || 1
                };
              }
            },
            multiple: $(e).data('multiple')
          };
        }
        $(e).select2(opts)
      });
    },

    initTime: function (el) {
      let $times = $(el).find('input.timepicker');
      $times.timepicker(h.ui.options.timepickerConfig)
    }

  };

  return h;
})(hris || {}, jQuery)
