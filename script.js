// 基本交互脚本：汉堡菜单、滚动导航、高亮/可视化动画，以及 particles 初始化（如可用）.

document.addEventListener('DOMContentLoaded', function () {
    // 汉堡菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // 点击菜单项后自动关闭（移动端）
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // 顶部导航滚动效果
    const navbar = document.querySelector('.navbar');
    const scrollHandler = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', scrollHandler);
    scrollHandler();

    // IntersectionObserver：当元素进入视口时添加 visible 类
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const revealCallback = (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 如果只需要触发一次可以取消观察
                obs.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

    // 需要观察的选择器
    const toReveal = document.querySelectorAll(
        '.section-title, .tech-card, .market-item, .economy-card, .pros-item, .cons-item'
    );
    toReveal.forEach(el => {
        revealObserver.observe(el);
    });

    // 可视化的 chart bars/其它（可扩展）
    // 如果你想要当 growth-chart 进入视口时动画增长条高度，可以在这里添加逻辑
    const barObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach(b => {
                    // 如果使用内联 style height 作为最终高度，本处不覆盖
                    // 这里可以触发 CSS 动画或添加类
                    b.style.transition = 'height 1s ease';
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const growthChart = document.querySelector('.growth-chart');
    if (growthChart) barObserver.observe(growthChart);

    // particles.js 初始化（如果库加载成功）
    if (window.particlesJS) {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: '#2e7d32' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.2, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 120, color: '#2e7d32', opacity: 0.08, width: 1 },
                    move: { enable: true, speed: 2, straight: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        repulse: { distance: 100 },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        } catch (e) {
            // 如果 particles 初始化失败，不做任何事（保证页面继续工作）
            console.warn('particles.js init failed:', e);
        }
    }

    // 可选：页面加载后平滑滚动到锚点（如果点击了 nav-link，浏览器原生已经支持 smooth）
    // 还可以根据固定导航高度调整偏移：
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(a => {
        a.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    // 阻止默认跳转，使用自定义平滑滚动并考虑导航栏高度
                    e.preventDefault();
                    const navHeight = document.querySelector('.nav-container')?.offsetHeight || 70;
                    const rect = targetEl.getBoundingClientRect();
                    const top = window.scrollY + rect.top - navHeight + 8; // 适当留空隙
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });
});