import { render, screen } from "@testing-library/react";
import ToggleTitle from "@/components/ToggleTitle";
import signs from "../__mocks__/fakeData/signs";
import SignModel from "@/models/Sign.model";

it("component should display a correct title and subtitle when porps is provided", () => {
  const sign: SignModel = signs[0];

  render(<ToggleTitle sign={sign} />);

  const title = screen.getByRole("heading", { name: /Aries/i });
  expect(title).toBeInTheDocument();

  const subtitle = screen.getByRole("heading", {
    name: /fiery leaders with bold initiative./i,
  });
  expect(subtitle).toBeInTheDocument();
});
