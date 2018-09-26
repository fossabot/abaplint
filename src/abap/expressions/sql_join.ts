import {seq, opt, alt, plus, str, Reuse, IRunnable} from "../combi";
import {DatabaseTable, Field, SQLCond} from "./";

export class SQLJoin extends Reuse {
  public get_runnable(): IRunnable {
    let aas = seq(str("AS"), new Field());

    let joinType = seq(opt(alt(str("INNER"), str("LEFT OUTER"), str("LEFT"))), str("JOIN"));

    let join = seq(joinType,
                   new DatabaseTable(),
                   opt(aas),
                   str("ON"),
                   plus(new SQLCond()));

    return join;
  }
}