/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library theme_controller;

import 'package:angular/angular.dart';
import 'package:crunk_net/style_manager.dart';
import 'package:crunk_net/components/spinner.dart';

@Component(selector: 'themer', templateUrl: 'home.html', useShadowDom: false)
class ThemeController {
  StyleManager _styleManager;
  Router _router;

  ThemeController(this._router) {
    _styleManager = new StyleManager();
  }

  void next() {
    if (!_styleManager.nextStyle()) {
      _router.go('choose', {}, replace: true);
    }
  }
}