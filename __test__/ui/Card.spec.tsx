import Card from "@/components/Card";
import { render, screen } from "@testing-library/react";

it("component should displays an image and heading elements", () => {
  render(<Card />);

  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();

  const heading = screen.getByRole("heading", {level: 1, name: /sign/i });
  expect(heading).toBeInTheDocument();

  const description = screen.getByRole("heading", {name: /short profile sign description/i});
  expect(description).toBeInTheDocument();
});
