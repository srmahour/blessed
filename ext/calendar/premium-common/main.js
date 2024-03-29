/*!
FullCalendar Scheduler v5.9.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2021 Adam Shaw
*/
import { createElement, Fragment, config, isValidDate, addDays, createPlugin } from '../common';

var RELEASE_DATE = '2021-07-28'; // for Scheduler
var UPGRADE_WINDOW = 365 + 7; // days. 1 week leeway, for tz shift reasons too
var INVALID_LICENSE_URL = 'http://fullcalendar.io/docs/schedulerLicenseKey#invalid';
var OUTDATED_LICENSE_URL = 'http://fullcalendar.io/docs/schedulerLicenseKey#outdated';
var PRESET_LICENSE_KEYS = [
    'GPL-My-Project-Is-Open-Source',
    'CC-Attribution-NonCommercial-NoDerivatives',
];
var CSS = {
    position: 'absolute',
    zIndex: 99999,
    bottom: '1px',
    left: '1px',
    background: '#eee',
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: '1px 1px 0 0',
    padding: '2px 4px',
    fontSize: '12px',
    borderTopRightRadius: '3px',
};
function buildLicenseWarning(context) {
    var key = context.options.schedulerLicenseKey;
    var currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (!isImmuneUrl(currentUrl)) {
        var status_1 = processLicenseKey(key);
        if (status_1 !== 'valid') {
            return (createElement("div", { className: "fc-license-message", style: CSS }, (status_1 === 'outdated') ? (createElement(Fragment, null,
                'Your license key is too old to work with this version. ',
                createElement("a", { href: OUTDATED_LICENSE_URL }, "More Info"))) : (createElement(Fragment, null,
                'Your license key is invalid. ',
                createElement("a", { href: INVALID_LICENSE_URL }, "More Info")))));
        }
    }
    return null;
}
/*
This decryption is not meant to be bulletproof. Just a way to remind about an upgrade.
*/
function processLicenseKey(key) {
    if (PRESET_LICENSE_KEYS.indexOf(key) !== -1) {
        return 'valid';
    }
    var parts = (key || '').match(/^(\d+)-fcs-(\d+)$/);
    if (parts && (parts[1].length === 10)) {
        var purchaseDate = new Date(parseInt(parts[2], 10) * 1000);
        var releaseDate = new Date(config.mockSchedulerReleaseDate || RELEASE_DATE);
        if (isValidDate(releaseDate)) { // token won't be replaced in dev mode
            var minPurchaseDate = addDays(releaseDate, -UPGRADE_WINDOW);
            if (minPurchaseDate < purchaseDate) {
                return 'valid';
            }
            return 'outdated';
        }
    }
    return 'invalid';
}
function isImmuneUrl(url) {
    return /\w+:\/\/fullcalendar\.io\/|\/examples\/[\w-]+\.html$/.test(url);
}

var OPTION_REFINERS = {
    schedulerLicenseKey: String,
};

var main = createPlugin({
    optionRefiners: OPTION_REFINERS,
    viewContainerAppends: [buildLicenseWarning],
});

export default main;
//# sourceMappingURL=main.js.map
