// 회원가입 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 폼 요소들
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    
    // 버튼들
    const emailCheckBtn = document.getElementById('emailCheckBtn');
    const phoneCheckBtn = document.getElementById('phoneCheckBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    // 메시지 요소들
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    const passwordStrength = document.getElementById('passwordStrength');
    
    // 약관 동의
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const termsCheckboxes = document.querySelectorAll('input[name="terms"]');
    
    // 검증 상태
    let validationState = {
        email: false,
        password: false,
        confirmPassword: false,
        phone: false,
        name: false,
        terms: false
    };
    
    // 이메일 중복 확인
    emailCheckBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showValidationMessage(emailMessage, '이메일을 입력해주세요.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showValidationMessage(emailMessage, '올바른 이메일 형식이 아닙니다.', 'error');
            return;
        }
        
        // 실제로는 서버에 요청을 보내야 하지만, 여기서는 시뮬레이션
        this.disabled = true;
        this.textContent = '확인중...';
        
        setTimeout(() => {
            // 랜덤하게 중복/사용가능 결정 (실제로는 서버 응답)
            const isAvailable = Math.random() > 0.3;
            
            if (isAvailable) {
                showValidationMessage(emailMessage, '사용 가능한 이메일입니다.', 'success');
                validationState.email = true;
                emailInput.readOnly = true;
                this.textContent = '확인완료';
                this.style.backgroundColor = '#28a745';
            } else {
                showValidationMessage(emailMessage, '이미 사용중인 이메일입니다.', 'error');
                validationState.email = false;
                this.disabled = false;
                this.textContent = '중복확인';
            }
            
            updateSignupButton();
        }, 1500);
    });
    
    // 이메일 입력 변경 시 중복확인 초기화
    emailInput.addEventListener('input', function() {
        if (emailInput.readOnly) {
            emailInput.readOnly = false;
            emailCheckBtn.disabled = false;
            emailCheckBtn.textContent = '중복확인';
            emailCheckBtn.style.backgroundColor = '#8B7355';
            showValidationMessage(emailMessage, '', '');
            validationState.email = false;
            updateSignupButton();
        }
    });
    
    // 비밀번호 강도 체크
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        passwordStrength.className = `password-strength ${strength.level}`;
        
        if (password.length > 0) {
            if (strength.level === 'weak') {
                passwordStrength.setAttribute('title', '약함: 8자 이상, 영문+숫자+특수문자 조합 필요');
            } else if (strength.level === 'medium') {
                passwordStrength.setAttribute('title', '보통: 더 복잡한 조합 권장');
            } else if (strength.level === 'strong') {
                passwordStrength.setAttribute('title', '강함: 안전한 비밀번호입니다');
            }
        }
        
        validationState.password = strength.level !== 'weak' && password.length >= 8;
        updateSignupButton();
        
        // 비밀번호 확인 재검증
        if (confirmPasswordInput.value) {
            validatePasswordConfirm();
        }
    });
    
    // 비밀번호 확인
    confirmPasswordInput.addEventListener('input', validatePasswordConfirm);
    
    function validatePasswordConfirm() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length === 0) {
            showValidationMessage(passwordMessage, '', '');
            validationState.confirmPassword = false;
        } else if (password === confirmPassword) {
            showValidationMessage(passwordMessage, '비밀번호가 일치합니다.', 'success');
            validationState.confirmPassword = true;
        } else {
            showValidationMessage(passwordMessage, '비밀번호가 일치하지 않습니다.', 'error');
            validationState.confirmPassword = false;
        }
        
        updateSignupButton();
    }
    
    // 휴대폰 번호 포맷팅
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/[^0-9]/g, '');
        
        if (value.length <= 3) {
            this.value = value;
        } else if (value.length <= 7) {
            this.value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            this.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
        }
        
        validationState.phone = false;
        updateSignupButton();
    });
    
    // 휴대폰 인증번호 발송
    phoneCheckBtn.addEventListener('click', function() {
        const phone = phoneInput.value.replace(/[^0-9]/g, '');
        
        if (phone.length !== 11 || !phone.startsWith('010')) {
            alert('올바른 휴대폰 번호를 입력해주세요.');
            return;
        }
        
        this.disabled = true;
        this.textContent = '발송중...';
        
        setTimeout(() => {
            document.getElementById('verificationGroup').style.display = 'block';
            this.textContent = '재발송';
            this.disabled = false;
            
            // 3분 타이머 시작
            startVerificationTimer();
            
            showNotification('인증번호가 발송되었습니다.');
        }, 1000);
    });
    
    // 인증번호 확인
    verifyBtn.addEventListener('click', function() {
        const verificationCode = document.getElementById('verification').value;
        
        if (verificationCode.length !== 6) {
            alert('6자리 인증번호를 입력해주세요.');
            return;
        }
        
        this.disabled = true;
        this.textContent = '확인중...';
        
        setTimeout(() => {
            // 실제로는 서버에서 확인해야 함
            const isValid = verificationCode === '123456' || Math.random() > 0.3;
            
            if (isValid) {
                validationState.phone = true;
                phoneInput.readOnly = true;
                document.getElementById('verification').readOnly = true;
                this.textContent = '인증완료';
                this.style.backgroundColor = '#28a745';
                clearInterval(window.verificationTimer);
                document.getElementById('timer').style.display = 'none';
                showNotification('휴대폰 인증이 완료되었습니다.');
            } else {
                alert('인증번호가 올바르지 않습니다.');
                this.disabled = false;
                this.textContent = '확인';
            }
            
            updateSignupButton();
        }, 1000);
    });
    
    // 이름 입력 검증
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        validationState.name = name.length >= 2;
        updateSignupButton();
    });
    
    // 전체 동의 체크박스
    agreeAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        
        termsCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        
        // 마케팅 동의도 함께 체크
        document.querySelectorAll('input[name="emailMarketing"], input[name="smsMarketing"]').forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        
        validateTerms();
    });
    
    // 개별 약관 체크박스
    termsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 전체 동의 체크박스 상태 업데이트
            const allChecked = Array.from(termsCheckboxes).every(cb => cb.checked);
            agreeAllCheckbox.checked = allChecked;
            
            validateTerms();
        });
    });
    
    function validateTerms() {
        const requiredTerms = Array.from(termsCheckboxes).filter(cb => cb.required);
        validationState.terms = requiredTerms.every(cb => cb.checked);
        updateSignupButton();
    }
    
    // 회원가입 버튼 상태 업데이트
    function updateSignupButton() {
        const isValid = Object.values(validationState).every(state => state === true);
        signupBtn.disabled = !isValid;
        
        if (isValid) {
            signupBtn.style.opacity = '1';
            signupBtn.style.cursor = 'pointer';
        } else {
            signupBtn.style.opacity = '0.6';
            signupBtn.style.cursor = 'not-allowed';
        }
    }
    
    // 폼 제출
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (signupBtn.disabled) {
            return;
        }
        
        signupBtn.disabled = true;
        signupBtn.textContent = '가입 처리중...';
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const userData = {};
        
        for (let [key, value] of formData.entries()) {
            if (userData[key]) {
                if (Array.isArray(userData[key])) {
                    userData[key].push(value);
                } else {
                    userData[key] = [userData[key], value];
                }
            } else {
                userData[key] = value;
            }
        }
        
        // 실제로는 서버에 데이터 전송
        setTimeout(() => {
            showSuccessModal();
        }, 2000);
    });
    
    // 인증 타이머
    function startVerificationTimer() {
        let timeLeft = 180; // 3분
        const timerElement = document.getElementById('timer');
        
        window.verificationTimer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(window.verificationTimer);
                timerElement.textContent = '시간 만료';
                timerElement.style.color = '#dc3545';
                verifyBtn.disabled = true;
                verifyBtn.textContent = '시간만료';
            }
            
            timeLeft--;
        }, 1000);
    }
    
    // 유틸리티 함수들
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function checkPasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        if (score < 3) {
            return { level: 'weak', score };
        } else if (score < 5) {
            return { level: 'medium', score };
        } else {
            return { level: 'strong', score };
        }
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
    
    function showSuccessModal() {
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
            <h2 style="color: #8B7355; margin-bottom: 1rem;">회원가입 완료!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                JBKONE 가족이 되신 것을 환영합니다!<br>
                가입 축하 적립금 5,000원과<br>
                첫 구매 10% 할인 쿠폰이 지급되었습니다.
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
    
    // 초기 상태 설정
    updateSignupButton();
    
    // 페이지 로드 애니메이션
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}); 