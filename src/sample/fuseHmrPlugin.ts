import { HMRHelper, HMRPayload } from 'fuse-box/types/hmr';
export default function (payload: HMRPayload, helper: HMRHelper) {
    const { updates } = payload;

    if (helper.isStylesheeetUpdate) {
        helper.flushModules(updates);

        helper.updateModules();

        helper.callModules(updates);
    } else {
        helper.flushAll();
        helper.updateModules();

        helper.callEntries();
    }
}
