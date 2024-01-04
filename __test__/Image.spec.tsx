import ImageSign from "@/components/image";
import { render, screen } from "@testing-library/react";

describe("Image", () => {
  it("should render image when isLoading property is falsy", 
  () => {
    const fakeSign = {
      image: `https://gist.githack.com/igords-goncalves/70da3b23
      fa13aa6ab7fe364183e8ed58/raw/0ec5f3742d8d3359069eb7e007bda
      4d164afb6f5/aquarius.svg`,
      title: "Fake Sign",
      profile: "Fake Sign Profile",
    };

    render(<ImageSign isLoading={false} sign={fakeSign} />);

    const imageComponent = screen.getByAltText("Sign Image");
    expect(imageComponent).toBeInTheDocument();
  });

  it("should render spinner animation when isLoading is truthy", 
  () => {
    const fakeSign = {
      image: "fake-image-url",
      title: "Fake Sign",
      profile: "Fake Sign Profile",
    };
    render(<ImageSign isLoading={true} sign={fakeSign} />);

    const spinnerComponent = screen.getByLabelText("Loading sign");
    expect(spinnerComponent).toBeInTheDocument();
  });
});
