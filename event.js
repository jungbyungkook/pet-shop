// 이벤트 페이지 JavaScript

// 카운트다운 타이머 기능
function updateCountdown() {
    const timers = document.querySelectorAll('.timer-value');
    
    timers.forEach(timer => {
        const timeText = timer.textContent;
        const [hours, minutes, seconds] = timeText.split(':').map(Number);
        
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds > 0) {
            totalSeconds--;
            
            const newHours = Math.floor(totalSeconds / 3600);
            const newMinutes = Math.floor((totalSeconds % 3600) / 60);
            const newSeconds = totalSeconds % 60;
            
            timer.textContent = 
                `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        } else {
            timer.textContent = '00:00:00';
            timer.style.color = '#ff6b6b';
        }
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 카운트다운 타이머 시작
    setInterval(updateCountdown, 1000);
    
    // 이벤트 버튼 클릭 이벤트
    const eventBtns = document.querySelectorAll('.event-btn');
    eventBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('이벤트 참여 기능은 준비 중입니다!');
        });
    });
    
    // 특가 상품 구매 버튼 클릭 이벤트
    const specialBtns = document.querySelectorAll('.add-to-cart-btn.special');
    specialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            if (confirm(`${productName}을(를) 장바구니에 담으시겠습니까?`)) {
                // 장바구니에 추가하는 로직 (실제 구현 시 cart.js와 연동)
                alert('장바구니에 추가되었습니다!');
                
                // 장바구니 카운트 업데이트
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent) || 0;
                    cartCount.textContent = currentCount + 1;
                }
            }
        });
    });
    
    // 위시리스트 버튼 클릭 이벤트
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.textContent === '♡') {
                btn.textContent = '♥';
                btn.style.color = '#ff6b6b';
                alert('위시리스트에 추가되었습니다!');
            } else {
                btn.textContent = '♡';
                btn.style.color = '#666';
                alert('위시리스트에서 제거되었습니다!');
            }
        });
    });
    
    // 빠른 보기 버튼 클릭 이벤트
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('빠른 보기 기능은 준비 중입니다!');
        });
    });
    
    // 재고 부족 알림
    const stockCounts = document.querySelectorAll('.stock-count');
    stockCounts.forEach(stock => {
        const count = parseInt(stock.textContent);
        if (count <= 10) {
            stock.style.color = '#ff6b6b';
            stock.style.fontWeight = 'bold';
            
            // 깜빡이는 효과
            setInterval(() => {
                stock.style.opacity = stock.style.opacity === '0.5' ? '1' : '0.5';
            }, 1000);
        }
    });
});

// 스크롤 애니메이션
function animateOnScroll() {
    const cards = document.querySelectorAll('.event-card, .product-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// 초기 스타일 설정
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.event-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', animateOnScroll);
    
    // 페이지 로드 시 한 번 실행
    animateOnScroll();
}); 