import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import App from "../../App";
import {BrowserRouter} from 'react-router-dom'
import { act } from 'react-dom/test-utils';

describe("Multiple link tag calling", () => {
  //global router
  const renderWithRouter = (ui, { route = '/home' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }

  



  test('full app rendering/navigating', async () => {
    renderWithRouter(<App />)
    expect(screen.getByRole('home-page')).toBeInTheDocument()

    act(()=>{
       fireEvent.click(screen.getByRole('home-page'))
    })
    
    await waitFor(()=>expect(window.location.href).toBe("http://localhost/"));
  })
});
