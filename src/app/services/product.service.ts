import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from '@environments/environment'

@Injectable({ providedIn: 'root' })
export class ProductService {
  envs = environment;

  constructor(private http: HttpClient){}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.envs.apiUrl}/products`)
      .pipe(
          delay(0)
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.envs.apiUrl}/products/${id}`)
  }

  addProduct(product: any):Observable<Product> {
    const { id, ...productWithoutId} = product;
    return this.http.post<Product>(`${this.envs.apiUrl}/products`, productWithoutId);
  }

  updateProduct(id: string, product: any): Observable<Product> {
    return this.http.put<Product>(`${this.envs.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envs.apiUrl}/products/${id}`);
  }






/*
  products = signal<Product[]>([
    { id: 12, name: 'Vitaminas Erbology', stock: 4, unit: 'unit', isActive: true, categoryId: 'FAR', discountPrice: 0.15, price: 89, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
    { id: 1, name: 'zapatillas Urbanas', stock: 7, unit: 'unit', isActive: true, categoryId: 'ZAP', discountPrice: 0, price: 230, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
    { id: 2, name: 'Producto random 1', stock: 3, unit: 'unit', isActive: true, categoryId: 'HOG', discountPrice: 0.05, price: 115, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
    { id: 3, name: 'Estantes metalicos', stock: 9, unit: 'unit', isActive: true, categoryId: 'HOG', discountPrice: 0.10, price: 320, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
    { id: 4, name: 'Reloj digital', stock: 6, unit: 'unit', isActive: true, categoryId: 'ELE', discountPrice: 0.25, price: 180, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
    { id: 5, name: 'Zapatillas deportivas', stock: 8, unit: 'unit', isActive: true, categoryId: 'ZAP', discountPrice: 0.03, price: 210, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
    { id: 6, name: 'Crema corporal', stock: 2, unit: 'unit', isActive: true, categoryId: 'FAR', discountPrice: 0, price: 45, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
    { id: 7, name: 'Producto random 2', stock: 5, unit: 'unit', isActive: true, categoryId: 'HOG', discountPrice: 0, price: 99, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
    { id: 8, name: 'Lampara rustica', stock: 10, unit: 'unit', isActive: true, categoryId: 'HOG', discountPrice: 0.18, price: 250, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
    { id: 9, name: 'Locion Tonik', stock: 1, unit: 'unit', isActive: true, categoryId: 'FAR', discountPrice: 0.02, price: 60, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
    { id: 10, name: 'Mando de juego', stock: 3, unit: 'unit', isActive: true, categoryId: 'ELE', discountPrice: 0.22, price: 280, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg' },
    { id: 11, name: 'Mochila Atelle', stock: 6, unit: 'unit', isActive: true, categoryId: 'ACC', discountPrice: 0, price: 175, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' },
  ]);*/



}
