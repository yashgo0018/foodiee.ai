import OpenAI from "openai";
import { privateEnv } from "./private-config";

export const openai = new OpenAI({
  apiKey: privateEnv.openaiApiKey,
});
