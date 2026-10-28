// Main: 프로젝트 카드 클릭 이벤트
document.querySelectorAll('.project').forEach(project => {
    project.style.cursor = 'pointer';
    project.addEventListener('click', function(e) {
        // 내부 링크(chip)를 클릭한 경우는 무시
        if (e.target.closest('.chip') || e.target.closest('.project__links a')) {
            return;
        }

        // 프로젝트 번호 가져오기
        const projectId = this.id; // project-1, project-2 등
        const projectNum = projectId.split('-')[1];
        window.location.href = `detail-${projectNum}.html`;
    });
});

// Detail: 코드 하이라이트 및 홈 이동
if (window.hljs) {
    hljs.highlightAll();
}

document.querySelector('.brand')?.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Index: 디자인 게시판 분류 필터
const designFilters = document.querySelectorAll('.design-filter .filter-chip');
const designCards = document.querySelectorAll('.design-grid .design-card');

designFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.filter;

        designFilters.forEach(b => b.classList.toggle('is-active', b === btn));
        designCards.forEach(card => {
            card.hidden = target !== 'all' && card.dataset.cat !== target;
        });
    });
});

// Index: 디자인 이미지 뷰어 (클릭 시 너비 100%로 원본 표시)
const viewer = document.querySelector('.viewer');

if (viewer) {
    const viewerImg = viewer.querySelector('.viewer__img');
    const viewerTitle = viewer.querySelector('.viewer__title');
    const viewerCat = viewer.querySelector('.viewer__cat');
    let lastFocused = null;

    const stage = viewer.querySelector('.viewer__stage');
    const zoomLevelBtn = viewer.querySelector('.zoom-level');
    const zoomSteps = [20, 30, 50, 75, 100, 125, 150, 200, 300];
    let zoomIndex = zoomSteps.indexOf(100);

    const applyZoom = () => {
        const percent = zoomSteps[zoomIndex];

        // 100%는 기본 폭(화면 또는 1200px)에 맞추고, 그 이상은 배율만큼 넓힌다
        stage.style.width = percent === 100 ? '' : `calc(min(100%, 1200px) * ${percent / 100})`;
        stage.style.maxWidth = percent > 100 ? 'none' : '';
        zoomLevelBtn.textContent = `${percent}%`;
        viewer.querySelector('[data-zoom="out"]').disabled = zoomIndex === 0;
        viewer.querySelector('[data-zoom="in"]').disabled = zoomIndex === zoomSteps.length - 1;
    };

    const setZoom = (index) => {
        zoomIndex = Math.min(Math.max(index, 0), zoomSteps.length - 1);
        applyZoom();
    };

    const openViewer = (link) => {
        const card = link.closest('.design-card');

        lastFocused = link;
        viewerImg.src = link.getAttribute('href');
        viewerImg.alt = card.querySelector('.design-card__title').textContent;
        viewerTitle.textContent = viewerImg.alt;
        viewerCat.textContent = card.querySelector('.design-card__cat').textContent;
        viewer.hidden = false;
        viewer.scrollTop = 0;
        viewer.scrollLeft = 0;
        setZoom(zoomSteps.indexOf(100));
        document.body.classList.add('is-viewer-open');
        viewer.querySelector('.viewer__close').focus();
    };

    const closeViewer = () => {
        viewer.hidden = true;
        viewerImg.removeAttribute('src');
        document.body.classList.remove('is-viewer-open');
        lastFocused?.focus();
    };

    document.querySelectorAll('.design-card a').forEach(link => {
        link.addEventListener('click', e => {
            // 새 탭으로 열려는 조작(⌘/Ctrl/휠클릭)은 그대로 둠
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            openViewer(link);
        });
    });

    viewer.addEventListener('click', e => {
        const zoomBtn = e.target.closest('[data-zoom]');

        if (zoomBtn) {
            setZoom(zoomIndex + (zoomBtn.dataset.zoom === 'in' ? 1 : -1));
            return;
        }
        if (e.target.closest('.zoom-level')) {
            setZoom(zoomSteps.indexOf(100));
            return;
        }
        if (e.target === viewer || e.target === stage || e.target.closest('.viewer__close')) closeViewer();
    });

    document.addEventListener('keydown', e => {
        if (viewer.hidden) return;

        if (e.key === 'Escape') closeViewer();
        else if (e.key === '+' || e.key === '=') setZoom(zoomIndex + 1);
        else if (e.key === '-' || e.key === '_') setZoom(zoomIndex - 1);
        else if (e.key === '0') setZoom(zoomSteps.indexOf(100));
    });
}

// Index: Web Publishing 카드 슬라이더 (마우스 드래그 · 터치 스와이프 · 화살표 버튼)
const worksSlider = document.querySelector('.projects.swiper');

if (worksSlider && window.Swiper) {
    const counter = document.querySelector('.works .section-label__count');
    const setProgress = (swiper) => counter?.style.setProperty('--progress', Math.max(swiper.progress, 0.06));

    new Swiper(worksSlider, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        grabCursor: true,
        speed: 600,
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: {
            prevEl: '.works__btn--prev',
            nextEl: '.works__btn--next',
            disabledClass: 'is-disabled',
        },
        a11y: { prevSlideMessage: '이전 프로젝트', nextSlideMessage: '다음 프로젝트' },
        // PC에서는 카드가 겹쳐 보이도록 간격을 음수로
        breakpoints: { 641: { spaceBetween: -56 } },
        on: { init: setProgress, progress: setProgress },
    });
}
