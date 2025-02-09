import { openai } from "@/openai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const processUserRequestsValidator = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      originalName: z.string(),
    })
  ),
  language: z.string(),
  allergies: z.string(),
  dietaryPreferences: z.string(),
});

export const POST = async (req: NextRequest) => {
  const rawData = await req.json();
  const result = processUserRequestsValidator.safeParse(rawData);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const { items, allergies, dietaryPreferences, language } = result.data;

  const prompt = `
    Given the following food items, dietary preferences, and allergies, please analyze each item and provide:
    1. A translation to ${language} if the name is not in ${language}
    2. Whether the item is suitable based on the dietary preferences and allergies

    Dietary Preferences: ${dietaryPreferences}
    Allergies: ${allergies}

    Items:
    ${JSON.stringify(items, null, 2)}

    Please respond in the following JSON format:
    {
      "items": [
        {
          "id": "item_id",
          "originalName": "original name",
          "translatedName": "translated name if needed",
          "isTranslated": boolean,
          "isSuitable": boolean
        }
      ]
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that analyzes food items for dietary restrictions and provides translations. Always respond in valid JSON format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || "");

    return NextResponse.json(response);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process food items" },
      { status: 500 }
    );
  }
};
