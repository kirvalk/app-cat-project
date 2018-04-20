export function highlightActiveHeaderLink(){
  const headerLinks = document.querySelectorAll('.header__link');
  const currentPath = document.location.pathname;
  headerLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('header__link_active');
    }
  });
}

export function  convertUTS(sec) {
  const date = new Date(sec * 1000);
  const monthNames = ['января','февраля','марта','апреля','мая','июня',
                      'июля','августа','сентября','октября','ноября','декабря'];
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function highlightActiveAppLink(appId){
  const appLinks = document.querySelectorAll('.cat-menu__link');
  appLinks.forEach(link => link.classList.remove('cat-menu__link_active'));
  const appLink = document.querySelector(`.cat-menu__link[data-id="${appId}"]`);
  appLink.classList.add('cat-menu__link_active');
}

export function manageLoader(){
  const loader = document.querySelector('.cssload-loader');
  if (this.readyState === 1) {
    loader.classList.remove('cssload-loader-hidden');
  } else if (this.readyState === 4) {
    loader.classList.add('cssload-loader-hidden');
  }
}