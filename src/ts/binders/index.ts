import { IBinders } from '../tinybind';

export { styleBinders } from './styles/styles.binders';
// binders
import { mailtoBinderWrapper } from './mailto.binder';
import { telBinderWrapper } from './tel.binder';
import { scrollbarDragableBinderWrapper } from './scrollbar/scrollbar-dragable.binder';
import { i18nBinderWrapper } from './i18n/i18n.binder';

import { collapseBinderWrapper } from './bs4/collapse.binder';
import { expanOnUrlBinderWrapper } from './bs4/expan-on-url.binder';
import { collapseOnUrlBinderWrapper } from './bs4/collapse-on-url.binder';
import { scrollspyStarBinderWrapper } from './bs4/scrollspy-star.binder';

const customBinders: IBinders<any> = {};

const mailtoBinder = mailtoBinderWrapper();
const telBinder = telBinderWrapper();
const scrollbarDragableBinder = scrollbarDragableBinderWrapper();
const i18nBinder = i18nBinderWrapper();

const collapseBinder = collapseBinderWrapper();
const expanOnUrlBinder = expanOnUrlBinderWrapper();
const collapseOnUrlBinder = collapseOnUrlBinderWrapper();
const scrollspyStarBinder = scrollspyStarBinderWrapper();

customBinders[mailtoBinder.name] = mailtoBinder.binder;
customBinders[telBinder.name] = telBinder.binder;
customBinders[scrollbarDragableBinder.name] = scrollbarDragableBinder.binder;
customBinders[i18nBinder.name] = i18nBinder.binder;

customBinders[collapseBinder.name] = collapseBinder.binder;
customBinders[expanOnUrlBinder.name] = expanOnUrlBinder.binder;
customBinders[collapseOnUrlBinder.name] = collapseOnUrlBinder.binder;
customBinders[scrollspyStarBinder.name] = scrollspyStarBinder.binder;

export { customBinders };
