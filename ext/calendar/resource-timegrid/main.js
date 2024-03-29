/*!
FullCalendar Scheduler v5.9.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2021 Adam Shaw
*/
import { memoize, createRef, mapHash, createElement, NowTimer, DateComponent, createPlugin } from '../common';
import premiumCommonPlugin from '../premium-common';
import resourceCommonPlugin, { VResourceJoiner, VResourceSplitter, flattenResources, DEFAULT_RESOURCE_ORDER, ResourceDayHeader, DayResourceTableModel, ResourceDayTableModel } from '../resource-common';
import timeGridPlugin, { buildDayRanges, DayTimeColsSlicer, TimeCols, buildSlatMetas, TimeColsView, buildTimeColsModel } from '../timegrid';
import { __extends, __assign } from 'tslib';
import { ResourceDayTable } from '../resource-daygrid';

var ResourceDayTimeColsJoiner = /** @class */ (function (_super) {
    __extends(ResourceDayTimeColsJoiner, _super);
    function ResourceDayTimeColsJoiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceDayTimeColsJoiner.prototype.transformSeg = function (seg, resourceDayTable, resourceI) {
        return [
            __assign(__assign({}, seg), { col: resourceDayTable.computeCol(seg.col, resourceI) }),
        ];
    };
    return ResourceDayTimeColsJoiner;
}(VResourceJoiner));

var ResourceDayTimeCols = /** @class */ (function (_super) {
    __extends(ResourceDayTimeCols, _super);
    function ResourceDayTimeCols() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayRanges = memoize(buildDayRanges);
        _this.splitter = new VResourceSplitter();
        _this.slicers = {};
        _this.joiner = new ResourceDayTimeColsJoiner();
        _this.timeColsRef = createRef();
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
        this.slicers = mapHash(splitProps, function (split, resourceId) { return _this.slicers[resourceId] || new DayTimeColsSlicer(); });
        var slicedProps = mapHash(this.slicers, function (slicer, resourceId) { return slicer.sliceProps(splitProps[resourceId], dateProfile, null, context, dayRanges); });
        return ( // TODO: would move this further down hierarchy, but sliceNowDate needs it
        createElement(NowTimer, { unit: options.nowIndicator ? 'minute' : 'day' }, function (nowDate, todayRange) { return (createElement(TimeCols, __assign({ ref: _this.timeColsRef }, _this.joiner.joinProps(slicedProps, resourceDayTableModel), { dateProfile: dateProfile, axis: props.axis, slotDuration: props.slotDuration, slatMetas: props.slatMetas, cells: resourceDayTableModel.cells[0], tableColGroupNode: props.tableColGroupNode, tableMinWidth: props.tableMinWidth, clientWidth: props.clientWidth, clientHeight: props.clientHeight, expandRows: props.expandRows, nowDate: nowDate, nowIndicatorSegs: options.nowIndicator && _this.buildNowIndicatorSegs(nowDate), todayRange: todayRange, onScrollTopRequest: props.onScrollTopRequest, forPrint: props.forPrint, onSlatCoords: props.onSlatCoords, isHitComboAllowed: _this.isHitComboAllowed }))); }));
    };
    ResourceDayTimeCols.prototype.buildNowIndicatorSegs = function (date) {
        var nonResourceSegs = this.slicers[''].sliceNowDate(date, this.context, this.dayRanges);
        return this.joiner.expandSegs(this.props.resourceDayTableModel, nonResourceSegs);
    };
    return ResourceDayTimeCols;
}(DateComponent));

var ResourceDayTimeColsView = /** @class */ (function (_super) {
    __extends(ResourceDayTimeColsView, _super);
    function ResourceDayTimeColsView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flattenResources = memoize(flattenResources);
        _this.buildResourceTimeColsModel = memoize(buildResourceTimeColsModel);
        _this.buildSlatMetas = memoize(buildSlatMetas);
        return _this;
    }
    ResourceDayTimeColsView.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options, dateEnv = context.dateEnv;
        var dateProfile = props.dateProfile;
        var splitProps = this.allDaySplitter.splitProps(props);
        var resourceOrderSpecs = options.resourceOrder || DEFAULT_RESOURCE_ORDER;
        var resources = this.flattenResources(props.resourceStore, resourceOrderSpecs);
        var resourceDayTableModel = this.buildResourceTimeColsModel(dateProfile, context.dateProfileGenerator, resources, options.datesAboveResources, context);
        var slatMetas = this.buildSlatMetas(dateProfile.slotMinTime, dateProfile.slotMaxTime, options.slotLabelInterval, options.slotDuration, dateEnv);
        var dayMinWidth = options.dayMinWidth;
        var hasAttachedAxis = !dayMinWidth;
        var hasDetachedAxis = dayMinWidth;
        var headerContent = options.dayHeaders && (createElement(ResourceDayHeader, { resources: resources, dates: resourceDayTableModel.dayTableModel.headerDates, dateProfile: dateProfile, datesRepDistinctDays: true, renderIntro: hasAttachedAxis ? this.renderHeadAxis : null }));
        var allDayContent = (options.allDaySlot !== false) && (function (contentArg) { return (createElement(ResourceDayTable, __assign({}, splitProps.allDay, { dateProfile: dateProfile, resourceDayTableModel: resourceDayTableModel, nextDayThreshold: options.nextDayThreshold, tableMinWidth: contentArg.tableMinWidth, colGroupNode: contentArg.tableColGroupNode, renderRowIntro: hasAttachedAxis ? _this.renderTableRowAxis : null, showWeekNumbers: false, expandRows: false, headerAlignElRef: _this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint }, _this.getAllDayMaxEventProps()))); });
        var timeGridContent = function (contentArg) { return (createElement(ResourceDayTimeCols, __assign({}, splitProps.timed, { dateProfile: dateProfile, axis: hasAttachedAxis, slotDuration: options.slotDuration, slatMetas: slatMetas, resourceDayTableModel: resourceDayTableModel, tableColGroupNode: contentArg.tableColGroupNode, tableMinWidth: contentArg.tableMinWidth, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, onSlatCoords: _this.handleSlatCoords, expandRows: contentArg.expandRows, forPrint: props.forPrint, onScrollTopRequest: _this.handleScrollTopRequest }))); };
        return hasDetachedAxis
            ? this.renderHScrollLayout(headerContent, allDayContent, timeGridContent, resourceDayTableModel.colCnt, dayMinWidth, slatMetas, this.state.slatCoords)
            : this.renderSimpleLayout(headerContent, allDayContent, timeGridContent);
    };
    return ResourceDayTimeColsView;
}(TimeColsView));
function buildResourceTimeColsModel(dateProfile, dateProfileGenerator, resources, datesAboveResources, context) {
    var dayTable = buildTimeColsModel(dateProfile, dateProfileGenerator);
    return datesAboveResources ?
        new DayResourceTableModel(dayTable, resources, context) :
        new ResourceDayTableModel(dayTable, resources, context);
}

var main = createPlugin({
    deps: [
        premiumCommonPlugin,
        resourceCommonPlugin,
        timeGridPlugin,
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

export default main;
export { ResourceDayTimeCols, ResourceDayTimeColsView };
//# sourceMappingURL=main.js.map
