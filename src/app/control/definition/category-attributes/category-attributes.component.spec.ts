import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryAttributesComponent} from './category-attributes.component';
import {DefinitionService} from 'src/app/definition/definition.service';
import {EntityProviderService} from 'src/app/entity-api/entity-provider.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {DefinitionServiceMock} from './definition.service.mock';
import {Category} from 'src/app/definition/category';
import {Attribute} from 'src/app/definition/attribute';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {EntitySelectorComponent} from 'src/app/controls/entity-selector/entity-selector.component';
import {ControlsModule} from 'src/app/controls/controls.module';
import {ProductCompositionComponent} from '../../product-composition/product-composition.component';
import {ProductCompositionDialogComponent} from '../../product-composition-dialog/product-composition-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

describe('CategoryAttributesComponent', () => {
  let component: CategoryAttributesComponent;
  let fixture: ComponentFixture<CategoryAttributesComponent>;
  let definitionService: DefinitionService;
  let entityProviderService: EntityProviderService;

  beforeEach(async () => {
    definitionService = new DefinitionServiceMock();
    entityProviderService = new EntityProviderService();

    await TestBed.configureTestingModule({
      declarations: [
        CategoryAttributesComponent,
        ProductCompositionComponent,
        ProductCompositionDialogComponent
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatIconModule,
        ControlsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: DefinitionService, useValue: definitionService
        },
        {
          provide: EntityProviderService, useValue: entityProviderService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spawns corresponding component for each attribute', () => {
    let primitiveTypes = new Category("primitive", "Le Primitive", false, [
      // Primitive types
      new Attribute("string_input", "String Input", "string", false),
      new Attribute("integer_input", "Integer Input", "integer", false),
      new Attribute("decimal_input", "Decimal Input", "decimal", false),
      new Attribute("datetime_input", "DateTime Input", "datetime", true),
      new Attribute("date_input", "Date Input", "date", true),

      // Types with custom directives
      new Attribute("boolean_checkbox", "Boolean Checkbox", "boolean", false),
      new Attribute("enum_select", "Enum Select", "enum#example", true),
      new Attribute("entity_selector", "Entity Selector", "entity#producer", false),
      new Attribute("composition", "Composition", "comp#example", false)
    ], []);

    component.category = primitiveTypes;
    component.ngOnInit();
    component.ngAfterViewInit();
    fixture.detectChanges();

    // All types seem to generate an input, except the composition attribute -> 7.
    expect(fixture.debugElement.queryAll(By.css("input")).length).toBe(7);

    // One checkbox for the boolean attribute.
    expect(fixture.debugElement.queryAll(By.directive(MatCheckbox)).length).toBe(1);
    // One select for the enum attribute.
    expect(fixture.debugElement.queryAll(By.directive(MatSelect)).length).toBe(1);

    expect(fixture.debugElement.queryAll(By.directive(EntitySelectorComponent)).length).toBe(1);

    expect(fixture.debugElement.queryAll(By.directive(ProductCompositionComponent)).length).toBe(1);
  });
});

function printChildren(element: DebugElement) {
  console.log("element: " + element.name + "; value: " + element.nativeElement);

  for (const child of element.children) {
    printChildren(child);
  }
}
