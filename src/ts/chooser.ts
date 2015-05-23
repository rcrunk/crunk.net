//
// Copyright (c) 2015, Crunk Biz, LLC.
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
// FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
// DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
// IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING
// OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//

/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="style_manager.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import Selector = StyleManager.Selector;

@Component({ selector: 'chooser' })
@View({ templateUrl: 'choices.html' })

class Chooser {
  private selector: Selector;
  private favorite: number = null;

  constructor() {
    this.selector = new Selector();
    var form = document.forms[0];
    var radios = form['favorite_style'];

    for (var i = 0; i < radios.length; ++i) {
      radios[i].onclick = (event) => {
        this.toggle(event);
      };
    }

    this.configure(form);
  }

  /**
   * Configures the submit button with appropriate display value and label and
   * sets the currentlyChecked dynamic attribute according to checked attribute
   */
  private configure(form) {
    this.favorite = this.selector.getFavoriteStyle();
    var radios = form['favorite_style'];
    var hasFavorite: any = false;
    for (var i = 0; i < radios.length; ++i) {
      var radio = radios[i];
      if (radio.value == this.favorite) {
        radio.checked = true;
        hasFavorite |= radio.checked;
      }
    }

    Chooser.configureAction(hasFavorite, form.submit);
  }

  /**
   * Event handler for radio's onclick; toggles the checked state of the radio button and calls configure()
   */
  public toggle(event): void {
    this.toggleRadio(event.target);
  }

  private toggleRadio(radio: HTMLInputElement): void {
    var value: number = +radio.value;
    if (this.favorite) {
      if (this.favorite == value) {
        radio.checked = false;
      }
    }

    if (radio.checked) {
      this.favorite = value;
      this.selector.setCurrentStyle(value);
    }
    else {
      this.favorite = null;
    }

    Chooser.configureAction(radio.checked, document.forms[0]['submit']);
  }

  public selectStyle(value: number): void {
    var radio = <HTMLInputElement> document.querySelector("#theme_" + value + "-radio");
    if (radio) {
      radio.checked = !radio.checked;
      this.toggleRadio(radio);
    }
  }

  public choose(): boolean {
    var form = document.forms[0];
    var radios = form['favorite_style'];
    var value = null;
    for (var i = 0; i < radios.length; ++i) {
      var radio = radios[i];
      if (radio.checked) {
        value = radio.value;
        break;
      }
    }

    if (value != null) {
      this.selector.setFavoriteStyle(radio.value);
    }
    else this.selector.clearFavoriteStyle();

    location.href = location.href.toString().replace(/select_favorite_style.html/, '');
    return false;
  }

  private static configureAction(doSubmit: boolean, submit: HTMLInputElement) {
    if (doSubmit) {
      submit.value = 'Submit';
      submit.title = 'Click to select your favorite style';
    }
    else {
      submit.value = 'Continue';
      submit.title = 'Click to continue without making a selection';
    }
  }
}

bootstrap(Chooser);