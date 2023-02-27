import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DishPage } from 'src/app/dish/dish.page';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  selectedDish;

  public cart = [];
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}
  dishes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Pasta with creamy egg sauce and bacon',
      price: 12.99,
      imageUrl: 'https://www.example.com/images/spaghetti-carbonara.jpg',
    },
    {
      id: 2,
      name: 'Chicken Parmesan',
      description: 'Breaded chicken with tomato sauce and mozzarella cheese',
      price: 14.99,
      imageUrl: 'https://www.example.com/images/chicken-parmesan.jpg',
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      description: 'Pizza with tomato sauce, mozzarella cheese, and basil',
      price: 10.99,
      imageUrl: 'https://www.example.com/images/margherita-pizza.jpg',
    },
  ];

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(dish) {
    this.AddDishToCart(dish);
    //this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      /* this.message = `Hello, ${ev.detail.data}!`; */
    }
  }

  SelectDish(dish) {
    this.selectedDish = dish;
  }

  Order() {
    this.router.navigate(['/order']);
  }

  AddDishToCart(dish) {
    this.cart.push(dish);

    async () => {
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cart),
      });
    };

    this.modal.dismiss(dish, 'confirm');

    //    this.cart.push(dish);

    //localStorage.setItem('cart');
  }

  /*   async SelectDish(dish) {
    const modal = await this.modalCtrl.create({
      component: DishPage,
      componentProps: {
        dish,
      },
    });

    modal.present();

    const setName = async () => {
      await Preferences.set({
        key: 'name',
        value: 'Max',
      });
    };
  } */

  //The Preferences API only supports string values.
  //You can, however, use JSON if you JSON.stringify the object before calling set(),
  //then JSON.parse the value returned from get().

  //JUST AN EXAMPLE
  /*   const setName = async () => {
    await Preferences.set({
      key: 'name',
      value: 'Max',
    });
  };
  
  const checkName = async () => {
    const { value } = await Preferences.get({ key: 'name' });
  
    console.log(`Hello ${value}!`);
  };
  
  const removeName = async () => {
    await Preferences.remove({ key: 'name' });
  }; */

  /*   AddDishToCart(dish) {
    this.cart.push(dish);

    async () => {
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cart),
      });
    };


  } */
}
