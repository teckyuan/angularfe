import { Component , OnInit} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../model/product.model";
import {MassageServiceLookup} from "../model/massageservicelookup.model"
import { ProductRepository } from "../model/product.repository";
import { RestDataSource } from "../model/rest.datasource";

@Component({
    templateUrl: "productEditor.component.html",

})
export class ProductEditorComponent implements OnInit { 
    editing: boolean = false;
    product: Product = new Product();
    
    massageServiceLookup: MassageServiceLookup[] = [];
    selected = 'option2';
    
    constructor(private repository: ProductRepository,
                private router: Router,
                activeRoute: ActivatedRoute,
                private dataSource: RestDataSource
            ) 
    {

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        if (this.editing) {
            Object.assign(this.product,
                repository.getProduct(activeRoute.snapshot.params["id"]));
        }

    
    }

    save() {
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl("/admin/main/products");
    }

    ngOnInit(): void {
        
         this.dataSource.getMassageServiceLookup().subscribe(data => {
          this.massageServiceLookup = data;
        });
        

      }
}
