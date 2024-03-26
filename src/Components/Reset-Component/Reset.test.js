import { fireEvent, render, screen } from "@testing-library/react";
import Reset from "./Reset";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import { act } from "react-dom/test-utils";

describe("change password component", () => {
  //global router
  const renderWithRouter = (ui, { route = "/reset" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    };
  };



  test("availability checking", () => {
    renderWithRouter(<App/>)

    expect(screen.getByText(/reset password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/reset-comp-email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/reset-comp-pass/i)).toBeInTheDocument();
    expect(screen.getByTestId(/reset-comp-conf-pass/i)).toBeInTheDocument();
    expect(screen.getByTestId(/change-password/i)).toBeInTheDocument();
  });



  test("initial checking all fields should be empty", () => {
    renderWithRouter(<App/>)

    expect(screen.getByTestId(/reset-comp-email/i).value).toBe("");
    expect(screen.getByTestId(/reset-comp-email/i)).toBeDisabled();

    expect(screen.getByTestId(/reset-comp-pass/i).value).toBe("");
    expect(screen.getByTestId(/reset-comp-conf-pass/i).value).toBe("");
  });



  test("confirm password required error", () => {
    renderWithRouter(<App/>)
    fireEvent.change(screen.getByTestId(/reset-comp-email/i), {
      target: { value: "testing123@gmail.com" },
    });
    expect(screen.getByTestId(/reset-comp-email/i).value).not.toBe("");
    expect(screen.getByTestId(/reset-comp-email/i)).toBeDisabled();

    fireEvent.change(screen.getByTestId(/reset-comp-pass/i), {
      target: { name: "password", value: "123" },
    });
    fireEvent.change(screen.getByTestId(/reset-comp-conf-pass/i), {
      target: { name: "confirm_password", value: "" },
    });
    expect(screen.getByTestId(/reset-comp-pass/i).value).toBe("123");
    expect(screen.getByTestId(/reset-comp-conf-pass/i).value).toBe("");

    act(()=>{
        fireEvent.click(screen.getByTestId("change-password"));
    })

    expect(screen.getByText(/confirm password required/i)).toBeInTheDocument();
  });



  test("password required error", () => {
    renderWithRouter(<App/>)
    fireEvent.change(screen.getByTestId(/reset-comp-email/i), {
      target: { value: "testing123@gmail.com" },
    });
    expect(screen.getByTestId(/reset-comp-email/i).value).not.toBe("");
    expect(screen.getByTestId(/reset-comp-email/i)).toBeDisabled();

    fireEvent.change(screen.getByTestId(/reset-comp-pass/i), {
      target: { name: "password", value: "" },
    });
    fireEvent.change(screen.getByTestId(/reset-comp-conf-pass/i), {
      target: { name: "confirm_password", value: "123" },
    });
    expect(screen.getByTestId(/reset-comp-pass/i).value).toBe("");
    expect(screen.getByTestId(/reset-comp-conf-pass/i).value).toBe("123");

    act(()=>{
        fireEvent.click(screen.getByTestId("change-password"));
    }) 

    expect(screen.getByText(/password required/i)).toBeInTheDocument();
  });



  test("password matching message when clicking submit button", () => {
    renderWithRouter(<App/>)
    fireEvent.change(screen.getByTestId(/reset-comp-email/i), {
      target: { value: "testing123@gmail.com" },
    });
    expect(screen.getByTestId(/reset-comp-email/i).value).not.toBe("");
    expect(screen.getByTestId(/reset-comp-email/i)).toBeDisabled();

    fireEvent.change(screen.getByTestId(/reset-comp-pass/i), {
      target: { name: "password", value: "123" },
    });
    fireEvent.change(screen.getByTestId(/reset-comp-conf-pass/i), {
      target: { name: "confirm_password", value: "123" },
    });
    expect(screen.getByTestId(/reset-comp-pass/i).value).toBe("123");
    expect(screen.getByTestId(/reset-comp-conf-pass/i).value).toBe("123");

    act(()=>{
        fireEvent.click(screen.getByTestId("change-password"));
    }) 

    expect(screen.getByTestId(/reset-comp-pass/i).value).toEqual(screen.getByTestId(/reset-comp-conf-pass/i).value)

    expect(screen.getByText(/password matching/i)).toBeInTheDocument();
  });

  

  test("password does not match message when clicking submit button", () => {
    renderWithRouter(<App/>)
    fireEvent.change(screen.getByTestId(/reset-comp-email/i), {
      target: { value: "testing123@gmail.com" },
    });
    expect(screen.getByTestId(/reset-comp-email/i).value).not.toBe("");
    expect(screen.getByTestId(/reset-comp-email/i)).toBeDisabled();

    fireEvent.change(screen.getByTestId(/reset-comp-pass/i), {
      target: { name: "password", value: "123" },
    });
    fireEvent.change(screen.getByTestId(/reset-comp-conf-pass/i), {
      target: { name: "confirm_password", value: "hi" },
    });
    expect(screen.getByTestId(/reset-comp-pass/i).value).toBe("123");
    expect(screen.getByTestId(/reset-comp-conf-pass/i).value).toBe("hi");

    act(()=>{
        fireEvent.click(screen.getByTestId("change-password"));
    }) 

    expect(screen.getByTestId(/reset-comp-pass/i).value).not.toEqual(screen.getByTestId(/reset-comp-conf-pass/i).value)

    expect(screen.getByText(/password does not matched/i)).toBeInTheDocument();
  });
});
