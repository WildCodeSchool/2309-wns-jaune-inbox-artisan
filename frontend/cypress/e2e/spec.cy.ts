describe('test home page', () => {
	it('navigate to home page', () => {
		cy.visit('http://localhost:3000');
	});
	const email = `test${Date.now()}@gmail.com`;

	it('test Sign Up', () => {
		cy.visit('http://localhost:3000');

		cy.contains('a', 'Sign up').click();

		cy.contains('h2', 'Welcome, new Artisan !').should('be.visible');
		cy.get('input[placeholder="Mail"]').should('exist');
		cy.get('input[placeholder="Username"]').should('exist');
		cy.get('input[placeholder="Password"]').should('exist');
		cy.get('input[placeholder="Confirm your password"]').should('exist');
		cy.get('button[type="submit"]').contains('Sign up').should('exist');

		cy.get('input[placeholder="Mail"]').type(email);
		cy.get('input[placeholder="Username"]').type('testUser');
		cy.get('input[placeholder="Password"]').type('ThisIs-123');
		cy.get('input[placeholder="Confirm your password"]').type('ThisIs-123');
		cy.get('button[type="submit"]').click();

		cy.contains('h2', 'Good to see you !').should('be.visible');
	});

	it('test Log In', () => {
		cy.visit('http://localhost:3000');

		cy.contains('a', 'Log in').click();

		cy.contains('h2', 'Good to see you !').should('be.visible');
		cy.get('input[placeholder="Mail"]').should('exist');
		cy.get('input[placeholder="Password"]').should('exist');
		cy.get('button[type="submit"]').contains('Submit').should('exist');

		cy.get('input[placeholder="Mail"]').type(email);
		cy.get('input[placeholder="Password"]').type('ThisIs-123');

		cy.get('button[type="submit"]').click();

		cy.contains('h2', 'Dashboard').should('be.visible');
	});
});
