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

@Component({ selector: 'themer' })
@View({ templateUrl: 'home.html' })

class Themer {
  private selector: Selector;

  constructor() {
    this.selector = new Selector();
  }

  public next(): void {
    this.selector.nextStyle();
  }
}

bootstrap(Themer);