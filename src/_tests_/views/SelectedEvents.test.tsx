import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectedEvents from "../../views/SelectedEvents";
import { EventsInterface } from "views";

interface IProps {
  selectedEvents?: Array<EventsInterface>;
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
    event_category: "Athletic",
    start_time: "2022-12-17 16:00:00",
    end_time: "2022-12-17 17:00:00",
  },
];

const MockEvents = (props: IProps) => {
  return (
    <SelectedEvents
      onClickRemove={mockButtonClick}
      selectedEvents={selectedEvents}
      {...props}
    />
  );
};

describe("Selected Events card Wrapper", () => {
  describe("Rendered with data", () => {
    test("Selected events title", () => {
      render(<MockEvents />);
      const el = screen.queryByText("Selected Events");
      expect(el).toBeInTheDocument();
    });
    test("All contents are present in the card", () => {
      render(<MockEvents />);
      const el = screen.queryByTestId("selectedEvents-4");
      expect(el).toHaveTextContent("High Jump");
      expect(el).toHaveTextContent("Athletics");
      expect(el).toHaveTextContent("17/12/2022");
      expect(el).toHaveTextContent("1:00 PM - 2:00 PM");
    });

    test("onClear function", () => {
      render(<MockEvents />);
      const el = screen.getByTestId("selectedEvents_close-4");
      fireEvent.click(el);
      expect(mockButtonClick).toBeCalled();
    });

    test("Fallback should not be rendered", () => {
      render(<MockEvents />);
      const el = screen.queryByTestId("No Events Selected");
      expect(el).not.toBeInTheDocument();
    });
  });

  describe("if there is no data", () => {
    test("Selected events title should not be rendered", () => {
      render(<MockEvents selectedEvents={[]} />);
      const el = screen.queryByText("Selected Events");
      expect(el).not.toBeInTheDocument();
    });
    test("rendering of fallback", () => {
      render(<MockEvents selectedEvents={[]} />);
      const el = screen.getByText("No Events Selected");
      expect(el).toBeInTheDocument();
    });
  });
});
