import { BlackBerryCsvImporter } from "./blackberry-csv-importer";

export class TestBlackBerryCsvImporter extends BlackBerryCsvImporter {
  parseCsv(data: string, withHeader: boolean): any[] {
    return [
      {
        grouping: "login",
        fav: "1",
        name: "fake Login",
        extra: "fake notes",
        url: "http://fake.com",
        password: "fakepass",
        username: "fakeuser",
      },
    ];
  }
}
