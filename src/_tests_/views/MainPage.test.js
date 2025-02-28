import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SportsDay from "../../views/rentee";

import { dummyData as mockData } from "_tests_/dummyData";

global.fetch = jest.fn();

const MockComponent = (props) => {
  return <SportsDay />;
};

describe("Main Page", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    global.fetch.mockReset();
  });

  test("Rendering of title", () => {
    render(<MockComponent />);
    const title = screen.queryByText("SPORTS EXTRAVAGANZA");
    expect(title).toBeInTheDocument();
  });

  test("Dropdown rendered", () => {
    render(<MockComponent />);
    const dropdown = screen.queryByText("All Categories");
    expect(dropdown).toBeInTheDocument();
  });

  test("Events are displayed", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Backstroke 100M")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("High Jump")).toBeInTheDocument();
    });
  });

  test("Only selected categories should be displayed", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });

    fireEvent.click(screen.queryByText("All Categories"));

    fireEvent.click(screen.queryAllByText("Swimming")[0]);

    expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    expect(screen.queryByText("High Jump")).not.toBeInTheDocument();
  });

  test("Number of selected events displayed on selecting events", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });

    const select = screen.getAllByRole("button")[0];
    fireEvent.click(select);

    let notifications = screen.getByTestId("icon_notification");
    expect(notifications).toHaveTextContent("1");
  });

  test("Selected events should be reduced on unselecting events", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });

    let select = screen.getAllByRole("button")[0];
    fireEvent.click(select);

    await waitFor(() => {
      select = screen.getByText("UNSELECT");
    });

    fireEvent.click(select);

    let notifications = screen.getByTestId("icon_notification");
    expect(notifications).toHaveTextContent("0");
  });

  test("Selected events menu should be closed on default", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });

    const styledElement = screen.getByTestId("drawer-container");

    expect(styledElement.classList.contains("drawer_close")).toBe(true);
  });

  test("Open selected events menu on notification click", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(screen.getByText("Butterfly 100M")).toBeInTheDocument();
    });

    let notifications = screen.getByTestId("icon_notification");
    fireEvent.click(notifications);

    const styledElement = screen.getByTestId("drawer-container");

    expect(styledElement.classList.contains("drawer_open")).toBe(true);
  });

  test("Selected events should be closed on clicking outside the drawer", () => {
    render(<MockComponent />);
    let drawerElement = screen.getByTestId("drawer-container");

    let notifications = screen.getByTestId("icon_notification");
    fireEvent.click(notifications);

    expect(drawerElement.classList.contains("drawer_open")).toBe(true);

    fireEvent.mouseDown(document.body);
    expect(drawerElement.classList.contains("drawer_close")).toBe(true);
  });
});
