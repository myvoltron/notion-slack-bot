import { SayArguments } from "@slack/bolt";
import { ConvertType } from "../convertor/convertor.enum";

export class SlackService {
  makeMessage(requesterId: string, contents: any, type: ConvertType) {
    const respond: SayArguments = {
      reply_broadcast: false,
      unfurl_links: true,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<@${requesterId}>님이 ${type.description} 변환을 요청하셨습니다.`,
          },
        },
        {
          type: "section",
          text: type.makeContentsByType(contents),
        },
      ],
    };

    return respond;
  }
}
