import {Component, OnInit} from '@angular/core';
import {DonationService} from '../services/donation.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private donationCount: number;
  private bagsDonated: number;

  constructor(private donationService: DonationService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.donationService.getDonationCount().subscribe(data => {
      console.log(data);
      this.donationCount = data['donationBags'];
      this.bagsDonated = data['bagsDonated'];
    });
  }

}
