export const toStandardTime = (dateTime) => {
  const date = new Date(dateTime);

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formattedDate = (dateTime) => {
  const today = new Date(dateTime);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  return formattedDate;
};

export const isOverLapping = (selectedEvents, currEvent) => {
  var overlapping = selectedEvents.some((event) => {
    if (
      new Date(currEvent.start_time) >= new Date(event.start_time) &&
      new Date(currEvent.start_time) < new Date(event.end_time)
    )
      return true;
    else if (
      new Date(currEvent.end_time) > new Date(event.start_time) &&
      new Date(currEvent.end_time) <= new Date(event.end_time)
    )
      return true;
    else if (
      new Date(currEvent.start_time) <= new Date(event.start_time) &&
      new Date(currEvent.end_time) >= new Date(event.end_time)
    )
      return true;

    return false;
  });

  return overlapping;
};
