import Rivets from 'rivets';
import { navItems } from './navItems';
import { slideout } from './slideout';

const components: any = Rivets.components;

components.slideout = slideout;
components['nav-items'] = navItems;

export { components };
