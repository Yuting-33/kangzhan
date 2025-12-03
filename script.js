// script.js - 修复版本

// 轮播功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function autoSlide() {
    changeSlide(1);
}

// 视频数据
const videoData = [
    {
        title: "勿忘国耻 吾辈自强",
        description: "热烈庆祝抗战胜利八十周年！此片铭记历史，缅怀先烈",
        duration: "05:23",
        url: "embed",
        embedCode: '<iframe src="https://player.bilibili.com/player.html?bvid=BV1RV5uzvErh&high_quality=1&danmaku=0&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>'
    },
    {
        title: "央视抗战胜利八十周年",
        description: "央视纪念中国人民抗战胜利八十周年特别视频",
        duration: "08:15",
        url: "embed",
        embedCode: '<iframe src="https://player.bilibili.com/player.html?bvid=BV1CH1hBBEyB&high_quality=1&danmaku=0&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>'
    },
    {
        title: "中国抗战历史超燃混剪",
        description: "这段历史我们不能忘，向先烈致敬！",
        duration: "06:42",
        url: "embed",
        embedCode: '<iframe src="https://player.bilibili.com/player.html?bvid=BV13e411S71n&high_quality=1&danmaku=0&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>'
    },
    {
        title: "抗战胜利80周年主题动画",
        description: "抗战胜利80周年主题动画，有点泪奔！",
        duration: "07:30",
        url: "embed",
        embedCode: '<iframe src="https://player.bilibili.com/player.html?bvid=BV1BfaPz3E1b&high_quality=1&danmaku=0&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>'
    }
];

// 全局变量
let currentVideoIndex = 0;

// 选择视频函数
function selectVideo(index) {

    console.log(`选择视频: ${index}`);
    currentVideoIndex = index;
    
    // 调试：检查DOM元素是否存在
    const playlistItems = document.querySelectorAll('.playlist-item');
    console.log(`找到播放列表项: ${playlistItems.length}`);
    
    // 更新活动状态
    playlistItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            console.log(`激活项目: ${i}`);
        } else {
            item.classList.remove('active');
        }
    });




    currentVideoIndex = index;
    
    // 更新活动状态
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 加载视频
    const video = videoData[index];
    if (video) {
        const videoWrapper = document.querySelector('.video-wrapper');
        if (videoWrapper) {
            videoWrapper.innerHTML = '';
            
            const iframe = document.createElement('iframe');
            iframe.src = `https://player.bilibili.com/player.html?bvid=${getBvidFromEmbedCode(video.embedCode)}&high_quality=1&danmaku=0&autoplay=false`;
            iframe.scrolling = 'no';
            iframe.border = '0';
            iframe.frameBorder = 'no';
            iframe.framespacing = '0';
            iframe.allowFullscreen = 'true';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '15px';
            
            videoWrapper.appendChild(iframe);
        }
    }
    
    // 滚动到视频区域
    document.getElementById('video-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// 从嵌入代码中提取BVID
function getBvidFromEmbedCode(embedCode) {
    const match = embedCode.match(/bvid=([^&]+)/);
    return match ? match[1] : '';
}

// 保存滚动位置
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    sessionStorage.setItem('timestamp', Date.now());
}

// 恢复滚动位置
function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    const timestamp = sessionStorage.getItem('timestamp');
    
    // 检查是否有保存的滚动位置，且时间不超过30分钟
    if (scrollPosition && timestamp && (Date.now() - parseInt(timestamp)) < 30 * 60 * 1000) {
        // 延迟恢复滚动位置，确保页面完全加载
        setTimeout(() => {
            window.scrollTo(0, parseInt(scrollPosition));
            console.log(`恢复滚动位置: ${scrollPosition}px`);
        }, 100);
    }
}

// 初始化函数
function initializeApp() {
    console.log('初始化应用...');
    
    // 恢复滚动位置
    restoreScrollPosition();
    
    // 初始化第一个视频
    selectVideo(0);
}

// 确保DOM完全加载后执行
function waitForDOM() {
    if (document.querySelector('.playlist-items')) {
        initializeApp();
    } else {
        setTimeout(waitForDOM, 100);
    }
}

