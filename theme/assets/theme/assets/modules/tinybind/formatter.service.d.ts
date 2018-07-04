export interface IFormatter {
    (val: any, ...args: any[]): any;
    read?: (result: string, ...processedArgs: string[]) => void;
    publish?: (result: string, ...processedArgs: string[]) => void;
}
export interface IFormatters {
    [name: string]: IFormatter;
}
export declare class FormatterService {
    private formatters;
    private debug;
    /**
     *
     */
    constructor(formatters: IFormatters);
    /**
     * Regist a formatter with his name
     * @param component
     * @param name
     */
    regist(component: IFormatter, name?: string): IFormatters;
    /**
     * Regist a set of formatters
     * @param formatters
     */
    regists(formatters: IFormatters): IFormatters;
}
