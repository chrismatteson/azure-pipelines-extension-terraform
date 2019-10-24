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
    readonly token : string | undefined;
    readonly skipcertcheck : string | undefined;

    // Workspace 
    readonly workspace : string | undefined;
    readonly workspacecommand : string | undefined;
    readonly workspaceautoapply : boolean | undefined;
    readonly workspacedescription : string | undefined;
    readonly workspacefiletriggersenabled : boolean | undefined;
    readonly workspacequeueallruns : boolean | undefined;
    readonly workspacespeculativeenabled : boolean | undefined;
    readonly workspaceterraformversion : string | undefined;
    readonly workspacetriggerprefixes : string[] | undefined;
    readonly workspaceworkingdirectory : string | undefined;
    readonly workspacevcsrepo : boolean | undefined;

    // Workspace VCS Repo
    readonly vcsrepooauthtokenid : string | undefined;
    readonly vcsrepobranch : string | undefined;
    readonly vcsrepoingresssubmodules : boolean | undefined;
    readonly vcsrepoidentifier : string | undefined;

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
        this.workspacecommand = task.getInput("workspacecommand");
        this.workspaceautoapply = task.getBoolInput("workspaceautoapply");
        this.workspacedescription = task.getInput("workspacedescription");
        this.workspacefiletriggersenabled = task.getBoolInput("workspacefiletriggersenabled");
        this.workspacequeueallruns = task.getBoolInput("workspacequeueallruns");
        this.workspacespeculativeenabled = task.getBoolInput("workspacespeculativeenabled");
        this.workspaceterraformversion = task.getInput("workspaceterraformversion");
        this.workspacetriggerprefixes = task.getDelimitedInput("workspacetriggerprefixs",",");
        this.workspaceworkingdirectory = task.getInput("workspaceworkingdirectory");
        this.workspacevcsrepo = task.getBoolInput("workspacevcsrepo");
        this.vcsrepooauthtokenid = task.getInput("vcsrepooauthtokenid");
        this.vcsrepoingresssubmodules = task.getBoolInput("vcsrepoingresssubmodules");
        this.vcsrepoidentifier = task.getInput("vcsrepoidentifier");
    }
}
