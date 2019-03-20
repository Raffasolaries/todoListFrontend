import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('access-token') != null) 
        {
            const token =  localStorage.getItem('access-token');
            // if the token is  stored in localstorage add it to http header
            const headers = new HttpHeaders().set("access-token", token);
            //clone http to the custom AuthRequest and send it to the server 

            const AuthRequest = request.clone( { headers: headers });
            return next.handle(AuthRequest)
        } else {
            return next.handle(request);
        }
    }

}