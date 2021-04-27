import { render, screen } from "@testing-library/react"
import { createMemoryHistory } from 'history'
import React from "react"
import { Router } from 'react-router-dom'
import Navbar from "./Navbar"

describe('Navbar test',() => {
    it('Should be rendered Navbar', ()=> {
        const history = createMemoryHistory()
        const route = '/'
        history.push(route)
        render(
            <Router history={history}>
                <Navbar />
            </Router>
            );
        expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
    })
}) 