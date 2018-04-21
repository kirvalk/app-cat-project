export class PromiseRequest {
  constructor(path) {
    this.promise = this.init(path);
  }
  
  init(path) {
    const promise = new Promise ((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', ev => {
        if (ev.target.readyState !== 4) return;
        ev.target.status === 200 ? resolve(xhr.responseText) : reject('error!!!');
      });
      xhr.open("GET", path, true);
      xhr.send();
    });
    return promise;
  }
}

