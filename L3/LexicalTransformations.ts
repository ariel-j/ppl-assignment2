import { ClassExp, ProcExp, Exp, Program, IfExp } from "./L3-ast";
import { Result, makeFailure } from "../shared/result";
import { CExp, makeProcExp, Binding, makeAppExp, makeVarDecl, makePrimOp, makeIfExp, makeBoolExp, makeVarRef} from "./L3-ast";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/

export const class2proc = (exp: ClassExp): ProcExp => 
    makeProcExp(
        exp.fields,
        [makeProcExp(
            [makeVarDecl("msg")], 
            [makeConditions(exp.methods, 0)])]     
    );

    const makeConditions : (methods: Binding[], i : number) => CExp = (methods, i) => 
        i === methods.length ?  
            makeBoolExp(false) :
            makeIfExp(
                makeAppExp(makePrimOp("="),[makeVarRef("msg"), makeVarRef(methods[i].var.var)]),
                methods[i].val,
                makeConditions(methods,i+1)
            ) 




/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    //@TODO
    makeFailure("ToDo");
