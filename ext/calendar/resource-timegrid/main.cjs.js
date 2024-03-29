/*!
FullCalendar Scheduler v5.9.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2021 Adam Shaw
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('../common');
var premiumCommonPlugin = require('../premium-common');
var resourceCommonPlugin = require('../resource-common');
var timeGridPlugin = require('../timegrid');
var tslib = require('tslib');
var resourceDaygrid = require('../resource-daygrid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var premiumCommonPlugin__default = /*#__PURE__*/_interopDefaultLegacy(premiumCommonPlugin);
var resourceCommonPlugin__default = /*#__PURE__*/_interopDefaultLegacy(resourceCommonPlugin);
var timeGridPlugin__default = /*#__PURE__*/_interopDefaultLegacy(timeGridPlugin);

var ResourceDayTimeColsJoiner = /** @class */ (function (_super) {
    tslib.__extends(ResourceDayTimeColsJoiner, _super);
    function ResourceDayTimeColsJoiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceDayTimeColsJoiner.prototype.transformSeg = function (seg, resourceDayTable, resourceI) {
        return [
            tslib.__assign(tslib.__assign({}, seg), { col: resourceDayTable.computeCol(seg.col, resourceI) }),
        ];
    };
    return ResourceDayTimeColsJoiner;
}(resourceCommonPlugin.VResourceJoiner));

var ResourceDayTimeCols = /** @class */ (function (_super) {
    tslib.__extends(ResourceDayTimeCols, _super);
    function ResourceDayTimeCols() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayRanges = common.memoize(timeGridPlugin.buildDayRanges);
        _this.splitter = new resourceCommonPlugin.VResourceSplitter();
        _this.slicers = {};
        _this.joiner = new ResourceDayTimeColsJoiner();
        _this.timeColsRef = common.createRef();
        _this.isHitComboAllowed = function (hit0, hit1) {
            var allowAcrossResources = _this.dayRanges.length === 1;
            return allowAcrossResources || hit0.dateSpan.resourceId === hit1.dateSpan.resourceId;
        };
        return _this;
    }
    ResourceDayTimeCols.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var dateEnv = context.dateEnv, options = context.options;
        var dateProfile = props.dateProfile, resourceDayTableModel = props.resourceDayTableModel;
        var dayRanges = this.dayRanges = this.buildDayRanges(resourceDayTableModel.dayTableModel, dateProfile, dateEnv);
        var splitProps = this.splitter.splitProps(props);
        this.slicers = common.mapHash(splitProps, function (split, resourceId) { return _this.slicers[resourceId] || new timeGridPlugin.DayTimeColsSlicer(); });
        var slicedProps = common.mapHash(this.slicers, function (slicer, resourceId) { return slicer.sliceProps(splitProps[resourceId], dateProfile, null, context, dayRanges); });
        return ( // TODO: would move this further down hierarchy, but sliceNowDate needs it
        common.createElement(common.NowTimer, { unit: options.nowIndicator ? 'minute' : 'day' }, function (nowDate, todayRange) { return (common.createElement(timeGridPlugin.TimeCols, tslib.__assign({ ref: _this.timeColsRef }, _this.joiner.joinProps(slicedProps, resourceDayTableModel), { dateProfile: dateProfile, axis: props.axis, slotDuration: props.slotDuration, slatMetas: props.slatMetas, cells: resourceDayTableModel.cells[0], tableColGroupNode: props.tableColGroupNode, tableMinWidth: props.tableMinWidth, clientWidth: props.clientWidth, clientHeight: props.clientHeight, expandRows: props.expandRows, nowDate: nowDate, nowIndicatorSegs: options.nowIndicator && _this.buildNowIndicatorSegs(nowDate), todayRange: todayRange, onScrollTopRequest: props.onScrollTopRequest, forPrint: props.forPrint, onSlatCoords: props.onSlatCoords, isHitComboAllowed: _this.isHitComboAllowed }))); }));
    };
    ResourceDayTimeCols.prototype.buildNowIndicatorSegs = function (date) {
        var nonResourceSegs = this.slicers[''].sliceNowDate(date, this.context, this.dayRanges);
        return this.joiner.expandSegs(this.props.resourceDayTableModel, nonResourceSegs);
    };
    return ResourceDayTimeCols;
}(common.DateComponent));

