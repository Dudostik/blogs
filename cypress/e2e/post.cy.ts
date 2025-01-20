describe('Post Management', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/posts');
    });
  
    it('should display the New Post page', () => {
      cy.contains('+ New Post').click();
      cy.url().should('include', '/posts/new');
      cy.contains('Title:');
      cy.contains('Body:');
    });
  
    it('should validate the Title field', () => {
      cy.visit('/posts/new');
      cy.get('textarea[name="body"]').type('Test body content');
      cy.get('button[type="submit"]').click();
  
      cy.get('#title-error').should('contain', 'Title is required');
    });
  
    it('should validate the Body field', () => {
      cy.visit('/posts/new');
      cy.get('input[name="title"]').type('Test Title');
      cy.get('button[type="submit"]').click();
  
      cy.get('#body-error').should('contain', 'Body is required');
    });
  
    it('should create a new post successfully', () => {
      cy.visit('/posts/new');
      cy.get('input[name="title"]').type('Test Post Title');
      cy.get('textarea[name="body"]').type('This is the body of the test post.');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/posts/');
      cy.contains('Test Post Title');
      cy.contains('This is the body of the test post.');
    });
  
    it('should edit an existing post', () => {
      cy.visit('/posts/1');
      cy.contains('Edit').click();
    
      cy.get('input[name="title"]').clear().type('Updated Title');
      cy.get('input[name="description"]').clear().type('Updated Description');
      cy.get('button[type="submit"]').click();
    
      cy.contains('Updated Title');
      cy.contains('Updated Description');
    });
  
    it('should delete a post', () => {
      cy.visit('/posts/1');
      cy.get('form').contains('Delete').click();
  
      cy.url().should('include', '/posts');
      cy.contains('No note selected.').should('exist');
    });
  
    it('should add a comment to a post', () => {
      cy.visit('/posts/1');
      cy.get('textarea[name="content"]').type('This is a test comment.');
      cy.get('button[type="submit"]').contains('Add comment').click();
  
      cy.contains('This is a test comment.');
      cy.contains('Posted on');
    });
  
    it('should validate the comment content field', () => {
      cy.visit('/posts/1');
      cy.get('button[type="submit"]').contains('Add comment').click();
      cy.get('#content-error').should('contain', 'Content is required');
    });
  });
  