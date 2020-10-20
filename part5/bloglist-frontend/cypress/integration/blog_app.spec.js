describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'root',
      password: 'root',
      name: 'root'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#loginButton').click()

      cy.contains('Logged in as:')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('notroot')
      cy.get('#loginButton').click()

      cy.contains('username')
      cy.contains('password')
      cy.get('html').should('not.contain', 'Logged in as:')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'root' })
      })

      it('A blog can be created', function() {
        cy.contains('Add Blog').click()
        cy.get('#Title').type('A Cypress Blog')
        cy.get('#Author').type('Cypress Author')
        cy.get('#URL').type('www.cypressblogs.com')

        cy.get('#createBlogButton').click()

        cy.contains('A Cypress Blog')
        cy.contains('View').click()
        cy.contains('Cypress Author')
        cy.contains('www.cypressblogs.com')
      })

      describe('when blog is created', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'cy title', author: 'cy author', url: 'cy url' })
          cy.contains('View').click()
        })

        it('a blog can be liked', function() {
          cy.get('#likeButton').click()
          cy.contains('Likes: 1')
        })

        it('a blog can be deleted by the user who created it', function() {
          cy.get('#deleteButton').click()

          cy.get('html').should('not.contain', 'cy title')
        })        
      })

      describe('when there are multiple blogs', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'cy1 title', author: 'cy1 author', url: 'cy1 url' })
          cy.createBlog({ title: 'cy2 title', author: 'cy2 author', url: 'cy2 url' })

          cy.contains('cy1 title').find('button').click()
          cy.contains('cy2 title').find('button').click()

          cy.get('button').then( buttons => {
            console.log('number of buttons', buttons.length)
            cy.wrap(buttons[8]).click()
          })
        })

        it('blogs are ordered by the number of likes', function() {
          cy.reload()
          cy.get('#blog').first().contains('cy2 title')
        })
      })
    })
  })
})