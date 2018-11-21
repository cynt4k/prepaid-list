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
        window.localStorage[this.CHOOSEN_PRODUCT] = product.id;
    }

    get choosenProduct() {
        return window.localStorage[this.CHOOSEN_PRODUCT];
    }

    set choosenUser(user : User) {
        window.localStorage[this.CHOOSEN_USER] = user.id;
    }

    get choosenUser() {
        return window.localStorage[this.CHOOSEN_USER];
    }


}