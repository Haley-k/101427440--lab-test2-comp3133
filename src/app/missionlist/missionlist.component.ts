import { Component, OnInit } from '@angular/core';
import { SpaceXApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filterYear: string = '';
  launchStatus: string = '';
  landStatus: string = '';
  allMissions: Mission[] = [];

  constructor(private api: SpaceXApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAllMissions().subscribe((data) => {
      this.missions = data;
      this.allMissions = data;
    });
  }

  applyFilters() {
    this.missions = this.allMissions.filter((m) => {
      const matchYear = this.filterYear
        ? m.launch_year.includes(this.filterYear)
        : true;

      const matchLaunch = this.launchStatus
        ? this.launchStatus === 'success'
          ? m.launch_success === true
          : m.launch_success === false
        : true;

      const matchLanding = this.landStatus
        ? this.landStatus === 'success'
          ? m.rocket?.first_stage?.cores?.[0]?.land_success === true
          : m.rocket?.first_stage?.cores?.[0]?.land_success === false
        : true;

      return matchYear && matchLaunch && matchLanding;
    });
  }

  resetFilters() {
    this.filterYear = '';
    this.launchStatus = '';
    this.landStatus = '';
    this.missions = this.allMissions;
  }

  goToDetails(id: number) {
    this.router.navigate(['/missiondetails', id]);
  }

  filterByYear() {
    if (this.filterYear.trim()) {
      this.api
        .getMissionsByYear(this.filterYear)
        .subscribe((data) => (this.missions = data));
    }
  }
}
