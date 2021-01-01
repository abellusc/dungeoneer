export interface PluginMetadata {
    package: string;
    version: string;
    title: string;
    description: string;
    author: string | string[];
    main: string;

    dungeoneer?: string[]; // plugin supported on these platforms
    warnings?: Warning[];
    tags?: string[];
}

/**
 * PluginTags 
 */

export enum Warning {
    CONTAINS_ADULT_CONTENT,
    CONTAINS_TRIGGERING_CONTENT,
    CONTAINS_ONLINE_CONTENT, // TODO: make this import the packages for http
}
