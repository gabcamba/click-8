export function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const dateStr = date.toLocaleString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateStr}\n${timeStr}`;
}
