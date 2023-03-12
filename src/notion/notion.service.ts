import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import {
  COLUMN_API_CREDIT,
  COLUMN_COIN,
  COLUMN_METHOD,
  COLUMN_TYPE,
} from "./notion.constant";
import { ApiMethodRow } from "./notion.interface";

dotenv.config();

export class NotionService {
  private notion;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
  }

  async findDatabaseColumn() {
    /** 데이터베이스 프로퍼티 조회 **/
    const database = await this.notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID as string,
    });
    console.log(database);
  }

  async extracFromNotion(): Promise<ApiMethodRow[]> {
    const response = await this.notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
    });

    const results = response.results;

    const apiMethodsList: ApiMethodRow[] = [];
    for await (const row of results) {
      const page = await this.notion.pages.retrieve({
        page_id: row.id,
      });

      const typeProp = await this.notion.pages.properties.retrieve({
        page_id: page.id,
        property_id: COLUMN_TYPE,
      });
      const coinProp = await this.notion.pages.properties.retrieve({
        page_id: page.id,
        property_id: COLUMN_COIN,
      });
      const methodProp = await this.notion.pages.properties.retrieve({
        page_id: page.id,
        property_id: COLUMN_METHOD,
      });
      const apiCreditProp = await this.notion.pages.properties.retrieve({
        page_id: page.id,
        property_id: COLUMN_API_CREDIT,
      });

      apiMethodsList.push({
        type: (typeProp as any).select.name,
        coin: (coinProp as any).select.name,
        method: (methodProp as any).results[0].title.plain_text,
        ac: (apiCreditProp as any).number,
      });
    }

    return apiMethodsList;
  }
}
