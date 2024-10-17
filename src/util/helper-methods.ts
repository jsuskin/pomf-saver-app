import type { Timestamp } from "./types";

export function timestampToDate(timestamp: Timestamp) {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds).toString();
  return date;
}

export function formatTimestamp(timestamp: any) {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds);

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year}, ${hours}:${minutes}`;
}

export function timestampToMMDDYYHHMM(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000);

  // Helper function to pad single digit numbers with leading zeros
  const pad = (num: number) => String(num).padStart(2, "0");

  // Format the Date object into MM/DD/YY, HH:MM format
  const formattedDate = `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${String(
    date.getFullYear()
  ).slice(-2)}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return formattedDate;
}