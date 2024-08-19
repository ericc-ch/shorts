export const MIME_TYPES = {
  IMAGE: {
    PNG: "image/png",
    JPEG: "image/jpeg",
    GIF: "image/gif",
    WEBP: "image/webp",
    TIFF: "image/tiff",
    SVG: "image/svg+xml",
    ICO: "image/x-icon",
    BMP: "image/bmp",
  },

  AUDIO: {
    MP3: "audio/mpeg",
    WAV: "audio/wav",
    OGG: "audio/ogg",
    M4A: "audio/m4a",
    AAC: "audio/aac",
    FLAC: "audio/flac",
    MIDI: "audio/midi",
  },

  VIDEO: {
    MP4: "video/mp4",
    WEBM: "video/webm",
    OGV: "video/ogg",
    AVI: "video/x-msvideo",
    MOV: "video/quicktime",
    FLV: "video/x-flv",
    MKV: "video/x-matroska",
  },

  DOCUMENT: {
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    PPT: "application/vnd.ms-powerpoint",
    PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ODT: "application/vnd.oasis.opendocument.text",
    ODS: "application/vnd.oasis.opendocument.spreadsheet",
    ODP: "application/vnd.oasis.opendocument.presentation",
    RTF: "application/rtf",
    TXT: "text/plain",
  },

  ARCHIVE: {
    ZIP: "application/zip",
    RAR: "application/x-rar-compressed",
    TAR: "application/x-tar",
    GZIP: "application/gzip",
    SEVEN_ZIP: "application/x-7z-compressed",
  },

  WEB: {
    HTML: "text/html",
    CSS: "text/css",
    JS: "application/javascript",
    JSON: "application/json",
    XML: "application/xml",
    WASM: "application/wasm",
  },

  FONT: {
    TTF: "font/ttf",
    OTF: "font/otf",
    WOFF: "font/woff",
    WOFF2: "font/woff2",
    EOT: "application/vnd.ms-fontobject",
  },

  MISC: {
    CSV: "text/csv",
    MARKDOWN: "text/markdown",
    YAML: "application/x-yaml",
    SQL: "application/sql",
    VCF: "text/vcard",
    ICS: "text/calendar",
  },
} as const;
