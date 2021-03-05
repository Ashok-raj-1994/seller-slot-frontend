import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-add-time-slot',
  templateUrl: './add-time-slot.component.html',
  styleUrls: ['./add-time-slot.component.scss']
})
export class AddTimeSlotComponent implements OnInit {

  time = {
    from: '',
    to: ''
  }
  seller;
  availableSlots = [];
  sellerObj;
  constructor(private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit(): void {
    this.seller = this.route.snapshot.params.seller;
    this.getAvailabeSlots();
    this.getSellerDetail();
  }

  getSellerDetail() {
    const endpoint = 'getSellerById?id=' + this.seller;
    this.api.get(endpoint).subscribe((result: any) => {
      if (result) {
        this.sellerObj = result;
      }
    })
  }

  getAvailabeSlots() {
    const endpoint = 'getSlots?seller=' + this.seller;
    this.api.get(endpoint).subscribe((result: any) => {
      if (result) {
        this.availableSlots = result;
      }
    })
  }

  addSlot() {
    console.log(this.time)
    const { from, to } = this.time;
    if (!from || !to) {
      return;
    }
    const data = {
      seller: this.seller,
      slot: `${from} - ${to}`
    }
    this.api.post('addSlot', data).subscribe((result) => {
      if (result) {
        this.time = { from: '', to: '' };
        this.getAvailabeSlots();
      }
    })
  }
}
