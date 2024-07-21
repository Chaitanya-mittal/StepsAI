export function formatDate(datetimeStr) {
  const datetimeObj = new Date(datetimeStr);

  // Extract the date and time
  const date = datetimeObj.toISOString().split("T")[0];
  const time = datetimeObj.toISOString().split("T")[1].split(".")[0];

  return { date, time };
}
