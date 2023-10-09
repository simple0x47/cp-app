import {FlatTreeControl} from '@angular/cdk/tree';
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {Observable, of} from 'rxjs';
import {Category} from "../../../core/definition/category";
import {CategoryIndexClick} from '../category-index/category-index-click';
import {CategoryTreeNode} from './category-tree-node';
import {SelectCategoryEvent} from './select-category-event';

interface TreeNode {
  expandable: boolean;
  name: string;
  level: number;
  category: Category;
}

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit, AfterViewInit {
  public searchControl = new FormControl('');
  public treeControl = new FlatTreeControl<TreeNode>(
    node => node.level,
    node => node.expandable
  );
  @Input()
  public categoryControl: FormControl<Category | null> = new FormControl(null);
  @Input()
  public formGroup: FormGroup = this._formBuilder.group({});
  @Input()
  public categories$: Observable<Category[]> = of([]);
  @Input()
  public filterByIds: string[] | null = null;
  @Input()
  public excludeIds: string[] | null = null;
  @Input()
  public selectableChildrenOfIds: string[] | null = null;
  @Input()
  public allSelectableMode: boolean = false;
  public filteredCategories$: Observable<CategoryTreeNode[]> = of([]);
  @Output()
  public categorySelect: EventEmitter<SelectCategoryEvent> = new EventEmitter();
  @Output()
  public categoryDeselect: EventEmitter<void> = new EventEmitter();

  public constructor(
    private _formBuilder: FormBuilder
  ) {

  }

  private _selectedCategory: Category | null = null;

  public get selectedCategory(): Category | null {
    return this._selectedCategory;
  }

  public set selectedCategory(value: Category | null) {
    this._selectedCategory = value;
    this.categoryControl.setValue(value);

    if (this._selectedCategory) {
      this.categorySelect.emit({target: this._selectedCategory})
    } else {
      this.categoryDeselect.emit();
    }
  }

  public hasChild = (_: number, node: TreeNode) => node.expandable;

  public ngOnInit(): void {
    this.filteredCategories$ = new Observable(observer => {
      let sourceCategories: CategoryTreeNode[] = [];

      const categoriesSubscription = this.categories$.subscribe(categories => {
        const filterValue = this.searchControl.value?.toLowerCase() || '';
        sourceCategories = [];

        for (const category of categories) {
          sourceCategories.push(new CategoryTreeNode(category));
        }

        observer.next(sourceCategories.filter(node => {
          let result = node.filter(filterValue, false);

          if (this.filterByIds) {
            result = result && node.filterByIds(this.filterByIds, false);
          }

          if (this.excludeIds) {
            result = result && node.filterExcludedIds(this.excludeIds);
          }

          if (this.allSelectableMode) {
            this.setNodeAsSelectable(node.sourceCategory, true);
          }

          if (this.selectableChildrenOfIds) {
            node.setSelectableChildren(this.selectableChildrenOfIds, false);
          }

          return result;
        }));
      });

      const inputValueChangeSubscription = this.searchControl.valueChanges.subscribe(value => {
        const filterValue = value?.toLowerCase() || '';
        observer.next(sourceCategories.filter(node => {
          let result = node.filter(filterValue, false);

          if (this.filterByIds) {
            result = result && node.filterByIds(this.filterByIds, false);
          }

          if (this.excludeIds) {
            result = result && node.filterExcludedIds(this.excludeIds);
          }

          if (this.allSelectableMode) {
            this.setNodeAsSelectable(node.sourceCategory, true);
          }

          if (this.selectableChildrenOfIds) {
            node.setSelectableChildren(this.selectableChildrenOfIds, false);
          }

          return result;
        }));
      });

      return {
        unsubscribe() {
          categoriesSubscription.unsubscribe();
          inputValueChangeSubscription.unsubscribe();
        },
      }
    });

    this.filteredCategories$.subscribe(categories => {
      this.dataSource.data = categories;
    });
  }

  public selectCategory(event: CategoryIndexClick) {
    this.selectedCategory = null;
    this.searchControl.setValue(event.targetCategory);
    this.treeControl.expandAll();
  }

  public handleSearchInput() {
    const searchValue = this.searchControl.value;

    if (this.filterByIds) {
      this.treeControl.expandAll();
      return;
    }

    if (!searchValue) {
      this.treeControl.collapseAll();
      return;
    }

    if (typeof searchValue !== "string") {
      this.treeControl.collapseAll();
      return;
    }

    if (searchValue.length === 0) {
      this.treeControl.collapseAll();
      return;
    }

    this.treeControl.expandAll();
  }

  public ngAfterViewInit(): void {
    if (!this.filterByIds) {
      return;
    }

    this.treeControl.expandAll();
  }

  private _transformer = (category: CategoryTreeNode, level: number) => {
    return {
      expandable: category.children.length !== 0,
      name: category.sourceCategory.name,
      level: level,
      category: category.sourceCategory
    }
  };

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.visibleChildren
  )
  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private setNodeAsSelectable(category: Category, selectable: boolean) {
    category.selectable = selectable;

    for (const child of category.children) {
      this.setNodeAsSelectable(child, selectable);
    }
  }
}
