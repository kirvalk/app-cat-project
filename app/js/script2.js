document.addEventListener('DOMContentLoaded', function(){
  const appList = [
    {
     name: 'app1',
     path: './assets/img/img1.png',
     date: '2016-09-01'
    },
    {
     name: 'app2',
     path: './assets/img/img2.jpg',
     date: '2016-09-02'
    },
    {
     name: 'app3',
     path: './assets/img/img3.jpg',
     date: '2016-09-03'
    },
    {
     name: 'app4',
     path: './assets/img/img4.jpg',
     date: '2016-09-04'
    },
    {
     name: 'app5',
     path: './assets/img/img5.jpg',
     date: '2016-09-05'
    },
    {
     name: 'app6',
     path: './assets/img/img6.jpg',
     date: '2016-09-06'
    },
    {
     name: 'app7',
     path: './assets/img/img7.jpg',
     date: '2016-09-07'
    },
    {
     name: 'app8',
     path: './assets/img/img8.jpg',
     date: '2016-09-08'
    },
    {
     name: 'app9',
     path: './assets/img/img9.jpg',
     date: '2016-09-09'
    },
    {
     name: 'app10',
     path: './assets/img/img10.jpg',
     date: '2016-09-10'
    }
  ];
  putPromoApps(7);

  function putPromoApps (numberOfApps) {
    const promoBlock = document.querySelector('.promo-layout');
    for (let i = 0; i < numberOfApps; i++) {
      const appView = createAppView(getRandomApp(appList));
      promoBlock.appendChild(appView);
    }
    document.querySelectorAll('.package')[1].classList.add('middle');
    putPromoPoints(numberOfApps);
  }

  function createAppView(app) {
    const appView = document.querySelector('#package-temp').cloneNode(true);
    appView.content.querySelector('.package__image').src = app.path;
    appView.content.querySelector('.package__name').innerHTML = app.name;
    appView.content.querySelector('.package__name').href = '#';
    appView.content.querySelector('.package__date').innerHTML = app.date;
    const clone = document.importNode(appView.content, true);
    return clone;
  }

  function getRandomApp(list) {
    const rnd = Math.floor(Math.random() * list.length);
    return list[rnd];
  }

  // Добавляет на страницу необходимое количество точек для слайдера
  function putPromoPoints(num) {
    const pointContainer = document.querySelector('.promo__points-container');
    for (let i = 1; i <= num; i++) {
      const point = document.createElement('DIV');
      point.classList.add('promo__point');
      if (i === 2 || num === 1) {
        point.classList.add('promo__point_active');
      }
      pointContainer.appendChild(point);
    }
  }
});