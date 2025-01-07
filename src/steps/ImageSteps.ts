import { expect } from "@playwright/test";
import { ApiPath } from "../constants/APIPath";
import { FileType } from "../constants/FileType";
import CommonSteps from "./CommonSteps";

export default class ImageSteps extends CommonSteps {
  imageLinkRegex =
    /https:\/\/assessement\.onrender\.com\/images\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}.(png|jpg|jpeg|svg|tiff|gif)/;

  public async uploadAnImage(file: string) {
    this.response = await this.sendPost(
      ApiPath.IMAGE_ENDPOINT,
      file,
      FileType.IMAGE
    );
    return this.response;
  }

  public async uploadWithoutImage() {
    this.response = await this.sendPostWithoutFile(ApiPath.IMAGE_ENDPOINT);
    return this.response;
  }

  public async getImage(imageLink: string) {
    this.response = await this.sendGetWithoutBaseURL(imageLink);
    return this.response;
  }

  public verifyTheImageIsRightFormat(url: string) {
    expect(url).toMatch(this.imageLinkRegex);
  }
}
