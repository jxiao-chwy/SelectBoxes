import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'
import Home from '../src/pages/index'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const text = screen.getByText(/hello world/i);
 
    expect(text).toBeInTheDocument()
  })
})