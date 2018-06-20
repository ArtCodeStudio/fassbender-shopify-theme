export { iconsetComponent } from './iconset/iconset.component';
export { navItems } from './nav-items/nav-items.component';
export { slideoutComponent } from './slideout/slideout.component';

import { IComponent } from 'tinybind';

export interface ICustomComponent extends IComponent {
  name: string;
}
