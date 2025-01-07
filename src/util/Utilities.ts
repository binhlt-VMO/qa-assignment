import fs from "fs";
import AdmZip from "adm-zip";

export const Utilities = class Utilities {
  constructor() {}

  readZipArchive(filepath: string): string[] {
    var files_: Array<string> = [];
    try {
      const zip = new AdmZip(filepath);

      for (const zipEntry of zip.getEntries()) {
        files_.push(zipEntry.name);
      }
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
    }
    return files_;
  }

  // Get the list of data from 1 folder
  getFilesFromFolder(dir, files_): string[] {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = dir + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        this.getFilesFromFolder(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }

  getRandomItemFromArrayList(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};
