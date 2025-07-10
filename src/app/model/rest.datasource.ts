import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Product } from "./product.model";
import { Order } from "./order.model";
import { MassageSession } from "./massagesession.model";
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "https";
const PORT = 44349;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token?: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        //this.baseUrl = "/api/"
    }

    getProducts(): Observable<MassageSession[]> {
        return this.http.get<MassageSession[]>(this.baseUrl + "api/MassageSession/GetActiveSession");
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "login/authenticate", {
            //name: user, password: pass
            userid: 0,
            username: user,
            password: pass,
            salt: "string",
            email: "string",
            contact: "string",
            createdon: "2025-07-07T10:20:50.977Z",
            modifiedon: "2025-07-07T10:20:50.977Z",
            active: true,
            deactivatedon: "2025-07-07T10:20:50.977Z"

        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products",
            product, this.getOptions());
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}products/${product.id}`,
            product, this.getOptions());
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}api/MassageSession/EndMassageSession`,
            {
            massageSessionId: id
        },
            this.getOptions());
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`,
            this.getOptions());
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,
            order, this.getOptions());
    }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.auth_token}`
            })
        }
    }
}
