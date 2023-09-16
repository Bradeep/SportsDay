import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip from "../../../components/Tooltip";

const MockTooltip = () => {
  return <Tooltip>label text</Tooltip>;
};

describe("Tooltip Wrapper", () => {
  test("Tooltip Wrapper is rendered", () => {
    render(<MockTooltip />);
    const toolTipContent = screen.getByText("label text");
    expect(toolTipContent).toBeInTheDocument();
  });
});
