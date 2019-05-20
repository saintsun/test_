import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconsService } from '.pages/ui/iconspage/icons.service';

@Component({
  selector: 'app-tt-icons',
  templateUrl: './tt-icons.component.html',
  styleUrls: ['./tt-icons.component.css']
})
export class TtIconsComponent implements OnInit {
  fontawesome = [];
  iconFilter: any = { label: '', class: '' };
  searchHidden: boolean = true;
  constructor(private _service: IconsService, private http: HttpClient) {

  }
  onSearch(event: string): void {
    this.iconFilter = {
      label: event, class: event
    }
    if (event == "") {
      this.searchHidden = true;
    }
    else {
      this.searchHidden = false;
    }
  }

  ngOnInit() {
    // Retrieve posts from the API
    this._service.getFontAwesome().subscribe(icons => {
      this.fontawesome = icons;
    });

  }

  showIconResults() {
    if (!this.searchHidden) {
      return { 'transform': 'translateY(-260px)' }
    }
    else {
      return { 'transform': 'translateY(0)' }
    }
  }

}
