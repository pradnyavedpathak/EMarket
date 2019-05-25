import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShopService } from './add-shop.service';
import { IShop } from './IShop';
import { IContacts } from './Icontacts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  addshopForm: FormGroup;
  shops: IShop[];
  shop: IShop;
  constructor( private shopService: ShopService, private router: Router ) {}

  ngOnInit() {
    this.addshopForm = new FormGroup({
      Shop_Name: new FormControl(),
      Shop_Owner: new FormControl(),
      Shop_Address: new FormControl(),
      Contact_Number1: new FormControl(),
      Contact_Number2: new FormControl(),
    });
    this.getshops();
  }
  getshops(): void {
    this.shopService.getShops().subscribe((data) => {
      this.shops = data;
    });
    console.log(this.shops);
  }

  onLoadShopdataClick(): void {
    this.addshopForm.patchValue({
      Shop_Name: '',
      Shop_Owner: '',
      Shop_Address: '',
      Contact_Number1: '',
      Contact_Number2: ''
    });
  }

  onSubmit(): void {
    console.log(this.shops.length + 1);
    console.log(this.addshopForm);

    this.shop = {
      Shop_No: this.shops.length + 3 ,
      Shop_Name: this.addshopForm.get('Shop_Name').value,
      Shop_Owner: this.addshopForm.get('Shop_Owner').value,
      Shop_Address: this.addshopForm.get('Shop_Address').value,
      Contacts: {
        Contact_Id: 1,
        Contact_Number1: Number(this.addshopForm.get('Contact_Number1').value ),
        Contact_Number2: Number(this.addshopForm.get('Contact_Number2').value )
      }
    };
    this.shopService.addShop(this.shop).subscribe(
      () => this.router.navigate(['Add-Shop']),
      (err: any) => console.log(err)
    );
    this.getshops();
  }
}
