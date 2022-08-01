## How validation reliazed

At first `formValidation` function starts,
creates three variables and add event listener to a form.

### Clicking `submit` button

1. First a program go throw all the form elements and check its validity.

In `if` block a program checks if element should to be checked and not to be disabled.

In switch block program check form element type, depending on it program choose appropriate checking method.(1)

> ```
> // 1
>Array.from(bookingForm.elements).forEach(elemToValidate => {
>	if (elemToValidate.dataset.req && !elemToValidate.disabled) {
>		switch (elemToValidate.type) {
>			case 'email':
>				checkingValidation(
>					Boolean(!emailExp.test(elemToValidate.value)),
>					elemToValidate)();
>					break;
>			case 'checkbox':
>				checkingValidation(
>					Boolean(!elemToValidate.checked),
>					elemToValidate)();
>					break;
>			default:
>				checkingValidation(
>					Boolean(!elemToValidate.value),
>					elemToValidate)();
>		}
>	}
>});
>```

If program find the first form element that has some problem, it underline that element with red line and throw an error in `alert` message.(2)

>```
> // 2
>try {
> // -> 1
> // -> 3
>} catch (error) {
>	alert(error);
>}
>```

2. Secondary if all the elements passed a check, the (3) code start.

It go throw all the form elements again and choose only those which have name attribute and not disabled. After that program insert element's data into `objectFormData`, which can be sent to the server.


> ```// 3
>Array.from(bookingForm.elements).forEach(elem => {
>	if (elem.name && !elem.disabled) {
>		Object.assign(objectWithFormData, objectToFillIn(elem));
>	}
>});
>```
