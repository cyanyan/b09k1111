const container = document.getElementById('imageContainer');
const totalImages = 5;
let current = 0;

function showRandomInitialImage() {
  container.innerHTML = '';
  current = Math.floor(Math.random() * totalImages);
  addNextImage();
}

function addNextImage() {
  current = (current % totalImages) + 1;
  const img = document.createElement('img');
  img.src = `assets/home/h${current}.jpg`;
  img.classList.add('visible');
  img.style.zIndex = Date.now(); // 堆叠上层
  // 检查是否为手机端
  const isMobile = window.innerWidth <= 768;
  
  // 计算新图片的宽度限制
  let randomWidth;
  if (isMobile) {
    // 手机端：图片宽度随机，基于屏幕宽度计算范围
    const maxContainerWidth = window.innerWidth * 0.6; // 60vw
    const maxImageWidth = maxContainerWidth - 40; // 容器最大宽度减去 40px 边距
    // 随机宽度范围：最小为 maxImageWidth 的 60%，最大为 maxImageWidth
    const minImageWidth = Math.floor(maxImageWidth * 0.6);
    randomWidth = Math.floor(minImageWidth + Math.random() * (maxImageWidth - minImageWidth));
  } else {
    // 桌面端：安全区域宽度范围 240~320px
    randomWidth = Math.floor(240 + Math.random() * 81); // 240-320px
  }
  
  // 只设置新图片的宽度
  img.style.width = randomWidth + 'px';
  container.appendChild(img);
  
  // 设置容器宽度
  if (isMobile) {
    // 手机端：检查所有图片的宽度，找到最宽的，然后设置容器宽度为最宽图片 + 40px
    const allImages = container.querySelectorAll('img');
    let maxWidth = 0;
    allImages.forEach(existingImg => {
      const imgWidth = parseFloat(existingImg.style.width) || existingImg.offsetWidth;
      if (imgWidth > maxWidth) {
        maxWidth = imgWidth;
      }
    });
    const maxContainerWidth = window.innerWidth * 0.6;
    container.style.width = Math.min(maxWidth + 40, maxContainerWidth) + 'px';
  } else {
    // 桌面端：容器宽度固定为 360px（安全区域最大宽度 320px + 40px 边距）
    container.style.width = '360px';
  }
}

container.addEventListener('click', addNextImage);
window.homeShowRandomImage = showRandomInitialImage;
showRandomInitialImage(); // 初始加载随机一张
