import Debug from 'debug';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';

/**
 * Scroll an scrollable element by draging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */
export class Dragscroll {
  lastClientX = 0;
  lastClientY = 0;
  el: HTMLElement;
  pushed: boolean = false;;
  debug = Debug('binders:scrollbar-dragable');

  md <EventListener> (e: MouseEvent) {
    this.pushed = true;
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
    e.preventDefault();
  }

  mu <EventListener> () {
    this.pushed = false;
  }

  mm <EventListener> (e: MouseEvent) {
    let newScrollX = 0;
    let newScrollY = 0;
    if (this.pushed) {
      this.el.scrollLeft -= newScrollX = (- this.lastClientX + (this.lastClientX = e.clientX));
      this.el.scrollTop -= newScrollY = (- this.lastClientY + (this.lastClientY = e.clientY));
      if (this.el === document.body) {
        this.el = document.documentElement
        this.el.scrollLeft -= newScrollX;
        this.el.scrollTop -= newScrollY;
      }
    }
  }

  constructor(el: HTMLElement, detectGlobalMove = true) {
    this.el = el;

    el.removeEventListener('mousedown',this.md.bind(this), false);
    el.addEventListener('mousedown', this.md.bind(this), false);

    // Use global move if your element does not use the full width / height
    if(detectGlobalMove) {
      window.removeEventListener('mouseup', this.mu.bind(this), false);
      window.removeEventListener('mousemove', this.mm.bind(this), false);
  
      window.addEventListener('mouseup', this.mu.bind(this), false);
      window.addEventListener('mousemove', this.mm.bind(this), false);
    } else {
      el.removeEventListener('mouseup', this.mu.bind(this), false);
      el.removeEventListener('mousemove', this.mm.bind(this), false);
  
      el.addEventListener('mouseup', this.mu.bind(this), false);
      el.addEventListener('mousemove', this.mm.bind(this), false);
    }
  };
}

/**
 * dragscroll
 */
export const scrollbarDragableBinder: BinderWrapper = () => {
  const name = 'scrollbar-dragable';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    const dragscroll = new Dragscroll(el, true);
    dragscroll.debug('ready');
  };
  return {
    binder,
    name,
  };
};
