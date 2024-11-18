import { CipherType } from "@bitwarden/common/vault/enums";

import { SaferPassCsvImporter } from "../src/importers/saferpass-csv-importer";
import { ImportResult } from "../src/models/import-result";

import { validData , incompleteData , invalidData , missingUrlData } from "./test-data/saferpass-csv/saferpass-example.csv";

describe("SaferPassCsvImporter", () => {
  let importer: SaferPassCsvImporter;

  beforeEach(() => {
    importer = new SaferPassCsvImporter();
  });

  it("should parse valid login data and return a successful result", async () => {
    const result: ImportResult = await importer.parse(validData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.Login);
    expect(cipher.name).toBe("ggl.com");
    expect(cipher.login.username).toBe("user@gmail.com");
    expect(cipher.login.password).toBe("Password123");
    expect(cipher.login.uris[0].uri).toBe("https://ggl.com");
    expect(cipher.notes).toBe("This is a note");
  });

  it("should handle missing fields", async () => {
    const result: ImportResult = await importer.parse(incompleteData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.Login);
    expect(cipher.name).toBe("ggl.com");
    expect(cipher.login.username).toBe(null);
    expect(cipher.login.password).toBe(null);
    expect(cipher.login.uris[0].uri).toBe("https://ggl.com");
    expect(cipher.notes).toBe(null);
  });

  it("should return unsuccessful result for invalid CSV format", async () => {
    const result: ImportResult = await importer.parse(invalidData);

    expect(result.success).toBe(false);
    expect(result.ciphers.length).toBe(0);
  });

  it("should set name to '--' if URL is missing", async () => {
    const result: ImportResult = await importer.parse(missingUrlData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.Login);
    expect(cipher.name).toBe("--");
    expect(cipher.login.username).toBe("user@ggl.com");
    expect(cipher.login.password).toBe("Password123");
    expect(cipher.notes).toBe("Missing URL");
  });
});
