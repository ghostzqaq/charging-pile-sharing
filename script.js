// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化导航栏
    initNavbar();
    
    // 初始化充电桩动画
    initChargingStation();
    
    // 初始化卡片悬停效果
    initCardHoverEffects();
    
    // 初始化图表动画
    initChartAnimations();
});

// 粒子背景配置
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#2e7d32', '#4caf50', '#81c784', '#a5d6a7']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4caf50',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 导航栏初始化
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接后关闭移动菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 滚动动画初始化
function initScrollAnimations() {
    // 创建IntersectionObserver实例
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是增长图表，添加动画
                if (entry.target.classList.contains('chart-bar')) {
                    animateChartBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(
        '.section-title, .tech-card, .market-item, .economy-card, .pros-item, .cons-item, .chart-bar'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 充电桩动画初始化
function initChargingStation() {
    const chargingStation = document.querySelector('.charging-station');
    const progressFill = document.querySelector('.progress-fill');
    const energyPulse = document.querySelector('.energy-pulse');
    
    // 添加鼠标悬停效果
    chargingStation.addEventListener('mouseenter', () => {
        chargingStation.style.transform = 'scale(1.1)';
        progressFill.style.width = '95%';
        progressFill.style.backgroundColor = '#4cd964';
        
        // 增加能量脉冲频率
        energyPulse.style.animationDuration = '1.5s';
    });
    
    chargingStation.addEventListener('mouseleave', () => {
        chargingStation.style.transform = 'scale(1)';
        progressFill.style.width = '85%';
        progressFill.style.backgroundColor = '#4cd964';
        energyPulse.style.animationDuration = '3s';
    });
    
    // 模拟充电过程
    let charging = true;
    setInterval(() => {
        if (charging) {
            let currentWidth = parseInt(progressFill.style.width) || 85;
            if (currentWidth < 95) {
                progressFill.style.width = (currentWidth + 1) + '%';
            } else {
                charging = false;
            }
        } else {
            let currentWidth = parseInt(progressFill.style.width) || 95;
            if (currentWidth > 85) {
                progressFill.style.width = (currentWidth - 1) + '%';
            } else {
                charging = true;
            }
        }
    }, 1000);
}

// 卡片悬停效果初始化
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.tech-card, .economy-card, .pros-item, .cons-item');
    
    cards.forEach(card => {
        // 添加鼠标进入效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // 如果是技术卡片，放大图标
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.backgroundColor = '#2e7d32';
            }
        });
        
        // 添加鼠标离开效果
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            
            // 如果是技术卡片，恢复图标
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.backgroundColor = '#60ad5e';
            }
        });
    });
}

// 图表动画初始化
function initChartAnimations() {
    // 增长图表动画
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        // 设置初始高度为0，动画会从0增长到设定高度
        const finalHeight = bar.style.height;
        bar.style.height = '0%';
        bar.dataset.finalHeight = finalHeight;
    });
    
    // 收益图表动画
    const revenueBars = document.querySelectorAll('.revenue-bar');
    revenueBars.forEach(bar => {
        // 设置初始宽度为0，动画会从0增长到设定宽度
        const finalWidth = bar.style.width;
        bar.style.width = '0%';
        bar.dataset.finalWidth = finalWidth;
    });
}

// 图表柱状动画
function animateChartBar(bar) {
    if (bar.classList.contains('chart-bar')) {
        // 增长图表柱状动画
        const finalHeight = bar.dataset.finalHeight;
        let currentHeight = 0;
        
        const growInterval = setInterval(() => {
            if (currentHeight < parseInt(finalHeight)) {
                currentHeight += 2;
                bar.style.height = currentHeight + '%';
            } else {
                clearInterval(growInterval);
            }
        }, 20);
    } else if (bar.classList.contains('revenue-bar')) {
        // 收益图表柱状动画
        const finalWidth = bar.dataset.finalWidth;
        let currentWidth = 0;
        
        const growInterval = setInterval(() => {
            if (currentWidth < parseInt(finalWidth)) {
                currentWidth += 2;
                bar.style.width = currentWidth + '%';
            } else {
                clearInterval(growInterval);
            }
        }, 20);
    }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 添加视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .tech-icon, .market-visual');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 添加加载完成后的特殊动画
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        heroTitle.style.animation = 'fadeInUp 1s forwards 0.3s, pulse 2s infinite 1.5s';
    }, 1000);
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    // 按空格键或向下箭头键滚动到下一部分
    if (e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        const sections = document.querySelectorAll('section');
        const currentScroll = window.pageYOffset;
        
        for (let i = 0; i < sections.length; i++) {
            const sectionTop = sections[i].offsetTop - 100;
            
            if (sectionTop > currentScroll) {
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }
    
    // 按向上箭头键滚动到上一部分
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        
        const sections = document.querySelectorAll('section');
        const currentScroll = window.pageYOffset;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const sectionTop = sections[i].offsetTop - 100;
            
            if (sectionTop < currentScroll - 50) {
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }
});

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 页面变为可见时，重新激活动画
        document.querySelectorAll('.tech-card, .market-item, .economy-card, .pros-item, .cons-item').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
});

// 检查元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 添加窗口调整大小时的处理
window.addEventListener('resize', () => {
    // 重新初始化粒子效果（如果窗口大小变化）
    if (typeof particlesJS !== 'undefined') {
        setTimeout(() => {
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }, 300);
    }
});

// 添加控制台欢迎信息
console.log(`
%c欢迎访问闲置私有充电桩共享化方案网站！%c
%c开发者: ghostzqaq%c
%cGitHub: https://github.com/ghostzqaq%c
`, 
'color: #2e7d32; font-size: 18px; font-weight: bold;', 
'color: #666; font-size: 14px;',
'color: #4caf50; font-size: 14px;',
'color: #666; font-size: 14px;',
'color: #4caf50; font-size: 14px;',
'color: #666; font-size: 14px;'
);

// 添加错误处理
window.addEventListener('error', (e) => {
    console.error('页面发生错误:', e.error);
});

// 性能监控（简单版）
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`页面加载耗时: ${loadTime}ms`);
});