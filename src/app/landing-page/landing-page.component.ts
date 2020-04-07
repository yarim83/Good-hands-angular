import {Component, OnInit} from '@angular/core';
import {DonationService} from '../services/donation.service';
import {Observable} from 'rxjs';
import {InstitutionService} from '../services/institution.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private donationCount: number;
  private bagsDonated: number;
  private institutionListLineOne: Array<Institution>;
  private institutionListLineTwo: Array<Institution>;

  constructor(private donationService: DonationService,
              private institutionService: InstitutionService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.donationService.getDonationCount().subscribe(data => {
      this.donationCount = data['donationBags'];
      this.bagsDonated = data['bagsDonated'];
    });
    this.institutionService.getInstitutionLimitList(0,2).subscribe( data =>{
      this.institutionListLineOne = data['content'];
    });
    this.institutionService.getInstitutionLimitList(1,2).subscribe( data =>{
      this.institutionListLineTwo = data['content'];
    });
  }
}
