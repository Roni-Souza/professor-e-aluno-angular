import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              private service: ProductService) {

    this.formGroupDisciplina = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      prerequisite: ['', Validators.required],
      workload: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: json => this.products = json
    });
  }

  save() {
    if (this.formGroupDisciplina.valid) {
      this.service.save(this.formGroupDisciplina.value).subscribe({
        next: json => {
          this.products.push(json);
          this.resetForm();
        }
      });
    } else {
      this.formGroupDisciplina.markAllAsTouched(); // força exibir mensagens de erro
    }
  }

  update() {
    if (this.formGroupDisciplina.valid) {
      this.service.update(this.formGroupDisciplina.value).subscribe({
        next: json => {
          let index = this.products.findIndex(p => p.id == json.id);
          this.products[index] = json;
          this.isEditing = false;
          this.resetForm();
        }
      });
    } else {
      this.formGroupDisciplina.markAllAsTouched();
    }
  }

  onClickDelete(product: Product) {
    this.service.delete(product).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id != product.id);
      }
    });
  }

  onClickUpdate(product: Product) {
    this.formGroupDisciplina.setValue(product);
    this.isEditing = true;
  }

  private resetForm() {
    this.formGroupDisciplina.reset({
      id: '',
      name: '',
      prerequisite: '',
      workload: ''
    });
  }
}
