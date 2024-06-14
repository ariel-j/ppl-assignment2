import { ClassExp, ProcExp, Exp, Program } from "./L3-ast";
import { Result, makeFailure } from "../shared/result";
import { CExp, makeProcExp, Binding } from "./L3-ast";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/

export const class2proc = (exp: ClassExp): ProcExp => 
    
        (define pair
            (lambda (a b)
            (lambda (msg)
            (if (eq? msg 'first)
            ((lambda () a) )
            (if (eq? msg 'second)
            ((lambda () b) )
            (if (eq? msg 'sum)
            ((lambda () (+ a b)) )
            #f))))))
    );

    /*
    makeProcExp(
        exp.fields, 
        exp.methods.map((binding : Binding) : ProcExp => 
            makeProcExp([binding.var],[binding.val])
        )*/





/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    //@TODO
    makeFailure("ToDo");
