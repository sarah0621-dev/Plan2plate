import OpenAI from "openai";

import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Meal = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
};

export async function POST(req: Request) {
  try {
    const { budget, days, cuisine } = await req.json();

    const numBudget = Number(budget);
    const numDays = Number(days);
    const arrCuisine: string[] = Array.isArray(cuisine) ? cuisine : [];

    if (!Number.isFinite(numBudget) || numBudget < 0) {
      return NextResponse.json({ message: "Invalid budget" }, { status: 400 });
    }
    if (!Number.isFinite(numDays) || numDays < 1) {
      return NextResponse.json({ message: "Invalid days" }, { status: 400 });
    }
    if (arrCuisine.length === 0) {
      return NextResponse.json(
        { message: "At least one cuisine required" },
        { status: 400 }
      );
    }

    const prompt = `
      You must return the dinner meal plan **as a JSON object only**.  
      Do not output any introduction, explanation, commentary, or code fences.  
      The response must strictly follow the exact structure below:
      - Return exactly ${numDays} meals in total.
      - Based on 2 people
      - Total Budget is less than ${numBudget}
      - Cuisine stlye :${arrCuisine.join(",")}
      - Included Cuisine name and simple ingredients list, estimatedCost
      - estimatedCost Type is only Number (Be Consistent based on 1 person portion or Total portions)
      - Example Format :
      [
        {
        "day" : "Monday",
        "meal": "Bulgogi with Rice",
        "ingredients" : ["beef", "Soysauce","Sugar","Onions","Rice"],
        "estimateCost: 4.5
        },
      ]
        `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "you are nutritionist." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    if (!content) {
      return NextResponse.json(
        { message: "No response from OpenAI" },
        { status: 502 }
      );
    }

    const cleaned = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let mealPlan: Meal[];
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) {
        return NextResponse.json(
          { message: "OpenAI returned non-array JSON" },
          { status: 502 }
        );
      }
      mealPlan = parsed;
    } catch (e) {
      console.error("JSON Parse Error:", e, content);
      return NextResponse.json(
        { message: "Invalid JSON from OpenAI" },
        { status: 502 }
      );
    }

    return NextResponse.json({ mealPlan }, { status: 200 });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("API Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
