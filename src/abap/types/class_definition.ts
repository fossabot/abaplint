import {StructureNode} from "../../abap/nodes";
import {MethodDefinitions} from "./method_definitions";
import {SuperClassName} from "../../abap/expressions";
import * as Statements from "../../abap/statements";
import * as Structures from "../../abap/structures";
import * as Expressions from "../../abap/expressions";
import {ClassAttributes} from "./class_attributes";
import {Identifier} from "./_identifier";

// todo, is this the same as an InterfaceDefinition?
export class ClassDefinition extends Identifier {
  private node: StructureNode;

  constructor(node: StructureNode) {
    if (!(node.get() instanceof Structures.ClassDefinition)) {
      throw new Error("ClassDefinition, unexpected node type");
    }

    const name = node.findFirstStatement(Statements.ClassDefinition)!.findFirstExpression(Expressions.ClassName)!.getFirstToken();
    super(name, node);

    this.node = node;
  }

  public getMethodDefinitions(): MethodDefinitions | undefined {
    if (!this.node) { return undefined; }
    return new MethodDefinitions(this.node);
  }

  public getSuperClass(): string | undefined {
    if (!this.node) { return undefined; }
    const found = this.node.findFirstStatement(Statements.ClassDefinition);
    const token = found ? found.findFirstExpression(SuperClassName) : undefined;
    return token ? token.getFirstToken().getStr() : undefined;
  }

  public getAttributes(): ClassAttributes | undefined {
    if (!this.node) { return undefined; }
    return new ClassAttributes(this.node);
  }

  public isException(): boolean {
    const superClass = this.getSuperClass();
    // todo, this logic is not correct
    if (superClass && superClass.match(/^.?cx_.*$/i)) {
      return true;
    } else {
      return false;
    }
  }

  public isLocal(): boolean {
    return !this.isGlobal();
  }

  public isGlobal(): boolean {
    return this.node.findFirstExpression(Expressions.Global) !== undefined;
  }

  public isFinal(): boolean {
    return this.node.findFirstExpression(Expressions.ClassFinal) !== undefined;
  }

  public getImplementing(): string[] {
    const ret = [];
    for (const node of this.node.findAllStatements(Statements.InterfaceDef)) {
      ret.push(node.findFirstExpression(Expressions.InterfaceName)!.getFirstToken().getStr());
    }

    return ret;
  }

  /*
  public getFriends()

  public isAbstract(): boolean {
// todo
    return false;
  }

  public isForTesting(): boolean {
// todo
    return false;
  }

  public getEvents() {
*/

}