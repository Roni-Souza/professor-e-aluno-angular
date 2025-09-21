import { Component } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product-service';


@Component({
  selector: 'app-professor-component',
  standalone: false,
  templateUrl: './professor-component.html',
  styleUrl: './professor-component.css'
})
export class ProfessorComponent {
products: Product[] = [];
  formGroupProfessor: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private service: ProductService) {

    this.formGroupProfessor = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      area: [''],
      degree: ['']
    });

  }


  ngOnInit(): void {
    this.service.getAllProducts().subscribe(
      {
        next: json => this.products = json
      }
    );
  }

  save() {
    this.service.save(this.formGroupProfessor.value).subscribe(
      {
        next: json => {
          this.products.push(json);
          this.formGroupProfessor.reset();
        }
      }
    )
  }

  onClickDelete(product: Product) {
    this.service.delete(product).subscribe(
      {
        next: () => {
          this.products = this.products.filter(p => p.id != product.id);
        }
      }
    )
  }

  onClickUpdate(product: Product) {
      this.formGroupProfessor.setValue(product);
      this.isEditing = true;
  }

  update() {
     this.service.update(this.formGroupProfessor.value).subscribe(
        {
          next: json => {
            let index = this.products.findIndex(p => p.id == json.id);
            this.products[index] = json;
            this.isEditing = false;
            this.formGroupProfessor.reset();
          }
        }
      )
  }

}
