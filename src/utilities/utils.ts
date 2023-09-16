export const toStandardTime = (dateTime: string) => {
  const date = new Date(dateTime);

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formattedDate = (dateTime: string) => {
  const today = new Date(dateTime);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1 + "";
  let dd = today.getDate() + "";

  if (today.getDate() < 10) dd = "0" + dd;
  if (today.getMonth() + 1 < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  return formattedDate;
};

interface EventsInterface {
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}

export const isOverLapping = (
  selectedEvents: Array<EventsInterface>,
  currEvent: EventsInterface
) => {
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
