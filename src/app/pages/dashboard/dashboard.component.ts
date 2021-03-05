import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  requestArray: any = [];
  sellersArray: any = [];
  selectedSeller = "";
  sellerObj;
  constructor(private api: ApiService, private alret: AlertService) { }

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers() {
    this.api.get('getAllSellers?name').subscribe((result) => {
      this.sellersArray = result;
      const seller = localStorage.getItem('selectedSeller');
      if (seller)
        this.selectedSeller = seller;
      else
        this.selectedSeller = result[0]._id;
      this.getSellerObj();
      this.getRequests();
    })
  }


  getSellerObj() {


    localStorage.setItem('selectedSeller', this.selectedSeller);
    this.sellerObj = this.sellersArray.find((seller) => {
      if (this.selectedSeller === seller._id)
        return seller;
    })
  }

  getRequests() {
    const endpoint = 'getSlotRequest?seller=' + this.selectedSeller;
    this.api.get(endpoint).subscribe((result) => {
      this.requestArray = result;
    })
  }

  selectedId;
  selectedStatus;

  changeStatus(status, id) {
    this.selectedId = id;
    this.selectedStatus = status;
    const state = status === 'accepted' ? 'accept' : 'reject';
    let alertData = {
      title: "Are you Sure ?",
      text: `Do you want to ${state} the request ?`,
      icon: "warning"
    }
    this.alret.showConfirmAlert(alertData, this.confirmChangeStatus.bind(this));

  }

  confirmChangeStatus() {
    const data = {
      id: this.selectedId,
      status: this.selectedStatus
    };
    this.api.put('updateSlotRequest', data).subscribe((result) => {
      if (result) {
        this.getRequests();
      }
    })
  }



}
