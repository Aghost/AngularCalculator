import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  operatorActive:boolean = false;
  input:string = '';
  result:string = '';
  display:string = '';
  history:string[] = [];
 
  pressNum(num: string) {
    this.display = "";

    if (num === ".") {
      if (this.input.length < 1) {
          return;
      }
      if (this.input != "") {
        if (this.getLastOperand().lastIndexOf(".") >= 0) return;
      }
    }
 
    if (num=="0") {
      if (this.input == "0")
        return;

      const PreviousKey = this.input[this.input.length - 1];
      this.display = PreviousKey;

      if (PreviousKey === '/') {
        this.display = "oh, you want to divide by 0 now? good luck buddy!";
          return;
      }

      if (PreviousKey === '*' || PreviousKey === '-' || PreviousKey === '+')  {
        this.display = "this is rather futile...";
          return;
      }
    }
 
    this.input = this.input + num;
    this.calculateAnswer();
  }

  pressOperator(op: string) {
    const lastKey = this.input[this.input.length - 1];

    if (this.input[this.input.length - 1] === '/' ||
        this.input[this.input.length - 1] === '*' ||
        this.input[this.input.length - 1] === '-' ||
        this.input[this.input.length - 1] === '+') {
        return;
    }
   
    this.input = this.input + op;
    this.calculateAnswer();
  }
 
  getLastOperand() {
    let pos:number;
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    return this.input.substr(pos+1)
  }
 
  calculateAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  { formula=formula.substr(0, formula.length - 1); }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0, formula.length - 1);
    }
 
    this.result = eval(formula);
  }

  addHistory(str: string) {
    this.history.push(str);
    this.display = this.history.join(' ');
  }
 
  getAnswer() {
    this.calculateAnswer();
    this.addHistory('[' + this.input + '=' + this.result + ']');

    this.result = '';
    this.input = '';
  }

  infixPostfix(str: string) {
    let inputstring: string = str + 'E';
    let outputStack: number[] = [];
    let operatorStack: string[] = [];
    let tmpnum: string = "";

    for (var i = 0; i < inputstring.length; i++) {
        if (!isNaN(parseInt(inputstring[i], 10))) {
            tmpnum += inputstring[i];
        } else {
            outputStack.push(parseInt(tmpnum));
            operatorStack.push(inputstring[i]);
            tmpnum = "";
        }
    }

    for (var i = 0; i < outputStack.length; i++) {
        console.log(outputStack[i]);
    }

    for (var i = 0; i < operatorStack.length; i++) { 
        console.log(operatorStack[i]);
    }
  }

  clear() {
    this.infixPostfix("-100000+50-1010*299");
    if (this.input != "") { this.input=this.input.substr(0, this.input.length-1) }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
    this.display = '';
    this.history = [];
  }
 
}
