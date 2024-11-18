import { TestBlackBerryCsvImporter } from "../src/importers/blackberry-csv-importer-fake";
import { ImportResult } from "../src/models/import-result";

describe("BlackBerryCsvImporter with Fake (using subclass)", () => {
  let importerFake: TestBlackBerryCsvImporter;

  beforeEach(() => {
    importerFake = new TestBlackBerryCsvImporter();
  });

  it("should parse fake CSV data and populate ciphers correctly", async () => {
    const mockCsvData = "fake csv content";
    const result: ImportResult = await importerFake.parse(mockCsvData);

    expect(result.success).toBe(true);
    expect(result.ciphers).toHaveLength(1);

    const cipher = result.ciphers[0];
    expect(cipher.favorite).toBe(true);
    expect(cipher.name).toBe("fake Login");
    expect(cipher.notes).toBe("fake notes");
    expect(cipher.login.uris[0].uri).toBe("http://fake.com");
    expect(cipher.login.password).toBe("fakepass");
    expect(cipher.login.username).toBe("fakeuser");
  });
});
