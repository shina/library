import { dirname, fromFileUrl } from '../deps.ts';

export function dirFromFileUrl(fileUrl: string) {
    return dirname(fromFileUrl(fileUrl));
}
