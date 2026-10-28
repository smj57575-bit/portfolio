// Main: 프로젝트 카드 클릭 이벤트 (슬라이더가 복제한 카드도 받도록 위임)
document.addEventListener('click', e => {
    const project = e.target.closest('.project');
    if (!project) return;

    // 내부 링크(chip)를 클릭한 경우는 무시
    if (e.target.closest('.chip') || e.target.closest('.project__links a')) {
        return;
    }

    // 프로젝트 번호 가져오기 (복제 카드는 data-project 에 원본 id 보관)
    const projectId = project.dataset.project || project.id; // project-1, project-2 등
    const projectNum = projectId.split('-')[1];
    window.location.href = `detail-${projectNum}.html`;
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
// 화면 왼쪽에서 세 번째 자리(1200px 미만은 두 번째, 모바일은 첫 번째)에 온 카드를 확대(.is-focus)
const worksSlider = document.querySelector('.projects.swiper');

if (worksSlider && window.Swiper) {
    const counter = document.querySelector('.works .section-label__count');
    const total = worksSlider.querySelectorAll('.swiper-slide').length;
    const focusShift = () => (window.innerWidth >= 1200 ? 2 : window.innerWidth >= 641 ? 1 : 0);

    const setFocus = (swiper) => {
        const index = Math.min(swiper.activeIndex + focusShift(), total - 1);

        swiper.slides.forEach((slide, i) => slide.classList.toggle('is-focus', i === index));
        counter?.style.setProperty('--progress', (index + 1) / total);
    };

    // 마지막 카드도 확대 자리까지 올 수 있도록 끝에 여백을 둔다
    const setTailSpace = (swiper) => {
        const shift = focusShift();
        const [first, second] = swiper.slides;
        const step = second.offsetLeft - first.offsetLeft;
        const overlap = first.offsetWidth - step;
        const tail = shift ? Math.max(Math.round(swiper.width - (shift + 1) * step - overlap), 0) : 0;

        if (swiper.params.slidesOffsetAfter !== tail) {
            swiper.params.slidesOffsetAfter = tail;
            swiper.update();
        }
    };

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
        on: {
            afterInit(swiper) { setTailSpace(swiper); setFocus(swiper); },
            resize(swiper) { setTailSpace(swiper); setFocus(swiper); },
            slideChange: setFocus,
        },
    });
}

// Index: 상단 메뉴 노출 시점과 지금 보고 있는 영역 표시 (스크롤 위치 기준)
const sectionLinks = document.querySelectorAll('.home .nav a[href^="#"]');

if (sectionLinks.length) {
    const sections = [...sectionLinks].map(link => document.querySelector(link.getAttribute('href')));
    const sectionNav = sectionLinks[0].closest('.nav');
    const contentTabs = document.querySelector('.contents');
    let navTicking = false;

    const markCurrent = () => {
        navTicking = false;
        // 첫 화면의 목차 탭과 기능이 겹치므로, 탭이 상단 메뉴 뒤로 지나간 뒤에만 메뉴를 보여준다
        if (contentTabs) sectionNav.classList.toggle('is-visible', contentTabs.getBoundingClientRect().bottom <= 72);

        // 상단 메뉴 아래 화면 30% 지점을 지난 마지막 영역을 현재 영역으로 본다
        const line = 72 + window.innerHeight * 0.3;
        let current = -1;

        sections.forEach((section, i) => {
            if (section && section.getBoundingClientRect().top <= line) current = i;
        });
        // 메뉴가 보이는 동안은 아직 첫 영역에 닿기 전이어도 맨 처음 항목을 기본 선택
        if (current < 0 && sectionNav.classList.contains('is-visible')) current = 0;
        sectionLinks.forEach((link, i) => {
            link.classList.toggle('is-active', i === current);
            if (i === current) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    };

    window.addEventListener('scroll', () => {
        if (!navTicking) {
            navTicking = true;
            requestAnimationFrame(markCurrent);
        }
    }, { passive: true });
    window.addEventListener('resize', markCurrent);
    markCurrent();
}

// Detail: 같은 분류(메인의 탭) 안에서 이전 · 다음 프로젝트로 이동하는 양옆 버튼
// 순서와 이름은 메인 카드 순서와 맞춘다
const PROJECT_GROUPS = [
    { name: 'Web Publishing', items: [
        ['7', '찰랑 브랜드 웹사이트 신규 구축'],
        ['8', '스텔라 아르투아 퓨어 골드 페이지'],
        ['1', 'DB손해보험 반응형 리뉴얼'],
        ['2', 'OB맥주 FAQ 페이지'],
        ['3', 'IRC국제구조위원회 캠페인 페이지'],
    ] },
    { name: 'Personal Project', items: [
        ['9', 'React 관리자 연동 홈페이지'],
        ['6', 'AI Smart 홈페이지 제작'],
    ] },
];

const detailMain = document.querySelector('.detail-body main');
const detailNum = location.pathname.match(/detail-(\d+)\.html$/)?.[1];
const detailGroup = PROJECT_GROUPS.find(group => group.items.some(([num]) => num === detailNum));

if (detailMain && detailGroup) {
    const index = detailGroup.items.findIndex(([num]) => num === detailNum);
    const pagerLink = (item, dir) => {
        if (!item) return '';
        const [num, title] = item;
        const label = dir === 'prev' ? '이전 프로젝트' : '다음 프로젝트';

        return `<a class="pager__btn pager__btn--${dir}" href="detail-${num}.html" aria-label="${label}: ${title}">
            <span class="pager__arrow" aria-hidden="true">${dir === 'prev' ? '←' : '→'}</span>
            <span class="pager__text"><small>${label}</small><strong>${title}</strong></span>
        </a>`;
    };

    const pager = document.createElement('nav');
    pager.className = 'pager';
    pager.setAttribute('aria-label', `${detailGroup.name} 프로젝트 이동`);
    pager.innerHTML = pagerLink(detailGroup.items[index - 1], 'prev') + pagerLink(detailGroup.items[index + 1], 'next');
    detailMain.appendChild(pager);
}
