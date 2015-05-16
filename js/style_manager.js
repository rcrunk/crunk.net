var StyleManager = (function () {
    function StyleManager() {
        this.favoriteStyle = null;
        this.currentStyle = 0;
        this.clickCount = 0;
        var fromCookie = StyleManager.getCookie(StyleManager.FAVORITE_STYLE_COOKIE_NAME);
        if (fromCookie !== null) {
            this.currentStyle = this.favoriteStyle = fromCookie;
        }
        else {
            fromCookie = StyleManager.getCookie(StyleManager.CURRENT_STYLE_COOKIE_NAME);
            if (fromCookie !== null) {
                this.currentStyle = fromCookie;
            }
        }
        // whack this in any case
        StyleManager.deleteCookie(StyleManager.CURRENT_STYLE_COOKIE_NAME);
        StyleManager.loadStyle(this.currentStyle);
    }
    StyleManager.prototype.nextStyle = function () {
        if (++this.clickCount === StyleManager.MAX_STYLES) {
            var toUrl = location.href.toString().replace(/\/([a-z_]+\.html)*$/, '/select_favorite_style.html');
            StyleManager.setCookie(StyleManager.CURRENT_STYLE_COOKIE_NAME, ((this.currentStyle + 1) % StyleManager.MAX_STYLES), 5);
            location.href = toUrl;
            return true;
        }
        var previousStyle = this.currentStyle;
        this.currentStyle = (this.currentStyle + 1) % StyleManager.MAX_STYLES;
        StyleManager.loadStyle(this.currentStyle);
        StyleManager.clearStyle(previousStyle);
        return false;
    };
    StyleManager.prototype.getFavoriteStyle = function () {
        if (!this.favoriteStyle) {
            this.favoriteStyle = StyleManager.getCookie(StyleManager.FAVORITE_STYLE_COOKIE_NAME);
        }
        return this.favoriteStyle;
    };
    StyleManager.prototype.setFavoriteStyle = function (favorite) {
        this.favoriteStyle = favorite;
        StyleManager.setCookie(StyleManager.FAVORITE_STYLE_COOKIE_NAME, this.favoriteStyle);
    };
    StyleManager.prototype.clearFavoriteStyle = function () {
        this.favoriteStyle = undefined;
        StyleManager.deleteCookie(StyleManager.FAVORITE_STYLE_COOKIE_NAME);
    };
    StyleManager.loadStyle = function (styleIndex) {
        var filename = StyleManager.makeStyleSheetHref(styleIndex);
        var fileLink = document.createElement("link");
        fileLink.setAttribute("rel", "stylesheet");
        fileLink.setAttribute("type", "text/css");
        fileLink.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(fileLink);
    };
    StyleManager.clearStyle = function (styleIndex) {
        var filename = StyleManager.makeStyleSheetHref(styleIndex);
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
    StyleManager.getCookie = function (name) {
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
    StyleManager.setCookie = function (cookieName, value, expirationMinutes) {
        var expirationDate = null;
        if (expirationMinutes) {
            expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
        }
        var cookieValue = value + ((expirationDate === null) ? "" : "; expires=" + expirationDate.toUTCString());
        document.cookie = cookieName + "=" + cookieValue;
    };
    StyleManager.deleteCookie = function (cookieName) {
        StyleManager.setCookie(cookieName, 0, -45);
    };
    StyleManager.makeStyleSheetHref = function (styleIndex) {
        return 'css/style-' + styleIndex + '.css';
    };
    StyleManager.MAX_STYLES = 8;
    StyleManager.CURRENT_STYLE_COOKIE_NAME = "currentStyle";
    StyleManager.FAVORITE_STYLE_COOKIE_NAME = "favoriteStyle";
    return StyleManager;
})();
//# sourceMappingURL=style_manager.js.map