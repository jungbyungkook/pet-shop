// 전체제품 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 카테고리 필터 기능
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const resultCount = document.querySelector('.result-count');
    
    // 카테고리 필터링
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 활성 버튼 변경
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 제품 필터링
            let visibleCount = 0;
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 결과 개수 업데이트
            updateResultCount(visibleCount, category);
        });
    });
    
    // 결과 개수 업데이트 함수
    function updateResultCount(count, category) {
        const categoryNames = {
            'all': '전체',
            'food': '사료',
            'treats': '간식',
            'care': '케어용품',
            'toys': '장난감',
            'accessories': '액세서리'
        };
        
        const categoryName = categoryNames[category] || '전체';
        resultCount.textContent = `총 ${count}개의 ${categoryName === '전체' ? '제품' : categoryName}`;
    }
    
    // 정렬 기능
    const sortSelect = document.querySelector('.sort-select');
    const productGrid = document.querySelector('.product-grid');
    
    sortSelect.addEventListener('change', function() {
        const sortType = this.value;
        const visibleCards = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        );
        
        visibleCards.sort((a, b) => {
            switch(sortType) {
                case 'price-low':
                    return getPriceValue(a) - getPriceValue(b);
                case 'price-high':
                    return getPriceValue(b) - getPriceValue(a);
                case 'rating':
                    return getRatingValue(b) - getRatingValue(a);
                case 'sales':
                    return getSalesValue(b) - getSalesValue(a);
                case 'newest':
                default:
                    return 0; // 기본 순서 유지
            }
        });
        
        // 정렬된 순서로 DOM 재배치
        visibleCards.forEach(card => {
            productGrid.appendChild(card);
        });
    });
    
    // 가격 값 추출 함수
    function getPriceValue(card) {
        const salePriceElement = card.querySelector('.sale-price');
        if (salePriceElement) {
            return parseInt(salePriceElement.textContent.replace(/[^0-9]/g, ''));
        }
        return 0;
    }
    
    // 평점 값 추출 함수
    function getRatingValue(card) {
        const starsElement = card.querySelector('.stars');
        if (starsElement) {
            const stars = starsElement.textContent;
            return (stars.match(/★/g) || []).length;
        }
        return 0;
    }
    
    // 판매량 값 추출 함수 (리뷰 수로 대체)
    function getSalesValue(card) {
        const reviewElement = card.querySelector('.review-count');
        if (reviewElement) {
            return parseInt(reviewElement.textContent.replace(/[^0-9]/g, ''));
        }
        return 0;
    }
    
    // 페이지네이션 기능
    const pageButtons = document.querySelectorAll('.page-btn');
    const itemsPerPage = 12; // 페이지당 표시할 제품 수
    let currentPage = 1;
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('prev')) {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            } else if (this.classList.contains('next')) {
                const totalPages = Math.ceil(productCards.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            } else if (!isNaN(parseInt(this.textContent))) {
                currentPage = parseInt(this.textContent);
                updatePagination();
            }
        });
    });
    
    // 페이지네이션 업데이트 함수
    function updatePagination() {
        const totalPages = Math.ceil(productCards.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // 제품 표시/숨김
        productCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 페이지 버튼 상태 업데이트
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            
            if (btn.classList.contains('prev')) {
                btn.disabled = currentPage === 1;
            } else if (btn.classList.contains('next')) {
                btn.disabled = currentPage === totalPages;
            } else if (!isNaN(parseInt(btn.textContent))) {
                if (parseInt(btn.textContent) === currentPage) {
                    btn.classList.add('active');
                }
            }
        });
        
        // 스크롤을 페이지 상단으로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 위시리스트 기능
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.textContent === '♡') {
                this.textContent = '♥';
                this.style.color = '#ff6b6b';
                showNotification('위시리스트에 추가되었습니다!');
            } else {
                this.textContent = '♡';
                this.style.color = '#666';
                showNotification('위시리스트에서 제거되었습니다!');
            }
        });
    });
    
    // 빠른 보기 기능
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showNotification('빠른 보기 기능은 준비 중입니다!');
        });
    });
    
    // 장바구니 추가 기능
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            if (confirm(`${productName}을(를) 장바구니에 담으시겠습니까?`)) {
                // 장바구니 카운트 업데이트
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent) || 0;
                    cartCount.textContent = currentCount + 1;
                }
                
                showNotification('장바구니에 추가되었습니다!');
            }
        });
    });
    
    // 알림 표시 함수
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
        
        // 애니메이션 스타일 추가
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
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
    
    // 초기 로드 시 애니메이션
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}); 