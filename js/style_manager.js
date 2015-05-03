'use strict';

function StyleManager() {
  var MAX_STYLES = 8;
  var CURRENT_STYLE_COOKIE_NAME = "currentStyle";
  var FAVORITE_STYLE_COOKIE_NAME = "favoriteStyle";
  var currentStyle = MAX_STYLES - 3;
  var favoriteStyle = null;
  var clicks = 0;

  this.initialize = function() {
    var fromCookie = this.getCookie(FAVORITE_STYLE_COOKIE_NAME);
    if (fromCookie !== null) {
      currentStyle = favoriteStyle = parseInt(fromCookie);
    }
    else {
      fromCookie = this.getCookie(CURRENT_STYLE_COOKIE_NAME);
      if (fromCookie !== null) {
        currentStyle =parseInt(fromCookie);
      }
    }

    // whack this in any case
    this.deleteCookie(CURRENT_STYLE_COOKIE_NAME);

    this.loadStyle();
  };

  this.makeStyleSheetHref = function(styleIndex) {
    return 'css/style-' + styleIndex + '.css';
  };

  this.loadStyle = function() {
    var filename = this.makeStyleSheetHref(currentStyle);
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);

    document.getElementsByTagName("head")[0].appendChild(fileref);
  };

  this.clearStyle = function(styleIndex) {
    var filename = this.makeStyleSheetHref(styleIndex);
    var links = document.getElementsByTagName("link");
    for (var i = links.length; i >= 0; i--) {
      if (links[i]) {
        var link = links[i];
        var href = link.getAttribute("href");
        if (href !== null && href.indexOf(filename) !== -1) {
          link.parentNode.removeChild(link);
        }
      }
    }
  };

  this.changeStyle = function() {
    if (++clicks === MAX_STYLES) {
      var toUrl = location.href.toString().replace(/\/([a-z_]+\.html)*$/, '/select_favorite_style.html');
      this.setCookie(CURRENT_STYLE_COOKIE_NAME, ((currentStyle + 1) % MAX_STYLES), 5);
      location.href = toUrl;
      return true;
    }

    var previousStyle = currentStyle;
    currentStyle = (currentStyle + 1) % MAX_STYLES;
    this.loadStyle();
    this.clearStyle(previousStyle);

    return false;
  };

  this.getFavoriteStyle = function() {
    return this.getCookie(FAVORITE_STYLE_COOKIE_NAME);
  };

  this.setFavoriteStyle = function(favorite) {
    favoriteStyle = favorite;
    this.setCookie(FAVORITE_STYLE_COOKIE_NAME, favoriteStyle);
  };

  this.clearFavoriteStyle = function() {
    this.deleteCookie(FAVORITE_STYLE_COOKIE_NAME);
  };

  this.setCookie = function(name, value, expirationMinutes) {
    var expirationDate = null;
    if (expirationMinutes) {
      expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
    }

    var cookieValue = encodeURI(value) + ((expirationDate === null) ? "" : "; expires=" + expirationDate.toUTCString());
    document.cookie = name + "=" + cookieValue;
  };

  this.getCookie = function(name) {
    var result = null;
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; ++i) {
      var cookie = cookies[i];
      var pivot = cookie.indexOf("=");
      var cookieName = cookie.substr(0, pivot).replace(/^\s+|\s+$/g, "");

      if (cookieName === name) {
        result = decodeURI(cookie.substr(pivot + 1));
      }
    }

    return result;
  };

  this.deleteCookie = function(name) {
    this.setCookie(name, 0, -45);
  };
}