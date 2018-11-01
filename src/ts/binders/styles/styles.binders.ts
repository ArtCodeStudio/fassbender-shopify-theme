import { IBinders } from '@ribajs/core';

import { backgroundImageBinderWrapper } from './background-image.binder';
import { backgroundColorStarBinderWrapper } from './background-color-star.binder';
import { opacityStarBinderWrapper } from './opacity-star.binder';

const styleBinders: IBinders<any> = {};

const backgroundImageBinder = backgroundImageBinderWrapper();
const backgroundColorStarBinder = backgroundColorStarBinderWrapper();
const opacityStarBinder = opacityStarBinderWrapper();

styleBinders[backgroundImageBinder.name] = backgroundImageBinder.binder;
styleBinders[backgroundColorStarBinder.name] = backgroundColorStarBinder.binder;
styleBinders[opacityStarBinder.name] = opacityStarBinder.binder;

export { styleBinders };
