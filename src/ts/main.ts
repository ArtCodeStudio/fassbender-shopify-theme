import "@ribajs/types";
import "../scss/main.scss";
import { Riba, coreModule } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
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
import { ScrollbarDraggableBinder, TouchEventsBinder } from "@ribajs/extras";

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

    this.riba.module.register(coreModule.init());
    this.riba.module.register(jqueryModule.init());
    this.riba.module.register(routerModule.init());
    this.riba.module.register(shopifyModule.init());
    this.riba.module.register(
      i18nModule.init({ localesService: this.localesService }),
    );

    this.riba.module.binder.registerAll([
      ScrollbarDraggableBinder,
      TouchEventsBinder,
    ]);

    // Register Bootstrap 4 Components
    this.riba.module.component.registerAll([
      Bs4DropdownComponent,
      Bs4TabsComponent,
      Bs4IconComponent,
    ]);

    // Register Shopify - The Developer App Components
    this.riba.module.component.registerAll([
      ShopifyTdaInstagramComponent,
      ShopifyTdaInstagramScrollbarComponent,
    ]);

    // Register custom components
    this.riba.module.component.registerAll(CustomComponents);

    // Register custom binders
    this.riba.module.binder.registerAll(customBinders);

    window.model.assign = function (key: string, value: any) {
      this[key] = value;
    };

    window.model.globalToggle = function (
      key: string,
      event: Event,
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
