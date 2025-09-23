import { Component } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product-service';

<<<<<<< HEAD
=======

>>>>>>> 941b4fd3250ddd0c0e5937011d1866964599e42d
@Component({
  selector: 'app-professor-component',
  standalone: false,
  templateUrl: './professor-component.html',
  styleUrl: './professor-component.css'
})
export class ProfessorComponent {
<<<<<<< HEAD
  products: Product[] = [];
  formGroupProfessor: FormGroup;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
=======
products: Product[] = [];
  formGroupProfessor: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private service: ProductService) {

>>>>>>> 941b4fd3250ddd0c0e5937011d1866964599e42d
    this.formGroupProfessor = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
<<<<<<< HEAD
      materia: [''],
      degree: [''],

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
    this.montarMateria(); // Adiciona matérias antes de salvar
    this.service.save(this.formGroupProfessor.value).subscribe({
      next: json => {
        this.products.push(json);
        this.formGroupProfessor.reset();
      }
    });
  }

  update() {
    this.montarMateria(); // Adiciona matérias antes de atualizar
    this.service.update(this.formGroupProfessor.value).subscribe({
      next: json => {
        let index = this.products.findIndex(p => p.id == json.id);
        this.products[index] = json;
        this.isEditing = false;
        this.formGroupProfessor.reset();
      }
    });
  }

  onClickDelete(product: Product) {
    this.service.delete(product).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id != product.id);
      }
    });
  }

  onClickUpdate(product: Product) {
    // Preenche o form com os dados existentes
    this.formGroupProfessor.setValue({
      id: product.id,
      name: product.name,
      email: product.email,
      materia: product.materia,
      degree: product.degree,

      // Define os checkboxes com base nas matérias salvas
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

  // Junta os checkboxes selecionados em uma string e atualiza o campo 'materia'
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

    // Atualiza o campo 'materia' no formulário
    this.formGroupProfessor.patchValue({
      materia: materiasSelecionadas.join(', ')
    });
  }
=======
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

>>>>>>> 941b4fd3250ddd0c0e5937011d1866964599e42d
}
