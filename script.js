// script.js - 清理版本

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
        title: "抗战全面爆发",
        description: "1937年卢沟桥事变历史回顾，揭开全民族抗战的序幕",
        duration: "05:23",
        poster: "image/抗战全面爆发.png",
        url: "video/抗战全面爆发影像.mp4"
    },
    {
        title: "平型关大捷",
        description: "八路军首战告捷的辉煌时刻，打破日军不可战胜的神话",
        duration: "08:15",
        poster: "image/平型关大捷.png",
        url: "video/平型关大捷.mp4"
    },
    {
        title: "南京保卫战",
        description: "军民同心守卫首都的悲壮史诗，彰显民族不屈精神",
        duration: "06:42",
        poster: "image/南京.png",
        url: "video/南京保卫战.mp4"
    },
    {
        title: "抗战胜利",
        description: "1945年日本投降历史时刻，中华民族的伟大胜利",
        duration: "07:30",
        poster: "image/抗战胜利.png",
        url: "video/抗战胜利.mp4"
    }
];

// 全局变量定义
let currentVideoIndex = 0;
let video = null;
let overlay = null;
let playIcon = null;
let pauseIcon = null;
let progressFilled = null;
let timeDisplay = null;
let volumeInput = null;
let progressContainer = null;

// 选择视频函数
function selectVideo(index) {
    currentVideoIndex = index;
    video.pause();
    overlay.classList.remove('hidden');
    
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    const videoInfo = overlay.querySelector('.video-info');
    videoInfo.innerHTML = `
        <h3>${videoData[index].title}</h3>
        <p>${videoData[index].description}</p>
    `;
    
    video.src = videoData[index].url;
    video.poster = videoData[index].poster;
    video.load();
    
    document.getElementById('video-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// 播放视频函数
function playVideo() {
    video.play().then(() => {
        overlay.classList.add('hidden');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }).catch(error => {
        console.error('播放失败:', error);
    });
}

// 播放/暂停切换函数
function togglePlayPause() {
    if (video.paused) {
        video.play().then(() => {
            overlay.classList.add('hidden');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }).catch(error => {
            console.error('播放失败:', error);
        });
    } else {
        video.pause();
        if (!video.ended) {
            overlay.classList.remove('hidden');
        }
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// 静音切换函数
function toggleMute() {
    video.muted = !video.muted;
}

// 全屏切换函数
function toggleFullscreen() {
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (!document.fullscreenElement) {
        if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
        } else if (videoWrapper.webkitRequestFullscreen) {
            videoWrapper.webkitRequestFullscreen();
        } else if (videoWrapper.msRequestFullscreen) {
            videoWrapper.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 格式化时间
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// 更新音量背景
function updateVolumeBackground(value) {
    volumeInput.style.background = `linear-gradient(to right, #c41e3a 0%, #c41e3a ${value}%, rgba(255, 255, 255, 0.3) ${value}%, rgba(255, 255, 255, 0.3) 100%)`;
}

// 初始化函数
function initializeApp() {
    // 获取视频相关元素
    video = document.getElementById('main-video');
    overlay = document.getElementById('video-overlay');
    playIcon = document.getElementById('play-icon');
    pauseIcon = document.getElementById('pause-icon');
    progressFilled = document.getElementById('progress-filled');
    timeDisplay = document.getElementById('time-display');
    volumeInput = document.getElementById('volume-input');
    progressContainer = document.getElementById('progress-container');
    
    if (!video) {
        console.error('视频元素未找到');
        return;
    }
    
    // 移除默认控件
    video.removeAttribute('controls');
    
    // 绑定视频事件
    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });
    
    video.addEventListener('pause', () => {
        if (!video.ended) {
            overlay.classList.remove('hidden');
        }
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
    
    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressFilled.style.width = '0%';
    });
    
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = percent + '%';
            
            const current = formatTime(video.currentTime);
            const duration = formatTime(video.duration);
            timeDisplay.textContent = `${current} / ${duration}`;
        }
    });
    
    // 绑定控制栏事件
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });
    
    volumeInput.addEventListener('input', (e) => {
        video.volume = e.target.value / 100;
        updateVolumeBackground(e.target.value);
    });
    
    // 覆盖层点击
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });
    
    // 视频点击
    video.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });
    
    // 初始化音量
    video.volume = 0.7;
    updateVolumeBackground(70);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播
    showSlide(0);
    setInterval(autoSlide, 5000);
    
    // 初始化视频
    initializeApp();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #8b0000 0%, #c41e3a 100%)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)';
        }
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
            if (info.style.maxHeight) {
                info.style.maxHeight = null;
            } else {
                info.style.maxHeight = info.scrollHeight + "px";
            }
        });
    });
    
    // 触摸滑动支持
    const carousel = document.getElementById('history-carousel');
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
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('#video-section')) {
            if (e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            } else if (e.key === 'ArrowRight') {
                selectVideo((currentVideoIndex + 1) % videoData.length);
            } else if (e.key === 'ArrowLeft') {
                selectVideo((currentVideoIndex - 1 + videoData.length) % videoData.length);
            }
        }
    });
});
