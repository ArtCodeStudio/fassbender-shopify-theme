// Type definitions for rivets 0.9
// Project: http://rivetsjs.com/
// Definitions by:  Trevor Baron <https://github.com/TrevorDev>
//                  Jakub Matjanowski <https://github.com/matjanos>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="jquery" />

declare module 'rivets' {

  export interface IView {
    build(): void;
    bind(): void;
    unbind(): void;
  }

    // Global binders.
  export let binders: any;

  // Global components.
  export let components: any;

  // Global formatters.
  export let formatters: any;

  // Global sightglass adapters.
  export let adapters: any;

  // Default attribute prefix.
  export let prefix: string;

  // Default template delimiters.
  export let templateDelimiters: string[];

  // Default sightglass root interface.
  export let rootInterface: string;

  // Preload data by default.
  export let preloadData: boolean;

  export function handler(context: any, ev: Event, biding: any): void;

  export function configure(options?: {
    // Attribute prefix in templates
    prefix?: string;

    // Preload templates with initial data on bind
    preloadData?: boolean;

    // Root sightglass interface for keypaths
    rootInterface?: string;

    // Template delimiters for text bindings
    templateDelimiters?: string[]

    // Augment the event handler of the on-* binder
    handler?(context: any, ev: Event, biding: any): void;
  }): void;

  export function bind(element: HTMLElement | HTMLElement[] | JQuery, models: object, options?: object): IView;
}