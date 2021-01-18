import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen, act } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'


describe('<Blog />', () => {
  let component

  const blog = {
    user: "id",
    title: "test blog title",
    author: "test author",
    url: "testurl.com",
    likes: 69
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('blog renders title only by default', () => {
    expect(component.container).toHaveTextContent("test blog title")
    expect(component.container).not.toHaveTextContent("test author")
    expect(component.container).not.toHaveTextContent("testurl.com")
  })

  test('blog renders all information when the view button is clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent("test blog title")
    expect(component.container).toHaveTextContent("test author")
    expect(component.container).toHaveTextContent("testurl.com")
    expect(component.container).toHaveTextContent("Likes: 69")
 
  })

  test('like button event registers twice if clicked twice', async () => {
    jest.spyOn(blogService, "incrementLikes").mockImplementation(() => ({likes: 70}))

    const viewButton = component.getByText('View')
    act(() => {fireEvent.click(viewButton)})

    const likeButton = component.getByText('Like')
    act(() => {fireEvent.click(likeButton)})

    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
    expect(screen.queryByText("Likes: 70")).toBeInTheDocument()

  })
})