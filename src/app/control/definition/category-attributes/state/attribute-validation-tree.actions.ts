import {AttributeValidationTreeNode} from "../attribute-validation-tree-node";

export class RegisterTreeNode {
  public static readonly type = '[Attribute Validation Tree] Register Tree Node';

  public constructor(
    public attributeId: string,
    public treeNode: AttributeValidationTreeNode
  ) {

  }
}

export class RemoveTreeNode {
  public static readonly type = '[Attribute Validation Tree] Remove Tree Node';

  public constructor(
    public attributeId: string
  ) {

  }
}
