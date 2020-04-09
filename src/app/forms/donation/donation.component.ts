import {Component, OnInit, ViewChild} from '@angular/core';
import {DonationService} from '../../services/donation.service';
import {CategoryService} from '../../services/category.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {Router} from '@angular/router';
import {InstitutionService} from '../../services/institution.service';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  private x: any;
  private donationList: Array<Donation>;
  private categoryList: Array<Category>;
  private institutionList: Array<Institution>;
  private activeClass = 'active';
  form: FormGroup;
  private formDataStep: number = 1;
  submitted = false;

  constructor(private donationService: DonationService,
              private categoryService: CategoryService,
              private institutionService: InstitutionService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryCheckArray: this.formBuilder.array([]),
      'bags': new FormControl(null),
      'insitution': new FormControl(null),
      'address': new FormControl(null),
      'city': new FormControl(null),
      'postcode': new FormControl(null),
      'phone': new FormControl(null),
      'data': new FormControl(null),
      'time': new FormControl(null),
      'moreInfo': new FormControl(null)
    });
    this.reloadData();
    this.x = this.form;
  }

  private reloadData() {
    this.getCategoryList();
    this.getInstitutionList();
  }

  onSubmit() {
    console.log(this.form);
    console.log(this.formDataStep);
  }

  gotoIndex() {
    this.onSubmit();
    this.router.navigate(['']);
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(data => {
      this.categoryList = data;
    }, error => {
      console.log(error.error.message);
    });
  }

  getInstitutionList() {
    this.institutionService.getInstitutionList().subscribe(data =>{
      this.institutionList = data;
    }, error => {
      console.log(error.error.message);
    });
  }

  prevStep() {
    this.formDataStep--;
    console.log(this.formDataStep);
    console.log(this.form);
  }

  nextStep() {
    this.formDataStep++;
    console.log(this.form);
    console.log(this.formDataStep);
  }


  onCheckboxChange(event) {
    const categoryCheckArray: FormArray = this.form.get('categoryCheckArray') as FormArray;

    if (event.target.checked) {

      categoryCheckArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      categoryCheckArray.controls.forEach((item: FormControl) => {
        if (item.value === event.target.value) {
          categoryCheckArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }


}

