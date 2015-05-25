/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */

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