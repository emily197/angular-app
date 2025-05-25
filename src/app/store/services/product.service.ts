import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = signal<Product[]>([
    { id: 12, name: 'Vitaminas Erbology', quantity: 4, category: 'farmacia', discount: 0.15, price: 89, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
    { id: 1, name: 'zapatillas Urbanas', quantity: 7, category: 'shoes', discount: 0, price: 230, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
    { id: 2, name: 'Producto random 1', quantity: 3, category: 'random', discount: 0.05, price: 115, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
    { id: 3, name: 'Estantes metalicos', quantity: 9, category: 'hogar', discount: 0.10, price: 320, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
    { id: 4, name: 'Reloj digital', quantity: 6, category: 'electronico', discount: 0.25, price: 180, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
    { id: 5, name: 'Zapatillas deportivas', quantity: 8, category: 'shoes', discount: 0.03, price: 210, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
    { id: 6, name: 'Crema corporal', quantity: 2, category: 'farmacia', discount: 0, price: 45, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
    { id: 7, name: 'Producto random 2', quantity: 5, category: 'random', discount: 0, price: 99, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
    { id: 8, name: 'Lampara rustica', quantity: 10, category: 'hogar', discount: 0.18, price: 250, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
    { id: 9, name: 'Locion Tonik', quantity: 1, category: 'farmacia', discount: 0.02, price: 60, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
    { id: 10, name: 'Mando de juego', quantity: 3, category: 'electronico', discount: 0.22, price: 280, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg' },
    { id: 11, name: 'Mochila Atelle', quantity: 6, category: 'accesorio', discount: 0, price: 175, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' },
  ]);

}
