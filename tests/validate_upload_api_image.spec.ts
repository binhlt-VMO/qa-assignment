import { Path } from "../src/constants/Path";
import { Utilities } from "../src/util/Utilities";
import { test } from "../src/fixtures/PageSetup";

let response: any;
test.describe("User Story 1| Store and use my pictures", () => {
  const imageList = new Utilities().getFilesFromFolder(Path.IMAGES, []);
  const invalidImageList = new Utilities().getFilesFromFolder(Path.OTHERS, []);

  /* TC_01_image: Allow an Anonymous user to upload the valid picture files
        Pre-condition:
        - All valid image files in test data folder
        Steps:
        1. Send the POST  request to upload each valid image files
        2. Verify the status code 
        3. Verify the body response
        4. Click on the image link
        Expect:
        2. Status code should be 200
        3. Body response should have:
            - "image" field
            - Permanent link for valid image files
        4. Image link should be worked and display correct image

    */
  for (const file of imageList) {
    test(`TC_01_image: Allow an Anonymous user to upload the valid picture files : ${file} @TC_01_image`, async ({
      imageSteps,
      commonSteps,
    }) => {
      let imageLink: any;
      await test.step(`Send the request to upload the image`, async () => {
        response = await imageSteps.uploadAnImage(file);
      });

      await test.step("Validate the 200 status code", async () => {
        commonSteps.validateStatusCode(200, response);
      });

      await test.step(`Validate the body response should contains "image" field`, async () => {
        await commonSteps.validateExistProperty("image", response);
        imageLink = JSON.parse(await response.text()).image;
      });

      await test.step(`Validate the image permanent link format`, async () => {
        imageSteps.verifyTheImageIsRightFormat(imageLink);
      });

      await test.step(`Get uploaded image`, async () => {
        response = await imageSteps.getImage(imageLink);
      });

      await test.step(`Validate the image permanent link should be accessible`, async () => {
        imageSteps.validateStatusCode(200, response);
      });
    });
  }

  /* TC_02_image: Do not allow an Anonymous user to upload invalid image format
        Pre-condition:
        - All .pdf,.csv,.svg,.tiff files in test data
        Steps:
        1. Send the POST request to upload each invalid image files
        2. Verify the status code 
        3. Verify the body response
        Expect:
        2. Status code is 400
        3. the body response should have "err" field with the message: "File isn' an image"
    */
  for (const file of invalidImageList) {
    test(`TC_02_image: Do not allow an Anonymous user to upload invalid image format: ${file} @TC_02_image`, async ({
      imageSteps,
      commonSteps,
    }) => {
      await test.step(`Send the request to upload the image`, async () => {
        response = await imageSteps.uploadAnImage(file);
      });

      await test.step("Validate the 400 status code", async () => {
        commonSteps.validateStatusCode(400, response);
      });

      await test.step("Validate the response should have 'err' field with the message: File isn't an image", async () => {
        commonSteps.validateResponseBodyProperty(
          response,
          "err",
          "File isn't an image"
        );
      });
    });
  }

  /* TC_04_image: Do not allow an Anonymous user to upload without an image file
        Pre-condition:
        Steps:
        1. Send the POST  request with no uploaded file
        2. Verify the status code 
        3. Verify the body response
        Expect:
        2. Status code is 400
        3. The body response should have "err" field with the message: "No file provided in the request"
    */
  test(`TC_04_image: Do not allow an Anonymous user to upload without an image file @TC_04_image`, async ({
    imageSteps,
    commonSteps,
  }) => {
    await test.step(`Send the request to upload the image`, async () => {
      response = await imageSteps.uploadWithoutImage();
    });

    await test.step("Validate the 400 status code", async () => {
      commonSteps.validateStatusCode(400, response);
    });

    await test.step("Validate the response should have 'err' field with the message: No file provided in the request", async () => {
      commonSteps.validateResponseBodyProperty(
        response,
        "err",
        "No file provided in the request"
      );
    });
  });
});
