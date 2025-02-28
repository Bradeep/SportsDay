import React, { useEffect, useState } from "react";

import SelectedEvents from "./SelectedEvents";
import Events from "./EventCard";

import Dropdown from "../../components/Dropdown";
import Drawer from "../../components/Drawer";

import { filterSelectedCategoryEvents } from "./helper";
import icon from "../../assets/icons/athletics.svg";

import "./styles.scss";
import Loader from "components/Loader";

const EVENT_CATEGORY = [
  "All Categories",
  "Unisex",
  "Men",
  "Women",
  "Kids"
];

export interface EventsInterface {
  id: number;
  event_name: string;
  event_category: string;
  is_available: boolean;
  price: number;
  size: string;
  start_time: string;
  end_time: string;
}

const Rentee = () => {
  const [events, setEvents] = useState<Array<EventsInterface>>([]);
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<
    Array<EventsInterface>
  >([]);
  const [selectedEvents, setSelectedEvents] = useState<Array<EventsInterface>>(
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("data.json");
        const resData = await res?.json();
        setEvents(resData);
        setSelectedCategoryEvents(resData);
      } catch (e) {
        console.log("Api failure");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onCategoryChange = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
    const categoryEvents = filterSelectedCategoryEvents(events, selectedValue);
    setSelectedCategoryEvents(categoryEvents);
  };

  const onClick = (idx: number, id: number, isSelectedEvent: boolean) => {
    if (!isSelectedEvent) {
      setSelectedEvents((prev) => {
        const selected = [...prev];
        selected.push(selectedCategoryEvents[idx]);
        return selected;
      });
    } else {
      setSelectedEvents((prev) => {
        const selected = prev.filter((el: EventsInterface) => el.id !== id);
        return selected;
      });
    }
  };

  return (
    <>
      <div className="app_container">
        <div className="app_title_bar">
          <div className="app_title">RENTAL CLOTHES</div>
          <div className="app_title_CTA">
            <Dropdown
              dataPoints={EVENT_CATEGORY}
              onItemSelect={(data) => {
                onCategoryChange(data.selectedValue);
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
        {!isLoading ? (
          <div>
            <Events
              events={selectedCategoryEvents}
              selectedEvents={selectedEvents}
              onClick={onClick}
              selectedCategory={selectedCategory}
            />
          </div>
        ) : (
          <Loader />
        )}
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
    </>
  );
};

export default Rentee;
