import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ListaDeUsuarios from './ListaDeUsuarios';

import axios from "axios"

const API = [
  {
    id: 1001,
    name: "Eduardo Santos",
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    username: "@eduardo.santos",
  },
  {
    id: 1002,
    name: "Marina Coelho",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    username: "@marina.coelho",
  },
];

jest.mock("axios", () => ({
  get: jest.fn((..._) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  }),
}));

describe('Testing of ListaDeUsuarios', () => {

  beforeEach(async () => {
    axios.get.mockResolvedValue({ data: API });
    render(<ListaDeUsuarios />);
    await screen.findByText(/REACT APP/i);
  })

  it("should section", async () => {
    const test = screen.getByTestId('section') 
    expect(test).toBeTruthy();
  });

})