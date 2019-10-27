/**
 * Cypress example test for an existing client, that orders a t-shirt and view orders history in My Store.
 */

describe('As an existing client, I want to order a t-shirt and view my orders in My Store.', () => {

    beforeEach(() => {
        cy.fixture('users/user.json').as('user');
        cy.fixture('selectors/login.json').as('login');
        cy.fixture('selectors/account.json').as('account');
        cy.fixture('selectors/topMenu.json').as('topmenu');
        cy.fixture('selectors/products.json').as('products');
        cy.fixture('selectors/cart.json').as('cart');
        cy.fixture('selectors/history.json').as('history');
    })

    it('Should login, choose tshirt, order it and view my orders.', function () {
        cy.visit('http://automationpractice.com/index.php');
        cy.url().should('include', 'automationpractice.com');

        // Login using valid credentials and check logged user name
        cy.get(this.account.signIn).click();
        cy.get(this.login.emilInput).type(this.user.email);
        cy.get(this.login.passwordInput).type(this.user.password);
        cy.get(this.login.submitSignIn).click();
        cy.get(this.account.accountName).should('have.text', this.user.name);
        
        // Choose tshirt product and add to cart
        cy.get(this.topmenu.tshirts).click({multiple: true, force: true});
        cy.get(this.products.productList).get(this.products.product.name).trigger('mouseover')
        cy.get(this.products.product.addToCert).click();
        cy.get(this.products.product.checkout).click();

        // Assertion of added product in cart summary and click to next
        cy.get(this.cart.certStep.summary).should('include.text', 'Summary');
        cy.get(this.cart.itemName).should('have.text', 'Faded Short Sleeve T-shirts');
        cy.get(this.cart.itemPrice).should('have.text', '$19.25');
        cy.get(this.cart.checkout.summary).click({multiple: true, force: true});

        // Assertion of address step and click to next
        cy.get(this.cart.certStep.address).should('include.text', 'Address');
        cy.get(this.cart.checkout.address).click();

        // Assertion of shipping step and click to next
        cy.get(this.cart.certStep.shipping).should('include.text', 'Shipping');
        cy.get(this.cart.termOfService).click();
        cy.get(this.cart.checkout.shipping).click();
        
        // Assertion of payment step and confirm order
        cy.get(this.cart.certStep.payment).should('include.text', 'Payment');
        cy.get(this.cart.payByBank).click();
        cy.get(this.cart.checkout.payment).click();
        cy.get(this.cart.orderConfirmation).should('include.text', 'Your order on My Store is complete.');
        
        // Go to order history
        cy.get(this.cart.orderHistory).click();

        // Didn't figure out yet in Cypress how to store value that I would need to assert with another value from different page,
        // I did this temporary solution to check order reference number to match a pattern.
        cy.get(this.history.latestOrder.reference).then(element => {
            expect(element.text().trim()).to.match(/[A-Z]{5,}/g)
        })
        
        cy.get(this.account.signOut).click();
        cy.get(this.account.signIn).should('include.text', 'Sign in');
    });
});
