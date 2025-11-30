const container = document.getElementById('imageContainer');
const totalImages = 10;
let current = 0;
const maxVisibleImages = 20; // 最多同时显示3张图片

function showRandomInitialImage() {
  container.innerHTML = '';
  current = Math.floor(Math.random() * totalImages);
  addNextImage(true); // 初始图片立即加载
}

function addNextImage(isInitial = false) {
  // 限制图片数量，移除最旧的图片
  const allImages = container.querySelectorAll('img');
  if (allImages.length >= maxVisibleImages) {
    // 移除最旧的图片（z-index最小的）
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
  
  // 随机选择下一张图片，但确保不与当前图片相同
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * totalImages) + 1;
  } while (nextIndex === current && totalImages > 1); // 如果只有一张图片则跳过循环
  current = nextIndex;
  
  const img = document.createElement('img');
  img.src = `assets/home/h${current}.jpg`;
  // 初始图片立即加载，后续图片使用懒加载
  if (!isInitial) {
    img.loading = 'lazy';
  }
  img.style.zIndex = Date.now(); // 堆叠上层
  
  // 检查是否为手机端
  const isMobile = window.innerWidth <= 768;
  
  // 图片加载完成后根据宽高比设置宽度
  img.onload = function() {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let maxWidth;
    
    if (isMobile) {
      // 手机端：基于屏幕宽度计算
      const maxContainerWidth = window.innerWidth * 0.6;
      maxWidth = maxContainerWidth - 40;
    } else {
      // 桌面端：根据图片比例设置最大宽度
      if (aspectRatio >= 1) {
        // 横向图片：宽度不超过 450px
        maxWidth = 360;
      } else {
        // 竖向图片：宽度不超过 300px
        maxWidth = 280;
      }
    }
    
    // 随机宽度，但不超过最大宽度
    const minWidth = isMobile ? Math.floor(maxWidth * 0.6) : Math.floor(maxWidth * 0.7);
    const randomWidth = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
    img.style.width = randomWidth + 'px';
    
    // 显示图片
    img.classList.add('visible');
    
    // 更新容器宽度
    updateContainerWidth();
    
    // 预加载下一张图片
    preloadNextImage();
  };
  
  img.onerror = function() {
    // 如果图片加载失败，尝试下一张
    current = (current % totalImages) + 1;
  };
  
  container.appendChild(img);
}

function preloadNextImage() {
  // 预加载下一张可能的图片，提升加载速度
  // 随机选择一个不同于当前的图片进行预加载
  let preloadIndex;
  do {
    preloadIndex = Math.floor(Math.random() * totalImages) + 1;
  } while (preloadIndex === current && totalImages > 1);
  const preloadImg = new Image();
  preloadImg.src = `assets/home/h${preloadIndex}.jpg`;
}

function updateContainerWidth() {
  const isMobile = window.innerWidth <= 768;
  const allImages = container.querySelectorAll('img');
  
  if (allImages.length === 0) return;
  
  if (isMobile) {
    // 手机端：找到最宽的图片
    let maxWidth = 0;
    allImages.forEach(img => {
      const imgWidth = parseFloat(img.style.width) || img.offsetWidth;
      if (imgWidth > maxWidth) {
        maxWidth = imgWidth;
      }
    });
    const maxContainerWidth = window.innerWidth * 0.6;
    container.style.width = Math.min(maxWidth + 40, maxContainerWidth) + 'px';
  } else {
    // 桌面端：找到最宽的图片，但不超过 490px（450 + 40）
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
showRandomInitialImage(); // 初始加载随机一张
