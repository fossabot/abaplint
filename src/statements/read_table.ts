import {Statement} from "./statement";
import {str, seq, alt, opt, optPrio, plus, per, IRunnable} from "../combi";
import * as Reuse from "./reuse";
import {FSTarget, Target} from "../expressions";

export class Read extends Statement {

  public static get_matcher(): IRunnable {
    let comparing = seq(str("COMPARING"), new Reuse.Field());

    let target = alt(seq(str("ASSIGNING"), new FSTarget()),
                     seq(opt(str("REFERENCE")), str("INTO"), new Target()),
                     str("TRANSPORTING NO FIELDS"));

    let index = seq(str("INDEX"), new Reuse.Source());

    let compare = seq(alt(new Target(), new Reuse.Dynamic()),
                      str("="),
                      new Reuse.Source());

    let components = seq(alt(new Reuse.Field(), new Reuse.Dynamic()), str("COMPONENTS"), plus(compare));

    let key = seq(alt(str("WITH KEY"), str("WITH TABLE KEY")),
                  alt(plus(compare),
                      components,
                      seq(optPrio(str("=")), new Reuse.Source())));

    let using = seq(str("USING KEY"), alt(new Reuse.Field(), new Reuse.Dynamic()));

    let from = seq(str("FROM"), new Reuse.Source());

    let perm = per(alt(index,
                       key,
                       from),
                   target,
                   using,
                   comparing,
                   str("CASTING"),
                   seq(str("TRANSPORTING"), plus(new Reuse.Field())),
                   str("BINARY SEARCH"));

    return seq(str("READ TABLE"),
               new Reuse.Source(),
               opt(perm));
  }

}