import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  public menus = [];

  constructor(private _menuService : MenuService) { }

  ngOnInit() {
    this.menus.push(this._menuService.getMenu(1));
    this.menus.push(this._menuService.getMenu(0));
  }

}
