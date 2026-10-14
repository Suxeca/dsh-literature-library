import type { IncomingMessage, ServerResponse } from 'node:http';
interface Route {
    kind: 'exact';
    path: string;
    handler(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
interface PluginContext {
    get(name: 'webServer'): {
        register(route: Route): () => void;
    };
    get(name: 'connection'): {
        requestRejection(req: IncomingMessage): 401 | 403 | undefined;
    };
    effect(factory: () => () => void): void;
}
export declare const name = "@suxeca/dsh-literature-library";
export declare const inject: string[];
export interface Config {
    libraryRoot?: string;
    catalogPath?: string;
    pagePath?: string;
}
/** The three paths after resolution; every field is concrete. */
export interface ResolvedPaths {
    libraryRoot: string;
    catalogPath: string;
    pagePath: string;
}
/**
 * Resolve the library paths at runtime, so no machine-specific absolute path is
 * ever baked into the shipped bundle patch. Priority:
 *
 *   1. an explicit config key, then DSH_LITERATURE_ROOT for the whole root
 *   2. ~/Workspace/docs/literature, when it already exists on disk (the layout
 *      this plugin was authored against, so an existing install is untouched)
 *   3. ~/.dsh/literature, the portable default for a fresh machine
 */
export declare function resolvePaths(config?: Config): ResolvedPaths;
/** Authenticated first-party page: visualization iframes intentionally cannot call network APIs. */
export declare function apply(ctx: PluginContext, config?: Config): Promise<void>;
export {};
