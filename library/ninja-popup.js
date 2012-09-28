(function ($) {
  'use strict';

  $.Ninja.Popup = function (element, options) {
    var popup = this;

    if (element) {
      popup.$element = $(element);
    } else {
      $.ninja.error('Popup must include an element.');
    }

    if (options && 'html' in options) {
      popup.$html = $('<span>', {
        html: options.html
      });
    } else if (popup.$element.data('popup')) {
      popup.$html = $('<span>', {
        text: popup.$element.data('popup')
      });
    } else {
      $.ninja.error('Popup must include JavaScipt html option or HTML data-popup attribute.');
    }

    if (options && 'hover' in options && options.hover === true) {
      popup.trigger = 'hover';
    } else {
      popup.trigger = 'toggle';
    }

    popup.$point = $('<span>');

    popup.$popup = $('<span class="ninja-popup">').append(popup.$point, popup.$html);

    popup.$element[popup.trigger](function () {
      popup.$window = $(window);

      popup.viewport = {
        left: popup.$window.scrollLeft(),
        top: popup.$window.scrollTop()
      };
      popup.viewport.bottom = popup.viewport.top + popup.$window.height();
      popup.viewport.right = popup.viewport.left + popup.$window.width();

      $(document.body).append(popup.$popup);

      if (popup.$element.css('display') === 'inline') {
        popup.elementHeight = popup.$element.height();
        popup.elementWidth = popup.$element.width();
      } else {
        popup.elementHeight = popup.$element.outerHeight();
        popup.elementWidth = popup.$element.outerWidth();
      }
      popup.elementHalfHeight = popup.elementHeight / 2;
      popup.elementHalfWidth = popup.elementWidth / 2;

      popup.offset = popup.$element.offset();
      popup.offset.center = popup.offset.left + popup.elementHalfWidth;
      popup.offset.middle = popup.offset.top + popup.elementHalfHeight;

      popup.height = popup.$popup.outerHeight();
      popup.width = popup.$popup.outerWidth();
      popup.halfHeight = popup.height / 2;
      popup.halfWidth = popup.width / 2;

      if ((popup.offset.top - popup.height) < popup.viewport.top) {
        popup.$point.attr('class', 'ninja-point-up');

        popup.$popup.css('top', Math.round(popup.offset.top + popup.elementHeight + 6));
      } else {
        popup.$point.attr('class', 'ninja-point-down');

        popup.$popup.css('top', Math.round(popup.offset.top - popup.height - 6));
      }

      popup.$point.css('left', Math.round(popup.halfWidth - 5));

      if ((popup.offset.left + popup.elementHalfWidth + popup.halfWidth) > popup.viewport.right) {
        popup.$popup.css({
          right: 0
        });

        popup.$point.css('right', Math.round(popup.offset.center));
      } else if ((popup.offset.left + popup.elementHalfWidth - popup.halfWidth) < popup.viewport.left) {
        popup.$popup.css({
          left: 0
        });
      } else {
        popup.$popup.css({
          left: Math.round(popup.offset.left + popup.elementHalfWidth - popup.halfWidth)
        });
      }
    }, function () {
      popup.$popup.detach();
    });
  };

  $.ninja.popup = function (element, options) {
    $.extend(new $.Ninja(element, options), new $.Ninja.Popup(element, options));
  };
}(jQuery));
