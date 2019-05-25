import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from './add-employee.service';
import { IEmployee } from './IEmployee';
import { Router } from '@angular/router';
import { IShop } from '../add-shop/IShop';
import { ShopService } from '../add-shop/add-shop.service';
//import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addemployeeForm: FormGroup;
  employees: IEmployee[];
  employee: IEmployee;
  shops: IShop[];
  shop: IShop;
  constructor(private employeeService: EmployeeService, private shopService: ShopService, private router: Router) { }

  ngOnInit() {
    this.addemployeeForm = new FormGroup({
      First_Name: new FormControl(),
      Last_Name: new FormControl(),
      Email: new FormControl(),
      Phone_Number: new FormControl(),
      Salary: new FormControl(),
      Job_Id: new FormControl(),
      Dept_Id: new FormControl(),
      Manager_Id: new FormControl(),
      Shop_Name: new FormControl()
    });
    this.getEmployees();
    this.getShops();
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data;
    });
    //this.employees =  this.employeeService.getEmployees().find(emp => emp.Emp_Id === this.employees);
  }
  getShops(): void {
    this.shopService.getShops().subscribe((data) => {
      console.log(data);
      this.shops = data;
    });
    console.log(this.shops);
    console.log(this.employees);
    this.employees.forEach((value) => {
      console.log(value.First_Name + ' ' + value.Last_Name);
    });
  }

  onLoadEmployeedataClick(): void {
    console.log(this.addemployeeForm.get('Job_Id').value);
    console.log(this.addemployeeForm.get('Dept_Id').value)
    console.log(this.addemployeeForm.get('Manager_Id').value)
    console.log(this.addemployeeForm.get('Shop_Name').value)

    this.addemployeeForm.patchValue({
      First_Name: '',
      Last_Name: '',
      Email: '',
      Phone_Number: '',
      Salary: '',
      Job_Id: '',
      Dept_Id: '',
      Manager_Id: '',
      Shop_Name: ''
    });
  }
  onSubmit(): void {
    console.log(this.employees.length + 1);
    console.log(this.addemployeeForm);

    this.employee = {
      Emp_Id: this.employees.length + 1,
      First_Name: this.addemployeeForm.get('First_Name').value,
      Last_Name: this.addemployeeForm.get('Last_Name').value,
      Email: this.addemployeeForm.get('Email').value,
      Phone_Number: this.addemployeeForm.get('Phone_Number').value,
      Salary: this.addemployeeForm.get('Salary').value,
      Job_Id: this.addemployeeForm.get('Job_Id').value,
      Dept_Id: this.addemployeeForm.get('Dept_Id').value,
      Manager_Id: this.addemployeeForm.get('Manager_Id').value,
      Shop_Name: this.addemployeeForm.get('Shop_Name').value
    };

    console.log(this.employee);
    console.log(this.addemployeeForm.get('Job_Id').value);
    this.employeeService.addEmployee(this.employee).subscribe(
      () => this.router.navigate(['Add-Employee']),
      (err: any) => console.log(err)
    );
    this.getEmployees();
  }
}
