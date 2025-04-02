import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceXApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatButtonToggleModule, MatIconModule]
})
export class MissiondetailsComponent implements OnInit {
  mission?: Mission;

  constructor(private route: ActivatedRoute, private api: SpaceXApiService) {}

  ngOnInit(): void {
    const flightNumber = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getMissionByFlightNumber(flightNumber).subscribe(data => this.mission = data);
  }

  goBack() {
    window.history.back();
  }
  
}
