
import * as _fullcalendar_common from '../common';
import { createElement, DateComponent, Hit, DateMarker, DateProfile, Duration, EventStore, EventUiHash, DateSpan, EventInteractionState, VNode, CssDimValue } from '../common';
import '../premium-common';
import { TimeColsView, TimeSlatMeta, TimeColsSlatsCoords } from '../timegrid';
import { ResourceViewProps, AbstractResourceDayTableModel } from '../resource-common';

declare class ResourceDayTimeColsView extends TimeColsView {
    props: ResourceViewProps;
    private flattenResources;
    private buildResourceTimeColsModel;
    private buildSlatMetas;
    render(): createElement.JSX.Element;
}

interface ResourceDayTimeColsProps {
    dateProfile: DateProfile;
    resourceDayTableModel: AbstractResourceDayTableModel;
    axis: boolean;
    slotDuration: Duration;
    slatMetas: TimeSlatMeta[];
    businessHours: EventStore;
    eventStore: EventStore;
    eventUiBases: EventUiHash;
    dateSelection: DateSpan | null;
    eventSelection: string;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    tableColGroupNode: VNode;
    tableMinWidth: CssDimValue;
    clientWidth: number | null;
    clientHeight: number | null;
    expandRows: boolean;
    onScrollTopRequest?: (scrollTop: number) => void;
    forPrint: boolean;
    onSlatCoords?: (slatCoords: TimeColsSlatsCoords) => void;
}
declare class ResourceDayTimeCols extends DateComponent<ResourceDayTimeColsProps> {
    private buildDayRanges;
    private dayRanges;
    private splitter;
    private slicers;
    private joiner;
    private timeColsRef;
    render(): createElement.JSX.Element;
    isHitComboAllowed: (hit0: Hit, hit1: Hit) => boolean;
    buildNowIndicatorSegs(date: DateMarker): any[];
}

declare const _default: _fullcalendar_common.PluginDef;


export default _default;
export { ResourceDayTimeCols, ResourceDayTimeColsView };
