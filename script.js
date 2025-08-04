// script.js

console.log("Spectral Order project loaded.");

// Scroll-based background transition
let lastScrollTop = 0;
const body = document.body;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrollTop / (documentHeight - windowHeight);
  
  // Remove existing scroll classes
  body.classList.remove('scroll-dark', 'scroll-darker', 'scroll-darkest');
  
  // Add appropriate class based on scroll position
  if (scrollPercentage > 0.3 && scrollPercentage <= 0.6) {
    body.classList.add('scroll-dark');
  } else if (scrollPercentage > 0.6 && scrollPercentage <= 0.8) {
    body.classList.add('scroll-darker');
  } else if (scrollPercentage > 0.8) {
    body.classList.add('scroll-darkest');
  }
  
  // Background image transition
  const beforeElement = document.querySelector('body::before');
  if (beforeElement) {
    // Calculate the transition based on scroll percentage
    const neonOpacity = Math.max(0, 1 - scrollPercentage * 2); // Fade out neon
    const noirOpacity = Math.min(1, scrollPercentage * 2); // Fade in noir
    
    // Apply the transition using CSS custom properties
    // Keep the blur filter constant while only changing the mask opacity
    document.documentElement.style.setProperty('--neon-opacity', neonOpacity);
    document.documentElement.style.setProperty('--noir-opacity', noirOpacity);
  }
  
  lastScrollTop = scrollTop;
});

// Parallax effect for background elements only
window.addEventListener('scroll', () => {
  // Holographic texture movement
  const scrolled = window.pageYOffset;
  const holographicOffset = scrolled * 0.3; // Move at 30% of scroll speed
  document.documentElement.style.setProperty('--holographic-offset', `${holographicOffset}px`);
  
  // Stars visibility based on scroll
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrolled / (documentHeight - windowHeight);
  // 计算繁星透明度 - 从页面更下方开始显现
  const starsOpacity = Math.max(0, Math.min(1, (scrollPercentage - 0.3) * 2));
  document.documentElement.style.setProperty('--stars-opacity', starsOpacity);
  
  // 计算银河背景透明度 - 比繁星稍晚显现
  const milkyWayOpacity = Math.max(0, Math.min(1, (scrollPercentage - 0.4) * 1.5));
  document.documentElement.style.setProperty('--milky-way-opacity', milkyWayOpacity);
});

// Add neon glow effect on hover for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.block');
  
  blocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.boxShadow = `
        0 5px 20px rgba(0, 255, 255, 0.4),
        0 0 30px rgba(0, 255, 255, 0.2),
        inset 0 0 30px rgba(0, 255, 255, 0.1)
      `;
    });
    
    block.addEventListener('mouseleave', () => {
      block.style.boxShadow = `
        0 2px 10px rgba(0, 255, 255, 0.2),
        inset 0 0 20px rgba(0, 255, 255, 0.05)
      `;
    });
  });
});

// Add subtle animation to header title
document.addEventListener('DOMContentLoaded', () => {
  const headerTitle = document.querySelector('header h1');
  if (headerTitle) {
    headerTitle.style.animation = 'neonPulse 2s ease-in-out infinite alternate';
  }
  
  // Generate random stars
  generateStars();
});

// Generate random stars
function generateStars() {
  const starsContainer = document.querySelector('.stars-container');
  const numberOfStars = 400; // 增加更多繁星

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // 更真实的繁星尺寸和颜色
    const size = Math.random() * 1.5 + 0.5; // 0.5-2px
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const animationDelay = Math.random() * 4;
    
    // 随机星星颜色（白色、蓝色、黄色）
    const colors = ['#ffffff', '#87ceeb', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    star.style.left = left + '%';
    star.style.top = top + '%';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.animationDelay = animationDelay + 's';
    star.style.background = color;
    star.style.boxShadow = `
      0 0 2px ${color},
      0 0 4px ${color},
      0 0 6px ${color},
      0 0 8px ${color}40
    `;
    
    starsContainer.appendChild(star);
  }
}

// 历史谱系交互效果
document.addEventListener('DOMContentLoaded', () => {
  const lineageItems = document.querySelectorAll('.lineage-item');
  
  lineageItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // 添加悬停效果
      item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
      // 移除悬停效果
      item.style.zIndex = '1';
    });
  });
});

// Image Modal Functions
let modalZoomLevel = 1;
let modalImageElement = null;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;

function openImageModal(src, alt) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  modalImage.src = src;
  modalImage.alt = alt;
  modal.classList.add('show');
  
  // Reset zoom level and drag position when opening modal
  modalZoomLevel = 1;
  modalImageElement = modalImage;
  dragOffsetX = 0;
  dragOffsetY = 0;
  updateModalImageTransform();
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  
  // Reset zoom level and drag position
  modalZoomLevel = 1;
  modalImageElement = null;
  isDragging = false;
  dragOffsetX = 0;
  dragOffsetY = 0;
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

function updateModalImageTransform() {
  if (modalImageElement) {
    modalImageElement.style.transform = `scale(${modalZoomLevel}) translate(${dragOffsetX}px, ${dragOffsetY}px)`;
  }
}

function handleModalWheel(e) {
  if (!modalImageElement) return;
  
  e.preventDefault();
  
  const zoomSpeed = 0.1;
  const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
  const newZoom = Math.max(0.5, Math.min(3, modalZoomLevel + delta));
  
  if (newZoom !== modalZoomLevel) {
    modalZoomLevel = newZoom;
    updateModalImageTransform();
  }
}

function handleModalMouseDown(e) {
  if (!modalImageElement || e.button !== 0) return; // Only left mouse button
  
  isDragging = true;
  dragStartX = e.clientX - dragOffsetX;
  dragStartY = e.clientY - dragOffsetY;
  
  // Change cursor to indicate dragging
  modalImageElement.style.cursor = 'grabbing';
  
  e.preventDefault();
}

function handleModalMouseMove(e) {
  if (!isDragging || !modalImageElement) return;
  
  dragOffsetX = e.clientX - dragStartX;
  dragOffsetY = e.clientY - dragStartY;
  
  updateModalImageTransform();
  
  e.preventDefault();
}

function handleModalMouseUp(e) {
  if (!modalImageElement) return;
  
  isDragging = false;
  
  // Change cursor back to zoom-in
  modalImageElement.style.cursor = 'zoom-in';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeImageModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeImageModal();
    }
  });
  
  // Add wheel event listener for zooming
  modal.addEventListener('wheel', handleModalWheel, { passive: false });
  
  // Add mouse event listeners for dragging
  modal.addEventListener('mousedown', handleModalMouseDown);
  document.addEventListener('mousemove', handleModalMouseMove);
  document.addEventListener('mouseup', handleModalMouseUp);
});
