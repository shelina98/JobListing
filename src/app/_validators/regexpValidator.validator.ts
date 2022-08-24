import { ValidatorFn, AbstractControl } from '@angular/forms';

export class RegexpValidator {
  static usernameRegexp: RegExp = /^[A-Za-z0-9_]+$/;
  static emailRegexp: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static usernamePatternValidator(control: AbstractControl): any | null {
    return RegexpValidator.patternChecker(RegexpValidator.usernameRegexp)(
      control
    );
  }

  static emailPatternValidator(control: AbstractControl): any | null {
    return RegexpValidator.patternChecker(RegexpValidator.emailRegexp)(control);
  }

  static patternChecker(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value != null && regexp.test(control.value)) return null;
      else {
        return { doesNotMatchPattern: control.value };
      }
    };
  }
}
