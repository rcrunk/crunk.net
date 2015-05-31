/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library choice_controller;

import 'dart:html';
import 'package:logging/logging.dart';
import 'package:angular/angular.dart';
import 'package:crunk_net/style_manager.dart';
import 'package:crunk_net/components/spinner.dart';

@Component(selector: 'chooser', templateUrl: 'choices.html', useShadowDom: false)
class ChoiceController implements ShadowRootAware {
  final Logger log = new Logger('ChoiceController');
  static const String FORM_SELECTOR = "#style-choice-form";
  static const String FORM_SUBMIT_SELECTOR = "input[type='submit']";
  static const String FAVORITE_STYLE_RADIOS_SELECTOR = "input[type='radio'][name='favorite_style']";

  StyleManager _styleManager;
  Router _router;

  int _favorite;

  ChoiceController(this._router) {
    _styleManager = new StyleManager();
    _favorite = _styleManager.getFavoriteStyleIndex();
  }

  /**
   * Though we don't use the shadow dom, this still triggers when the templateUrl is
   * attached. At this point, selectors across the template are now available.
   */
  void onShadowRoot(ShadowRoot shadowRoot) {
    var form = querySelector(FORM_SELECTOR);
    _configure(form);
  }

  /**
   * Configures the submit button with appropriate display value and label and
   * sets the currentlyChecked dynamic attribute according to checked attribute
   */
  void _configure(FormElement form) {
    var radios = form.querySelectorAll(FAVORITE_STYLE_RADIOS_SELECTOR);
    var hasFavorite = false;
    for (var radio in radios) {
      if (int.parse(radio.value) == _favorite) {
        hasFavorite = radio.checked = true;
      }
    }

    configureAction(hasFavorite, form.querySelector(FORM_SUBMIT_SELECTOR));
  }

  /**
   * Event handler for radio's onclick; toggles the checked state of the radio button and calls configure()
   */
  void toggle(int value) {
    var radio = querySelector("#theme_${value}-radio");
    if (radio != null) toggleRadio(radio);
  }

  void toggleRadio(InputElement radio) {
    var value = int.parse(radio.value);
    if (_favorite == value) {
      radio.checked = false;
    }

    if (radio.checked) {
      _favorite = value;
      _styleManager.setCurrentStyleIndex(_favorite);
    }
    else {
      _favorite = null;
    }

    configureAction(radio.checked, radio.form.querySelector(FORM_SUBMIT_SELECTOR));
  }

  void selectStyle(int value) {
    var radio = querySelector("#theme_${value}-radio");
    if (radio != null) {
      radio.checked = !radio.checked;
      toggleRadio(radio);
    }
  }

  bool choose() {
    var form = querySelector(FORM_SELECTOR);
    var radios = form.querySelectorAll(FAVORITE_STYLE_RADIOS_SELECTOR);
    var value = null;
    for (var radio in radios) {
      if (radio.checked) {
        value = radio.value;
        break;
      }
    }

    if (value != null) {
      _styleManager.setFavoriteStyleIndex(value);
    }
    else _styleManager.clearFavoriteStyle();

    _router.go('home', {}, replace: true);
    return false;
  }

  static configureAction(bool doSubmit, InputElement submit) {
    if (doSubmit) {
      submit.value = 'Submit';
      submit.title = 'Click to select your favorite style';
    }
    else {
      submit.value = 'Continue';
      submit.title = 'Click to continue without making a selection';
    }
  }
}