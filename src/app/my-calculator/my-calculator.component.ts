import { Component } from '@angular/core';

interface CalcVar {
  value: number;
  modifier: CalcModifiers;
}

enum CalcOperations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '/',
}

enum CalcModifiers {
  none = 'none',
  cos = 'cos',
  sin = 'sin',
  sqr = 'sqr',
  sqrt = 'sqrt',
}

@Component({
  selector: 'app-my-calculator',
  templateUrl: './my-calculator.component.html',
  styleUrls: ['./my-calculator.component.scss'],
})
export class MyCalculatorComponent {
  public calcOperations = CalcOperations;

  public calcModifiers = CalcModifiers;

  public calcOperationsArr: CalcOperations[] = [CalcOperations.plus];

  public calcItemsArr: CalcVar[] = [
    {
      value: 0,
      modifier: CalcModifiers.none,
    },
    {
      value: 0,
      modifier: CalcModifiers.none,
    },
  ];
  public result?: number;

  public operationsHistory: string[] = [];

  public addCalcVar(): void {
    this.calcItemsArr.push({
      value: 0,
      modifier: CalcModifiers.none,
    });

    this.calcOperationsArr.push(CalcOperations.plus);
  }

  public removeCalcValue(idx: number): void {
    this.calcItemsArr.splice(idx, 1);
    this.calcOperationsArr.splice(idx - 1, 1);
  }

  private calcModifiedValue(item: CalcVar): number {
    switch (item.modifier) {
      case CalcModifiers.none:
        return item.value;
      case CalcModifiers.cos:
        return Math.cos(item.value);
      case CalcModifiers.sin:
        return Math.sin(item.value);
      case CalcModifiers.sqr:
        return Math.pow(item.value, 2);
      case CalcModifiers.sqrt:
        return Math.sqrt(item.value);
    }
  }

  public calc() {
    let calcRes: number = 0;

    let tempHistStrArr: string[] = [];

    this.calcItemsArr.forEach((item, idx) => {
      if (idx === 0) {
        calcRes = this.calcModifiedValue(item);
      } else {
        switch (this.calcOperationsArr[idx - 1]) {
          case CalcOperations.plus:
            calcRes = calcRes + this.calcModifiedValue(item);
            break;
          case CalcOperations.minus:
            calcRes = calcRes - this.calcModifiedValue(item);
            break;
          case CalcOperations.multiply:
            calcRes = calcRes * this.calcModifiedValue(item);
            break;
          case CalcOperations.divide:
            calcRes = calcRes / this.calcModifiedValue(item);
            break;
        }
      }
    });

    const tempHistVarArr = this.calcItemsArr.map(
      (item) =>
        `${item.modifier === CalcModifiers.none ? '' : item.modifier}${
          item.modifier !== CalcModifiers.none ? `(${item.value})` : item.value
        }`
    );

    tempHistVarArr.forEach((item, idx) => {
      if (idx === 0) {
        tempHistStrArr.push(item);
      } else {
        tempHistStrArr.push(this.calcOperationsArr[idx - 1]);
        tempHistStrArr.push(item);
      }
    });

    tempHistStrArr.push(`= ${calcRes}`);

    const tempHistStr = tempHistStrArr.join(' ');

    this.operationsHistory.push(tempHistStr);

    this.result = calcRes;
  }
}
