import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import App from "../../App";
import {BrowserRouter} from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import Home from './Home';

describe("Multiple link tag calling", () => {
  //global router
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }

  


  test('full app rendering/navigating', async () => {
    const { user } = renderWithRouter(<App />,{route: '/home'})
    expect(screen.getByRole('home-page')).toBeInTheDocument()

    act(()=>{
       user.click(screen.getByRole('home-page'))
    })
    await expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
  })
});
