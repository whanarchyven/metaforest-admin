export function parseISODuration(isoDuration: string) {
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const matches = isoDuration.match(regex);

  if (!matches) {
    throw new Error('Invalid ISO8601 duration format');
  }

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  let result = [];

  if (hours > 0) {
    result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  if (seconds > 0) {
    result.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  }

  return result.join(' ');
}
