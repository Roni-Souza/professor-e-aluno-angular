import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product-disciplina';
import { ProductService } from '../../product-disciplina-service';

@Component({
  selector: 'app-disciplina-component',
  standalone: false,
  templateUrl: './disciplina-component.html',
  styleUrl: './disciplina-component.css'
})
export class DisciplinaComponent {

products: Product[] = [];
  formGroupDisciplina: FormGroup;
  isEditing: boolean = false;

  constructor(formBuilder: FormBuilder,
    private service: ProductService) {

    this.formGroupDisciplina = formBuilder.group({
      id: [''],
      name: [''],
      prerequisite: [''],
      workload: ['']
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
    this.service.save(this.formGroupDisciplina.value).subscribe(
      {
        next: json => {
          this.products.push(json);
          this.formGroupDisciplina.reset();
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
      this.formGroupDisciplina.setValue(product);
      this.isEditing = true;
  }

  update() {
     this.service.update(this.formGroupDisciplina.value).subscribe(
        {
          next: json => {
            let index = this.products.findIndex(p => p.id == json.id);
            this.products[index] = json;
            this.isEditing = false;
            this.formGroupDisciplina.reset();
          }
        }
      )
  }

}