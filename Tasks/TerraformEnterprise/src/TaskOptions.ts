import task = require('azure-pipelines-task-lib/task');
import { injectable } from "inversify";

/**
 * Strong-type accessor for Task configuration
 */
@injectable()
export class TaskOptions {

    // Basic
    readonly command : string | undefined;
    readonly url : string | undefined;
    readonly organization : string | undefined;
    readonly workspace : string | undefined;
    readonly token : string | undefined;
    readonly skipcertcheck : string | undefined;


    /**
     * Creates and loads a well-formed options object
     */
    constructor() {
        // This can be massively improved, it should be automatic
        this.command = task.getInput("command", true);
        this.url = task.getInput("url");
        this.organization = task.getInput("organization");
        this.workspace = task.getInput("workspace");
        this.token = task.getInput("token");
        this.skipcertcheck = task.getInput("skipcertcheck");
    }
}
