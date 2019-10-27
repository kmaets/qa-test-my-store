/**
 * Cypress example test with valid and invalid login to My Store.
 */

describe('Valid and invalid login to My Store.', () => {

    beforeEach(() => {
        cy.fixture('users/user.json').as('user');
        cy.fixture('selectors/login.json').as('login');
        cy.fixture('selectors/account.json').as('account');
    })

    it('Should login with valid credentials and then logout.', function () {
        cy.visit('http://automationpractice.com/index.php');
        cy.url().should('include', 'automationpractice.com');

        cy.get(this.account.signIn).click();
        cy.get(this.login.emilInput).type(this.user.email);
        cy.get(this.login.passwordInput).type(this.user.password);
        cy.get(this.login.submitSignIn).click();
        cy.get(this.account.accountName).should('have.text', this.user.name);

        cy.get(this.account.signOut).click();
        cy.get(this.account.signIn).should('include.text', 'Sign in');
    });

    it('Should not login with invalid email.', function () {
        cy.visit('http://automationpractice.com/index.php');
        cy.url().should('include', 'automationpractice.com');

        cy.get(this.account.signIn).click();
        cy.get(this.login.emilInput).type(this.user.emailInvalid);
        cy.get(this.login.passwordInput).type(this.user.password);
        cy.get(this.login.submitSignIn).click();
        
        cy.get(this.login.authFailed).should('have.text', 'Authentication failed.');
    });

    it('Should not login with invalid password.', function () {
        cy.visit('http://automationpractice.com/index.php');
        cy.url().should('include', 'automationpractice.com');

        cy.get(this.account.signIn).click();
        cy.get(this.login.emilInput).type(this.user.email);
        cy.get(this.login.passwordInput).type(this.user.passwordInvalid);
        cy.get(this.login.submitSignIn).click();
        
        cy.get(this.login.authFailed).should('have.text', 'Invalid password.');
    });
});
