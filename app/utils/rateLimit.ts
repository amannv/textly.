import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "./getClientIp";

const requests = new Map<string, { count: number; firstRequest: number }>();

export const rateLimit = (
  req: NextRequest,
  limit: number,
  interval: number,
) => {
  const ip = getClientIp(req);

  const now = Date.now();

  const record = requests.get(ip);

  if (!record) {
    requests.set(ip, {
      count: 1,
      firstRequest: now,
    });
    return null;
  }

  if (now - record.firstRequest > interval) {
    record.count = 1;
    record.firstRequest = now;
    return null;
  }

  if (record.count >= limit) {
    return NextResponse.json(
      { message: "Rate limit exceeded. You can make 5 requests per minute." },
      { status: 429 },
    );
  }

  record.count++;
  return null;
};
