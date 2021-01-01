import { EventEmitter } from "events";
import { existsSync, fstat, stat } from "fs";
import { promisify } from "util";
import { PluginMetadata } from "./PluginMetadata";
import { join, resolve } from 'path';
import globalDirectories from "global-dirs";

const statAsync = promisify(stat);

export abstract class Plugin extends EventEmitter {
    protected _loaded: boolean = false;
    protected _continue: boolean = false;

    abstract onLoad(...args: any[]): Promise<boolean>; // return true if load successful
    abstract onUnload(...args: any[]): Promise<boolean>; // return true if unload successful
    abstract onCombatEntered(...args: any[]): Promise<void>; // returns a new state for the combat sequence
    abstract onCombatExited(player: any, enemy: any, instance: any): Promise<void>;
    abstract onTick(): Promise<void>;

    constructor(public readonly metadata: PluginMetadata) {
        super();

        this.checkInstallation = this.checkInstallation.bind(this);

        if (!!this.onLoad)
            this.onLoad = this.onLoad.bind(this);

        if (!!this.onUnload)
            this.onUnload = this.onUnload.bind(this);

        if (!!this.onCombatEntered)
            this.onCombatEntered = this.onCombatEntered.bind(this);
        
        if (!!this.onCombatExited)
            this.onCombatExited = this.onCombatExited.bind(this);

        if (!!this.onTick)
            this.onTick = this.onTick.bind(this);

        this.checkInstallation();

        this.on('tick', () => this.__internal_tick__);
        this.on('done', (...args: any[]) => Plugin.call(this, 'onUnload', ...args));
    }

    checkInstallation(): void {

    }

    static call(ref: Plugin, fn: string, ...args: any[]): void {
        if (!!(ref as any)[fn]) {
            ref.__internal_call__(fn, ...args)
                .catch(e => {
                    console.error('[dungeoneer] warning-severe: uncaught exception in plugin');
                    console.error(e);
                    ref.stop();
                });
        }
    }

    async __internal_call__(fn: string, ...args: any[]): Promise<void> {
        try {
            (this as any)[fn](...args);
        } catch (e) {
            throw e;
        }
    }

    async start(): Promise<void> {
        this._continue = true;
    }

    async stop(): Promise<void> {
        this._continue = false;
        console.log(`[dungeoneer] system: shutting down plugin ${this.metadata.package}:${this.metadata.version}`);
    }

    async load(): Promise<void> {
        if (!!!statAsync(join(globalDirectories.npm.packages, 'dungeoneer'))) {
            throw new RuntimeException('[dungeoneer] warning-severe: dungeoneer is not installed globally, so you cannot load plugins (with confidence).')
        }
        const pluginFolderStats = await statAsync(join(
            globalDirectories.npm.packages,
            'dungeoneer',
            this.metadata.package,
            this.metadata.main
        ));
    }

    async __internal_tick__(): Promise<void> {
        if (this._continue) {
            Plugin.call(this, 'onTick');
        } else {
            this.emit('stop');
        }
    }

}

export class RuntimeException extends Error {}
export class Signal extends Error {}
