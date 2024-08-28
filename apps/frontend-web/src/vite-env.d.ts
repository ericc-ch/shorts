/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_GATEWAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
