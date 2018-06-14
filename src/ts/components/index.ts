import Rivets from 'rivets';
import { navItems } from './nav-items/nav-items.component';
import { slideoutComponent } from './slideout/slideout.component';

const components: any = Rivets.components;

// components.slideout = slideoutComponent;
components['nav-items'] = navItems;

export { components, slideoutComponent };
