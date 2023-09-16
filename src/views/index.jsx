import React, { useEffect, useState } from "react";
import Events from "./EventCard";

import icon from "../assets/icons/athletics.svg";
import Drawer from "../components/Drawer";

import "./styles.scss";
import SelectedEvents from "./SelectedEvents";
import Dropdown from "../components/Dropdown";

const EVENT_CATEGORY = [
  "All Categories",
  "Swimming",
  "Athletics",
  "Boxing",
  "Cricket",
  "Football",
];

const SportsDay = () => {
  const [data, setData] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("data.json");
      const resData = await res?.json();
      for (var i = 0; i < resData?.length; i++) {
        resData[i].isSelected = false;
      }
      setData(resData);
    };

    fetchData();
  }, []);

  const onClick = (idx, id, isSelectedEvent, isOverLapping) => {
    if (!isSelectedEvent) {
      setSelectedEvents((prev) => {
        const events = [...prev];
        events.push(data[idx]);
        return events;
      });
    } else {
      setSelectedEvents((prev) => {
        const events = prev.filter((el) => el.id !== id);
        return events;
      });
    }
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[idx] = {
        ...updatedData[idx],
        isSelected: !updatedData[idx]["isSelected"],
      };

      return updatedData;
    });
  };

  return (
    <>
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
    </>
  );
};

export default SportsDay;
