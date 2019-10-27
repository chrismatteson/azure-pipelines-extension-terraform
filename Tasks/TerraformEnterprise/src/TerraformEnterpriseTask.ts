import path = require("path");
import fs = require("fs");
import os = require("os");

import { injectable } from "inversify";
import { TerraformApi } from "./TerraformApi";
import { TaskOptions } from './TaskOptions';

@injectable()
export class TerraformEnterpriseTask {

    constructor(
        private terraformapi : TerraformApi,
        private options: TaskOptions)
    {
        
    }

    public async run() {
        console.log(this.options.command);
        switch(this.options.command) {
            case "workspace":
                switch(this.options.workspacecommand) {
                    case "create":
                        console.log('create');
                        var method = 'post';
                        var endpoint = '/workspaces';
                        var payload = this.workspacePayload();
                        break;
                    case "update":
                        var method = 'patch';
                        var endpoint = '/workspaces/' + this.options.workspace;
                        var payload = this.workspacePayload();
                        break;
                    case "delete":
                        var method = 'delete';
                        var endpoint = '/workspaces/' + this.options.workspace;
                        var payload = this.workspacePayload();
                        break;
                    default:
                        throw new Error("Invalid workspace command");
                }

                console.log('workspace');
                console.log('payload');
                var url = "/organizations/" + this.options.organization + endpoint;
                console.log(url);
                await this.terraformapi.call(url, method, JSON.stringify(payload));
                break;
            case "queuePlan":
                console.log('queuePlan');
                const runconfigversion = this.options.runconfigversion;
                const runisdestroy = this.options.runisdestroy;
                const runmessage = this.options.runmessage;
                var url = '/runs';
                var workspacelookupurl = "/organizations/" + this.options.organization + "/workspaces/" + this.options.workspace;
                var method = 'post';
                var attributes:any = {};
                var relationshipsworkspacedata:any = {};
                var relationshipsworkspace:any = {};
                var relationshipsconfigversiondata:any = {};
                var relationshipsconfigversion:any = {};
                var relationships:any = {};
                var payload:any = {};
                console.log("Calling workspace lookup");
                var workspaceId = await this.terraformapi.idLookup(workspacelookupurl)
                console.log(workspaceId);
                console.log('build relationships');
                relationshipsworkspacedata["id"] = workspaceId;
                relationshipsworkspace["data"] = relationshipsworkspacedata;
                relationships["workspace"] = relationshipsworkspace;
                if ( runconfigversion ) {
                    relationshipsconfigversiondata["id"] = runconfigversion;
                    relationshipsconfigversion["data"] = relationshipsconfigversiondata;
                    relationships["configuration-version"] = relationshipsconfigversion;
                }
                console.log(relationships);
                if ( runisdestroy === true ) {
                    attributes["is-destroy"] = runisdestroy
                }
                if ( runmessage ) {
                    attributes["message"] = runmessage
                }
                console.log(attributes);
                payload["attributes"] = attributes;
                payload["relationships"] = relationships;
                console.log(payload);
                await this.terraformapi.call(url, method, JSON.stringify(payload));
                break;
            case "confirmApply":
                console.log('confirmApply');
                await this.terraformapi.call("url", "get");
                break;
            case "confirmOverride":
                await this.terraformapi.call("url", "get");
                break;
            case "destroy":
                await this.terraformapi.call("url", "get");
                break;
            default:
                throw new Error("Invalid command");
        }
    }

    private workspacePayload() {
        const sourcename = 'Created by Azure DevOps Pipeline Extension for Terraform Enterprise';
        const sourceurl = 'https://github.com/hashicorp/azure-pipelines-extension-terraform';

        const workspace = this.options.workspace;
        const autoapply = this.options.workspaceautoapply;
        const description = this.options.workspacedescription;
        const filetriggersenabled = this.options.workspacefiletriggersenabled;
        const queueallruns = this.options.workspacequeueallruns;
        const speculativeenabled = this.options.workspacespeculativeenabled;
        const terraformversion = this.options.workspaceterraformversion;
        const triggerprefixes = this.options.workspacetriggerprefixes;
        const workingdirectory = this.options.workspaceworkingdirectory;
        const vcsrepo = this.options.workspacevcsrepo;
        const vcsrepotokenid = this.options.vcsrepooauthtokenid;
        const vcsrepobranch = this.options.vcsrepobranch;
        const vcsrepoingresssubmodules = this.options.vcsrepoingresssubmodules;
        const vcsrepoidentifier = this.options.vcsrepoidentifier;

        var args:any = {}
        
        args["name"] = workspace;
        args["source-name"] = sourcename;
        args["source-url"] = sourceurl;        
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
        if ( autoapply === true ) {
            args["auto-apply"] = autoapply
        }
        if ( description ) {
            args["description"] = description
        }
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
        if ( filetriggersenabled === false ) {
            args["file-triggers-enabled"] = filetriggersenabled
        }
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
        if ( queueallruns === true ) {
            args["queue-all-runs"] = queueallruns
        }
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
        if ( speculativeenabled === false ) {
            args["speculative-enabled"] = speculativeenabled
        }
        if ( terraformversion ) {
            args["terraform-version"] = terraformversion
        }
        // this.getDelimintedInput seems to return an empty array for undefined, so we are checking for an array with data inside.
        if ( triggerprefixes != undefined && triggerprefixes.length > 0 ) {
            args["trigger-prefixes"] = triggerprefixes
        }
        if ( workingdirectory ) {
            args["working-directory"] = workingdirectory
        }
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
        if ( vcsrepo === true ) {
            var vcsrepoPayload:any = {}
            if ( vcsrepotokenid ) {
                vcsrepoPayload["oauth-token-id"] = vcsrepotokenid
            }
            if ( vcsrepobranch ) {
                vcsrepoPayload["branch"] = vcsrepobranch
            }
        // this.getBoolInput seems to return false for undefined, so we are setting this to only run if the non-default value is set.
            if ( vcsrepoingresssubmodules === true ) {
                vcsrepoPayload["ingress-submodules"] = vcsrepoingresssubmodules
            }
            if ( vcsrepoidentifier ) {
                vcsrepoPayload["identifier"] = vcsrepoidentifier
            }
            args["vcs-repo"] = vcsrepoPayload;
        }
        console.log(args);
        var attributesPayload:any = {}
        console.log("created empty variable")
        attributesPayload["attributes"] = args
        console.log(attributesPayload);
        var payload:any = {}
        payload["data"] = attributesPayload;
        console.log(payload);

        return payload;
    }
}
