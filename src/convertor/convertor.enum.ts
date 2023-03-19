import { PlainTextElement } from "@slack/bolt";
import { Enum, EnumType } from "ts-jenum";

@Enum("code")
export class ConvertType extends EnumType<ConvertType>() {
  static readonly MARKDOWN = new ConvertType("MARKDOWN", "markdown");
  static readonly SEEDER = new ConvertType("SEEDER", "seeder");

  private constructor(readonly code: string, readonly description: string) {
    super();
  }

  static retrieveConvertType(text: string): ConvertType {
    if (text === "markdown") {
      return this.MARKDOWN;
    } else if (text === "seeder") {
      return this.SEEDER;
    } else {
      return this.MARKDOWN;
    }
  }

  makeContentsByType(contents: any): PlainTextElement {
    return {
      type: "plain_text",
      text: this.code === "MARKDOWN" ? contents : JSON.stringify(contents),
    };
  }
}
