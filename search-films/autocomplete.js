const createAutoComplete = ({
	fetchData,
	root,
	renderOption,
	onOptionSelect,
	inputValue
}) => {
	root.innerHTML = `
    <nav class="panel">
        <div class="panel-heading">
            <label><b>Search:</b></label>
        </div>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input class="input search-input" type="search" placeholder="Search a film"/>
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <div class="dropdown">
                <div class="dropdown-menu">
                    <div class="dropdown-content results"></div>
                </div>
            </div>
    </nav>
`;

	const input = root.querySelector('.search-input');
	const dropwdown = root.querySelector('.dropdown');
	const resultWrapper = root.querySelector('.results');
	const isActiveClass = 'is-active';

	const onInput = async (e) => {
		const items = await fetchData(e.target.value);

		// close dropdown when input is blank
		if (!items.length) {
			dropwdown.classList.remove(isActiveClass);
			return;
		}

		resultWrapper.innerHTML = '';
		dropwdown.classList.add(isActiveClass);

		for (let item of items) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');

			option.innerHTML = renderOption(item);

			// detect the click on individual option
			// and fill the search input out with movie title
			option.addEventListener('click', () => {
				dropwdown.classList.remove(isActiveClass);
				input.value = inputValue(item);
				onOptionSelect(item);
			});

			resultWrapper.appendChild(option);
		}
	};

	input.addEventListener('input', debounce(onInput, 600));

	// close dropdown by clicking outside that
	document.addEventListener('click', (e) => {
		if (!root.contains(e.target)) {
			dropwdown.classList.remove(isActiveClass);
		}
	});
};
