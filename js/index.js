//добавление счётчиков на все элементы

document.addEventListener('click', counterPluss);
document.addEventListener('click', counterMinus);


isCardEmptyAndDelivery()
calculatePrice()
function counterPluss(e){
    if(e.target.dataset.action !== 'plus') return;
    const wrapperItem = e.target.closest('.counter-wrapper');
    const couner = wrapperItem.querySelector('[data-counter]');
    couner.innerText = +couner.innerText + 1;
    calculatePrice()
}



function counterMinus(e){
    if(e.target.dataset.action !== 'minus') return;
    const wrapperItem = e.target.closest('.counter-wrapper');
    const couner = wrapperItem.querySelector('[data-counter]');

    if(e.target.dataset.action === 'minus' && e.target.closest('.cart-item__details')){
        calculatePrice()
        const wrapp = e.target.closest('.cart-item');
        const counter = +wrapp.querySelector('[data-counter]').innerText
        if(counter === 1){
            wrapp.remove()
        }
        isCardEmptyAndDelivery();
        calculatePrice()
      
    }

    if(couner.innerText === '1') return
    couner.innerText = +couner.innerText - 1

    isCardEmptyAndDelivery()
    calculatePrice()
    
}

//добавление элемента в корзину 

function Item(title, counter, weight, pieces, price, id, img){
    this.title = title;
    this.counter = counter;
    this.weight = weight;
    this.pieces = pieces;
    this.price = price;
    this.id = id;
    this.img = img;

}

document.addEventListener('click', addToCard);

function addToCard(e){

    
    if(e.target.dataset.cart !== '') return;
    let cardBody = document.querySelector('.cart-wrapper');
    const item = e.target.closest('[data-id]') 
    const title = item.querySelector('.item-title').innerText;
    const counter = item.querySelector('.items__current').innerText;
    const weight = item.querySelector('.price__weight').innerText;
    const pieces = item.querySelector('.text-muted').innerText;
    const price = item.querySelector('.price__currency').innerText;
    const id = item.dataset.id;
    const img = item.querySelector('.product-img').src
    let allItems = document.querySelectorAll('.cart-item')
   
    

    const elem = new Item(title,counter,weight,pieces,price,id, img);


    const itemInCart = cardBody.querySelector(`[data-id="${elem.id}"]`)
    
    if(itemInCart){
        itemInCart.querySelector('[data-counter]').innerText = +itemInCart.querySelector('[data-counter]').innerText + +elem.counter;
        
    }else{
        const HTMLpattern = `
        <div class="cart-item" data-id="${elem.id}">
			<div class="cart-item__top">
				<div class="cart-item__img">
					<img src="${elem.img}" alt="">
				</div>
				<div class="cart-item__desc">
					<div class="cart-item__title">${elem.title}</div>
						<div class="cart-item__weight">${elem.pieces} / ${elem.weight}</div>
							<div class="cart-item__details">
							    <div class="items items--small counter-wrapper">
									<div class="items__control" data-action="minus">-</div>
										<div class="items__current" data-counter="">${elem.counter}</div>
											<div class="items__control" data-action="plus">+</div>
										</div>

										<div class="price">
											<div class="price__currency">${elem.price}</div>
										</div>
									</div>										
								</div>
							</div>
					</div>`;
         cardBody.insertAdjacentHTML("beforeend",HTMLpattern );
        
    }
    isCardEmptyAndDelivery()

    calculatePrice()
}


function isCardEmptyAndDelivery(){
    
    let cardElems = document.querySelectorAll('.cart-item');
    const emptyCard = document.querySelector('[data-cart-empty]')
    const order = document.querySelector('#order-form');
   
   
    if(cardElems.length > 0){
        emptyCard.classList.add('none')

        order.classList.remove('none')
        
    }else{
        emptyCard.classList.remove('none')

        order.classList.add('none')
    
    }

    let totalPrice = document.querySelector('.total-price')
    const delivery = document.querySelector('.delivery')
    
    if(+totalPrice.innerText > 800){
        delivery.querySelector('.delivery-cost').classList.add('free');
        delivery.querySelector('.delivery-cost').innerText = 'бесплатно';
    }else{
        delivery.querySelector('.delivery-cost').classList.remove('free');
        delivery.querySelector('.delivery-cost').innerText = '350 ₽';
    }  
}







function calculatePrice(){
    
    let totalPrice = document.querySelector('.total-price')
    totalPrice.innerHTML = '0'
    const cartWrapper = document.querySelector('.cart-wrapper');
    const allCartsItems = cartWrapper.querySelectorAll('.cart-item');

    allCartsItems.forEach(el =>{
        const counter = +el.querySelector('[data-counter]').innerText
        const price = +el.querySelector('.price__currency').innerText.slice(0, -1)  
        totalPrice.innerText = +totalPrice.innerText + (counter * price);
        isCardEmptyAndDelivery()
    })
}






