/**
 * CANVA TUTORIAL - CANVA 02 ENGINE & SECURITY SYSTEM
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const toast = document.getElementById('toast');
    const securityOverlay = document.getElementById('security-overlay');

    const THEME_KEY = 'canva_theme_mode_02';

    // --- Initialize ---
    initTheme();
    bindEvents();
    initSecuritySystem();

    // --- Theme Manager ---
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            updateThemeButton(true);
        } else {
            document.body.classList.remove('light-mode');
            updateThemeButton(false);
        }
    }

    function toggleTheme() {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        updateThemeButton(isLight);
        showToast(isLight ? '☀️ 라이트 모드로 변경되었습니다.' : '🌙 다크 모드로 변경되었습니다.');
    }

    function updateThemeButton(isLight) {
        if (!themeToggleBtn) return;
        if (isLight) {
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> 다크 모드`;
        } else {
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> 라이트 모드`;
        }
    }

    // --- Event Listeners Bindings ---
    function bindEvents() {
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleTheme);
        }

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-copy');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    const textToCopy = targetEl.textContent.trim();
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showToast('📋 프롬프트가 클립보드에 복사되었습니다!');
                    }).catch(err => {
                        console.error('Copy failed:', err);
                    });
                }
            });
        });
    }

    // --- Security & Anti-Capture Protection ---
    function initSecuritySystem() {
        // 1. Context Menu (Right Click) Prevention
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showToast('🛡️ 저작권 보호를 위해 우클릭이 금지되어 있습니다.');
            return false;
        });

        // 2. Drag & Selection Prevention
        document.addEventListener('selectstart', (e) => e.preventDefault());
        document.addEventListener('dragstart', (e) => e.preventDefault());

        // 3. Copy / Cut Prevention
        document.addEventListener('copy', (e) => {
            e.preventDefault();
            showToast('🚫 무단 복제 및 텍스트 복사가 금지되어 있습니다.');
            return false;
        });

        document.addEventListener('cut', (e) => {
            e.preventDefault();
            return false;
        });

        // 4. Hotkeys Blocking (F12, Ctrl+U, Ctrl+S, Ctrl+P, Shift+Win+S, PrintScreen)
        document.addEventListener('keydown', (e) => {
            // F12 (DevTools)
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                showToast('🚫 개발자 도구 실행이 금지되어 있습니다.');
                return false;
            }

            // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
                e.preventDefault();
                showToast('🚫 개발자 도구 실행이 금지되어 있습니다.');
                return false;
            }

            // Ctrl+U (Source Code)
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                showToast('🚫 소스 보기 기능이 금지되어 있습니다.');
                return false;
            }

            // Ctrl+S (Save Page)
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                showToast('🚫 페이지 저장이 금지되어 있습니다.');
                return false;
            }

            // Ctrl+P (Print)
            if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                showToast('🚫 교안 인쇄 및 PDF 저장이 금지되어 있습니다.');
                return false;
            }

            // PrintScreen / Win+Shift+S (Capture notification)
            if (e.key === 'PrintScreen' || e.keyCode === 44 || (e.key === 'S' && e.shiftKey && (e.metaKey || e.key === 'Meta'))) {
                showToast('🚫 저작권 보호를 위해 화면 캡처가 금지되어 있습니다.');
            }
        });
    }

    // --- Toast Notification ---
    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }
});

