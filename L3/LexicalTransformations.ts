import { ClassExp, ProcExp, Exp, Program, IfExp, isExp, isCExp, isDefineExp, isIfExp, isLitExp, makeDefineExp, isAtomicExp, isAppExp, isProcExp, isLetExp, isProgram, makeProgram, makeLetExp, makeBinding, isClassExp, makeLitExp } from "./L3-ast";
import { Result, makeFailure, makeOk, mapResult, mapv } from "../shared/result";
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
                makeAppExp(makePrimOp("eq?"),[makeVarRef("msg"), makeLitExp({ tag: "SymbolSExp", val: methods[i].var.var })]),
                methods[i].val,
                makeConditions(methods,i+1)
            ) 


/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> => 
    isExp(exp) ? makeOk(rewriteAllClassExp(exp)) : 
    isProgram(exp) ? makeOk(makeProgram(exp.exps.map(rewriteAllClassExp))) :
    makeFailure(exp);

const rewriteAllClassExp = (exp: Exp): Exp =>
    isCExp(exp) ? rewriteAllClassCExp(exp) :
    isDefineExp(exp) ? makeDefineExp(exp.var, rewriteAllClassCExp(exp.val)) :
    exp;

const rewriteAllClassCExp = (exp: CExp): CExp =>
    isAtomicExp(exp) ? exp :
    isLitExp(exp) ? exp :
    isIfExp(exp) ? makeIfExp(rewriteAllClassCExp(exp.test), rewriteAllClassCExp(exp.then), rewriteAllClassCExp(exp.alt)) :
    isAppExp(exp) ? makeAppExp(rewriteAllClassCExp(exp.rator), exp.rands.map(rewriteAllClassCExp)) :
    isProcExp(exp) ? makeProcExp(exp.args, exp.body.map(rewriteAllClassCExp)) :
    isLetExp(exp) ? makeLetExp(exp.bindings.map((b : Binding) : Binding => 
                                            makeBinding(b.var.var, rewriteAllClassCExp(b.val))), exp.body.map(rewriteAllClassCExp)) :
    isClassExp(exp) ? class2proc(exp) :
    exp;