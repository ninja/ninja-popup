(function ($) {
  'use strict';

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [popup])
      equal(actual, expected, [popup])
      notEqual(actual, expected, [popup])
      deepEqual(actual, expected, [popup])
      notDeepEqual(actual, expected, [popup])
      strictEqual(actual, expected, [popup])
      notStrictEqual(actual, expected, [popup])
      raises(block, [expected], [popup])
  */

  module('constructor', {
    setup: function () {
      this.constructor = $.Ninja.Popup;
    }
  });

  test('exists', function () {
    ok(this.constructor, 'should exist');
  });

  test('is a function', function () {
    ok($.isFunction(this.constructor), 'should be a function');
  });

  module('instance', {
    setup: function () {
      this.instance = new $.Ninja.Popup('<span data-popup="popup"></span>');
    }
  });

  test('is an instance', function () {
    ok(this.instance instanceof $.Ninja.Popup, 'should be instance of $.Ninja.Popup');
  });

  test('.$popup', function () {
    ok(this.instance.$popup, 'should exist');
    ok(this.instance.$popup.is('span'), 'should be a span element');
    ok(this.instance.$popup.hasClass('ninja-popup'), 'should have popup class');
  });

  module('HTML attribute', {
    setup: function () {
      this.elements = $('#qunit-fixture').find('.test-attribute');
    }
  });

  test('is chainable', function () {
    strictEqual(this.elements.ninja('popup'), this.elements, 'should be chainable');
  });

  QUnit.done(function () {
    $('#qunit-examples').find('.test-attribute').ninja('popup');
  });

  module('JavaScript option', {
    setup: function () {
      this.elements = $('#qunit-fixture').find('.test-option');
    }
  });

  test('is chainable', function () {
    strictEqual(this.elements.ninja('popup', {
      html: 'Freedom!'
    }), this.elements, 'should be chainable');
  });

  QUnit.done(function () {
    $('#qunit-examples').find('.test-option').ninja('popup', {
      html: 'Freedom!'
    });
  });

  module('inline-block', {
    setup: function () {
      this.elements = $('#qunit-fixture').find('.test-dialog');
    }
  });

  test('is chainable', function () {
    strictEqual(this.elements.ninja('popup', {
      html: 'Freedom!'
    }), this.elements, 'should be chainable');
  });

  QUnit.done(function () {
    $('#qunit-examples').find('.test-dialog').ninja('popup', {
      html: $('#qunit-examples').find('table.ninja').clone(),
      hover: true
    });
  });
}(jQuery));
