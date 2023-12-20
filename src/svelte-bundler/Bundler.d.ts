export default class Bundler {
    /** @param {{ packages_url: string; svelte_url: string; onstatus: (val: string | null) => void}} param0 */
    constructor({ packages_url, svelte_url, onstatus }: {
        packages_url: string;
        svelte_url: string;
        onstatus: (val: string | null) => void;
    });
    /** @type {Worker} */
    worker: Worker;
    handlers: Map<any, any>;
    /**
     *
     * @param {import('./types').File[]} files
     * @returns
     */
    bundle(files: import('./types').File[]): Promise<any>;
    destroy(): void;
}
