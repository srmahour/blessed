/*!
FullCalendar Scheduler v5.9.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2021 Adam Shaw
*/
var FullCalendarResourceDayGrid = (function (exports, common, premiumCommonPlugin, resourceCommonPlugin, dayGridPlugin) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var premiumCommonPlugin__default = /*#__PURE__*/_interopDefaultLegacy(premiumCommonPlugin);
    var resourceCommonPlugin__default = /*#__PURE__*/_interopDefaultLegacy(resourceCommonPlugin);
    var dayGridPlugin__default = /*#__PURE__*/_interopDefaultLegacy(dayGridPlugin);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var ResourceDayTableJoiner = /** @class */ (function (_super) {
        __extends(ResourceDayTableJoiner, _super);
        function ResourceDayTableJoiner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResourceDayTableJoiner.prototype.transformSeg = function (seg, resourceDayTableModel, resourceI) {
            var colRanges = resourceDayTableModel.computeColRanges(seg.firstCol, seg.lastCol, resourceI);
            return colRanges.map(function (colRange) { return (__assign(__assign(__assign({}, seg), colRange), { isStart: seg.isStart && colRange.isStart, isEnd: seg.isEnd && colRange.isEnd })); });
        };
        return ResourceDayTableJoiner;
    }(resourceCommonPlugin.VResourceJoiner));

    var ResourceDayTable = /** @class */ (function (_super) {
        __extends(ResourceDayTable, _super);
        function ResourceDayTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.splitter = new resourceCommonPlugin.VResourceSplitter();
            _this.slicers = {};
            _this.joiner = new ResourceDayTableJoiner();
            _this.tableRef = common.createRef();
            _this.isHitComboAllowed = function (hit0, hit1) {
                var allowAcrossResources = _this.props.resourceDayTableModel.dayTableModel.colCnt === 1;
                return allowAcrossResources || hit0.dateSpan.resourceId === hit1.dateSpan.resourceId;
            };
            return _this;
        }
        ResourceDayTable.prototype.render = function () {
            var _this = this;
            var _a = this, props = _a.props, context = _a.context;
            var resourceDayTableModel = props.resourceDayTableModel, nextDayThreshold = props.nextDayThreshold, dateProfile = props.dateProfile;
            var splitProps = this.splitter.splitProps(props);
            this.slicers = common.mapHash(splitProps, function (split, resourceId) { return _this.slicers[resourceId] || new dayGridPlugin.DayTableSlicer(); });
            var slicedProps = common.mapHash(this.slicers, function (slicer, resourceId) { return slicer.sliceProps(splitProps[resourceId], dateProfile, nextDayThreshold, context, resourceDayTableModel.dayTableModel); });
            return (common.createElement(dayGridPlugin.Table, __assign({ forPrint: props.forPrint, ref: this.tableRef }, this.joiner.joinProps(slicedProps, resourceDayTableModel), { cells: resourceDayTableModel.cells, dateProfile: dateProfile, colGroupNode: props.colGroupNode, tableMinWidth: props.tableMinWidth, renderRowIntro: props.renderRowIntro, dayMaxEvents: props.dayMaxEvents, dayMaxEventRows: props.dayMaxEventRows, showWeekNumbers: props.showWeekNumbers, expandRows: props.expandRows, headerAlignElRef: props.headerAlignElRef, clientWidth: props.clientWidth, clientHeight: props.clientHeight, isHitComboAllowed: this.isHitComboAllowed })));
        };
        return ResourceDayTable;
    }(common.DateComponent));

    var ResourceDayTableView = /** @class */ (function (_super) {
        __extends(ResourceDayTableView, _super);
        function ResourceDayTableView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.flattenResources = common.memoize(resourceCommonPlugin.flattenResources);
            _this.buildResourceDayTableModel = common.memoize(buildResourceDayTableModel);
            _this.headerRef = common.createRef();
            _this.tableRef = common.createRef();
            return _this;
        }
        ResourceDayTableView.prototype.render = function () {
            var _this = this;
            var _a = this, props = _a.props, context = _a.context;
            var options = context.options;
            var resourceOrderSpecs = options.resourceOrder || resourceCommonPlugin.DEFAULT_RESOURCE_ORDER;
            var resources = this.flattenResources(props.resourceStore, resourceOrderSpecs);
            var resourceDayTableModel = this.buildResourceDayTableModel(props.dateProfile, context.dateProfileGenerator, resources, options.datesAboveResources, context);
            var headerContent = options.dayHeaders && (common.createElement(resourceCommonPlugin.ResourceDayHeader, { ref: this.headerRef, resources: resources, dateProfile: props.dateProfile, dates: resourceDayTableModel.dayTableModel.headerDates, datesRepDistinctDays: true }));
            var bodyContent = function (contentArg) { return (common.createElement(ResourceDayTable, { ref: _this.tableRef, dateProfile: props.dateProfile, resourceDayTableModel: resourceDayTableModel, businessHours: props.businessHours, eventStore: props.eventStore, eventUiBases: props.eventUiBases, dateSelection: props.dateSelection, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, nextDayThreshold: options.nextDayThreshold, tableMinWidth: contentArg.tableMinWidth, colGroupNode: contentArg.tableColGroupNode, dayMaxEvents: options.dayMaxEvents, dayMaxEventRows: options.dayMaxEventRows, showWeekNumbers: options.weekNumbers, expandRows: !props.isHeightAuto, headerAlignElRef: _this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint })); };
            return options.dayMinWidth
                ? this.renderHScrollLayout(headerContent, bodyContent, resourceDayTableModel.colCnt, options.dayMinWidth)
                : this.renderSimpleLayout(headerContent, bodyContent);
        };
        return ResourceDayTableView;
    }(dayGridPlugin.TableView));
    function buildResourceDayTableModel(dateProfile, dateProfileGenerator, resources, datesAboveResources, context) {
        var dayTable = dayGridPlugin.buildDayTableModel(dateProfile, dateProfileGenerator);
        return datesAboveResources ?
            new resourceCommonPlugin.DayResourceTableModel(dayTable, resources, context) :
            new resourceCommonPlugin.ResourceDayTableModel(dayTable, resources, context);
    }

    var plugin = common.createPlugin({
        deps: [
            premiumCommonPlugin__default['default'],
            resourceCommonPlugin__default['default'],
            dayGridPlugin__default['default'],
        ],
        initialView: 'resourceDayGridDay',
        views: {
            resourceDayGrid: {
                type: 'dayGrid',
                component: ResourceDayTableView,
                needsResourceData: true,
            },
            resourceDayGridDay: {
                type: 'resourceDayGrid',
                duration: { days: 1 },
            },
            resourceDayGridWeek: {
                type: 'resourceDayGrid',
                duration: { weeks: 1 },
            },
            resourceDayGridMonth: {
                type: 'resourceDayGrid',
                duration: { months: 1 },
                // TODO: wish we didn't have to C&P from dayGrid's file
                monthMode: true,
                fixedWeekCount: true,
            },
        },
    });

    common.globalPlugins.push(plugin);

    exports.ResourceDayTable = ResourceDayTable;
    exports.ResourceDayTableView = ResourceDayTableView;
    exports.default = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, FullCalendar, FullCalendarPremiumCommon, FullCalendarResourceCommon, FullCalendarDayGrid));
