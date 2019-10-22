import task = require('azure-pipelines-task-lib/task');
import { injectable } from "inversify";
import { TaskOptions } from "./TaskOptions";
const request = require('request');

@injectable()
export class TerraformApi {

    public constructor(
        private options: TaskOptions
    ) {

    }

    public async call(url: string) {
        await this.callApi(url, false, "GET", this.options.token, "")
    }


    private callApi(url: string, skipCertCheck: boolean, method: string, token: string | undefined, body: string): string {
        const metadata = body;
        const requestUrl = url;
        console.log(requestUrl)
        const accessToken = token;
        console.log(accessToken)

        try {
            var request = require('request-prom');
            request({ uri: requestUrl, headers: { 'Authorization': "Bearer " + accessToken, 'Content-Type': 'application/vnd.api+json' }}).then(function(response: Response) {
                console.log(response.body);
            });
        }
        catch (error) {
            task.debug("Unable to update Terraform Api, Error: " + error);
        }

        var tool = 'success';
        console.log(escape!)
        return tool;
    }
}
