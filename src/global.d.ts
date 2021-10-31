/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL: string
    readonly NEXT_PUBLIC_CLIENT_ID: string
    readonly NEXT_PUBLIC_WORDPRESS_API_PATH: string
  }
}
