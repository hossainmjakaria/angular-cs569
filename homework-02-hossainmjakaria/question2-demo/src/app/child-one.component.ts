import { OnInit, DoCheck, AfterViewInit, AfterViewChecked, Component } from '@angular/core';


@Component({
  selector: 'app-child-one',
  template: `
    <p>
     {{data}}
    </p>
  `,
  styles: [
  ]
})
export class ChildOneComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  data: string = "I am from Child One";

  constructor() {
    setTimeout(() => {
      this.data = `${this.data}: ${new Date().toLocaleTimeString()}`;
      console.log(this.data);
    }, 5000);
  }

  ngOnInit() {
    console.log('Child 1: onInit');
  }

  ngDoCheck() {
    console.log('Child 1: doCheck');

  }

  ngAfterViewInit() {
    console.log('Child 1: afterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Child 1: afterViewChecked');
  }
}
