import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, opt, alt, per, plus, IRunnable} from "../combi";
import {FSTarget, Target} from "../expressions";

export class Modify extends Statement {

  public static get_matcher(): IRunnable {
    let index = seq(str("INDEX"), new Reuse.Source());
    let from = seq(str("FROM"), opt(str("TABLE")), new Reuse.Source());
    let transporting = seq(str("TRANSPORTING"),
                           plus(alt(new Reuse.FieldSub(), new Reuse.Dynamic())));
    let where = seq(str("WHERE"), new Reuse.Cond());
    let client = str("CLIENT SPECIFIED");
    let assigning = seq(str("ASSIGNING"), new FSTarget());

    let target = seq(opt(str("TABLE")), alt(new Target(), new Reuse.Dynamic()));

    let conn = seq(str("CONNECTION"), new Reuse.Dynamic());

    let options = per(conn, from, index, transporting, where, client, assigning);

    return seq(str("MODIFY"), target, opt(options));
  }

}