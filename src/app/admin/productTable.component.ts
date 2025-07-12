import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { MassageSession } from "../model/massagesession.model";
import { ProductRepository } from "../model/product.repository";
import { MatPaginator } from "@angular/material/paginator";
import { RestDataSource } from "../model/rest.datasource";

@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {
    colsAndRows: string[] = [ 'workerName', 'customerName','roomName','serviceName','startTime' 
        //,'price'
        , 'buttons'];
    //dataSource = new MatTableDataSource<Product>(this.repository.getProducts());
    dataSource = new MatTableDataSource<MassageSession>();
    differ: IterableDiffer<MassageSession>;

    @ViewChild(MatPaginator)
    paginator? : MatPaginator

    constructor(private repository: ProductRepository, differs: IterableDiffers ,private rst: RestDataSource) { 
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
    
    ngOnInit(): void {
       this.reloadTable();
      }

    deleteProduct(id: number) {

        this.rst.deleteProduct(id).subscribe({
          next: (response) => {
            // Handle successful response
            console.log('Form submitted successfully:', response);
            // Update UI, show success message, etc.
            //this.repository.saveProduct(this.product);
            this.reloadTable();
          },
          error: (error) => {
            // Handle errors
            console.error('Error submitting form:', error);
            // Show error message to the user

            
          },
          complete: () => {
            // Optional: Actions to perform when the observable completes (e.g., hide loading spinner)
            console.log('HTTP request completed.');

          }
        });



        
    }
    
    reloadTable() {
         this.rst.getProducts().subscribe(data => {
          this.dataSource.data= data; // Assign the fetched data to the dataSource
        });
    }
}
