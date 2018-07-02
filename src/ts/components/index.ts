export { contactComponent } from './contact/contact.component';
export { iconsetComponent } from './iconset/iconset.component';
export { navItemsComponent } from './nav-items/nav-items.component';
export { slideoutComponent } from './slideout/slideout.component';

import { IComponent } from '../../modules/tinybind';

export interface ICustomComponent<ValueType> extends IComponent<ValueType> {
  name: string;
}
