declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OSS_ACCESS_KEY_ID: string;
      OSS_ACCESS_KEY_SECRET: string;
    }
  }
}

export {};
