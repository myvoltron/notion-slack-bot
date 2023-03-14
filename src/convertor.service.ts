import { ApiMethodRow } from "./notion/notion.interface";

export class ConvertorService {
  convertToMarkdown(apiMethodArray: ApiMethodRow[]) {
    if (!apiMethodArray.length) {
      return "";
    }

    const headers = Object.keys(apiMethodArray[0]);
    const separator = headers.map(() => "---");

    const rows = [headers, separator];

    apiMethodArray.forEach((item) => {
      const values = Object.values(item);
      rows.push(values);
    });

    return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  }

  convertToSeeder() {}
}
