import { expect, APIRequestContext } from "@playwright/test";
import { ApiPath } from "../constants/APIPath";
import { FileType } from "../constants/FileType";
import CommonSteps from "./CommonSteps";

export default class ZipSteps extends CommonSteps {
    request1: APIRequestContext;

    public async uploadAZipFile(file:any) {
        this.response = await this.sendPost(ApiPath.ZIP_ENDPOINT, file, FileType.ZIP);
        return this.response;
    }

    public async getTheResponseImageList() {
        const body = JSON.parse(await this.response.text());
        return body.images;
    }

    public async validateNoDuplicateImageLink(imageLinkList: any) {
        const uniqueImageLinks = new Set(imageLinkList);
        if (uniqueImageLinks.size !== imageLinkList.length) {
            throw new Error("Duplicate image links found in the list");
        }
    }

    public async validateNumberOfImageLink(imageLinkList:any,numberOfImageFile:number) {
        expect(imageLinkList.length).toBe(numberOfImageFile)
    }
}