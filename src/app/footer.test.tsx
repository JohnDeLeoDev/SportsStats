import {render, screen} from '@testing-library/react'
import React from 'react'
import Footer from './footer'

test('Renders footer', () => {
    render(<Footer/>)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
})