// 字体加载检测
function ensureFontsLoaded() {
    // 检查字体是否加载完成
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() {
            console.log('字体加载完成');
            // 强制重新渲染文本
            const textElements = document.querySelectorAll('.item-info h4, .item-info p, .playlist-header h3');
            textElements.forEach(el => {
                el.style.display = 'none';
                el.offsetHeight; // 触发重排
                el.style.display = '';
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    ensureFontsLoaded();
    console.log('页面加载完成，开始初始化...');
    
    // 初始化轮播
    if (slides.length > 0) {
        showSlide(0);
        setInterval(autoSlide, 5000);
    }
    
    // 等待DOM完全加载
    waitForDOM();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #8b0000 0%, #c41e3a 100%)';
        } else if (navbar) {
            navbar.style.background = 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)';
        }
        
        // 保存滚动位置
        saveScrollPosition();
    });
    
    // 元素动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.hero-card, .spirit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // 英雄卡片点击
    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', function() {
            const info = this.querySelector('.hero-info p');
            if (info) {
                if (info.style.maxHeight) {
                    info.style.maxHeight = null;
                } else {
                    info.style.maxHeight = info.scrollHeight + "px";
                }
            }
        });
    });
    
    // 触摸滑动支持
    const carousel = document.getElementById('history-carousel');
    if (carousel) {
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            if (endX < startX - 50) {
                changeSlide(1);
            } else if (endX > startX + 50) {
                changeSlide(-1);
            }
        });
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('#video-section')) {
            if (e.key === ' ') {
                e.preventDefault();
                // togglePlayPause(); // 暂时注释，因为函数未定义
            } else if (e.key === 'ArrowRight') {
                selectVideo((currentVideoIndex + 1) % videoData.length);
            } else if (e.key === 'ArrowLeft') {
                selectVideo((currentVideoIndex - 1 + videoData.length) % videoData.length);
            }
        }
    });
    
    // 页面卸载前保存滚动位置
    window.addEventListener('beforeunload', function() {
        saveScrollPosition();
    });
});

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        saveScrollPosition();
    }
});

// 移动端菜单功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建移动端菜单按钮
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', '切换菜单');
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        navContainer.appendChild(menuToggle);
        
        // 菜单切换功能
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // 点击导航链接后关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }
});


let litCount = 0;

function lightCandle(candleElement) {
    const wrapper = candleElement.closest('.candle-wrapper');
    
    if (!candleElement.classList.contains('lit')) {
        candleElement.classList.add('lit');
        litCount++;
        
        // 添加点亮动画
        createLightEffect(wrapper);
        
        // 播放音效
        playLightSound();
        
        // 更新统计
        updateStats();
        
        // 保存状态
        saveCandleState(wrapper.dataset.candleId, true);
    } else {
        candleElement.classList.remove('lit');
        litCount--;
        updateStats();
        saveCandleState(wrapper.dataset.candleId, false);
    }
}

function createLightEffect(wrapper) {
    const light = document.createElement('div');
    light.className = 'light-effect';
    light.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(255,152,0,0.4) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: lightExpand 1s ease-out forwards;
    `;
    
    wrapper.appendChild(light);
    
    setTimeout(() => light.remove(), 1000);
}

function playLightSound() {
    // 创建简单的音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function updateStats() {
    document.getElementById('candle-count').textContent = litCount;
}

function saveCandleState(candleId, isLit) {
    const states = JSON.parse(localStorage.getItem('candleStates') || '{}');
    states[candleId] = isLit;
    localStorage.setItem('candleStates', JSON.stringify(states));
}

function loadCandleStates() {
    const states = JSON.parse(localStorage.getItem('candleStates') || '{}');
    Object.keys(states).forEach(candleId => {
        const wrapper = document.querySelector(`[data-candle-id="${candleId}"]`);
        if (wrapper && states[candleId]) {
            const candle = wrapper.querySelector('.candle');
            candle.classList.add('lit');
            litCount++;
        }
    });
    updateStats();
}

// 添加光效动画
const style = document.createElement('style');
style.textContent = `
    @keyframes lightExpand {
        0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(0);
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(3);
        }
    }
`;
document.head.appendChild(style);

// 页面加载时恢复状态
document.addEventListener('DOMContentLoaded', function() {
    loadCandleStates();
});

