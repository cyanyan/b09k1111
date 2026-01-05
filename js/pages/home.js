const container = document.getElementById('imageContainer');
const totalImages = 11;
let current = 0;
const maxVisibleImages = 20;

function showRandomInitialImage() {
  container.innerHTML = '';
  current = Math.floor(Math.random() * totalImages);
  addNextImage(true);
}

function addNextImage(isInitial = false) {
  const allImages = container.querySelectorAll('img');
  if (allImages.length >= maxVisibleImages) {
    let oldestImg = null;
    let minZIndex = Infinity;
    allImages.forEach(img => {
      const zIndex = parseInt(img.style.zIndex) || 0;
      if (zIndex < minZIndex) {
        minZIndex = zIndex;
        oldestImg = img;
      }
    });
    if (oldestImg) {
      oldestImg.remove();
    }
  }
  
  current = (current % totalImages) + 1;
  const img = document.createElement('img');
  img.src = `assets/home/h${current}.webp`;
  if (!isInitial) {
    img.loading = 'lazy';
  }
  img.style.zIndex = Date.now();
  
  const isMobile = window.innerWidth <= 768;
  
  img.onload = function() {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let maxWidth;
    
    if (isMobile) {
      const maxContainerWidth = window.innerWidth * 0.7;
      maxWidth = maxContainerWidth - 60;
    } else {
      if (aspectRatio >= 1) {
        maxWidth = 360;
      } else {
        maxWidth = 280;
      }
    }
    
    const minWidth = isMobile ? Math.floor(maxWidth * 0.6) : Math.floor(maxWidth * 0.7);
    const randomWidth = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
    img.style.width = randomWidth + 'px';
    
    img.classList.add('visible');
    
    updateContainerWidth();
    
    preloadNextImage();
  };
  
  img.onerror = function() {
    current = (current % totalImages) + 1;
  };
  
  container.appendChild(img);
}

function preloadNextImage() {
  const nextIndex = (current % totalImages) + 1;
  const preloadImg = new Image();
  preloadImg.src = `assets/home/h${nextIndex}.webp`;
}

function updateContainerWidth() {
  const isMobile = window.innerWidth <= 768;
  const allImages = container.querySelectorAll('img');
  
  if (allImages.length === 0) return;
  
  if (isMobile) {
    let maxWidth = 0;
    allImages.forEach(img => {
      const imgWidth = parseFloat(img.style.width) || img.offsetWidth;
      if (imgWidth > maxWidth) {
        maxWidth = imgWidth;
      }
    });
    const maxContainerWidth = window.innerWidth * 0.7;
    container.style.width = Math.min(maxWidth + 60, maxContainerWidth) + 'px';
  } else {
    let maxWidth = 0;
    allImages.forEach(img => {
      const imgWidth = parseFloat(img.style.width) || img.offsetWidth;
      if (imgWidth > maxWidth) {
        maxWidth = imgWidth;
      }
    });
    container.style.width = Math.min(maxWidth + 40, 490) + 'px';
  }
}

container.addEventListener('click', addNextImage);
window.homeShowRandomImage = showRandomInitialImage;
showRandomInitialImage();
