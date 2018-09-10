import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, IRunnable} from "../combi";
import {Target} from "../expressions";

export class ConvertText extends Statement {

  public static get_matcher(): IRunnable {
    return seq(str("CONVERT TEXT"),
               new Reuse.Source(),
               str("INTO SORTABLE CODE"),
               new Target());
  }

}