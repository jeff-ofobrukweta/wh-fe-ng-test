/**
 * Update the following components to meet the requirements :
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// done

@Component({
  selector: "textfield",
  template: '<input (input)="handleInputChange($event)" type="text"/>',
})
export class TextField {
  field: string = "";
  @Output() inputChanged: EventEmitter<string> = new EventEmitter();
  handleInputChange(e): void {
    this.field = e.target.value;
    this.inputChanged.emit(this.field);
  }
}

@Component({
  selector: "child-component",
  template: `<h2>
    Title:{{ title }}
    <h2><br /><textfield (inputChanged)="handleField($event)"></textfield></h2>
  </h2>`,
})
export class ChildComponent {
  title: string = "";
  @Output() inputChanged: EventEmitter<string> = new EventEmitter();
  handleField(e): void {
    this.title = e;
    this.inputChanged.emit(e);
  }
}

@Component({
  selector: "ng-app",
  template: `<div>
    <child-component (inputChanged)="handleField($event)"></child-component>
    <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = "";
  handleField(e): void {
    this.title = e;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
