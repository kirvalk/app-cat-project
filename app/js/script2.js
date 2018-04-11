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
  setPromoApps(3);

  function setPromoApps (NumberOfApps) {
    const promoBlock = document.querySelector('#promo-block');
    for (let i = 0; i < NumberOfApps; i++) {
     createAppView(getRandomApp(appList), promoBlock);
   }
  }

  function createAppView(app, placeNode) {
    const wrapper = createAppWrapper(),
          img = createAppImg(app.path),
          link = createAppLink(app.name),
          date = createAppDate(app.date);
    placeNode.appendChild(wrapper);	
    wrapper.appendChild(img);		
    wrapper.appendChild(link);		
    wrapper.appendChild(date);		
  }

  function createAppImg(appPath) {
    const img = document.createElement('IMG');
    img.src = appPath;
    img.classList.add('page__pic', 'package__image');
    return img;
  }

  function createAppLink(appName) {
    const name = document.createElement('A');
    name.href = '#';
    name.innerHTML = appName;
    name.classList.add('package__name','link');
    return name;
  }

  function createAppDate(appTime) {
    const date = document.createElement('TIME');
    date.datetime = appTime;
    date.innerHTML = appTime;
    date.classList.add('package__date');
    return date;
  }

  function createAppWrapper() {
    const wrapper = document.createElement('DIV');
    wrapper.classList.add('package');
    return wrapper;
  }

  function getRandomApp(list) {
    const rnd = Math.floor(Math.random() * list.length);
    return list[rnd];
  }
});