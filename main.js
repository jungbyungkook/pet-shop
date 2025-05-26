// 메인 페이지와 상품 목록 페이지 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모든 구매하기 버튼에 이벤트 리스너 추가
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 부모 요소에서 상품 정보 가져오기
            const productCard = this.closest('.product-card');
            const productLink = productCard.querySelector('a').getAttribute('href');
            
            // 상품 상세 페이지로 이동
            if (productLink && productLink !== '#') {
                window.location.href = productLink;
            } else {
                alert('준비 중인 상품입니다.');
            }
        });
    });
}); 