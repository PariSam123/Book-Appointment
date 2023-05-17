function onSubmit(e) {
	e.preventDefault();
	let userExist = false;
	myForm.style.background = '#cbc';
	if (nameInput.value === '' || emailInput.value === '') {
		msg.classList.add('error');
		msg.innerHTML = 'Please fill all fields';

		setTimeout(() => msg.remove(), 3000);
	}
	//SENDING DATA THROUGH POST
	else {
		if (!editPos) {
			//SENDING POST REQUEST TO CRUD CRUD API
			Array.from(listData).forEach((item) => {
				if (emailInput.value == item.childNodes[1].textContent) {
					userExist = true;
					msg.classList.add('error');
					msg.innerHTML = 'This user already has an appointment';
					setTimeout(() => msg.remove(), 3000);
				}
			});
			if (userExist == false) {
				let userDetails = {
					name: nameInput.value,
					email: emailInput.value,
				};
				axios
					.post(
						' https://crudcrud.com/api/73c15246c5914fddbc5b44a05ae97f22/appointmentData',
						userDetails
					)
					.then(() => {
						addItem();
					})
					.catch((err) => console.log(err));
			}
		} else {
			console.log('inside edit', editPos.childNodes[1].textContent);
			let element = editPos;
			let editId;
			allData.forEach((item) => {
				if (editPos.childNodes[1].textContent == item.email) editId = item._id;
			});
			let updatedDetails = {
				name: nameInput.value,
				email: emailInput.value,
			};
			axios
				.put(
					`https://crudcrud.com/api/73c15246c5914fddbc5b44a05ae97f22/appointmentData/${editId}`,
					updatedDetails
				)
				.then(() => {
					element.childNodes[0].textContent = `${nameInput.value} `;
					element.childNodes[1].textContent = emailInput.value;
				})
				.catch((err) => console.log(`Error on edit:${err}`));
		}
	}
	editPos = false;
	userExist = false;}