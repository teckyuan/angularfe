import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { MassageSession } from "../model/massagesession.model";
import { ProductRepository } from "../model/product.repository";
import { MatPaginator } from "@angular/material/paginator";

@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {
    colsAndRows: string[] = [ 'workerName', 'customerName','roomName','startTime' 
        //,'price'
        , 'buttons'];
    //dataSource = new MatTableDataSource<Product>(this.repository.getProducts());
    dataSource = new MatTableDataSource<MassageSession>(this.repository.getMassageSessions());
    differ: IterableDiffer<MassageSession>;

    @ViewChild(MatPaginator)
    paginator? : MatPaginator

    constructor(private repository: ProductRepository, differs: IterableDiffers) { 
        this.differ = differs.find(this.repository.getProducts()).create();
    }

    ngDoCheck() {
        let changes = this.differ?.diff(this.repository.getMassageSessions());
        if (changes != null) {
            this.dataSource.data = this.repository.getMassageSessions();
        }        
    }


    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }    

    deleteProduct(id: number) {
        this.repository.deleteProduct(id);
    }    
}
