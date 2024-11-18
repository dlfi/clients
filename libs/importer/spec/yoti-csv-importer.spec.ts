import { YotiCsvImporter } from "../src/importers/yoti-csv-importer";
import { ImportResult } from "../src/models/import-result";

import { validData , multipleValidData } from "./test-data/yoti-csv/yoti-example.csv";

describe("YotiCsvImporter", () => {
  let importer: YotiCsvImporter;

  beforeEach(() => {
    importer = new YotiCsvImporter();
  });

  it("should return a failed result for null or empty input", async () => {
    const result = await importer.parse("");
    expect(result.success).toBe(false);
    expect(result.ciphers.length).toBe(0);
  });

  it("should parse a single valid row and return a successful result", async () => {
    const result: ImportResult = await importer.parse(validData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);

    const cipher = result.ciphers[0];
    expect(cipher.name).toBe("test");
    expect(cipher.login.username).toBe("testuser");
    expect(cipher.login.password).toBe("testpass");
    expect(cipher.login.uris[0].uri).toBe("https://ggl.com");
  });

  it("should handle multiple valid rows", async () => {
    const result: ImportResult = await importer.parse(multipleValidData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(2);

    expect(result.ciphers[0].name).toBe("Entry1");
    expect(result.ciphers[0].login.username).toBe("user1");
    expect(result.ciphers[0].login.password).toBe("pass1");
    expect(result.ciphers[0].login.uris[0].uri).toBe("https://ggl1.com");

    expect(result.ciphers[1].name).toBe("Entry2");
    expect(result.ciphers[1].login.username).toBe("user2");
    expect(result.ciphers[1].login.password).toBe("pass2");
    expect(result.ciphers[1].login.uris[0].uri).toBe("https://ggl2.com");
  });
});
