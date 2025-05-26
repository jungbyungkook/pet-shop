// 장바구니 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 장바구니 데이터를 localStorage에서 가져오기
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // 장바구니 아이콘의 개수 표시 업데이트
    updateCartCount();
    
    // 장바구니 페이지인 경우 장바구니 내용 표시
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
        
        // 쇼핑 계속하기 버튼 이벤트
        document.querySelector('.continue-shopping').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        // 결제하기 버튼 이벤트
        document.getElementById('checkout-button').addEventListener('click', function() {
            if (cartItems.length > 0) {
                alert('결제 페이지로 이동합니다.');
                // 여기에 결제 페이지로 이동하는 코드 추가
            } else {
                alert('장바구니가 비어있습니다.');
            }
        });
    }
    
    // 상품 상세 페이지인 경우 '장바구니 담기' 버튼 이벤트 추가
    if (window.location.pathname.includes('product-detail')) {
        const addToCartButton = document.querySelector('.add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function() {
                addToCart();
            });
        }
    }
    
    // 장바구니 개수 업데이트 함수
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        });
    }
    
    // 장바구니에 상품 추가 함수
    function addToCart() {
        const productName = document.querySelector('.product-info h1').textContent;
        const productPrice = document.querySelector('.product-info .price').textContent;
        const productImage = document.querySelector('.main-image img').src;
        const sizeSelect = document.getElementById('size');
        const colorSelect = document.getElementById('color');
        const quantityInput = document.getElementById('quantity');
        
        // 사이즈와 컬러가 선택되었는지 확인
        if (sizeSelect.value === '') {
            alert('사이즈를 선택해주세요.');
            return;
        }
        
        if (colorSelect.value === '') {
            alert('컬러를 선택해주세요.');
            return;
        }
        
        const size = sizeSelect.options[sizeSelect.selectedIndex].text;
        const color = colorSelect.options[colorSelect.selectedIndex].text;
        const quantity = parseInt(quantityInput.value);
        
        // 이미 장바구니에 있는지 확인 (동일한 상품, 사이즈, 컬러)
        const existingItemIndex = cartItems.findIndex(item => 
            item.name === productName && 
            item.size === size && 
            item.color === color
        );
        
        if (existingItemIndex !== -1) {
            // 이미 있는 경우 수량만 증가
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // 새 상품 추가
            cartItems.push({
                id: Date.now(), // 고유 ID 생성
                name: productName,
                price: productPrice,
                image: productImage,
                size: size,
                color: color,
                quantity: quantity
            });
        }
        
        // localStorage에 저장
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // 장바구니 개수 업데이트
        updateCartCount();
        
        alert('상품이 장바구니에 추가되었습니다.');
    }
    
    // 장바구니 내용 표시 함수
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');
        
        // 장바구니가 비어있는 경우
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">장바구니가 비어있습니다.</div>';
            subtotalElement.textContent = '0원';
            shippingElement.textContent = '0원';
            totalElement.textContent = '0원';
            return;
        }
        
        // 장바구니 내용 생성
        let cartHTML = '';
        let subtotal = 0;
        
        cartItems.forEach(item => {
            // 가격에서 숫자만 추출
            const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''));
            const itemTotal = priceNumber * item.quantity;
            subtotal += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">${item.price}</p>
                        <p class="item-options">사이즈: ${item.size}, 컬러: ${item.color}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                            <button class="quantity-btn increase">+</button>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item">삭제</button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        
        // 가격 업데이트
        const shipping = subtotal >= 50000 ? 0 : 3000;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = subtotal.toLocaleString() + '원';
        shippingElement.textContent = shipping.toLocaleString() + '원';
        totalElement.textContent = total.toLocaleString() + '원';
        
        // 수량 증가/감소 버튼 이벤트
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        // 상품 삭제 버튼 이벤트
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // 수량 증가 함수
    function increaseQuantity(event) {
        const itemElement = event.target.closest('.cart-item');
        const itemId = parseInt(itemElement.dataset.id);
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems();
            updateCartCount();
        }
    }
    
    // 수량 감소 함수
    function decreaseQuantity(event) {
        const itemElement = event.target.closest('.cart-item');
        const itemId = parseInt(itemElement.dataset.id);
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems();
            updateCartCount();
        }
    }
    
    // 상품 삭제 함수
    function removeItem(event) {
        const itemElement = event.target.closest('.cart-item');
        const itemId = parseInt(itemElement.dataset.id);
        
        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
        updateCartCount();
    }
}); 