export class Application {
  constructor(id, price, name, guid, extra = false){
    this.id = id;
    this.price = price;
    this.name = name;
    this.guid = guid;
    this.extra = extra;
  }
}