document.addEventListener('DOMContentLoaded', function(){
  const STEP_WIDTH = -362;
  const leftArrow = document.querySelector('.promo__arrow-wrapper_left'),
        rightArrow = document.querySelector('.promo__arrow-wrapper_right'),
        promoLayout = document.querySelector('.promo-layout'),
        allPackages = document.querySelectorAll('.package'),
        pointContainer = document.querySelector('.promo__points-container'),
        points = document.querySelectorAll('.promo__point');
  const getNodeIndex = (node, nodeList) => [...nodeList].indexOf(node);
  
  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  function moveLeft(){
    makePackageCenteredByIndex(getNextPackageIndex ('left'), 1);
  }

  function moveRight(){
    makePackageCenteredByIndex(getNextPackageIndex ('right'), 1);
  }

  function makePackageCenteredByIndex (index, limit = 0) {
    if (!allPackages[index + limit] || !allPackages[index - limit]) return;
    allPackages.forEach(v => v.classList.remove('middle'));
    allPackages[index].classList.add('middle');
    points.forEach(v => v.classList.remove('promo__point_active'));
    points[index].classList.add('promo__point_active');
    const left = STEP_WIDTH * (index - 1);
    promoLayout.style.left = `${left}px`;
  }

  function getNextPackageIndex (direction) {
    const currentPackage = [...allPackages].filter(v => v.classList.contains('middle'))[0];
    const currentPackageIndex = getNodeIndex(currentPackage, allPackages);
    const result = direction === 'left' ? currentPackageIndex - 1 : currentPackageIndex + 1;
    return result;
  }

  pointContainer.addEventListener('click', function(ev) {
    if (!ev.target.classList.contains('promo__point')) return;
    const pointIndex =  getNodeIndex(ev.target, points);
    makePackageCenteredByIndex(pointIndex);
    points.forEach(v => v.classList.remove('promo__point_active'));
    ev.target.classList.add('promo__point_active');
  });
});