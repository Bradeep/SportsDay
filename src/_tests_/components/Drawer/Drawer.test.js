import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Drawer from "../../../components/Drawer";

const mockButtonClick = jest.fn();

const MockDrawer = (props) => {
  return (
    <Drawer onClose={mockButtonClick} {...props}>
      label text
    </Drawer>
  );
};

describe("Drawer", () => {
  test("Drawer is rendered", () => {
    render(<MockDrawer open={false} />);
    const drawerComponent = screen.getByTestId("drawer-container");
    expect(drawerComponent).toBeInTheDocument();
  });
  test("onClose triggered on Clicking outside the drawer", () => {
    render(<MockDrawer open={true} />);
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const containerElement = document.body;
    fireEvent.mouseDown(containerElement);

    expect(mockButtonClick).toHaveBeenCalled();
    addEventListenerSpy.mockRestore();
  });
  test("onClose should not be triggered on Clicking inside the drawer", () => {
    render(<MockDrawer open={true} />);
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const drawerComponent = screen.getByText("label text");
    fireEvent.mouseDown(drawerComponent);

    expect(mockButtonClick).not.toHaveBeenCalled();
    addEventListenerSpy.mockRestore();
  });
});
