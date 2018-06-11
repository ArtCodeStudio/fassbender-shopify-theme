interface IState {
  url: string;
  namespace: string;
}

/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {Object}
 */
class HistoryManager {

  private static instance: HistoryManager;

  /**
   * Keep track of the status in historic order
   *
   * @memberOf Barba.HistoryManager
   * @readOnly
   * @type {Array}
   */
  private history: IState[] = new Array();

  constructor() {
    if (HistoryManager.instance) {
      return HistoryManager.instance;
    }

    HistoryManager.instance = this;
    return HistoryManager.instance;
  }

  /**
   * Add a new set of url and namespace
   *
   * @memberOf Barba.HistoryManager
   * @param {String} url
   * @param {String} namespace
   * @private
   */
  public add(url: string, namespace?: string) {

    if (!namespace) {
      namespace = undefined;
    }

    this.history.push({
      namespace,
      url,
    });
  }

  /**
   * Return information about the current status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  public currentStatus() {
    return this.history[this.history.length - 1];
  }

  /**
   * Return information about the previous status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  public prevStatus() {
    const history = this.history;

    if (history.length < 2) {
      return null;
    }

    return history[history.length - 2];
  }
}

export { HistoryManager, IState };
