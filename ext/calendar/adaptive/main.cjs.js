/*!
FullCalendar Scheduler v5.9.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2021 Adam Shaw
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('../common');
var premiumCommonPlugin = require('../premium-common');
;

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var premiumCommonPlugin__default = /*#__PURE__*/_interopDefaultLegacy(premiumCommonPlugin);

common.config.COLLAPSIBLE_WIDTH_THRESHOLD = 1200;
var contexts = [];
var undoFuncs = [];
var main = common.createPlugin({
    deps: [
        premiumCommonPlugin__default['default'],
    ],
    contextInit: function (context) {
        if (!contexts.length) {
            attachGlobalHandlers();
        }
        contexts.push(context);
        context.calendarApi.on('_unmount', function () {
            common.removeExact(contexts, context);
            if (!contexts.length) {
                removeGlobalHandlers();
            }
        });
    },
});
function attachGlobalHandlers() {
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    // // for testing
    // let forPrint = false
    // document.addEventListener('keypress', (ev) => {
    //   if (ev.key === 'p') {
    //     forPrint = !forPrint
    //     if (forPrint) {
    //       handleBeforePrint()
    //     } else {
    //       handleAfterPrint()
    //     }
    //   }
    // })
}
function removeGlobalHandlers() {
    window.removeEventListener('beforeprint', handleBeforePrint);
    window.removeEventListener('afterprint', handleAfterPrint);
}
function handleBeforePrint() {
    var scrollEls = queryScrollerEls();
    var scrollCoords = queryScrollerCoords(scrollEls);
    for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
        var context = contexts_1[_i];
        context.emitter.trigger('_beforeprint');
    }
    common.flushToDom(); // because printing grabs DOM immediately after
    killHorizontalScrolling(scrollEls, scrollCoords);
    undoFuncs.push(function () { return restoreScrollerCoords(scrollEls, scrollCoords); });
    undoFuncs.push(freezeScrollgridWidths());
}
function handleAfterPrint() {
    for (var _i = 0, contexts_2 = contexts; _i < contexts_2.length; _i++) {
        var context = contexts_2[_i];
        context.emitter.trigger('_afterprint');
    }
    common.flushToDom(); // guarantee that there are real scrollers
    while (undoFuncs.length) {
        undoFuncs.shift()();
    }
}
// scrollgrid widths
function freezeScrollgridWidths() {
    var els = common.findElements(document.body, '.fc-scrollgrid');
    els.forEach(freezeScrollGridWidth);
    return function () { return els.forEach(unfreezeScrollGridWidth); };
}
function freezeScrollGridWidth(el) {
    var elWidth = el.getBoundingClientRect().width;
    // along with collapsibleWidth, this is a hack for #5707
    if (!el.classList.contains('fc-scrollgrid-collapsible') || elWidth < common.config.COLLAPSIBLE_WIDTH_THRESHOLD) {
        el.style.width = elWidth + 'px';
    }
}
function unfreezeScrollGridWidth(el) {
    el.style.width = '';
}
// scrollers
// TODO: use scroll normalization!? yes
function queryScrollerEls() {
    return common.findElements(document.body, '.fc-scroller-harness > .fc-scroller');
}
function queryScrollerCoords(els) {
    return els.map(function (el) {
        var computedStyle = window.getComputedStyle(el);
        return {
            scrollLeft: el.scrollLeft,
            scrollTop: el.scrollTop,
            overflowX: computedStyle.overflowX,
            overflowY: computedStyle.overflowY,
            marginBottom: computedStyle.marginBottom,
        };
    });
}
function killHorizontalScrolling(els, coords) {
    els.forEach(function (el, i) {
        el.style.overflowX = 'visible'; // need to clear X/Y to get true overflow
        el.style.overflowY = 'visible'; // "
        el.style.marginBottom = ''; // for clipping away scrollbar. disable
        el.style.left = -coords[i].scrollLeft + 'px'; // simulate scrollLeft! will be position:relative
    });
}
function restoreScrollerCoords(els, coords) {
    els.forEach(function (el, i) {
        var c = coords[i];
        el.style.overflowX = c.overflowX;
        el.style.overflowY = c.overflowY;
        el.style.marginBottom = c.marginBottom;
        el.style.left = '';
        el.scrollLeft = c.scrollLeft;
        el.scrollTop = c.scrollTop;
    });
}

exports.default = main;
