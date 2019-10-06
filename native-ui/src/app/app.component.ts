import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular/element-registry';
registerElement('AppleSignInButton', () => require('./native-ui/apple-signin-button').AppleSignInButton);

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent { }
