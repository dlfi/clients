import { CipherType } from "@bitwarden/common/vault/enums";

import { TrueKeyCsvImporter } from "../src/importers/truekey-csv-importer";
import { ImportResult } from "../src/models/import-result";

import { validData , ccardData , extraData , mockData } from "./test-data/truekey-csv/truekey-example.csv";

describe("TrueKeyCsvImporter", () => {
  let importer: TrueKeyCsvImporter;

  beforeEach(() => {
    importer = new TrueKeyCsvImporter();
  });

  it("should parse valid login data and return a successful result", async () => {
    const result: ImportResult = await importer.parse(validData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.Login);
    expect(cipher.name).toBe("Filip");
    expect(cipher.login.username).toBe("user@gmail.com");
    expect(cipher.login.password).toBe("Password123");
    expect(cipher.login.uris[0].uri).toBe("https://ggl.com");
  });

  it("should parse credit card data and populate card-specific fields", async () => {
    const result: ImportResult = await importer.parse(ccardData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.Card);
    expect(cipher.card.cardholderName).toBe("Filip");
    expect(cipher.card.number).toBe("4111111111111111");
    expect(cipher.card.expMonth).toBe("12");
    expect(cipher.card.expYear).toBe("2030");
  });

  it("should parse secure notes and process extra fields", async () => {
    const result: ImportResult = await importer.parse(extraData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.type).toBe(CipherType.SecureNote);
    expect(cipher.name).toBe("Test Secure Note");
    expect(cipher.notes).toBe("Document Content");
    expect(cipher.fields.length).toBe(2);
    expect(cipher.fields[0].name).toBe("extraField1");
    expect(cipher.fields[0].value).toBe("Extra1");
    expect(cipher.fields[1].name).toBe("extraField2");
    expect(cipher.fields[1].value).toBe("Extra2");
  });

  it("should use mock to test CSV parsing logic", async () => {
    jest.spyOn(importer as any, "parseCsv").mockReturnValue(mockData);

    const csvData = "mock input that won't be parsed";
    const result: ImportResult = await importer.parse(csvData);

    expect(result.success).toBe(true);
    expect(result.ciphers.length).toBe(1);
    const cipher = result.ciphers[0];
    expect(cipher.name).toBe("mocklogin");
    expect(cipher.login.username).toBe("mockuser@gmail.com");
    expect(cipher.login.password).toBe("mockpass");
  });
});
