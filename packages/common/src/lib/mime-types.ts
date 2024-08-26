export const MIME_TYPES = {
  ARCHIVE: {
    GZIP: "application/gzip",
    RAR: "application/x-rar-compressed",
    SEVEN_ZIP: "application/x-7z-compressed",
    TAR: "application/x-tar",
    ZIP: "application/zip",
  },

  AUDIO: {
    AAC: "audio/aac",
    FLAC: "audio/flac",
    M4A: "audio/m4a",
    MIDI: "audio/midi",
    MP3: "audio/mpeg",
    OGG: "audio/ogg",
    WAV: "audio/wav",
  },

  DOCUMENT: {
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ODP: "application/vnd.oasis.opendocument.presentation",
    ODS: "application/vnd.oasis.opendocument.spreadsheet",
    ODT: "application/vnd.oasis.opendocument.text",
    PDF: "application/pdf",
    PPT: "application/vnd.ms-powerpoint",
    PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    RTF: "application/rtf",
    TXT: "text/plain",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },

  FONT: {
    EOT: "application/vnd.ms-fontobject",
    OTF: "font/otf",
    TTF: "font/ttf",
    WOFF: "font/woff",
    WOFF2: "font/woff2",
  },

  IMAGE: {
    BMP: "image/bmp",
    GIF: "image/gif",
    ICO: "image/x-icon",
    JPEG: "image/jpeg",
    PNG: "image/png",
    SVG: "image/svg+xml",
    TIFF: "image/tiff",
    WEBP: "image/webp",
  },

  MISC: {
    CSV: "text/csv",
    ICS: "text/calendar",
    MARKDOWN: "text/markdown",
    SQL: "application/sql",
    VCF: "text/vcard",
    YAML: "application/x-yaml",
  },

  VIDEO: {
    AVI: "video/x-msvideo",
    FLV: "video/x-flv",
    MKV: "video/x-matroska",
    MOV: "video/quicktime",
    MP4: "video/mp4",
    OGV: "video/ogg",
    WEBM: "video/webm",
  },

  WEB: {
    CSS: "text/css",
    HTML: "text/html",
    JS: "application/javascript",
    JSON: "application/json",
    WASM: "application/wasm",
    XML: "application/xml",
  },
} as const;
