/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
import 'dart:html';
import 'package:logging/logging.dart';

class StyleManager {
  static const int MAX_STYLES = 8;
  static const String CURRENT_STYLE_KEY = "currentStyle";
  static const String FAVORITE_STYLE_KEY = "favoriteStyle";
  static const String DYNAMIC_STYLE_SELECTOR = "link#dynamic-style";

  static final Logger log = new Logger('StyleManager');

  int favoriteStyle = null;
  int currentStyle = 0;
  int clickCount=  0;

  Map<String, String> local = window.localStorage;

  StyleManager() {
    if (local.containsKey(FAVORITE_STYLE_KEY)) {
      currentStyle = favoriteStyle = int.parse(local[FAVORITE_STYLE_KEY]);
    }
    else if (local.containsKey(CURRENT_STYLE_KEY)) {
      currentStyle = int.parse(local[CURRENT_STYLE_KEY]);
    }

    loadStyle(currentStyle);
  }

  /**
   * Advances to next style, returning true, or false when all styles have been shown.
   */
  bool nextStyle() {
    if (++clickCount == MAX_STYLES) {
      local[CURRENT_STYLE_KEY] = ((currentStyle + 1) % MAX_STYLES).toString();
      return false;
    }
    
    loadStyle(currentStyle = (currentStyle + 1) % MAX_STYLES);
    return true;
  }

  int getFavoriteStyleIndex() {
    if (favoriteStyle == null && local.containsKey(FAVORITE_STYLE_KEY)) {
      favoriteStyle = int.parse(local[FAVORITE_STYLE_KEY]);
    }
    return favoriteStyle;
  }

  void setCurrentStyleIndex(int newStyleIndex) {
    loadStyle(currentStyle = newStyleIndex);
  }

  void setFavoriteStyleIndex(int favoriteStyleIndex) {
    local[FAVORITE_STYLE_KEY] = (favoriteStyle = favoriteStyleIndex).toString();
  }

  void clearFavoriteStyle() {
    favoriteStyle = null;
    local.remove(FAVORITE_STYLE_KEY);
  }

  static loadStyle(int styleIndex) async {
    var filename = makeStyleSheetHref(styleIndex);
    var link = querySelector(DYNAMIC_STYLE_SELECTOR);
    if (link != null) {
      // Issue synchronous request to load stylesheet into cache.
      await HttpRequest.getString(filename);

      // Use it.
      link.setAttribute("href", filename);
    }
  }

  static String makeStyleSheetHref(int styleIndex) {
    return 'css/style-' + styleIndex.toString() + '.css';
  }
}