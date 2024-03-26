import { renderHook, render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'
import React from 'react';

describe("Login Test cases", () => {

  //global router
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }
 

  test("Checking fields are available", () => { 
    renderWithRouter(<App />)
 
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    expect(screen.getByRole(/username/i)).toBeInTheDocument();
    expect(screen.getByRole(/password/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });



  test("should set username and password to be empty", () => {
    renderWithRouter(<App />) 

    expect(screen.getByRole("username").value).toBe("")
    expect(screen.getByRole("password").value).toBe("")
  });



  test("checking fields as empty when clicking submit button", () => {
    renderWithRouter(<App />)
 
    fireEvent.click(screen.getByRole("login-button")); 

    //validating input is empty
    expect(screen.getByRole("username").value).toBe("")
    expect(screen.getByRole("password").value).toBe("")

    expect(screen.getByText(/username required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });



  test("username field is empty error message when clicking submit button", () => {
    renderWithRouter(<App />)

    fireEvent.change(screen.getByRole("password"), {
      target: { value: "password@123" },
    });
 
    fireEvent.click(screen.getByRole("login-button")); 

    //validating username field is empty
    expect(screen.getByRole("username").value).toBe("")

    expect(screen.getByText(/username required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });



  test("password field is empty error message when clicking submit button", () => {
    renderWithRouter(<App />) 

    fireEvent.change(screen.getByRole("username"), {
      target: { value: "second-carrear" },
    });
 
    fireEvent.click(screen.getByRole("login-button"));  

    //validating password field is empty
    expect(screen.getByRole("password").value).toBe("")
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });



  test("Entering username and password and clicking submit button", async() => {
    renderWithRouter(<App />)
    //setting username and password target values of input element
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();

    fireEvent.change(screen.getByRole("username"), {
      target: { value: "second-carrear" },
    });
    fireEvent.change(screen.getByRole("password"), {
      target: { value: "password@123" },
    });

    act(()=>{
      fireEvent.click(screen.getByRole("login-button"));     

      //validating inputs not to be empty
      expect(screen.getByRole("username").value).not.toBe("");
      expect(screen.getByRole("password").value).not.toBe("");
    }) 

    expect(screen.getByRole(/disable-login-button/i)).toBeInTheDocument()
    expect(screen.getByRole(/disable-login-button/i)).toBeDisabled()

    await waitFor(()=>expect(window.location.href).toBe('http://localhost/home'))
  });



  test("clicking forgot password link", async () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("forgot-password"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/forgot_password")
    );
  });


  
  test("clicking google link", async() => {
    renderWithRouter(<App />);
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("google"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/google")
    );
  })



  test("clicking linked link", async() => {
    renderWithRouter(<App />);
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("linked-in"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/linked-in")
    );
  })



  test("clicking apple link", async() => {
    renderWithRouter(<App />);
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("apple"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/apple")
    );
  })


  test("clicking signup link", async() => {
    renderWithRouter(<App />);
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("sign-up"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/sign-up")
    );
  })
});