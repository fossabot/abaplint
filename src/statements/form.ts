import {Statement} from "./statement";
import * as Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;
let alt = Combi.alt;
let opt = Combi.opt;
let reg = Combi.regex;
let plus = Combi.plus;

export class Form extends Statement {

  public static get_matcher(): Combi.IRunnable {
    let fieldName = reg(/^\w+$/);

    let field = seq(alt(fieldName, new Reuse.PassByValue()),
                    opt(alt(new Reuse.Type(), new Reuse.TypeTable())));

    let tables = seq(str("TABLES"), plus(field));
    let using = seq(str("USING"), plus(field));
    let changing = seq(str("CHANGING"), plus(field));
    let raising = seq(str("RAISING"), plus(new Reuse.ClassName()));

    let ret = seq(str("FORM"),
                  new Reuse.FormName(),
                  opt(tables),
                  opt(using),
                  opt(changing),
                  opt(raising));

    return ret;
  }

  public isStructure() {
    return true;
  }

  public indentationSetStart() {
    return 0;
  }

  public indentationEnd() {
    return 2;
  }

}