/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library choice_controller;

import 'dart:html';
import 'package:logging/logging.dart';
import 'package:angular/angular.dart';
import 'package:crunk_net/style_manager.dart';

@Component(selector: 'chooser', templateUrl: 'choices.html', useShadowDom: false)
class ChoiceController implements ShadowRootAware {
  final Logger log = new Logger('ChoiceController');
  static const String FORM_ID = "#style-choice-form";

  StyleManager _styleManager;
  Router _router;

  num favorite = null;

  ChoiceController(this._router) {
    _styleManager = new StyleManager(_router);
    favorite = _styleManager.getFavoriteStyleIndex();
  }

  void onShadowRoot(ShadowRoot shadowRoot) {
    var form = querySelector(FORM_ID);
    configure(form);
  }

  /**
   * Configures the submit button with appropriate display value and label and
   * sets the currentlyChecked dynamic attribute according to checked attribute
   */
  configure(FormElement form) {
    var radios = form.querySelectorAll("input[type='radio'][name='favorite_style']");
    var hasFavorite = false;
    for (var radio in radios) {
      if (num.parse(radio.value) == favorite) {
        hasFavorite = radio.checked = true;
      }
    }

    configureAction(hasFavorite, form.querySelector("input[type='submit']"));
  }

  /**
   * Event handler for radio's onclick; toggles the checked state of the radio button and calls configure()
   */
  void toggle(num value) {
    var radio = querySelector("#theme_" + value.toString() + "-radio");
    if (radio != null) toggleRadio(radio);
  }

  void toggleRadio(InputElement radio) {
    var value = num.parse(radio.value);
    if (favorite == value) {
      radio.checked = false;
    }

    if (radio.checked) {
      favorite = value;
      _styleManager.setCurrentStyleIndex(favorite);
    }
    else {
      favorite = null;
    }

    configureAction(radio.checked, radio.form.querySelector("input[type='submit']"));
  }

  void selectStyle(num value) {
    var radio = querySelector("#theme_" + value.toString() + "-radio");
    if (radio != null) {
      radio.checked = !radio.checked;
      toggleRadio(radio);
    }
  }

  bool choose() {
    var form = querySelector(FORM_ID);
    var radios = form.querySelectorAll("input[type='radio'][name='favorite_style']");
    var value = null;
    for (var i = 0; i < radios.length; ++i) {
      var radio = radios[i];
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