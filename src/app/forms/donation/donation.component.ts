import {Component, OnInit, ViewChild} from '@angular/core';
import {DonationService} from '../../services/donation.service';
import {CategoryService} from '../../services/category.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {InstitutionService} from '../../services/institution.service';
import {Donation} from '../../models/donation';
import {Category} from '../../models/category';
import {Institution} from '../../models/institution';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  donationDto: Donation = new Donation();
  private categoryList: Array<Category>;
  private institutionList: Array<Institution>;
  private activeClass = 'active';
  private form: FormGroup;
  private formDataStep: number = 1;

  constructor(private donationService: DonationService,
              private categoryService: CategoryService,
              private institutionService: InstitutionService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryCheckArray: this.formBuilder.array([]),
      bags: new FormControl(null),
      insitution: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      zipCode: new FormControl(null),
      phone: new FormControl(null),
      pickUpDate: new FormControl(null),
      pickUpTime: new FormControl(null),
      pickUpComment: new FormControl(null)
    });
    this.reloadData();
  }

  private reloadData() {
    this.getCategoryList();
    this.getInstitutionList();
  }

  onSubmit() {
    this.assingFormToDonationDto();
  }

  gotoIndex() {
    this.onSubmit();
    console.log(this.form);
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
    this.institutionService.getInstitutionList().subscribe(data => {
      this.institutionList = data;
    }, error => {
      console.log(error.error.message);
    });
  }

  prevStep() {
    this.formDataStep--;
  }

  nextStep() {
    this.formDataStep++;
  }


  onCheckboxChange(event) {
    const categoryCheckArray = this.form.get('categoryCheckArray') as FormArray;
    if (event.target.checked) {
      categoryCheckArray.push(new FormControl(event.target.value, Validators.required));
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

  assingFormToDonationDto() {
    console.log(this.form.value);
    this.donationDto.city = this.form.value.city;
    this.donationDto.zipCode = this.form.value.zipCode;
    this.donationDto.institutionId = this.form.value.insitution.id;
    this.donationDto.pickUpComment = this.form.value.pickUpComment;
    this.donationDto.pickUpDate = this.form.value.pickUpDate;
    this.donationDto.pickUpTime = this.form.value.pickUpTime;
    this.donationDto.categoryIds = this.form.value.categoryCheckArray;
    console.log(this.donationDto);
  }

  generateDonation() {
    this.nextStep();
    this.assingFormToDonationDto();
  }
}

