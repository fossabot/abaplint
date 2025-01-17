import {Registry} from "../../src/registry";
import {MemoryFile} from "../../src/files";
import {ConstructorVisibilityPublic} from "../../src/rules";
import {expect} from "chai";

describe("rule, constructor_visibility_public, one error", function () {
  const abap = "CLASS zcl_abapgit_persist_settings DEFINITION PUBLIC CREATE PRIVATE.\n" +
    "  PRIVATE SECTION.\n" +
    "    METHODS constructor.\n" +
    "ENDCLASS.\n" +
    "CLASS ZCL_ABAPGIT_PERSIST_SETTINGS IMPLEMENTATION.\n" +
    "METHOD constructor.\n" +
    "ENDMETHOD.\n" +
    "ENDCLASS.";

  const reg = new Registry().addFile(new MemoryFile("zcl_abapgit_persist_settings.clas.abap", abap)).parse();
  const rule = new ConstructorVisibilityPublic();
  const issues = rule.run(reg.getObjects()[0]);
  it("constructor_visibility_public test", () => {
    expect(issues.length).to.equals(1);
  });
});

describe("rule, constructor_visibility_public, ok", function () {
  const abap = "CLASS zcl_abapgit_persist_settings DEFINITION PUBLIC CREATE PRIVATE.\n" +
    "  PUBLIC SECTION.\n" +
    "    METHODS constructor.\n" +
    "ENDCLASS.\n" +
    "CLASS ZCL_ABAPGIT_PERSIST_SETTINGS IMPLEMENTATION.\n" +
    "METHOD constructor.\n" +
    "ENDMETHOD.\n" +
    "ENDCLASS.";

  const reg = new Registry().addFile(new MemoryFile("zcl_abapgit_persist_settings.clas.abap", abap)).parse();
  const rule = new ConstructorVisibilityPublic();
  const issues = rule.run(reg.getObjects()[0]);
  it("constructor_visibility_public test", () => {
    expect(issues.length).to.equals(0);
  });
});

