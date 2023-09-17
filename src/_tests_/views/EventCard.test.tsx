import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Events from "../../views/EventCard/index";
import { EventsInterface } from "../../views";

import { dummyData } from "_tests_/dummyData";

interface IProps {
  events?: Array<EventsInterface>;
  selectedEvents?: Array<EventsInterface>;
  selectedCategory?: string;
}

const mockButtonClick = jest.fn();

const selectedEvents = [
  {
    id: 4,
    event_name: "High Jump",
    event_category: "Athletics",
    start_time: "2022-12-17 13:00:00",
    end_time: "2022-12-17 14:00:00",
  },
  {
    id: 5,
    event_name: "Triple Jump",
    event_category: "Athletics",
    start_time: "2022-12-17 16:00:00",
    end_time: "2022-12-17 17:00:00",
  },
];

const MockEvents = (props: IProps) => {
  return (
    <Events
      onClick={mockButtonClick}
      events={dummyData}
      selectedEvents={selectedEvents}
      selectedCategory="All Categories"
      {...props}
    />
  );
};

describe("Events card Wrapper", () => {
  test("All event cards are rendered", () => {
    render(<MockEvents />);
    let event = screen.queryByText("Butterfly 100M");
    expect(event).toBeInTheDocument();
    event = screen.queryByText("Backstroke 100M");
    expect(event).toBeInTheDocument();
    event = screen.queryByText("Freestyle 400M");
    expect(event).toBeInTheDocument();
    event = screen.queryByText("High Jump");
    expect(event).toBeInTheDocument();
    event = screen.queryByText("Triple Jump");
    expect(event).toBeInTheDocument();
  });

  describe("Selected events", () => {
    test("Button should have Unselect text", () => {
      render(<MockEvents />);
      let event = screen.queryByTestId("events_4");
      expect(event).toHaveTextContent("UNSELECT");
    });
    test("Selected events Button should not have select text", () => {
      render(<MockEvents />);
      let event = screen.queryByTestId("events_4");
      expect(event).not.toHaveTextContent("/^SELECT$/");
    });
  });
  describe("onClick Interaction", () => {
    test("callback function should be called on valid events", () => {
      render(<MockEvents />);
      let event = screen.queryAllByText("UNSELECT")[0];
      fireEvent.click(event);
      expect(mockButtonClick).toBeCalled();
    });

    test("Callback function should not be called on overlapping events", () => {
      render(<MockEvents />);
      let button = screen.queryAllByText("SELECT")[0];
      fireEvent.click(button);

      expect(mockButtonClick).not.toBeCalled();
    });
  });
  describe("Tooltip contents", () => {
    test("When timeslot overlapped", () => {
      render(<MockEvents />);
      let event = screen.queryAllByText(
        "Another event has been chosen on this timeslot"
      )[0];
      expect(event).toBeInTheDocument();
    });
    test("When count is equals to 3", () => {
      const selected = [
        ...selectedEvents,
        {
          id: 3,
          event_name: "Freestyle 400M",
          event_category: "Swimming",
          start_time: "2022-12-17 15:00:00",
          end_time: "2022-12-17 16:00:00",
        },
      ];
      render(<MockEvents selectedEvents={selected} />);
      let event = screen.queryAllByText("Can select only upto 3 events")[0];
      expect(event).toBeInTheDocument();
    });
  });
  describe("Prev and Next button", () => {
    test("onClick of Next Button", async () => {
      render(<MockEvents />);
      let event = screen.queryByText("Cricket U19");
      expect(event).not.toBeInTheDocument();

      let button = screen.getByText("NEXT >");
      fireEvent.click(button);

      await waitFor(() => {
        const el = screen.queryByText("Cricket U19");
        expect(el).toBeInTheDocument();
      });
    });

    test("Next Button should be disabled on last page", async () => {
      render(<MockEvents />);

      let button = screen.getByText("NEXT >");
      fireEvent.click(button);

      await waitFor(() => {
        const el = screen.queryByText("Cricket U19");
        expect(el).toBeInTheDocument();
      });

      button = screen.getByText("NEXT >");
      fireEvent.click(button);

      await waitFor(() => {
        const el = screen.queryByText("Cricket U19");
        expect(el).toBeInTheDocument();
      });
    });

    test("onClick of Prev Button", async () => {
      render(<MockEvents />);

      let button = screen.getByText("NEXT >");
      fireEvent.click(button);

      let event = screen.queryByText("Butterfly 100M");
      expect(event).not.toBeInTheDocument();

      button = screen.getByText("< PREV");
      fireEvent.click(button);

      await waitFor(() => {
        const el = screen.queryByText("Butterfly 100M");
        expect(el).toBeInTheDocument();
      });
    });

    test("Prev Button should be disabled on first page", async () => {
      render(<MockEvents />);

      const el = screen.queryByText("Butterfly 100M");
      expect(el).toBeInTheDocument();

      let button = screen.getByText("< PREV");
      fireEvent.click(button);

      await waitFor(() => {
        const el = screen.queryByText("Butterfly 100M");
        expect(el).toBeInTheDocument();
      });
    });
  });
  test("Fallback rendered when there are no data", () => {
    render(<MockEvents events={[]} selectedEvents={[]} />);
    let fallback = screen.getByText("No Events to be displayed");
    expect(fallback).toBeInTheDocument();
  });
});
