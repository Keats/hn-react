// Very dumb way of showing a simple X minutes ago
// Not super accurate, to replace with a tested library later on
export function timeAgo(timestamp: number): string {
  const current = Math.floor(new Date().getTime() / 1000);
  const diff = current - timestamp;

  if (diff < (60 * 60)) {
    const minutes = Math.ceil(diff / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  if (diff < (60 * 60 * 24)) {
    const hours = Math.ceil(diff / 60 / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diff < (60 * 60 * 24 * 365)) {
    const days = Math.ceil(diff / 60 / 60 / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const years = Math.ceil(diff / 60 / 60 / 24 / 365);
  return `${years} day${years > 1 ? "s" : ""} ago`;
}
