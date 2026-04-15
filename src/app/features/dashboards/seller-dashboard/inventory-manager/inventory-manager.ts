import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { InventoryProducts } from '../../../../view-models/inventory-products/inventory-products';
import { GenericTypeResponse } from '../../../../view-models/generic-response/generic-response';
import { environment } from '../../../../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { SellerService } from '../service/seller-service';
import { ProductService } from '../../../products/service/product-service';
@Component({
  selector: 'app-inventory-manager',
  imports: [CurrencyPipe, MatIcon, RouterLink],
  templateUrl: './inventory-manager.html',
  styleUrl: './inventory-manager.scss',
})
export class InventoryManager {
    _productsService = inject(ProductService);
    _sellerService = inject(SellerService);

    url = environment.fileDomainUrl;

    productResponse = toSignal(this._productsService.getProductsBySellerId());
    isLoading = signal(true);
    defaultProducts = computed(() => {
      if(this.productResponse() == undefined ||this.productResponse()?.statusCode !== 200) {
        // Handle error case, maybe return an empty array or show an error message
        return [] as InventoryProducts[];
      }
      return this.productResponse()?.data || []as InventoryProducts[];
    });

    currentEditingProduct = signal<InventoryProducts | null>(null);
    products = signal([] as InventoryProducts[]);
    changedProducts = computed(()=>{
      const defaultProductsValue = this.defaultProducts();
      const currentProductsValue = this.products();
      // Compare defaultProductsValue and currentProductsValue to find changed products
      const changed = currentProductsValue.filter(current => {
        const defaultProduct = defaultProductsValue.find(dp => dp.id === current.id);
        return JSON.stringify(defaultProduct) !== JSON.stringify(current);
      });
      console.log("Changed Products ------ Below");
      console.log(changed);
      return changed;
    });

    private syncEffect = effect(() => {
      const defaultProductsValue = this.defaultProducts();
      if(this.productResponse()?.statusCode ==200 && defaultProductsValue.length === 0) {
        // Handle the case where there are no products, maybe set a flag to show a message in the UI
        this.isLoading.set(false);
      }
      this.products.update((prev)=>[...defaultProductsValue,...prev]);
       this.isLoading.set(false);
    });

onImageSelected(event: any, p: InventoryProducts){
  const file = event?.target?.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      this.products.update((products) => 
        {  
        return products.map((prod) => {
          if (prod.id === p.id) {
            console.log(imageUrl);
            return { ...prod, productImages: [...prod.productImages, imageUrl] };
          }
          return prod;
      })});
    }
    reader.readAsDataURL(file);
  }
}

isLocalImage(imageUrl: string): boolean {
  return imageUrl.startsWith('data:') || imageUrl.startsWith('blob:');
}

increaseStock(p: InventoryProducts){
  this.products.update((products) => 
  {  
    return products.map((prod) => {
      if (prod.id === p.id) {
        return { ...prod, stock: prod.stock + 1 };
      }
      return prod;
  })});
}

decreaseStock(p: InventoryProducts){
  this.products.update((products) => 
  {  
    const originalProduct = this.defaultProducts().find(dp => dp.id === p.id);
    return products.map((prod) => {
      if (prod.id === p.id && prod.stock >= 0 && originalProduct && prod.stock > originalProduct.stock) {
        return { ...prod, stock: prod.stock - 1 };
      }
      return prod;
  })});
}

discardChanges(p: InventoryProducts){
  const originalProduct = this.defaultProducts().find(dp => dp.id === p.id);
  if(originalProduct) {
    this.products.update((products) => 
    {  
      console.log(originalProduct)
      return products.map((prod) => {
        if (prod.id === p.id) {
          return { ...originalProduct };
        }
        return prod;
    })});
  }}

  isChanged(p: InventoryProducts): boolean {
    const originalProduct = this.defaultProducts().find(dp => dp.id === p.id);
    return JSON.stringify(originalProduct) !== JSON.stringify(p);
  }
  canSaveChanges(){
    // const defaultProducts = this.defaultProducts();
    // const currentProducts = this.products();
    // return currentProducts.some(current => {
    //   const defaultProduct = defaultProducts.find(dp => dp.id === current.id);
    //   return JSON.stringify(defaultProduct) !== JSON.stringify(current);
    // });
    return this.changedProducts().length > 0;
  }
searchTimer: ReturnType<typeof setTimeout>|null = null; // Using 'any' or 'ReturnType<typeof setTimeout>' is safer for cross-platform

searchProducts(event: Event) {
  // if (this.searchTimer != null) {
  //   clearTimeout(this.searchTimer);
  // }

  // const target = event.target as HTMLInputElement;
  // const lowerQuery = target.value.toLowerCase(); 

  // this.searchTimer = setTimeout(() => {
  //   this.products.update((products) => {
  //     return [...products].sort((a, b) => {
  //       // Use lowerQuery for both sides of the comparison
  //       const aMatch = a.name.toLowerCase().startsWith(lowerQuery);
  //       const bMatch = b.name.toLowerCase().startsWith(lowerQuery);

  //       if (aMatch && !bMatch) return -1; 
  //       if (!aMatch && bMatch) return 1;  
  //       return 0; 
  //     });
  //   });
  // }, 100);
}
editProduct(p: InventoryProducts){
  // Here you would typically open a modal or navigate to a different page where the user can edit the product details
  // For demonstration purposes, let's just log the product that is being edited
  console.log("Editing product:", p);
  this.currentEditingProduct.set(p);
}
saveEdits(){
  const editedProduct = this.currentEditingProduct();
  if (editedProduct && this.canUpdatePrice()) {
    this.products.update((products) => 
    {  
      return products.map((prod) => {
        if (prod.id === editedProduct.id) {
          return { ...editedProduct };
        }
        return prod;
    })});
  }
  this.currentEditingProduct.set(null);
}
saveChanges(){
  const changedProducts = this.changedProducts();
  console.log("Saving the following changed products:");
  console.log(changedProducts);
  const update = this._sellerService.updateProducts(changedProducts).subscribe({
    next: (response) => {
      console.log("Products updated successfully:", response);
      //  show a success message here
    },
    error: (error) => {
      console.error("Error updating products:", error);
      //  show an error message to the user here --> sweet alert or something / return to default products
    },
    complete: () => {
      console.log("Finished updating products.");
      // this.defaultProducts.set(); // Refresh the default products to reflect the changes
      update.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  });
}

updatePrice(event: Event) {
  const target = event.target as HTMLInputElement;
  const product = this.currentEditingProduct();
  
  if (this.currentEditingProduct()) {
    this.currentEditingProduct.update((current) =>{ current!.price = target.valueAsNumber ?? current!.price;  return current}
  ) ;
     }

}
canUpdatePrice() {
  const product = this.currentEditingProduct();
  
  if (this.currentEditingProduct()) {
    return !isNaN(product!.price) && product!.price > 0 && product!.price < 1000000; // price must be between 0 and 1 million
  }
  return false;
}
     }

