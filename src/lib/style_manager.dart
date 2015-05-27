/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
import 'dart:html';
import 'package:angular/angular.dart';
import 'package:range/range.dart';
import 'package:logging/logging.dart';

class StyleManager {
  static const num MAX_STYLES = 8;
  static const String CURRENT_STYLE_KEY = "currentStyle";
  static const String FAVORITE_STYLE_KEY = "favoriteStyle";

  static final Logger log = new Logger('StyleManager');

  num favoriteStyle = null;
  num currentStyle = 0;
  num clickCount=  0;

  Router _router;
  Map<String, String> local = window.localStorage;

  StyleManager(this._router) {
    if (local.containsKey(FAVORITE_STYLE_KEY)) {
      currentStyle = favoriteStyle = num.parse(local[FAVORITE_STYLE_KEY]);
    }
    else if (local.containsKey(CURRENT_STYLE_KEY)) {
      currentStyle = num.parse(local[CURRENT_STYLE_KEY]);
    }

    clearDynamicStyles(currentStyle);
    loadStyle(currentStyle);
  }

  bool nextStyle() {
    if (++clickCount == MAX_STYLES) {
      local[CURRENT_STYLE_KEY] = ((currentStyle + 1) % MAX_STYLES).toString();
      _router.go('choose', {}, replace: true);
      return true;
    }

    var previousStyle = currentStyle;
    currentStyle = (currentStyle + 1) % MAX_STYLES;

    clearStyle(previousStyle);
    loadStyle(currentStyle);

    return false;
  }

  num getFavoriteStyleIndex() {
    if (favoriteStyle == null && local.containsKey(FAVORITE_STYLE_KEY)) {
      favoriteStyle = num.parse(local[FAVORITE_STYLE_KEY]);
    }
    return favoriteStyle;
  }

  void setCurrentStyleIndex(num newStyleIndex) {
    clearStyle(currentStyle);
    loadStyle(newStyleIndex);
    currentStyle = newStyleIndex;
  }

  void setFavoriteStyleIndex(num favoriteStyleIndex) {
    local[FAVORITE_STYLE_KEY] = (this.favoriteStyle = favoriteStyleIndex).toString();
  }

  void clearFavoriteStyle() {
    this.favoriteStyle = null;
    local.remove(FAVORITE_STYLE_KEY);
  }

  static void clearStyle(num styleIndex)  {
    var filename = makeStyleSheetHref(styleIndex);
    var link = querySelector("link[href~='" + filename + "']");
    log.fine("clearStyle(${styleIndex}): link: ${(link != null).toString()}");
    if (link != null) link.remove();
  }

  static void loadStyle(num styleIndex) {
    var filename = makeStyleSheetHref(styleIndex);
    var link = querySelector("link[href~='" + filename + "']");
    if (link == null) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", filename);

      HeadElement head = querySelector('head');
      head.append(link);
    }
  }

  static void clearDynamicStyles(num preserveStyleIndex) {
    log.fine("clearDynamicStyles(${preserveStyleIndex.toString()})");
    for (var index in range(0, MAX_STYLES)) {
      if (index != preserveStyleIndex) {
        clearStyle(index);
      }
    }
  }

  static String makeStyleSheetHref(int styleIndex) {
    return 'css/style-' + styleIndex.toString() + '.css';
  }
}