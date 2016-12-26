import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "OPEN DATASET lv_file_name FOR OUTPUT IN BINARY MODE.",
  "OPEN DATASET lv_element FOR INPUT IN TEXT MODE ENCODING DEFAULT.",
  "OPEN DATASET filename FOR INPUT IN BINARY MODE.",
  "OPEN DATASET filename FOR INPUT IN BINARY MODE AT POSITION foo-pos.",
  "open dataset filename for input in text mode at position lv_pos encoding default.",
];

statementType(tests, "OPEN", Statements.Open);