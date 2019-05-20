import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { NgxUiLoaderService, Loader } from "ngx-ui-loader";
import { delay } from "q";

@Component({
  selector: "app-notify-sample.",
  templateUrl: "./notify-sample.component.html",
  styleUrls: ["./notify-sample.component.css"]
})
export class NotifySampleComponent extends AppComponentBase
  implements OnInit {

  loader: Loader;

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    injector: Injector) {

    super(injector);
  }

  onSuccess() {
    this.notify.success("This is a success message", "Success", { positionClass: 'toast-top-right' });
  }
  onInfo() {
    this.notify.info("This is an info message", "Info", { positionClass: 'toast-top-right' });
  }
  onError() {
    this.notify.error("This is an error message", "Error", { positionClass: 'toast-top-right' });
  }
  onWarn() {
    this.notify.warn("This is a warning message", "Warning", { positionClass: 'toast-top-right' });
  }

  async setBusyUILoader() {
    this.ngxUiLoaderService.start();
    await delay(3000);
    this.ngxUiLoaderService.stop();
  }

  ngOnInit() {
    this.loader = this.ngxUiLoaderService.getLoader();
  }

  getLoader() {
    this.loader = this.ngxUiLoaderService.getLoader();
  }
}
