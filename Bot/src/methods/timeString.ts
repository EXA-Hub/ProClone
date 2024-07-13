export default function parseDuration(duration: string) {
  const regex =
    /^(\d+)(s|sec|secs|seconds|m|min|mins|minutes|h|hour|hours|d|day|days|w|week|weeks|mo|month|months|y|year|years)$/i;
  const match = duration.match(regex);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
    case "sec":
    case "secs":
    case "seconds":
      return value * 1000;
    case "m":
    case "min":
    case "mins":
    case "minutes":
      return value * 1000 * 60;
    case "h":
    case "hour":
    case "hours":
      return value * 1000 * 60 * 60;
    case "d":
    case "day":
    case "days":
      return value * 1000 * 60 * 60 * 24;
    case "w":
    case "week":
    case "weeks":
      return value * 1000 * 60 * 60 * 24 * 7;
    case "mo":
    case "month":
    case "months":
      return value * 1000 * 60 * 60 * 24 * 30;
    case "y":
    case "year":
    case "years":
      return value * 1000 * 60 * 60 * 24 * 365;
    default:
      return null;
  }
}
