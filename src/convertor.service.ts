import { ApiMethodRow } from "./notion/notion.interface";

export class ConvertorService {
  /** 배열을 markdown 테이블로 바꿉니다. **/
  convertToMarkdown(apiMethodArray: ApiMethodRow[]) {
    if (!apiMethodArray.length) {
      return "";
    }

    const headers = Object.keys(apiMethodArray[0]);
    const separator = headers.map(() => "---");

    /** column과 구분선 먼저 시작합니다. **/
    const rows = [headers, separator];

    apiMethodArray.forEach((item) => {
      const values = Object.values(item);
      rows.push(values);
    });

    return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  }

  convertToSeeder() {}
}
