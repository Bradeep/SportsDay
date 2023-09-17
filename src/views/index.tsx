import React, { useEffect, useState } from "react";

import SelectedEvents from "./SelectedEvents";
import Events from "./EventCard";

import Dropdown from "../components/Dropdown";
import Drawer from "../components/Drawer";

import ErrorBoundary from "../components/ErrorBoundary";

import icon from "../assets/icons/athletics.svg";

import "./styles.scss";

const EVENT_CATEGORY = [
  "All Categories",
  "Swimming",
  "Athletics",
  "Boxing",
  "Cricket",
  "Football",
];

export interface EventsInterface {
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}

const SportsDay = () => {
  const [data, setData] = useState<Array<EventsInterface>>([]);
  const [selectedEvents, setSelectedEvents] = useState<Array<EventsInterface>>(
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("data.json");
      const resData = await res?.json();
      setData(resData);
    };

    fetchData();
  }, []);

  const onClick = (idx: number, id: number, isSelectedEvent: boolean) => {
    if (!isSelectedEvent) {
      setSelectedEvents((prev) => {
        const events = [...prev];
        events.push(data[idx]);
        return events;
      });
    } else {
      setSelectedEvents((prev) => {
        const events = prev.filter((el: EventsInterface) => el.id !== id);
        return events;
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="app_container">
        <div className="app_title_bar">
          <div className="app_title">SPORTS EXTRAVAGANZA</div>
          <div className="app_title_CTA">
            <Dropdown
              dataPoints={EVENT_CATEGORY}
              onItemSelect={(data) => {
                setSelectedCategory(data.selectedValue);
              }}
            />

            <div
              className="app_title_icon_wrapper"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <img
                src={icon}
                className={"app_title_icon"}
                height={32}
                width={32}
                alt="sports_icon"
              />
              <div
                className="icon_notification"
                data-testid="icon_notification"
              >
                {selectedEvents.length}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Events
            events={data}
            selectedEvents={selectedEvents}
            onClick={onClick}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        classnames="drawer_customClass"
      >
        <SelectedEvents
          selectedEvents={selectedEvents}
          onClickRemove={onClick}
        />
      </Drawer>
    </ErrorBoundary>
  );
};

export default SportsDay;
