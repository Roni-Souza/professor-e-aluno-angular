import { Component } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.formGroupProfessor = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      materia: [''],
      degree: ['', Validators.required],

      // Campos extras: checkboxes para as matérias
      analise: [false],
      bancoDeDados: [false],
      redes: [false],
      gestaoComercial: [false],
      financas: [false],
      marketing: [false],
      administracao: [false]
    });
  }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: json => this.products = json
    });
  }

  save() {
    if (this.formGroupProfessor.valid) {
      this.montarMateria(); 
      this.service.save(this.formGroupProfessor.value).subscribe({
        next: json => {
          this.products.push(json);
          this.formGroupProfessor.reset();
        }
      });
    } else {
      this.formGroupProfessor.markAllAsTouched(); // força exibir mensagens de erro
    }
  }

  update() {
    if (this.formGroupProfessor.valid) {
      this.montarMateria(); 
      this.service.update(this.formGroupProfessor.value).subscribe({
        next: json => {
          let index = this.products.findIndex(p => p.id == json.id);
          this.products[index] = json;
          this.isEditing = false;
          this.formGroupProfessor.reset();
        }
      });
    } else {
      this.formGroupProfessor.markAllAsTouched();
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
    this.formGroupProfessor.setValue({
      id: product.id,
      name: product.name,
      email: product.email,
      materia: product.materia,
      degree: product.degree,

      analise: product.materia?.includes('Análise e Desenvolvimento de Sistemas') || false,
      bancoDeDados: product.materia?.includes('Banco de Dados') || false,
      redes: product.materia?.includes('Redes') || false,
      gestaoComercial: product.materia?.includes('Gestão Comercial') || false,
      financas: product.materia?.includes('Finanças') || false,
      marketing: product.materia?.includes('Marketing') || false,
      administracao: product.materia?.includes('Administração') || false
    });

    this.isEditing = true;
  }

  private montarMateria(): void {
    const formValue = this.formGroupProfessor.value;
    const materiasSelecionadas = [];

    if (formValue.analise) materiasSelecionadas.push('Análise e Desenvolvimento de Sistemas');
    if (formValue.bancoDeDados) materiasSelecionadas.push('Banco de Dados');
    if (formValue.redes) materiasSelecionadas.push('Redes');
    if (formValue.gestaoComercial) materiasSelecionadas.push('Gestão Comercial');
    if (formValue.financas) materiasSelecionadas.push('Finanças');
    if (formValue.marketing) materiasSelecionadas.push('Marketing');
    if (formValue.administracao) materiasSelecionadas.push('Administração');

    this.formGroupProfessor.patchValue({
      materia: materiasSelecionadas.join(', ')
    });
  }
}
