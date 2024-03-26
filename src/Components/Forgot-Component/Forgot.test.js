import { fireEvent, render, renderHook, screen,act} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("Forgot password", () => { 
  //global router
  const renderWithRouter = (ui, { route = "/forgot_password" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    };
  };




  test("availability checking", () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("verify-email")).toBeInTheDocument();
  });



  test("initailly email file value has to empty", () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId("email").value).toBe("");
  });



  test("clicking verify button and making error as true", () => {
    renderWithRouter(<App />);

    //updating in email input fied
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "" },
    });

    act(()=>{
        fireEvent.click(screen.getByTestId("verify-email"));
    })
    expect(screen.getByText(/Email required/i)).toBeInTheDocument();
  });



  test("clicking verify button and making error as false", () => {
    renderWithRouter(<App />);

    //updating email input fied
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "testing123@gmail.com" },
    });

    fireEvent.click(screen.getByTestId("verify-email"));
  });
});
