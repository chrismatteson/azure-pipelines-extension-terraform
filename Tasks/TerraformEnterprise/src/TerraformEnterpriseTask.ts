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
                console.log('workspace');
                var url = this.options.url + "organizations/" + this.options.organization + "/workspaces/" + this.options.workspace;
                console.log(url);
                await this.terraformapi.call(url);
                break;
            case "queuePlan":
                console.log('queuePlan');
                await this.terraformapi.call("validate");
                break;
            case "confirmApply":
                console.log('confirmApply');
                await this.terraformapi.call("plan");
                break;
            case "confirmOverride":
                await this.terraformapi.call("apply");
                break;
            case "destroy":
                await this.terraformapi.call("destroy");
                break;
            default:
                throw new Error("Invalid command");
        }
    }
}
