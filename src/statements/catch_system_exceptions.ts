import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, plus, IRunnable} from "../combi";
import {Integer} from "../expressions";

export class CatchSystemExceptions extends Statement {

  public static get_matcher(): IRunnable {
    return seq(str("CATCH SYSTEM-EXCEPTIONS"),
               plus(seq(new Reuse.Field(), str("="), new Integer())));
  }

  public isStructure() {
    return true;
  }

  public isValidParent() {
    return true;
  }

  public indentationStart() {
    return -2;
  }

  public indentationEnd() {
    return 2;
  }

}