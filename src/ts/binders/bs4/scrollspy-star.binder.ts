import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
export const scrollspyStarBinder: BinderWrapper = () => {
  const name = 'bs4-scrollspy-*';
  const binder: IOneWayBinder<string> = function(el: HTMLElement, targetSelector: string) {
    const $el = $(el);
    const nativeIDTargetSelector = targetSelector.replace('#', '');
    let target = document.getElementById(nativeIDTargetSelector);
    let $target: JQuery<Element> | null = null;
    if (target) {
      $target = $(target);
    }
    const className = this.args[0] as string;

    /**
     * Determine if an element is in the viewport
     * @param elem The element
     * @return Returns true if element is in the viewport
     */
    const isInViewport = (elem: Element ): boolean => {
      if (!elem) {
        return false;
      }
      const distance = elem.getBoundingClientRect();
      return (
        distance.top + distance.height >= 0 && distance.bottom - distance.height <= 0
      );
    };

    const onScroll = () => {
      // if content was loaded with ajax
      if (!target) {
        target = document.getElementById(nativeIDTargetSelector);
        if (target) {
          $target = $(nativeIDTargetSelector);
        }
      }

      if (!target) {
        return;
      }

      if (isInViewport(target)) {
        $el.addClass(className);
        if ($el.is(':radio')) {
          $el.prop('checked', true);
        }
      } else {
        $el.removeClass(className);
        if ($el.is(':radio')) {
          $el.prop('checked', false);
        }
      }
    };

    $(window).on('scroll', onScroll);
    onScroll();
  };
  return {
    binder,
    name,
  };
};
