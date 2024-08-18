const getRequiredEnv = (key: string) => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Environment variable ${key} is not set`);

  return value;
};

export const GEMINI_API_KEY = getRequiredEnv("GEMINI_API_KEY");

export const TTS_BASE_URL = getRequiredEnv("TTS_BASE_URL");
export const TTS_API_KEY = getRequiredEnv("TTS_API_KEY");

export const STT_BASE_URL = getRequiredEnv("STT_BASE_URL");
export const STT_USERNAME = getRequiredEnv("STT_USERNAME");
export const STT_PASSWORD = getRequiredEnv("STT_PASSWORD");
