import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { Product } from "src/app/core/models/product.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtService } from "src/app/core/services/jwt.service";

@Injectable()
export class StateService {
    constructor() { }

    private CHOOSEN_PRODUCT : string = 'choosenProduct';

    set choosenProduct(product : Product) {
        window.localStorage[this.CHOOSEN_PRODUCT] = product.id;
    }

    get choosenProduct() {
        return window.localStorage[this.CHOOSEN_PRODUCT];
    }

}