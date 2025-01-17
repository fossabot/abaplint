import {Exporting} from "../../src/rules/exporting";
import {testRule} from "./_utils";

const tests = [
  {abap: "zcl_class=>methodname( EXPORTING iv_foo = '23' ).", cnt: 1},
  {abap: "zcl_class=>methodname( exporting iv_foo = '23' ).", cnt: 1},
  {abap: "zcl_class=>methodname( iv_foo = '23' ).", cnt: 0},
];

testRule(tests, Exporting);