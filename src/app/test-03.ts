/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ng-app",
  template: `<form>
    <h2>Login</h2>
    <br />
    <input (input)="handleInput($event)" type="email" value="" name="email" />
    <br />
    <input
      (input)="handleInput($event)"
      type="password"
      value=""
      name="password"
    />
    <br /><br />
    <ul class="red" *ngFor="let error of errors">
      <li>{{ error }}</li>
    </ul>

    <button (click)="handleBtnClick($event)" type="submit">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
  styles: [
    `
      .red {
        color: red;
      }
    `
  ]
})
export class Test03Component {
  email: string = "";
  password: string = "";
  logged_in: boolean = false;
  errors: string[] = [];

  handleInput(e): void {
    e.target.getAttribute("name")
      ? (this[e.target.getAttribute("name")] = e.target.value)
      : null;
  }

  handleBtnClick(e): void {
    e.preventDefault();
    if (!this.email.length || !this.password.length) {
      this.errors = ["please email and password cant be empty"];
      this.logged_in = false;
    } else {
      this.logged_in = false;
      this.errors = [];

      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const passwordFormat =
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
      let isPasswordCorrect: boolean, isEmailCorrect: boolean;

      !mailformat.test(this.email)
        ? (this.errors = [...this.errors, "please input a valid email"])
        : (isEmailCorrect = true);

      !passwordFormat.test(this.password)
        ? (this.errors = [...this.errors, "please input a valid password"])
        : (isPasswordCorrect = true);

      isEmailCorrect && isPasswordCorrect
        ? (this.logged_in = true)
        : (this.logged_in = false);
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test03Component
      }
    ])
  ],
  declarations: [Test03Component]
})
export class Test03Module {}
