import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
//import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  @Input() dish: any;

  dishId: number;
  //dish: any = {};
  cart = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.dishId = +this.route.snapshot.paramMap.get('id');

    this.dish = {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Pasta with creamy egg sauce and bacon',
      price: 12.99,
      imageUrl: 'https://www.example.com/images/spaghetti-carbonara.jpg',
    };

    /*     const getDish = async () => {
      this.dish = await Preferences.get({ key: 'name' });

      console.log(`Hello ${this.dish}!`);
    }; */

    /*     this.storage.get('dishes').then((dishes: any[]) => {
      this.dish = dishes.find((d) => d.id === this.dishId);
    }); */
  }

  AddDishToCart(dish) {
    this.cart.push(dish);

    async () => {
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cart),
      });
    };

    //    this.cart.push(dish);

    //localStorage.setItem('cart');
  }
}

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