var ResourceDayTimeColsView = /** @class */ (function (_super) {
    tslib.__extends(ResourceDayTimeColsView, _super);
    function ResourceDayTimeColsView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flattenResources = common.memoize(resourceCommonPlugin.flattenResources);
        _this.buildResourceTimeColsModel = common.memoize(buildResourceTimeColsModel);
        _this.buildSlatMetas = common.memoize(timeGridPlugin.buildSlatMetas);
        return _this;
    }
    ResourceDayTimeColsView.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options, dateEnv = context.dateEnv;
        var dateProfile = props.dateProfile;
        var splitProps = this.allDaySplitter.splitProps(props);
        var resourceOrderSpecs = options.resourceOrder || resourceCommonPlugin.DEFAULT_RESOURCE_ORDER;
        var resources = this.flattenResources(props.resourceStore, resourceOrderSpecs);
        var resourceDayTableModel = this.buildResourceTimeColsModel(dateProfile, context.dateProfileGenerator, resources, options.datesAboveResources, context);
        var slatMetas = this.buildSlatMetas(dateProfile.slotMinTime, dateProfile.slotMaxTime, options.slotLabelInterval, options.slotDuration, dateEnv);
        var dayMinWidth = options.dayMinWidth;
        var hasAttachedAxis = !dayMinWidth;
        var hasDetachedAxis = dayMinWidth;
        var headerContent = options.dayHeaders && (common.createElement(resourceCommonPlugin.ResourceDayHeader, { resources: resources, dates: resourceDayTableModel.dayTableModel.headerDates, dateProfile: dateProfile, datesRepDistinctDays: true, renderIntro: hasAttachedAxis ? this.renderHeadAxis : null }));
        var allDayContent = (options.allDaySlot !== false) && (function (contentArg) { return (common.createElement(resourceDaygrid.ResourceDayTable, tslib.__assign({}, splitProps.allDay, { dateProfile: dateProfile, resourceDayTableModel: resourceDayTableModel, nextDayThreshold: options.nextDayThreshold, tableMinWidth: contentArg.tableMinWidth, colGroupNode: contentArg.tableColGroupNode, renderRowIntro: hasAttachedAxis ? _this.renderTableRowAxis : null, showWeekNumbers: false, expandRows: false, headerAlignElRef: _this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint }, _this.getAllDayMaxEventProps()))); });
        var timeGridContent = function (contentArg) { return (common.createElement(ResourceDayTimeCols, tslib.__assign({}, splitProps.timed, { dateProfile: dateProfile, axis: hasAttachedAxis, slotDuration: options.slotDuration, slatMetas: slatMetas, resourceDayTableModel: resourceDayTableModel, tableColGroupNode: contentArg.tableColGroupNode, tableMinWidth: contentArg.tableMinWidth, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, onSlatCoords: _this.handleSlatCoords, expandRows: contentArg.expandRows, forPrint: props.forPrint, onScrollTopRequest: _this.handleScrollTopRequest }))); };
        return hasDetachedAxis
            ? this.renderHScrollLayout(headerContent, allDayContent, timeGridContent, resourceDayTableModel.colCnt, dayMinWidth, slatMetas, this.state.slatCoords)
            : this.renderSimpleLayout(headerContent, allDayContent, timeGridContent);
    };
    return ResourceDayTimeColsView;
}(timeGridPlugin.TimeColsView));
function buildResourceTimeColsModel(dateProfile, dateProfileGenerator, resources, datesAboveResources, context) {
    var dayTable = timeGridPlugin.buildTimeColsModel(dateProfile, dateProfileGenerator);
    return datesAboveResources ?
        new resourceCommonPlugin.DayResourceTableModel(dayTable, resources, context) :
        new resourceCommonPlugin.ResourceDayTableModel(dayTable, resources, context);
}

var main = common.createPlugin({
    deps: [
        premiumCommonPlugin__default['default'],
        resourceCommonPlugin__default['default'],
        timeGridPlugin__default['default'],
    ],
    initialView: 'resourceTimeGridDay',
    views: {
        resourceTimeGrid: {
            type: 'timeGrid',
            component: ResourceDayTimeColsView,
            needsResourceData: true,
        },
        resourceTimeGridDay: {
            type: 'resourceTimeGrid',
            duration: { days: 1 },
        },
        resourceTimeGridWeek: {
            type: 'resourceTimeGrid',
            duration: { weeks: 1 },
        },
    },
});

exports.ResourceDayTimeCols = ResourceDayTimeCols;
exports.ResourceDayTimeColsView = ResourceDayTimeColsView;
exports.default = main;
