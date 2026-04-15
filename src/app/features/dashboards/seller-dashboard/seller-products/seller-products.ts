import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-seller-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './seller-products.html',
  styleUrl: './seller-products.scss',
})
export class SellerProducts {
  products = signal([
    { id: 1, name: 'Sample Product', description: 'A great item', price: 25.00, quantity: 10, imageUrl: 'https://via.placeholder.com/50' }
  ]);

  // Signal for the product currently being edited or added
  currentProduct = signal(this.getEmptyProduct());
  isEditMode = signal<boolean>(false);

  private getEmptyProduct() {
    return { name: '', description: '', price: 0, quantity: 0, imageUrl: '' };
  }
prepareAdd() {
    this.isEditMode.set(false);
    this.currentProduct.set(this.getEmptyProduct());
  }

  prepareEdit() {
    this.isEditMode.set(true);
    // this.currentProduct.set({ ...product }); // Spread to avoid direct mutation
  }

  saveProduct() {
    if (this.isEditMode()) {
      // Logic for Update (CQRS UpdateProductCommand)
      // this.products.update(items => items.map(p => p.id === this.currentProduct().id ? this.currentProduct() : p));
    } else {
      // Logic for Add (CQRS CreateProductCommand)
      const newProduct = { ...this.currentProduct(), id: Date.now() };
      this.products.update(items => [...items, newProduct]);
    }
  }
}
