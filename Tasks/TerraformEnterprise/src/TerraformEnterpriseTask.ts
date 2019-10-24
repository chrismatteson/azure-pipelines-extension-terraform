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
                        var method = 'post';
                        var endpoint = '/workspaces';
                        var payload = '{"data":{"attributes":{"name":"' + this.options.workspace + '"},"type":"workspaces"}}';
                        break;
                    case "update":
                        var method = 'patch';
                        var endpoint = '/workspaces/' + this.options.workspace;
                        var payload = JSON.stringify('{"data":{"attributes":{"name":' + this.options.workspace + '},"type":"workspaces"}}');
                        break;
                    case "delete":
                        var method = 'delete';
                        var endpoint = '/workspaces/' + this.options.workspace;
                        var payload = '{}';
                        break;
                    default:
                        throw new Error("Invalid workspace command");
                }

                console.log('workspace');
                var url = "/organizations/" + this.options.organization + endpoint;
                console.log(url);
                await this.terraformapi.call(url, method, payload);
                break;
            case "queuePlan":
                console.log('queuePlan');
                await this.terraformapi.call("url", "get");
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
    }
}
