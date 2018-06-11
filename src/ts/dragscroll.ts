// https://github.com/asvd/dragscroll
let mousemove = 'mousemove';
let mouseup = 'mouseup';
let mousedown = 'mousedown';
let newScrollX;
let newScrollY;

let dragged = [];
let reset = function() {
    for (let i = 0; i < dragged.length;) {
        let el = dragged[i++];
        el = el.container || el;
        el.removeEventListener(mousedown, el.md, 0);
        window.removeEventListener(mouseup, el.mu);
        window.removeEventListener(mousemove, el.mm);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(document.getElementsByClassName('dragscroll'));
    for (let i = 0; i < dragged.length;) {
        (function(el, lastClientX, lastClientY, pushed, scroller, cont){
            (cont = el.container || el).addEventListener(
                mousedown,
                cont.md = function(e) {
                    if (!el.hasAttribute('nochilddrag') ||
                        document.elementFromPoint(
                            e.pageX, e.pageY
                        ) == cont
                    ) {
                        pushed = 1;
                        lastClientX = e.clientX;
                        lastClientY = e.clientY;

                        e.preventDefault();
                    }
                }, 0
            );

            window.addEventListener(
                mouseup, cont.mu = function() {pushed = 0;}
            );

            window.addEventListener(
                mousemove,
                cont.mm = (e) => {
                    if (pushed) {
                        (scroller = el.scroller||el).scrollLeft -=
                            newScrollX = (- lastClientX + (lastClientX=e.clientX));
                        scroller.scrollTop -=
                            newScrollY = (- lastClientY + (lastClientY=e.clientY));
                        if (el == document.body) {
                            (scroller = document.documentElement).scrollLeft -= newScrollX;
                            scroller.scrollTop -= newScrollY;
                        }
                    }
                }
            );
         })(dragged[i++]);
    }
}

/*  
if (document.readyState == 'complete') {
  reset();
} else {
    window.addEventListener('load', reset, 0);
}
*/