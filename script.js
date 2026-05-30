let providers = [];

async function getProviders() {
  const res = await fetch("https://randomuser.me/api/?results=8");
  const data = await res.json();

  providers = data.results.map((user, index) => ({
    firstName: user.name.first,
    lastName: user.name.last,
    photo: user.picture.large,
    city: user.location.city,
    state: user.location.state,
    email: user.email,
    service: getService(index),
    bookings: Math.floor(Math.random() * 40) + 5,
    price: Math.floor(Math.random() * 31) + 20,
    joinedDate: user.registered.date,
  }));

  renderProviders(providers);
}

function getService(index) {
  const services = [
    "Dog Walking",
    "Pet Sitting",
    "Drop-In Visits",
    "Puppy Care",
    "Senior Pet Care",
    "Cat Care",
    "Boarding",
    "Pet Taxi"
  ];

  return services[index % services.length];
}

function renderProviders(providerList) {
  const providersWrapper = document.querySelector(".providers");

  providersWrapper.innerHTML = providerList
    .map(
      (provider) => `
        <div class="provider-card">
          <img 
            class="provider-card__img" 
            src="${provider.photo}" 
            alt="${provider.firstName} ${provider.lastName}"
          >

          <h3>${provider.firstName} ${provider.lastName}</h3>

          <p>${provider.service}</p>
          <p>${provider.city}, ${provider.state}</p>
          <p>${provider.bookings} bookings</p>
          <p>$${provider.price}/hour</p>
        </div>
      `
    )
    .join("");
}

function sortProviders(event) {
  const sortValue = event.target.value;

  if (sortValue === "AZ") {
    providers.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  } else if (sortValue === "ZA") {
    providers.sort((a, b) =>
      b.firstName.localeCompare(a.firstName)
    );
  } else if (sortValue === "MOST_BOOKINGS") {
    providers.sort((a, b) =>
      b.bookings - a.bookings
    );
  } else if (sortValue === "LOW_TO_HIGH") {
    providers.sort((a, b) =>
      a.price - b.price
    );
  } else if (sortValue === "HIGH_TO_LOW") {
    providers.sort((a, b) =>
      b.price - a.price
    );
  } else if (sortValue === "NEWEST") {
    providers.sort((a, b) =>
      new Date(b.joinedDate) - new Date(a.joinedDate)
    );
  } else if (sortValue === "OLDEST") {
    providers.sort((a, b) =>
      new Date(a.joinedDate) - new Date(b.joinedDate)
    );
  }

  renderProviders(providers);
}

function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

getProviders();