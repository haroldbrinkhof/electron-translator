import { Component, OnInit } from '@angular/core';
import { SettingStorageHandlerService } from '../../services/setting-storage-handler.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	settingsFilePath:string = 'not available';

  constructor(private settingStorageHandlerService:SettingStorageHandlerService) { }

  ngOnInit(): void {
	  this.settingsFilePath = this.settingStorageHandlerService.getSettingsFilePath();
  }

}
