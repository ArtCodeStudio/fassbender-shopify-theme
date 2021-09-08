import { Riba, coreModule, EventDispatcher } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import {
  Bs4DropdownComponent,
  Bs4TabsComponent,
  Bs4IconComponent,
} from "@ribajs/bs4";
import { jqueryModule } from "@ribajs/jquery";
import { shopifyModule } from "@ribajs/shopify";
import { routerModule } from "@ribajs/router";
import { i18nModule } from "@ribajs/i18n";
import { scrollbarDraggableBinder, touchEventsBinder } from "@ribajs/extras";

import { TrackingService } from "./services/tracking.services";
import * as customBinders from "./binders/index";

import * as CustomComponents from "./components/index";
import {
  LocalesService,
  ShopifyTdaInstagramComponent,
  ShopifyTdaInstagramScrollbarComponent,
} from "@ribajs/shopify-tda";

declare global {
  interface Window {
    model: any;
  }
}

export class Main {
  private riba = new Riba();
  private localesService = LocalesService.getSingleton();
  private dispatcher = new EventDispatcher("main");

  constructor() {
    window.model = window.model || {};
    window.model.year = new Date().getFullYear();

    window.model.filter = {
      stories: "all",
    };

    this.riba.module.regist(coreModule.init());
    this.riba.module.regist(jqueryModule.init());
    this.riba.module.regist(routerModule.init());
    this.riba.module.regist(shopifyModule.init());
    this.riba.module.regist(
      i18nModule.init({ localesService: this.localesService })
    );

    this.riba.module.binder.regists([
      scrollbarDraggableBinder,
      touchEventsBinder,
    ]);

    // Register Bootstrap 4 Components
    this.riba.module.component.regists([
      Bs4DropdownComponent,
      Bs4TabsComponent,
      Bs4IconComponent,
    ]);

    // Register Shopify - The Developer App Components
    this.riba.module.component.regists([
      ShopifyTdaInstagramComponent,
      ShopifyTdaInstagramScrollbarComponent,
    ]);

    // Register custom components
    this.riba.module.component.regists(CustomComponents);

    // Register custom binders
    this.riba.module.binder.regists(customBinders);

    window.model.assign = function (key: string, value: any) {
      this[key] = value;
    };

    window.model.globalToggle = function (
      key: string,
      event: Event
      // scope: any,
      // element: HTMLElement
    ) {
      window.model[key] = !window.model[key];
      if (event) {
        if ((event as any).originalEvent) {
          event = (event as any).originalEvent;
        }
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.model.system.shopify = (window as any).Shopify;

    this.riba.bind(document.body, window.model);

    // view.registComponents();

    // TODO solve with rv-on-new-page-ready="assign | args 'fullscreenMenuOpen' false"?
    this.dispatcher.on("newPageReady", () => {
      window.model.fullscreenMenuOpen = false;
    });
  }
}

new TrackingService({
  googleAnalytics: window.model.system.themeSettings.googleAnalytics,
  theTradeDesk: window.model.system.themeSettings.theTradeDesk,
  pinterestTag: window.model.system.themeSettings.pinterestTag,
});

ready(() => {
  new Main();
});
