import { AbstractControl, ValidatorFn } from '@angular/forms';

export function linkValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const linkPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (control.value && !linkPattern.test(control.value)) {
      return { 'invalidLink': { value: control.value } };
    }

    return null;
  };
}
