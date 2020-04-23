import { Riba, Utils, Binder, coreModule } from "@ribajs/core";
import { Bs4DropdownComponent, Bs4TabsComponent } from "@ribajs/bs4";
import { jqueryModule } from "@ribajs/jquery";
import { shopifyModule } from "@ribajs/shopify";
import { routerModule } from "@ribajs/router";
import { i18nModule } from "@ribajs/i18n";
import { scrollbarDraggableBinder, touchEventsBinder } from "@ribajs/extras";

import { TrackingService } from "./services/tracking.services";
import * as customBinders from "./binders/index";

import * as CustomComponents from "./components/index";
import { LocalesService } from "@ribajs/shopify-tda";

declare global {
  interface Window {
    model: any;
  }
}

export class Main {
  private riba = new Riba();
  private localesService = new LocalesService();
  // private dispatcher = new EventDispatcher('main');

  constructor() {
    window.model = window.model || {};
    window.model.year = new Date().getFullYear();

    window.model.filter = {
      stories: "all",
    };

    this.riba.module.regist(coreModule);
    this.riba.module.regist(jqueryModule);
    this.riba.module.regist(routerModule);
    this.riba.module.regist(shopifyModule);
    this.riba.module.regist(i18nModule(this.localesService));

    this.riba.module.binder.regist(scrollbarDraggableBinder);
    this.riba.module.binder.regist(touchEventsBinder);
    this.riba.module.component.regist(Bs4DropdownComponent);
    this.riba.module.component.regist(Bs4TabsComponent);

    // Regist custom components
    this.riba.module.regist({
      components: CustomComponents,
      binders: customBinders,
    });

    window.model.assign = function (key: string, value: any) {
      this[key] = value;
    };

    window.model.globalToggle = function (
      key: string,
      context: Binder<any>,
      event: Event
    ) {
      this[key] = !this[key];
      event.preventDefault();
      event.stopPropagation();
    };

    window.model.system.shopify = (window as any).Shopify;

    this.riba.bind(document.body, window.model);
  }
}

new TrackingService({
  googleAnalytics: window.model.system.themeSettings.googleAnalytics,
  theTradeDesk: window.model.system.themeSettings.theTradeDesk,
  pinterestTag: window.model.system.themeSettings.pinterestTag,
});

Utils.domIsReady(() => {
  new Main();
});

// (window as any).$ = JQuery;
// (window as any).JQuery = JQuery;
