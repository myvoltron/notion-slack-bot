import { App } from "@slack/bolt";
import dotenv from "dotenv";
import { ConvertType } from "./convertor/convertor.enum";
import { ConvertorService } from "./convertor/convertor.service";
import { NotionService } from "./notion/notion.service";
import { SlackService } from "./slack/slack.service";

dotenv.config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
const notionService = new NotionService();
const convertorService = new ConvertorService();
const slackService = new SlackService();

app.command("/convert", async ({ command, ack, say }) => {
  await ack();

  const requesterId = command.user_id;
  const convertType = ConvertType.retrieveConvertType(command.text);

  const apiMethodList = await notionService.extracFromNotion();

  const converted = convertorService.convertApiMethodArray(
    apiMethodList,
    convertType
  );

  await say(slackService.makeMessage(requesterId, converted, convertType));
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
