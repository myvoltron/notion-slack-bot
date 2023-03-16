import { App } from "@slack/bolt";
import dotenv from "dotenv";
import { ConvertType } from "./convertor/convertor.enum";
import { ConvertorService } from "./convertor/convertor.service";
import { NotionService } from "./notion/notion.service";

dotenv.config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
const notionService = new NotionService();
const convertorService = new ConvertorService();

app.command("/convert", async ({ command, ack, say }) => {
  await ack();

  const requester = command.user_name;
  const convertType = ConvertType.retrieveConvertType(command.text);

  const apiMethodList = await notionService.extracFromNotion();

  const converted = convertorService.convertApiMethodArray(
    apiMethodList,
    convertType
  );

  // 참고 - https://slack.dev/bolt-js/concepts#message-sending
  const message = `
  ${requester}님 요청 결과는 다음과 같습니다! 
  ${JSON.stringify(converted)}
  `;

  await say(message);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
