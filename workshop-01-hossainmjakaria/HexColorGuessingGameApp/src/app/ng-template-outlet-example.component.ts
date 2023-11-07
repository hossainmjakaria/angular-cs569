import { Component } from "@angular/core";

@Component({
    selector: 'ng-template-outlet-example',
    template: `
    <ng-container *ngTemplateOutlet="greet"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="eng; context: myContext"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="svk; context: myContext"></ng-container>
    <hr>

    <ng-template #greet><span>Hello</span></ng-template>
    <ng-template #eng let-name="abc"><span>Hello {{name}}!</span></ng-template>
    <ng-template #svk let-person="localSk"><span>Ahoj {{person}}!</span></ng-template>
`
})
export class NgTemplateOutletExample {
    myContext = { $implicit: 'World', localSk: 'Svet', abc: 'xxx' };
}