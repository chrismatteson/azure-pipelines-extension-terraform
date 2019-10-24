import task = require('azure-pipelines-task-lib/task');
import { injectable } from "inversify";
import { TaskOptions } from "./TaskOptions";
const axios = require('axios');

@injectable()
export class TerraformApi {

    public constructor(
        private options: TaskOptions
    ) {
    }

    public async call(url: string, method: string, body: string = "") {
        const skipcertcheck = this.options.skipcertcheck;
        const baseUrl = this.options.url
        const requestUrl = url;
        const metadata = body;
        console.log(body);
        const requestMethod = method;
        console.log(requestUrl);
        const accessToken = this.options.token;
        console.log(accessToken);

        try {
            await axios({
                method: requestMethod,
                baseURL: baseUrl,
                url: requestUrl,
                data: metadata,
                headers: {
                  'Authorization': 'Bearer ' + accessToken,
                  'Content-Type': 'application/vnd.api+json'
                }
          }).then((response: Response) => {
              console.log(response.statusText);
          });
        }
        catch (error) {
            throw new Error("Unable to update Terraform Api, Error: " + error);
        }
    }


    public async idLookup(url: string) {
        const skipcertcheck = this.options.skipcertcheck;
        const baseUrl = this.options.url
        const requestUrl = url;
        console.log(requestUrl);
        const accessToken = this.options.token;
        console.log(accessToken);
        interface ServerResponse {
          data: ServerDataWrapper
        }
        interface ServerDataWrapper {
          data: ServerData
        }
        interface ServerData {
          id: string
        }

        try {
          await axios({
            method: 'get',
            baseURL: baseUrl,
            url: requestUrl,
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/vnd.api+json'
            }
          }).then((response: ServerResponse) => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.data.id);
            return response.data.data.id;
          });
        }
        catch (error) {
            throw new Error("Unable to update Terraform Api, Error: " + error);
        }
    }
}
