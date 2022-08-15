// selecting required elements
const result = document.getElementById("result");
const filter = document.getElementById("filter");
let userList = []; // users data will be added to this array

getDataFromAPI();

// when user enters an input 
filter.addEventListener("input", (e) => {
    filterUsers(e.target.value);
})

async function getDataFromAPI() {

    // fetching api
    const api = await fetch('https://randomuser.me/api?results=50');

    // we need results object from the api 
    const { results } = await api.json();

    // before do anything we should clear the results
    result.innerHTML = '';

    // getting each users data and shows on the UI 
    results.forEach(user => {
        const li = document.createElement('li');

        li.innerHTML = `<img src="${user.picture.large}" alt="">
                <div class="user-info">
                    <h4> ${user.name.first} ${user.name.last}  </h4>
                    <p> ${user.location.country}, ${user.location.city} </p>
                </div> `

        userList.push(li);
        result.appendChild(li);

    });
}

filterUsers();

function filterUsers(input) {
    userList.forEach(item => {
        if(item.innerText.toLowerCase().includes(input.toLowerCase())) {
            item.classList.remove("hide");
        }
        else {
            item.classList.add("hide");
        }
    })
}
