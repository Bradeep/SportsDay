import { EventsInterface } from "views/rentee";

export const filterSelectedCategoryEvents = (
  events: Array<EventsInterface>,
  category: string
) => {
  let selectedEvents = [];
  if (category === "All Categories") selectedEvents = events;
  else {
    selectedEvents = events.filter(
      (event) => event.event_category === category
    );
  }

  return selectedEvents;
};
