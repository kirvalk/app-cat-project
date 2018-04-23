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