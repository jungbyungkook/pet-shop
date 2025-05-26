// 로그인 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 폼 요소들
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const loginBtn = document.getElementById('loginBtn');
    
    // 메시지 요소들
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    
    // 소셜 로그인 버튼들
    const kakaoLoginBtn = document.getElementById('kakaoLogin');
    const naverLoginBtn = document.getElementById('naverLogin');
    const googleLoginBtn = document.getElementById('googleLogin');
    
    // 검증 상태
    let validationState = {
        email: false,
        password: false
    };
    
    // 비밀번호 보기/숨기기 토글
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // 아이콘 변경
        this.textContent = type === 'password' ? '👁' : '🙈';
    });
    
    // 이메일 입력 검증
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email.length === 0) {
            showValidationMessage(emailMessage, '', '');
            validationState.email = false;
        } else if (!isValidEmail(email)) {
            showValidationMessage(emailMessage, '올바른 이메일 형식이 아닙니다.', 'error');
            validationState.email = false;
        } else {
            showValidationMessage(emailMessage, '올바른 이메일 형식입니다.', 'success');
            validationState.email = true;
        }
        
        updateLoginButton();
    });
    
    // 비밀번호 입력 검증
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
            showValidationMessage(passwordMessage, '', '');
            validationState.password = false;
        } else if (password.length < 4) {
            showValidationMessage(passwordMessage, '비밀번호가 너무 짧습니다.', 'error');
            validationState.password = false;
        } else {
            showValidationMessage(passwordMessage, '', '');
            validationState.password = true;
        }
        
        updateLoginButton();
    });
    
    // 로그인 버튼 상태 업데이트
    function updateLoginButton() {
        const isValid = validationState.email && validationState.password;
        loginBtn.disabled = !isValid;
        
        if (isValid) {
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
        } else {
            loginBtn.style.opacity = '0.6';
            loginBtn.style.cursor = 'not-allowed';
        }
    }
    
    // 폼 제출 처리
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (loginBtn.disabled) {
            return;
        }
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;
        
        // 로그인 처리 시작
        loginBtn.disabled = true;
        loginBtn.textContent = '로그인 중...';
        
        // 실제로는 서버에 로그인 요청을 보내야 함
        setTimeout(() => {
            // 시뮬레이션: 특정 이메일/비밀번호로 로그인 성공
            if (email === 'test@jbkone.com' && password === '1234') {
                showSuccessLogin(email, rememberMe);
            } else {
                // 로그인 실패
                showValidationMessage(passwordMessage, '이메일 또는 비밀번호가 올바르지 않습니다.', 'error');
                loginBtn.disabled = false;
                loginBtn.textContent = '로그인';
                
                // 비밀번호 필드 초기화
                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 1500);
    });
    
    // 소셜 로그인 버튼 이벤트
    kakaoLoginBtn.addEventListener('click', function() {
        showNotification('카카오 로그인 기능은 준비 중입니다.');
    });
    
    naverLoginBtn.addEventListener('click', function() {
        showNotification('네이버 로그인 기능은 준비 중입니다.');
    });
    
    googleLoginBtn.addEventListener('click', function() {
        showNotification('구글 로그인 기능은 준비 중입니다.');
    });
    
    // 비밀번호 찾기 링크
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('비밀번호 찾기 기능은 준비 중입니다.');
    });
    
    // 유틸리티 함수들
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showValidationMessage(element, message, type) {
        element.textContent = message;
        element.className = `validation-message ${type}`;
    }
    
    function showNotification(message) {
        // 기존 알림이 있으면 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #8B7355;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-size: 0.9rem;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 3초 후 자동 제거
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    function showSuccessLogin(email, rememberMe) {
        // 로그인 성공 처리
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }
        
        // 성공 모달 생성
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #8B7355; margin-bottom: 1rem;">로그인 성공!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                환영합니다!<br>
                JBKONE에 성공적으로 로그인되었습니다.
            </p>
            <button onclick="window.location.href='index.html'" style="
                background: linear-gradient(135deg, #8B7355 0%, #6d5a44 100%);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                메인페이지로 이동
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 모달 애니메이션
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 100);
    }
    
    // 페이지 로드 시 기억된 이메일 복원
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
        
        // 이메일 검증 트리거
        emailInput.dispatchEvent(new Event('input'));
    }
    
    // 초기 상태 설정
    updateLoginButton();
    
    // 페이지 로드 애니메이션
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // 데모 계정 안내 (개발용)
    console.log('데모 로그인 정보:');
    console.log('이메일: test@jbkone.com');
    console.log('비밀번호: 1234');
}); 