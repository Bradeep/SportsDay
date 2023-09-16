import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ImgWithFallback from "../../../components/ImgWithFallback";
import icon from "../../../assets/icons/athletics.svg";
import fallbackIcon from "../../../assets/images/athletics.jpg";

const MockImgWithFallback = (props) => {
  return (
    <ImgWithFallback
      height={20}
      width={20}
      src={icon || ""}
      fallbackSrc={fallbackIcon}
      {...props}
    />
  );
};

describe("ImgWithFallback Wrapper", () => {
  test("Correct image rendered", () => {
    render(<MockImgWithFallback />);

    const img = screen.queryByTestId("fallback_image");

    expect(img).toHaveAttribute("src", "athletics.svg");
  });
});
