import tinybind from 'tinybind';
import { navItems } from './nav-items/nav-items.component';
import { slideoutComponent } from './slideout/slideout.component';

const components: any = tinybind.components;

// components.slideout = slideoutComponent;
components['nav-items'] = navItems;

export { components, slideoutComponent };
