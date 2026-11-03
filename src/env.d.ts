/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Serves pages from the URL hash, for hosts that serve one file. */
  readonly VITE_HASH_ROUTES?: string;
  /** Overrides the 3D model location. Accepts a data: URL. */
  readonly VITE_BOLT_MODEL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
