import { render, screen } from "@testing-library/react"
import React from "react"
import Navbar from "./Navbar"

describe('Navbar test',() => {
    it('Should be rendered', ()=> {
        const test_elem = (<Navbar />)
        render(test_elem);
        expect(screen.getByText('Plan collections')).toBeInTheDocument();
    })
}) 