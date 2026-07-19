const APP_TIME_ZONE = "Asia/Kolkata";

function dateFromOffset(minutesAgo = 0): Date {
  return new Date(Date.now() - minutesAgo * 60_000);
}

export function formatControlCenterDateTime(date = new Date()): string {
  const datePart = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: APP_TIME_ZONE,
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: APP_TIME_ZONE,
    timeZoneName: "short",
  }).format(date);

  return `${datePart} | ${timePart.toUpperCase()}`;
}

export function formatClock(minutesAgo = 0): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: APP_TIME_ZONE,
  }).format(dateFromOffset(minutesAgo)).toUpperCase();
}

export function formatRelativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo === 1) return "1 min ago";
  return `${minutesAgo} min ago`;
}

export function formatIsoDate(daysFromNow = 0): string {
  const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: APP_TIME_ZONE,
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function formatReportDateTime(minutesAgo = 0): string {
  const date = dateFromOffset(minutesAgo);
  const datePart = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: APP_TIME_ZONE,
  }).format(date);
  const timePart = formatClock(minutesAgo);

  return `${datePart} ${timePart}`;
}
