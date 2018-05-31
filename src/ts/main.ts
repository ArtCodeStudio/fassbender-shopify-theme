import { sayHello } from "./greet";
import * as $ from "jquery";

function showHello(selector: string, name: string) {
    const $el = $(selector);
    console.log($el);
    $el.text(sayHello(name));
};

$(() => {
  showHello("#greeting", "TypeScript");
});
