/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class CollapseService {
  public static DATA_KEY = "bs.collapse";
  public static EVENT_KEY = `.${CollapseService.DATA_KEY}`;
  public static DATA_API_KEY = ".data-api";

  public static EVENT = {
    SHOW: `show${CollapseService.EVENT_KEY}`,
    SHOWN: `shown${CollapseService.EVENT_KEY}`,
    HIDE: `hide${CollapseService.EVENT_KEY}`,
    HIDDEN: `hidden${CollapseService.EVENT_KEY}`,
    CLICK_DATA_API: `click${CollapseService.EVENT_KEY}${CollapseService.DATA_API_KEY}`,
  };

  public static CLASSNAME = {
    SHOW: "show",
    COLLAPSE: "collapse",
    COLLAPSING: "collapsing",
    COLLAPSED: "collapsed",
  };

  private target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;
  }

  public show() {
    this.target.classList.remove(CollapseService.CLASSNAME.COLLAPSE);
    this.target.classList.add(CollapseService.CLASSNAME.SHOW);
    this.target.dispatchEvent(new CustomEvent(CollapseService.EVENT.SHOWN));
  }

  public hide() {
    this.target;
    this.target.classList.remove(CollapseService.CLASSNAME.SHOW);
    this.target.classList.add(CollapseService.CLASSNAME.COLLAPSE);
    this.target.dispatchEvent(new CustomEvent(CollapseService.EVENT.HIDDEN));
  }

  public isExpanded() {
    return this.target.classList.contains(CollapseService.CLASSNAME.SHOW);
  }

  public isCollapsed() {
    return !this.isExpanded();
  }

  public toggle() {
    if (this.isCollapsed()) {
      this.show();
    } else {
      this.hide();
    }
  }
}
