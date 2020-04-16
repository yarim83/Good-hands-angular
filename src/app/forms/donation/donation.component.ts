import {Component, OnInit, ViewChild} from '@angular/core';
import {DonationService} from '../../services/donation.service';
import {CategoryService} from '../../services/category.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {InstitutionService} from '../../services/institution.service';
import {Donation} from '../../models/donation';
import {Category} from '../../models/category';
import {Institution} from '../../models/institution';
import {error} from 'util';


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
  submitted = false;
  errors = false;
  private formDataStep: number = 1;
  private donationCreated: boolean;

  constructor(private donationService: DonationService,
              private categoryService: CategoryService,
              private institutionService: InstitutionService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryCheckArray: this.formBuilder.array([], [Validators.required]),
      bags: ['', [Validators.required]],
      insitution: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(4)]],
      city:['', [Validators.required, Validators.minLength(4)]],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      pickUpDate: ['', [Validators.required]],
      pickUpTime: ['', [Validators.required]],
      pickUpComment: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.reloadData();
  }

  private reloadData() {
    this.getCategoryList();
    this.getInstitutionList();
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.errors = true;
      return;
    } else {
      this.errors = false;
      this.assingFormToDonationDto();
      this.addDonation();
    }

  }

  addDonation() {
    this.donationService.addDonation(this.donationDto)
      .subscribe(data => {
        this.donationCreated = true;
        console.log(data);
      }, error => {
        this.donationCreated = false;
        console.log(error.error.message);
      });
  }

  gotoIndex() {
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
    this.donationDto.city = this.form.value.city;
    this.donationDto.zipCode = this.form.value.zipCode;
    this.donationDto.institutionId = this.form.value.insitution.id;
    this.donationDto.pickUpComment = this.form.value.pickUpComment;
    this.donationDto.pickUpDate = this.form.value.pickUpDate;
    this.donationDto.pickUpTime = this.form.value.pickUpTime;
    this.donationDto.categoryIds = this.form.value.categoryCheckArray;
    this.donationDto.street = this.form.value.street;
    this.donationDto.phone = this.form.value.phone;
    this.donationDto.quantity = this.form.value.bags;
  }

  generateDonation() {
    this.nextStep();
    this.assingFormToDonationDto();
  }
}

