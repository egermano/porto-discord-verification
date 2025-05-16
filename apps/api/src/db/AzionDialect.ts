import * as kysely from "kysely";
import fetchWithErrorHandling from "./fetch";

export interface AzionDriverConfig {
  url: string;
  token: string;
  init?: RequestInit;
}

export class AzionDialect implements kysely.Dialect {
  config: AzionDriverConfig;

  constructor(config: AzionDriverConfig) {
    this.config = config;
  }
  createDriver(): kysely.Driver {
    return new AzionDriver(this.config);
  }
  createAdapter(): kysely.DialectAdapter {
    return new kysely.SqliteAdapter();
  }
  createIntrospector(db: kysely.Kysely<any>): kysely.DatabaseIntrospector {
    return new kysely.SqliteIntrospector(db);
  }
  createQueryCompiler(): kysely.QueryCompiler {
    return new kysely.SqliteQueryCompiler();
  }
}

export class AzionDriver {
  config: AzionDriverConfig;

  constructor(config: AzionDriverConfig) {
    this.config = config;
  }
  async init() {}
  async acquireConnection() {
    return new FetchConnection(this.config);
  }
  async beginTransaction() {}
  async commitTransaction() {}
  async rollbackTransaction() {}
  async releaseConnection() {}
  async destroy() {}
}

class FetchConnection {
  config: AzionDriverConfig;

  constructor(config: AzionDriverConfig) {
    this.config = config;
  }

  async *streamQuery<R>(): AsyncIterableIterator<kysely.QueryResult<R>> {
    throw new Error("FetchConnection does not support streaming");
  }

  async executeQuery<R>(
    compiledQuery: kysely.CompiledQuery
  ): Promise<kysely.QueryResult<R>> {
    const params = [...compiledQuery.parameters];
    const request = {
      statements: [
        compiledQuery.sql.replace(
          /\?/g,
          (() => {
            return `'${params.shift()}'` || "?";
          })()
        ),
      ],
    };

    const url = `${this.config.url}`;
    const response = await fetchWithErrorHandling(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${this.config.token}`,
        },
        body: JSON.stringify(request),
        ...this.config.init,
      },
      true,
      true
    );

    return response.data[0].results;
  }
}
