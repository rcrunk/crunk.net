var StyleManager;
(function (StyleManager) {
    var Selector = (function () {
        function Selector() {
            this.favoriteStyle = null;
            this.currentStyle = 0;
            this.clickCount = 0;
            var fromCookie = Selector.getCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
            if (fromCookie !== null) {
                this.currentStyle = this.favoriteStyle = fromCookie;
            }
            else {
                fromCookie = Selector.getCookie(Selector.CURRENT_STYLE_COOKIE_NAME);
                if (fromCookie !== null) {
                    this.currentStyle = fromCookie;
                }
            }
            // whack this in any case
            Selector.deleteCookie(Selector.CURRENT_STYLE_COOKIE_NAME);
            Selector.loadStyle(this.currentStyle);
        }
        Selector.prototype.nextStyle = function () {
            if (++this.clickCount === Selector.MAX_STYLES) {
                var toUrl = location.href.toString().replace(/\/([a-z_]+\.html)*$/, '/select_favorite_style.html');
                Selector.setCookie(Selector.CURRENT_STYLE_COOKIE_NAME, ((this.currentStyle + 1) % Selector.MAX_STYLES), 5);
                location.href = toUrl;
                return true;
            }
            var previousStyle = this.currentStyle;
            this.currentStyle = (this.currentStyle + 1) % Selector.MAX_STYLES;
            Selector.loadStyle(this.currentStyle);
            Selector.clearStyle(previousStyle);
            return false;
        };
        Selector.prototype.getFavoriteStyle = function () {
            if (!this.favoriteStyle) {
                this.favoriteStyle = Selector.getCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
            }
            return this.favoriteStyle;
        };
        Selector.prototype.setCurrentStyle = function (newStyleIndex) {
            Selector.clearStyle(this.currentStyle);
            Selector.loadStyle(newStyleIndex);
            this.currentStyle = newStyleIndex;
        };
        Selector.prototype.setFavoriteStyle = function (favorite) {
            this.favoriteStyle = favorite;
            Selector.setCookie(Selector.FAVORITE_STYLE_COOKIE_NAME, this.favoriteStyle);
        };
        Selector.prototype.clearFavoriteStyle = function () {
            this.favoriteStyle = undefined;
            Selector.deleteCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
        };
        Selector.loadStyle = function (styleIndex) {
            var filename = Selector.makeStyleSheetHref(styleIndex);
            var fileLink = document.createElement("link");
            fileLink.setAttribute("rel", "stylesheet");
            fileLink.setAttribute("type", "text/css");
            fileLink.setAttribute("href", filename);
            document.getElementsByTagName("head")[0].appendChild(fileLink);
        };
        Selector.clearStyle = function (styleIndex) {
            var filename = Selector.makeStyleSheetHref(styleIndex);
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
        Selector.getCookie = function (name) {
            var result = null;
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; ++i) {
                var cookie = cookies[i];
                var pivot = cookie.indexOf("=");
                var cookieName = cookie.substr(0, pivot).replace(/^\s+|\s+$/g, "");
                if (cookieName === name) {
                    result = +cookie.substr(pivot + 1);
                }
            }
            return result;
        };
        Selector.setCookie = function (cookieName, value, expirationMinutes) {
            var expirationDate = null;
            if (expirationMinutes) {
                expirationDate = new Date();
                expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
            }
            var cookieValue = value + ((expirationDate === null) ? "" : "; expires=" + expirationDate.toUTCString());
            document.cookie = cookieName + "=" + cookieValue;
        };
        Selector.deleteCookie = function (cookieName) {
            Selector.setCookie(cookieName, 0, -45);
        };
        Selector.makeStyleSheetHref = function (styleIndex) {
            return 'css/style-' + styleIndex + '.css';
        };
        Selector.MAX_STYLES = 8;
        Selector.CURRENT_STYLE_COOKIE_NAME = "currentStyle";
        Selector.FAVORITE_STYLE_COOKIE_NAME = "favoriteStyle";
        return Selector;
    })();
    StyleManager.Selector = Selector;
})(StyleManager || (StyleManager = {}));
//# sourceMappingURL=style_manager.js.map