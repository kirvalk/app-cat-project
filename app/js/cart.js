export class Application {
  constructor(id, price){
    this.id = id;
    this.price = price;
    this.quantity = 1;
  }

  goToCart(cartObj){
    const elemAlreadyAdded = cartObj.find(app => app.id == this.id);
    elemAlreadyAdded ? elemAlreadyAdded.quantity += 1 : cartObj.push(this);
    console.log(cartObj);
  }
}


export class Cart extends Array {
  sum() {
    return this.reduce((total, app) => total + app.price * app.quantity, 0);
  }
  num() {
    return this.reduce((total, app) => total + app.quantity, 0);
  }
  updateCartInfo(quantityNode, sumNode) {
    quantityNode.textContent = this.num();
    sumNode.textContent = this.sum().toLocaleString('en-Us', { style: 'currency', currency: 'USD' });
  }
}