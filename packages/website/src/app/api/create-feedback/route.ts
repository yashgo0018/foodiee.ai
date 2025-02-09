import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createFeedbackValidator = z.object({
  feedback: z.string(),
  orderId: z.string(),
});

export const POST = async (req: NextRequest) => {
  const authToken =
    req.headers.get("x-api-key") || req.headers.get("X-API-KEY");

  const rawData = await req.json();
  console.log(rawData);
  const result = createFeedbackValidator.safeParse(rawData);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // TODO: check if the order exists for the current user

  // TODO: check if the feedback already exists

  // TODO: create feedback on bnb greenfield

  return NextResponse.json({ msg: "created feedback" });
};
