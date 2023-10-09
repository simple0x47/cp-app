import {Category} from "../../../../../../cwa/src/app/definition/category";

export class CategoryTreeNode {
  public sourceCategory: Category;
  public children: CategoryTreeNode[];
  public visibleChildren: CategoryTreeNode[];

  public constructor(sourceCategory: Category) {
    this.sourceCategory = sourceCategory;
    const children = [];

    for (const childCategory of sourceCategory.children) {
      children.push(new CategoryTreeNode(childCategory));
    }

    this.children = children;
    this.visibleChildren = children;
  }

  /**
   * Main filtering function. To be always executed first (before filterByIds or filterExcludedIds).
   * @param message
   * @param force
   * @returns
   */
  public filter(message: string, force: boolean): boolean {
    if ((this.sourceCategory.name.toLowerCase().includes(message)) || (force)) {
      this.visibleChildren = this.children;
      force = true;
    }

    this.visibleChildren = this.children.filter(childNode => {
      return childNode.filter(message, force);
    });

    if (force) {
      return true;
    }

    return this.visibleChildren.length > 0;
  }

  public filterByIds(ids: string[], force: boolean): boolean {
    if ((ids.includes(this.sourceCategory.id)) || (force)) {
      force = true;
    }

    this.visibleChildren = this.visibleChildren.filter(childNode => {
      const childNodeResult = childNode.filterByIds(ids, force);

      return childNodeResult;
    });

    if (force) {
      return true;
    }

    return this.visibleChildren.length > 0;
  }

  /**
   *
   * @param excludedIds
   * @returns true if the category is not excluded, false otherwise.
   */
  public filterExcludedIds(excludedIds: string[]): boolean {
    if (excludedIds.includes(this.sourceCategory.id)) {
      return false;
    }

    this.visibleChildren = this.visibleChildren.filter(childNode => {
      const childNodeResult = childNode.filterExcludedIds(excludedIds);

      return childNodeResult;
    });

    return true;
  }

  public setSelectableChildren(selectableChildrenOfIds: string[], force: boolean) {
    if (force) {
      this.sourceCategory.selectable = true;
    } else {
      this.sourceCategory.selectable = false;
    }

    if (selectableChildrenOfIds.includes(this.sourceCategory.id)) {
      force = true;
    }

    for (const visibleChild of this.visibleChildren) {
      visibleChild.setSelectableChildren(selectableChildrenOfIds, force);
    }
  }
}
