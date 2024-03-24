import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Multiple link tag calling", () => {
  const HomeComponet = () => {
    return render(<Home />);
  }

  test("Home page redirecting", () => {
    HomeComponet();

    //anchor tag pag render
    fireEvent.click(screen.getByRole("home-page")); 
    expect(window.location.href).toBe('http://localhost/');
  });
});
