import { expect } from "@playwright/test";
import { BaseAPI } from "../core/BaseAPI";

export default class CommonSteps extends BaseAPI {
  public validateStatusCode(statusCode: number, response: any) {
    expect(response.status()).toBe(statusCode);
  }

  public async validateExistProperty(property: string, response: any) {
    const bodyJson = JSON.parse(await response.text());
    expect(bodyJson).toHaveProperty(property);
  }

  public validateHeaderExists(response: Response, headerName: string) {
    expect(response.headers).toHaveProperty(headerName);
  }

  public validateHeader(
    response: Response,
    headerName: string,
    expectedValue: string
  ) {
    expect(response.headers[headerName]).toBe(expectedValue);
  }

  public validateResponseBodyHasProperty(
    response: Response,
    propertyName: string
  ) {
    expect(response.body).toHaveProperty(propertyName);
  }

  public validateResponseBodyProperty(
    response: Response,
    propertyName: string,
    expectedValue: any
  ) {
    expect(response.body?.[propertyName]).toEqual(expectedValue);
  }

  public validateResponseBodyPropertyToBeDefined(
    response: Response,
    propertyName: string
  ) {
    expect(response.body?.[propertyName]).toBeDefined;
  }

  public getValueProperty(
    response: Response,
    propertyName: string
  ): Promise<string> {
    return response.body?.[propertyName];
  }

  public static getPathDataFile(dataType: string, fileName: string): string {
    return `data\\${dataType}\\${fileName}`;
  }
}
