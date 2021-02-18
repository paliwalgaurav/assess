import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface DrinksDetails {
  dateModified: string;
  idDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strInstructions: string;
  strInstructionsDE: string;
  strMeasure1: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cocktail';
  public cocktails: Array<DrinksDetails> = [];
  public categories: Array<string> = [];
  public ingredients: Array<string> = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchCocktails();
  }

  fetchCocktails = async () => {
    await this.http
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php/?s`)
      .subscribe( cocktails => {
        // @ts-ignore
        this.cocktails = cocktails.drinks;
        this.createCategoryFilter();
        this.createIngredientsFilter();
      });
  }

  createCategoryFilter = () => {
    let options: Array<string> = [];
    if (this.cocktails.length) {
      options = options.concat([...new Set(this.cocktails.map(cocktail => cocktail.strCategory))]);
    }
    this.categories = options;
  }

  createIngredientsFilter = () => {
    let options: Array<string> = [];
    if (this.cocktails.length) {
      options = options.concat([...new Set(this.cocktails.map(cocktail => cocktail.strCategory))]);
    }
    this.ingredients = options;
  }

  filterCocktails = (event: any, type?: string): Array<DrinksDetails> => {
    if (type) {
      // @ts-ignore
      const cocktails = this.cocktails.filter((cocktail) => cocktail[type] === event.target.value);
      this.cocktails = cocktails;
    }
    return this.cocktails;
  }

  search = (event: any): Array<DrinksDetails> => {
    setTimeout(() => {
      console.log(event.target.value);
      return this.cocktails;
    }, 500);
    return [];
  }
}
