import * as _fullcalendar_common from '../common';

declare const OPTION_REFINERS: {
    schedulerLicenseKey: StringConstructor;
};

declare type ExtraOptionRefiners = typeof OPTION_REFINERS;
declare module '../common' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
}


declare const _default: _fullcalendar_common.PluginDef;


export default _default;
