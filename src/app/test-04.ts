/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule, HostListener } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// done

@Component({
  selector: "ng-app",
  template: `
    <h2>Enter your first and last name</h2>
    <form name="main-form" class="main-form">
      <b
        >Firstname:
        <input
          (input)="handleInput($event)"
          class="input-focus"
          type="text"
          name="firstname"
        /> </b
      ><br /><br />
      <b
        >Lastname:
        <input
          (input)="handleInput($event)"
          class="input-focus"
          type="text"
          name="lastname"
        />
      </b>
      <br />
      <br />
      <b
        >Username:
        {{ username }}
      </b>
    </form>
    <div></div>
  `,
  styles: []
})
export class UserNameComponent {
  username: string = "";
  firstname: string = "";
  lastname: string = "";
  updateUrl: boolean = false;

  generateUserName(e) {
    this.updateUrl = false;

    this.firstname.length > 0 && this.lastname.length > 0
      ? (this.username = `${this.firstname}_${
          this.lastname
        }_${this.generateRandomInteger(0, 9)}`)
      : null;
  }
  handleInput(e): void {
    !this.updateUrl ? (this.updateUrl = true) : null;
    this[e.target.getAttribute("name")] = e.target.value;
  }
  generateRandomInteger(max, min): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  @HostListener("document:click", ["$event"])
  onWindowclick(e) {
    const attributeClass = e.target.getAttribute("class");
    attributeClass && !attributeClass.includes("input-focus") && this.updateUrl
      ? this.generateUserName(e)
      : !attributeClass
      ? null
      : null;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserNameComponent
      }
    ])
  ],
  declarations: [UserNameComponent]
})
export class UserNameModule {}
