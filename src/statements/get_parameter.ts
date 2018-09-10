import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, IRunnable} from "../combi";
import {Target} from "../expressions";

export class GetParameter extends Statement {

  public static get_matcher(): IRunnable {
    let ret = seq(str("GET PARAMETER ID"),
                  new Reuse.Source(),
                  str("FIELD"),
                  new Target());

    return ret;
  }

}