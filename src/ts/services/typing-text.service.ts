/**
 * @see https://bootsnipp.com/snippets/y8mDV
 */
export class TypingTextService {

  private toRotate: string[];
  private el: HTMLElement;
  private loopNum = 0;
  private period: number;
  private txt = '';
  private isDeleting = false;
  private fullTxt?: string;

  constructor(el: HTMLElement, period?: number) {
    this.el = el;
    this.loopNum = 0;
    this.txt = '';
    this.period = period || 2000;
  }

  public auto(toRotate: string[]) {
    this.toRotate = toRotate;
    this.loopNum = 0;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }

  public delete(cb?: () => void) {
    this.isDeleting = true;
    this.fullTxt = this.el.innerHTML;
    this.txt = this.fullTxt;
    this.deleteTick(cb);
    this.isDeleting = false;
  }

  public write(fullTxt: string, cb?: () => void) {
    this.fullTxt = fullTxt;
    this.txt = '';
    this.isDeleting = false;
    this.writeTick(cb);
  }

  private tick() {
    const i = this.loopNum % this.toRotate.length;
    this.fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = this.fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = this.fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt;

    const that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === this.fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  }

  private deleteTick(cb?: () => void) {
    let delta = 300 - Math.random() * 100;
    delta /= 2;

    this.txt = this.fullTxt.substring(0, this.txt.length - 1);
    this.el.innerHTML = this.txt;

    if (this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
      // done
      return setTimeout(() => {
        if (cb) { return cb(); }
      }, delta);
      return;
    } else {
      // next tick
      return setTimeout(() => {
        this.deleteTick(cb);
      }, delta);
    }
  }

  private writeTick(cb: () => void) {
    this.txt = this.fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = this.txt;

    const that = this;
    let delta = 300 - Math.random() * 100;

    if (this.txt === this.fullTxt) {
      delta = this.period;
      this.isDeleting = true;
      // done
      return setTimeout(() => {
        if (cb) { return cb(); }
      }, delta);
    } else {
      // next tick
      return setTimeout(() => {
        this.writeTick(cb);
      }, delta);
    }
  }

}
