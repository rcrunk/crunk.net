/*
 * Copyright (c) 2015, Crunk Biz, LLC.
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 * FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 * DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
 * IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING
 * OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

module StyleManager {
  export class Selector {
    static MAX_STYLES: number = 8;
    static CURRENT_STYLE_COOKIE_NAME: string = "currentStyle";
    static FAVORITE_STYLE_COOKIE_NAME: string = "favoriteStyle";

    private favoriteStyle: number = null;
    private currentStyle: number = 0;
    private clickCount: number = 0;

    constructor() {
      var fromCookie: number = Selector.getCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
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

    public nextStyle(): boolean {
      if (++this.clickCount === Selector.MAX_STYLES) {
        var toUrl = location.href.toString().replace(/\/([a-z_]+\.html)*$/, '/select_favorite_style.html');
        Selector.setCookie(Selector.CURRENT_STYLE_COOKIE_NAME,
          ((this.currentStyle + 1) % Selector.MAX_STYLES), 5);
        location.href = toUrl;
        return true;
      }

      var previousStyle: number = this.currentStyle;
      this.currentStyle = (this.currentStyle + 1) % Selector.MAX_STYLES;
      Selector.loadStyle(this.currentStyle);
      Selector.clearStyle(previousStyle);

      return false;
    }

    public getFavoriteStyle():number {
      if (!this.favoriteStyle) {
        this.favoriteStyle = Selector.getCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
      }
      return this.favoriteStyle;
    }

    public setCurrentStyle(newStyleIndex:number):void {
      Selector.clearStyle(this.currentStyle);
      Selector.loadStyle(newStyleIndex);
      this.currentStyle = newStyleIndex;
    }

    public setFavoriteStyle(favorite:number):void {
      this.favoriteStyle = favorite;
      Selector.setCookie(Selector.FAVORITE_STYLE_COOKIE_NAME, this.favoriteStyle);
    }

    public clearFavoriteStyle():void {
      this.favoriteStyle = undefined;
      Selector.deleteCookie(Selector.FAVORITE_STYLE_COOKIE_NAME);
    }

    private static loadStyle(styleIndex:number):void {
      var filename = Selector.makeStyleSheetHref(styleIndex);
      var fileLink = document.createElement("link");
      fileLink.setAttribute("rel", "stylesheet");
      fileLink.setAttribute("type", "text/css");
      fileLink.setAttribute("href", filename);

      document.getElementsByTagName("head")[0].appendChild(fileLink);
    }

    private static clearStyle(styleIndex:number):void {
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
    }

    private static getCookie(name: string): number {
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
    }

    private static setCookie(cookieName: string, value: number, expirationMinutes?: number): void {
      var expirationDate: Date = null;
      if (expirationMinutes) {
        expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
      }

      var cookieValue = value + ((expirationDate === null) ? "" : "; expires=" + expirationDate.toUTCString());
      document.cookie = cookieName + "=" + cookieValue;
    }

    private static deleteCookie(cookieName: string): void {
      Selector.setCookie(cookieName, 0, -45);
    }

    private static makeStyleSheetHref(styleIndex: number): string {
      return 'css/style-' + styleIndex + '.css';
    }
  }
}
