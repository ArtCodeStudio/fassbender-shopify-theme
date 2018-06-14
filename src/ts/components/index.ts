import Rivets from 'rivets';
import { navItems } from './nav-items/nav-items.component';
import { slideout } from './slideout/slideout.component';

const components: any = Rivets.components;

components.slideout = slideout;
components['nav-items'] = navItems;

export { components };
