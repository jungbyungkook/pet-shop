// 고객센터 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ 토글 기능
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 현재 아이템이 활성화되어 있는지 확인
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 아이템 비활성화
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // 클릭된 아이템이 비활성화 상태였다면 활성화
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 문의 폼 제출 처리
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 간단한 유효성 검사
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            if (!data.privacy) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                return;
            }
            
            // 실제로는 서버로 데이터를 전송해야 하지만, 
            // 여기서는 성공 메시지만 표시
            alert('문의가 성공적으로 접수되었습니다.\n빠른 시일 내에 답변드리겠습니다.');
            
            // 폼 초기화
            contactForm.reset();
        });
    }

    // 전화번호 클릭 시 확인 메시지
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            if (!confirm('고객센터로 전화를 걸까요?')) {
                e.preventDefault();
            }
        });
    }

    // 이메일 링크 클릭 시 확인 메시지
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            if (!confirm('이메일 앱을 열까요?')) {
                e.preventDefault();
            }
        });
    }
}); 