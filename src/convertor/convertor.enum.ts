import { Enum, EnumType } from "ts-jenum";

@Enum("code")
export class ConvertType extends EnumType<ConvertType>() {
  static readonly MARKDOWN = new ConvertType(
    "MARKDOWN",
    "마크다운으로 변환합니다."
  );
  static readonly SEEDER = new ConvertType("SEEDER", "시더파일로 변환합니다.");

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
}
