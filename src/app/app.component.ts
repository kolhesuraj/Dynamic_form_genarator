import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'Dynamic_Form_Genarator';
  options = ['text', 'number', 'checkbox', 'radio'];
  type: string = '';
  name: string = '';
  option: string = '';
  formArray: any[] = [];
  GenaratedForm!: FormGroup;
  submitted:boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.GenaratedForm = this.fb.group({});
  }
  addToForm(form: NgForm) {
    this.submitted = true;
    let value: any = form.value;
    console.log();
    let final;
    let valid: Boolean = false;
    if (value.name == '' || value.type == '') {
      console.log('sdbhjbd');
      valid = false;
    } else {
      if (value.type == 'checkbox' || value.type == 'radio') {
        if (value.option != '') {
          let options = value.option.split(',');
          final = {
            name: value.name,
            type: value.type,
            option: options,
          };
          valid = true;
        } else {
          alert("please enter option with separated by ','");
          valid = false;
        }
      } else {
        final = {
          name: value.name,
          type: value.type,
        };
        valid = true;
      }
    }

    if (valid == true) {
      this.formArray.push(final);
      this.buildForm();
      valid = false;
      this.submitted = false;
      form.reset({});
    }
    console.log(this.formArray);
  }
  buildForm() {
    this.formArray.forEach((element: any, i) => {
      if (element.type == 'checkbox') {
        let name = element.name;
        this.GenaratedForm.addControl(name, new FormGroup({}));
        const option = this.GenaratedForm.get(name) as FormGroup;
        element.option.forEach((eleme: any) => {
          option.addControl(eleme, new FormControl(''));
        });
      } else {
        this.GenaratedForm.addControl(
          element.name,
          new FormControl('', Validators.required)
        );
      }
    });
  }
  record() {
    console.log(this.GenaratedForm.value);
    this.GenaratedForm.reset()
  }
}
