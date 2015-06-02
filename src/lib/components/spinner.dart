/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library spinner;

import 'dart:html';
import 'package:angular/angular.dart';

@Component(selector: 'spinner', cssUrl: 'spinner.css', useShadowDom: true,
           template: '<div spinner ng-class="[state, animation]"></div>')
class Spinner {
  static final _spinnerStyleTypes = [
    'scaleout', 'pulse', 'gravity', 'rotateplane', 'hexdots', 'throbber', 'atebits', 'flower'
  ];

  static Spinner instance;

  Spinner() {
    // Ugh, this really sucks.
    instance = this;
  }

  @NgAttr('animation')
  String animation = 'initial';

  @NgAttr('state')
  String state;

  static void on([int styleIndex = null]) {
    if (instance != null) {
      if (styleIndex != null) {
        instance.animation = _spinnerStyleTypes[styleIndex % _spinnerStyleTypes.length];
      }
      instance.state = 'on';
    }
  }

  static void off() {
    if (instance != null) {
      instance.state = 'off';
    }
  }

  static void setAnimation(String animation) {
    if (instance != null && animation != null) instance.animation = animation;
  }

  static void setAnimationIndex(int styleIndex) {
    if (instance != null && styleIndex != null)
      instance.animation = _spinnerStyleTypes[styleIndex % _spinnerStyleTypes.length];
  }
}