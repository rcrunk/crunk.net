/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library theme_controller;

import 'package:angular/angular.dart';
import 'package:crunk_net/style_manager.dart';

@Component(selector: 'themer', templateUrl: 'home.html', useShadowDom: false)
class ThemeController {
  StyleManager _styleManager;

  ThemeController(Router router) {
    _styleManager = new StyleManager(router);
  }

  void next() {
    _styleManager.nextStyle();
  }
}