import {Statement} from "./statement";
import {str, seq, per, opt, alt, plus, IRunnable} from "../combi";
import * as Reuse from "./reuse";
import {Target} from "../expressions";

export class ReadLine extends Statement {

  public static get_matcher(): IRunnable {
    let val = seq(str("LINE VALUE INTO"),
                  new Target());

    let fields = seq(new Target(), opt(seq(str("INTO"), new Target())));

    let field = seq(str("FIELD VALUE"),
                    plus(fields));

    let index = seq(str("INDEX"), new Reuse.Source());

    let page = seq(str("OF PAGE"), new Reuse.Source());

    let current = str("OF CURRENT PAGE");

    return seq(str("READ"),
               alt(str("CURRENT LINE"), seq(str("LINE"), new Reuse.Source())),
               opt(per(val, index, field, page, current)));
  }

}