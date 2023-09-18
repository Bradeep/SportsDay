import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Fallback from "components/Fallback";

const MockFallback = ({ message }: { message?: string }) => {
  return <Fallback message={message} />;
};

describe("Fallback component", () => {
  test("Fallback component rendered", () => {
    render(<MockFallback />);
    const el = screen.getByText("Something went wrong");
    expect(el).toBeInTheDocument();
  });
  test("Fallback rendered with pass on string", () => {
    render(<MockFallback message="No events" />);
    const el = screen.getByText("No events");
    expect(el).toBeInTheDocument();
  });
});
