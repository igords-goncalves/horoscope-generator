import { Button } from "@nextui-org/react";
import { render, screen } from "@testing-library/react";

 describe("Testing component Button", () => {
  it("should render a button element", () => {
    render(<Button />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
 })