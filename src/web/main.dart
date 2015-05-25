/*!
 * Copyright 2015, Crunk Biz, LLC.
 * Licensed under ISC (https://github.com/rcrunk/crunk.net/LICENSE.md)
 */
library crunk_net;

import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'package:logging/logging.dart';

import 'package:crunk_net/controller/theme_controller.dart';
import 'package:crunk_net/controller/choice_controller.dart';
import 'package:crunk_net/routing/crunk_net_routes.dart';

class CrunkNetModule extends Module {
  final Logger log = new Logger('CrunkNetModule');

  CrunkNetModule() {
    bind(ThemeController);
    bind(ChoiceController);
    bind(RouteInitializerFn, toValue: initRoutes);
    bind(NgRoutingUsePushState, toValue: new NgRoutingUsePushState.value(false));
  }
}

void main() {
  Logger.root..level = Level.FINEST
    ..onRecord.listen((LogRecord r) { print(r.message); });

  applicationFactory().addModule(new CrunkNetModule()).run();
}