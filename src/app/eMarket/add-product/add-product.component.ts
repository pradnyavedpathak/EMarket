import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from './add-product.service';
import { IProduct } from './IProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addproductForm: FormGroup;
  products: IProduct[];
  product: IProduct;
  constructor( private productService: ProductService, private router: Router ) {}

  ngOnInit() {
    this.addproductForm = new FormGroup({
      Product_Name: new FormControl(),
      Product_Type: new FormControl(),
      Product_TaxRate: new FormControl(),
      Product_Price: new FormControl(),
    });
    this.getproducts();
  }
  getproducts(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
    console.log(this.products);
  }

  onLoadProductdataClick(): void {
    this.addproductForm.patchValue({
      Product_Name: '',
      Product_Type: '',
      Product_TaxRate: '',
      Product_Price: '',
    });
  }
  onSubmit(): void {
    console.log(this.products.length + 1);
    console.log(this.addproductForm);

    this.product = {
      Product_Id: this.products.length + 1,
      Product_Name: this.addproductForm.get('Product_Name').value,
      Product_Type: this.addproductForm.get('Product_Type').value,
      Product_TaxRate: this.addproductForm.get('Product_TaxRate').value,
      Product_Price: this.addproductForm.get('Product_Price').value,
    };
    console.log(this.product);
    console.log(this.addproductForm.get('Product_Type').value);
    this.productService.addProduct(this.product).subscribe(
      () => this.router.navigate(['Add-Product']),
      (err: any) => console.log(err)
    );
    this.getproducts();
  }
}
