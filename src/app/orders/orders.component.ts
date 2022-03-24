import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Orders } from '../models/order.model';
import { OrderDetailsService } from '../services/orderdetails.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList: Orders[];
  closeResult: string;
  closeResult1: string;
  addOrdersForm: FormGroup;
  submitted = false;
  editOrdersForm: FormGroup;
  submitted1 = false
  constructor(private service: OrderDetailsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllOrdersList();
    this.addForm();
    this.editForm();
  }
  getAllOrdersList() {
    this.orderList = this.service.getAllOrders();
  }
  addForm() {
    this.addOrdersForm = this.formBuilder.group({
      ordernumber: ['', Validators.required],
      orderduedate: ['', Validators.required],
      customername: ['', Validators.required],
      customeraddress: ['', Validators.required],
      customerphone: ['', Validators.required],
      ordertotal: ['', Validators.required]
    });
  }
  get f1() { return this.editOrdersForm.controls; }
  editForm() {
    this.editOrdersForm = this.formBuilder.group({
      ordernumber: ['', Validators.required],
      orderduedate: ['', Validators.required],
      customername: ['', Validators.required],
      customeraddress: ['', Validators.required],
      customerphone: ['', Validators.required],
      ordertotal: ['', Validators.required]
    });
  }
  get f() { return this.addOrdersForm.controls; }
  addOrderList(addOrder) {
    this.modalService.open(addOrder, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  id: number
  editOrderList(editOrder, id) {
    this.modalService.open(editOrder, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult1 = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult1 = `Dismissed ${this.getDismissReason1(reason)}`;
    });
    if (this.id != 0) {
      let orders = this.service.getSingleOrder(id)!;
      this.editOrdersForm.patchValue({
        ordernumber: orders.id,
        orderduedate: orders.orderdate,
        customername: orders.name,
        customeraddress: orders.address,
        customerphone: orders.phonenum,
        ordertotal: orders.ordertotal
      })
      this.editOrdersForm.value.orderduedate = this.datePipe.transform(this.editOrdersForm.value.orderduedate, 'yyyy-MM-dd');
    }
  }
  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.addOrdersForm.invalid) {
      return;
    }
    let order: Orders = {
      id: this.addOrdersForm.value.ordernumber,
      orderdate: this.addOrdersForm.value.orderduedate,
      name: this.addOrdersForm.value.customername,
      address: this.addOrdersForm.value.customeraddress,
      phonenum: this.addOrdersForm.value.customerphone,
      ordertotal: this.addOrdersForm.value.ordertotal,
    }
    this.service.addOrder(order);
    this.modalService.dismissAll();
    this.getAllOrdersList()
  }
  onSubmit1() {
    this.submitted1 = true;
    if (this.editOrdersForm.invalid) {
      return;
    }
    let order: Orders = {
      id: this.editOrdersForm.value.ordernumber,
      orderdate: this.editOrdersForm.value.orderduedate,
      name: this.editOrdersForm.value.customername,
      address: this.editOrdersForm.value.customeraddress,
      phonenum: this.editOrdersForm.value.customerphone,
      ordertotal: this.editOrdersForm.value.ordertotal,
    }
    this.service.editOrder(order);
    this.modalService.dismissAll();
    this.getAllOrdersList()
  }
  deleteOrder(id: Number) {
    this.service.conformation(this.service.swalObjDelete)
      .then(result => {
        if (result.value) {
          this.service.deleteOrder(id);
        }
      });
  }
}
