import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { Product } from "src/app/core/models/product.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtService } from "src/app/core/services/jwt.service";
import { User } from "../models/user.model";

@Injectable()
export class StateService {
    constructor() { }

    private CHOOSEN_PRODUCT : string = 'choosenProduct';
    private CHOOSEN_USER : string = 'choosenUser';

    set choosenProduct(product : Product) {
        let s = JSON.stringify(product);
        window.localStorage[this.CHOOSEN_PRODUCT] = s;
    }
    
    get choosenProduct(): Product {
        return JSON.parse(window.localStorage[this.CHOOSEN_PRODUCT]);
    }
    
    set choosenUser(user : User) {
        let s = JSON.stringify(user);
        window.localStorage[this.CHOOSEN_USER] = s;
    }

    get choosenUser() {
        return JSON.parse(window.localStorage[this.CHOOSEN_USER]);
    }


}