/** Metadata must be matched to its arXiv record before entering this catalog. */
export interface Paper {
    id: string;
    title: string;
    authors: string[];
    arxivUrl: string;
    verifiedAt: string;
    sourceUrl: string;
}
interface LibraryState {
    version: 1;
    revision: number;
    starred: Record<string, string>;
}
/** One serialized writer owns bookmarks; unstar retains research files. */
export declare class LiteratureLibrary {
    private readonly root;
    private readonly catalog;
    private queue;
    constructor(root: string, catalog: readonly Paper[]);
    private state;
    private atomic;
    /** Read committed data only, waiting for writes that preceded this request. */
    snapshot(): Promise<{
        papers: readonly Paper[];
        libraryRoot: string;
        version: 1;
        revision: number;
        starred: Record<string, string>;
    }>;
    /** Idempotent selection; requests name catalog ids, never supply filesystem paths. */
    select(id: string, selected: boolean): Promise<LibraryState>;
}
/** Load the independently verified catalog; malformed records fail at startup. */
export declare function loadCatalog(path: string): Promise<Paper[]>;
export {};
