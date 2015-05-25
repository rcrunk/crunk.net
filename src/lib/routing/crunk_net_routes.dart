/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */

import 'package:angular/angular.dart';

void initRoutes(Router router, RouteViewFactory views) {
  views.configure({
    'home': ngRoute(path: '/home',  view: 'view/home.html', defaultRoute: true),
    'choose': ngRoute(path: '/choose', view: 'view/choose.html')
  });
}