import { OnInit, DoCheck, AfterViewInit, AfterViewChecked, Component } from '@angular/core';


@Component({
  selector: 'app-child-two',
  template: `
    <p>
      {{data}}
    </p>
  `,
  styles: [
  ]
})
export class ChildTwoComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  data: string = "I am from Child Two";

  ngOnInit() {
    console.log('Child 2: onInit');
  }

  ngDoCheck() {
    console.log('Child 2: doCheck');
  }

  ngAfterViewInit() {
    console.log('Child 2: afterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Child 2: afterViewChecked');
  }
}
