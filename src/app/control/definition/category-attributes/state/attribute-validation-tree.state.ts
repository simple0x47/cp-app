import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {RegisterTreeNode, RemoveTreeNode} from "./attribute-validation-tree.actions";
import {AttributeValidationTreeModel} from "./attribute-validation-tree.model";

@State<AttributeValidationTreeModel>({
  name: 'AttributeValidationTreeNodes',
  defaults: {
    map: new Map()
  },
})
@Injectable()
export class AttributeValidationTreeState {
  @Action(RegisterTreeNode)
  public registerTreeNode(context: StateContext<AttributeValidationTreeModel>, action: RegisterTreeNode) {
    const state = context.getState();
    const deepestTreeNode = state.map.get(action.attributeId);

    if (!deepestTreeNode) {
      state.map.set(action.attributeId, action.treeNode);
      return;
    }

    action.treeNode.parent = deepestTreeNode;
    state.map.set(action.attributeId, action.treeNode);
  }

  @Action(RemoveTreeNode)
  public removeTreeNode(context: StateContext<AttributeValidationTreeModel>, action: RemoveTreeNode) {
    const state = context.getState();
    const deepestTreeNode = state.map.get(action.attributeId);

    if (!deepestTreeNode) {
      return;
    }

    if (!deepestTreeNode.parent) {
      state.map.delete(action.attributeId);
      return;
    }

    state.map.set(action.attributeId, deepestTreeNode.parent);
  }
}
