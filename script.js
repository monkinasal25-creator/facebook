const facebookAccessToken = document.getElementById('facebookAccessToken');
const facebookFetchBtn = document.getElementById('facebookFetchBtn');
const facebookProfileResult = document.getElementById('facebookProfileResult');
const facebookProfileError = document.getElementById('facebookProfileError');
const facebookProfileLoading = document.getElementById('facebookProfileLoading');

// so dito sa function nato yung pag fetch ng profile ng user gamit yung access token
function fetchProfile() {
    const token = facebookAccessToken.value.trim();
    
    if (!token) {
        showError('please enter access token');
        return;
    }

    if (facebookFetchBtn.disabled) {
        return;
    }

    setLoadingState(true);
    hideError();
    clearResult();

    fetchFacebookProfile(token);
}

// dito naman yung pag gamit ng facebook graph api tas pag fetch ng /me endpoint
async function fetchFacebookProfile(accessToken) {
    try {
        const fields = 'id,name,email,picture,birthday,gender,location,hometown,about,website,link,age_range,verified,first_name,last_name,middle_name';
        const apiUrl = 'https://graph.facebook.com/v24.0/me?access_token=' + accessToken + '&fields=' + fields;
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'error fetching profile');
        }

        const data = await response.json();
        displayProfile(data);
    } catch (error) {
        handleAPIError(error);
    } finally {
        setLoadingState(false);
    }
}

// tas ito yung pag display ng profile data sa result container
function displayProfile(profileData) {
    const welcomeMessage = facebookProfileResult.querySelector('.facebook-profile-welcome');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const profileCard = document.createElement('div');
    profileCard.className = 'facebook-profile-info';

    if (profileData.picture && profileData.picture.data && profileData.picture.data.url) {
        const imageDiv = document.createElement('div');
        imageDiv.style.textAlign = 'center';
        imageDiv.style.marginBottom = '20px';
        
        const profileImage = document.createElement('img');
        profileImage.src = profileData.picture.data.url;
        profileImage.alt = 'Profile Picture';
        profileImage.className = 'facebook-profile-image';
        
        imageDiv.appendChild(profileImage);
        profileCard.appendChild(imageDiv);
    }

    const fields = [
        { label: 'ID', value: profileData.id },
        { label: 'Name', value: profileData.name },
        { label: 'First Name', value: profileData.first_name },
        { label: 'Middle Name', value: profileData.middle_name },
        { label: 'Last Name', value: profileData.last_name },
        { label: 'Email', value: profileData.email },
        { label: 'Birthday', value: profileData.birthday },
        { label: 'Gender', value: profileData.gender },
        { label: 'Location', value: profileData.location ? profileData.location.name : null },
        { label: 'Hometown', value: profileData.hometown ? profileData.hometown.name : null },
        { label: 'About', value: profileData.about },
        { label: 'Website', value: profileData.website },
        { label: 'Profile Link', value: profileData.link },
        { label: 'Age Range', value: profileData.age_range ? profileData.age_range.min + ' - ' + (profileData.age_range.max || 'above') : null },
        { label: 'Verified', value: profileData.verified ? 'yes' : 'no' }
    ];

    fields.forEach(field => {
        if (field.value && field.value !== 'not available') {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'facebook-profile-card';
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'facebook-profile-label';
            labelSpan.textContent = field.label + ':';
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'facebook-profile-value';
            
            if (field.label === 'Profile Link' && field.value) {
                const linkElement = document.createElement('a');
                linkElement.href = field.value;
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                linkElement.textContent = field.value;
                linkElement.style.color = '#000000';
                linkElement.style.textDecoration = 'underline';
                valueSpan.appendChild(linkElement);
            } else if (field.label === 'Website' && field.value) {
                const linkElement = document.createElement('a');
                linkElement.href = field.value;
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                linkElement.textContent = field.value;
                linkElement.style.color = '#000000';
                linkElement.style.textDecoration = 'underline';
                valueSpan.appendChild(linkElement);
            } else {
                valueSpan.textContent = field.value;
            }
            
            fieldDiv.appendChild(labelSpan);
            fieldDiv.appendChild(valueSpan);
            profileCard.appendChild(fieldDiv);
        }
    });

    facebookProfileResult.appendChild(profileCard);
}

// dito is yung function for errors para sa pag handle ng errors ng api
function handleAPIError(error) {
    let errorMessage = 'error occurred';

    if (error.message.includes('Invalid OAuth') || error.message.includes('access token') || error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'invalid access token';
    } else if (error.message.includes('429') || error.message.includes('rate limit')) {
        errorMessage = 'too many requests';
    } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
        errorMessage = 'no internet connection';
    } else if (error.message.includes('error fetching profile')) {
        errorMessage = 'error fetching profile';
    } else if (error.message) {
        errorMessage = error.message.toLowerCase();
    }

    showError(errorMessage);
}

function showError(message) {
    facebookProfileError.textContent = message;
    facebookProfileError.classList.add('show');
    setTimeout(() => {
        facebookProfileError.classList.remove('show');
    }, 5000);
}

function hideError() {
    facebookProfileError.classList.remove('show');
}

// tas dito naman para sa loading state para hindi ma double click
function setLoadingState(isLoading) {
    facebookFetchBtn.disabled = isLoading;
    facebookAccessToken.disabled = isLoading;
    
    if (isLoading) {
        facebookProfileLoading.classList.add('show');
    } else {
        facebookProfileLoading.classList.remove('show');
    }
}

function clearResult() {
    const welcomeMessage = facebookProfileResult.querySelector('.facebook-profile-welcome');
    const existingCard = facebookProfileResult.querySelector('.facebook-profile-info');
    
    if (existingCard) {
        existingCard.remove();
    }
    
    if (!welcomeMessage && !existingCard) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'facebook-profile-welcome';
        welcomeDiv.innerHTML = '<i class="bi bi-person-circle"></i><p>Enter your access token to view your Facebook profile</p>';
        facebookProfileResult.appendChild(welcomeDiv);
    }
}

function validateInput(input) {
    return input.trim().length > 0;
}

facebookFetchBtn.addEventListener('click', fetchProfile);

facebookAccessToken.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        fetchProfile();
    }
});

facebookAccessToken.addEventListener('input', function() {
    const isValid = validateInput(facebookAccessToken.value);
    if (isValid) {
        facebookProfileError.classList.remove('show');
    }
});


