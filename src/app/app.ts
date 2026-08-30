import { Component, signal, computed, effect } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {

  // Available products list
  products: Product[] = [
    { id: 1, name: 'Laptop',       price: 999  },
    { id: 2, name: 'Smartphone',   price: 699  },
    { id: 3, name: 'Headphones',   price: 199  },
    { id: 4, name: 'Keyboard',     price: 89   },
    { id: 5, name: 'Mouse',        price: 49   },
    { id: 6, name: 'Monitor',      price: 349  },
  ];

  // signal() — reactive cart state, starts empty
  cart = signal<Product[]>([]);

  // computed() — automatically recalculates total when cart changes
  totalPrice = computed(() =>
    this.cart().reduce((sum, product) => sum + product.price, 0)
  );

  // computed() — cart item count
  cartCount = computed(() => this.cart().length);

  constructor() {
    // effect() — runs whenever cart signal changes
    effect(() => {
      console.log('Cart items count:', this.cart().length);
    });
  }

  // update() — adds product to cart
  addToCart(product: Product): void {
    this.cart.update(current => [...current, product]);
  }

  // update() — removes product from cart
  removeFromCart(productId: number): void {
    this.cart.update(current => current.filter(p => p.id !== productId));
  }

  // set() — clears entire cart
  clearCart(): void {
    this.cart.set([]);
  }

  isInCart(productId: number): boolean {
    return this.cart().some(p => p.id === productId);
  }
}