/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
import 'dart:html';

import 'package:crunk_net/components/spinner.dart';

class StyleManager {
  static const int _MAX_STYLES = 8;
  static const String _CURRENT_STYLE_KEY = "currentStyle";
  static const String _FAVORITE_STYLE_KEY = "favoriteStyle";
  static const String _DYNAMIC_STYLE_SELECTOR = "link#dynamic-style";

  //static final Spinner _spinner = new Spinner();

  int _favoriteStyle = null;
  int _currentStyle = 0;
  int _clickCount=  0;

  final BodyElement _body = querySelector("body");
  Map<String, String> _local = window.localStorage;


  StyleManager() {
    if (_local.containsKey(_FAVORITE_STYLE_KEY)) {
      _currentStyle = _favoriteStyle = int.parse(_local[_FAVORITE_STYLE_KEY]);
    }
    else if (_local.containsKey(_CURRENT_STYLE_KEY)) {
      _currentStyle = int.parse(_local[_CURRENT_STYLE_KEY]);
    }

    // Whack this so reload will revert to default if no favorite set.
    _local.remove(_CURRENT_STYLE_KEY);

    _loadStyle(_currentStyle);
  }

  /**
   * Advances to next style, returning true, or false when all styles have been shown.
   */
  bool nextStyle() {
    if (++_clickCount == _MAX_STYLES) {
      _local[_CURRENT_STYLE_KEY] = ((_currentStyle + 1) % _MAX_STYLES).toString();
      return false;
    }
    
    _loadStyle(_currentStyle = (_currentStyle + 1) % _MAX_STYLES);
    return true;
  }

  int getFavoriteStyleIndex() {
    if (_favoriteStyle == null && _local.containsKey(_FAVORITE_STYLE_KEY)) {
      _favoriteStyle = int.parse(_local[_FAVORITE_STYLE_KEY]);
    }
    return _favoriteStyle;
  }

  void setCurrentStyleIndex(int newStyleIndex) {
    _loadStyle(_currentStyle = newStyleIndex);
  }

  void setFavoriteStyleIndex(int favoriteStyleIndex) {
    _local[_FAVORITE_STYLE_KEY] = (_favoriteStyle = favoriteStyleIndex).toString();
  }

  void clearFavoriteStyle() {
    _favoriteStyle = null;
    _local.remove(_FAVORITE_STYLE_KEY);
  }

  void _loadStyle(int styleIndex) {
    Spinner.on();
    var link = querySelector(_DYNAMIC_STYLE_SELECTOR);
    if (link != null) {
      var styleSheet = _makeStyleSheetHref(styleIndex);
      // Issue synchronous request to load stylesheet into cache. Doesn't work for Chrome.
      HttpRequest.request(styleSheet, requestHeaders: {'Cache-Control': 'max-age=600'})
        .then((HttpRequest value) {
          link.setAttribute("href", styleSheet);
          //Spinner.off();
          Spinner.setAnimationIndex(styleIndex);
        });
    }
  }

  static String _makeStyleSheetHref(int styleIndex) {
    return 'css/style-' + styleIndex.toString() + '.css';
  }
}