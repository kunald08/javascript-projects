const autoCompleteConfig = {
	fetchData: async (searchTerm) => {
		const response = await axios.get('https://www.omdbapi.com/', {
			params: {
				apikey: '661fdecc',
				s: searchTerm
			}
		});

		if (response.data.Error) return [];

		return response.data.Search;
	},
	renderOption: (movie) => {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		return `
        <div class="media">
            <div class="media-left">
                <figure class="image">
                    <img src="${imgSrc}" />
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <h5 class="poster-title">${movie.Title} (${movie.Year})</h5>
                </div>
            </div>
        </div>
        `;
	},
	inputValue: (movie) => movie.Title
};

let leftMovie, rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('https://www.omdbapi.com/', {
		params: {
			apikey: '661fdecc',
			i: movie.imdbID
		}
	});
	summaryElement.innerHTML = movieTemplate(response.data);

	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	if (leftMovie && rightMovie) {
		runComparison();
	}
};

createAutoComplete({
	root: document.querySelector('#left-autocomplete'),
	...autoCompleteConfig,
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('.left-summary'), 'left');
	}
});
createAutoComplete({
	root: document.querySelector('#right-autocomplete'),
	...autoCompleteConfig,
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('.right-summary'), 'right');
	}
});

const movieTemplate = (movieDetail) => {
	const dollars = movieDetail.BoxOffice ? +movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '') : +movieDetail.BoxOffice;
	const metascore = +movieDetail.Metascore;
	const imdbRating = +movieDetail.imdbRating;
	const imdbVotes = +movieDetail.imdbVotes.replace(/,/g, '');
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);

	return `
        <div class="box">
            <article class="media" style="margin-bottom: 1.5rem;">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <p class="image">
                            <img src="${movieDetail.Poster}" alt="${movieDetail.Title}" />
                        </p>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <h2>${movieDetail.Title}</h2>
                        <h4>${movieDetail.Genre}</h4>
                        <p>${movieDetail.Plot}</p>
                    </div>
                </div>
            </article>
        </div>
        <div class="notification is-primary" data-value=${awards}>
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">${awards} Awards</p>
        </div>
        <div class="notification is-primary" data-value=${dollars}>
            <p class="title">${movieDetail.BoxOffice ? movieDetail.BoxOffice : 'Unknown'}</p>
            <p class="subtitle">Box Office</p>
        </div>
        <div class="notification is-primary" data-value=${metascore}>
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </div>
        <div class="notification is-primary" data-value=${imdbRating}>
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB rating</p>
        </div>
        <div class="notification is-primary" data-value=${imdbVotes}>
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </div>
    `;
};
