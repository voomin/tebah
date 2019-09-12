import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BaseketService } from 'src/app/services/baseket.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  public menus = [];
  public navbarOpen = false;

  public basket;

  constructor(
    private router: Router,
    public auth: AuthService,
    private _menuService : MenuService,
    private _basketService: BaseketService
    ) {
      router.events.subscribe((val)=>{
        this._menuService.setTitle();
      });
      this.auth.user$.subscribe(u=>{
        this.basket = (u)?this._basketService.getBasket(u.uid):null;
      })
    }

  ngOnInit() {
    this.menus = this._menuService.getMenus();
  }
  toggleNavbar() { this.navbarOpen = !this.navbarOpen; }
  hideNavbar() { this.navbarOpen = false; }
  onDeltoBasket(basketId:string){ this._basketService.setDeltoBasket(basketId); }
}
