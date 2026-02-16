import cronstrue from "cronstrue";

export interface CronExpression {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function generateCronDescription(expression: string): string {
  try {
    return cronstrue.toString(expression);
  } catch {
    throw new Error("Invalid cron expression");
  }
}

export function parseCronExpression(expression: string): CronExpression {
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 5) {
    throw new Error("Invalid cron expression. Expected 5 parts.");
  }

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

export interface CronPart {
  value: string;
  description: string;
}

export function describeCronPart(part: string, type: "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek"): string {
  if (part === "*") {
    return getWildcardDescription(type);
  }

  if (part.includes("/")) {
    const [range, step] = part.split("/");
    const stepNum = parseInt(step);
    if (range === "*") {
      return `every ${stepNum} ${getUnitName(type, stepNum)}`;
    }
    return `every ${stepNum} ${getUnitName(type, stepNum)} starting from ${range}`;
  }

  if (part.includes("-")) {
    const [start, end] = part.split("-");
    return `${start} through ${end} ${getUnitName(type, 1)}`;
  }

  if (part.includes(",")) {
    return part;
  }

  return part;
}

function getWildcardDescription(type: string): string {
  switch (type) {
    case "minute":
      return "every minute";
    case "hour":
      return "every hour";
    case "dayOfMonth":
      return "every day";
    case "month":
      return "every month";
    case "dayOfWeek":
      return "every day of the week";
    default:
      return "every";
  }
}

function getUnitName(type: string, num: number): string {
  const unitNames: Record<string, Record<number, string>> = {
    minute: { 1: "minute(s)", 5: "minutes", 10: "minutes", 15: "minutes", 30: "minutes" },
    hour: { 1: "hour(s)", 2: "hours", 6: "hours", 12: "hours", 24: "hours" },
    dayOfMonth: { 1: "day(s)", 7: "days", 14: "days", 30: "days" },
    month: { 1: "month(s)", 3: "months", 6: "months" },
    dayOfWeek: { 1: "day(s)", 7: "days" },
  };

  return unitNames[type]?.[num] || `${num}`;
}

export function getNextRuns(expression: string, count: number = 5): Date[] {
  const parts = parseCronExpression(expression);
  const dates: Date[] = [];
  const now = new Date();
  let current = new Date(now);
  current.setSeconds(0, 0);

  const maxIterations = 10000;
  let iterations = 0;

  while (dates.length < count && iterations < maxIterations) {
    current = new Date(current.getTime() + 60000);

    if (matchesCronPart(current.getMinutes(), parts.minute) &&
        matchesCronPart(current.getHours(), parts.hour) &&
        matchesCronPart(current.getDate(), parts.dayOfMonth) &&
        matchesCronPart(current.getMonth() + 1, parts.month) &&
        matchesCronPart(current.getDay(), parts.dayOfWeek)) {
      dates.push(new Date(current));
    }

    iterations++;
  }

  return dates;
}

function matchesCronPart(value: number, part: string): boolean {
  if (part === "*") return true;

  if (part.includes(",")) {
    return part.split(",").some(p => matchesCronPart(value, p));
  }

  if (part.includes("-")) {
    const [start, end] = part.split("-").map(Number);
    return value >= start && value <= end;
  }

  if (part.includes("/")) {
    const [, step] = part.split("/").map(Number);
    return value % step === 0;
  }

  return value === parseInt(part);
}

export const cronPresets = [
  { name: "Every minute", expression: "* * * * *" },
  { name: "Every hour", expression: "0 * * * *" },
  { name: "Every day at midnight", expression: "0 0 * * *" },
  { name: "Every day at noon", expression: "0 12 * * *" },
  { name: "Every Monday", expression: "0 0 * * 1" },
  { name: "Every weekday", expression: "0 0 * * 1-5" },
  { name: "Every weekend", expression: "0 0 * * 0,6" },
  { name: "First day of month", expression: "0 0 1 * *" },
  { name: "Every 5 minutes", expression: "*/5 * * * *" },
  { name: "Every 15 minutes", expression: "*/15 * * * *" },
  { name: "Every 30 minutes", expression: "*/30 * * * *" },
];
