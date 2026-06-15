// 프로젝트 카드 클릭 이벤트
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
