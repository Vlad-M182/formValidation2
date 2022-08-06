'use strict';

function formValidation() {
	const bookingForm = document.querySelector('.booking-room');
	const emailExp = new RegExp(/\S+@\S+\.\w+/, 'i');
	let objectWithFormData = {};

	// function return error if validation failed
	function checkingValidation(
		bool,
		elem,
		exp = `It seems that ${elem.name} field isn't filled correctly.`
	) {
		if (bool) {
			elem.classList.add('error');
			return () => {
				throw new Error(exp);
			};
		}
		return () => {};
	}

	// function return the object with form element data
	function objectToFillIn(elem) {
		switch (elem.type) {
			case 'number':
				return { [elem.name]: +elem.value };
			case 'radio':
				return { [elem.name]: elem.form.elements[elem.name].value };
			case 'checkbox':
				return { [elem.name]: elem.checked ? 'yes' : 'no' };
			default:
				return { [elem.name]: elem.value };
		}
	}

	// submitting form
	bookingForm.addEventListener('submit', e => {
		e.preventDefault();

		try {
			// check form elements on validity
			Array.from(bookingForm.elements).forEach(elemToValidate => {
				if (elemToValidate.dataset.req && !elemToValidate.disabled) {
					switch (elemToValidate.type) {
						case 'email':
							checkingValidation(
								Boolean(!emailExp.test(elemToValidate.value)),
								elemToValidate
							)();
							break;
						case 'checkbox':
							checkingValidation(
								Boolean(!elemToValidate.checked),
								elemToValidate
							)();
							break;
						case 'number':
							const roomType = elemToValidate.form.elements['roomType'];
							const visitorsMin = +roomType.selectedOptions[0].dataset.min;
							const visitorsMax = +roomType.selectedOptions[0].dataset.max;
							const isCorrectVisitorsAmount = !Boolean(
								+elemToValidate.value >= visitorsMin &&
									+elemToValidate.value <= visitorsMax
							);

							checkingValidation(
								isCorrectVisitorsAmount,
								elemToValidate,
								`Amount of visitors should be from ${visitorsMin} to ${visitorsMax} inclusively.`
							)();
							break;
						default:
							checkingValidation(
								Boolean(!elemToValidate.value),
								elemToValidate
							)();
					}
				}
			});

			// fill object with data from form
			Array.from(bookingForm.elements).forEach(elem => {
				if (elem.name && !elem.disabled) {
					Object.assign(objectWithFormData, objectToFillIn(elem));
				}
			});

			console.log(objectWithFormData);
		} catch (error) {
			alert(error);
		}
	});
}

formValidation();
