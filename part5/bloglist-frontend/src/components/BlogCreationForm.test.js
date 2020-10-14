import React, { useRef } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen, act } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogCreationForm from './BlogCreationForm'

describe('<BlogCreationForm />', () => {

  test('new blog creates with the correct details', async () => {
    jest.spyOn(blogService, "create").mockImplementation((blog) => {
      return { title: blog.title, author: blog.author, url: blog.url }
    })
    
    const blogs = []
    const setBlogs = jest.fn(() => (console.log("HERE!")))
    const setNotification = jest.fn()
    const toggleVisibility = jest.fn()
    const blogCreationFormRef = { current: { toggleVisibility }}

    const component = render(
      <BlogCreationForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} blogCreationFormRef={blogCreationFormRef} />
    )

    const title = component.container.querySelector('#Title')
    const author = component.container.querySelector('#Author')
    const url = component.container.querySelector('#URL')

    fireEvent.change(title, { target: { value: 'title1' } })
    fireEvent.change(author, { target: { value: 'author1' } })
    fireEvent.change(url, { target: { value: 'url1' } })


    const button = component.getByText('Create')
    fireEvent.click(button)

    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })

    expect(setBlogs.mock.calls[0][0][0].title).toBe('title1')
    expect(setBlogs.mock.calls[0][0][0].author).toBe('author1')
    expect(setBlogs.mock.calls[0][0][0].url).toBe('url1')

  })
})