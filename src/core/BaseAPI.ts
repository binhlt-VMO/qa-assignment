import { APIRequestContext, APIResponse } from "@playwright/test";
import fs from "fs";
import { ApiPath } from "../constants/APIPath";

export class BaseAPI {
  url: string;
  request: APIRequestContext;
  response: APIResponse;

  constructor(request?: APIRequestContext) {
    if (request) this.request = request;
  }

  // Post method
  protected async sendPost(
    urlPath: string,
    file: string,
    fileType: string
  ): Promise<APIResponse> {
    const image = fs.readFileSync(file);
    const response = await this.request.post(ApiPath.BASE_URL + urlPath, {
      headers: {},
      multipart: {
        file: {
          name: file,
          mimeType: fileType,
          buffer: image,
        },
      },
    });
    console.log(
      `Response POST | ${urlPath}: `,
      JSON.stringify(response.body())
    );
    this.response = response;
    return response;
  }

  // Post method without file path
  protected async sendPostWithoutFile(urlPath: string): Promise<APIResponse> {
    const response = await this.request.post(ApiPath.BASE_URL + urlPath, {
      headers: {},
    });
    console.log(
      `Response POST | ${urlPath}: `,
      JSON.stringify(response.body())
    );
    this.response = response;
    return response;
  }

  //Get method
  protected async sendGet(urlPath: string): Promise<APIResponse> {
    const response = await this.request.get(ApiPath.BASE_URL + urlPath);
    console.log(
      `Response GET | ${ApiPath.BASE_URL} ${urlPath}: `,
      JSON.stringify(response.body())
    );
    this.response = response;
    return response;
  }

  protected async sendGetWithoutBaseURL(urlPath: string): Promise<APIResponse> {
    const response = await this.request.get(urlPath);
    console.log(`Response GET | ${urlPath}: `, JSON.stringify(response.body()));
    this.response = response;
    return response;
  }
}
