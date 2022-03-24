import { Orders } from "../models/order.model";
import swal from 'sweetalert2';

export class OrderDetailsService {
    conformation(message) {
        return swal.fire({
            title: message.titile,
            text: message.text,
            icon: message.icon,
            showCancelButton: message.showCancelButton,
            confirmButtonText: message.confirmButtonText,
            cancelButtonText: message.cancelButtonText
        });
    }
    orderList: Orders[] = [
        {
            id: 1,
            orderdate: '2022-03-24',
            name: 'shashi',
            address: 'hyderbad',
            phonenum: 8736456341,
            ordertotal: 100,
        },
        {
            id: 2,
            orderdate: '2022-03-24',
            name: 'don',
            address: 'vizag',
            phonenum: 8736456342,
            ordertotal: 120,
        },
        {
            id: 3,
            orderdate: '2022-03-24',
            name: 'abhishek',
            address: 'delhi',
            phonenum: 8736456343,
            ordertotal: 150,
        }
    ]
    getAllOrders() {
        return this.orderList;
    }
    addOrder(orders: Orders) {
        this.orderList.push(orders)
    }
    getSingleOrder(id: Number) {
        return this.orderList.find(x => x.id === id);
    }
    editOrder(orders: Orders) {
        let oldorders = this.orderList.find(x => x.id === orders.id)!;
        oldorders.address = orders.address
        oldorders.id = orders.id
        oldorders.name = orders.name
        oldorders.orderdate = orders.orderdate
        oldorders.phonenum = orders.phonenum
        oldorders.ordertotal = orders.ordertotal
    }
    deleteOrder(id: Number) {
        let orders = this.orderList.find(x => x.id === id)!;
        let index = this.orderList.indexOf(orders, 0);
        this.orderList.splice(index, 1);
    }
    get swalObjDelete() {
        return {
            title: 'Are you sure?',
            text: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'Cancel'
        }
    }
}