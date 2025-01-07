import path from "path";
import { Path } from "../src/constants/Path";
import { Utilities } from "../src/util/Utilities";
import { test } from "../src/fixtures/PageSetup";
import { FileName } from "../src/constants/FileName";

let response: any;
test.describe("User Story 2| Uploading my pictures multiple times", () => {
  const invalidImageList = new Utilities().getFilesFromFolder(Path.OTHERS, []);

  /* TC_01_zip: Allow an Anonymous user to upload an zip file containing multiple valid image files
        Pre-condition:
        - Valid zip file in test data folder
        Steps:
        1.Send the POST request to upload the zip file
        2. Verify the status code
        3. Verify the response body
        4. Click randomly on the list of image links
        Expect:
        2. Status code should be 200
        3. Body response should have:
        - "images" field
        - Correct number of permanent link for valid image files, respectively with the number of image files in the uploaded file
        - No duplicated image links in the response
        4. Image link should be worked and display correct image
    */
  test(`TC_01_zip: Allow an Anonymous user to upload an zip file containing multiple valid image files @TC_01_zip`, async ({
    zipSteps,
    imageSteps,
    commonSteps,
  }) => {
    const zipFilePath = path.resolve(Path.ZIPS, FileName.ZIP_FILE);
    let imageLinkList: any;
    await test.step(`Send the POST request to upload the zip file`, async () => {
      response = await zipSteps.uploadAZipFile(zipFilePath);
    });

    await test.step("Validate the 200 status code", async () => {
      commonSteps.validateStatusCode(200, response);
    });

    await test.step(`Validate the body response should contains "images" field`, async () => {
      await commonSteps.validateExistProperty("images", response);
    });

    await test.step(`Validate the number of image link`, async () => {
      imageLinkList = await zipSteps.getTheResponseImageList();
      await zipSteps.validateNumberOfImageLink(imageLinkList, 4);
    });

    await test.step(`Validate no duplicate image link`, async () => {
      zipSteps.validateNoDuplicateImageLink(imageLinkList);
    });

    await test.step(`Verify each of image link in image list should be accessible`, async () => {
      for (var i = 0; i < imageLinkList.length; i++) {
        response = await imageSteps.getImage(imageLinkList[i]);
        imageSteps.validateStatusCode(200, response);
      }
    });
  });

  /* TC_03_zip: Do not allow an Anonymous user to upload an empty zip file
    Pre-condition:
    - Empty zip file in test folder
    Steps:
    1.Send the POST request to upload the zip file
    3. Verify the status code 
    4. Verify the body response
    Expect:
    3. Status code should be 400
    4. the body response should have "err" field with the message: "no image found in zip file"
    */
  test(`TC_03_zip: Do not allow an Anonymous user to upload an empty zip file @TC_03_zip`, async ({
    zipSteps,
    commonSteps,
  }) => {
    const zipFilePath = path.resolve(Path.ZIPS, FileName.EMPTY_ZIP_FILE);
    await test.step(`Send the request to upload the image`, async () => {
      response = await zipSteps.uploadAZipFile(zipFilePath);
    });

    await test.step("Validate the 400 status code", async () => {
      commonSteps.validateStatusCode(400, response);
    });

    await test.step("Validate the response should have 'err' field with the message: no image found in zip file", async () => {
      commonSteps.validateResponseBodyProperty(
        response,
        "err",
        "no image found in zip file"
      );
    });
  });

  /* TC_05_zip: Do not allow an Anonymous user to upload invalid zip file format
    Pre-condition:
    - Invalid zip file in test data folder
    Steps:
    1.Send the POST request with any non zip file
    2. Verify the status code 
    3. Verify the body response
    Expect:
    2. Status code should be 400
    3. The body response should have "err" field with the message: "File isn't a zip"
    */
  for (const file of invalidImageList) {
    test(`TC_05_zip: Do not allow an Anonymous user to upload invalid zip file format :${file} @TC_05_zip`, async ({
      zipSteps,
      commonSteps,
    }) => {
      await test.step(`Send the POST request to upload the zip file`, async () => {
        response = await zipSteps.uploadAZipFile(file);
      });

      await test.step("Validate the 400 status code", async () => {
        commonSteps.validateStatusCode(400, response);
      });

      await test.step("Validate the response should have 'err' field with the message: File isn't a zip", async () => {
        commonSteps.validateResponseBodyProperty(
          response,
          "err",
          "File isn't a zip"
        );
      });
    });
  }
});
