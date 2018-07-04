/**
 * @see https://bootsnipp.com/snippets/y8mDV
 */
export declare class TypingTextService {
    private toRotate;
    private el;
    private loopNum;
    private period;
    private txt;
    private isDeleting;
    private fullTxt?;
    constructor(el: HTMLElement, period?: number);
    auto(toRotate: string[]): void;
    delete(cb?: () => void): void;
    write(fullTxt: string, cb?: () => void): void;
    private tick;
    private deleteTick;
    private writeTick;
}
