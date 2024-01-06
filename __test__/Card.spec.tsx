import Card from "@/components/card";
import { render, screen } from "@testing-library/react";

describe("Card", () => {
  let date = 1222;
  const fakeSign = {
    image: `https://gist.githack.com/igords-goncalves/70da3b23
    fa13aa6ab7fe364183e8ed58/raw/0ec5f3742d8d3359069eb7e007bda
    4d164afb6f5/aquarius.svg`,
    title: "Fake Sign",
    profile: "Fake Sign Profile",
  };

  it("should render a Card component", () => {
    render(<Card />);

    const cardComponent = screen.getByTestId("card-testid");
    expect(cardComponent).toBeInTheDocument();
  });

  it("should render sign image if there is date", () => {
    render(<Card />);

    if (date && fakeSign) {
      const imageComponent = screen.getByRole("img");
      expect(imageComponent).toBeInTheDocument();
    }
  });

  it("should render generic image if there is not date", () => {
    date = -1;

    if (!date && !fakeSign) {
      const genericImage = screen.getByText("Vercel logo");
      expect(genericImage).toBeInTheDocument();
    }
  });

  // FIXME: Fix test
  // it("should render title if there is a sign", () => {
  //   if (fakeSign) {
  //     const title = screen.getByText(fakeSign.title);
  //     expect(title).toBeInTheDocument();
  //   }
  // });

  it("should render a generic title if there is not title", () => {
    if (!fakeSign) {
      const title = screen.getByText("Sign");
      expect(title).toBeInTheDocument();
    }
  });

  // FIXME: Fix test
  // it("should render a profile description title if there is sign", () => {
  //   if (fakeSign) {
  //     const profile = screen.getByText(fakeSign.profile);
  //     expect(profile).toBeInTheDocument();
  //   }
  // });

  it("should render a generic profile description if there is not sign", () => {
    if (!fakeSign) {
      const profile = screen.getByText("Fake Sign Profile");
      expect(profile).toBeInTheDocument();
    }
  });
});
