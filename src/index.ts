import { ConvertorService } from "./convertor/convertor.service";
import { NotionService } from "./notion/notion.service";

async function main() {
  const notionService = new NotionService();
  const convertorService = new ConvertorService();

  const apiMethodList = await notionService.extracFromNotion();

  const markdownTable = convertorService.convertToMarkdown(apiMethodList);
  console.log(markdownTable);
  const seederTable = convertorService.convertToSeeder(apiMethodList);
  console.log(seederTable);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
